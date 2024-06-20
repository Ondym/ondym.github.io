import cv2

def qr_to_list(image_path):
    # Load the QR code image
    qr_image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Check if the image was loaded successfully
    if qr_image is None:
        raise ValueError("Image not found or unable to load.")

    # Threshold the image to get binary image
    _, binary_image = cv2.threshold(qr_image, 128, 255, cv2.THRESH_BINARY)

    # Convert binary image to 2D list of 1s and 0s
    binary_list = (binary_image // 255).tolist()
    
    return binary_list

# Example usage
image_path = 'QR.png'
binary_list = qr_to_list(image_path)

# Print the 2D list (or use it as needed)
for row in binary_list:
    print(row)
