# Deploy POP Store Computer to HostAtom

คู่มือนี้สำหรับนำเว็บ Next.js + MariaDB ขึ้น HostAtom แบบใช้งานจริง

## 1. สิ่งที่ Host ต้องรองรับ

เว็บนี้ไม่ใช่เว็บ static เพราะมี:

- Next.js App Router แบบ server-rendered
- Server Actions สำหรับหลังบ้าน
- อัปโหลดรูปสินค้าไปที่ `public/uploads/products`
- เชื่อมต่อ MariaDB ผ่าน Drizzle ORM

ดังนั้นแพ็กเกจ HostAtom ต้องรองรับ:

- Node.js อย่างน้อย `20.9.0`
- MariaDB หรือ MySQL
- SSH หรือ cPanel Terminal
- cPanel Node.js Application / Setup Node.js App หรือเครื่องมือเทียบเท่า
- พื้นที่เขียนไฟล์ได้สำหรับ `public/uploads/products`

ถ้าแพ็กเกจเป็น shared hosting ที่รองรับเฉพาะ PHP/HTML จะรันโปรเจกต์นี้ไม่ได้ ต้องใช้แพ็กเกจที่เปิด Node.js app ได้ หรือ VPS/Cloud ที่ติดตั้ง Node.js ได้

## 2. เตรียมฐานข้อมูลบน HostAtom

ใน cPanel:

1. เข้า `MySQL Databases`
2. สร้าง database เช่น `popstore_catalog`
3. สร้าง database user เช่น `popstore_user`
4. ตั้งรหัสผ่านที่แข็งแรง
5. Add User to Database และให้สิทธิ์ `ALL PRIVILEGES`
6. จดข้อมูลนี้ไว้:
   - DB host เช่น `localhost`
   - DB name
   - DB user
   - DB password

ตัวอย่าง `DATABASE_URL`:

```env
DATABASE_URL=mysql://DB_USER:DB_PASSWORD@localhost:3306/DB_NAME
```

ถ้าชื่อ database/user มี prefix ของ cPanel เช่น `account_popstore_catalog` ให้ใช้ชื่อเต็มตาม cPanel

## 3. เตรียม Environment Variables

ใน Node.js App ของ cPanel หรือไฟล์ `.env.local` บน server ให้ตั้งค่า:

```env
DATABASE_URL=mysql://DB_USER:DB_PASSWORD@localhost:3306/DB_NAME
ADMIN_EMAIL=popstorecomputer@gmail.com
ADMIN_PASSWORD_HASH=ใส่ค่าจากเครื่อง dev
AUTH_SECRET=ใส่ค่า secret ยาว ๆ
NODE_ENV=production
```

ข้อสำคัญ:

- ห้ามใส่รหัสผ่าน admin แบบ plain text ใน repo
- `ADMIN_PASSWORD_HASH` ใช้ค่าจาก `.env.local` เครื่อง dev ได้
- `AUTH_SECRET` ต้องเป็น string ยาวและสุ่ม

## 4. วิธี Deploy แบบแนะนำ: Git Clone บน Host

เข้า SSH หรือ cPanel Terminal:

```bash
cd ~
git clone https://github.com/aachanin1/New-POP-Storecomputer.git pop-store
cd pop-store
npm install
npm run build
npx drizzle-kit migrate
```

หลัง `migrate` ผ่าน ให้ตรวจว่า build ผ่าน:

```bash
npm run build
```

## 5. ตั้งค่า Node.js Application ใน cPanel

ใน cPanel เมนู `Setup Node.js App` หรือ `Application Manager`:

1. กด Create Application
2. เลือก Node.js version `20.9.0` หรือใหม่กว่า
3. Application root: path ของโปรเจกต์ เช่น `pop-store`
4. Application URL: โดเมน เช่น `https://popstorecomputer.com`
5. Application startup file:
   - ถ้าหน้า cPanel ให้ใส่คำสั่ง start script ได้ ให้ใช้ `npm run start:host`
   - ถ้าต้องกรอก startup file อย่างเดียว ให้สอบถาม HostAtom ว่ารองรับ Next.js ผ่าน `npm start` หรือ Passenger แบบ custom command หรือไม่
6. Environment:
   - `NODE_ENV=production`
   - `DATABASE_URL=...`
   - `ADMIN_EMAIL=...`
   - `ADMIN_PASSWORD_HASH=...`
   - `AUTH_SECRET=...`
7. กด Run NPM Install ถ้ามีปุ่ม
8. กด Restart Application

คำสั่ง production ของโปรเจกต์:

```bash
npm run start:host
```

ถ้า server ไม่ส่ง `PORT` มา script นี้จะใช้ port `3000`

## 6. Upload รูปสินค้าที่เคยเพิ่มในเครื่อง dev

ระบบหลังบ้านเก็บรูปสินค้าที่:

```text
public/uploads/products/
```

ถ้ามีสินค้าทดสอบ/สินค้าจริงอยู่ในเครื่อง dev แล้ว ต้อง upload โฟลเดอร์นี้ขึ้น server ด้วย ไม่อย่างนั้น database จะมี path รูป แต่ไฟล์รูปไม่อยู่บน host

ตัวอย่าง path ที่ต้องมีบน server:

```text
pop-store/public/uploads/products/
```

ตรวจ permission ให้ Node.js เขียนไฟล์ได้ เพราะหลังบ้านต้องอัปโหลดรูปสินค้าใหม่เข้าโฟลเดอร์นี้

## 7. หลัง Deploy แล้วต้องทดสอบ

เปิด URL เหล่านี้:

- `/`
- `/products`
- `/privacy-policy`
- `/robots.txt`
- `/sitemap.xml`
- `/admin/login`
- `/admin/products`
- `/admin/add-product`

ทดสอบหลังบ้าน:

1. Login ด้วย admin
2. เพิ่มประเภท/รุ่น
3. เพิ่มสินค้าใหม่พร้อมรูป
4. เปิดหน้า `/products` ดูว่าสินค้าแสดง
5. ปิดการแสดงผลสินค้าจากหลังบ้าน แล้วเช็กว่าหายจากหน้าเว็บลูกค้า

## 8. เวลาอัปเดตเว็บครั้งต่อไป

บน server:

```bash
cd ~/pop-store
git pull origin main
npm install
npm run build
npx drizzle-kit migrate
```

จากนั้น restart Node.js app ใน cPanel

## 9. หมายเหตุสำหรับ Production

- ถ้า HostAtom เป็น shared hosting และไม่ให้ Node.js เขียนไฟล์ใน `public/uploads/products` ต้องเปลี่ยนไปใช้ storage ภายนอก เช่น Cloudflare R2, S3 หรือ Supabase Storage
- ถ้าใช้ Cloudflare หน้าเว็บ ให้ตั้ง SSL เป็น Full หรือ Full (strict)
- หลัง deploy ให้ส่ง sitemap ไป Google Search Console:
  - `https://popstorecomputer.com/sitemap.xml`
- ห้าม commit `.env.local`
- สำรอง database และโฟลเดอร์ `public/uploads/products` เป็นประจำ

## 10. Sources

- Next.js official deployment docs: https://nextjs.org/docs/app/getting-started/deploying
- cPanel Node.js application docs: https://docs.cpanel.net/knowledge-base/web-services/how-to-install-a-node.js-application/
