# Praktikum Autentikasi JWT & Push Notification
Pemrograman Mobile — Express + MySQL + React Native (Expo)

Monorepo: `backend/` (Express + MySQL + JWT) dan `mobile/` (Expo Router).

## 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env  (lalu isi nilainya)
```
Isi `.env`:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_mobile_auth
JWT_SECRET=ganti_dengan_rahasia_panjang_acak
JWT_EXPIRES_IN=1h
```
Buat database: jalankan `schema.sql` lewat phpMyAdmin / MySQL Workbench / terminal, lalu:
```bash
npm run dev
```
Uji dengan Postman: import `backend/postman/API-Auth-Notif.postman_collection.json`
dan jalankan request nomor 1–13 berurutan.

## 2. Mobile (Expo)
Folder `mobile/` berisi source code saja. Cara memasangnya:
```bash
npx create-expo-app@latest mobile-auth-notif
cd mobile-auth-notif
# hapus isi folder app/ bawaan template, lalu salin dari repo ini:
#   mobile/app, components, constants, context, services, utils  -> ke mobile-auth-notif/
npx expo install expo-secure-store expo-notifications expo-constants
cp mobile/.env.example .env     # isi IPv4 laptop
npx expo start
```
Scan QR dengan Expo Go. Pastikan `.env`, `google-services.json`, dan service-account key ada di `.gitignore`.

## 3. Daftar Endpoint
| Metode | URL | Auth | Body | Tujuan |
|---|---|---|---|---|
| POST | /auth/register | Tidak | nama, email, password | Membuat user |
| POST | /auth/login | Tidak | email, password | Mengembalikan JWT |
| GET | /auth/me | Bearer JWT | - | Profil user aktif |
| POST | /notifications/token | Bearer JWT | expoPushToken | Simpan push token |
| POST | /notifications/test | Bearer JWT | - | Kirim notifikasi uji |

## 4. Push Notification
Remote push di Android membutuhkan development build (EAS) + Firebase FCM v1
(lihat Bagian D modul). Di Expo Go Android tombol notifikasi menampilkan pesan
penjelasan, fitur lain tetap berjalan.
