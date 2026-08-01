import cv2
import glob
import os
import yt_dlp

def get_stream_url(youtube_url):
    """Fetch direct low-res video stream URL to extract frames fast."""
    ydl_opts = {
        'format': 'worst[ext=mp4]/worst',  # Lightest stream for speed
        'quiet': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=False)
        return info['url'], info.get('duration', 0)

def fetch_reference_frame():
    """Download the specific frame known to be the bluish sponsor image."""
    # The Falcon and the Winter Soldier S1E3 url
    url = "https://www.youtube.com/watch?v=xHXhbw_EGL8"
    print("Fetching reference stream...")
    
    try:
        stream_url, duration = get_stream_url(url)
    except Exception as e:
        print(f"Failed to fetch stream URL: {e}")
        return None
        
    target_sec = duration * 0.50 # frame_3 is at exactly 50%
    
    cap = cv2.VideoCapture(stream_url)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    frame_num = int(target_sec * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
    ret, frame = cap.read()
    cap.release()
    
    if ret:
        cv2.imwrite("ref_frame.jpg", frame)
        print("Reference frame saved as ref_frame.jpg")
        return frame
    else:
        print("Failed to read the reference frame.")
        return None

def compare_hist(img1, img2):
    """Compare two images using color histograms."""
    # Resize both to same size to ensure uniform histogram bounds
    img1 = cv2.resize(img1, (640, 360))
    img2 = cv2.resize(img2, (640, 360))
    
    # Convert to HSV color space
    hsv_test1 = cv2.cvtColor(img1, cv2.COLOR_BGR2HSV)
    hsv_test2 = cv2.cvtColor(img2, cv2.COLOR_BGR2HSV)
    
    # Calculate Histogram properties
    h_bins = 50
    s_bins = 60
    histSize = [h_bins, s_bins]
    h_ranges = [0, 180]
    s_ranges = [0, 256]
    ranges = h_ranges + s_ranges
    channels = [0, 1]
    
    # Compute and normalize histograms
    hist_1 = cv2.calcHist([hsv_test1], channels, None, histSize, ranges, accumulate=False)
    cv2.normalize(hist_1, hist_1, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    
    hist_2 = cv2.calcHist([hsv_test2], channels, None, histSize, ranges, accumulate=False)
    cv2.normalize(hist_2, hist_2, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    
    # Compare (Correlation method: 1.0 is a perfect match)
    metric = cv2.compareHist(hist_1, hist_2, cv2.HISTCMP_CORREL)
    return metric

def main():
    # Load the new local reference frame provided by the user
    ref_path = "./images/MCU_Easter_Eggs_Pics/WV/S1/E2/frame_1.jpg"
    print(f"Loading reference frame: {ref_path}")
    ref = cv2.imread(ref_path)
    if ref is None:
        print("Could not load reference. Exiting.")
        return
        
    print("Scanning images for matches...")
    base_dir = "./images/MCU_Easter_Eggs_Pics"
    all_images = glob.glob(os.path.join(base_dir, "**", "*.jpg"), recursive=True)
    
    deleted = 0
    for img_path in all_images:
        img = cv2.imread(img_path)
        if img is None:
            continue
            
        score = compare_hist(ref, img)
        if score > 0.85: # High similarity threshold
            print(f"Match found (Score {score:.2f}): {img_path}")
            os.remove(img_path)
            deleted += 1
            
    print(f"Done! Deleted {deleted} similar images.")

if __name__ == "__main__":
    main()
