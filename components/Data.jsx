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
  // NJ Alperts — host Part 1
  { id: 'yair',  name: 'יאיר',  nameEn: 'Yair',  color: '#2e6b8f', emoji: '👨', group: 'אלפרט · ניו ג׳רזי' },
  { id: 'einat', name: 'עינת', nameEn: 'Einat', color: '#e89ba8', emoji: '👩', group: 'אלפרט · ניו ג׳רזי' },
  { id: 'rom',   name: 'רום',   nameEn: 'Rom',   age: 6, color: '#f4b940', emoji: '🎈', group: 'אלפרט · ניו ג׳רזי' },
  { id: 'nur',   name: 'נור',   nameEn: 'Nur',   age: 2, color: '#ee6352', emoji: '🧸', group: 'אלפרט · ניו ג׳רזי' },
  // GA Alperts — host Part 2 + join Tulum
  { id: 'boaz',  name: 'בועז', nameEn: 'Boaz',  color: '#2e6b8f', emoji: '👨', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'libby', name: 'ליבי', nameEn: 'Libby', color: '#e89ba8', emoji: '👩', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'ella',  name: 'אלה',  nameEn: 'Ella',  age: 16, color: '#f4b940', emoji: '✨', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'gal',   name: 'גל',   nameEn: 'Gal',   age: 14, color: '#e05a3e', emoji: '⚡', group: 'אלפרט · ג׳ורג׳יה' },
  { id: 'eyal',  name: 'אייל', nameEn: 'Eyal',  age: 11, color: '#3f6b3a', emoji: '🚀', group: 'אלפרט · ג׳ורג׳יה' },
];

// ============ THE THREE LEGS ============
// Each leg → days → each day has a MENU of activities (not just alternatives).
// Each option shows a `duration` so you can stack several into one day.
// Option fields: id (unique, for voting), duration, icon, title, en, note, link, tag
const LEGS = [
  // ---------------------------------------------------------------- PART 1: NY / NJ
  {
    id: 'ny',
    part: 'חלק ראשון',
    name: 'ניו יורק וניו ג׳רזי',
    nameEn: 'New York & New Jersey',
    dates: '14–19 ביולי',
    color: '#2e4ea8',
    accent: '#8da8e8',
    hostLine: 'הבסיס: הבית של יאיר ועינת בניו ג׳רזי · עם רום ונור',
    travel: '✈️ נחיתה ב-EWR · מתארחים אצל משפחת אלפרט ניו ג׳רזי',
    days: [
      {
        id: 'ny-14', date: '14 ביולי', dow: 'שלישי', icon: '✈️',
        title: 'נחיתה ומפגש', subtitle: 'יום רגוע אחרי הטיסה · עם יאיר, עינת, רום ונור',
        options: [
          { id: 'ny-14-hoboken', duration: '~1–2 שעות', icon: '🌆', title: 'טיילת הובוקן + Pier C Park', en: 'Hoboken Waterfront', tag: 'פעוטה-פרנדלי', note: 'טיילת שטוחה מול קו הרקיע של מנהטן, פארק משחקי מים וחול לקטנים, וגלידה לאורך Washington St. פתיחה רכה ומושלמת.', link: 'https://www.hobokennj.gov/resources/pier-c-park' },
          { id: 'ny-14-liberty', duration: '~1–2 שעות', icon: '🗽', title: 'Liberty State Park', en: 'Jersey City', tag: 'כל המשפחה', note: 'מדשאות ענק עם פסל החירות וקו הרקיע ברקע, מתקני משחק וטיילת — בלי כרטיסים, סתם להיות יחד.', link: 'https://dep.nj.gov/parksandforests/state-park/liberty-state-park/' },
          { id: 'ny-14-montclair', duration: '~1–2 שעות', icon: '🍦', title: 'שיטוט במונטקלייר + גלידה', en: 'Montclair', tag: 'רגוע', note: 'עיירה ירוקה והליכתית עם חנויות, פארקים וגלידריית Absolute המפורסמת — נינוח ולא מאמץ.', link: 'https://www.absoluteicecream.com/' },
          { id: 'ny-14-home', duration: 'גמיש', icon: '🏡', title: 'סתם בבית עם המשפחה', en: 'Backyard & BBQ', tag: 'ג׳ט-לג', note: 'אם הטיסה גמרה אתכם — מנגל בחצר, הילדים מתחברים, והתאקלמות שקטה לקראת השבוע.' },
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
        ],
      },
      {
        id: 'ny-19', date: '19 ביולי', dow: 'ראשון', icon: '🌳',
        title: 'טיול עם יאיר ועינת', subtitle: 'מקום יפהפה ליום שלם · בוחרים יעד אחד',
        options: [
          { id: 'ny-19-grounds', duration: '~3–4 שעות', icon: '🗿', title: 'Grounds For Sculpture', en: 'Hamilton, NJ', tag: 'כל המשפחה', note: 'פארק פיסול וגנים על 42 דונם — שבילים נוחים לעגלה, פסלים ענקיים שהילדים מתים עליהם. הבחירה הכי כל-גילאית. (כרטיסים מראש!)', link: 'https://www.groundsforsculpture.org/' },
          { id: 'ny-19-sandyhook', duration: 'יום שלם', icon: '🏖️', title: 'Sandy Hook', en: 'Gateway NRA beach', tag: 'פעוטה-פרנדלי', note: 'חופי מפרץ ואוקיינוס עם נוף לקו הרקיע של ניו יורק, מצילים ומים רדודים ונוחים לקטנטנים.', link: 'https://www.nps.gov/gate/planyourvisit/sandy-hook.htm' },
          { id: 'ny-19-stormking', duration: '~3–4 שעות', icon: '🎨', title: 'Storm King Art Center', en: 'New Windsor, NY', tag: 'נוף עוצר נשימה', note: 'נוף פיסול ענק על 500 דונם — שדות מתגלגלים ויצירות מונומנטליות. המקום הכי מרהיב; הרבה הליכה, מומלצת עגלה/מנשא.', link: 'https://stormking.org/' },
          { id: 'ny-19-asbury', duration: 'חצי יום', icon: '🎡', title: 'Asbury Park Boardwalk', en: 'Jersey Shore', tag: 'כיף לכולם', note: 'טיילת שורצת חיים מול הים — חוף לקטנים וארקייד פינבול Silverball לגדולים. קליל ומהנה.', link: 'https://apboardwalk.com/' },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- PART 2: ATLANTA
  {
    id: 'atl',
    part: 'חלק שני',
    name: 'אטלנטה ואלפארטה',
    nameEn: 'Atlanta & Alpharetta',
    dates: '20–25 ביולי',
    color: '#c14050',
    accent: '#f08070',
    hostLine: 'מתארחים אצל בועז וליבי באלפארטה · עם אלה, גל ואייל',
    travel: '✈️ טיסה מ-ניוארק (EWR) ל-אטלנטה (ATL) · הבסיס באלפארטה, צפון אטלנטה',
    days: [
      {
        id: 'atl-20', date: '20 ביולי', dow: 'שני', icon: '✈️',
        title: 'טיסה לאטלנטה + מפגש', subtitle: 'נוחתים אצל בועז וליבי · ערב ראשון רגוע',
        options: [
          { id: 'atl-20-avalon', duration: '~2 שעות', icon: '🛍️', title: 'Avalon', en: 'Alpharetta', tag: 'קרוב לבית', note: 'מתחם פתוח של חנויות, מזרקות וכיכר מרכזית — 5–10 דק׳ מהבית. ערב ראשון נינוח להיות יחד.', link: 'https://experienceavalon.com/' },
          { id: 'atl-20-topgolf', duration: '~2 שעות', icon: '⛳', title: 'Topgolf Alpharetta', en: '3 floors, A/C', tag: 'כל הגילאים', note: '102 תאי משחק ממוזגים על 3 קומות — פעילות קבוצתית שעובדת מגיל 10 עד מבוגרים, בלי תלות בחום.', link: 'https://topgolf.com/us/alpharetta/' },
          { id: 'atl-20-citycenter', duration: '~2 שעות', icon: '🌳', title: 'Alpharetta City Center', en: 'Evening stroll', tag: 'רגוע', note: 'מרכז העיר ההליכתי של אלפארטה לצד Avalon — שיטוט ערב שקט ביום הראשון.', link: 'https://awesomealpharetta.com/' },
        ],
      },
      {
        id: 'atl-21', date: '21 ביולי', dow: 'שלישי', icon: '🚶',
        title: 'טיול הליכה', subtitle: 'נוף, טבע או שיטוט עירוני (מומלץ מוקדם בבוקר — חם!)',
        options: [
          { id: 'atl-21-vickery', duration: '~2 שעות', icon: '🏞️', title: 'Vickery Creek / Old Mill Park', en: 'Roswell', tag: 'הכי קרוב', note: 'גשר מקורה, חורבות טחנה מ-1830 ומפל — מסלול לולאה נעים (~6 ק"מ), 15 דק׳ מהבית. הכי טוב מוקדם בבוקר.', link: 'https://www.nps.gov/chat/' },
          { id: 'atl-21-beltline', duration: '~2–3 שעות', icon: '🚶', title: 'BeltLine + Ponce City Market', en: 'Eastside Trail', tag: 'עירוני', note: 'טיילת אורבנית שטוחה עם אמנות רחוב, שמסתיימת ב-Ponce City Market — וגג Skyline Park עם משחקים ומיני-גולף למתבגרים.', link: 'https://beltline.org/parks-trails/eastside-trail/' },
          { id: 'atl-21-piedmont', duration: '~2–3 שעות', icon: '🌺', title: 'Piedmont Park + Botanical Garden', en: 'Midtown', tag: 'נוף', note: 'הליכה בפארק העירוני ואז Canopy Walk של הגן הבוטני — מסלול תלוי בין צמרות העצים. נינוח ויפהפה.', link: 'https://atlantabg.org/' },
          { id: 'atl-21-stonemtn', duration: 'יום שלם', icon: '⛰️', title: 'Stone Mountain Park', en: 'Walk-up / Skyride', tag: 'נוף + מופע', note: 'טיפוס על כיפת הגרניט (או רכבל) לתצפית, ובערב מופע מזל"טים ולייזרים. יום שלם של טבע ובידור.', link: 'https://stonemountainpark.com/' },
        ],
      },
      {
        id: 'atl-22', date: '22 ביולי', dow: 'רביעי', icon: '🎢',
        title: 'פארק שיא · ריגושים', subtitle: 'יום אדרנלין למתבגרים',
        split: 'אפשר להתפצל — הגדולים על הרכבות, אייל ורותם על iFLY / LEGO או האקווריום',
        options: [
          { id: 'atl-22-sixflags', duration: 'יום שלם', icon: '🎢', title: 'Six Flags Over Georgia', en: 'Austell', tag: 'ריגושים', note: 'פארק הרכבות הגדול של האזור — רכבות שיא למתבגרים. הכרטיס כולל גם את פארק המים Hurricane Harbor אם בא לכם שניהם ביום אחד.', link: 'https://www.sixflags.com/overgeorgia' },
          { id: 'atl-22-andretti', duration: '~2–3 שעות', icon: '🏎️', title: 'Andretti Indoor Karting', en: 'Marietta', tag: 'מקורה', note: 'קארטינג אירופאי (עד 72 קמ"ש), מסלול חבלים, זיפליין מקורה וקיר טיפוס — הכל ממוזג. גיבוי מצוין לימים חמים.', link: 'https://andrettikarting.com/marietta' },
          { id: 'atl-22-ifly', duration: '~1 שעה', icon: '🪂', title: 'iFLY Indoor Skydiving', en: 'Atlanta', tag: 'גיל 3+', note: 'נפילה חופשית אמיתית במנהרת רוח — ריגוש ענק, מתאים מגיל 3, ממוזג. חצי יום מושלם לשבירת החום.', link: 'https://www.iflyworld.com/atlanta' },
        ],
      },
      {
        id: 'atl-23', date: '23 ביולי', dow: 'חמישי', icon: '🛍️',
        title: 'שופינג + זמן ביחד', subtitle: 'מאלפארטה ועד באקהד',
        split: 'אפשר להתפצל בין הקניונים — אלפארטה מול באקהד',
        options: [
          { id: 'atl-23-avalon', duration: '~2–3 שעות', icon: '🛍️', title: 'Avalon', en: 'Alpharetta', tag: 'הבחירה המקומית', note: '60+ מותגים (Apple, Lululemon), כיכר פתוחה וקולנוע — קרוב לבית והכי נוח לכל המשפחה.', link: 'https://experienceavalon.com/' },
          { id: 'atl-23-lenox', duration: '~2 שעות', icon: '🏬', title: 'Lenox Square', en: 'Buckhead', tag: 'פרימיום', note: 'הקניון הגדול והנחשב של באקהד — מותגי על וברנדים אמריקאים, 35 דק׳ נסיעה.', link: 'https://www.simon.com/mall/lenox-square' },
          { id: 'atl-23-phipps', duration: '~2 שעות', icon: '🧱', title: 'Phipps Plaza + LEGO Discovery', en: 'Buckhead', tag: 'גם לקטנים', note: 'קניון פרימיום שמולו, ובתוכו LEGO Discovery Center — מושלם לאייל ולרותם בזמן שהגדולים קונים.', link: 'https://www.legodiscoverycenter.com/atlanta/' },
          { id: 'atl-23-ponce', duration: '~2–3 שעות', icon: '🏛️', title: 'Ponce City Market', en: 'Old Fourth Ward', tag: 'טרנדי', note: 'שוק אוכל וקניות בבניין היסטורי משופץ, עם גג משחקים. שילוב מנצח של שופינג, אוכל וכיף.', link: 'https://www.poncecitymarket.com/' },
        ],
      },
      {
        id: 'atl-24', date: '24 ביולי', dow: 'שישי', icon: '💦',
        title: 'פארק מים', subtitle: 'להתקרר ביום הכי חם',
        options: [
          { id: 'atl-24-whitewater', duration: 'יום שלם', icon: '💦', title: 'Six Flags White Water', en: 'Marietta', tag: 'הכי טוב', note: 'פארק המים הגדול בדרום — 70 דונם, מגלשת Tsunami Surge ובריכת גלים. הבחירה העצמאית הטובה ביותר.', link: 'https://www.sixflags.com/whitewater' },
          { id: 'atl-24-hurricane', duration: 'יום שלם', icon: '🌊', title: 'Hurricane Harbor', en: 'בתוך Six Flags', tag: 'משולב', note: 'אם בא לכם גם רכבות וגם מים באותו יום — פארק המים הזה כלול בכרטיס של Six Flags Over Georgia.', link: 'https://www.sixflags.com/overgeorgia/hurricane-harbor-atlanta' },
          { id: 'atl-24-aquarium', duration: '~2–3 שעות', icon: '🐠', title: 'Georgia Aquarium', en: 'אלטרנטיבה ממוזגת', tag: 'מקורה', note: 'אם החום מנצח — אחד האקווריומים הגדולים בעולם, ממוזג ורגוע, עם כרישי לווייתן ולווייתנים לבנים.', link: 'https://www.georgiaaquarium.org/' },
        ],
      },
      {
        id: 'atl-25', date: '25 ביולי', dow: 'שבת', icon: '🐠',
        title: 'שופינג + סיכום לפני מקסיקו', subtitle: 'יום אחרון רגוע באטלנטה',
        options: [
          { id: 'atl-25-aquarium', duration: '~2–3 שעות', icon: '🐠', title: 'Georgia Aquarium', en: 'Downtown', tag: 'נינוח', note: 'אחד הגדולים בעולם — קריר, רגוע ומרהיב. סיום מושלם ואנרגיה נמוכה לפני יום טיסה.', link: 'https://www.georgiaaquarium.org/' },
          { id: 'atl-25-coke', duration: '~1–1.5 שעות', icon: '🥤', title: 'World of Coca-Cola', en: 'Pemberton Place', tag: 'כיף וקצר', note: 'ממש ליד האקווריום — חוויה קצרה וכיפית עם טעימות משקאות מכל העולם. כרטיס משולב.', link: 'https://www.worldofcoca-cola.com/' },
          { id: 'atl-25-avalon', duration: '~2 שעות', icon: '🛍️', title: 'Avalon', en: 'קניות אחרונות', tag: 'קרוב לבית', note: 'שופינג של הרגע האחרון קרוב לבית, לפני שאורזים וטסים לטולום.', link: 'https://experienceavalon.com/' },
          { id: 'atl-25-sweetwater', duration: '~2 שעות', icon: '🌿', title: 'Sweetwater Creek State Park', en: 'Lithia Springs', tag: 'טבע', note: 'עוד יציאה קלה לטבע — שבילי נחל ואגם אל חורבות טחנה מתקופת מלחמת האזרחים.', link: 'https://gastateparks.org/SweetwaterCreek' },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- PART 3: TULUM
  {
    id: 'tul',
    part: 'חלק שלישי',
    name: 'טולום, מקסיקו',
    nameEn: 'Tulum, Mexico',
    dates: '26–29 ביולי',
    color: '#0e7f94',
    accent: '#7bc5cf',
    hostLine: 'כל 3 המשפחות יחד · וילה אחת גדולה · הפינאלה של הטיול 🎉',
    travel: '✈️ מאטלנטה: טיסה ישירה ל-Tulum (TQO ~2:45) או דרך Cancún (CUN) + נסיעה 1.5–2 שעות',
    days: [
      {
        id: 'tul-26', date: '26 ביולי', dow: 'ראשון', icon: '🏖️',
        title: 'נחיתה והשתקעות', subtitle: 'נכנסים לוילה, נושמים אוויר קריבי',
        options: [
          { id: 'tul-26-villa', duration: 'גמיש', icon: '🏊', title: 'יום בריכה בוילה', en: 'Pool & chill', tag: 'אפס לוגיסטיקה', note: 'פורקים, שוחים ומתאקלמים — ערב ראשון רגוע אחרי הטיסה, בלי שום תכנון.' },
          { id: 'tul-26-calavera', duration: '~1–2 שעות', icon: '🦴', title: 'Cenote Calavera', en: '"Temple of Doom"', tag: 'מתבגרים + רדוד', note: 'הסנוטה הקרובה ביותר לעיר — קפיצות לתוך המים לגדולים, ופינה רדודה ובטוחה לקטנטנים. כניסה במקום.' },
          { id: 'tul-26-pueblo', duration: '~2 שעות', icon: '🛍️', title: 'Tulum Pueblo', en: 'Town center', tag: 'פעוטה-פרנדלי', note: 'שיטוט קליל בעיירה — חנויות, גלידה וארוחת ערב נינוחה. שטוח ונוח לעגלה.', link: 'https://www.tulum.com/' },
        ],
      },
      {
        id: 'tul-27', date: '27 ביולי', dow: 'שני', icon: '🐠',
        title: 'פארק אקולוגי גדול', subtitle: 'יום עוגן אחד לכל החבורה',
        split: 'אפשר להתפצל — תת-קבוצת מתבגרים ל-Xplor/Xavage, כל השאר ל-Xel-Há',
        options: [
          { id: 'tul-27-xelha', duration: 'יום שלם', icon: '🐠', title: 'Xel-Há', en: 'All-inclusive snorkel', tag: '★ כל המשפחה', note: 'פארק מים טבעי הכל-כלול — מפרץ שנורקלינג רגוע, נהר עצל בצמיגים, סנוטות עדינות ואזור ילדים. בטוח לפעוטה וכיף למתבגרים, הכל במקום אחד.', link: 'https://www.xelha.com/en/' },
          { id: 'tul-27-xcaret', duration: 'יום שלם', icon: '🪶', title: 'Xcaret', en: 'Eco-cultural park', tag: 'הכי מגוון', note: 'נהרות תת-קרקעיים, חיות בר, ביתן פרפרים ומופע ערב מרהיב. אם רוצים יום שלם אחד שיש בו הכל — זה הוא.', link: 'https://www.xcaret.com/en/' },
          { id: 'tul-27-xplor', duration: 'חצי יום–יום', icon: '⚡', title: 'Xplor', en: 'Zip-lines & rivers', tag: 'מתבגרים בלבד', note: 'אומגות הגבוהות בריביירה מאיה, רכבי שטח אמפיביים ונהרות תת-קרקעיים. הגבלת גיל/גובה — לגדולים ולמבוגרים, לא לפעוטה.', link: 'https://www.xcaret.com/en/parks-and-tours/about-xplor/' },
          { id: 'tul-27-xavage', duration: 'חצי יום', icon: '🌊', title: 'Xavage', en: 'Adventure park', tag: 'אקסטרים', note: 'שייט מים אדירים, מאנסטר-טראק, סירת ג׳ט ומסלול חבלים. הכי אדרנלין — לתת-קבוצת המתבגרים.', link: 'https://www.grupoxcaret.com/en/xavage/' },
        ],
      },
      {
        id: 'tul-28', date: '28 ביולי', dow: 'שלישי', icon: '🏛️',
        title: 'היסטוריה + טבע', subtitle: 'מאיה, חופים וסנוטות — אפשר לשלב כמה',
        options: [
          { id: 'tul-28-ruins', duration: '~2 שעות', icon: '🏛️', title: 'חורבות המאיה של טולום', en: 'Tulum Ruins', tag: 'כל המשפחה', note: 'חורבות מאיה על צוק מעל הים הקריבי — הליכה קצרה ושטוחה, נוף אייקוני וחוף למטה. הכי טוב להגיע מוקדם (פתיחה 8:00) עם הפעוטה.', link: 'https://www.inah.gob.mx/zonas/41-zona-arqueologica-de-tulum' },
          { id: 'tul-28-akumal', duration: '~2–3 שעות', icon: '🐢', title: 'Akumal Bay', en: 'Swim with turtles', tag: 'צבי ים', note: 'שנורקלינג עם צבי ים ירוקים במים רדודים (סיור מודרך נדרש), בעוד הפעוטה משחקת בחוף. מפרץ רגוע.' },
          { id: 'tul-28-grancenote', duration: '~1.5–2 שעות', icon: '🐢', title: 'Gran Cenote', en: 'Family-friendly cenote', tag: 'פעוטה-פרנדלי', note: 'מים טורקיז, נטיפים, צבים אמיתיים ושבילי עץ רדודים — מהסנוטות הכי ידידותיות למשפחה. כניסה במקום.', link: 'https://www.cenote.org/en/gran-cenote-in-tulum/' },
          { id: 'tul-28-cristal', duration: '~1.5–2 שעות', icon: '🏞️', title: 'Cenote Cristal & Escondido', en: 'Open-air cenotes', tag: 'שקט', note: 'שתי סנוטות פתוחות זו מול זו — רדודות, פחות מפותחות ופחות עמוסות. קל ונעים עם ילדים קטנים.' },
        ],
      },
      {
        id: 'tul-29', date: '29 ביולי', dow: 'רביעי', icon: '⛰️',
        title: 'יום אחרון · גמיש לפי הטיסה', subtitle: 'בוחרים לפי שעת הטיסה הביתה',
        split: 'אפשר להתפצל — מטפסים על Cobá או נחים במועדון חוף, לפי הגיל והכוח',
        options: [
          { id: 'tul-29-coba', duration: '~3–4 שעות', icon: '⛰️', title: 'חורבות Cobá', en: 'Climb the pyramid', tag: 'מתבגרים', note: 'פירמידת Nohoch Mul נפתחה שוב לטיפוס (דצמבר 2025!) — הפירמידה היחידה ביוקטן שמותר לטפס עליה. שוכרים אופניים לשבילי הג׳ונגל (גם הפעוטה נהנית ברכיבה).', link: 'https://yucatanmagazine.com/coba-nohoch-mul/' },
          { id: 'tul-29-siankaan', duration: 'יום שלם', icon: '🐊', title: 'Sian Ka\'an · Muyil', en: 'Forest & Float', tag: 'טבע UNESCO', note: 'שמורת ביוספרה של אונסק"ו — חורבות Muyil ואז ציפה בתעלת מנגרובים טבעית כמו נהר עצל. יפהפה, לכל גיל.', link: 'https://siankaantours.org/' },
          { id: 'tul-29-beachclub', duration: 'חצי יום', icon: '🏖️', title: 'מועדון חוף', en: 'La Zebra / Ikal', tag: 'נינוח', note: 'חוף רחב, מתקני ילדים ותפריט ידידותי — סיום נינוח עם מיטות חוף נוחות לשנ"צ של הפעוטה.', link: 'https://lazebratulum.com/' },
          { id: 'tul-29-zacilha', duration: '~2 שעות', icon: '💎', title: 'Cenote Zacil-Há', en: 'Pool + zip-line', tag: 'כיף מתוחם', note: 'סנוטה בסגנון נופש — בריכה פתוחה, אומגה לתוך המים ומסעדה במקום. רגוע ומתוחם, שילוב אחרון של פעוטה ומתבגרים.' },
        ],
      },
    ],
  },
];

// ============ TULUM HOUSE CANDIDATES ============
// Couldn't auto-read Airbnb (403). Presented as equal candidates + a verify checklist.
const TULUM_HOUSES = [
  { id: 'house-a', label: 'מועמדת א׳', en: 'Airbnb #1', link: 'https://www.airbnb.com/rooms/1571766447679803289' },
  { id: 'house-b', label: 'מועמדת ב׳', en: 'Airbnb #2', link: 'https://www.airbnb.com/rooms/1566281185356782495' },
  { id: 'house-c', label: 'מועמדת ג׳', en: 'Airbnb #3', link: 'https://share.google/Wtxab5ZLikomMa7P5' },
  { id: 'house-d', label: 'מועמדת ד׳', en: 'Airbnb #4', link: 'https://share.google/ziHMaq0kgcs30iAxe' },
];

const TULUM_HOUSE_CHECKLIST = [
  { icon: '🛏️', text: 'ישנה 14+ אנשים · 5+ חדרי שינה' },
  { icon: '🏊', text: 'בריכה פרטית' },
  { icon: '🌊', text: 'גישה לים או טקסי קצר למועדון חוף' },
  { icon: '🚼', text: 'בטוח ונוח לעגלה (פעוטה)' },
];

// ============ EXTENDED FAMILY (ALPERT) ============
const ALPERT_FAMILIES = [
  {
    id: 'alpert-nj',
    label: 'משפחת אלפרט · ניו ג׳רזי',
    location: 'מארחים · חלק 1',
    note: 'מארחים אותנו בניו ג׳רזי בפתיחת הטיול — יאיר הוא בן-הדוד שלנו',
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
    location: 'מארחים · חלק 2',
    note: 'מארחים אותנו באלפארטה — ומצטרפים לכולם בטולום. אותם גילאים כמו עומר, ענבר ורותם',
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

// ============ PLACES METADATA ============
// Per-option: r = Google rating (≈, omit if unknown), lat/lng, q = Google Maps query.
// Used for the ⭐ badge, the "open in Maps" link, and the leg map pins.
// (Entries omitted for non-places: at-home BBQ, Friday dinner, villa pool.)
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
  'atl-23-lenox':      { r: 4.4, lat: 33.8459, lng: -84.3619, q: 'Lenox Square Atlanta' },
  'atl-23-phipps':     { r: 4.5, lat: 33.8525, lng: -84.3620, q: 'Phipps Plaza Atlanta' },
  'atl-23-ponce':      { r: 4.6, lat: 33.7728, lng: -84.3656, q: 'Ponce City Market Atlanta' },
  'atl-24-whitewater': { r: 3.9, lat: 33.9578, lng: -84.5210, q: 'Six Flags White Water Marietta' },
  'atl-24-hurricane':  {        lat: 33.7684, lng: -84.5500, q: 'Hurricane Harbor Six Flags Over Georgia' },
  'atl-24-aquarium':   { r: 4.7, lat: 33.7634, lng: -84.3951, q: 'Georgia Aquarium' },
  'atl-25-aquarium':   { r: 4.7, lat: 33.7634, lng: -84.3951, q: 'Georgia Aquarium' },
  'atl-25-coke':       { r: 4.4, lat: 33.7626, lng: -84.3924, q: 'World of Coca-Cola' },
  'atl-25-avalon':     { r: 4.6, lat: 34.0708, lng: -84.2772, q: 'Avalon Alpharetta' },
  'atl-25-sweetwater': { r: 4.8, lat: 33.7525, lng: -84.6287, q: 'Sweetwater Creek State Park GA' },
  // Tulum
  'tul-26-calavera':   { r: 4.1, lat: 20.2292, lng: -87.4573, q: 'Cenote Calavera Tulum' },
  'tul-26-pueblo':     {        lat: 20.2126, lng: -87.4654, q: 'Tulum Pueblo Centro' },
  'tul-27-xelha':      { r: 4.8, lat: 20.3170, lng: -87.3541, q: 'Xel-Ha Park' },
  'tul-27-xcaret':     { r: 4.8, lat: 20.5820, lng: -87.1217, q: 'Xcaret Park' },
  'tul-27-xplor':      { r: 4.8, lat: 20.5938, lng: -87.1225, q: 'Xplor Park' },
  'tul-27-xavage':     { r: 4.7, lat: 20.9947, lng: -86.8627, q: 'Xavage Cancun' },
  'tul-28-ruins':      { r: 4.7, lat: 20.2150, lng: -87.4294, q: 'Tulum Ruins Archaeological Zone' },
  'tul-28-akumal':     { r: 4.3, lat: 20.3951, lng: -87.3137, q: 'Akumal Bay' },
  'tul-28-grancenote': { r: 4.3, lat: 20.2466, lng: -87.4641, q: 'Gran Cenote Tulum' },
  'tul-28-cristal':    { r: 4.4, lat: 20.2003, lng: -87.5006, q: 'Cenote Cristal Tulum' },
  'tul-29-coba':       { r: 4.7, lat: 20.4898, lng: -87.7294, q: 'Coba Ruins' },
  'tul-29-siankaan':   { r: 4.6, lat: 20.0789, lng: -87.6133, q: "Muyil Sian Ka'an" },
  'tul-29-beachclub':  { r: 4.6, lat: 20.1458, lng: -87.4600, q: 'La Zebra Tulum' },
  'tul-29-zacilha':    { r: 4.5, lat: 20.2744, lng: -87.4884, q: 'Cenote Zacil-Ha Tulum' },
};

Object.assign(window, { FAMILY, VOTERS, LEGS, PLACES, TULUM_HOUSES, TULUM_HOUSE_CHECKLIST, ALPERT_FAMILIES });
