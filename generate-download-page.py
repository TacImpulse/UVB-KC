"""
Kilo Workspace File Downloader
For use with hosted Kilo services that provide file access
"""

import os
import base64

WORKSPACE = "/workspace/d611983a-6600-4037-bb40-4f69390fdee2/sessions/agent_bc462f5c-8ba1-414c-99b3-8cd9b77208ce"

def generate_download_page():
    """Generate HTML page that serves files from the workspace"""

    files = {
        "UVB-KnightBot-Complete-Deployment.zip": f"{WORKSPACE}/UVB-KnightBot-Complete-Deployment.zip",
        "UVB-KnightBot-Session-Log.gz": f"{WORKSPACE}/UVB-KnightBot-Session-Log.gz"
    }

    html = """<!DOCTYPE html>
<html>
<head>
    <title>UVB-KnightBot Downloads</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        .file { background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px; }
        button { background: #e94560; color: white; border: none; padding: 12px 24px;
                 border-radius: 6px; font-size: 16px; cursor: pointer; }
        button:hover { background: #ff6b6b; }
        .size { color: #666; font-size: 14px; margin: 5px 0; }
    </style>
</head>
<body>
    <h1>UVB-KnightBot Downloads</h1>
"""

    for filename, filepath in files.items():
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            html += f"""
    <div class="file">
        <h3>{filename}</h3>
        <div class="size">Size: {size:,} bytes ({size/1024/1024:.1f} MB)</div>
        <button onclick="downloadFile('{filename}', {size})">
            Download {filename}
        </button>
    </div>
"""
        else:
            html += f"""
    <div class="file">
        <h3>{filename}</h3>
        <div style="color: red;">File not found</div>
    </div>
"""

    html += """
    <script>
        async function downloadFile(filename, size) {
            const response = await fetch(`/api/files/${filename}`);
            if (!response.ok) {
                alert('Download failed: ' + response.statusText);
                return;
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    </script>
</body>
</html>"""

    with open(f"{WORKSPACE}/download.html", "w") as f:
        f.write(html)
    print(f"Created: {WORKSPACE}/download.html")

if __name__ == "__main__":
    generate_download_page()
