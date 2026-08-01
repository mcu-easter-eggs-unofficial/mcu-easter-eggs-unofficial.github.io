import Foundation
import Vision
import CoreImage

let args = CommandLine.arguments
if args.count < 2 {
    print("Usage: swift ocr_find.swift <directory>")
    exit(1)
}

let dirPath = args[1]
let fileManager = FileManager.default

guard let enumerator = fileManager.enumerator(atPath: dirPath) else {
    print("Failed to read directory")
    exit(1)
}

var deletedCount = 0

for case let filePath as String in enumerator {
    if filePath.hasSuffix(".jpg") || filePath.hasSuffix(".jpeg") || filePath.hasSuffix(".png") {
        let fullPath = (dirPath as NSString).appendingPathComponent(filePath)
        let url = URL(fileURLWithPath: fullPath)
        
        guard let ciImage = CIImage(contentsOf: url) else { continue }
        
        let requestHandler = VNImageRequestHandler(ciImage: ciImage, options: [:])
        let request = VNRecognizeTextRequest { (request, error) in
            guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
            
            for observation in observations {
                guard let topCandidate = observation.topCandidates(1).first else { continue }
                let text = topCandidate.string.lowercased()
                
                // New Rockstars might be recognized with spaces or without
                let stripped = text.replacingOccurrences(of: " ", with: "")
                if stripped.contains("newrockstars") {
                    print("Found NEWROCKSTARS in \(fullPath). Deleting...")
                    do {
                        try fileManager.removeItem(atPath: fullPath)
                        deletedCount += 1
                    } catch {
                        print("Failed to delete \(fullPath): \(error)")
                    }
                    break
                }
            }
        }
        
        // Fast recognition is usually good enough for big logos, but accurate is safer
        request.recognitionLevel = .accurate
        
        do {
            try requestHandler.perform([request])
        } catch {
            print("Failed to perform OCR on \(fullPath): \(error)")
        }
    }
}

print("Done! Deleted \(deletedCount) images.")
