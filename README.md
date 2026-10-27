# Praktikum Autentikasi JWT & Push Notification
Pemrograman Mobile (SIF125113) — Express + MySQL + React Native (Expo)

Monorepo:
- `backend/`    : API Express + MySQL + JWT (modul Sesi 1 & endpoint notifikasi Sesi 3)
- `mobile-app/` : aplikasi Expo Router (modul Sesi 2 & 3)

## 1. Backend
```bash
cd backend
npm install
copy .env.example .env      # macOS/Linux: cp .env.example .env
```
Isi `.env` (contoh):
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306            # ubah sesuai port MySQL kamu (mis. 3307 untuk XAMPP tertentu)
DB_USER=root
DB_PASSWORD=
DB_NAME=db_mobile_auth
JWT_SECRET=ganti_dengan_rahasia_panjang_acak
JWT_EXPIRES_IN=1h
```
Buat database: jalankan `backend/schema.sql` (phpMyAdmin / Workbench / terminal), lalu:
```bash
npm run dev
```
Uji di Postman: import `backend/postman/API-Auth-Notif.postman_collection.json`, jalankan request 1–13 berurutan.

## 2. Mobile (Expo)
```bash
cd mobile-app
npm install
copy .env.example .env      # isi EXPO_PUBLIC_API_URL dengan IPv4 laptop, mis. http://192.168.1.10:3000
npx expo start
```
Remote push notification membutuhkan **development build** (EAS) + Firebase FCM v1:
```bash
npm install -g eas-cli
eas login
eas build --profile development --platform android
```
Pasang hasil build di HP, lalu `npx expo start` dan buka dengan development build tersebut.
Di Expo Go (Android) fitur push dinonaktifkan secara otomatis dan menampilkan pesan penjelasan; fitur login tetap berjalan.

## 3. Daftar Endpoint
| Metode | URL | Auth | Body | Contoh respons |
|---|---|---|---|---|
| POST | /auth/register | Tidak | nama, email, password | 201 `{id, nama, email}` |
| POST | /auth/login | Tidak | email, password | 200 `{token, user}` |
| GET | /auth/me | Bearer JWT | - | 200 `{id, nama, email, dibuat_pada}` |
| POST | /notifications/token | Bearer JWT | expoPushToken | 201 `{pesan}` |
| POST | /notifications/test | Bearer JWT | - | 200 `{pesan, hasil}` |

## 4. Keamanan
- Password disimpan sebagai hash bcrypt (cost 12); query memakai placeholder `?`.
- JWT diverifikasi (signature, masa berlaku, issuer, audience, algoritma HS256).
- Token disimpan di `expo-secure-store`.
- `.env` tidak di-commit; service-account key Firebase tidak boleh masuk repository.
