/* global React */
const { useState, useEffect } = React;

// ============ FAMILY (Koffmans) ============
const FAMILY = [
  { id: 'shai', name: 'שי', nameEn: 'Shai', age: 46, color: '#2e6b8f', emoji: '🗺️' },
  { id: 'dina', name: 'דינה', nameEn: 'Dina', age: 49, color: '#e89ba8', emoji: '💃' },
  { id: 'omer', name: 'עומר', nameEn: 'Omer', age: 15, color: '#e05a3e', emoji: '🧗‍♂️', image: 'assets/omer.svg?v=2026.8' },
  { id: 'inbar', name: 'ענבר', nameEn: 'Inbar', age: 13, color: '#e0559a', emoji: '🩰' },
  { id: 'rotem', name: 'רותם', nameEn: 'Rotem', age: 10, color: '#3f6b3a', emoji: '🤸‍♀️' },
];

// ============ VOTERS (everyone — all three family groups, all 14) ============
const VOTERS = [
  ...FAMILY.map(p => ({ ...p, group: 'קופמן' })),
  // NJ Alperts — host New York
  { id: 'yair',  name: 'יעיר',  nameEn: 'Yaair',  color: '#2e6b8f', emoji: '👨', group: 'אלפרט · ניו ג׳רזי' },
  { id: 'einat', name: 'עינת', nameEn: 'Einat', color: '#e89ba8', emoji: '👩', group: 'אלפרט · ניו ג׳רזי' },
  { id: 'rom',   name: 'רום',   nameEn: 'Rom',   age: 6, color: '#f4b940', emoji: '🎈', group: 'אלפרט · ניו ג׳רזי' },
  { id: 'nur',   name: 'נור',   nameEn: 'Nur',   age: 2, color: '#ee6352', emoji: '🧸', group: 'אלפרט · ניו ג׳רזי' },
  // GA Alperts — host Atlanta
  { id: 'boaz',  name: 'בועז', nameEn: 'Boaz',  color: '#2e6b8f', emoji: '👨', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'libby', name: 'ליבי', nameEn: 'Libby', color: '#e89ba8', emoji: '👩', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'ella',  name: 'אלה',  nameEn: 'Ella',  age: 16, color: '#f4b940', emoji: '✨', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'gal',   name: 'גל',   nameEn: 'Gal',   age: 14, color: '#e05a3e', emoji: '⚡', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'eyal',  name: 'אייל', nameEn: 'Eyal',  age: 11, color: '#3f6b3a', emoji: '🚀', group: 'אלפרט · ג׳ורג׳יה' },
];

// ============ THE TWO LEGS ============
// Each leg → days → each day is a MENU of options (with duration), votable.
const LEGS = [
  // ---------------------------------------------------------------- PART 1: NY / NJ (14–21)
  {
    id: 'ny',
    part: 'חלק ראשון',
    name: 'ניו יורק וניו ג׳רזי',
    nameEn: 'New York & New Jersey',
    dates: '14–21 ביולי',
    color: '#2e4ea8',
    accent: '#8da8e8',
    hostLine: 'הבסיס: הבית של יעיר ועינת בניו ג׳רזי · עם רום ונור',
    travel: '✈️ נחיתה ב-EWR · מתארחים אצל משפחת אלפרט ניו ג׳רזי',
    days: [
      {
        id: 'ny-14', date: '14 ביולי', dow: 'שלישי', icon: '✈️',
        title: 'נחיתה ומפגש', subtitle: 'יום רגוע אחרי הטיסה · עם יעיר, עינת, רום ונור',
        options: [
          { id: 'ny-14-hoboken', duration: '~1–2 שעות', icon: '🌆', title: 'טיילת הובוקן + Pier C Park', en: 'Hoboken Waterfront', tag: 'פעוטה-פרנדלי', note: 'טיילת שטוחה מול קו הרקיע של מנהטן, פארק משחקי מים וחול לקטנים, וגלידה לאורך Washington St. פתיחה רכה ומושלמת.', link: 'https://www.hobokennj.gov/resources/pier-c-park' },
          { id: 'ny-14-liberty', duration: '~1–2 שעות', icon: '🗽', title: 'Liberty State Park', en: 'Jersey City', tag: 'כל המשפחה', note: 'מדשאות ענק עם פסל החירות וקו הרקיע ברקע, מתקני משחק וטיילת — בלי כרטיסים, סתם להיות יחד.', link: 'https://dep.nj.gov/parksandforests/state-park/liberty-state-park/' },
          { id: 'ny-14-montclair', duration: '~1–2 שעות', icon: '🍦', title: 'שיטוט במונטקלייר + גלידה', en: 'Montclair', tag: 'רגוע', note: 'עיירה ירוקה והליכתית עם חנויות, פארקים וגלידריית Absolute המפורסמת — נינוח ולא מאמץ.', link: 'https://www.absoluteicecream.com/' },
          { id: 'ny-14-home', duration: 'גמיש', icon: '🏡', title: 'סתם בבית עם המשפחה', en: 'Backyard & BBQ', tag: 'ג׳ט-לג', note: 'אם הטיסה גמרה אתכם — מנגל בחצר, הילדים מתחברים, והתאקלמות שקטה לקראת השבוע.' },
          { id: 'ny-14-southmtn', duration: '~2 שעות', icon: '🧚', title: 'South Mountain Reservation', en: 'Hemlock Falls & Fairy Trail', tag: '★ יעיר ועינת', note: 'יער קסום בניו ג׳רזי — Fairy Trail עם בתי-פיות זעירים ומפל Hemlock. קרוב, קליל ויפה. מהרשימה של יעיר ועינת.' },
        ],
      },
      {
        id: 'ny-15', date: '15 ביולי', dow: 'רביעי', icon: '🗽',
        title: 'יום מנהטן', subtitle: 'תפריט אטרקציות — מרכיבים יום מכמה מהן',
        split: 'אפשר להתפצל — המתבגרים על SPYSCAPE + The Edge, הקטנטנים על מוזיאון הטבע ומוזיאון הגלידה',
        options: [
          { id: 'ny-15-spyscape', duration: '~1.5–2 שעות', icon: '🕵️', title: 'SPYSCAPE', en: 'Spy museum', tag: 'מתבגרים', note: 'מוזיאון ריגול אינטראקטיבי — מנהרות לייזר, אתגרי האקינג וגאדג׳טים. כיף ענק לעומר, ענבר וגל.', link: 'https://spyscape.com/' },
          { id: 'ny-15-edge', duration: '~1 שעה', icon: '🏙️', title: 'The Edge', en: 'Hudson Yards', tag: 'תצפית', note: 'המרפסת התלויה הגבוהה במערב עם רצפת זכוכית. צמוד ל-SPYSCAPE — קל לשלב את שניהם.', link: 'https://www.edgenyc.com/' },
          { id: 'ny-15-icecream', duration: '~1.5 שעות', icon: '🍦', title: 'Museum of Ice Cream', en: 'SoHo · interactive', tag: 'כיף לכולם', note: 'מוזיאון גלידה צבעוני ואינטראקטיבי בסוהו — בריכת סוכריות, מגלשה וטעימות גלידה בלי הגבלה. פוטוגני ומושלם לכל הגילאים.', link: 'https://www.museumoficecream.com/new-york' },
          { id: 'ny-15-amnh', duration: '~2–3 שעות', icon: '🦋', title: 'Gilder Center · AMNH', en: 'מוזיאון הטבע', tag: 'כל המשפחה', note: 'אגף Gilder החדש במוזיאון הטבע — אדריכלות עתידנית וחממת פרפרים חיים. מצוין לקטנטנים ולמבוגרים.', link: 'https://www.amnh.org/exhibitions/permanent/gilder-center' },
          { id: 'ny-15-brooklyn', duration: '~2–3 שעות', icon: '🌉', title: 'גשר ברוקלין → DUMBO', en: 'Bridge walk + Time Out Market', tag: 'פוטוגני', note: 'חוצים את הגשר רגלית, יורדים ל-DUMBO לתמונות האייקוניות, ואוכלים ב-Time Out Market עם נוף למנהטן.', link: 'https://www.timeout.com/time-out-market-new-york' },
          { id: 'ny-15-summit', duration: '~1.5 שעות', icon: '🌆', title: 'SUMMIT One Vanderbilt', en: 'Immersive observation', tag: '★ יעיר ועינת', note: 'תצפית-חוויה אימרסיבית עם מראות ורצפת זכוכית מעל מידטאון. (אם לא הייתם כבר.) מהרשימה של יעיר ועינת.' },
          { id: 'ny-15-colorfactory', duration: '~1.5 שעות', icon: '🎨', title: 'Color Factory', en: 'SoHo · interactive', tag: '★ יעיר ועינת', note: 'מוזיאון צבעים אינטראקטיבי בסוהו — בריכת בלונים, חדרים צבעוניים והרבה תמונות. צמוד למוזיאון הגלידה. מהרשימה של יעיר ועינת.' },
          { id: 'ny-15-sloomoo', duration: '~1.5 שעות', icon: '🫧', title: 'Sloomoo Institute', en: 'SoHo · slime', tag: '★ יעיר ועינת · ילדים', note: 'מקדש הסליים — אינטראקטיבי וכיפי, מושלם לרותם, רום והקטנים. מהרשימה של יעיר ועינת.' },
        ],
      },
      {
        id: 'ny-16', date: '16 ביולי', dow: 'חמישי', icon: '💦',
        title: 'שופינג + פארק מים מקורה', subtitle: 'American Dream + אאוטלטים פטורי מס',
        split: 'אפשר להתפצל — חלק בפארק המים, חלק באאוטלטים. נפגשים בערב',
        options: [
          { id: 'ny-16-dreamworks', duration: 'חצי יום', icon: '💦', title: 'DreamWorks Water Park', en: 'American Dream', tag: 'אקשן', note: 'פארק המים המקורה הגדול בצפון אמריקה — גלישות, בריכת גלים ונהר עצל, בלי תלות במזג האוויר.', link: 'https://www.americandream.com/venue/dreamworks-water-park' },
          { id: 'ny-16-mills', duration: '~2–3 שעות', icon: '🛍️', title: 'The Mills at Jersey Gardens', en: 'Tax-free outlets', tag: 'שופינג', note: 'האאוטלט הגדול בניו ג׳רזי — נייקי, אדידס, ליוויס — ללא מע"מ על ביגוד. 15 דק׳ נסיעה.', link: 'https://www.simon.com/mall/the-mills-at-jersey-gardens' },
          { id: 'ny-16-amdream', duration: '~2–3 שעות', icon: '🎢', title: 'Nickelodeon Universe + Big SNOW', en: 'באותו מתחם', tag: 'מקורה', note: 'פארק שעשועים מקורה ומדרון סקי אמיתי תחת קורת גג אחת — אלטרנטיבה לרטובים, באותו American Dream.', link: 'https://www.americandream.com/' },
        ],
      },
      {
        id: 'ny-17', date: '17 ביולי', dow: 'שישי', icon: '🕯️',
        title: 'מנהטן קליל + ארוחת שישי', subtitle: 'יום עיר רגוע · בערב ארוחה חגיגית עם אלפרט ניו יורק',
        options: [
          { id: 'ny-17-centralpark', duration: '~1–2 שעות', icon: '🌳', title: 'סנטרל פארק + Columbus Circle', en: 'Central Park', tag: 'רגוע', note: 'בוקר ירוק ונינוח בלב מנהטן — Bow Bridge, סירות, גלידה — וחזרה מוקדמת הביתה לכבוד ארוחת השישי.', link: 'https://www.centralparknyc.org/' },
          { id: 'ny-17-topofrock', duration: '~1 שעה', icon: '🏙️', title: 'Top of the Rock', en: 'Rockefeller Center', tag: 'תצפית', note: 'התצפית הקלאסית עם הנוף לאמפייר סטייט וסנטרל פארק, ממש בלב מידטאון — קצר וקולע.', link: 'https://www.rockefellercenter.com/attractions/top-of-the-rock-observation-deck/' },
          { id: 'ny-17-fifth', duration: '~1–2 שעות', icon: '🛒', title: 'Fifth Avenue + Times Square', en: 'Midtown buzz', tag: 'עיר', note: 'מנה מהירה של ניו יורק האנרגטית — שדרה חמישית, חנויות הדגל וטיימס סקוור — לפני שחוזרים למשפחה.' },
          { id: 'ny-17-dinner', duration: 'בערב', icon: '🕯️', title: 'ארוחת שישי משפחתית', en: 'Shabbat dinner', tag: '★ העיקר של היום', note: 'הלב של היום: ארוחת ערב חגיגית עם משפחת אלפרט בניו יורק. כל היום נבנה סביב החזרה הביתה בזמן.' },
        ],
      },
      {
        id: 'ny-18', date: '18 ביולי', dow: 'שבת', icon: '🛍️',
        title: 'וויליאמסבורג, ברוקלין', subtitle: 'שווקים · יד שנייה · אופנת רחוב (שבת = יום השוק)',
        split: 'אפשר להתפצל — המתבגרים על יד שנייה ב-Bedford, השאר על השווקים',
        options: [
          { id: 'ny-18-smorg', duration: '~1–2 שעות', icon: '🍔', title: 'Smorgasburg', en: 'Saturday food market', tag: 'כל המשפחה', note: 'שוק האוכל הפתוח הגדול של ברוקלין — שבת בלבד, על קו המים. עשרות דוכנים, כל אחד בוחר מה בא לו.', link: 'https://www.smorgasburg.com/' },
          { id: 'ny-18-artistsfleas', duration: '~1 שעה', icon: '🧥', title: 'Artists & Fleas', en: 'Williamsburg', tag: 'מתבגרים', note: 'שוק יוצרים ווינטג׳ מקורה/חיצוני — בגדי יד שנייה, אמנות ואקססוריז. גן עדן למתבגרים.', link: 'https://www.artistsandfleas.com/williamsburg/' },
          { id: 'ny-18-bedford', duration: '~2 שעות', icon: '👕', title: 'מסע יד-שנייה ב-Bedford Ave', en: 'Vintage crawl', tag: 'אופנת רחוב', note: 'לב הווינטג׳ של וויליאמסבורג — L Train Vintage, Beacon\'s Closet, Awoke — הליכה אחת, מציאות סטריטוור.', link: 'https://www.beaconscloset.com/' },
          { id: 'ny-18-flea', duration: '~1 שעה', icon: '🎪', title: 'Brooklyn Flea', en: 'Flea market', tag: 'יריד', note: 'יריד ווינטג׳, עתיקות ואספנות על קו המים בוויליאמסבורג — מעולה לחיטוט במציאות.', link: 'https://www.brooklynflea.com/' },
          { id: 'ny-18-domino', duration: '~1–2 שעות', icon: '🌇', title: 'Domino Park', en: 'Williamsburg waterfront', tag: '★ יעיר ועינת', note: 'פארק על קו המים בוויליאמסבורג עם נוף למנהטן, מתקני מים לילדים וטיילת. מושלם לשלב עם השווקים. מהרשימה של יעיר ועינת.' },
        ],
      },
      {
        id: 'ny-19', date: '19 ביולי', dow: 'ראשון', icon: '🌳',
        title: 'טיול עם יעיר ועינת', subtitle: 'מקום יפהפה ליום שלם · בוחרים יעד אחד',
        options: [
          { id: 'ny-19-grounds', duration: '~3–4 שעות', icon: '🗿', title: 'Grounds For Sculpture', en: 'Hamilton, NJ', tag: 'כל המשפחה', note: 'פארק פיסול וגנים על 42 דונם — שבילים נוחים לעגלה, פסלים ענקיים שהילדים מתים עליהם. הבחירה הכי כל-גילאית. (כרטיסים מראש!)', link: 'https://www.groundsforsculpture.org/' },
          { id: 'ny-19-sandyhook', duration: 'יום שלם', icon: '🏖️', title: 'Sandy Hook', en: 'Gateway NRA beach', tag: 'פעוטה-פרנדלי', note: 'חופי מפרץ ואוקיינוס עם נוף לקו הרקיע של ניו יורק, מצילים ומים רדודים ונוחים לקטנטנים.', link: 'https://www.nps.gov/gate/planyourvisit/sandy-hook.htm' },
          { id: 'ny-19-stormking', duration: '~3–4 שעות', icon: '🎨', title: 'Storm King Art Center', en: 'New Windsor, NY', tag: 'נוף עוצר נשימה', note: 'נוף פיסול ענק על 500 דונם — שדות מתגלגלים ויצירות מונומנטליות. המקום הכי מרהיב; הרבה הליכה, מומלצת עגלה/מנשא.', link: 'https://stormking.org/' },
          { id: 'ny-19-asbury', duration: 'חצי יום', icon: '🎡', title: 'Asbury Park Boardwalk', en: 'Jersey Shore', tag: 'כיף לכולם', note: 'טיילת שורצת חיים מול הים — חוף לקטנים וארקייד פינבול Silverball לגדולים. קליל ומהנה.', link: 'https://apboardwalk.com/' },
          { id: 'ny-19-bloominghill', duration: '~3–4 שעות', icon: '🌻', title: 'Blooming Hill Farm', en: 'Hudson Valley · farm', tag: '★ יעיר ועינת', note: 'חווה אורגנית עם מסעדת farm-to-table בעמק ההדסון (~שעה) — שדות, אוכל טרי ואווירה כפרית. מהרשימה של יעיר ועינת.' },
          { id: 'ny-19-scribners', duration: 'יום שלם / לינה', icon: '🏔️', title: "Scribner's Catskill Lodge", en: 'Catskills getaway', tag: '★ יעיר ועינת · גטאוויי', note: 'לודג׳ נופי בקטסקילס (~2 שעות צפונה) — אם בא לכם מתיחה צפונה או אפילו לילה בהרים. מהרשימה של יעיר ועינת.' },
          { id: 'ny-19-prospect', duration: 'יום שלם / לינה', icon: '🌲', title: 'Prospect Berkshires', en: 'Berkshires getaway', tag: '★ יעיר ועינת · גטאוויי', note: 'לודג׳ בהרי הברקשייר (~2.5 שעות) — טבע, שקט ונופים. אופציית גטאוויי מהרשימה של יעיר ועינת.' },
        ],
      },
      {
        id: 'ny-20', date: '20 ביולי', dow: 'שני', icon: '🗽',
        title: 'ניו יורק — סיבוב שני', subtitle: 'עוד פנינים בעיר לפני שטסים דרומה',
        options: [
          { id: 'ny-20-statue', duration: 'חצי יום', icon: '🗽', title: 'פסל החירות + Ellis Island', en: 'Statue of Liberty', tag: 'כל המשפחה', note: 'מעבורת לאי החירות ולאליס איילנד — אייקון אמיתי, נוף מהמים לקו הרקיע. כדאי כרטיסים מראש לכתר.', link: 'https://www.nps.gov/stli/' },
          { id: 'ny-20-intrepid', duration: '~2–3 שעות', icon: '🛩️', title: 'Intrepid Museum', en: 'Sea, Air & Space', tag: 'מתבגרים', note: 'נושאת מטוסים אמיתית עם מטוסי קרב, צוללת ומעבורת חלל — חלום לעומר וגל.', link: 'https://intrepidmuseum.org/' },
          { id: 'ny-20-chelsea', duration: '~2 שעות', icon: '🍴', title: 'Chelsea Market + High Line', en: 'Food hall + park', tag: 'כל המשפחה', note: 'שוק אוכל מקורה ענק, ואז טיול על ה-High Line — פארק על מסילת רכבת מוגבהת. שילוב מנצח.', link: 'https://www.chelseamarket.com/' },
          { id: 'ny-20-littleisland', duration: '~1 שעה', icon: '🏝️', title: 'Little Island', en: 'Hudson River park', tag: '★ יעיר ועינת', note: 'פארק צף ומעוצב על נהר ההדסון, ממש ליד ה-High Line וצ׳לסי מרקט — קל לשלב באותו יום. מהרשימה של יעיר ועינת.' },
        ],
      },
      {
        id: 'ny-21', date: '21 ביולי', dow: 'שלישי', icon: '🎡',
        title: 'יום אחרון בניו יורק', subtitle: 'סיום קליל לפני הטיסה לאטלנטה מחר',
        options: [
          { id: 'ny-21-coney', duration: 'חצי יום', icon: '🎡', title: 'Coney Island + Luna Park', en: 'Brooklyn boardwalk', tag: 'כיף לכולם', note: 'חוף, טיילת, רכבת ההרים ההיסטורית Cyclone ונקניקיות Nathan\'s — סיום כיפי וקליל.', link: 'https://lunaparknyc.com/' },
          { id: 'ny-21-mills', duration: '~2–3 שעות', icon: '🛍️', title: 'קניות אחרונות — The Mills', en: 'Tax-free, last call', tag: 'שופינג', note: 'מילוי אחרון של המזוודות ללא מע"מ על ביגוד לפני הדרום.', link: 'https://www.simon.com/mall/the-mills-at-jersey-gardens' },
          { id: 'ny-21-family', duration: 'גמיש', icon: '🧳', title: 'זמן אחרון עם יעיר ועינת + אריזה', en: 'Pack & relax', tag: 'רגוע', note: 'בוקר נינוח עם המשפחה, אריזה, ויציאה רעננה לאטלנטה.' },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- PART 2: ATLANTA (22–29)
  {
    id: 'atl',
    part: 'חלק שני',
    name: 'אטלנטה ואלפארטה',
    nameEn: 'Atlanta & Alpharetta',
    dates: '22–29 ביולי',
    color: '#c14050',
    accent: '#f08070',
    hostLine: 'מתארחים אצל בועז וליבי באלפארטה — עד סוף הטיול · עם אלה, גל ואייל',
    travel: '✈️ טיסה מ-ניוארק (EWR) ל-אטלנטה (ATL) ב-22 ביולי · הבסיס באלפארטה, צפון אטלנטה',
    days: [
      {
        id: 'atl-20', date: '22 ביולי', dow: 'רביעי', icon: '✈️',
        title: 'טיסה לאטלנטה + מפגש', subtitle: 'נוחתים אצל בועז וליבי · ערב ראשון רגוע',
        options: [
          { id: 'atl-20-avalon', duration: '~2 שעות', icon: '🛍️', title: 'Avalon', en: 'Alpharetta', tag: 'קרוב לבית', note: 'מתחם פתוח של חנויות, מזרקות וכיכר מרכזית — 5–10 דק׳ מהבית. ערב ראשון נינוח להיות יחד.', link: 'https://experienceavalon.com/' },
          { id: 'atl-20-topgolf', duration: '~2 שעות', icon: '⛳', title: 'Topgolf Alpharetta', en: '3 floors, A/C', tag: 'כל הגילאים', note: '102 תאי משחק ממוזגים על 3 קומות — פעילות קבוצתית שעובדת מגיל 10 עד מבוגרים, בלי תלות בחום.', link: 'https://topgolf.com/us/alpharetta/' },
          { id: 'atl-20-citycenter', duration: '~2 שעות', icon: '🌳', title: 'Alpharetta City Center', en: 'Evening stroll', tag: 'רגוע', note: 'מרכז העיר ההליכתי של אלפארטה לצד Avalon — שיטוט ערב שקט ביום הראשון.', link: 'https://awesomealpharetta.com/' },
        ],
      },
      {
        id: 'atl-21', date: '23 ביולי', dow: 'חמישי', icon: '🚶',
        title: 'טיול הליכה', subtitle: 'נוף, טבע או שיטוט עירוני (מומלץ מוקדם בבוקר — חם!)',
        options: [
          { id: 'atl-21-vickery', duration: '~2 שעות', icon: '🏞️', title: 'Vickery Creek / Old Mill Park', en: 'Roswell', tag: 'הכי קרוב', note: 'גשר מקורה, חורבות טחנה מ-1830 ומפל — מסלול לולאה נעים (~6 ק"מ), 15 דק׳ מהבית. הכי טוב מוקדם בבוקר.', link: 'https://www.nps.gov/chat/' },
          { id: 'atl-21-beltline', duration: '~2–3 שעות', icon: '🚶', title: 'BeltLine + Ponce City Market', en: 'Eastside Trail', tag: 'עירוני', note: 'טיילת אורבנית שטוחה עם אמנות רחוב, שמסתיימת ב-Ponce City Market — וגג Skyline Park עם משחקים ומיני-גולף למתבגרים. (המלצת בועז)', link: 'https://beltline.org/parks-trails/eastside-trail/' },
          { id: 'atl-21-piedmont', duration: '~2–3 שעות', icon: '🌺', title: 'Piedmont Park + Botanical Garden', en: 'Midtown', tag: 'נוף', note: 'הליכה בפארק העירוני ואז Canopy Walk של הגן הבוטני — מסלול תלוי בין צמרות העצים. נינוח ויפהפה.', link: 'https://atlantabg.org/' },
          { id: 'atl-21-stonemtn', duration: 'יום שלם', icon: '⛰️', title: 'Stone Mountain Park', en: 'Walk-up / Skyride', tag: 'נוף + מופע', note: 'טיפוס על כיפת הגרניט (או רכבל) לתצפית, ובערב מופע מזל"טים ולייזרים. יום שלם של טבע ובידור.', link: 'https://stonemountainpark.com/' },
        ],
      },
      {
        id: 'atl-22', date: '24 ביולי', dow: 'שישי', icon: '🎢',
        title: 'פארק שיא · ריגושים', subtitle: 'יום אדרנלין למתבגרים',
        split: 'אפשר להתפצל — הגדולים על הרכבות, אייל ורותם על iFLY / LEGO או האקווריום',
        options: [
          { id: 'atl-22-sixflags', duration: 'יום שלם', icon: '🎢', title: 'Six Flags Over Georgia', en: 'Austell', tag: 'ריגושים', note: 'פארק הרכבות הגדול של האזור — רכבות שיא למתבגרים. הכרטיס כולל גם את פארק המים Hurricane Harbor אם בא לכם שניהם ביום אחד.', link: 'https://www.sixflags.com/overgeorgia' },
          { id: 'atl-22-andretti', duration: '~2–3 שעות', icon: '🏎️', title: 'Andretti Indoor Karting', en: 'Marietta', tag: 'מקורה', note: 'קארטינג אירופאי (עד 72 קמ"ש), מסלול חבלים, זיפליין מקורה וקיר טיפוס — הכל ממוזג. גיבוי מצוין לימים חמים.', link: 'https://andrettikarting.com/marietta' },
          { id: 'atl-22-ifly', duration: '~1 שעה', icon: '🪂', title: 'iFLY Indoor Skydiving', en: 'Atlanta', tag: 'גיל 3+', note: 'נפילה חופשית אמיתית במנהרת רוח — ריגוש ענק, מתאים מגיל 3, ממוזג. חצי יום מושלם לשבירת החום.', link: 'https://www.iflyworld.com/atlanta' },
        ],
      },
      {
        id: 'atl-23', date: '25 ביולי', dow: 'שבת', icon: '🛍️',
        title: 'שופינג + זמן ביחד', subtitle: 'מאלפארטה ועד באקהד ועד האאוטלט בצפון',
        split: 'אפשר להתפצל בין הקניונים — אלפארטה מול באקהד',
        options: [
          { id: 'atl-23-avalon', duration: '~2–3 שעות', icon: '🛍️', title: 'Avalon', en: 'Alpharetta', tag: 'הבחירה המקומית', note: '60+ מותגים (Apple, Lululemon), כיכר פתוחה וקולנוע — קרוב לבית והכי נוח לכל המשפחה.', link: 'https://experienceavalon.com/' },
          { id: 'atl-23-ngoutlets', duration: '~2–3 שעות', icon: '🏷️', title: 'North Georgia Premium Outlets', en: 'Dawsonville', tag: 'אאוטלט · המלצת בועז', note: 'אאוטלט מותגים ענק (~40 דק׳ צפונה) — נייקי, אדידס, פולו ועוד במחירי אאוטלט. בועז המליץ.', link: 'https://www.premiumoutlets.com/outlet/north-georgia' },
          { id: 'atl-23-lenox', duration: '~2 שעות', icon: '🏬', title: 'Lenox Square', en: 'Buckhead', tag: 'פרימיום', note: 'הקניון הגדול והנחשב של באקהד — מותגי על וברנדים אמריקאים, 35 דק׳ נסיעה.', link: 'https://www.simon.com/mall/lenox-square' },
          { id: 'atl-23-phipps', duration: '~2 שעות', icon: '🧱', title: 'Phipps Plaza + LEGO Discovery', en: 'Buckhead', tag: 'גם לקטנים', note: 'קניון פרימיום שמולו, ובתוכו LEGO Discovery Center — מושלם לאייל ולרותם בזמן שהגדולים קונים.', link: 'https://www.legodiscoverycenter.com/atlanta/' },
        ],
      },
      {
        id: 'atl-24', date: '26 ביולי', dow: 'ראשון', icon: '💦',
        title: 'פארק מים / אגם', subtitle: 'להתקרר ביום הכי חם',
        options: [
          { id: 'atl-24-lanier', duration: 'יום שלם', icon: '🏖️', title: 'Lake Lanier · Margaritaville', en: 'Lanier Islands', tag: 'קרוב לבית · המלצת בועז', note: 'אגם לניר 20–30 דק׳ מהבית — חוף, פארק מים ומגלשות (Margaritaville). הכי קרוב וקליל, ובועז המליץ.', link: 'https://www.margaritavilleresorts.com/margaritaville-at-lanier-islands' },
          { id: 'atl-24-whitewater', duration: 'יום שלם', icon: '💦', title: 'Six Flags White Water', en: 'Marietta', tag: 'פארק המים הגדול', note: 'פארק המים הגדול בדרום — 70 דונם, מגלשת Tsunami Surge ובריכת גלים.', link: 'https://www.sixflags.com/whitewater' },
          { id: 'atl-24-hurricane', duration: 'יום שלם', icon: '🌊', title: 'Hurricane Harbor', en: 'בתוך Six Flags', tag: 'משולב', note: 'אם בא לכם גם רכבות וגם מים באותו יום — פארק המים הזה כלול בכרטיס של Six Flags Over Georgia.', link: 'https://www.sixflags.com/overgeorgia/hurricane-harbor-atlanta' },
          { id: 'atl-24-aquarium', duration: '~2–3 שעות', icon: '🐠', title: 'Georgia Aquarium', en: 'אלטרנטיבה ממוזגת', tag: 'מקורה', note: 'אם החום מנצח — אחד האקווריומים הגדולים בעולם, ממוזג ורגוע, עם כרישי לווייתן ולווייתנים לבנים.', link: 'https://www.georgiaaquarium.org/' },
        ],
      },
      {
        id: 'atl-27', date: '27 ביולי', dow: 'שני', icon: '⛰️',
        title: 'טיול ללוקאאוט מאונטיין', subtitle: 'ההמלצה של בועז וליבי · ~1:40 נסיעה צפונה',
        split: 'אפשר להתפצל — חלק ב-Rock City, חלק ב-Ruby Falls (קשה להספיק את שניהם ביום אחד)',
        options: [
          { id: 'atl-27-rockcity', duration: 'חצי יום', icon: '🪨', title: 'Rock City Gardens', en: 'Lookout Mountain', tag: 'נוף + סלעים · המלצת בועז', note: 'גנים בין סלעי ענק, גשר חבלים תלוי (Swing-A-Long) ותצפית ל-7 מדינות. בועז וליבי היו והמליצו — יש גם מסלולים בין הסלעים הגדולים.', link: 'https://www.seerockcity.com/' },
          { id: 'atl-27-rubyfalls', duration: '~1.5 שעות', icon: '💧', title: 'Ruby Falls', en: 'Underground waterfall', tag: 'מערה', note: 'מפל תת-קרקעי בתוך מערה — סיור מודרך מרהיב אל מעמקי ההר. זאת המערה שאייל אהב!', link: 'https://www.rubyfalls.com/' },
        ],
      },
      {
        id: 'atl-28', date: '28 ביולי', dow: 'שלישי', icon: '🛶',
        title: 'הלן + אבובים בנהר', subtitle: 'עיירה אלפיינית ~שעה צפונה · המלצת בועז',
        options: [
          { id: 'atl-28-tubing', duration: 'חצי יום', icon: '🛶', title: 'Cool River Tubing', en: 'Chattahoochee, Helen', tag: 'כיף לכולם · המלצת בועז', note: 'אבובים על נהר הצ׳אטהוצ׳י — קליל, מרענן וכיף לכל המשפחה ביום חם. בדיוק מה שבועז תיאר.', link: 'https://www.coolrivertubing.com/' },
          { id: 'atl-28-helen', duration: '~2–3 שעות', icon: '🏘️', title: 'Helen', en: 'Bavarian alpine town', tag: 'שיטוט', note: 'עיירה בסגנון בוואריה — רחוב ראשי צבעוני, חנויות, גלידה וגרמני-קיטש. (ויש גם סיורי אוכל — בעיקר לבועז 😄)', link: 'https://explorehelen.com/' },
        ],
      },
      {
        id: 'atl-25', date: '29 ביולי', dow: 'רביעי', icon: '🐠',
        title: 'יום אחרון לפני הטיסה הביתה', subtitle: 'סיכום רגוע באטלנטה',
        options: [
          { id: 'atl-25-aquarium', duration: '~2–3 שעות', icon: '🐠', title: 'Georgia Aquarium', en: 'Downtown', tag: 'נינוח', note: 'אחד הגדולים בעולם — קריר, רגוע ומרהיב. סיום מושלם ואנרגיה נמוכה לפני יום טיסה.', link: 'https://www.georgiaaquarium.org/' },
          { id: 'atl-25-coke', duration: '~1–1.5 שעות', icon: '🥤', title: 'World of Coca-Cola', en: 'Pemberton Place', tag: 'כיף וקצר', note: 'ממש ליד האקווריום — חוויה קצרה וכיפית עם טעימות משקאות מכל העולם. כרטיס משולב.', link: 'https://www.worldofcoca-cola.com/' },
          { id: 'atl-25-avalon', duration: '~2 שעות', icon: '🛍️', title: 'Avalon', en: 'קניות אחרונות', tag: 'קרוב לבית', note: 'שופינג של הרגע האחרון קרוב לבית, לפני שאורזים וטסים הביתה.', link: 'https://experienceavalon.com/' },
          { id: 'atl-25-sweetwater', duration: '~2 שעות', icon: '🌿', title: 'Sweetwater Creek State Park', en: 'Lithia Springs', tag: 'טבע', note: 'עוד יציאה קלה לטבע — שבילי נחל ואגם אל חורבות טחנה מתקופת מלחמת האזרחים.', link: 'https://gastateparks.org/SweetwaterCreek' },
        ],
      },
    ],
  },
];

// ============ PLACES METADATA ============
// Per-option: r = Google rating (omit if unknown), lat/lng, q = Google Maps query.
const PLACES = {
  // NY / NJ
  'ny-14-hoboken':     { r: 4.8, lat: 40.7401, lng: -74.0259, q: 'Pier C Park Hoboken NJ' },
  'ny-14-liberty':     { r: 4.7, lat: 40.7058, lng: -74.0491, q: 'Liberty State Park' },
  'ny-14-montclair':   { r: 4.7, lat: 40.8129, lng: -74.2166, q: 'Absolute Zero Ice Cream Montclair NJ' },
  'ny-15-spyscape':    { r: 4.5, lat: 40.7652, lng: -73.9835, q: 'SPYSCAPE New York' },
  'ny-15-edge':        { r: 4.6, lat: 40.7536, lng: -74.0015, q: 'The Edge Hudson Yards' },
  'ny-15-icecream':    { r: 4.2, lat: 40.7236, lng: -73.9976, q: 'Museum of Ice Cream New York' },
  'ny-15-amnh':        { r: 4.6, lat: 40.7813, lng: -73.9740, q: 'American Museum of Natural History' },
  'ny-15-brooklyn':    { r: 4.5, lat: 40.7034, lng: -73.9921, q: 'Time Out Market New York DUMBO' },
  'ny-16-dreamworks':  { r: 4.3, lat: 40.8074, lng: -74.0688, q: 'DreamWorks Water Park American Dream' },
  'ny-16-mills':       { r: 4.5, lat: 40.6600, lng: -74.1715, q: 'The Mills at Jersey Gardens' },
  'ny-16-amdream':     {        lat: 40.8104, lng: -74.0712, q: 'American Dream Mall' },
  'ny-17-centralpark': { r: 4.8, lat: 40.7681, lng: -73.9819, q: 'Central Park New York' },
  'ny-17-topofrock':   { r: 4.7, lat: 40.7591, lng: -73.9794, q: 'Top of the Rock New York' },
  'ny-17-fifth':       { r: 4.7, lat: 40.7589, lng: -73.9851, q: 'Times Square New York' },
  'ny-18-smorg':       { r: 4.5, lat: 40.7211, lng: -73.9626, q: 'Smorgasburg Williamsburg' },
  'ny-18-artistsfleas':{ r: 4.3, lat: 40.7199, lng: -73.9613, q: 'Artists and Fleas Williamsburg' },
  'ny-18-bedford':     { r: 4.3, lat: 40.7236, lng: -73.9526, q: "Beacon's Closet Brooklyn" },
  'ny-18-flea':        { r: 4.1, lat: 40.7028, lng: -73.9878, q: 'Brooklyn Flea DUMBO' },
  'ny-19-grounds':     { r: 4.8, lat: 40.2368, lng: -74.7189, q: 'Grounds for Sculpture Hamilton NJ' },
  'ny-19-sandyhook':   {        lat: 40.4300, lng: -73.9900, q: 'Sandy Hook Beach NJ' },
  'ny-19-stormking':   { r: 4.7, lat: 41.4234, lng: -74.0623, q: 'Storm King Art Center' },
  'ny-19-asbury':      { r: 4.6, lat: 40.2209, lng: -73.9996, q: 'Asbury Park Boardwalk' },
  'ny-20-statue':      { r: 4.7, lat: 40.6892, lng: -74.0445, q: 'Statue of Liberty' },
  'ny-20-intrepid':    { r: 4.6, lat: 40.7646, lng: -73.9996, q: 'Intrepid Museum New York' },
  'ny-20-chelsea':     { r: 4.6, lat: 40.7421, lng: -74.0049, q: 'Chelsea Market New York' },
  'ny-21-coney':       { r: 4.4, lat: 40.5738, lng: -73.9803, q: 'Luna Park Coney Island Brooklyn' },
  'ny-21-mills':       { r: 4.5, lat: 40.6600, lng: -74.1715, q: 'The Mills at Jersey Gardens' },
  // NY — Yair & Einat's picks (rating from their list; no coords → no map pin)
  'ny-14-southmtn':    { r: 4.7, q: 'South Mountain Reservation Fairy Trail Millburn NJ' },
  'ny-15-summit':      { r: 4.7, q: 'SUMMIT One Vanderbilt New York' },
  'ny-15-colorfactory':{ r: 4.4, q: 'Color Factory New York' },
  'ny-15-sloomoo':     { r: 4.3, q: 'Sloomoo Institute New York' },
  'ny-18-domino':      { r: 4.8, q: 'Domino Park Brooklyn' },
  'ny-19-bloominghill':{ r: 4.8, q: 'Blooming Hill Farm Monroe NY' },
  'ny-19-scribners':   { r: 4.4, q: "Scribner's Catskill Lodge" },
  'ny-19-prospect':    { r: 4.8, q: 'Prospect Berkshires North Egremont' },
  'ny-20-littleisland':{ r: 4.7, q: 'Little Island New York' },
  // Atlanta
  'atl-20-avalon':     { r: 4.6, lat: 34.0708, lng: -84.2772, q: 'Avalon Alpharetta' },
  'atl-20-topgolf':    { r: 4.4, lat: 34.0448, lng: -84.3083, q: 'Topgolf Alpharetta' },
  'atl-20-citycenter': { r: 4.8, lat: 34.0756, lng: -84.2945, q: 'Downtown Alpharetta City Center' },
  'atl-21-vickery':    { r: 4.7, lat: 34.0128, lng: -84.3596, q: 'Vickery Creek Old Mill Park Roswell GA' },
  'atl-21-beltline':   { r: 4.8, lat: 33.7819, lng: -84.3685, q: 'Atlanta BeltLine Eastside Trail' },
  'atl-21-piedmont':   { r: 4.7, lat: 33.7900, lng: -84.3726, q: 'Atlanta Botanical Garden' },
  'atl-21-stonemtn':   { r: 4.6, lat: 33.8052, lng: -84.1451, q: 'Stone Mountain Park' },
  'atl-22-sixflags':   { r: 4.1, lat: 33.7684, lng: -84.5500, q: 'Six Flags Over Georgia' },
  'atl-22-andretti':   { r: 4.2, lat: 33.9524, lng: -84.5153, q: 'Andretti Indoor Karting Marietta' },
  'atl-22-ifly':       { r: 4.6, lat: 33.8847, lng: -84.4713, q: 'iFLY Indoor Skydiving Atlanta' },
  'atl-23-avalon':     { r: 4.6, lat: 34.0708, lng: -84.2772, q: 'Avalon Alpharetta' },
  'atl-23-ngoutlets':  { r: 4.4, lat: 34.3968, lng: -84.0433, q: 'North Georgia Premium Outlets Dawsonville' },
  'atl-23-lenox':      { r: 4.4, lat: 33.8459, lng: -84.3619, q: 'Lenox Square Atlanta' },
  'atl-23-phipps':     { r: 4.5, lat: 33.8525, lng: -84.3620, q: 'Phipps Plaza Atlanta' },
  'atl-24-lanier':     {        lat: 34.1793, lng: -84.0314, q: 'Margaritaville at Lanier Islands' },
  'atl-24-whitewater': { r: 3.9, lat: 33.9578, lng: -84.5210, q: 'Six Flags White Water Marietta' },
  'atl-24-hurricane':  {        lat: 33.7684, lng: -84.5500, q: 'Hurricane Harbor Six Flags Over Georgia' },
  'atl-24-aquarium':   { r: 4.7, lat: 33.7634, lng: -84.3951, q: 'Georgia Aquarium' },
  'atl-27-rockcity':   { r: 4.7, lat: 34.9730, lng: -85.3502, q: 'Rock City Gardens Lookout Mountain GA' },
  'atl-27-rubyfalls':  { r: 4.6, lat: 35.0191, lng: -85.3394, q: 'Ruby Falls Chattanooga' },
  'atl-28-tubing':     { r: 4.6, lat: 34.6995, lng: -83.7194, q: 'Cool River Tubing Helen GA' },
  'atl-28-helen':      {        lat: 34.7018, lng: -83.7269, q: 'Helen GA Main Street' },
  'atl-25-aquarium':   { r: 4.7, lat: 33.7634, lng: -84.3951, q: 'Georgia Aquarium' },
  'atl-25-coke':       { r: 4.4, lat: 33.7626, lng: -84.3924, q: 'World of Coca-Cola' },
  'atl-25-avalon':     { r: 4.6, lat: 34.0708, lng: -84.2772, q: 'Avalon Alpharetta' },
  'atl-25-sweetwater': { r: 4.8, lat: 33.7525, lng: -84.6287, q: 'Sweetwater Creek State Park GA' },
};

// ============ TOP-RATED RESTAURANTS per leg (Google ≥ 4.6★, group-friendly) ============
const RESTAURANTS = {
  ny: [
    { name: "Tony's Di Napoli", r: 4.6, cuisine: 'איטלקי משפחתי', note: 'מנות ענק להגשה משותפת ושולחנות גדולים שמכילים בקלות חבורה שלמה, ליד טיימס סקוור.', link: 'https://www.tonysnyc.com/times-square', q: "Tony's Di Napoli Times Square New York", lat: 40.7570, lng: -73.9858 },
    { name: 'Pylos', r: 4.6, cuisine: 'יווני', note: 'הכל מוגש משפחתי לשיתוף, אולם נינוח שמתאים לקבוצה רב-דורית.', link: 'https://pylosrestaurant.com/', q: 'Pylos Restaurant East 7th St New York', lat: 40.7256, lng: -73.9826 },
    { name: 'Da Andrea', r: 4.6, cuisine: 'טרטוריה איטלקית', note: 'פסטה ביתית וקלאסיקות אהובות, מקבלים הזמנות גדולות ואוהבים משפחות ומתבגרים.', link: 'https://daandreanyc.com/', q: 'Da Andrea W 13th St New York', lat: 40.7359, lng: -73.9943 },
    { name: 'Cafe Mogador', r: 4.6, cuisine: 'מרוקאי-ים תיכוני', note: "טאג'ין, קוסקוס וגריל לשיתוף, ווייב וויליאמסבורגי נינוח וידידותי לילדים.", link: 'https://www.cafemogador.com/', q: 'Cafe Mogador Williamsburg Brooklyn', lat: 40.7197, lng: -73.9583 },
    { name: 'Win Son', r: 4.6, cuisine: 'טייוואני-אמריקאי', note: 'מנות טייוואניות כיפיות לשיתוף עם חבילות לקבוצות 10+. כדאי להזמין מראש.', link: 'https://winsonbrooklyn.com/', q: 'Win Son Brooklyn', lat: 40.7075, lng: -73.9434 },
    { name: 'Rumba Cubana', r: 4.6, cuisine: 'קובני-לטיני', note: 'מקום קובני תוסס עם מגשים גדולים לשיתוף ואווירה חגיגית, נוח לקבוצה גדולה עם ילדים.', link: 'https://www.rumbacubana.com/', q: 'Rumba Cubana Jersey City', lat: 40.7270, lng: -74.0354 },
    { name: 'Levain Bakery', r: 4.7, cuisine: 'מאפייה · עוגיות', note: 'עוגיות ענק חמות — מוסד ניו-יורקי.', q: 'Levain Bakery New York', host: true },
    { name: 'KazuNori', r: 4.7, cuisine: 'סושי · הנד-רול', note: 'הנד-רולים טריים בבר — מהיר וטעים.', q: 'KazuNori Hand Roll Bar New York', host: true },
    { name: 'Somedays Bakery', r: 4.7, cuisine: 'מאפייה · Montclair', note: 'מאפיית בוטיק מקסימה במונטקלייר.', q: 'Somedays Bakery Montclair NJ', host: true },
    { name: 'Tops Diner', r: 4.6, cuisine: 'דיינר אמריקאי', note: 'דיינר ניו-ג׳רזי אגדי, ענק ומשפחתי.', q: 'Tops Diner East Newark NJ', host: true },
    { name: "Artie's", r: 4.6, cuisine: 'פיצה', note: 'פיצה מקומית אהובה.', q: "Artie's pizza New Jersey", host: true },
    { name: 'SALSWEE', r: 4.6, cuisine: 'קינוחים', note: 'חנות קינוחים מתוקה.', q: 'Salswee New Jersey', host: true },
    { name: 'Liv Breads', r: 4.6, cuisine: 'מאפייה · Millburn', note: 'מאפיית בוטיק עם מאפים ייחודיים.', q: 'Liv Breads Millburn NJ', host: true },
    { name: "Sadelle's", r: 4.3, cuisine: 'בראנץ׳', note: 'בראנץ׳ ובייגלים בסגנון ניו-יורקי קלאסי.', q: "Sadelle's New York", host: true },
    { name: 'Misi', r: 4.3, cuisine: 'איטלקי · וויליאמסבורג', note: 'פסטה ביתית בברוקלין.', q: 'Misi Williamsburg Brooklyn', host: true },
    { name: 'Black Seed Bagels', r: 4.2, cuisine: 'בייגלים', note: 'בייגלים בסגנון מונטריאול.', q: 'Black Seed Bagels Nolita New York', host: true },
    { name: 'Daily Provisions', r: 4.1, cuisine: 'קפה / מסעדה', note: 'קפה-מסעדה נחמד למנה מהירה.', q: 'Daily Provisions Manhattan West New York', host: true },
  ],
  atl: [
    { name: 'Smokejack BBQ', r: 4.6, cuisine: 'ברביקיו דרומי', note: 'ברביקיו וקומפורט-פוד במרכז אלפארטה, מגשים גדולים לשיתוף שמרצים ילדים, מתבגרים ומבוגרים.', link: 'https://www.smokejackbbq.com/', q: 'Smokejack BBQ Alpharetta', lat: 34.0760, lng: -84.2952 },
    { name: "Rena's Italian Fishery & Grill", r: 4.6, cuisine: 'איטלקי / דגים', note: 'איטלקי משפחתי עם פסטה ביתית וקומת אירועים, מכיל בקלות חבורה של 10 וידידותי לילדים.', link: 'https://renasifg.com/', q: "Rena's Italian Fishery Grill Alpharetta", lat: 34.0742, lng: -84.2951 },
    { name: 'True Food Kitchen', r: 4.6, cuisine: 'אמריקאי בריא', note: 'מקום מואר ונינוח בבאקהד עם תפריט רחב (פיצות, באולים, המבורגרים) ותפריט ילדים — כולם מוצאים משהו.', link: 'https://www.truefoodkitchen.com/locations/atlanta/', q: 'True Food Kitchen Lenox Atlanta', lat: 33.8470, lng: -84.3620 },
    { name: 'The Capital Grille', r: 4.7, cuisine: 'סטייקהאוס / דגים', note: 'סטייקהאוס מהוקצע בבאקהד עם תוספות נדיבות וחדר פרטי לעד 10 לארוחה חגיגית.', link: 'https://www.thecapitalgrille.com/locations/ga/atlanta/atlanta-buckhead-village/8016', q: 'The Capital Grille Buckhead Atlanta', lat: 33.8401, lng: -84.3805 },
    { name: '9 Mile Station', r: 4.8, cuisine: 'אמריקאי על הגג', note: 'מסעדת גג מעל Ponce City Market ליד הארקייד והמיני-גולף, מזמינה קבוצות 20+ ולהיט אצל מתבגרים.', link: 'https://9milestation.com/', q: '9 Mile Station Ponce City Market Atlanta', lat: 33.7730, lng: -84.3664 },
    { name: "Ray's in the City", r: 4.6, cuisine: 'דגים / סטייק', note: 'מוסד דגים-וסטייק במרכז, צעדים מהאקווריום, מכיל בנוחות קבוצות משפחתיות גדולות.', link: 'https://www.raysinthecity.com/', q: "Ray's in the City Atlanta", lat: 33.7607, lng: -84.3877 },
  ],
};

// ============ EXTENDED FAMILY (ALPERT) ============
const ALPERT_FAMILIES = [
  {
    id: 'alpert-nj',
    label: 'משפחת אלפרט · ניו ג׳רזי',
    location: 'מארחים · ניו יורק',
    note: 'מארחים אותנו בניו ג׳רזי בפתיחת הטיול — יעיר הוא בן-הדוד שלנו',
    color: '#2e6b8f',
    tape: 'var(--tape-blue)',
    tapeRotate: -4,
    members: [
      { name: 'יעיר', nameEn: 'Yaair', role: 'אבא', emoji: '👨', color: '#2e6b8f' },
      { name: 'עינת', nameEn: 'Einat', role: 'אמא', emoji: '👩', color: '#e89ba8' },
      { name: 'רום', nameEn: 'Rom', age: 6, emoji: '🎈', color: '#f4b940' },
      { name: 'נור', nameEn: 'Nur', age: 2, emoji: '🧸', color: '#ee6352' },
    ],
  },
  {
    id: 'alpert-ga',
    label: 'משפחת אלפרט · ג׳ורג׳יה',
    location: 'מארחים · אטלנטה',
    note: 'מארחים אותנו באלפארטה לכל החצי השני של הטיול. אותם גילאים כמו עומר, ענבר ורותם',
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

Object.assign(window, { FAMILY, VOTERS, LEGS, PLACES, RESTAURANTS, ALPERT_FAMILIES });
