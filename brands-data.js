// =====================================================================
// BRAND & CAR MODEL INFORMATION
// This one file feeds every brand page (brand.html?b=ford, brand.html?b=mg …).
// To update a price or add a car: edit the text here, save, refresh the page.
//
// HOW EACH CAR IS WRITTEN
//   name     : model name shown big on the card
//   type     : short label, e.g. "Pickup · กระบะ"
//   tagline  : one short Thai selling line
//   fuel     : "EV", "Hybrid", "PHEV", "REEV", "Petrol", "Diesel"
//   seats    : number of seats (leave out if unsure)
//   versions : list of sub-models and prices (plain numbers, no commas), e.g.
//                versions: [
//                  { name: "2.0 Turbo XLT", price: 1099000 },
//                  { name: "2.0 Bi-Turbo Wildtrak", price: 1349000 }
//                ]
//              Only know the starting price? Use  versions: startingPrice(799000)
//              Leave it empty [] and the card shows "price coming soon".
//   promo    : this month's offer in one line (leave "" to hide it)
//   image    : car photo, e.g. "images/models/ford/ranger.webp" (official brand photo).
//              No image? The card shows the brand logo instead.
//
// PRICES CHECKED: November 2026 (suggested retail prices, before dealer promotions)
//   FORD        official · ford.co.th/buying/price-list
//   NISSAN      official · nissan.co.th/vehicles/all-grade-price.html
//   MITSUBISHI  official · mitsubishi-motors.co.th/en/buy/all-models-price
//   MG          official · mgcars.com/th (starting price per model only)
//   GWM         official · gwm.co.th/th/models (each model page; MSRP used)
//   CHANGAN     official · changan.co.th (NEVO & LUMIN, price after EV subsidy)
//   AVATR       official · avatr.co.th
//   OMODA&JAECOO official · omodajaecoo.co.th
//   GAC AION    official · gacgroup.com/th-th (model pages)
//   ⚠ NOT CONFIRMED (official site could not be opened; news / price-guide figures):
//   GEELY   zigwheels.co.th · WULING zigwheels.co.th · CHERY autolifethailand.tv
//   LEPAS   paultan.org / motorist.co.th (L6 regular price) · RIDDARA no price found
// =====================================================================

// Shortcut for models where only the starting price is known
function startingPrice(price) {
  return [{ name: "ราคาเริ่มต้น · Starting price", price: price }];
}

const brands = {
  ford: {
    name: "FORD",
    th: "ฟอร์ด",
    intro: "Pickups and SUVs built tough for Thai roads.",
    introTh: "กระบะและ SUV แกร่งทุกเส้นทาง",
    branches: ["โคราช", "ปากช่อง", "พิมาย"],
    models: [
      { name: "Ranger", image: "images/models/ford/ranger.webp", imageFit: "cover", type: "Pickup · กระบะ", tagline: "กระบะยอดนิยม แกร่ง ทนทุกงาน", fuel: "Diesel", seats: 5, promo: "",
        versions: [
          { name: "SWB 2.0L Turbo 4x4 10AT", price: 769000 },
          { name: "Open Cab XL+ 2.0L Turbo HR 10AT", price: 779000 },
          { name: "Standard Cab XL 2.0L Turbo 4x4 10AT", price: 785000 },
          { name: "Double Cab XL+ 2.0L Turbo 10AT", price: 889000 },
          { name: "Double Cab XLS 2.0L Turbo HR 10AT", price: 939000 },
          { name: "Double Cab Wolftrak 2.0L Turbo HR 10AT", price: 999000 },
          { name: "Double Cab Wolftrak 2.0L Turbo 4x4 10AT", price: 1089000 },
          { name: "Double Cab Wildtrak 2.0L Turbo HR 10AT", price: 1159000 },
          { name: "Double Cab Wildtrak 2.0L Turbo 4x4 10AT", price: 1249000 },
          { name: "Double Cab Wildtrak-X 3.0L V6 Turbo 4WD 10AT", price: 1469000 },
          { name: "Double Cab Super Duty 3.0L V6 Turbo 4WD 10AT", price: 1599000 }
        ] },
      { name: "Ranger Raptor", image: "images/models/ford/ranger-raptor.webp", imageFit: "cover", type: "Performance pickup · กระบะสมรรถนะสูง", tagline: "ลุยได้ทุกพื้นผิว สมรรถนะระดับแข่ง", fuel: "Diesel", seats: 5, promo: "",
        versions: [
          { name: "2.0L Bi-Turbo 4WD 10AT (MY2025)", price: 1814000 },
          { name: "3.0L V6 Twin-Turbo EcoBoost 4WD 10AT Extra Pack (MY2025)", price: 1984000 }
        ] },
      { name: "Everest", image: "images/models/ford/everest.webp", imageFit: "cover", type: "SUV · 7 ที่นั่ง", tagline: "SUV 7 ที่นั่ง สำหรับทุกการเดินทางของครอบครัว", fuel: "Diesel", seats: 7, promo: "",
        versions: [
          { name: "2.0L Turbo Active 4x2 10AT", price: 1379000 },
          { name: "2.0L Turbo Sport 4x2 6AT (MY2025)", price: 1585000 },
          { name: "2.0L Turbo Sport 4x4 10AT", price: 1669000 },
          { name: "2.0L Turbo Platinum 4x4 10AT", price: 1779000 },
          { name: "2.0L Bi-Turbo Wildtrak 4x4 10AT (MY2025)", price: 1942000 },
          { name: "3.0L V6 Turbo Platinum 4WD 10AT", price: 2294000 }
        ] }
    ]
  },

  nissan: {
    name: "NISSAN",
    th: "นิสสัน",
    intro: "Smart city cars, e-POWER and dependable pickups.",
    introTh: "รถเก๋ง e-POWER และกระบะที่ไว้ใจได้",
    branches: ["ราชสีมา", "ปากช่อง", "เอกสหออโต สุรินทร์", "เอกสหออโต บุรีรัมย์"],
    models: [
      { name: "Almera", image: "images/models/nissan/almera.webp", imageFit: "cover", type: "Sedan · เก๋ง", tagline: "เก๋งเทอร์โบ ประหยัด ขับง่ายในเมือง", fuel: "Petrol", seats: 5, promo: "",
        versions: [
          { name: "1.0L Turbo E CVT", price: 573000 },
          { name: "1.0L Turbo EL CVT", price: 589000 },
          { name: "1.0L Turbo V CVT", price: 669000 },
          { name: "1.0L Turbo VL CVT", price: 699000 }
        ] },
      { name: "Kicks e-POWER", image: "images/models/nissan/kicks-e-power.webp", imageFit: "cover", type: "Crossover · ครอสโอเวอร์", tagline: "ขับเคลื่อนด้วยไฟฟ้า ไม่ต้องชาร์จ", fuel: "Hybrid", seats: 5, promo: "",
        versions: [
          { name: "e-POWER V", price: 789900 },
          { name: "e-POWER VL", price: 799900 },
          { name: "e-POWER SV", price: 899900 }
        ] },
      { name: "X-Trail e-POWER", image: "images/models/nissan/x-trail-e-power.webp", imageFit: "cover", type: "SUV", tagline: "SUV e-POWER ขับเคลื่อน 4 ล้อ e-4ORCE", fuel: "Hybrid", seats: 5, promo: "",
        versions: [
          { name: "e-POWER e-4ORCE", price: 1699000 }
        ] },
      { name: "Serena", image: "images/models/nissan/serena.webp", imageFit: "cover", type: "MPV · 7 ที่นั่ง", tagline: "MPV ครอบครัว ประตูสไลด์ นั่งสบายทุกแถว", fuel: "Hybrid", seats: 7, promo: "",
        versions: [
          { name: "Highway Star (petrol)", price: 1469000 },
          { name: "e-POWER Highway Star", price: 1690000 }
        ] },
      { name: "Navara", image: "images/models/nissan/navara.webp", imageFit: "cover", type: "Pickup · กระบะ", tagline: "กระบะแกร่ง พร้อมลุยทุกงาน", fuel: "Diesel", seats: 5, promo: "",
        versions: [
          { name: "Single Cab SL 6MT", price: 606000 },
          { name: "King Cab SL 6MT", price: 667000 },
          { name: "Single Cab SL 6MT 4WD", price: 670000 },
          { name: "King Cab Calibre SL 7AT", price: 758000 },
          { name: "King Cab Calibre E 6MT", price: 775000 },
          { name: "Double Cab Calibre SL 6MT", price: 792000 },
          { name: "Double Cab Calibre SL 7AT", price: 842000 },
          { name: "King Cab Calibre E 7AT Black Edition", price: 859000 },
          { name: "Double Cab Calibre E 7AT Black Edition", price: 944000 },
          { name: "Double Cab PRO-2X 7AT", price: 1045000 },
          { name: "Double Cab PRO-4X 7AT", price: 1175000 }
        ] }
    ]
  },

  mitsubishi: {
    name: "MITSUBISHI",
    th: "มิตซูบิชิ",
    intro: "Family cars, MPVs and pickups for everyday life.",
    introTh: "รถครอบครัว MPV และกระบะสำหรับทุกวัน",
    branches: ["โคราช"],
    models: [
      { name: "Mirage", image: "images/models/mitsubishi/mirage.webp", type: "Hatchback · รถเล็ก", tagline: "รถเล็กประหยัดน้ำมัน ดูแลง่าย", fuel: "Petrol", seats: 5, promo: "",
        versions: [
          { name: "Active", price: 509000 },
          { name: "Smart", price: 579000 }
        ] },
      { name: "Xpander HEV", image: "images/models/mitsubishi/xpander-hev.webp", type: "MPV · 7 ที่นั่ง", tagline: "MPV ไฮบริด 7 ที่นั่ง สำหรับครอบครัว", fuel: "Hybrid", seats: 7, promo: "",
        versions: [
          { name: "Xpander HEV", image: "images/models/mitsubishi/xpander-hev.webp", price: 935000 },
          { name: "Xpander Cross HEV", price: 953000 }
        ] },
      { name: "Xforce HEV", image: "images/models/mitsubishi/xforce-hev.webp", type: "Crossover · ครอสโอเวอร์", tagline: "ครอสโอเวอร์ไฮบริด ดีไซน์ล้ำ ห้องโดยสารกว้าง", fuel: "Hybrid", seats: 5, promo: "",
        versions: [
          { name: "Ignite", price: 899000 },
          { name: "Ultimate", price: 1034000 },
          { name: "Ultimate X", price: 1077000 }
        ] },
      { name: "Triton", image: "images/models/mitsubishi/triton.webp", type: "Pickup · กระบะ", tagline: "กระบะพันธุ์แกร่ง ทนทุกสภาพถนน", fuel: "Diesel", seats: 5, promo: "",
        versions: [
          { name: "Single Cab 2.4 (2WD)", price: 624000 },
          { name: "Single Cab 2.4 Pro 4WD", price: 724000 },
          { name: "Double Cab 2.4 Pro (2WD)", price: 737000 },
          { name: "Mega Cab Plus 2.4 Pro", price: 764000 },
          { name: "Single Cab 2.4 Pro 4WD AT", price: 774000 },
          { name: "Mega Cab Plus 2.4 Pro AT", price: 814000 },
          { name: "Double Cab Plus 2.4 Prime", price: 944000 },
          { name: "Double Cab Plus 2.4 Prime AT", price: 989000 },
          { name: "Double Cab Plus 2.4 Prime 4WD", price: 1069000 },
          { name: "Double Cab Plus 2.4 Ultra AT", price: 1079000 },
          { name: "Double Cab Athlete 4WD AT", price: 1294000 }
        ] },
      { name: "Pajero Sport", image: "images/models/mitsubishi/pajero-sport.webp", type: "SUV · 7 ที่นั่ง", tagline: "PPV 7 ที่นั่ง ลุยได้ทุกเส้นทาง", fuel: "Diesel", seats: 7, promo: "",
        versions: [
          { name: "2.4 GT", price: 1139000 },
          { name: "2.4 Prime", price: 1389000 },
          { name: "2.4 Elite Edition 2WD", price: 1579000 },
          { name: "2.4 Elite Edition 4WD", price: 1689000 }
        ] },
      { name: "All New Pajero", image: "images/models/mitsubishi/all-new-pajero.webp", type: "SUV · 7 ที่นั่ง", tagline: "SUV ตัวจริง กลับมาอีกครั้งในโฉมใหม่", fuel: "Diesel", seats: 7, promo: "",
        versions: [
          { name: "GLS", price: 1499000 },
          { name: "GSR", price: 1699000 },
          { name: "Super Exceed", price: 1999000 }
        ] }
    ]
  },

  mg: {
    name: "MG",
    th: "เอ็มจี",
    intro: "EVs, hybrids, SUVs and pickups at great value.",
    introTh: "รถไฟฟ้า ไฮบริด SUV และกระบะ คุ้มค่า",
    branches: ["โคราช", "สุวินทวงศ์", "เพชรเกษม"],
    models: [
      { name: "MG3 HYBRID+", image: "images/models/mg/mg3-hybrid.webp", type: "Hatchback · รถเล็ก", tagline: "รถเล็กไฮบริด ประหยัดน้ำมัน", fuel: "Hybrid", seats: 5, versions: startingPrice(579900), promo: "" },
      { name: "MG5", image: "images/models/mg/mg5.webp", type: "Sedan · เก๋ง", tagline: "เก๋งกว้างขวาง ราคาคุ้มค่า", fuel: "Petrol", seats: 5, versions: startingPrice(629900), promo: "" },
      { name: "MG ZS", image: "images/models/mg/mg-zs.webp", type: "Compact SUV · SUV", tagline: "SUV คันแรกที่คุ้มค่า", fuel: "Petrol", seats: 5, versions: startingPrice(599000), promo: "" },
      { name: "MG ZS EV", image: "images/models/mg/mg-zs-ev.webp", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้า ขับง่าย ใช้งานได้ทุกวัน", fuel: "EV", seats: 5, versions: startingPrice(829900), promo: "" },
      { name: "MG VS HEV", image: "images/models/mg/mg-vs-hev.webp", type: "SUV", tagline: "SUV ไฮบริด ประหยัด ขับนุ่ม", fuel: "Hybrid", seats: 5, versions: startingPrice(699000), promo: "" },
      { name: "MG HS PHEV", image: "images/models/mg/mg-hs-phev.webp", type: "SUV", tagline: "SUV ปลั๊กอินไฮบริด วิ่งไฟฟ้าได้ไกล", fuel: "PHEV", seats: 5, versions: startingPrice(1299000), promo: "" },
      { name: "MG4", image: "images/models/mg/mg4.webp", type: "EV hatchback · รถไฟฟ้า", tagline: "รถไฟฟ้า 100% ขับสนุก", fuel: "EV", seats: 5, versions: startingPrice(669900), promo: "" },
      { name: "MGS5 EV PLUS", image: "images/models/mg/mgs5-ev-plus.webp", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้ารุ่นใหม่ ดีไซน์สปอร์ต", fuel: "EV", seats: 5, versions: startingPrice(749900), promo: "" },
      { name: "MG URBAN", image: "images/models/mg/mg-urban.webp", type: "EV city car · รถไฟฟ้า", tagline: "รถไฟฟ้าสำหรับชีวิตในเมือง", fuel: "EV", seats: 5, versions: startingPrice(579900), promo: "" },
      { name: "MG EP Plus", image: "images/models/mg/mg-ep-plus.webp", type: "EV wagon · รถไฟฟ้า", tagline: "รถไฟฟ้าห้องเก็บของกว้าง", fuel: "EV", seats: 5, versions: startingPrice(771000), promo: "" },
      { name: "MG ES", image: "images/models/mg/mg-es.webp", type: "EV sedan · ซีดานไฟฟ้า", tagline: "ซีดานไฟฟ้า นั่งสบาย", fuel: "EV", seats: 5, versions: startingPrice(959000), promo: "" },
      { name: "MG IM5", image: "images/models/mg/mg-im5.webp", type: "Premium EV sedan · ซีดานไฟฟ้าพรีเมียม", tagline: "ซีดานไฟฟ้าพรีเมียม เทคโนโลยีล้ำ", fuel: "EV", seats: 5, versions: startingPrice(1549900), promo: "" },
      { name: "MG IM6", image: "images/models/mg/mg-im6.webp", type: "Premium EV SUV · SUV ไฟฟ้าพรีเมียม", tagline: "SUV ไฟฟ้าพรีเมียม สมรรถนะสูง", fuel: "EV", seats: 5, versions: startingPrice(1399900), promo: "" },
      { name: "MG MAXUS 7", image: "images/models/mg/mg-maxus-7.webp", type: "EV MPV · MPV ไฟฟ้า", tagline: "MPV ไฟฟ้า กว้างขวางทั้งครอบครัว", fuel: "EV", seats: 7, versions: startingPrice(1399000), promo: "" },
      { name: "MG MAXUS 9", image: "images/models/mg/mg-maxus-9.webp", type: "Luxury EV MPV · MPV ไฟฟ้าหรู", tagline: "MPV ไฟฟ้าหรู นั่งสบายระดับผู้บริหาร", fuel: "EV", seats: 7, versions: startingPrice(1849900), promo: "" },
      { name: "MG CYBERSTER", image: "images/models/mg/mg-cyberster.webp", type: "EV roadster · สปอร์ตไฟฟ้า", tagline: "รถสปอร์ตเปิดประทุนไฟฟ้า", fuel: "EV", seats: 2, versions: startingPrice(2499000), promo: "" },
      { name: "MG EXTENDER Giant Cab", image: "images/models/mg/mg-extender-giant-cab.webp", type: "Pickup · กระบะ", tagline: "กระบะแค็บ ใช้งานคุ้มค่า", fuel: "Diesel", seats: 2, versions: startingPrice(589000), promo: "" },
      { name: "MG EXTENDER Double Cab", image: "images/models/mg/mg-extender-double-cab.webp", type: "Pickup · กระบะ 4 ประตู", tagline: "กระบะ 4 ประตู ออปชันครบ", fuel: "Diesel", seats: 5, versions: startingPrice(769000), promo: "" }
    ]
  },

  gwm: {
    name: "GWM",
    th: "เกรท วอลล์ มอเตอร์",
    intro: "HAVAL hybrids, ORA EVs, TANK off-roaders and POER pickups.",
    introTh: "HAVAL ไฮบริด ORA ไฟฟ้า TANK สายลุย และกระบะ POER",
    branches: ["โคราช", "เอกสพลัส บุรีรัมย์", "พหลโยธิน กม.25"],
    models: [
      { name: "HAVAL H6", image: "images/models/gwm/haval-h6.webp", type: "SUV", tagline: "SUV ไฮบริด กว้างขวาง เทคโนโลยีครบ", fuel: "Hybrid", seats: 5, promo: "",
        versions: [
          { name: "HEV · ราคาเริ่มต้น", price: 899000 },
          { name: "PHEV · ราคาเริ่มต้น", price: 959000 }
        ] },
      { name: "ORA 5 EV", image: "images/models/gwm/ora-5-ev.webp", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้า ดีไซน์ทันสมัย", fuel: "EV", seats: 5, versions: startingPrice(669000), promo: "" },
      { name: "ORA 5 HEV", image: "images/models/gwm/ora-5-hev.webp", type: "SUV", tagline: "SUV ไฮบริด ประหยัด ขับง่าย", fuel: "Hybrid", seats: 5, versions: startingPrice(729000), promo: "" },
      { name: "TANK 300 DIESEL", image: "images/models/gwm/tank-300-diesel.webp", type: "Off-road SUV · SUV ออฟโรด", tagline: "SUV สายลุย เครื่องดีเซล 2.4T", fuel: "Diesel", seats: 5, versions: startingPrice(1049000), promo: "" },
      { name: "TANK 300 HEV", image: "images/models/gwm/tank-300-hev.webp", type: "Off-road SUV · SUV ออฟโรด", tagline: "SUV สายลุยไฮบริด", fuel: "Hybrid", seats: 5, versions: [], promo: "" },
      { name: "TANK 500 DIESEL", image: "images/models/gwm/tank-500-diesel.webp", type: "Off-road SUV · 7 ที่นั่ง", tagline: "SUV ใหญ่ หรูหรา ลุยได้ทุกทาง", fuel: "Diesel", seats: 7, versions: startingPrice(1419000), promo: "" },
      { name: "TANK 500 3.0T DIESEL", image: "images/models/gwm/tank-500-3-0t-diesel.webp", type: "Off-road SUV · 7 ที่นั่ง", tagline: "พลังดีเซล 3.0T แรงเหนือขีดจำกัด", fuel: "Diesel", seats: 7, versions: startingPrice(1669000), promo: "" },
      { name: "TANK 500 HEV", image: "images/models/gwm/tank-500-hev.webp", type: "Off-road SUV · 7 ที่นั่ง", tagline: "ความหรูหรา ผสานพลังออฟโรด", fuel: "Hybrid", seats: 7, versions: [], promo: "" },
      { name: "POER SAHAR DIESEL", image: "images/models/gwm/poer-sahar-diesel.webp", type: "Pickup · กระบะ", tagline: "กระบะพรีเมียม พร้อมทุกการเดินทาง", fuel: "Diesel", seats: 5, versions: startingPrice(849000), promo: "" }
    ]
  },

  geely: {
    name: "GEELY",
    th: "จีลี่",
    intro: "Modern electric and plug-in hybrid SUVs.",
    introTh: "SUV ไฟฟ้าและปลั๊กอินไฮบริดยุคใหม่",
    branches: ["โคราช", "JS Connect Buriram", "สุวินทวงศ์"],
    // ⚠ Prices NOT confirmed on Geely's official Thai site (price guide zigwheels.co.th)
    models: [
      { name: "EX2", image: "images/models/geely/ex2.webp", imageFit: "cover", type: "EV hatchback · รถไฟฟ้า", tagline: "รถไฟฟ้าคันเล็ก ขับง่ายในเมือง", fuel: "EV", seats: 5, versions: startingPrice(429900), promo: "" },
      { name: "EX5", image: "images/models/geely/ex5.webp", imageFit: "cover", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้า กว้างขวาง เงียบสบาย", fuel: "EV", seats: 5, versions: startingPrice(699000), promo: "" },
      { name: "STARRAY EM-i", image: "images/models/geely/starray-em-i.webp", imageFit: "cover", type: "SUV", tagline: "SUV ปลั๊กอินไฮบริด วิ่งไกล ประหยัด", fuel: "PHEV", seats: 5, versions: startingPrice(699900), promo: "" }
    ]
  },

  changan: {
    name: "CHANGAN",
    th: "ฉางอาน",
    intro: "NEVO, LUMIN and DEEPAL new-energy cars from CHANGAN.",
    introTh: "รถพลังงานใหม่ NEVO, LUMIN และ DEEPAL จากฉางอาน",
    branches: ["โคราช", "สุวินทวงศ์", "พระราม 2", "ระยอง"],
    models: [
      { name: "NEVO Q05", image: "images/models/changan/nevo-q05.webp", type: "SUV", tagline: "SUV พลังงานใหม่ ขนาดพอดีสำหรับทุกวัน", fuel: "PHEV", seats: 5, versions: startingPrice(629900), promo: "" },
      { name: "LUMIN L DC", image: "images/models/changan/lumin-l-dc.webp", type: "EV city car · รถไฟฟ้าคันเล็ก", tagline: "รถไฟฟ้าคันจิ๋ว ขับง่าย จอดสบาย", fuel: "EV", seats: 4, versions: startingPrice(399000), promo: "" },
      { name: "DEEPAL S05", image: "images/models/deepal/deepal-s05.webp", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้า ขนาดพอดี", fuel: "EV", seats: 5, versions: startingPrice(799000), promo: "" },
      { name: "DEEPAL S05 REEV", image: "images/models/deepal/deepal-s05-reev.webp", type: "SUV", tagline: "SUV ไฟฟ้าพร้อมเครื่องยนต์ขยายระยะ ไม่ต้องกังวลเรื่องชาร์จ", fuel: "REEV", seats: 5, versions: startingPrice(949000), promo: "" },
      { name: "DEEPAL S07", image: "images/models/deepal/deepal-s07.webp", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้า สปอร์ตพรีเมียม", fuel: "EV", seats: 5, versions: startingPrice(1219000), promo: "" },
      { name: "DEEPAL E07", image: "images/models/deepal/deepal-e07.webp", type: "EV SUV-coupe · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้าดีไซน์ล้ำ วิ่งได้ไกล", fuel: "EV", seats: 5, versions: startingPrice(1699000), promo: "" },
      { name: "DEEPAL HUNTER K50", image: "images/models/deepal/deepal-hunter-k50.webp", type: "Pickup · กระบะ", tagline: "กระบะไฟฟ้าพร้อมเครื่องยนต์ขยายระยะ", fuel: "REEV", seats: 5, versions: startingPrice(1099000), promo: "" }
    ]
  },

  avatr: {
    name: "AVATR",
    th: "อวาตร",
    intro: "Luxury electric SUVs.",
    introTh: "รถไฟฟ้าหรูระดับพรีเมียม",
    branches: ["โคราช"],
    models: [
      { name: "AVATR 07", image: "images/models/avatr/avatr-07.webp", imageFit: "cover", type: "Luxury SUV · SUV หรู", tagline: "SUV หรู ดีไซน์ล้ำอนาคต", fuel: "EV", seats: 5, versions: startingPrice(1659000), promo: "" },
      { name: "AVATR 11", image: "images/models/avatr/avatr-11.webp", type: "Luxury EV SUV · SUV ไฟฟ้าหรู", tagline: "SUV ไฟฟ้าหรูระดับเรือธง", fuel: "EV", seats: 5, promo: "",
        versions: [
          { name: "Ultra · ราคาเริ่มต้น", price: 2299000 },
          { name: "รุ่นสูงสุด · Top version", price: 2899000 }
        ] }
    ]
  },

  "omoda-jaecoo": {
    name: "OMODA & JAECOO",
    th: "โอโมดา แอนด์ เจคู",
    intro: "Urban EVs from OMODA and adventure SUVs from JAECOO.",
    introTh: "รถไฟฟ้าสไตล์เมืองจาก OMODA และ SUV สายลุยจาก JAECOO",
    branches: ["โคราช", "สุวินทวงศ์", "บางนา", "เกษตร - นวมินทร์", "รังสิต คลอง 9", "นครนายก", "ชลบุรี", "จันทบุรี", "ตราด", "ระยอง"],
    models: [
      { name: "OMODA C5 EV", image: "images/models/omoda-jaecoo/omoda-c5-ev.webp", imageFit: "cover", type: "EV crossover · ครอสโอเวอร์ไฟฟ้า", tagline: "ครอสโอเวอร์ไฟฟ้า ดีไซน์เฉียบ", fuel: "EV", seats: 5, promo: "",
        versions: [
          { name: "422 km", price: 709000 },
          { name: "505 km (Ultra)", price: 839900 }
        ] },
      { name: "JAECOO 5 EV", image: "images/models/omoda-jaecoo/jaecoo-5-ev.webp", imageFit: "cover", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้าขายดี ขนาดพอดี", fuel: "EV", seats: 5, promo: "",
        versions: [
          { name: "JAECOO 5 EV", image: "images/models/omoda-jaecoo/jaecoo-5-ev.webp", imageFit: "cover", price: 699000 },
          { name: "NEW JAECOO 5 EV (Ultra)", price: 809000 }
        ] },
      { name: "JAECOO 6 EV", image: "images/models/omoda-jaecoo/jaecoo-6-ev.webp", imageFit: "cover", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้าสายลุย ทรงกล่องเท่", fuel: "EV", seats: 5, versions: startingPrice(859000), promo: "" },
      { name: "JAECOO 6T REEV", image: "images/models/omoda-jaecoo/jaecoo-6t-reev.webp", imageFit: "cover", type: "SUV", tagline: "SUV ไฟฟ้าพร้อมเครื่องยนต์ขยายระยะ วิ่งรวม 750 กม.", fuel: "REEV", seats: 5, versions: startingPrice(999900), promo: "" },
      { name: "JAECOO 7 SHS", image: "images/models/omoda-jaecoo/jaecoo-7-shs.webp", imageFit: "cover", type: "SUV", tagline: "SUV พรีเมียม ปลั๊กอินไฮบริด", fuel: "PHEV", seats: 5, versions: [], promo: "" }
    ]
  },

  "gac-aion": {
    name: "GAC AION",
    th: "จีเอซี ไอออน",
    intro: "Electric cars with long range and smart tech.",
    introTh: "รถไฟฟ้าวิ่งไกล เทคโนโลยีอัจฉริยะ",
    branches: ["โคราช", "สุวินทวงศ์"],
    models: [
      { name: "AION UT", image: "images/models/gac-aion/aion-ut.webp", type: "EV hatchback · รถไฟฟ้า", tagline: "รถไฟฟ้าคันเล็ก ห้องโดยสารกว้าง", fuel: "EV", seats: 5, promo: "",
        versions: [
          { name: "420 Standard", price: 489900 },
          { name: "500 Premium", price: 589900 }
        ] },
      { name: "AION Y Plus", image: "images/models/gac-aion/aion-y-plus.webp", type: "EV crossover · รถไฟฟ้า", tagline: "รถไฟฟ้าห้องโดยสารกว้าง สำหรับครอบครัว", fuel: "EV", seats: 5, promo: "",
        versions: [
          { name: "490 Premium", price: 749000 }
        ] },
      { name: "AION V", image: "images/models/gac-aion/aion-v.webp", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้า แกร่ง วิ่งไกล", fuel: "EV", seats: 5, promo: "",
        versions: [
          { name: "500 Premium", price: 799900 }
        ] },
      { name: "AION ES", image: "images/models/gac-aion/aion-es.webp", type: "EV sedan · ซีดานไฟฟ้า", tagline: "ซีดานไฟฟ้า ประหยัด คุ้มค่า", fuel: "EV", seats: 5, versions: startingPrice(846000), promo: "" },
      { name: "HYPTEC HT", image: "images/models/gac-aion/hyptec-ht.webp", type: "Premium EV SUV · SUV ไฟฟ้าพรีเมียม", tagline: "SUV ไฟฟ้าพรีเมียม ประตูปีกนก", fuel: "EV", seats: 5, promo: "",
        versions: [
          { name: "620 Premium", price: 1199000 }
        ] }
    ]
  },

  riddara: {
    name: "RIDDARA",
    th: "ริดดาร่า",
    intro: "Electric pickups for work and adventure.",
    introTh: "กระบะไฟฟ้า สำหรับงานและการเดินทาง",
    branches: ["โคราช"],
    // No price is published on thailand.riddara.com; ask the showroom
    models: [
      { name: "RIDDARA RD6", type: "EV pickup · กระบะไฟฟ้า", tagline: "กระบะไฟฟ้า 100% 4WD วิ่งได้ 455 กม.", fuel: "EV", seats: 5, versions: [], promo: "" }
    ]
  },

  lepas: {
    name: "LEPAS",
    th: "เลพาส",
    intro: "New-generation SUVs with elegant design.",
    introTh: "SUV ยุคใหม่ ดีไซน์หรูหรา",
    branches: ["โคราช", "ตลาดไท", "พัทยา - นาจอมเทียน"],
    // ⚠ L6 price from news reports (regular price), NOT confirmed on an official site
    models: [
      { name: "LEPAS L6", image: "images/models/lepas/lepas-l6.webp", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้า ดีไซน์หรูหรา", fuel: "EV", seats: 5, versions: startingPrice(899900), promo: "" },
      { name: "LEPAS L8", image: "images/models/lepas/lepas-l8.webp", type: "SUV", tagline: "SUV ปลั๊กอินไฮบริด ห้องโดยสารกว้าง", fuel: "PHEV", seats: 5, versions: [], promo: "" }
    ]
  },

  wuling: {
    name: "WULING",
    th: "วูหลิง",
    intro: "Small, affordable electric cars for the city.",
    introTh: "รถไฟฟ้าคันเล็ก ราคาเข้าถึงง่าย",
    branches: ["โคราช", "สุวินทวงศ์", "บางนา กม.13", "นนทบุรี", "พัทยา - นาจอมเทียน", "ภูเก็ต"],
    // ⚠ Price NOT confirmed on an official site (price guide zigwheels.co.th)
    models: [
      { name: "Wuling Bingo", type: "EV hatchback · รถไฟฟ้า", tagline: "รถไฟฟ้าดีไซน์น่ารัก ใช้งานคุ้มค่า", fuel: "EV", seats: 5, versions: startingPrice(369000), promo: "" }
    ]
  },

  chery: {
    name: "CHERY",
    th: "เชอรี่",
    intro: "Cute city EVs, the retro-boxy V23 electric SUV and 7-seat family SUVs.",
    introTh: "รถไฟฟ้าในเมือง SUV ไฟฟ้าสไตล์เรโทร V23 และ SUV 7 ที่นั่งสำหรับครอบครัว",
    branches: ["สุวินทวงศ์", "ระยอง"],
    // ⚠ Price NOT confirmed on an official site (autolifethailand.tv, April 2026)
    models: [
      { name: "CHERY Q", image: "images/models/chery/chery-q.webp", imageFit: "cover", type: "EV hatchback · รถไฟฟ้า", tagline: "รถไฟฟ้าคันเล็ก ดีไซน์น่ารัก สำหรับชีวิตในเมือง", fuel: "EV", seats: 5, versions: startingPrice(469900), promo: "" },
      { name: "V23", image: "images/models/chery/v23.webp", imageFit: "cover", type: "EV SUV · SUV ไฟฟ้า", tagline: "SUV ไฟฟ้าทรงกล่อง สไตล์เรโทร วิ่งไกลสุด 430 กม. (NEDC)", fuel: "EV", seats: 5, versions: startingPrice(699900), promo: "" },
      { name: "TIGGO 8 CSH", image: "images/models/chery/tiggo-8-csh.webp", imageFit: "cover", type: "SUV · 7 ที่นั่ง", tagline: "SUV ปลั๊กอินไฮบริด 7 ที่นั่ง สำหรับครอบครัวใหญ่", fuel: "PHEV", seats: 7, versions: startingPrice(949000), promo: "" }
    ]
  }
};

// The order brands appear in the "Other brands" list at the bottom of each page
const brandOrder = [
  "ford", "changan", "geely", "omoda-jaecoo", "gac-aion", "riddara", "gwm", "nissan",
  "lepas", "mitsubishi", "mg", "wuling", "chery"
];
