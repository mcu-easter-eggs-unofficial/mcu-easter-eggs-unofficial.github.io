import cv2
import glob
import os
import yt_dlp

def get_stream_url(youtube_url):
    ydl_opts = {
        'format': 'worst[ext=mp4]/worst',
        'quiet': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=False)
        return info['url'], info.get('duration', 0)

def fetch_reference_frame(url, fraction):
    """Fetch a specific frame from a YouTube video to use as a reference."""
    print(f"Fetching reference stream for {url} at {fraction*100}%...")
    try:
        stream_url, duration = get_stream_url(url)
    except Exception as e:
        print(f"Failed to fetch stream URL: {e}")
        return None
        
    target_sec = duration * fraction
    cap = cv2.VideoCapture(stream_url)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    frame_num = int(target_sec * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
    ret, frame = cap.read()
    cap.release()
    
    if ret:
        return frame
    else:
        print("Failed to read the reference frame.")
        return None

def compare_hist(img1, img2):
    """Compare two images using color histograms."""
    img1 = cv2.resize(img1, (640, 360))
    img2 = cv2.resize(img2, (640, 360))
    
    hsv_test1 = cv2.cvtColor(img1, cv2.COLOR_BGR2HSV)
    hsv_test2 = cv2.cvtColor(img2, cv2.COLOR_BGR2HSV)
    
    h_bins = 50
    s_bins = 60
    histSize = [h_bins, s_bins]
    h_ranges = [0, 180]
    s_ranges = [0, 256]
    ranges = h_ranges + s_ranges
    channels = [0, 1]
    
    hist_1 = cv2.calcHist([hsv_test1], channels, None, histSize, ranges, accumulate=False)
    cv2.normalize(hist_1, hist_1, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    
    hist_2 = cv2.calcHist([hsv_test2], channels, None, histSize, ranges, accumulate=False)
    cv2.normalize(hist_2, hist_2, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    
    metric = cv2.compareHist(hist_1, hist_2, cv2.HISTCMP_CORREL)
    return metric

def main():
    # Define known sponsor frames we want to purge
    # (url, duration_fraction)
    # frame_1 = 0.15, frame_2 = 0.32, frame_3 = 0.50, frame_4 = 0.68, frame_5 = 0.85
    sponsor_references = [
        ("https://www.youtube.com/watch?v=xHXhbw_EGL8", 0.50), # FATWS S1E3 frame 3
        ("https://www.youtube.com/watch?v=O8bZQjt0GUM", 0.15), # MM S1E1 frame 1
        ("https://www.youtube.com/watch?v=52ICM2NTtHo", 0.15), # WV S1E2 frame 1
    ]
    
    reference_images = []
    for url, frac in sponsor_references:
        ref = fetch_reference_frame(url, frac)
        if ref is not None:
            reference_images.append(ref)
            
    if not reference_images:
        print("Could not fetch any reference frames. Exiting.")
        return
        
    print(f"Scanning images for matches against {len(reference_images)} known sponsor patterns...")
    base_dir = "./images/MCU_Easter_Eggs_Pics"
    all_images = glob.glob(os.path.join(base_dir, "**", "*.jpg"), recursive=True)
    
    deleted = 0
    for img_path in all_images:
        img = cv2.imread(img_path)
        if img is None:
            continue
            
        # Check against all known sponsor references
        for ref in reference_images:
            score = compare_hist(ref, img)
            if score > 0.85: # High similarity threshold
                print(f"Match found (Score {score:.2f}): {img_path}")
                try:
                    os.remove(img_path)
                    deleted += 1
                except FileNotFoundError:
                    pass
                break # Move to next image once deleted
            
    print(f"Done! Deleted {deleted} similar images.")

if __name__ == "__main__":
    main()
