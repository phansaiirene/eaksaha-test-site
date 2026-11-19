// =====================================================================
// TEST-DRIVE CRM SETTINGS
// After you set up the Google Sheet + Apps Script (see CRM-SETUP.md),
// paste the "Web app URL" between the quotes below and save.
// While it is empty, the form shows customers how to call or LINE instead,
// so no booking is ever lost silently.
// =====================================================================

const CRM_ENDPOINT = "";

// What customers are told after they send the form
const CRM_REPLY_TIME_TH = "ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมงทำการ (จันทร์–เสาร์ 08:00–17:30)";
const CRM_REPLY_TIME_EN = "Our team will call you back within 1 business hour (Mon–Sat, 08:00–17:30).";
