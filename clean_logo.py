from PIL import Image

def analyze_and_clean():
    img_path = 'public/assets/endtimez.png'
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    w, h = img.size

    # Check the corners
    corners = [(0,0), (w-1, 0), (0, h-1), (w-1, h-1)]
    for c in corners:
        print(f"Corner {c}: {img.getpixel(c)}")
        
    # Attempt to use rembg if possible, else simple replace
    try:
        import rembg
        print("rembg installed, using rembg...")
        with open(img_path, 'rb') as i:
            out = rembg.remove(i.read())
        with open(img_path, 'wb') as o:
            o.write(out)
        print("Success with rembg!")
    except ImportError:
        print("No rembg, using heuristic black removal with feathering...")
        new_data = []
        for item in data:
            # If it's mostly black/dark gray, make it transparent
            if item[0] < 30 and item[1] < 30 and item[2] < 30:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        img.putdata(new_data)
        img.save(img_path, "PNG")
        print("Fallback success.")

if __name__ == "__main__":
    analyze_and_clean()
