# Panduan Deployment (Aplikasi Deteksi Industri)

Aplikasi ini menggunakan teknologi campuran untuk mencapai akurasi tingkat industri:
1. **Frontend:** React + Vite (Antarmuka Pengguna)
2. **Backend:** Node.js (Server API) 
3. **Core Engine:** Python 3 + OpenCV + scikit-learn (Algoritma Computer Vision)

## Apakah bisa di-deploy langsung di Netlify?
**TIDAK BISA langsung jalan.** Netlify pada dasarnya adalah hosting untuk situs statis (Frontend). Netlify memang memiliki "Netlify Functions" (Serverless Node.js), namun lingkungannya **tidak mendukung instalasi sistem operasi khusus seperti Python 3.x dan pustaka C++ bawaan (OpenCV)**. Jika di-deploy di Netlify standar, bagian Frontend akan muncul, namun saat Anda upload gambar, API akan mengalami *Error* atau koneksi terputus.

---

## Solusi Deployment Terbaik: Menggunakan DOCKER
Karena aplikasi ini butuh environment khusus (Node.js + Python + OpenCV saling berkomunikasi), cara lulus uji standar industri adalah menggunakan **Docker**. Kami sudah menyertakan file `Dockerfile` di dalam proyek ini. 

Anda dapat meng-hosting aplikasi ini di platform seperti **Render.com**, **Railway.app**, atau **VPS (Virtual Private Server)** seperti Niagahoster, AWS, DigitalOcean, atau Google Cloud.

Berikut ini adalah tutorial deploy gratis/mudah menggunakan **Render.com**:

### Opsi 1: Deploy ke Render.com (Sangat Mudah, Mendukung Docker)

1. **Upload ke GitHub:**
   - Ekspor/download proyek ini (Gunakan tombol "Export to GitHub" atau Download ZIP di AI Studio).
   - Buat repositori baru di GitHub Anda dan push/upload semua file proyek ini ke repositori tersebut.
2. **Daftar ke Render:**
   - Buka [Render.com](https://render.com) dan buat akun (bisa daftar pakai akun GitHub).
3. **Buat Web Service Baru:**
   - Di dashboard Render, klik tombol **"New +" -> "Web Service"**.
   - Hubungkan akun GitHub Anda, dan pilih Repositori proyek ini.
4. **Setting Konfigurasi Render:**
   - **Name:** Bebas (cth: qa-check-engine)
   - **Region:** Singapore / Pilih yang terdekat
   - **Branch:** main / master
   - **Runtime:** `Docker` (Sangat Penting! Pastikan tertulis Docker, Render akan mendeteksinya secara otomatis dari `Dockerfile`).
   - **Instance Type:** Pilih *Free* (Untuk mencoba) atau berbayar jika butuh RAM besar untuk gambar resolusi tinggi.
5. **Tambahkan Environment Variable:**
   - Buka bagian *Advanced*, lalu klik *Add Environment Variable*
   - Key: `PORT`
   - Value: `3000`
   - Key: `NODE_ENV`
   - Value: `production`
6. **Klik "Create Web Service"**
   - Render akan mulai membangun kontainer berdasarkan `Dockerfile`. Ini memakan waktu beberapa menit karena akan menginstall server Ubuntu, Python, NodeJS, dan OpenCV sekaligus secara otomatis.
   - Jika sudah selesai, status akan menjadi "Live" dan Anda akan mendapatkan URL Render Anda (cth: `https://qa-check-engine.onrender.com`).

---

### Opsi 2: Deploy ke VPS Sendiri (Ubuntu)

Jika pabrik/perusahaan Anda memiliki server lokal (On-Premise) atau sewa VPS, ikuti langkah ini:

1. **Masuk ke Server via SSH:**
   ```bash
   ssh root@IP_SERVER_ANDA
   ```
2. **Install Docker (Jika belum ada):**
   ```bash
   sudo apt update
   sudo apt install docker.io -y
   ```
3. **Upload File Proyek ini ke Server** (Menggunakan git clone / FTP / SCP).
4. **Masuk ke folder proyek:**
   ```bash
   cd path/ke/folder/proyek
   ```
5. **Build Image:**
   ```bash
   sudo docker build -t qa-engine .
   ```
   *(Tunggu sistem menginstalasi sistem operasi di dalam docker sesuai Dockerfile)*
6. **Jalankan Aplikasi:**
   ```bash
   sudo docker run -d -p 80:3000 --name web-qa qa-engine
   ```
7. Aplikasi siap diakses melalui IP VPS Anda di browser mesin QA Anda.

## Catatan PENTING untuk Lingkungan Pabrik (QA)
- **Kamera Resolusi Sangat Tinggi:** Proses analisa gambar 4K atau raw image yang sangat besar via OpenCV akan membutuhkan RAM setidaknya 1GB - 2GB di sisi server.
- Pastikan pencahayaan (*lighting*) area alat di pabrik dikondisikan cukup stabil (meskipun engine ini mampu beradaptasi dengan sistem Adaptive Threshold).
