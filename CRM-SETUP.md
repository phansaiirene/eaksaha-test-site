# Test-drive CRM: set up in about 5 minutes
# ตั้งค่าระบบ CRM จองทดลองขับ (ประมาณ 5 นาที)

Customers fill in the form on **test-drive.html**. Each booking goes into a Google Sheet,
in a separate tab for each brand, and the brand's CRO gets an email straight away.

ลูกค้ากรอกฟอร์มที่หน้า test-drive.html → ข้อมูลเข้า Google Sheet แยกแท็บตามแบรนด์ → CRO ของแบรนด์ได้รับอีเมลทันที

---

## 1. Make the Google Sheet · สร้าง Google Sheet
1. Go to **sheets.google.com** with the company Google account and create a blank sheet.
   Name it e.g. **"Eaksaha Test-Drive CRM"**.
2. Menu **Extensions → Apps Script**.
3. Delete everything in the editor, then paste the whole content of **crm/Code.gs** from this project. Click **Save** (💾).

## 2. Build the tabs · สร้างแท็บ
1. In the Apps Script editor, choose **setup** in the function list at the top, then press **Run**.
2. Google asks for permission the first time → choose the company account → **Allow**.
   (It needs permission to edit this sheet and send emails for you.)
3. Back in the sheet you now have: **Dashboard**, **Settings**, and one tab per brand (FORD, MG, GWM …).

## 3. Add each brand's CRO · ใส่อีเมล CRO ของแต่ละแบรนด์
In the **Settings** tab, for every brand fill in:
- **CRO name(s)**
- **CRO email(s)**: several emails can be separated with commas
- **Separate spreadsheet ID** (optional): if a brand's CRO should only see their own customers,
  create a separate Google Sheet for them, share it with that CRO, and paste its ID here
  (the long code in its address between `/d/` and `/edit`). Bookings are copied there too.

## 4. Put it online · เปิดใช้งาน
1. In Apps Script: **Deploy → New deployment**.
2. Click the ⚙ next to "Select type" → **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**. Click **Deploy**.
4. Copy the **Web app URL** (it ends in `/exec`).
5. Open **crm-config.js** in this project and paste it between the quotes:
   `const CRM_ENDPOINT = "https://script.google.com/macros/s/…/exec";`
6. Save. The form now sends bookings to the sheet. Send yourself a test booking to check.

> If you change the script later, use **Deploy → Manage deployments → ✏ Edit → Version: New version**,
> so the web address stays the same.

## 5. Daily use · การใช้งานทุกวัน
- New bookings are **highlighted yellow** with Status **New**.
- The CRO calls the customer, then sets **Status** (Contacted, Test drive booked, Test drive done, Purchased, Not interested, No answer),
  their name in **Assigned CRO**, the date in **Contacted on**, and anything useful in **Staff notes**.
- **Dashboard** shows totals per brand and status, and how many came in the last 7 days.
- Optional morning reminder of customers still "New": Apps Script → **Triggers (⏰)** → **Add trigger** →
  function `sendMorningReminder`, event **Time-driven**, **Day timer**, **8am–9am**.

## Privacy (PDPA) · ความเป็นส่วนตัว
- Customers must tick the consent box before sending. The time of consent is saved with every booking.
- Share the sheet only with staff who need it. Brands with a separate spreadsheet keep their customers apart.
- Delete a customer's row if they ask you to remove their data.
