#!/bin/bash
set -e

echo "============================================================"
echo "          MCU Easter Eggs - Image Pipeline"
echo "============================================================"

echo ""
echo "[Step 1/3] Extracting MCU frames..."
python3 get_salient_mcu_frames.py

echo ""
echo "[Step 2/3] Cleaning up sponsor frames based on color histograms..."
# Uses known YouTube sponsor frames as reference and purges matches
python3 clean_sponsor_frames.py

echo ""
echo "[Step 3/3] Cleaning up NEWROCKSTARS frames using OCR..."
# Uses macOS Vision framework via Swift for native OCR text detection
swift ocr_find.swift ./images/MCU_Easter_Eggs_Pics

echo ""
echo "============================================================"
echo "          Pipeline Completed Successfully!"
echo "============================================================"
