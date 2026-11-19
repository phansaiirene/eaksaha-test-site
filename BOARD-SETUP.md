# Shared marketing board: set up in about 5 minutes
# ตั้งค่าบอร์ดทีมการตลาดให้ใช้ร่วมกัน (ประมาณ 5 นาที)

Right now **admin.html** runs in *demo mode*: each browser keeps its own copy.
After these steps, the whole marketing team sees and edits **one board**, from any phone or computer.
The data is kept in a Google Sheet owned by the company, so the manager can also open it in Google Sheets.

ตอนนี้ admin.html บันทึกข้อมูลในเบราว์เซอร์แต่ละเครื่อง หลังตั้งค่าตามขั้นตอนนี้ ทั้งทีมจะเห็นบอร์ดเดียวกันจากทุกที่

---

## 1. Make the Google Sheet · สร้าง Google Sheet
1. Go to **sheets.google.com** with the company Google account and create a blank sheet.
   Name it **"Eaksaha Marketing Board"**.
2. Menu **Extensions → Apps Script**.
3. Delete everything in the editor, paste the whole content of **crm/Board.gs**, then **Save** (💾).
4. Choose **setup** in the function list at the top and press **Run**. Allow the permissions it asks for.
   You now have the tabs **Settings**, **Projects**, **Team**, **Team calendar** (who is where) and **OEM claims**.

## 2. Set the team passcode · ตั้งรหัสทีม
In the **Settings** tab, type a passcode in cell **B1** (at least 6 letters/numbers) and share it only with the marketing team.
Change it any time, for example when someone leaves the team; everyone then types the new one once.

## 3. Put it online · เปิดใช้งาน
1. In Apps Script: **Deploy → New deployment → ⚙ → Web app**.
2. **Execute as: Me**, **Who has access: Anyone**. Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
3. Open **board-config.js** in this project and paste it between the quotes:
   `const BOARD_ENDPOINT = "https://script.google.com/macros/s/…/exec";`
4. Save. Open admin.html, type the passcode once, and pick your name under **"I am…"**.

> If you edit Board.gs later, use **Deploy → Manage deployments → ✏ → Version: New version** so the address stays the same.

> **Already set up before the Team calendar and Admin claims pages were added?** Paste the new **crm/Board.gs** over the old one,
> run **setup** once more (it only adds the two new tabs, nothing is deleted), then publish a **New version** as above.

## 4. Use it from anywhere · ใช้งานได้ทุกที่
The board page itself must be online for the team to open it away from this computer.
Upload the website (with admin.html) to a host such as **GitHub Pages** or **Netlify**, then share the
link `…/admin.html` with the team. Add it to your phone's home screen for one-tap access.

## Good to know · ข้อควรรู้
- Changes appear for everyone within about 15 seconds (and straight away when you come back to the tab).
- If two people change the **same project** at the same moment, the last save wins. Different projects never clash.
- Moving from demo mode: projects you made in demo mode stay in that browser only. Add your real team and projects again on the shared board.
- **Team calendar**: each person marks their days (in office, out shooting and where, event, meeting, work from home, leave). The manager sees the whole team's week, or one person's month.
- **Admin claims**: upload a PO (PDF or photo) and the amount, date, PO number and brand are filled in. Check the numbers, choose the % the brand pays back (remembered per brand), save. The page shows what we used against what the OEMs pay back, with red (late), amber (soon) and green (on track). The PO file is read in the browser only; it is not uploaded anywhere.
- **The team is ready-made**: Mama (GWM, FORD, LEPAS, GEELY), Noon (ESG, CHANGAN / DEEPAL, NISSAN, AVATR), Joseph (GAC AION, OMODA & JAECOO), plus one Offline marketing and one Admin claims person to rename on the Team page. New projects of a brand go to the person who looks after it.
- The passcode keeps casual visitors out. It is not bank-level security, so don't put passwords or customer ID numbers on the board.
