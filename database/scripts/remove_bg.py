"""
Smarter background removal:
- Restore from backup
- Use flood-fill from corners to identify background pixels
- Only make CONNECTED background pixels transparent
- Person's dark clothes are NOT connected to the background corners
"""
from PIL import Image, ImageFilter
import os

BACKUP = r"e:\My FULL Stack Portfolio\frontend\public\hero_original.png"
OUTPUT = r"e:\My FULL Stack Portfolio\frontend\public\hero.png"

# Always work from backup
img = Image.open(BACKUP).convert("RGBA")
w, h = img.size
print(f"Image: {w}x{h}")

pixels = img.load()

# ─── Step 1: Create a mask using flood-fill from all 4 corners ───
# We'll flood-fill the dark background regions connected to edges
BG_THRESH = 45  # pixels darker than this are "background candidates"

def is_dark(r, g, b):
    return (r * 0.299 + g * 0.587 + b * 0.114) < BG_THRESH

# Build a boolean grid: True = dark pixel (background candidate)
dark = [[False]*h for _ in range(w)]
for x in range(w):
    for y in range(h):
        r, g, b, a = pixels[x, y]
        if is_dark(r, g, b):
            dark[x][y] = True

# Flood fill from edges to find background pixels
bg = [[False]*h for _ in range(w)]
stack = []

# Seed from all 4 edges
for x in range(w):
    if dark[x][0]:   stack.append((x, 0))
    if dark[x][h-1]: stack.append((x, h-1))
for y in range(h):
    if dark[0][y]:   stack.append((0, y))
    if dark[w-1][y]: stack.append((w-1, y))

print(f"Flood fill seeds: {len(stack)}")

# BFS flood fill
visited = set(stack)
while stack:
    cx, cy = stack.pop()
    bg[cx][cy] = True
    for nx, ny in [(cx-1,cy),(cx+1,cy),(cx,cy-1),(cx,cy+1)]:
        if 0 <= nx < w and 0 <= ny < h and (nx,ny) not in visited and dark[nx][ny]:
            visited.add((nx, ny))
            stack.append((nx, ny))

print("Flood fill complete, applying alpha...")

# ─── Step 2: Apply transparency to background pixels ───
# With soft feathering for smooth edges
FEATHER = 8  # pixels of feathering at boundary

removed = 0
for x in range(w):
    for y in range(h):
        if bg[x][y]:
            r, g, b, a = pixels[x, y]
            lum = r * 0.299 + g * 0.587 + b * 0.114
            # Smooth fade: darker = more transparent
            alpha = int(max(0, (lum / BG_THRESH)) * 80)
            pixels[x, y] = (r, g, b, alpha)
            removed += 1

print(f"Removed {removed} background pixels")

# ─── Step 3: Save ───────────────────────────────────────────────
img.save(OUTPUT, "PNG")
print(f"Saved: {OUTPUT}")
print("DONE")
