# Deploy POP Store Computer to Plesk

คู่มือนี้สำหรับนำเว็บ Next.js + MariaDB ขึ้น Plesk แบบ production

## 1. สิ่งที่ Plesk ต้องรองรับ

เว็บนี้ต้องใช้ server runtime เพราะมีระบบหลังบ้าน อัปโหลดรูป และอ่านข้อมูลจาก MariaDB

ต้องมี:

- Node.js `20.9.0` หรือใหม่กว่า
- MariaDB/MySQL
- SSH หรือ Plesk Terminal
- Plesk Node.js extension
- สิทธิ์เขียนไฟล์ใน `public/uploads/products`

ถ้า Plesk ของแพ็กเกจนั้นไม่มี Node.js extension หรือเลือก Node.js version ต่ำกว่า 20.9.0 จะรัน Next.js 16 ไม่ได้

## 2. เตรียม Database

ใน Plesk:

1. เข้าเมนู `Databases`
2. กด `Add Database`
3. ตั้งชื่อ database เช่น `popstore_catalog`
4. สร้าง database user และ password
5. จดค่า:
   - Database host เช่น `localhost`
   - Database name
   - Database user
   - Database password 6uxeRUziq2vt4

ตัวอย่าง:

```env
DATABASE_URL=mysql://DB_USER:DB_PASSWORD@localhost:3306/DB_NAME

DATABASE_URL=mysql://popstore_user:6uxeRUziq2vt4@localhost:3306/popstore_catalog


```

## 3. Upload หรือ Clone โปรเจกต์

วิธีแนะนำคือ clone จาก GitHub ผ่าน SSH/Terminal:

```bash
cd ~/httpdocs
git clone https://github.com/aachanin1/New-POP-Storecomputer.git pop-store
cd pop-store
npm install
npm run build
npx drizzle-kit migrate
```

ถ้า Plesk domain ใช้ path อื่น ให้เปลี่ยน `~/httpdocs` ตาม path จริงของ domain นั้น

## 4. ตั้ง Environment Variables ใน Plesk

ไปที่ Domain → `Node.js` → Environment variables แล้วเพิ่ม:

```env
NODE_ENV=production
DATABASE_URL=mysql://DB_USER:DB_PASSWORD@localhost:3306/DB_NAME
ADMIN_EMAIL=popstorecomputer@gmail.com
ADMIN_PASSWORD_HASH=ใส่ค่าจากเครื่อง dev
AUTH_SECRET=ใส่ค่า secret ยาว ๆ
```

สำคัญ:

- อย่าใส่รหัสผ่าน admin แบบ plain text
- ใช้ `ADMIN_PASSWORD_HASH` จาก `.env.local` เครื่อง dev ได้
- `AUTH_SECRET` ต้องเป็นค่าสุ่มยาว ๆ

## 5. ตั้งค่า Node.js App ใน Plesk

ในหน้า Domain → `Node.js`:

1. Enable Node.js
2. Node.js version: เลือก `20.9.0` หรือใหม่กว่า
3. Application mode: `production`
4. Application root: path โปรเจกต์ เช่น

```text
httpdocs/pop-store
```

5. Document root:

```text
httpdocs/pop-store/public
```

6. Application startup file:

```text
server.js
```

7. กด `NPM install` ถ้ามีปุ่ม
8. กด `Restart App`

โปรเจกต์มี script สำหรับ Plesk:

```bash
npm run start:plesk
```

แต่ใน Plesk ส่วนใหญ่ให้ระบุ startup file เป็น `server.js` แล้ว Plesk จะจัดการรัน Node process ให้

## 6. ตั้งค่า Domain ให้ยิงเข้า Node.js

Plesk บางระบบจะ reverse proxy เข้า Node.js ให้เองหลัง Enable Node.js แล้ว

ถ้าเปิดเว็บแล้วยังเห็นไฟล์ static หรือหน้า default ของ Plesk:

1. เช็กว่า `Application root` ถูกต้อง
2. เช็กว่า `Application startup file` เป็น `server.js`
3. Restart App
4. เช็ก log ใน Node.js page
5. ตรวจว่า app listen ตาม `process.env.PORT` ที่ Plesk ส่งมา

ไฟล์ `server.js` ในโปรเจกต์นี้รองรับ `process.env.PORT` แล้ว

## 7. Upload รูปสินค้าที่มีอยู่

ระบบเก็บรูปสินค้าที่:

```text
public/uploads/products/
```

ถ้าในเครื่อง dev มีรูปสินค้าอยู่แล้ว ต้อง upload folder นี้ขึ้น server ด้วย

ตัวอย่าง path บน Plesk:

```text
httpdocs/pop-store/public/uploads/products/
```

ตรวจ permission ให้ Node.js เขียนได้ เพราะหลังบ้านต้องบันทึกรูปสินค้าใหม่

## 8. ทดสอบหลัง Deploy

เปิด:

- `/`
- `/products`
- `/privacy-policy`
- `/robots.txt`
- `/sitemap.xml`
- `/admin/login`

ทดสอบระบบหลังบ้าน:

1. Login admin
2. เพิ่มประเภท/รุ่น
3. เพิ่มสินค้าใหม่พร้อมรูป
4. ตรวจว่ารูปแสดงบน `/products`
5. ปิดการแสดงผลสินค้า แล้วตรวจว่าหายจากหน้าเว็บลูกค้า

## 9. อัปเดตเว็บครั้งต่อไป

บน server:

```bash
cd ~/httpdocs/pop-store
git pull origin main
npm install
npm run build
npx drizzle-kit migrate
```

จากนั้นกด Restart App ใน Plesk

## 10. Troubleshooting

### เปิดเว็บแล้ว Error Node version

Next.js 16 ต้องใช้ Node.js `>=20.9.0`

แก้โดยเลือก Node.js version ใหม่กว่าใน Plesk หรือให้ผู้ให้บริการเปิด version ใหม่กว่าให้

### Upload รูปไม่ได้

ตรวจ permission ของ:

```text
public/uploads/products/
```

Node.js user ของ Plesk ต้องเขียนไฟล์ได้

### หน้าเว็บขึ้น แต่สินค้าหาย

ตรวจ:

```bash
npx drizzle-kit migrate
```

และเช็ก `DATABASE_URL` ว่าชี้ database production ถูกตัว

### Admin login ไม่ได้

ตรวจค่า:

```env
ADMIN_EMAIL
ADMIN_PASSWORD_HASH
AUTH_SECRET
```

ถ้าเปลี่ยน `AUTH_SECRET` session เก่าจะหมดอายุ ต้อง login ใหม่

## 11. Sources

- Next.js deployment docs: https://nextjs.org/docs/app/getting-started/deploying
- Plesk Node.js extension docs: https://docs.plesk.com/en-US/obsidian/administrator-guide/website-management/nodejs-support.76652/
