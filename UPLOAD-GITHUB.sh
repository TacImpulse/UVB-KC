UVB-KnightBot - GitHub Upload Script
====================================

Run this in your terminal (not in the Kilo chat):

```bash
# 1. Clone your new empty repository
git clone https://github.com/TacImpulse/UVB-KnightBot-Export.git
cd UVB-KnightBot-Export

# 2. Download the files from Kilo workspace
# Option A: If you have access to the workspace filesystem:
cp /workspace/d611983a-6600-4037-bb40-4f69390fdee2/sessions/agent_bc462f5c-8ba1-414c-99b3-8cd9b77208ce/UVB-KnightBot-Complete-Deployment.zip .
cp /workspace/d611983a-6600-4037-bb40-4f69390fdee2/sessions/agent_bc462f5c-8ba1-414c-99b3-8cd9b77208ce/UVB-KnightBot-Session-Log.md .

# Option B: If you CANNOT access the workspace filesystem directly,
# you need to get the files from Kilo first (via file browser or support),
# then place them in the UVB-KnightBot-Export folder manually.

# 3. Commit and push
git add UVB-KnightBot-Complete-Deployment.zip UVB-KnightBot-Session-Log.md
git commit -m "Add complete UVB-KnightBot deployment (172 MB) and session log"
git push origin main
```

After running this, your files will be live at:
https://github.com/TacImpulse/UVB-KnightBot-Export
