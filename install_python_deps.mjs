import { execSync } from "child_process";

try {
  execSync("python3 -m pip install opencv-python-headless numpy scikit-learn -t ./python_modules", { stdio: "inherit" });
} catch (error) {
  try {
     execSync("python -m pip install opencv-python-headless numpy scikit-learn -t ./python_modules", { stdio: "inherit" });
  } catch (error2) {
     console.error("Failed to install python dependencies via python3 -m pip and python -m pip.");
  }
}
