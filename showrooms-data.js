// =====================================================================
// SHOWROOM LIST (feeds the map in the Showrooms section of index.html)
// One line = one showroom = one pin on the map.
//
//   brand    : brand key, same as in brands-data.js (ford, mg, gwm …)
//   name     : branch name shown on the card
//   province : province in Thai
//   region   : "northeast", "bangkok", "east" or "south"
//   lat, lng : position on the map. To get the exact numbers, open the
//              showroom in Google Maps, right-click the red pin and click
//              the two numbers at the top to copy them.
//   exact    : true  = pin is on the showroom's Google Maps listing
//              false = pin is only on the area (district / road) for now
//   address  : full address (leave "" if not known yet)
//   phone    : showroom phone (leave "" to show the head office number)
//
// Branch list: eaksahagroup.com. Pin positions, addresses and phones:
// Google Maps listings, checked November 2026.
// Still approximate (no Eaksaha listing found on Google Maps): Avatr, Mitsubishi,
// MG and Wuling in Korat, Wuling Nonthaburi, MG Phetkasem, OMODA & JAECOO Rayong.
// =====================================================================

const showrooms = [
  // ---------------- NORTHEAST · ภาคตะวันออกเฉียงเหนือ (20) ----------------
  { brand: "ford", name: "โคราช (จอหอ)", province: "นครราชสีมา", region: "northeast", lat: 15.0067305, lng: 102.1234738, exact: true,
    address: "523/1 หมู่ 2 ต.บ้านเกาะ อ.เมือง จ.นครราชสีมา", phone: "044-049808" },
  { brand: "ford", name: "ปากช่อง", province: "นครราชสีมา", region: "northeast", lat: 14.6854933, lng: 101.4031454, exact: true,
    address: "93/1 ถ.มิตรภาพ ต.ปากช่อง อ.ปากช่อง จ.นครราชสีมา", phone: "" },
  { brand: "ford", name: "พิมาย", province: "นครราชสีมา", region: "northeast", lat: 15.225604, lng: 102.4842147, exact: true,
    address: "199 หมู่ 4 ต.ในเมือง อ.พิมาย จ.นครราชสีมา", phone: "" },

  { brand: "nissan", name: "ราชสีมา (สำนักงานใหญ่)", province: "นครราชสีมา", region: "northeast", lat: 14.9534261, lng: 102.0274934, exact: true,
    address: "688 หมู่ 5 ถ.มิตรภาพ ต.บ้านใหม่ อ.เมือง จ.นครราชสีมา 30000", phone: "044-049819" },
  { brand: "nissan", name: "ปากช่อง", province: "นครราชสีมา", region: "northeast", lat: 14.6856912, lng: 101.4040341, exact: true, address: "", phone: "" },
  { brand: "nissan", name: "เอกสหออโต สุรินทร์", province: "สุรินทร์", region: "northeast", lat: 14.8909363, lng: 103.4740246, exact: true, address: "", phone: "" },
  { brand: "nissan", name: "เอกสหออโต บุรีรัมย์", province: "บุรีรัมย์", region: "northeast", lat: 14.9650706, lng: 103.0570263, exact: true,
    address: "456 หมู่ 1 จ.บุรีรัมย์", phone: "044-611333" },

  { brand: "geely", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 14.9554004, lng: 102.0349502, exact: true,
    address: "1643/1 ถ.มิตรภาพ อ.เมือง จ.นครราชสีมา", phone: "044-049888" },
  { brand: "geely", name: "JS Connect Buriram", province: "บุรีรัมย์", region: "northeast", lat: 14.9650309, lng: 103.0570019, exact: true, address: "", phone: "" },

  { brand: "gwm", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 15.0063559, lng: 102.123394, exact: true,
    address: "523 หมู่ 2 ต.บ้านเกาะ อ.เมือง จ.นครราชสีมา", phone: "044-049822" },
  { brand: "gwm", name: "เอกสพลัส บุรีรัมย์", province: "บุรีรัมย์", region: "northeast", lat: 14.9766491, lng: 103.0702816, exact: true,
    address: "564 จ.บุรีรัมย์", phone: "044-666666" },

  { brand: "omoda-jaecoo", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 15.0091554, lng: 102.1241581, exact: true,
    address: "445 หมู่ 3 ต.บ้านเกาะ อ.เมือง จ.นครราชสีมา", phone: "044-049899" },
  { brand: "changan", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 14.9533169, lng: 102.0270642, exact: true,
    address: "817 หมู่ 5 ถ.มิตรภาพ ต.บ้านใหม่ อ.เมือง จ.นครราชสีมา", phone: "044-049898" },
  { brand: "gac-aion", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 15.0090596, lng: 102.1242662, exact: true,
    address: "445/1 หมู่ 3 ต.บ้านเกาะ อ.เมือง จ.นครราชสีมา", phone: "044-049877" },
  { brand: "riddara", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 14.9533056, lng: 102.0272222, exact: true,
    address: "817 หมู่ 5 ถ.มิตรภาพ ต.บ้านใหม่ อ.เมือง จ.นครราชสีมา", phone: "" },
  { brand: "lepas", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 14.955754, lng: 102.0353163, exact: true, address: "", phone: "044-299411" },
  { brand: "avatr", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 14.9900, lng: 102.1000, exact: false, address: "", phone: "" },
  { brand: "mitsubishi", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 14.9600, lng: 102.0800, exact: false, address: "", phone: "" },
  { brand: "mg", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 15.0000, lng: 102.0900, exact: false, address: "", phone: "" },
  { brand: "wuling", name: "โคราช", province: "นครราชสีมา", region: "northeast", lat: 14.9550, lng: 102.0950, exact: false, address: "", phone: "" },

  // ---------------- BANGKOK & VICINITY · กรุงเทพฯ และปริมณฑล (16) ----------------
  // Suwinthawong: several brands share the Eaksaha site at 89/3 หมู่ 8 ถ.สุวินทวงศ์
  { brand: "omoda-jaecoo", name: "สุวินทวงศ์", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.809516, lng: 100.805907, exact: true,
    address: "89/3 หมู่ 8 ถ.สุวินทวงศ์ กรุงเทพมหานคร", phone: "" },
  { brand: "omoda-jaecoo", name: "บางนา (โชว์รูมชั่วคราว)", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.630145, lng: 100.7190848, exact: true,
    address: "99 หมู่ 1 ทางคู่ขนาน ถ.บางนา-ตราด", phone: "" },
  { brand: "omoda-jaecoo", name: "เกษตร - นวมินทร์", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.8401493, lng: 100.5816572, exact: true, address: "", phone: "" },
  { brand: "omoda-jaecoo", name: "รังสิต คลอง 9", province: "ปทุมธานี", region: "bangkok", lat: 14.0518645, lng: 100.8206229, exact: true,
    address: "80/9 ถ.รังสิต-นครนายก อ.ธัญบุรี จ.ปทุมธานี", phone: "" },
  { brand: "wuling", name: "สุวินทวงศ์", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.8096732, lng: 100.8047974, exact: true,
    address: "89 ถ.สุวินทวงศ์ กรุงเทพมหานคร", phone: "" },
  { brand: "wuling", name: "บางนา กม.13", province: "สมุทรปราการ", region: "bangkok", lat: 13.630191, lng: 100.7192081, exact: true,
    address: "999 ชั้น 1 หมู่ 1 ทางคู่ขนาน ถ.บางนา-ตราด", phone: "" },
  { brand: "wuling", name: "นนทบุรี", province: "นนทบุรี", region: "bangkok", lat: 13.8600, lng: 100.5150, exact: false, address: "", phone: "" },
  { brand: "mg", name: "สุวินทวงศ์", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.8098033, lng: 100.8035527, exact: true,
    address: "89/3 หมู่ 8 ถ.สุวินทวงศ์ กรุงเทพมหานคร", phone: "02-089-1642" },
  { brand: "mg", name: "เพชรเกษม", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.7100, lng: 100.4000, exact: false, address: "", phone: "" },
  { brand: "changan", name: "สุวินทวงศ์", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.809562, lng: 100.805419, exact: true,
    address: "89/3 หมู่ 8 ถ.สุวินทวงศ์ กรุงเทพมหานคร", phone: "" },
  { brand: "changan", name: "พระราม 2", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.6506632, lng: 100.4226282, exact: true, address: "", phone: "" },
  { brand: "geely", name: "สุวินทวงศ์", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.8096441, lng: 100.8050695, exact: true,
    address: "89/3 ถ.สุวินทวงศ์ กรุงเทพมหานคร", phone: "063-466-8555" },
  { brand: "gac-aion", name: "สุวินทวงศ์", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.8094089, lng: 100.8061992, exact: true,
    address: "89/3 หมู่ 8 ถ.สุวินทวงศ์ กรุงเทพมหานคร", phone: "" },
  { brand: "chery", name: "สุวินทวงศ์", province: "กรุงเทพมหานคร", region: "bangkok", lat: 13.8098089, lng: 100.8038085, exact: true,
    address: "89/3 หมู่ 8 ถ.สุวินทวงศ์ กรุงเทพมหานคร", phone: "" },
  { brand: "gwm", name: "พหลโยธิน กม.25", province: "ปทุมธานี", region: "bangkok", lat: 13.9295513, lng: 100.6263201, exact: true, address: "", phone: "" },
  { brand: "lepas", name: "ตลาดไท", province: "ปทุมธานี", region: "bangkok", lat: 14.0935744, lng: 100.6188544, exact: true, address: "", phone: "" },

  // ---------------- EAST · ภาคตะวันออก (9) ----------------
  { brand: "omoda-jaecoo", name: "นครนายก", province: "นครนายก", region: "east", lat: 14.2097142, lng: 101.2056875, exact: true, address: "", phone: "" },
  { brand: "omoda-jaecoo", name: "ชลบุรี", province: "ชลบุรี", region: "east", lat: 13.4020634, lng: 101.0049909, exact: true, address: "", phone: "" },
  { brand: "omoda-jaecoo", name: "จันทบุรี", province: "จันทบุรี", region: "east", lat: 12.6012529, lng: 102.1371721, exact: true, address: "", phone: "" },
  { brand: "omoda-jaecoo", name: "ตราด", province: "ตราด", region: "east", lat: 12.2909034, lng: 102.4814907, exact: true, address: "", phone: "" },
  { brand: "omoda-jaecoo", name: "ระยอง", province: "ระยอง", region: "east", lat: 12.6850, lng: 101.2750, exact: false, address: "", phone: "" },
  { brand: "changan", name: "ระยอง", province: "ระยอง", region: "east", lat: 12.6837062, lng: 101.2473526, exact: true,
    address: "558/2 ถ.สุขุมวิท จ.ระยอง", phone: "" },
  { brand: "chery", name: "ระยอง", province: "ระยอง", region: "east", lat: 12.6834114, lng: 101.2469514, exact: true,
    address: "792 ถ.สุขุมวิท จ.ระยอง", phone: "062-482-8289" },
  { brand: "lepas", name: "พัทยา - นาจอมเทียน", province: "ชลบุรี", region: "east", lat: 12.8420793, lng: 100.910489, exact: true,
    address: "222 ถ.สุขุมวิท นาจอมเทียน จ.ชลบุรี", phone: "082-466-9460" },
  { brand: "wuling", name: "พัทยา - นาจอมเทียน", province: "ชลบุรี", region: "east", lat: 12.8423114, lng: 100.9106918, exact: true,
    address: "222/2 ถ.สุขุมวิท นาจอมเทียน จ.ชลบุรี", phone: "" },

  // ---------------- SOUTH · ภาคใต้ (1) ----------------
  { brand: "wuling", name: "ภูเก็ต", province: "ภูเก็ต", region: "south", lat: 7.9863375, lng: 98.3582656, exact: true, address: "", phone: "" }
];

// Region tabs above the map: name, Thai name, and how far the map zooms out
const regions = {
  all:       { name: "All Thailand", th: "ทั้งประเทศ" },
  northeast: { name: "Northeast", th: "ภาคตะวันออกเฉียงเหนือ" },
  bangkok:   { name: "Bangkok & Vicinity", th: "กรุงเทพฯ และปริมณฑล" },
  east:      { name: "East", th: "ภาคตะวันออก" },
  south:     { name: "South", th: "ภาคใต้" }
};
