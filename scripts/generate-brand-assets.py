"""
Derives every brand asset the site needs from the single supplied logo file.

One-off / on-demand script, not part of `npm run build`. Re-run it if the
source logo is ever replaced:

    pip install Pillow
    python scripts/generate-brand-assets.py

Source:  brand/Tech_AURA_Logo.png  (opaque white background, NOT served —
         it lives outside public/ so the 888KB original is never deployed)
Outputs: public/media/logo-*.png, public/favicon-*.png, public/og-image.png

The source is a stacked lockup on solid white, which cannot sit on the dark
header or footer as-is. So we produce two things it does not ship with:
a transparent background, and a "light" knockout where the navy ink becomes
white while the gold is preserved.
"""

from pathlib import Path
import colorsys
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'brand' / 'Tech_AURA_Logo.png'
MEDIA = ROOT / 'public' / 'media'
PUBLIC = ROOT / 'public'

# Sampled directly from the supplied artwork.
NAVY = (2, 32, 75)
GOLD = (200, 136, 16)

# Band boundaries measured from the source's row-density profile.
MARK_BOX = (304, 134, 904, 776)      # building + arc + TA monogram
FULL_BOX = (150, 128, 1138, 1046)    # entire lockup including the tagline

# Anti-aliasing ramp: fully opaque below LO luminance, fully clear above HI.
LO, HI = 236, 252


def is_gold(r, g, b):
    hue, light, sat = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    return sat > 0.28 and 28 <= hue * 360 <= 60 and light < 0.78


def cut_background(img):
    """White background -> alpha, preserving the original colours exactly."""
    img = img.convert('RGB')
    out = Image.new('RGBA', img.size)
    src, dst = img.load(), out.load()

    for y in range(img.height):
        for x in range(img.width):
            r, g, b = src[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum >= HI:
                alpha = 0
            elif lum <= LO:
                alpha = 255
            else:
                alpha = int(255 * (HI - lum) / (HI - LO))
            dst[x, y] = (r, g, b, alpha)
    return out


def knockout(img):
    """Navy/grey ink -> white, gold kept. For placing on dark surfaces."""
    out = img.copy()
    px = out.load()
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if is_gold(r, g, b):
                # Lift the gold slightly so it holds up against near-black.
                px[x, y] = (min(255, r + 34), min(255, g + 38), min(255, b + 26), a)
            else:
                px[x, y] = (255, 255, 255, a)
    return out


def trim(img):
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def save(img, path, size=None):
    out = img
    if size:
        out = img.copy()
        out.thumbnail(size, Image.LANCZOS)
    out.save(path, optimize=True)
    print(f'  {path.relative_to(ROOT)}  {out.size[0]}x{out.size[1]}')


def contain(img, box_w, box_h):
    """Scale to fit inside a box, preserving aspect ratio."""
    scale = min(box_w / img.width, box_h / img.height)
    return img.resize((max(1, int(img.width * scale)), max(1, int(img.height * scale))), Image.LANCZOS)


def load_font(names, size):
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def main():
    source = Image.open(SRC)
    print('source:', source.size, source.mode)

    transparent = cut_background(source)

    full = trim(transparent.crop(FULL_BOX))
    mark = trim(transparent.crop(MARK_BOX))

    mark_light = knockout(mark)

    # Emitted at display resolution, not source resolution. The header mark
    # renders 44px tall, so 176px covers 4x displays; shipping the 600px
    # original meant ~270KB for a favicon-sized element.
    print('\nlockups:')
    save(contain(mark, 176, 176), MEDIA / 'logo-mark.png')
    save(contain(mark_light, 176, 176), MEDIA / 'logo-mark-light.png')
    save(contain(full, 512, 512), MEDIA / 'logo-full.png')
    save(contain(knockout(full), 512, 512), MEDIA / 'logo-full-light.png')

    # --- Favicons -------------------------------------------------------
    # A detailed mark is mush at 32px, so it sits on a navy tile with the
    # knockout version, which keeps the gold arc legible in a tab strip.
    print('\nfavicons:')
    for px_size, name, radius in [(32, 'favicon-32.png', 6), (192, 'favicon-192.png', 34),
                                  (180, 'apple-touch-icon.png', 0)]:
        tile = Image.new('RGBA', (px_size, px_size), (0, 0, 0, 0))
        plate = Image.new('RGBA', (px_size, px_size), NAVY + (255,))
        if radius:
            mask = Image.new('L', (px_size * 4, px_size * 4), 0)
            ImageDraw.Draw(mask).rounded_rectangle(
                (0, 0, px_size * 4 - 1, px_size * 4 - 1), radius=radius * 4, fill=255)
            plate.putalpha(mask.resize((px_size, px_size), Image.LANCZOS))
        tile.alpha_composite(plate)

        glyph = contain(mark_light, int(px_size * 0.74), int(px_size * 0.74))
        tile.alpha_composite(glyph, ((px_size - glyph.width) // 2, (px_size - glyph.height) // 2))
        save(tile, PUBLIC / name)

    # --- Open Graph card ------------------------------------------------
    print('\nsocial card:')
    W, H = 1200, 630
    card = Image.new('RGB', (W, H), NAVY)
    draw = ImageDraw.Draw(card)

    # Gold sweep echoing the arc in the logo.
    draw.polygon([(0, H), (W, H - 210), (W, H), (0, H)], fill=(6, 42, 92))
    draw.rectangle([(0, H - 12), (W, H)], fill=GOLD)

    logo = contain(knockout(full), 470, 300)
    card.paste(logo, (80, (H - logo.height) // 2 - 40), logo)

    title = load_font(['arialbd.ttf', 'Arialbd.ttf', 'DejaVuSans-Bold.ttf'], 46)
    body = load_font(['arial.ttf', 'Arial.ttf', 'DejaVuSans.ttf'], 26)
    small = load_font(['arialbd.ttf', 'DejaVuSans-Bold.ttf'], 20)

    x = 620
    draw.text((x, 214), 'Construction &', font=title, fill=(255, 255, 255))
    draw.text((x, 268), 'Engineering Services', font=title, fill=(255, 255, 255))
    draw.rectangle([(x, 338), (x + 78, 343)], fill=GOLD)
    draw.text((x, 372), 'Energy-efficient buildings, roads,', font=body, fill=(196, 210, 232))
    draw.text((x, 406), 'power and water infrastructure', font=body, fill=(196, 210, 232))
    draw.text((x, 470), 'LAGOS, NIGERIA', font=small, fill=(255, 255, 255))
    draw.text((x + 210, 470), 'SINCE 2009', font=small, fill=GOLD)

    card.save(PUBLIC / 'og-image.png', optimize=True)
    print(f'  public/og-image.png  {W}x{H}')


if __name__ == '__main__':
    main()
