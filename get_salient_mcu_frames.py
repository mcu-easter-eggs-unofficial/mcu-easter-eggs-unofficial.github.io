import os
import shutil
import cv2
import yt_dlp

# Base directory for output
BASE_DIR = "./images/MCU_Easter_Eggs_Pics"

# Complete dataset mapping of 67 videos to 69 episode folders
EPISODE_DATA = [
    # --- Agatha All Along (Season 1) ---
    {"series": "Agatha All Along", "serial": "AAA", "season": 1, "episode": 1, "url": "https://youtu.be/WHlEO1Bphu0", "pair_with": 2},
    {"series": "Agatha All Along", "serial": "AAA", "season": 1, "episode": 3, "url": "https://youtu.be/y9Lrp5OszAk?si=8vuxgc7seLz-AdLO"},
    {"series": "Agatha All Along", "serial": "AAA", "season": 1, "episode": 4, "url": "https://youtu.be/BI5cJTAOINk?si=EP4eI_vYTkAZAEdd"},
    {"series": "Agatha All Along", "serial": "AAA", "season": 1, "episode": 5, "url": "https://youtu.be/Be2p7dgwbZ4"},
    {"series": "Agatha All Along", "serial": "AAA", "season": 1, "episode": 6, "url": "https://youtu.be/GjAAu60TZkU"},
    {"series": "Agatha All Along", "serial": "AAA", "season": 1, "episode": 7, "url": "https://youtu.be/jrAdKq8cm3A"},
    {"series": "Agatha All Along", "serial": "AAA", "season": 1, "episode": 8, "url": "https://youtu.be/SMkMbOhGipM", "pair_with": 9},

    # --- WandaVision (Season 1) ---
    {"series": "WandaVision", "serial": "WV", "season": 1, "episode": 1, "url": "https://www.youtube.com/watch?v=NgtLRWoH6Wo"},
    {"series": "WandaVision", "serial": "WV", "season": 1, "episode": 2, "url": "https://www.youtube.com/watch?v=52ICM2NTtHo"},
    {"series": "WandaVision", "serial": "WV", "season": 1, "episode": 3, "url": "https://www.youtube.com/watch?v=65EmPiJeR08"},
    {"series": "WandaVision", "serial": "WV", "season": 1, "episode": 4, "url": "https://www.youtube.com/watch?v=0dEcPF4Kocw"},
    {"series": "WandaVision", "serial": "WV", "season": 1, "episode": 5, "url": "https://www.youtube.com/watch?v=ti6hFaPfYY4"},
    {"series": "WandaVision", "serial": "WV", "season": 1, "episode": 6, "url": "https://www.youtube.com/watch?v=lhkFW2dO_wM"},
    {"series": "WandaVision", "serial": "WV", "season": 1, "episode": 7, "url": "https://www.youtube.com/watch?v=7_qsV3wUKiU"},
    {"series": "WandaVision", "serial": "WV", "season": 1, "episode": 8, "url": "https://www.youtube.com/watch?v=vy6z5Q-PuAk"},
    {"series": "WandaVision", "serial": "WV", "season": 1, "episode": 9, "url": "https://www.youtube.com/watch?v=4ytycEmT1uw"},

    # --- Loki (Season 1 & 2) ---
    {"series": "Loki", "serial": "LK", "season": 1, "episode": 1, "url": "https://www.youtube.com/watch?v=UVvZwSm-ne0"},
    {"series": "Loki", "serial": "LK", "season": 1, "episode": 2, "url": "https://www.youtube.com/watch?v=t-yVLjhKcrs"},
    {"series": "Loki", "serial": "LK", "season": 1, "episode": 3, "url": "https://www.youtube.com/watch?v=qnyxz3T4DOc"},
    {"series": "Loki", "serial": "LK", "season": 1, "episode": 4, "url": "https://www.youtube.com/watch?v=eZZYzTkx1a8"},
    {"series": "Loki", "serial": "LK", "season": 1, "episode": 5, "url": "https://www.youtube.com/watch?v=cB04Re6_Fp4"},
    {"series": "Loki", "serial": "LK", "season": 1, "episode": 6, "url": "https://www.youtube.com/watch?v=ZEdMI48kP8A"},
    {"series": "Loki", "serial": "LK", "season": 2, "episode": 1, "url": "https://www.youtube.com/watch?v=VfrCFeyydzg"},
    {"series": "Loki", "serial": "LK", "season": 2, "episode": 2, "url": "https://www.youtube.com/watch?v=mysJb-ZbQzA"},
    {"series": "Loki", "serial": "LK", "season": 2, "episode": 3, "url": "https://www.youtube.com/watch?v=1E_prIdsqGg"},
    {"series": "Loki", "serial": "LK", "season": 2, "episode": 4, "url": "https://www.youtube.com/watch?v=vA2B7Pp4O4Y"},
    {"series": "Loki", "serial": "LK", "season": 2, "episode": 5, "url": "https://www.youtube.com/watch?v=zMIbGyDik24"},
    {"series": "Loki", "serial": "LK", "season": 2, "episode": 6, "url": "https://www.youtube.com/watch?v=yLa7j3MMLhA"},

    # --- Moon Knight (Season 1) ---
    {"series": "Moon Knight", "serial": "MK", "season": 1, "episode": 1, "url": "https://www.youtube.com/watch?v=oVw24yvdRYU"},
    {"series": "Moon Knight", "serial": "MK", "season": 1, "episode": 2, "url": "https://www.youtube.com/watch?v=Tykl0uiJ5yo"},
    {"series": "Moon Knight", "serial": "MK", "season": 1, "episode": 3, "url": "https://www.youtube.com/watch?v=PoJLm1lHeBA"},
    {"series": "Moon Knight", "serial": "MK", "season": 1, "episode": 4, "url": "https://www.youtube.com/watch?v=CdWxALuAosg"},
    {"series": "Moon Knight", "serial": "MK", "season": 1, "episode": 5, "url": "https://www.youtube.com/watch?v=C2Q4We-87kM"},
    {"series": "Moon Knight", "serial": "MK", "season": 1, "episode": 6, "url": "https://www.youtube.com/watch?v=ovttoyrgLOg"},

    # --- Secret Invasion (Season 1) ---
    {"series": "Secret Invasion", "serial": "SI", "season": 1, "episode": 1, "url": "https://www.youtube.com/watch?v=HmJHEKbDKAY"},
    {"series": "Secret Invasion", "serial": "SI", "season": 1, "episode": 2, "url": "https://www.youtube.com/watch?v=QjPpPBgTRcE"},
    {"series": "Secret Invasion", "serial": "SI", "season": 1, "episode": 3, "url": "https://www.youtube.com/watch?v=za-ypCn3Uts"},
    {"series": "Secret Invasion", "serial": "SI", "season": 1, "episode": 4, "url": "https://www.youtube.com/watch?v=_zua9qISV98"},
    {"series": "Secret Invasion", "serial": "SI", "season": 1, "episode": 5, "url": "https://www.youtube.com/watch?v=YUG7enQ92Kc"},
    {"series": "Secret Invasion", "serial": "SI", "season": 1, "episode": 6, "url": "https://www.youtube.com/watch?v=P3ZBt7QByos"},

    # --- She-Hulk: Attorney at Law (Season 1) ---
    {"series": "She-Hulk: Attorney at Law", "serial": "SH", "season": 1, "episode": 1, "url": "https://www.youtube.com/watch?v=j6JgA9_mEkQ"},
    {"series": "She-Hulk: Attorney at Law", "serial": "SH", "season": 1, "episode": 2, "url": "https://www.youtube.com/watch?v=BPSpc95L9ys"},
    {"series": "She-Hulk: Attorney at Law", "serial": "SH", "season": 1, "episode": 3, "url": "https://www.youtube.com/watch?v=deBozTpDr8M"},
    {"series": "She-Hulk: Attorney at Law", "serial": "SH", "season": 1, "episode": 4, "url": "https://www.youtube.com/watch?v=vVMA63xCqGU"},
    {"series": "She-Hulk: Attorney at Law", "serial": "SH", "season": 1, "episode": 5, "url": "https://www.youtube.com/watch?v=kQmDGyGKI48"},
    {"series": "She-Hulk: Attorney at Law", "serial": "SH", "season": 1, "episode": 6, "url": "https://www.youtube.com/watch?v=Oznxob56dQs"},
    {"series": "She-Hulk: Attorney at Law", "serial": "SH", "season": 1, "episode": 7, "url": "https://www.youtube.com/watch?v=PLm5fHZW-Dw"},
    {"series": "She-Hulk: Attorney at Law", "serial": "SH", "season": 1, "episode": 8, "url": "https://www.youtube.com/watch?v=bwkkVXcyud0"},
    {"series": "She-Hulk: Attorney at Law", "serial": "SH", "season": 1, "episode": 9, "url": "https://www.youtube.com/watch?v=K3u5W-4-YLA"},

    # --- The Falcon and the Winter Soldier (Season 1) ---
    {"series": "The Falcon and the Winter Soldier", "serial": "FATWS", "season": 1, "episode": 1, "url": "https://www.youtube.com/watch?v=5y24Mi9KZ2s"},
    {"series": "The Falcon and the Winter Soldier", "serial": "FATWS", "season": 1, "episode": 2, "url": "https://www.youtube.com/watch?v=HOw_7pMbj9g"},
    {"series": "The Falcon and the Winter Soldier", "serial": "FATWS", "season": 1, "episode": 3, "url": "https://www.youtube.com/watch?v=xHXhbw_EGL8"},
    {"series": "The Falcon and the Winter Soldier", "serial": "FATWS", "season": 1, "episode": 4, "url": "https://www.youtube.com/watch?v=BCby7JoBRgw"},
    {"series": "The Falcon and the Winter Soldier", "serial": "FATWS", "season": 1, "episode": 5, "url": "https://www.youtube.com/watch?v=Z6ARehoi_D8"},
    {"series": "The Falcon and the Winter Soldier", "serial": "FATWS", "season": 1, "episode": 6, "url": "https://www.youtube.com/watch?v=z0bNL8SqzTg"},

    # --- Hawkeye (Season 1) ---
    {"series": "Hawkeye", "serial": "HE", "season": 1, "episode": 1, "url": "https://www.youtube.com/watch?v=kZfFJDmsVo8"},
    {"series": "Hawkeye", "serial": "HE", "season": 1, "episode": 2, "url": "https://www.youtube.com/watch?v=_2pKf-94UVU"},
    {"series": "Hawkeye", "serial": "HE", "season": 1, "episode": 3, "url": "https://www.youtube.com/watch?v=IC1pEvBp0V4"},
    {"series": "Hawkeye", "serial": "HE", "season": 1, "episode": 4, "url": "https://www.youtube.com/watch?v=UcMw9CyyU9E"},
    {"series": "Hawkeye", "serial": "HE", "season": 1, "episode": 5, "url": "https://www.youtube.com/watch?v=bAR-FD831xY"},
    {"series": "Hawkeye", "serial": "HE", "season": 1, "episode": 6, "url": "https://www.youtube.com/watch?v=kJ0HvLZ6Ivo"},

    # --- Ms. Marvel (Season 1) ---
    {"series": "Ms Marvel", "serial": "MM", "season": 1, "episode": 1, "url": "https://www.youtube.com/watch?v=O8bZQjt0GUM"},
    {"series": "Ms Marvel", "serial": "MM", "season": 1, "episode": 2, "url": "https://www.youtube.com/watch?v=VhpbKt0BFrw"},
    {"series": "Ms Marvel", "serial": "MM", "season": 1, "episode": 3, "url": "https://www.youtube.com/watch?v=hxaQJWUFD2E"},
    {"series": "Ms Marvel", "serial": "MM", "season": 1, "episode": 4, "url": "https://www.youtube.com/watch?v=paMgBWj_N1c"},
    {"series": "Ms Marvel", "serial": "MM", "season": 1, "episode": 5, "url": "https://www.youtube.com/watch?v=bi90PY3ipcU"},
    {"series": "Ms Marvel", "serial": "MM", "season": 1, "episode": 6, "url": "https://www.youtube.com/watch?v=grwyCsvgCXg"},
]

def get_stream_url(youtube_url):
    """Fetch direct low-res video stream URL to extract frames fast."""
    ydl_opts = {
        'format': 'worst[ext=mp4]/worst',  # Lightest stream for speed
        'quiet': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=False)
        return info['url'], info.get('duration', 0)

def is_blurry(image, threshold=60.0):
    """Returns True if the image is considered blurry based on Laplacian variance."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    score = cv2.Laplacian(gray, cv2.CV_64F).var()
    return score < threshold, score

def extract_salient_frames(item):
    series = item["series"]
    season = item["season"]
    ep = item["episode"]
    url = item["url"]
    serial = item["serial"]

    # Target folder: MCU Easter Eggs Pics / [Abbrev] / S[X] / E[Y]
    target_dir = os.path.join(BASE_DIR, serial, f"S{season}", f"E{ep}")
    os.makedirs(target_dir, exist_ok=True)

    print(f"--> Processing {series} S{season}E{ep}...")

    try:
        stream_url, duration = get_stream_url(url)
        if duration <= 0:
            print(f"    [Warning] Could not read duration for {url}")
            return target_dir

        # Salient timestamp percentages across the breakdown
        ratios = [0.15, 0.32, 0.50, 0.68, 0.85]
        target_times = [r * duration for r in ratios]

        cap = cv2.VideoCapture(stream_url)
        fps = cap.get(cv2.CAP_PROP_FPS) or 30.0

        for i, target_sec in enumerate(target_times, start=1):
            best_frame = None
            best_score = -1
            best_sec = target_sec

            # Search around the target time (up to +/- 5 seconds) to find a sharp frame
            for offset in [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5]:
                check_sec = target_sec + offset
                if check_sec < 0 or check_sec >= duration:
                    continue
                    
                frame_num = int(check_sec * fps)
                cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
                ret, frame = cap.read()

                if ret:
                    blurry, score = is_blurry(frame)
                    if not blurry:
                        # Found a sharp frame! Stop searching.
                        best_frame = frame
                        best_score = score
                        best_sec = check_sec
                        break
                    elif score > best_score:
                        # Keep track of the sharpest one we found just in case they're all blurry
                        best_frame = frame
                        best_score = score
                        best_sec = check_sec

            if best_frame is not None:
                mins, secs = divmod(int(best_sec), 60)
                out_path = os.path.join(target_dir, f"frame_{i}.jpg")
                cv2.imwrite(out_path, best_frame)
                offset_str = f" (offset {int(best_sec - target_sec)}s)" if int(best_sec - target_sec) != 0 else ""
                print(f"    Saved frame {i}/5 @ {mins:02d}:{secs:02d}{offset_str} -> {out_path} [Blur Score: {best_score:.1f}]")
            else:
                print(f"    [Error] Failed to read any frame around {target_sec}s")

        cap.release()

        # Handle paired episodes (e.g. Agatha Ep 1 & 2, Ep 8 & 9)
        if "pair_with" in item:
            paired_ep = item["pair_with"]
            paired_dir = os.path.join(BASE_DIR, serial, f"S{season}", f"E{paired_ep}")
            os.makedirs(paired_dir, exist_ok=True)
            for i in range(1, 6):
                src = os.path.join(target_dir, f"frame_{i}.jpg")
                dst = os.path.join(paired_dir, f"frame_{i}.jpg")
                if os.path.exists(src):
                    shutil.copy(src, dst)
            print(f"    [Pairing] Copied frames to Episode {paired_ep} folder -> {paired_dir}")

    except Exception as e:
        print(f"    [Error] Exception occurred: {e}")

    return target_dir

def main():
    print("=" * 60)
    print("MCU Easter Egg Frame Extractor")
    print(f"Saving all images to: {os.path.abspath(BASE_DIR)}")
    print("=" * 60)

    for item in EPISODE_DATA:
        extract_salient_frames(item)

    print("\n" + "=" * 60)
    print("All 69 episode folders have been successfully processed!")
    print("=" * 60)

if __name__ == "__main__":
    main()