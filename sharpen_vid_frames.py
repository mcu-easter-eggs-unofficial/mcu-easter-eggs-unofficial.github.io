import os
import cv2
import yt_dlp
from get_salient_mcu_frames import EPISODE_DATA, get_stream_url, is_blurry, BASE_DIR

# Build a mapping from (serial, season, episode) -> url
url_map = {}
for item in EPISODE_DATA:
    serial = item["serial"]
    s = item["season"]
    e = item["episode"]
    url_map[(serial, s, e)] = item["url"]
    # Handle paired episodes mapping to the same URL
    if "pair_with" in item:
        url_map[(serial, s, item["pair_with"])] = item["url"]

# Stream URL cache (to avoid fetching yt-dlp info multiple times for the same video)
stream_cache = {}

# The ratios used in original extraction
ratios = [0.15, 0.32, 0.50, 0.68, 0.85]
THRESHOLD = 60.0

def process_image(filepath):
    # Extract info from path. Example: ./images/MCU_Easter_Eggs_Pics/AAA/S1/E1/frame_2.jpg
    parts = filepath.replace("\\", "/").split("/")
    filename = parts[-1]
    
    if not filename.startswith("frame_") or not filename.endswith(".jpg"):
        return False, False

    try:
        ep_str = parts[-2]
        season_str = parts[-3]
        serial = parts[-4]
        frame_idx = int(filename.split("_")[1].split(".")[0]) - 1
        season = int(season_str.replace("S", ""))
        ep = int(ep_str.replace("E", ""))
    except (IndexError, ValueError):
        return False, False

    # 1. Read existing image
    img = cv2.imread(filepath)
    if img is None:
        return False, False

    # 2. Check if blurry
    blurry, orig_score = is_blurry(img, threshold=THRESHOLD)
    if not blurry:
        # It's sharp enough, leave it untouched
        return False, False

    print(f"[Blurry] {filepath} (Score: {orig_score:.1f}). Searching for sharper frame...")

    # 3. Find URL
    url = url_map.get((serial, season, ep))
    if not url:
        print(f"  -> Could not find URL for {serial} S{season} E{ep}")
        return True, False

    # 4. Fetch stream (using cache)
    if url not in stream_cache:
        stream_url, duration = get_stream_url(url)
        stream_cache[url] = (stream_url, duration)
    else:
        stream_url, duration = stream_cache[url]

    if duration <= 0:
        print(f"  -> Invalid duration for {url}")
        return True, False

    target_sec = duration * ratios[frame_idx]

    # 5. Search for sharper frame
    cap = cv2.VideoCapture(stream_url)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0

    best_frame = None
    best_score = orig_score
    best_sec = target_sec

    # Search +/- 5 seconds
    for offset in [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5]:
        check_sec = target_sec + offset
        if check_sec < 0 or check_sec >= duration:
            continue
            
        frame_num = int(check_sec * fps)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
        ret, frame = cap.read()

        if ret:
            b, score = is_blurry(frame, threshold=THRESHOLD)
            if score > best_score:
                best_frame = frame
                best_score = score
                best_sec = check_sec
                if not b:
                    # Found a strictly sharp frame, stop searching
                    break

    cap.release()

    # 6. Replace if sharper
    if best_frame is not None and best_score > orig_score:
        cv2.imwrite(filepath, best_frame)
        print(f"  -> Replaced with sharper frame! New Score: {best_score:.1f} (offset {int(best_sec - target_sec)}s)")
        return True, True
    else:
        print(f"  -> Could not find a sharper frame. Kept original.")
        return True, False


def main():
    print("=" * 60)
    print("Sharpening MCU Easter Egg Frames")
    print("=" * 60)

    total_blurry = 0
    total_replaced = 0

    for root, dirs, files in os.walk(BASE_DIR):
        for file in sorted(files): # Sorted for deterministic output
            if file.endswith(".jpg"):
                filepath = os.path.join(root, file)
                res = process_image(filepath)
                if res:
                    blurry, replaced = res
                    if blurry:
                        total_blurry += 1
                    if replaced:
                        total_replaced += 1

    print("\n" + "=" * 60)
    print("Sharpening complete!")
    if total_blurry > 0:
        fraction = total_replaced / total_blurry
        print(f"Total Blurry Images Detected: {total_blurry}")
        print(f"Images Successfully Replaced: {total_replaced}")
        print(f"Fraction of blurry images replaced: {fraction:.2f} ({total_replaced}/{total_blurry})")
    else:
        print("No blurry images detected. Nothing to replace.")
    print("=" * 60)

if __name__ == "__main__":
    main()
