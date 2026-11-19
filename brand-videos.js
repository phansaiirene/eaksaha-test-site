// =====================================================================
// BRAND VIDEOS (YouTube) for each brand page
//   hero   : the video that plays silently behind the top of the brand page
//            (short official ads work best: 15–90 seconds)
//   videos : shown in the "Videos" section of the brand page
//            id  = the code after "watch?v=" in the YouTube link
//            by  = whose channel it is (shown under the video)
//
// To change a video: open it on YouTube, copy the code after "v=" and paste it here.
// Checked November 2026. Official brand channels are used where they exist;
// otherwise well-known Thai review channels (credited with "by").
// =====================================================================

const brandVideos = {
  ford: {
    hero: "ODNeY3Ms6Fw",
    videos: [
      { id: "ODNeY3Ms6Fw", title: "ใหม่! Ranger Wildtrak-X", by: "Ford Thailand" },
      { id: "sNNTlioEOG4", title: "Ford Everest · รับมือได้หมด ทุกบททดสอบ", by: "Ford Thailand" },
      { id: "nQNdlkatXmk", title: "Next-Gen Ranger Raptor", by: "Ford Thailand" }
    ]
  },
  nissan: {
    hero: "JV_0YPfzi_U",
    videos: [
      { id: "JV_0YPfzi_U", title: "The All-New KICKS e-POWER · ProPILOT", by: "Nissan Thailand" },
      { id: "QYeTpPzTHaY", title: "นิสสัน นาวารา ใหม่", by: "Nissan Thailand" },
      { id: "cuF5L_7b8Ek", title: "NissanConnect เชื่อมต่อรถกับมือถือ", by: "EAKSAHA Channel" }
    ]
  },
  mitsubishi: {
    hero: "LlGWplXFgF0",
    videos: [
      { id: "LlGWplXFgF0", title: "ALL NEW MITSUBISHI PAJERO · LIVE MASTERPIECE", by: "Mitsubishi Motors Thailand" },
      { id: "fmHjYW92oas", title: "ALL-NEW MITSUBISHI TRITON · The Disruptor", by: "Mitsubishi Motors Thailand" },
      { id: "LUThRuwDqA0", title: "All New Pajero Sport · Product Features", by: "Mitsubishi Motors Thailand" }
    ]
  },
  mg: {
    hero: "i1l-Nn358jE",
    videos: [
      { id: "i1l-Nn358jE", title: "NEW MG S5 EV", by: "MG Thailand" },
      { id: "IAP6KN97A5Y", title: "NEW MG ZS", by: "MG Thailand" },
      { id: "jXV5SXEZAQc", title: "NEW MG HS", by: "MG Thailand" }
    ]
  },
  gwm: {
    hero: "cXZuyQXLs6I",
    videos: [
      { id: "cXZuyQXLs6I", title: "ALL NEW GWM HAVAL H6 PHEV · Maximized Potential", by: "GWM Thailand" },
      { id: "vHkhES88TG0", title: "GWM HAVAL H6 PHEV สำหรับครอบครัว", by: "GWM Thailand" },
      { id: "MpGFxyPjRPY", title: "TANK 300 บอกเลย สวยจีจีนะ", by: "EAKSAHA Channel" }
    ]
  },
  geely: {
    hero: "",
    videos: [
      { id: "AsgLkhKDJS0", title: "ลอง GEELY EX2", by: "autolifethailand" },
      { id: "7DZblMXRAEA", title: "ลอง GEELY EX5 เวอร์ชันส่งมอบลูกค้า", by: "autolifethailand" },
      { id: "Fn6XDKyf14w", title: "ลอง Geely STARRAY EM-R REEV", by: "autolifethailand" }
    ]
  },
  changan: {
    hero: "4JcO1fSIsM0",
    videos: [
      { id: "4JcO1fSIsM0", title: "CHANGAN NEVO ยานยนต์ที่ขับเคลื่อนความสุข", by: "CHANGAN Thailand" },
      { id: "NiqoM6zMZEQ", title: "NEVO Q05 กว้างขวาง นุ่มสบาย ใช้งานง่าย", by: "CHANGAN Thailand" },
      { id: "ICs-DODxdt4", title: "NEVO Q05 มีช่องลับท้ายรถด้วยเหรอ?", by: "EAKSAHA Channel" },
      { id: "Cq3AXhla4ks", title: "DEEPAL S05 · A Dream You Can Own", by: "CHANGAN Thailand" },
      { id: "LYOntBe8DcY", title: "DEEPAL NEW S07", by: "CHANGAN Thailand" },
      { id: "J8wTEei2ylw", title: "DEEPAL แอร์เย็นแค่ไหน", by: "EAKSAHA Channel" }
    ]
  },
  "omoda-jaecoo": {
    hero: "qy3rdesQbqo",
    videos: [
      { id: "qy3rdesQbqo", title: "OMODA 4 EV", by: "OMODA & JAECOO Thailand" },
      { id: "XhnD0005xGE", title: "JAECOO 6T REEV", by: "OMODA & JAECOO Thailand" },
      { id: "h5aqMFf0UDM", title: "แผนกไหนทำงานหนักที่สุดใน OJ โคราช", by: "EAKSAHA Channel" }
    ]
  },
  "gac-aion": {
    hero: "",
    videos: [
      { id: "kjhGDgTuUsM", title: "ลอง AION V 602 รถ SUV ครอบครัว", by: "autolifethailand" },
      { id: "75kyOJJAwwo", title: "ลอง AION UT Premium", by: "autolifethailand" }
    ]
  },
  riddara: {
    hero: "",
    videos: [
      { id: "erOQ7V38ooM", title: "ลองกระบะไฟฟ้า RIDDARA RD6", by: "autolifethailand" },
      { id: "pT0ROQDZanw", title: "ทดลองขับ Riddara RD6 2WD Long Range", by: "AutoMotorThailand" }
    ]
  },
  lepas: {
    hero: "",
    videos: [
      { id: "CVcgXCXRhFA", title: "พาชม Lepas L6, L4 และ L8", by: "autolifethailand" },
      { id: "NSi9H2kjg9o", title: "3 ฟังก์ชันแจ่มๆ ใน Lepas L6", by: "EAKSAHA Channel" }
    ]
  },
  wuling: {
    hero: "",
    videos: [
      { id: "BkjLAdRz8NI", title: "ลอง Wuling BINGUO", by: "autolifethailand" }
    ]
  },
  chery: {
    hero: "I9bAAuj9CzA",
    videos: [
      { id: "I9bAAuj9CzA", title: "CHERY TIGGO8 CSH · First for Family", by: "Chery Thailand" },
      { id: "M5atd40Pxos", title: "ลอง Chery TIGGO8 PHEV", by: "autolifethailand" }
    ]
  },
  avatr: {
    hero: "",
    videos: []
  }
};
