const songslist = [
  {
    name: "ไม่ดีพอ",
    artist: "Ari",
    mood: "เศร้า", // "sad"
    type: "Pop",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/POP/ไม่ดีพอ.mp3",
  },
  {
    name: "เมืองที่ไม่หลับ",
    artist: "Ari",
    mood: "เศร้า", // "sad"
    type: "Pop",
    replay: false,
    favorites: false,
    url: "./SONG/POP/เมืองที่ไม่หลับ.mp3",
  },
  {
    name: "เธอได้ยินไหม",
    artist: "Refilx",
    mood: "เศร้า", // "sad"
    type: "Pop",
    replay: false,
    favorites: false,
    url: "./SONG/POP/เธอได้ยินไหม.mp3",
  },
  {
    name: "ความทรงจำใสๆ",
    artist: "Refilx",
    mood: "ผ่อนคลาย", // "sad"
    type: "Pop",
    replay: false,
    favorites: false,
    url: "./SONG/POP/ความทรงจำใสใส.mp3",
  },
  {
    name: "Shining Through the Storm",
    artist: "UnderMine",
    mood: "เศร้า", // "sad"
    type: "Pop",
    replay: false,
    favorites: false,
    url: "./SONG/POP/Shining Through the Storm.mp3",
  },
  {
    name: "Shattered Echoes",
    artist: "Xenon",
    mood: "เศร้า", // "sad"
    type: "Pop",
    replay: false,
    favorites: false,
    url: "./SONG/POP/Shattered Echoes.mp3",
  },
  {
    name: "Endless Thoughts",
    artist: "Foxy",
    mood: "ผ่อนคลาย",
    type: "Pop",
    replay: false,
    favorites: false,
    url: "./SONG/POP/Endless Thoughts.mp3",
  },
  {
    name: "Endless Summer Nights",
    artist: "Foxy",
    mood: "เศร้า",
    type: "Pop",
    replay: false,
    favorites: false,
    url: "./SONG/POP/Endless Summer Nights.mp3",
  },
  {
    name: "Swapping Socks",
    artist: "Andr x mindfreakkk",
    mood: "ผ่อนตลาย", // "sad"
    type: "Lo-fi",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/lofi/Andr x  mindfreakkk - Swapping SocksOfficial Music Video.mp3",
  },
  {
    name: "Romantic Homicideบ",
    artist: "d4vd",
    mood: "เศร้า", // "sad"
    type: "Lo-fi",
    replay: false,
    favorites: false,
    url: "./SONG/lofi/d4vd - Romantic Homicide.mp3",
  },
  {
    name: "Can We Kiss Forever",
    artist: "Kina",
    mood: "ผ่อนคลาย", // "sad"
    type: "Lo-fi",
    replay: false,
    favorites: false,
    url: "./SONG/lofi/Kina - Can We Kiss Forever_ (Lyrics) ft. Adriana Proenza.mp3",
  },
  {
    name: "Get You The Moon",
    artist: "Kine",
    mood: "ง่วง", // "sad"
    type: "Lo-fi",
    replay: false,
    favorites: false,
    url: "./SONG/lofi/Kina - Get You The Moon (Official Video) ft. Snøw.mp3",
  },
  {
    name: "Let Me Down Slowly",
    artist: "Alec Benjamin",
    mood: "่ผ่อนคลาย", // "sad"
    type: "Lo-fi",
    replay: false,
    favorites: false,
    url: "./SONG/lofi/Let Me Down Slowly - [ Lo-Fi Remix ] Alec Benjamin  Deejay Sayeem.mp3",
  },
  {
    name: "falling for you",
    artist: "peachy",
    mood: "ผ่อนคลาย", // "sad"
    type: "Lo-fi",
    replay: false,
    favorites: false,
    url: "./SONG/lofi/peachy!  falling for you (ft. mxmtoon) (lyrics).mp3",
  },
  {
    name: "death beds",
    artist: "Powfu",
    mood: "ผ่อนคลาย",
    type: "Lo-fi",
    replay: false,
    favorites: false,
    url: "./SONG/lofi/Powfu - death bed (coffee for your head) (Official Video) ft. beabadoobee.mp3",
  },
  {
    name: "คงไม่ทน",
    artist: "Songkarn x 4EVE",
    mood: "ผ่อนคลาย",
    type: "Lo-fi",
    replay: false,
    favorites: false,
    url: "./SONG/lofi/คงไมทน - Songkarn x 4EVE  SONGKARN THE TIME TRAVELER 1st Episode.mp3",
  },
  {
    name: "วันเลิฟ",
    artist: "Pao Remix",
    mood: "ปาร์ตี้", // "sad"
    type: "EDM",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/EDM/#มาแรงในTikTok ( วนเลฟ - ONE LOVE ) V.แดนซสเตปรำ Pao Remix.mp3",
  },
  {
    name: "หัวไล่ตูด",
    artist: "Nameremix",
    mood: "ปาร์ตี้", // "sad"
    type: "EDM",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/EDM/#เพลงแดนซ ( หวไหลตด ) กำลงมาแรงในTikTok V.แดนซตดๆ Nameremix.mp3",
  },
  {
    name: "Turn Up The Speakers",
    artist: "Afrojack & Martin Garrix",
    mood: "ปาร์ตี้", // "sad"
    type: "EDM",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/EDM/Afrojack & Martin Garrix - Turn Up The Speakers (Official Music Video).mp3",
  },
  {
    name: "Levels",
    artist: "Avicii",
    mood: "ปาร์ตี้", // "sad"
    type: "EDM",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/EDM/Avicii - Levels.mp3",
  },
  {
    name: "Tremor",
    artist: "Dimitri Vegas, Martin Garrix, Like Mike",
    mood: "ปาร์ตี้", // "sad"
    type: "EDM",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/EDM/Dimitri Vegas, Martin Garrix, Like Mike - Tremor (Official Music Video).mp3",
  },
  {
    name: "Scared To Be Lonely",
    artist: "Martin Garrix & Dua Lipa",
    mood: "ปาร์ตี้", // "sad"
    type: "EDM",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/EDM/Martin Garrix & Dua Lipa - Scared To Be Lonely (Official Video).mp3",
  },
  {
    name: "Lose Control",
    artist: "MEDUZA, Becky Hill, Goodboys",
    mood: "ปาร์ตี้", // "sad"
    type: "EDM",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/EDM/MEDUZA, Becky Hill, Goodboys - Lose Control (Official Video).mp3",
  },
  {
    name: "rapped in the Machine",
    artist: "Sinllex",
    mood: "ปาร์ตี้", // "sad"
    type: "EDM",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/EDM/Trapped in the Machine.mp3",
  },
  {
    name: "คิดฮอด",
    artist: "Bodyslam",
    mood: "สนุกสนาน", // "sad"
    type: "Rock",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/Rock/Bodyslam - คดฮอด feat.ศรพร อำไพพงษ.mp3",
  },
  {
    name: "น้ำลาย",
    artist: "Silly Fools",
    mood: "ระบาย", // "sad"
    type: "Rock",
    replay: false,
    favorites: false,
    url: "./SONG/Rock/SiLLy FooLs - นำลาย  (พ.ศ.2547).mp3",
  },
  {
    name: "ขี้หึง",
    artist: "Silly Fools",
    mood: "เศร้า", // "sad"
    type: "Rock",
    replay: false,
    favorites: false,
    url: "./SONG/Rock/ขหง.mp3",
  },
  {
    name: "พรหมลิขิต",
    artist: "Big Ass",
    mood: "เศร้า", // "sad"
    type: "Rock",
    replay: false,
    favorites: false,
    url: "./SONG/Rock/พรหมลขต - Big AssOFFICIAL MV.mp3",
  },
  {
    name: "ยาพิษ",
    artist: "Bodyslam",
    mood: "เศร้า", // "sad"
    type: "Rock",
    replay: false,
    favorites: false,
    url: "./SONG/Rock/ยาพษ - bodyslamOFFICIAL MV.mp3",
  },
  {
    name: "สองรัก",
    artist: "Slill",
    mood: "เศร้า", // "sad"
    type: "Rock",
    replay: false,
    favorites: false,
    url: "./SONG/Rock/สองรก.mp3",
  },
  {
    name: "เทพลีลา",
    artist: "Silly Fools",
    mood: "สดใส",
    type: "Rock",
    replay: false,
    favorites: false,
    url: "./SONG/Rock/เทพลลา - SILLY FOOLS.mp3",
  },
  {
    name: "ใจเหลือๆ",
    artist: "Dr.fuu",
    mood: "เศร้า",
    type: "Rock",
    replay: false,
    favorites: false,
    url: "./SONG/Rock/ใจเหลอเหลอ.mp3",
  },
  {
    name: "Cypher 4",
    artist: "BTS",
    mood: "พลัง", // "sad"
    type: "Hip-hop",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/BTS Cypher 4.mp3",
  },
  {
    name: "Lose Yourself",
    artist: "Eminem",
    mood: "พลัง", // "sad"
    type: "Hip-hop",
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/Eminem - Lose Yourself.mp3",
  },
  {
    name: "มีแค่เรา",
    artist: "F.HERO Ft. LAZYLOXY & OG-ANIC",
    mood: "สดใส", // "sad"
    type: "Hip-hop",
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/F.HERO Ft. LAZYLOXY & OG-ANIC (Prod. By NINO) - มแคเรา [Official MV].mp3",
  },
  {
    name: "เสือสิ้นลาบ",
    artist: "F.HERO Ft. P-Hot, YOUNGOHM, FYMME",
    mood: "รัก", // "sad"
    type: "Hip-hop",
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/F.HERO Ft. P-Hot, YOUNGOHM, FYMME (Prod. By DeejayB) - เสอสนลาย [Official MV].mp3",
  },
  {
    name: "LEAVE IT ALL BEHIND",
    artist: "F.HERO x BODYSLAM x BABYMETAL",
    mood: "พลัง", // "sad"
    type: "Hip-hop",
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/F.HERO x BODYSLAM x BABYMETAL - LEAVE IT ALL BEHIND [Official MV].mp3",
  },
  {
    name: "HUMBLE",
    artist: "Kendrick Lamar ",
    mood: "พลัง", // "sad"
    type: "Hip-hop",
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/Kendrick Lamar - HUMBLE. [Lyrics].mp3",
  },
  {
    name: "ทน",
    artist: "SPRITE x GUYGEEGEE",
    mood: "สดใส",
    type: "Hip-hop",
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/SPRITE x GUYGEEGEE - ทน (Prod. by MOSSHU x NINO) OFFICIAL MV.mp3",
  },
  {
    name: "ิอยู่ดีๆก็...",
    artist: "WONDERFRAME feat.YOUNGOHM",
    mood: "เศร้า",
    type: "Hip-hop",
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/WONDERFRAME - อยดๆก... (Feat. YOUNGOHM)Official Video.mp3",
  },
  {
    name: "เฉยเมย",
    artist: "YOUNGOHM",
    mood: "เศร้า",
    type: "Hip-hop",
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/เฉยเมย--choey-moey.mp3",
  },
  {
    name: "Kosiyabong",
    artist: "Boyd",
    mood: "ผ่อนคลาย", // "sad"
    type: "Jazz",  // "rnb" ปรับเป็น "R&B"
    replay: false,
    favorites: false,
    url: "./SONG/Jazz/Boyd Kosiyabong -  ft Nop Ponchamni Official Lyric Video.mp3",
  },
  {
    name: "onlight",
    artist: "CMohasing",
    mood: "ผ่อนคลาย", // "sad"
    type: "Jazz",
    replay: false,
    favorites: false,
    url: "./SONG/Jazz/CMohasing onlight.mp3",
  },
  {
    name: "ก้อนหินละเมอ",
    artist: "Soul After Six",
    mood: "ผ่อนคลาย", // "sad"
    type: "Jazz",
    replay: false,
    favorites: false,
    url: "./SONG/Jazz/Soul After Six - ก้อนหินละเมอ (Official Lyric Video) [jlL_oWSIC5o].mp3",
  },
  {
    name: "The Place Where We Used to Go",
    artist: "Mixie",
    mood: "ผ่อนคลาย", // "sad"
    type: "Jazz",
    replay: false,
    favorites: false,
    url: "./SONG/Jazz/The Place Where We Used to Go.mp3",
  },
  {
    name: "ไม้รู้ทำไม",
    artist: "Whal & Dolph",
    mood: "ผ่อนคลาย", // "sad"
    type: "Indie",
    replay: false,
    favorites: false,
    url: "./SONG/indie/ไมรทำไม (Live).mp3",
  },
  {
    name: " แด่เธอทรก",
    artist: "Klear",
    mood: "ผ่อนคลาย", // "sad"
    type: "Indie",
    replay: false,
    favorites: false,
    url: "./SONG/indie/Klear - แดเธอทรก (Official MV).mp3",
  },
  {
    name: "Yhe Only One",
    artist: "Prt Time Musicians",
    mood: "พลัง",
    type: "Indie",
    replay: false,
    favorites: false,
    url: "./SONG/indie/Part Time Musicians - The Only One [Official Video].mp3",
  },
  {
    name: "Plastic Plastic",
    artist: "The Trip",
    mood: "พลัง",
    type: "Indie",
    replay: false,
    favorites: false,
    url: "./SONG/indie/Plastic Plastic - The Trip.mp3",
  },
  {
    name: "ฉันยังเก็บไว้",
    artist: "Whal & Dolph",
    mood: "เศร้า",
    type: "Indie",
    replay: false,
    favorites: false,
    url: "./SONG/indie/Whal & Dolph - ฉนยงเกบไว feat. เอต ภทรว (Girl & Boy) [Official MV].mp3",
  },
  {
    name: "แค่ฝนไป (Just)",
    artist: "Whal & Dolph",
    mood: "เศร้า",
    type: "Indie",
    replay: false,
    favorites: false,
    url: "./SONG/indie/Whal & Dolph - แคฝนไป (Just) [Official MV].mp3",
  },
  {
    name: "เพื่อนเล่นไม่เล่นเพื่อน",
    artist: "Tilly Birds Feat. MILLI",
    mood: "เศร้า",
    type: "Indie",
    replay: false,
    favorites: false,
    url: "./SONG/indie/เพอนเลนไมเลนเพอน(Just Being Friendly) - Tilly Birds Feat. MILLI Official MV.mp3",
  },
  {
    name: "ไม่รู้ทำไม",
    artist: "Whal & Dolph",
    mood: "เศร้า",
    type: "Indie",
    replay: false,
    favorites: false,
    url: "./SONG/indie/ไมรทำไม (Live).mp3",
  },
  {
    name: "แค่ฝนไป (Just)",
    artist: "Whal & Dolph",
    mood: "เศร้า",
    type: "ลูกทุ่ง",
    replay: false,
    favorites: false,
    url: "./SONG/indie/แคฝนไป (Just).mp3",
  },
  {
    name: "กลับคำสาหล่า",
    artist: "ไมค์ ภิรมย์พร",
    mood: "เศร้า",
    type: "ลูกทุ่ง",
    replay: false,
    favorites: false,
    url: "./SONG/ลูกทุ่ง/กลบคำสาหลา - ไมค ภรมยพร LYRIC VIDEO.mp3",
  },
  {
    name: "ขอใจเธอแลกเบอร์โทร",
    artist: "หญิงลี ศรีจุมพล",
    mood: "ปาร์ตี้",
    type: "ลูกทุ่ง",
    replay: false,
    favorites: false,
    url: "./SONG/ลูกทุ่ง/ขอใจเธอแลกเบอรโทร (Your Heart For My Number) - หญงล ศรจมพลOFFICIAL MV.mp3",
  },
  {
    name: "สาวเชียงใหม่",
    artist: "จรัล มโนเพชร",
    mood: "รัก",
    type: "ลูกทุ่ง",
    replay: false,
    favorites: false,
    url: "./SONG/ลูกทุ่ง/เพลงสาวเชยงใหม_ จรล มโพเพชร- สนทร เวชานนท และ คณะ.mp3",
  },
  {
    name: "มาทำไม",
    artist: "เบิร์ด ธงไชย",
    mood: "ปาร์ตี้",
    type: "ลูกทุ่ง",
    replay: false,
    favorites: false,
    url: "./SONG/ลูกทุ่ง/มาทำไม - เบรด ธงไชย, จนตหรา พนลาภ OFFICIAL MV.mp3",
  },
  {
    name: "ไสว่าสิบ่ถิ่มกัน",
    artist: "ก้อง หวยไร",
    mood: "เศร้า",
    type: "ลูกทุ่ง",
    replay: false,
    favorites: false,
    url: "./SONG/ลูกทุ่ง/ไสวาสบถมกน - กอง หวยไร [ Music Video ].mp3",
  },
  {
    name: "เลิกคุยทั้งอำเภอเพื่อเธอคนเดียว",
    artist: "ลิลลี่ ได้หมดถ้าสดชื่อ",
    mood: "รัก",
    type: "ลูกทุ่ง",
    replay: false,
    favorites: false,
    url: "./SONG/ลูกทุ่ง/เลกคยทงอำเภอเพอเธอคนเดยว - ลลล ไดหมดถาสดชน Feat.เกา เกรกพล [OFFICIAL MV.mp3",
  },
];

// เก็บข้อมูล songs ลงใน localStorage
localStorage.setItem('songs', JSON.stringify(songslist));



