/* global React */
const { useState, useEffect } = React;

// ============ FAMILY ============
const FAMILY = [
  { id: 'shai', name: 'שי', nameEn: 'Shai', age: 46, color: '#2e6b8f', emoji: '🗺️' },
  { id: 'dina', name: 'דינה', nameEn: 'Dina', age: 49, color: '#e89ba8', emoji: '💃' },
  { id: 'omer', name: 'עומר', nameEn: 'Omer', age: 15, color: '#e05a3e', emoji: '🥷', image: 'assets/omer.svg' },
  { id: 'inbar', name: 'ענבר', nameEn: 'Inbar', age: 13, color: '#f4b940', emoji: '🩰' },
  { id: 'rotem', name: 'רותם', nameEn: 'Rotem', age: 10, color: '#3f6b3a', emoji: '🤸\u200d♀️' },
];

// ============ VOTERS (everyone — all three family groups) ============
const VOTERS = [
  ...FAMILY.map(p => ({ ...p, group: 'קופמן' })),
  // NJ Alperts
  { id: 'yair',  name: 'יאיר',  nameEn: 'Yair',  color: '#2e6b8f', emoji: '👨', group: 'אלפרט · ניו ג׳רזי' },
  { id: 'einat', name: 'עינת', nameEn: 'Einat', color: '#e89ba8', emoji: '👩', group: 'אלפרט · ניו ג׳רזי' },
  { id: 'rom',   name: 'רום',   nameEn: 'Rom',   age: 6, color: '#f4b940', emoji: '🎈', group: 'אלפרט · ניו ג׳רזי' },
  { id: 'nur',   name: 'נור',   nameEn: 'Nur',   age: 2, color: '#ee6352', emoji: '🧸', group: 'אלפרט · ניו ג׳רזי' },
  // GA Alperts
  { id: 'boaz',  name: 'בועז', nameEn: 'Boaz',  color: '#2e6b8f', emoji: '👨', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'libby', name: 'ליבי', nameEn: 'Libby', color: '#e89ba8', emoji: '👩', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'ella',  name: 'אלה',  nameEn: 'Ella',  age: 16, color: '#f4b940', emoji: '✨', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'gal',   name: 'גל',   nameEn: 'Gal',   age: 14, color: '#e05a3e', emoji: '⚡', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'eyal',  name: 'אייל', nameEn: 'Eyal',  age: 11, color: '#3f6b3a', emoji: '🚀', group: 'אלפרט · ג׳ורג׳יה' },
];

// ============ EXTENDED TRIP OPTIONS ============
// Each option has:
//  - highlights: attractions with links
//  - food: a curated list of foodie-worthy restaurants (name, style, note, link)
const OPTIONS = [
  {
    id: 'poconos',
    name: 'הרי הפוקונוס',
    nameEn: 'The Poconos',
    region: 'פנסילבניה',
    vibe: 'בקתות ענק, פארק מים מקורה, וסצנת אוכל מקומית שמפתיעה',
    color: '#3f6b3a',
    accent: '#6b9a4f',
    days: '3 ימים',
    travel: { mode: 'drive', duration: '2:00 שעות' },
    photo: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=80',
    highlights: [
      { icon: '💦', title: 'Kalahari Resort', text: 'פארק המים המקורה הגדול בארה"ב', link: 'https://www.kalahariresorts.com/pennsylvania/' },
      { icon: '🛍️', title: 'Crossings Premium Outlets', text: 'אאוטלט מותגים קלאסי', link: 'https://www.premiumoutlets.com/outlet/the-crossings' },
      { icon: '🛶', title: 'Bushkill Falls', text: '"ניאגרה של פנסילבניה" — מסלולים קצרים', link: 'https://www.visitbushkillfalls.com/' },
    ],
    food: [
      { name: 'Barley Creek Brewing Co.', style: 'באבפאב · משפחתי', note: 'חצר ענקית עם משחקים לילדים, המבורגרים מעולים', link: 'https://www.barleycreek.com/' },
      { name: 'Bistecca by Il Villagio', style: 'סטייקים איטלקיים', note: 'מהמסעדות הכי נחשבות באזור, בר יין עמוק', link: 'https://www.bisteccapoconos.com/' },
      { name: 'Desaki', style: 'Hibachi יפני', note: 'חוויה תיאטרלית מול הילדים — סושי טוב גם', link: 'https://www.desaki.com/' },
    ],
    detail: 'בידור משפחתי מושלם. הילדים עפים ב-Kalahari בזמן שדינה חורשת את האאוטלט. הסצנה הקולינרית בפוקונוס קטנה אבל יש שם כמה יהלומים — במיוחד Bistecca, שנחשב מהמסעדות הטובות בפנסילבניה הכפרית.',
  },
  {
    id: 'montreal',
    name: 'מונטריאול וקוויבק',
    nameEn: 'Montréal & Québec City',
    region: 'קנדה',
    vibe: 'חופשה "אירופאית" קרובה — עיר אוכל ברמה עולמית',
    color: '#2e6b8f',
    accent: '#78b4d0',
    days: '4-5 ימים',
    travel: { mode: 'drive', duration: '6:00 שעות' },
    photo: 'https://images.unsplash.com/photo-1519178614-68673b201f36?w=1400&q=80',
    highlights: [
      { icon: '🏔️', title: 'Mount Royal', text: 'תצפית פנורמית על העיר', link: 'https://www.lemontroyal.qc.ca/en' },
      { icon: '🏬', title: 'RÉSO (Underground City)', text: 'העיר התחתית המקורה — שופינג בכל מזג', link: 'https://www.mtl.org/en/experience/reso-montreals-underground-city' },
      { icon: '💧', title: 'Montmorency Falls', text: 'רכבל וגשר תלוי — בלי סירות', link: 'https://www.sepaq.com/ct/pcm/' },
    ],
    food: [
      { name: "Schwartz's Deli", style: 'Smoked meat · מוסד מאז 1928', note: 'הכריך הכי מפורסם בקנדה. לעמוד בתור, להזמין medium-fat', link: 'https://schwartzsdeli.com/' },
      { name: 'Au Pied de Cochon', style: 'Foie gras · שפ Martin Picard', note: 'מקדש לאוכלי בשר, Bib Gourmand', link: 'https://www.aupieddecochon.ca/en' },
      { name: 'Joe Beef', style: 'צרפתי מודרני · Little Burgundy', note: 'אחת המסעדות הכי חגיגיות בצפון אמריקה — חובה לשריין', link: 'https://joebeef.com/' },
      { name: 'Le Chien Fumant', style: 'ביסטרו מקומי', note: 'כולל "אצל השכנים" — אינטימי, יצירתי, לא תיירותי', link: 'https://lechienfumant.com/' },
      { name: "Aux Anciens Canadiens (Québec City)", style: 'מטבח קוויבקי מסורתי', note: 'בבית מ-1675 בתוך החומות. פאי בשר, סירופ מייפל', link: 'https://auxancienscanadiens.qc.ca/en/' },
    ],
    detail: 'אירופה 6 שעות מהבית. אווירה צרפתית, רחובות מרוצפים, עגלות רחוב ואגם באמצע העיר. בקוויבק סיטי: Aux Anciens Canadiens למנות קוויבקיות מסורתיות בתוך בית עתיק. מונטמורנסי (המפלים) חובה.',
  },
  {
    id: 'newport',
    name: 'ניופורט',
    nameEn: 'Newport, RI',
    region: 'רוד איילנד',
    vibe: 'אחוזות פאר, Cliff Walk מעל האוקיינוס, ועיר-נמל קטנה וקסומה',
    color: '#e05a3e',
    accent: '#f4b940',
    days: '3 ימים',
    travel: { mode: 'drive', duration: '3:30 שעות' },
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80',
    highlights: [
      { icon: '🏰', title: 'Fort Adams', text: 'מצודה לחקור — טובה לילדים', link: 'https://www.fortadams.org/' },
      { icon: '👑', title: 'The Breakers', text: 'אחוזת הפאר של Vanderbilt', link: 'https://www.newportmansions.org/mansions-and-gardens/the-breakers/' },
      { icon: '🌊', title: 'Cliff Walk', text: 'שביל סלול 5.6 ק"מ מעל האוקיינוס', link: 'https://www.cliffwalk.com/' },
    ],
    food: [
      { name: 'The Mooring', style: 'Seafood · בקצה המרינה', note: 'ה-Bag of Doughnuts (כדורי לובסטר-פילו) אגדי', link: 'https://www.mooringrestaurant.com/' },
      { name: "Flo's Clam Shack", style: 'קלאסיקה ימית', note: 'מסעדת צדפים ומאכלי ים מ-1936 · משפחתי, רעשני וכיפי', link: 'https://www.flosclamshack.com/' },
      { name: 'The Black Pearl', style: 'New England fine dining', note: 'Chowder שזכה בפרסים, על המים בעיירה העתיקה', link: 'https://blackpearlnewport.com/' },
      { name: 'Brick Alley Pub', style: 'פאב משפחתי', note: 'מלא מזכרות ספורט, תפריט ענק, מחירים סבירים', link: 'https://www.brickalley.com/' },
      { name: "Thames Street Kitchen", style: 'ניו-אמריקאי יצירתי', note: 'שפ טייבל קטן, מתחלף לפי העונה — שווה לשריין', link: 'https://thamesstreetkitchen.com/' },
    ],
    detail: 'העידן המוזהב של אמריקה. בניגוד למה שחושבים, ניופורט היא סצנת אוכל רצינית. The Mooring ו-Black Pearl לערבים חגיגיים, Flo\'s לארוחת צהריים ימית אותנטית, Brick Alley כשהילדים רוצים פאב.',
  },
  {
    id: 'hudson',
    name: 'עמק ההדסון',
    nameEn: 'Hudson Valley',
    region: 'ניו יורק',
    vibe: 'Farm-to-table שינה את אמריקה כאן — יעד מספר 1 לפודיז',
    color: '#6b4a82',
    accent: '#b89acf',
    days: '3 ימים',
    travel: { mode: 'drive', duration: '1:45 שעות' },
    photo: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1400&q=80',
    highlights: [
      { icon: '🌉', title: 'Walkway Over the Hudson', text: 'גשר הולכי רגל הארוך בעולם', link: 'https://walkway.org/' },
      { icon: '🧥', title: 'Beacon & Woodstock', text: 'עיירות בוטיק ווינטג\'', link: 'https://www.beaconny.gov/' },
      { icon: '🌲', title: 'Minnewaska State Park', text: 'מסלול קצר + אגם כחול מושלם', link: 'https://parks.ny.gov/parks/minnewaska' },
    ],
    food: [
      { name: 'Blue Hill at Stone Barns', style: 'Farm-to-table · ⭐ Michelin', note: 'השפ Dan Barber. בילו בחווה, אוכלים ממנה. חוויה שמגדירה ארוחה', link: 'https://www.bluehillfarm.com/dine/stone-barns' },
      { name: 'Troutbeck', style: 'אחוזה כפרית · טוויסט ברוח Amenia', note: 'ארוחה פוטוגנית בספרייה/גן — Bib Gourmand', link: 'https://troutbeck.com/restaurant/' },
      { name: 'Phoenicia Diner', style: 'דיינר רטרו אגדי', note: 'פנקייקים + בריסקט מחומרי גלם מקומיים. מוזכר ב-NYT', link: 'https://www.phoeniciadiner.com/' },
      { name: "Brushland Eating House", style: 'פאב־חווה קטן', note: 'אטמוספרה כמעט-סקוטית, תפריט קצר שמשתנה', link: 'https://www.brushlandeatinghouse.com/' },
      { name: 'Kitty\'s (Hudson)', style: 'דיינר-ממתקים של Zak Pelaccio', note: 'מילקשייקים אייקוניים, ברוח אמריקה של פעם', link: 'https://www.kittys.nyc/' },
    ],
    detail: 'זה היעד החזק שלכם כפודיז. Blue Hill at Stone Barns הוא עלייה לרגל (לשריין חודשים מראש). Troutbeck וה-Phoenicia Diner מכסים את הקצוות. פחות משעתיים מהבית — אפשר לחזור עם אוכל.',
  },
  {
    id: 'toronto',
    name: 'טורונטו וניאגרה',
    nameEn: 'Toronto & Niagara Falls',
    region: 'קנדה',
    vibe: 'רכבות הרים + סצנה קולינרית הכי מגוונת בצפון אמריקה',
    color: '#c14050',
    accent: '#f08070',
    days: '4-5 ימים',
    travel: { mode: 'flight', duration: '1:45 טיסה' },
    photo: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1400&q=80',
    highlights: [
      { icon: '🎢', title: "Canada's Wonderland", text: 'רכבות הרים שוברות שיאים', link: 'https://www.canadaswonderland.com/' },
      { icon: '🛒', title: 'Kensington Market', text: 'שכונת וינטג\' + דוכני אוכל', link: 'https://www.kensington-market.ca/' },
      { icon: '💧', title: 'Journey Behind the Falls', text: 'מנהרות סלע במקום הסירה', link: 'https://www.niagaraparks.com/visit/attractions/journey-behind-the-falls/' },
    ],
    food: [
      { name: 'St. Lawrence Market', style: 'שוק אוכל מקורה אייקוני', note: 'Carousel Bakery\'s peameal sandwich — מוסד. גן עדן למשפחה גדולה', link: 'https://www.stlawrencemarket.com/' },
      { name: 'Alo', style: 'Tasting menu · ⭐ Michelin', note: 'מקום #1 בקנדה ברשימות רבות. שריון חודשים מראש', link: 'https://alorestaurant.com/' },
      { name: 'Edulis', style: 'קלאסי-אירופי · Bib Gourmand', note: 'כמויות פטריות ופירות ים — אינטימי וזוגי', link: 'https://edulisrestaurant.com/' },
      { name: 'Pai Northern Thai', style: 'Khao soi · נואר-שאן', note: 'הכי טוב בעיר — שורש, חריף, תור מהיר', link: 'https://www.paitoronto.com/' },
      { name: 'Seven Lives (Kensington)', style: 'טאקו דגים מסוג Baja', note: 'טאקו חוף קליפורני-מקסיקני שמעיפים את הראש', link: 'https://www.instagram.com/sevenlivestacos/' },
    ],
    detail: 'טיסה ישירה של שעה וחצי מ-EWR/JFK ל-YYZ חוסכת 16 שעות נהיגה הלוך-חזור. מפלי הניאגרה שעה וחצי מהעיר — Canada\'s Wonderland, Kensington Market, St. Lawrence Market ו-Journey Behind the Falls כולם נגישים ללא נסיעה ארוכה.',
  },
  {
    id: 'bermuda',
    name: 'ברמודה',
    nameEn: 'Bermuda',
    region: 'אי באטלנטי',
    vibe: 'חופי חול ורוד, מערות גביש, ללא נהיגה — שבוע חוף קסום',
    color: '#0e7f94',
    accent: '#7bc5cf',
    days: '4-5 ימים',
    travel: { mode: 'flight', duration: '2:00 טיסה' },
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80',
    highlights: [
      { icon: '🏖️', title: 'Horseshoe Bay Beach', text: 'החוף המפורסם עם החול הוורוד', link: 'https://www.gotobermuda.com/listing/horseshoe-bay-beach' },
      { icon: '💎', title: 'Crystal & Fantasy Caves', text: 'מערות גביש עם אגמים תת-קרקעיים', link: 'https://www.caves.bm/' },
      { icon: '🐠', title: 'Tobacco Bay · שנורקלינג', text: 'לגונה רדודה עם דגים צבעוניים, ציוד זמין במקום', link: 'https://www.tobaccobay.bm/' },
      { icon: '⚓', title: 'Royal Naval Dockyard', text: 'מתחם משחקים, חנויות ומוזיאון ימי', link: 'https://dockyardbermuda.com/' },
      { icon: '🛵', title: 'טוויזי / קטנועים', text: 'תחבורה משפחתית באי — אין השכרת רכב', link: 'https://www.currentvehicles.com/' },
    ],
    food: [],
    detail: 'טיסה של שעתיים לגן עדן. אין נהיגה — פה משתמשים בקטנועים, טוויזי חשמלי ומיניבוסים. חופים ורודים, שנורקלינג מטורף, מערות, והשפה אנגלית. שבוע חוף משפחתי מושלם בלי עייפות של טיסה ארוכה — ידידותי לכל הגילאים, במיוחד לרותם.',
  },
  {
    id: 'obx',
    name: 'אאוטר בנקס',
    nameEn: 'Outer Banks, NC',
    region: 'צפון קרוליינה',
    vibe: 'חופים פראיים, סוסי בר, דיונות ענק — קיץ אמריקאי קלאסי',
    color: '#c97f4a',
    accent: '#f4c99b',
    days: '4-5 ימים',
    travel: { mode: 'flight', duration: '1:30 טיסה' },
    photo: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1400&q=80',
    highlights: [
      { icon: '🐴', title: 'סוסי הבר של קורולה', text: 'סיור ג׳יפים על החוף לצפייה בסוסי מוסטנג חופשיים', link: 'https://www.corollawildhorses.com/' },
      { icon: '✈️', title: 'Wright Brothers Memorial', text: 'המקום שבו האנושות התחילה לעוף', link: 'https://www.nps.gov/wrbr/' },
      { icon: '🏜️', title: "Jockey's Ridge דיונות", text: 'הדיונות הגבוהות במזרח ארה"ב — החלקה ועפיפונים', link: 'https://www.ncparks.gov/state-parks/jockeys-ridge-state-park' },
      { icon: '🗼', title: 'Cape Hatteras Lighthouse', text: 'המגדלור הגבוה באמריקה · 257 מדרגות למעלה', link: 'https://www.nps.gov/caha/' },
      { icon: '🏠', title: 'בית על החוף', text: 'השכרת בית חוף גדול למשפחה — סטנדרט באזור', link: 'https://www.outerbanks.com/vacation-rentals/' },
    ],
    food: [],
    detail: 'קיץ אמריקאי קלאסי: בית על החוף, מנגלים, בוקר על המרפסת. שילוב ייחודי של חוף + היסטוריה (אחים רייט) + טבע בר (סוסי קורולה). טיסה ל-Norfolk (1:30) ואז כשעתיים נהיגה דרומה.',
  },
  {
    id: 'mackinac',
    name: 'מקינאק איילנד',
    nameEn: 'Mackinac Island, MI',
    region: 'מישיגן',
    vibe: 'אי ויקטוריאני ללא מכוניות — כרכרות, אופניים וקסם של פעם',
    color: '#855c9c',
    accent: '#c3a5d1',
    days: '3-4 ימים',
    travel: { mode: 'flight', duration: '1:50 טיסה' },
    photo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80',
    highlights: [
      { icon: '🐎', title: 'כרכרות סוסים', text: 'התחבורה הראשית באי — אין מכוניות מ-1898', link: 'https://mackinacisland.org/activities/carriage-tours/' },
      { icon: '🏨', title: 'Grand Hotel', text: 'המרפסת הארוכה בעולם · ארוחה פורמלית היסטורית', link: 'https://www.grandhotel.com/' },
      { icon: '🚲', title: 'הקפת האי באופניים', text: '13 ק"מ שטוחים מול האגם · שעתיים-שלוש', link: 'https://mackinacisland.org/activities/biking/' },
      { icon: '🌉', title: 'Arch Rock', text: 'קשת סלע טבעית דרמטית · תצפית חובה', link: 'https://mackinacisland.org/activities/places-to-see/arch-rock/' },
      { icon: '🏰', title: 'Fort Mackinac', text: 'מצודה בריטית שחזוריה מוקדמים — הדגמות תותח חיות', link: 'https://mackinacparks.com/parks-and-attractions/fort-mackinac/' },
    ],
    food: [],
    detail: 'האי הכי ייחודי במערב התיכון, וגם אחד המקומות הכי פוטוגניים באמריקה. אין מכוניות — תחבורה בכרכרות, סוסים ואופניים. טיסה לדטרויט (1:50) ואז רכב + מעבורת, או טיסה קטנה ישירה ל-PLN. האי קטן, קומפקטי וקסום — מושלם לילדים וכן מכניס מתבגרים לווייב אחר לגמרי.',
  },
];

// ============ NJ DAYS ============
const NJ_DAYS = [
  {
    title: 'יום פארק מים + שופינג',
    subtitle: 'American Dream + The Mills',
    color: '#78b4d0',
    icon: '💦',
    blocks: [
      { time: 'בוקר', icon: '💦', title: 'DreamWorks Water Park', en: 'American Dream Mall', note: 'פארק המים המקורה הגדול בצפון אמריקה — גלישות, בריכת גלים, נהר עצל', link: 'https://www.americandream.com/attractions/dreamworks-water-park' },
      { time: 'צהריים', icon: '🛍️', title: 'The Mills at Jersey Gardens', en: 'Outlets · 15 min drive', note: 'נייקי · ליוויס · גאפ — ללא מע"מ על ביגוד, 15 דק׳ מ-American Dream', link: 'https://www.simon.com/mall/the-mills-at-jersey-gardens' },
    ],
  },
  {
    title: 'יום רכבות הרים',
    subtitle: 'Six Flags או פרינסטון',
    color: '#e05a3e',
    icon: '🎢',
    blocks: [
      { time: 'למחפשי ריגושים', icon: '🎢', title: 'Six Flags Great Adventure', en: 'Kingda Ka · El Toro', note: 'רכבות ההרים הגבוהות בעולם — כולל Kingda Ka ו-El Toro', link: 'https://www.sixflags.com/greatadventure' },
      { time: 'במקביל', icon: '🎓', title: 'פרינסטון · Palmer Square', en: 'Princeton (40 min)', note: 'קמפוס היסטורי, בוטיקים ב-Palmer Square, ארוחה שקטה — האלטרנטיבה של דינה', link: 'https://www.palmersquare.com/' },
    ],
  },
];

// ============ NYC MEGA DAYS ============
const NYC_DAYS = [
  {
    theme: 'ריגול, תצפיות, שופינג',
    color: '#2e6b8f',
    icon: '🔦',
    stops: [
      { icon: '🕵️', title: 'SPYSCAPE', note: 'מוזיאון ריגול עם מעברי לייזר · משימות אישיות וגדג׳טים', link: 'https://spyscape.com/' },
      { icon: '🏙️', title: 'The Edge', note: 'המרפסת התלויה הגבוהה במערב · רצפת זכוכית · קוקטיילים למעלה', link: 'https://www.edgenyc.com/' },
      { icon: '🛒', title: "Macy's Herald Square", note: 'הסניף הענק · הנחות תיירים · Visitor Center בקומה התחתונה', link: 'https://www.visitmacysusa.com/stores/herald-square' },
    ],
  },
  {
    theme: 'טבע היי-טק',
    color: '#3f6b3a',
    icon: '🦋',
    stops: [
      { icon: '🦖', title: 'Gilder Center · AMNH', note: 'אגף חדש, ארכיטקטורה עתידנית · מוזיאון הטבע באותה כניסה', link: 'https://www.amnh.org/exhibitions/gilder-center' },
      { icon: '🦋', title: 'Butterfly Vivarium', en: 'פרפרים חיים', note: 'חממה חמה באותו בניין · פרפרים נוחתים עליכם', link: 'https://www.amnh.org/exhibitions/butterflies' },
      { icon: '🌳', title: 'Central Park + Columbus Circle', note: 'סיום יום קליל · Bow Bridge · ארוחה קלילה ב-Time Warner Center', link: 'https://www.centralparknyc.org/' },
    ],
  },
  {
    theme: 'הווייב של ברוקלין',
    color: '#e05a3e',
    icon: '🌉',
    stops: [
      { icon: '🌉', title: 'Brooklyn Bridge → DUMBO', note: 'הליכה קלאסית · נוף לקו הרקיע · סיום בסמטת Washington-Water לפיקצ׳ר', link: 'https://www.dumbo.is/visit' },
      { icon: '🍽️', title: 'Time Out Market', note: 'שוק אוכל מקורה · גג פתוח עם נוף מנהטן', link: 'https://www.timeoutmarket.com/newyork/' },
      { icon: '🛒', title: 'Brooklyn Flea + Vintage', note: 'יריד מציאות · Williamsburg או DUMBO בסופ"ש', link: 'https://www.brooklynflea.com/' },
    ],
  },
];

// ============ EXTENDED FAMILY (ALPERT) ============
const ALPERT_FAMILIES = [
  {
    id: 'alpert-nj',
    label: 'משפחת אלפרט · ניו ג׳רזי',
    location: 'בסיס האם',
    note: 'מארחים אותנו בפתיחה — יאיר הוא בן-הדוד שלנו',
    color: '#2e6b8f',
    tape: 'var(--tape-blue)',
    tapeRotate: -4,
    members: [
      { name: 'יאיר', nameEn: 'Yair', role: 'אבא', emoji: '👨', color: '#2e6b8f' },
      { name: 'עינת', nameEn: 'Einat', role: 'אמא', emoji: '👩', color: '#e89ba8' },
      { name: 'רום', nameEn: 'Rom', age: 6, emoji: '🎈', color: '#f4b940' },
      { name: 'נור', nameEn: 'Nur', age: 2, emoji: '🧸', color: '#ee6352' },
    ],
  },
  {
    id: 'alpert-ga',
    label: 'משפחת אלפרט · ג׳ורג׳יה',
    location: 'אולי בגיחה',
    note: 'אולי טסים מאטלנטה להיפגש איתנו בגיחה — אותם גילאים כמו עומר, ענבר ורותם',
    color: '#c14050',
    tape: 'var(--tape-pink)',
    tapeRotate: 4,
    members: [
      { name: 'בועז', nameEn: 'Boaz', role: 'אבא', emoji: '👨', color: '#2e6b8f' },
      { name: 'ליבי', nameEn: 'Libby', role: 'אמא', emoji: '👩', color: '#e89ba8' },
      { name: 'אלה', nameEn: 'Ella', age: 16, emoji: '✨', color: '#f4b940' },
      { name: 'גל', nameEn: 'Gal', age: 14, emoji: '⚡', color: '#e05a3e' },
      { name: 'אייל', nameEn: 'Eyal', age: 11, emoji: '🚀', color: '#3f6b3a' },
    ],
  },
];

Object.assign(window, { FAMILY, VOTERS, OPTIONS, NJ_DAYS, NYC_DAYS, ALPERT_FAMILIES });
