import os
from PIL import Image

def analyze_and_clean():
    img_path = 'public/assets/endtimez.png'
    out_path = 'public/assets/endtimez_transparent.png'
    
    with Image.open(img_path) as img:
        img = img.convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            if item[0] < 30 and item[1] < 30 and item[2] < 30:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(out_path, "PNG")
        
    # Replace original
    os.replace(out_path, img_path)
    print("Saved transparent logo successfully.")

if __name__ == "__main__":
    analyze_and_clean()
