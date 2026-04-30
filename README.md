# POP Store Computer

เว็บไซต์ Catalog สินค้าสำหรับร้าน POP Store Computer พัฒนาด้วย Next.js App Router, Tailwind CSS, Drizzle ORM และ MariaDB

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- Drizzle ORM
- MariaDB
- Plesk-ready Node.js runtime ผ่าน `server.cjs`

## Environment Variables

สร้างไฟล์ `.env.local` จาก `.env.example`

```env
DATABASE_URL=mysql://user:password@localhost:3306/database_name
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=replace-with-scrypt-salt-and-hash
AUTH_SECRET=replace-with-long-random-secret
```

ห้าม commit `.env.local` เพราะเป็นค่าจริงของแต่ละ environment

## Development

ติดตั้ง dependencies

```bash
npm install
```

รันเว็บไซต์ในเครื่อง

```bash
npm run dev
```

เปิดใช้งานที่ `http://localhost:3000`

## Database

สำหรับเครื่อง local ที่ใช้ Docker MariaDB

```bash
docker compose up -d
```

สร้าง migration หลังแก้ schema

```bash
npm run db:generate
```

ใช้กับ production หรือ host จริง

```bash
npm run db:migrate
```

ใช้กับ local/dev เมื่อต้องการ push schema ตรงเข้า database

```bash
npm run db:push
```

## Production Build

```bash
npm run build
```

รัน production แบบทั่วไป

```bash
npm start
```

รันแบบ Plesk

```bash
npm run start:plesk
```

โปรเจกต์นี้ใช้ `server.cjs` เป็น startup file หลักสำหรับ Plesk เพื่อให้ตรงกับ host จริงและลดปัญหา ESM/CommonJS

## Plesk Deploy Flow

1. Pull code ล่าสุดจาก GitHub
2. ตั้งค่า environment variables ใน Plesk
3. รัน `npm install`
4. รัน `npm run build`
5. รัน `npm run db:migrate`
6. ตั้ง startup file เป็น `server.cjs`
7. Restart Node.js app

รายละเอียดเพิ่มเติมดูที่ `PLESK_DEPLOYMENT.md`

## Uploads

รูปสินค้าที่อัปโหลดจะอยู่ใน `public/uploads/products`

โฟลเดอร์นี้ไม่ถูก commit ขึ้น Git ยกเว้น `.gitkeep` ดังนั้นตอนย้าย host ต้อง backup/sync โฟลเดอร์รูปสินค้าคู่กับ database เสมอ

## Repository

GitHub: https://github.com/aachanin1/New-POP-Storecomputer
