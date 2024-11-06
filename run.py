import subprocess
import os
import sys
from threading import Thread

def run_frontend():
   
    frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'frontend'))
    
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    subprocess.run([npm_cmd, "run", "dev"], cwd=frontend_path, check=True)

def run_backend():
    backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend'))
    venv_path = os.path.join(backend_path, "venv", "Scripts", "python")
    if sys.platform == "linux" or sys.platform == "darwin":
        venv_path = os.path.join(backend_path, "venv", "bin", "python")
        
    subprocess.run([
        venv_path,
        "-m",
        "uvicorn",
        "main:app",
        "--reload",
        "--port",
        "8000"
    ], cwd=backend_path, check=True)

if __name__ == "__main__":
    frontend_thread = Thread(target=run_frontend)
    backend_thread = Thread(target=run_backend)
    
    print("Starting servers...")
    print("Frontend will be available at http://localhost:3000")
    print("Backend will be available at http://localhost:8000")
    
    frontend_thread.start()
    backend_thread.start()
    
    frontend_thread.join()
    backend_thread.join()