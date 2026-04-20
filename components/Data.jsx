/* global React */
const { useState, useEffect } = React;

// ============ FAMILY ============
const FAMILY = [
  { id: 'shai', name: 'שי', nameEn: 'Shai', age: 46, color: '#2e6b8f', emoji: '🎢', tag: 'אבא' },
  { id: 'dina', name: 'דינה', nameEn: 'Dina', age: 49, color: '#e89ba8', emoji: '🌸', tag: 'אמא' },
  { id: 'omer', name: 'עומר', nameEn: 'Omer', age: 15, color: '#e05a3e', emoji: '🥷', tag: 'נינג׳ה ווריור' },
  { id: 'inbar', name: 'ענבר', nameEn: 'Inbar', age: 13, color: '#f4b940', emoji: '💃', tag: 'רקדנית' },
  { id: 'rotem', name: 'רותם', nameEn: 'Rotem', age: 10, color: '#3f6b3a', emoji: '🤸\u200d♀️', tag: 'התעמלות + ריקוד' },
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
    drive: '2:00 שעות',
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
    drive: '6:00 שעות',
    photo: 'https://images.unsplash.com/photo-1519178614-68673b201f36?w=1400&q=80',
    highlights: [
      { icon: '🏔️', title: 'Mount Royal', text: 'תצפית פנורמית על העיר', link: 'https://www.lemontroyal.qc.ca/en' },
      { icon: '🏬', title: 'RÉSO (Underground City)', text: 'העיר התחתית המקורה — שופינג בכל מזג', link: 'https://www.mtl.org/en/experience/reso-montreals-underground-city' },
      { icon: '💧', title: 'Montmorency Falls', text: 'רכבל וגשר תלוי — בלי סירות', link: 'https://www.sepaq.com/ct/pcm/' },
    ],
    food: [
      { name: "Schwartz's Deli", style: 'Smoked meat · מוסד מאז 1928', note: 'הכריך הכי מפורסם בקנדה. לעמוד בתור, להזמין medium-fat', link: 'https://schwartzsdeli.com/' },
      { name: 'Au Pied de Cochon', style: 'Foie gras · שפ Martin Picard', note: 'מקדש לאוכלי בשר — פוטין עם פואה גרא, Bib Gourmand', link: 'https://www.aupieddecochon.ca/en' },
      { name: 'Joe Beef', style: 'צרפתי מודרני · Little Burgundy', note: 'אחת המסעדות הכי חגיגיות בצפון אמריקה — חובה לשריין', link: 'https://joebeef.com/' },
      { name: 'Le Chien Fumant', style: 'ביסטרו מקומי', note: 'כולל "אצל השכנים" — אינטימי, יצירתי, לא תיירותי', link: 'https://lechienfumant.com/' },
      { name: "Aux Anciens Canadiens (Québec City)", style: 'מטבח קוויבקי מסורתי', note: 'בבית מ-1675 בתוך החומות. פאי בשר, סירופ מייפל', link: 'https://auxancienscanadiens.qc.ca/en/' },
    ],
    detail: 'אירופה 6 שעות מהבית. מונטריאול היא אחת מערי האוכל הגדולות בצפון אמריקה — חובה לשריין את Joe Beef ו-Au Pied de Cochon מראש. בקוויבק סיטי: Aux Anciens Canadiens למנות קוויבקיות מסורתיות בתוך בית עתיק. פוטין חובה בדרך.',
  },
  {
    id: 'newport',
    name: 'ניופורט',
    nameEn: 'Newport, RI',
    region: 'רוד איילנד',
    vibe: 'אחוזות פאר, Cliff Walk, ועיר-נמל עם לובסטר רולס ברמה',
    color: '#e05a3e',
    accent: '#f4b940',
    days: '3 ימים',
    drive: '3:30 שעות',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80',
    highlights: [
      { icon: '🏰', title: 'Fort Adams', text: 'מצודה לחקור — טובה לילדים', link: 'https://www.fortadams.org/' },
      { icon: '👑', title: 'The Breakers', text: 'אחוזת הפאר של Vanderbilt', link: 'https://www.newportmansions.org/mansions-and-gardens/the-breakers/' },
      { icon: '🌊', title: 'Cliff Walk', text: 'שביל סלול 5.6 ק"מ מעל האוקיינוס', link: 'https://www.cliffwalk.com/' },
    ],
    food: [
      { name: 'The Mooring', style: 'Seafood · בקצה המרינה', note: 'ה-Bag of Doughnuts (כדורי לובסטר-פילו) אגדי', link: 'https://www.mooringrestaurant.com/' },
      { name: "Flo's Clam Shack", style: 'קלאסיקה ימית', note: 'לובסטר רולס, קלאם קייקס, רעשני וכיפי — מזה 1936', link: 'https://www.flosclamshack.com/' },
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
    drive: '1:45 שעות',
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
    drive: '8:00 שעות',
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
    detail: 'טורונטו היא אולי סצנת האוכל הכי מגוונת בצפון אמריקה. Alo לארוחה חגיגית, Pai לערב משפחתי, Seven Lives לארוחת רחוב. St. Lawrence Market הוא הפתיחה המושלמת לבוקר.',
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

// ============ ROAD RULES ============
const ROAD_RULES = [
  { icon: '🍟', title: 'אוכל שהם אוהבים', text: 'בדרכים, מוותרים על יוקרה. עוצרים ב-Chick-fil-A, Shake Shack או IHOP. לנוער — שיא החוויה.' },
  { icon: '🔓', title: 'שבירת שגרה אינטראקטיבית', text: 'לא נוסעים שעות ברצף. חדר בריחה בעיר בדרך או תערוכה אינטראקטיבית מפעילים את הראש.' },
  { icon: '📷', title: 'טבע עם "וואו"', text: 'לא גוררים מתבגרים למסלולים ארוכים. תצפית פסיכית, חצי שעה, תמונות לאינסטגרם, וממשיכים.' },
  { icon: '🏆', title: 'משחק המשימות', text: 'צוברים נקודות: שלטי מדינות, החטיף האמריקאי הכי מוגזם בתחנת דלק, משהו מוזר בדרך. המנצח בוחר את המסעדה הבאה.' },
];

Object.assign(window, { FAMILY, OPTIONS, NJ_DAYS, NYC_DAYS, ROAD_RULES });
