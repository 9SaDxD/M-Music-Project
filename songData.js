const songslist = [
  {
    name: "Trapped in the Machine",
    artist: "Sinllex",
    mood: "ปาร์ตี้",
    type: "EDM",
    replay: false,
    favorites: false,
    url: "./SONG/EDM/song1.mp3",
  },
  {
    name: "เฉยเมย",
    artist: "YOUNGOHM",
    mood: "เศร้า",
    type: "Hip-hop",
    replay: false,
    favorites: false,
    url: "./SONG/hiphop/song2.mp3",
  },
  {
    name: "ฉันยังเก็บไว้",
    artist: "Whal & Dolph",
    mood: "เศร้า",
    type: "Indie",
    replay: false,
    favorites: false,
    url: "./SONG/indie/song3.mp3",
  },
  {
    name: "The Place Where We Used to Go",
    artist: "Mixie",
    mood: "ผ่อนคลาย",
    type: "Jazz",
    replay: false,
    favorites: false,
    url: "./SONG/Jazz/song4.mp3",
  },
  {
    name: "coffee breath",
    artist: "Sofia Mills",
    mood: "ผ่อนคลาย",
    type: "Lo-fi",
    replay: false,
    favorites: false,
    url: "./SONG/lofi/song5.mp3",
  },
  {
    name: "เธอได้ยินไหม",
    artist: "Refilx",
    mood: "เศร้า",
    type: "Pop",
    replay: false,
    favorites: false,
    url: "./SONG/POP/song6.mp3",
  }
];

// เก็บข้อมูล songs ลงใน localStorage เสมอเพื่อให้รายชื่ออัปเดตตรงกับไฟล์ที่มีอยู่จริง
localStorage.setItem('songs', JSON.stringify(songslist));
