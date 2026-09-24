// mian function ==========================================================================================
// ดึงชื่อผู้ใช้ที่ล็อกอินอยู่
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  alert("กรุณาเข้าสู่ระบบก่อนใช้งานหน้า Home");
  window.location.href = "index.html";
}

// ดึงข้อมูลเพลงจาก Local Storage
let storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
let songs = [...storedSongs];
let playedSongs = []; // ตัวแปรเก็บรายการเพลงที่เล่นแล้ว
let lastPlayedSong = null; // ตัวแปรเก็บข้อมูลเพลงล่าสุดที่เล่น
let currentPlayer = null; // ตัวแปรเพื่อเก็บ reference ของ audio player ที่กำลังเล่นอยู่
let lastClickedButton = null; // ตัวแปรเก็บปุ่มที่กดล่าสุด

let currentPlaylist = []; // ใช้เก็บเพลงที่กำลังแสดงในตาราง (อาจเป็นทั้งหมด, โปรด, หรือคิว)
let currentIndex = -1; // ดัชนีของเพลงที่กำลังเล่น

let songQueue = JSON.parse(localStorage.getItem(`songQueue_${currentUser.username}`)) || [];
let favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser.username}`)) || [];
let playlists = JSON.parse(localStorage.getItem(`playlists_${currentUser.username}`)) || [];

let songNumber = 0;
let tableBody = document.querySelector("#songTable tbody");
let displayedSongs = new Set();

let userMood = (currentUser?.preferredMood && currentUser.preferredMood.length > 0)
  ? currentUser.preferredMood[0]
  : null;

let userGenres = (currentUser?.preferredGenre && currentUser.preferredGenre.length > 0)
  ? currentUser.preferredGenre
  : [];

  function updateCurrentPlaylist(songsToDisplay, userMood, userGenres) {
    // เริ่มต้นกรองจากรายการโปรด
    const favoriteSongs = songsToDisplay.filter(song => song.favorites === true);
    let filteredSongs = [...favoriteSongs];
  
    // กรองเพลงตามอารมณ์ (mood) และแนวเพลง (genres)
    if (userMood && userGenres.length > 0) {
      const moodAndGenreSongs = songsToDisplay.filter(song => 
        song.mood === userMood && userGenres.includes(song.type)
      );
      filteredSongs = [...filteredSongs, ...moodAndGenreSongs];
  
      const genreOnlySongs = songsToDisplay.filter(song => 
        userGenres.includes(song.type) && song.mood !== userMood
      );
      filteredSongs = [...filteredSongs, ...genreOnlySongs];
    }
  
    // กรองเพลงตามอารมณ์เพียงอย่างเดียว
    const moodOnlySongs = songsToDisplay.filter(song =>
      song.mood === userMood && !userGenres.includes(song.type)
    );
    filteredSongs = [...filteredSongs, ...moodOnlySongs];
  
    // เพลงที่เหลือ
    const remainingSongs = songsToDisplay.filter(song => !filteredSongs.includes(song));
    filteredSongs = [...filteredSongs, ...remainingSongs];
  
    currentPlaylist = filteredSongs; // อัปเดต currentPlaylist
    songQueue = [...filteredSongs]; // อัปเดต songQueue
    localStorage.setItem(`songQueue_${currentUser.username}`, JSON.stringify(songQueue));
    displaySongs(currentPlaylist, userMood, userGenres); // แสดงเพลงใน UI
  }
  
  function getCurrentUsername() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user?.username || null; // คืนค่าชื่อผู้ใช้ หรือ null ถ้าไม่ได้ล็อกอิน
  }
  
  document.querySelector(".logout").addEventListener("click", logout);
  function logout() {
    localStorage.removeItem("currentUser");
    setTimeout(() => {
      window.location.href = "index.html"; // เปลี่ยนหน้าไปยังหน้า login หลังจาก 1 วินาที
    }, 1000); // 1000 มิลลิวินาที = 1 วินาที
  }
// ========== ฟังก์ชันแสดงเพลงทั้งหมด ========== //
function displaySongs(songsToDisplay, userMood = null, userGenres = []) {
  songNumber = 0;
  tableBody = document.querySelector("#songTable tbody");
  tableBody.innerHTML = "";
  displayedSongs = new Set();

  // 1. แสดงรายการโปรดก่อน
  const favoriteSongs = songsToDisplay.filter(song => song.favorites === true);
  favoriteSongs.forEach(renderSong);

  if (userMood && userGenres.length > 0) {
    // 2. mood + genre
    const moodAndGenreSongs = songsToDisplay.filter(song =>
      song.mood === userMood && userGenres.includes(song.type)
    );
    moodAndGenreSongs.forEach(renderSong);

    
    // 3. genre อย่างเดียว (ไม่ตรง mood)
    const genreOnlySongs = songsToDisplay.filter(song =>
      userGenres.includes(song.type) && song.mood !== userMood
    );
    genreOnlySongs.forEach(renderSong);
  }
  
  // 4. mood อย่างเดียว (ไม่ตรง genre)
  const moodOnlySongs = songsToDisplay.filter(song =>
    song.mood === userMood && !userGenres.includes(song.type)
  );
  moodOnlySongs.forEach(renderSong);

  // 4. ที่เหลือ
  const remainingSongs = songsToDisplay.filter(song =>
    !displayedSongs.has(song.name)
  );
  remainingSongs.forEach(renderSong);

  // ✅ เพิ่มการอัปเดตคิวที่นี่
  currentPlaylist = songsToDisplay;
  songQueue = [...songsToDisplay];
  localStorage.setItem(`songQueue_${currentUser.username}`, JSON.stringify(songQueue));
}

// ========== DOM Ready ========== //
document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("กรุณาเข้าสู่ระบบก่อนใช้งานหน้า Home");
    window.location.href = "index.html";
    return;
  }

  const userMood = (currentUser?.preferredMood && currentUser.preferredMood.length > 0)
    ? currentUser.preferredMood[0]
    : null;

  const userGenres = (currentUser?.preferredGenre && currentUser.preferredGenre.length > 0)
    ? currentUser.preferredGenre
    : [];

    const storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
    const songsWithFavs = markUserFavorites(storedSongs); // 🔥 ใส่ค่า favorites ให้แต่ละเพลง
    displaySongs(songsWithFavs, userMood, userGenres);    
});


function renderSong(song) {
  if (displayedSongs.has(song.name)) return;
  displayedSongs.add(song.name);

  const row = document.createElement("tr");

  const firstCell = document.createElement("td");
  songNumber++;
  firstCell.textContent = `${songNumber}. ${song.artist} - ${song.name}`;
  firstCell.classList.add("song-title");
  row.appendChild(firstCell);

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.marginTop = "5px";

  // ปุ่มเล่นเพลง
  const playButton = document.createElement("button");
  playButton.innerHTML = `<i class="bi bi-play-fill"></i> เล่น`;
  playButton.classList.add("buttonClick", "btn", "btn-outline-primary", "me-2");
  playButton.title = "เล่นเพลงนี้";
  playButton.addEventListener("click", () => {
    toggleWindow(playButton, song);
  });
  buttonContainer.appendChild(playButton);

  // ปุ่มรายการโปรด
  const favButton = document.createElement("button");
  let isFavorited = song.favorites === true;

  // ตั้งค่าเริ่มต้นตามสถานะ
  favButton.innerHTML = isFavorited
    ? `<i class="bi bi-heart-fill"></i>`
    : `<i class="bi bi-heart"></i>`;
  favButton.classList.add("buttonClick", "btn");
  favButton.classList.add(isFavorited ? "btn-danger" : "btn-outline-danger");
  favButton.title = isFavorited ? "ลบจากรายการโปรด" : "เพิ่มไปยังรายการโปรด";

  favButton.addEventListener("click", () => {
    const allSongs = JSON.parse(localStorage.getItem("songs")) || [];
    const index = allSongs.findIndex(
      s => s.name === song.name && s.artist === song.artist
    );

    if (index !== -1) {
      allSongs[index].favorites = !allSongs[index].favorites;
      isFavorited = allSongs[index].favorites;

      // บันทึกกลับลง localStorage
      localStorage.setItem("songs", JSON.stringify(allSongs));

      // เปลี่ยนไอคอนและสไตล์
      favButton.innerHTML = isFavorited
        ? `<i class="bi bi-heart-fill"></i>`
        : `<i class="bi bi-heart"></i>`;
      favButton.classList.toggle("btn-danger", isFavorited);
      favButton.classList.toggle("btn-outline-danger", !isFavorited);
      favButton.title = isFavorited ? "ลบจากรายการโปรด" : "เพิ่มไปยังรายการโปรด";

      // เรียกฟังก์ชันที่เกี่ยวข้อง
      if (isFavorited) {
        addFavorite(song);
      } else {
        removeFavorite(song);
      }
    }
  });
  buttonContainer.appendChild(favButton);

  // ปุ่มเพิ่มเพลย์ลิสต์
  const playlistButton = document.createElement("button");
  playlistButton.innerHTML = `<i class="bi bi-folder-plus"></i>`;
  playlistButton.classList.add("buttonClick", "btn", "btn-outline-secondary");
  playlistButton.title = "เพิ่มลงเพลย์ลิสต์";
  playlistButton.addEventListener("click", () => {
    addplaylistPopup(song);
  });
  buttonContainer.appendChild(playlistButton);

  firstCell.appendChild(buttonContainer);
  row.appendChild(firstCell);
  tableBody.appendChild(row);
}


async function replay() {
  if (lastPlayedSong) {
    await toggleReplay(lastPlayedSong); // เปลี่ยนค่า replay ของเพลงปัจจุบัน
  } else {
    console.warn("ยังไม่มีเพลงเล่นอยู่!");
  }
}

// ฟังก์ชันที่ใช้สลับค่าการรีเพลย์ของเพลง
async function toggleReplay(songObj) {
  const songIndex = currentPlaylist.findIndex(
    (song) => song.name === songObj.name && song.artist === songObj.artist
  );

  if (songIndex !== -1) {
    // สลับค่า replay ของเพลงใน currentPlaylist
    currentPlaylist[songIndex].replay = !currentPlaylist[songIndex].replay;
    // บันทึกค่า replay ที่อัปเดตใน localStorage
    localStorage.setItem("songs", JSON.stringify(storedSongs));  // อัปเดตข้อมูลใน localStorage
    
    console.log(
      `Replay for "${currentPlaylist[songIndex].name}" is now ${currentPlaylist[songIndex].replay}`
    );

    // อัปเดตปุ่มรีเพลย์ใน UI
    const btn = document.getElementById("replayBtn");
    if (btn) {
      btn.classList.toggle("active", currentPlaylist[songIndex].replay);
    }

    // กำหนดฟังก์ชันสำหรับเมื่อเพลงจบ
    const audioPlayer = document.getElementById("audioPlayer");
    if (
      audioPlayer &&
      lastPlayedSong &&
      songObj.name === lastPlayedSong.name &&
      songObj.artist === lastPlayedSong.artist
    ) {
      audioPlayer.onended = currentPlaylist[songIndex].replay
        ? async () => playSong(songObj)
        : async () => nextSong();
    }
  } else {
    console.error("ไม่พบเพลงใน currentPlaylist!");
    console.log("กำลังหา:", songObj.name, "|", songObj.artist);
    console.log(
      "เพลงทั้งหมด:",
      currentPlaylist.map((s) => `${s.name} - ${s.artist}`)
    );
  }
}


// ปุ่มสำหรับสุ่มเพลง
async function playSong(song) {
  const audioPlayer = document.getElementById("audioPlayer");
  
  const songTitle = document.getElementById("songTitle");

  // ดึง songslist ล่าสุดจาก localStorage
  const songToPlay = currentPlaylist.find(
    (s) => s.name === song.name && s.artist === song.artist
  );

  if (!songToPlay || !songToPlay.url) {
    songTitle.textContent = `ไม่พบไฟล์เสียงของ: ${songToPlay.artist} - ${songToPlay.name}`;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    
    audioPlayer.load();
    return;
  }

  try {
    songTitle.textContent = `${songToPlay.artist} - ${songToPlay.name}`;
    audioPlayer.src = songToPlay.url;
    await audioPlayer.play(); // เล่นเพลง
    lastPlayedSong = songToPlay; // เก็บเพลงล่าสุดที่เล่น
    currentIndex = currentPlaylist.findIndex(
      (s) => s.name === song.name && s.artist === song.artist
    );
  } catch (error) {
    console.error("Error loading audio:", error); alert("ไม่สามารถเล่นเพลงได้: " + error);
    return;
  }
}

const replayBtn = document.getElementById("replayBtn");
const audioPlayer = document.getElementById("audioPlayer");
audioPlayer.addEventListener("ended", async function () {
  const currentSong = currentPlaylist[currentIndex]; // ดึงเพลงปัจจุบันจาก playlist
  if (currentSong && currentSong.replay) {
    // เล่นเพลงถัดไปเมื่อเพลงจบ
    await playSong(currentSong);
  } else {
    // ถ้าไม่เปิด → ไปเพลงถัดไป
    if (currentIndex < currentPlaylist.length - 1) {
      currentIndex++;
      const nextSong = currentPlaylist[currentIndex];
      await playSong(nextSong);
    } else {
      console.log("จบ playlist แล้ว");
    }
  }
});

function closeSlideWindow() {
  const slideWindow = document.getElementById("slideWindow");
  slideWindow.classList.remove("open");
}

async function nextSong() {
  if (currentIndex < currentPlaylist.length - 1) {
    currentIndex++;
    const nextSong = currentPlaylist[currentIndex];
    await playSong(nextSong);
  } else {
    alert("ไม่มีเพลงถัดไป");
  }
}

async function previousSong() {
  if (currentIndex > 0) {
    currentIndex--;
    const previousSong = currentPlaylist[currentIndex];
    await playSong(previousSong);
  } else {
    alert("ไม่มีเพลงก่อนหน้า");
  }
}


async function randomSong() {
  if (songs.length === 0) {
    songs.push(...playedSongs); // นำเพลงที่เล่นแล้วกลับมาใส่ในอาเรย์
    playedSongs = []; // ลบเพลงที่เล่นแล้ว
  }

  // สุ่มดัชนีของเพลง
  let randomIndex = Math.floor(Math.random() * songs.length);
  let selectedSong = songs[randomIndex]; // เลือกเพลงที่สุ่มมา

  currentPlaylist = songs;
  currentIndex = currentPlaylist.findIndex(
    (s) => s.name === selectedSong.name && s.artist === selectedSong.artist
  );
  await playSong(selectedSong);
  replayBtn.disabled = false;
}

function viewFavorites() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.username) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return;
  }

  const favoritesKey = `favorites_${currentUser.username}`;
  const userFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  if (userFavorites.length === 0) {
    alert("ยังไม่มีเพลงโปรด");
    return;
  }

  // ทำเครื่องหมาย favorites เผื่อใช้ใน UI อื่น
  const markedSongs = markUserFavorites(userFavorites);

  displaySongs(markedSongs);
}

document.addEventListener("DOMContentLoaded", function () {
  const storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
  const songsWithFavs = markUserFavorites(storedSongs); // ใส่ค่า favorites ให้แต่ละเพลง
  updateCurrentPlaylist(songsWithFavs, userMood, userGenres); // อัปเดต currentPlaylist ตามอารมณ์และแนวเพลงของผู้ใช้
});

// queue ==================================================================================================
function saveQueue() {
  localStorage.setItem(`songQueue_${currentUser}`, JSON.stringify(songQueue));
}

function displayQueue(queueToDisplay) {
  const queueTable = document.querySelector("#songQueueTable tbody");
  currentPlaylist = queueToDisplay;
  let songNumber = 0;
  queueTable.innerHTML = "";

  if (queueToDisplay && Array.isArray(queueToDisplay)) {
    queueToDisplay.forEach((song, index) => {
      const row = document.createElement("tr");
      const firstCell = document.createElement("td");
      firstCell.style.position = "relative"; // ต้องให้ relative ก่อนจะใส่ absolute ข้างใน

      songNumber++;
      const songText = document.createElement("div");
      songText.textContent = `${songNumber}. ${song.artist} - ${song.name}`;
      songText.classList.add("song-title");
      songText.style.paddingTop = "5px";

      // 🔥 ปุ่มลบมุมซ้ายบน
      const removeButton = document.createElement("span");
      removeButton.innerHTML = `<i class="bi bi-x-lg"></i>`;
      removeButton.classList.add("delete-queue");
      removeButton.addEventListener("click", () => {
        removeFromQueue(index);
      });
      firstCell.appendChild(removeButton);

      // ✅ ปุ่มควบคุมอื่นๆ
      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.gap = "10px";
      buttonContainer.style.marginTop = "5px";

      const playButton = document.createElement("button");
      playButton.innerHTML = `<i class="bi bi-play-fill"></i> เล่น`;
      playButton.classList.add("buttonClick", "btn", "btn-outline-primary");
      playButton.title = "เล่นเพลงนี้";
      playButton.addEventListener("click", () => {
        toggleWindowbyQueue(playButton, song);
      });
      buttonContainer.appendChild(playButton);

      const upButton = document.createElement("button");
      upButton.innerHTML = `<i class="bi bi-caret-up-fill"></i>`;
      upButton.classList.add("buttonClick", "btn", "btn-outline-secondary");
      upButton.title = "เลื่อนขึ้น";
      upButton.addEventListener("click", () => {
        moveSongUp(index);
      });
      buttonContainer.appendChild(upButton);

      const downButton = document.createElement("button");
      downButton.innerHTML = `<i class="bi bi-caret-down-fill"></i>`;
      downButton.classList.add("buttonClick", "btn", "btn-outline-secondary");
      downButton.title = "เลื่อนลง";
      downButton.addEventListener("click", () => {
        moveSongDown(index);
      });
      buttonContainer.appendChild(downButton);

      // เพิ่มข้อความเพลงและปุ่มควบคุมลง cell
      firstCell.appendChild(songText);
      firstCell.appendChild(buttonContainer);
      row.appendChild(firstCell);
      queueTable.appendChild(row);
    });

    songQueue = [...queueToDisplay];
    localStorage.setItem(`songQueue_${currentUser.username}`, JSON.stringify(songQueue));
  } else {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = "คิวเพลงว่างอยู่";
    row.appendChild(cell);
    queueTable.appendChild(row);
  }
}


async function replayQueue() {
  if (lastPlayedSong) {
    await toggleReplayQueue(lastPlayedSong); // เปลี่ยนค่า replay ของเพลงปัจจุบัน
  } else {
    console.warn("ยังไม่มีเพลงเล่นอยู่!");
  }
}



async function playqueueSong(song) {
  const audioPlayer = document.getElementById("QueueaudioPlayer");
  
  const songTitle = document.getElementById("QueuesongTitle");
  // ดึง songslist ล่าสุดจาก localStorage
  const songslist = JSON.parse(localStorage.getItem("songs")) || [];
  // ค้นหาเพลงนี้ใน localStorage เพื่อเอาค่า replay ที่อัปเดตล่าสุด
  const updatedSong = songslist.find(
    (s) => s.name === song.name && s.artist === song.artist
  );

  // ถ้าไม่เจอให้ fallback ไปใช้ตัวเดิม
  const songToPlay = updatedSong || song;
  if (!songToPlay.url) {
    songTitle.textContent = `ไม่พบไฟล์เสียงของ: ${songToPlay.artist} - ${songToPlay.name}`;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    
    audioPlayer.load();
    return;
  }

  try {
    songTitle.textContent = `${songToPlay.artist} - ${songToPlay.name}`;
    audioPlayer.src = songToPlay.url;
    await audioPlayer.play();
    lastPlayedSong = songToPlay; // เก็บเพลงล่าสุดที่เล่น
    currentIndex = songQueue.findIndex(
      (s) => s.name === song.name && s.artist === song.artist
    );
  } catch (error) {
    console.error("Error loading audio:", error); alert("ไม่สามารถเล่นเพลงได้: " + error);
    return;
  }
}

function removeFromQueue(index) {
  const slideWindowbyQueue = document.getElementById("slideWindowbyQueue");
  const audioPlayer = document.getElementById("QueueaudioPlayer");

  // ปิดหน้าต่าง
  slideWindowbyQueue.classList.remove("open");
  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  songQueue.splice(index, 1); // ลบเพลงออกจากอาร์เรย์
  localStorage.setItem(`songQueue_${currentUser}`, JSON.stringify(songQueue)); // บันทึกข้อมูลใหม่ลงใน Local Storage
  displayQueue(songQueue); // รีเฟรชการแสดงผล

  if (songQueue.length === 0) {
    alert("คิวเพลงว่างอยู่");
    closequeuePopup()
    return;
  }
}

async function nextQueueSong() {
  try {
    // ดึงข้อมูลเพลงจาก localStorage
    const songslist = JSON.parse(localStorage.getItem(`songQueue_${currentUser}`)) || [];

    // เปลี่ยนค่า replay ของทุกเพลงใน songQueue เป็น false
    songQueue.forEach((song) => {
      const songIndex = songslist.findIndex(
        (s) => s.name === song.name && s.artist === song.artist
      );
      if (songIndex !== -1) {
        songslist[songIndex].replay = false; // เปลี่ยน replay เป็น false
      }
    });

    // อัปเดตข้อมูลใน localStorage
    localStorage.setItem(`songQueue_${currentUser}`, JSON.stringify(songslist));

    // ตรวจสอบว่า currentIndex อยู่ในขอบเขตที่ถูกต้อง
    if (currentIndex < songQueue.length - 1) {
      currentIndex++; // ไปที่เพลงถัดไป
      const nextSong = songQueue[currentIndex];
      await playqueueSong(nextSong); // เล่นเพลงถัดไป
    } else {
      alert("ไม่มีเพลงถัดไป"); // หากถึงเพลงสุดท้ายแล้ว
    }
  } catch (error) {
    console.error("Error loading audio:", error); alert("ไม่สามารถเล่นเพลงได้: " + error);
  }
}

async function previousQueueSong() {
  try {
    // ดึงข้อมูลเพลงจาก localStorage
    const songslist = JSON.parse(localStorage.getItem(`songQueue_${currentUser}`)) || [];

    // เปลี่ยนค่า replay ของทุกเพลงใน songQueue เป็น false
    songQueue.forEach((song) => {
      const songIndex = songslist.findIndex(
        (s) => s.name === song.name && s.artist === song.artist
      );
      if (songIndex !== -1) {
        songslist[songIndex].replay = false; // เปลี่ยน replay เป็น false
      }
    });

    // อัปเดตข้อมูลใน localStorage
    localStorage.setItem(`songQueue_${currentUser}`, JSON.stringify(songslist));
    if (currentIndex > 0) {
      currentIndex--;
      const prevSong = songQueue[currentIndex];
      await playqueueSong(prevSong);
    } else {
      alert("ไม่มีเพลงก่อนหน้า");
    }
  } catch (error) {
    console.error("Error loading audio:", error); alert("ไม่สามารถเล่นเพลงได้: " + error);
  }
}

function addToQueue(song) {
  // ตรวจสอบว่าเพลงนี้มีอยู่ในคิวหรือยัง
  if (!songQueue.find((s) => s.name === song.name && s.artist === song.artist)) {
    songQueue.push(song); // เพิ่มเพลง
    alert(`เพิ่ม "${song.artist} - ${song.name}" ลงคิวแล้ว`);
  } else {
    alert(`เพลง "${song.artist} - ${song.name}" มีอยู่ในคิวแล้ว`);
  }

  // บันทึกคิวไว้ใน localStorage
  localStorage.setItem(`songQueue_${currentUser}`, JSON.stringify(songQueue));
}

async function toggleReplayQueue(songObj) {
  const songslist = JSON.parse(localStorage.getItem(`songQueue_${currentUser}`)) || [];
  const songIndex = songslist.findIndex(
    (song) => song.name === songObj.name && song.artist === songObj.artist
  );

  if (songIndex !== -1) {
    songslist[songIndex].replay = !songslist[songIndex].replay;
    localStorage.setItem(`songQueue_${currentUser}`, JSON.stringify(songslist));
    console.log(
      `Replay for "${songslist[songIndex].name}" is now ${songslist[songIndex].replay}`
    );

    const btn = document.getElementById("replayBtnQueue");
    if (btn) {
      btn.classList.toggle("active", songslist[songIndex].replay);
    }

    const audioPlayer = document.getElementById("QueueaudioPlayer");
    if (
      audioPlayer &&
      lastPlayedSong &&
      songObj.name === lastPlayedSong.name &&
      songObj.artist === lastPlayedSong.artist
    ) {
      audioPlayer.onended = songslist[songIndex].replay
        ? async () => playqueueSong(songObj)
        : async () => nextQueueSong();
    }
  } else {
    console.error("ไม่พบเพลงในข้อมูล!");
    console.log("กำลังหา:", songObj.name, "|", songObj.artist);
    console.log(
      "เพลงทั้งหมด:",
      songslist.map((s) => `${s.name} - ${s.artist}`)
    );
  }
}

function closeSlideQueueWindow() {
  const slideWindow = document.getElementById("slideWindowbyQueue");
  slideWindow.classList.remove("open");
}

function moveSongUp(index) {
  if (index > 0) {
    const temp = songQueue[index];
    songQueue[index] = songQueue[index - 1];
    songQueue[index - 1] = temp;
    localStorage.setItem(`songQueue_${currentUser}`, JSON.stringify(songQueue));
    displayQueue(songQueue);
  }
}

function moveSongDown(index) {
  if (index < songQueue.length - 1) {
    const temp = songQueue[index];
    songQueue[index] = songQueue[index + 1];
    songQueue[index + 1] = temp;
    localStorage.setItem(`songQueue_${currentUser}`, JSON.stringify(songQueue));
    displayQueue(songQueue);
  }
}

// toggle ==================================================================================================
function toggleWindow(button, song) {
  const slideWindow = document.getElementById("slideWindow");
  const slideWindowbyQueue = document.getElementById("slideWindowbyQueue");
  const queueAudioPlayer = document.getElementById("QueueaudioPlayer");

  // ปิดหน้าต่างอีกอันก่อน
  slideWindowbyQueue.classList.remove("open");
  queueAudioPlayer.pause();
  queueAudioPlayer.currentTime = 0;

  if (lastClickedButton !== button) {
    slideWindow.classList.add("open");
    lastClickedButton = button;
    playSong(song);
  } else {
    slideWindow.classList.toggle("open");
  }
}

function toggleWindowbyQueue(button, song) {
  const slideWindowbyQueue = document.getElementById("slideWindowbyQueue");
  const slideWindow = document.getElementById("slideWindow");
  const audioPlayer = document.getElementById("audioPlayer");

  // ปิดหน้าต่างอีกอันก่อน
  slideWindow.classList.remove("open");
  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  if (lastClickedButton !== button) {
    slideWindowbyQueue.classList.add("open");
    lastClickedButton = button;
    playqueueSong(song);
  } else {
    slideWindowbyQueue.classList.toggle("open");
  }
  closequeuePopup()
}

function addFavorite(song) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.username) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return;
  }

  const favoritesKey = `favorites_${currentUser.username}`;
  let userFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  const songKey = `${song.name}_${song.artist}`; // ใช้ชื่อ + ศิลปินเพื่อความ unique
  const index = userFavorites.findIndex(
    (s) => s.name === song.name && s.artist === song.artist
  );

  if (index !== -1) {
    // ลบออกจากรายการโปรด
    userFavorites.splice(index, 1);
    alert(`ลบ "${song.name}" ออกจากรายการโปรดแล้ว`);
  } else {
    // เพิ่มเข้าไป
    userFavorites.push(song);
    alert(`เพิ่ม "${song.name}" เข้าในรายการโปรดแล้ว`);
  }

  // เซฟรายการใหม่
  localStorage.setItem(favoritesKey, JSON.stringify(userFavorites));

  // อัปเดตค่าที่อยู่ใน 'songs' ด้วย (กรณีที่คุณใช้แสดงในตารางหลัก)
  const songslist = JSON.parse(localStorage.getItem("songs")) || [];
  const songIndex = songslist.findIndex(
    (s) => s.name === song.name && s.artist === song.artist
  );
  if (songIndex !== -1) {
    songslist[songIndex].favorites = index === -1; // ถ้าเพิ่งเพิ่ม ก็ true
    localStorage.setItem("songs", JSON.stringify(songslist));
  }
  location.reload();
}

function markUserFavorites(songs) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.username) return songs;

  const favoritesKey = `favorites_${currentUser.username}`;
  const userFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  const favoriteMap = new Set(userFavorites.map(song => `${song.name}_${song.artist}`));
  
  return songs.map(song => {
    const key = `${song.name}_${song.artist}`;
    song.favorites = favoriteMap.has(key);
    return song;
  });
}



// popup ==================================================================================================
function showFilterPopup() {
  document.getElementById("filterPopup").style.display = "flex";
}

function closeFilterPopup() {
  document.getElementById("filterPopup").style.display = "none";
}

function showqueuePopup() {
  document.getElementById("queuePopup").style.display = "flex";
  displayQueue(songQueue); // เรียกฟังก์ชันแสดงคิวเพลงเมื่อเปิดป๊อปอัพ
}

function closequeuePopup() {
  document.getElementById("queuePopup").style.display = "none";
}

// sort ==================================================================================================
function searchSongs() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!searchTerm) {
    if (Array.isArray(storedSongs)) {
      displaySongs(storedSongs, userMood, userGenres);
    } else {
      console.error("storedSongs is not available", storedSongs);
    }
    return;
  }
  const filteredSongs = storedSongs.filter((song) => {
    const nameMatch = song.name.toLowerCase().includes(searchTerm);
    const artistMatch = song.artist.toLowerCase().includes(searchTerm);
    return nameMatch || artistMatch;
  });
  // ฟังก์ชันหาตำแหน่งตัวอักษรแรกที่เจอในข้อความ
  function getCharPosition(text, char) {
    const pos = text.toLowerCase().indexOf(char);
    return pos === -1 ? Infinity : pos; // ยิ่งตำแหน่งน้อยยิ่งสำคัญ
  }

  // เรียงตามตำแหน่งของตัวอักษรในชื่อศิลปินก่อน จากนั้นชื่อเพลง
  filteredSongs.sort((a, b) => {
    const char = searchTerm[0]; // ใช้ตัวอักษรตัวแรกของคำค้น

    const posArtistA = getCharPosition(a.artist, char);
    const posArtistB = getCharPosition(b.artist, char);
    if (posArtistA !== posArtistB) return posArtistA - posArtistB;

    const posNameA = getCharPosition(a.name, char);
    const posNameB = getCharPosition(b.name, char);
    return posNameA - posNameB;
  });

  displaySongs(markUserFavorites(filteredSongs));
}

// ฟังก์ชันการใช้งานเมื่อเลือกตัวเลือกจากป๊อปอัพ
function applyFilter() {
  const selectedOption = document.querySelector('input[name="filterOption"]:checked').value;
  // ตรวจสอบว่าผู้ใช้เลือกอะไร
  if (selectedOption === "az") {
    sortSongsAZ(); // ฟังก์ชันเรียง A-Z
  } else {
    filterByGenre(selectedOption); // ฟังก์ชันกรองตามแนวเพลง
  }

  // ปิดป๊อปอัพหลังจากเลือกแล้ว
  closeFilterPopup();
}

// ฟังก์ชันการเรียงเพลง A-Z
function sortSongsAZ() {
  const sortedSongs = [...storedSongs].sort((a, b) =>
    a.artist.localeCompare(b.artist)
  );
  displaySongs(sortedSongs);
}

// ฟังก์ชันกรองเพลงตามแนวเพลง
function filterByGenre(type) {
  const filteredSongs = storedSongs.filter(
    (song) => song.type.toLowerCase() === type.toLowerCase()
  );
  displaySongs(filteredSongs); // ส่ง mood, genre ด้วยถ้าจำเป็น
}

// playlist ==================================================================================================
function viewAllplaylistsPopup() {
  const username = getCurrentUsername();
  if (!username) return alert("กรุณาเข้าสู่ระบบก่อน");
  const key = `playlists_${username}`;
  const allPlaylists = JSON.parse(localStorage.getItem(key)) || [];

  if (!Array.isArray(allPlaylists) || allPlaylists.length === 0) {
    alert("ยังไม่มีเพลย์ลิสต์");
    closeAllplaylistsPopup();
    return;
  }

  document.getElementById("viewAllplaylistsPopup").style.display = "flex";
  const grid = document.getElementById("playlistGrid");
  grid.innerHTML = "";

  allPlaylists.forEach((pl, index) => {
    const card = document.createElement("div");
    card.className = "playlist-card";
    card.style.border = "1px solid #ccc";

    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = `<i></i>`;
    deleteBtn.className = "delete-btn , bi bi-x-lg";
    deleteBtn.title = "ลบเพลย์ลิสต์";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deletePlaylist(index);
    });

    const renameBtn = document.createElement("span");
    renameBtn.innerHTML = `<i></i>`;
    renameBtn.className = "rename-btn , bi bi-pencil-square";
    renameBtn.title = "เปลี่ยนชื่อเพลย์ลิสต์";
    renameBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const newName = prompt("ใส่ชื่อใหม่สำหรับเพลย์ลิสต์:", pl.name);
      if (newName) renamePlaylist(index, newName.trim());
    });

    const title = document.createElement("div");
    title.style.textAlign = "center";
    title.className = "title clickable";
    title.textContent = pl.name;
    title.addEventListener("click", () => {
      displaySongs(pl.songs);
      closeAllplaylistsPopup();
    });

    card.appendChild(deleteBtn);
    card.appendChild(renameBtn);
    card.appendChild(title);
    grid.appendChild(card);
  });

  // ✅ เพิ่มการ์ด 'สร้างเพลย์ลิสต์ใหม่' ต่อท้าย
  const createCard = document.createElement("div");
  createCard.className = "playlist-card new-playlist";
  createCard.style.border = "1px dashed #ccc";
  createCard.style.backgroundColor = "#f9f9f9";

  const plusSign = document.createElement("div");
  plusSign.className = "plus";
  plusSign.textContent = "+";
  createCard.appendChild(plusSign);

  createCard.addEventListener("click", () => {
    const newName = prompt("ใส่ชื่อเพลย์ลิสต์ใหม่:");
    if (newName) {
      createEmptyPlaylist(newName.trim());
      viewAllplaylistsPopup();
    }
  });

  grid.appendChild(createCard); // ใส่หลังสุดตรงนี้!
}

function createEmptyPlaylist(name) {
  const username = getCurrentUsername();
  if (!username) return;

  const trimmedName = name.trim();
  if (!trimmedName) {
    alert("กรุณาใส่ชื่อเพลย์ลิสต์ให้ถูกต้อง");
    return;
  }

  const key = `playlists_${username}`;
  const playlists = JSON.parse(localStorage.getItem(key)) || [];

  const isDuplicate = playlists.some((pl) => pl.name === trimmedName);
  if (isDuplicate) {
    alert("มีเพลย์ลิสต์ชื่อนี้อยู่แล้ว!");
    return;
  }

  playlists.push({ name: trimmedName, songs: [] });
  localStorage.setItem(key, JSON.stringify(playlists));
}


function showPlaylistPopup(playlist) {
  currentPlaylist = playlist.songs || [];
  const popup = document.getElementById("playlistPopup");
  const popupTitle = document.getElementById("popupTitle");
  const popupSongs = document.getElementById("popupSongs");
  // ตั้งชื่อหัวข้อ popup
  popupTitle.textContent = playlist.name;
  popupSongs.innerHTML = "";
  // แสดงเพลงในเพลย์ลิสต์
  playlist.songs.forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-item");
    songDiv.textContent = `${index + 1}. ${song.artist} - ${song.name}`;
    popupSongs.appendChild(songDiv);
  });

  // เปิด popup
  popup.style.display = "block";
}

function closeAllplaylistsPopup() {
  document.getElementById("viewAllplaylistsPopup").style.display = "none";
}

function deletePlaylist(index) {
  const username = getCurrentUsername();
  const key = `playlists_${username}`;
  const playlists = JSON.parse(localStorage.getItem(key)) || [];
  
  const confirmDelete = confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบเพลย์ลิสต์ ${playlists[index].name} ?`);
  if (!confirmDelete) return;

  playlists.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(playlists));
  viewAllplaylistsPopup();
  displaySongs(storedSongs)

  // การลบเพลย์ลิสต์ไม่เกี่ยวข้องกับ audio player แต่ถ้าจำเป็นสามารถเพิ่มได้
  const slideWindow = document.getElementById("slideWindow");
  const audioPlayer = document.getElementById("audioPlayer");
  slideWindow.classList.remove("open");
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

function renamePlaylist(index, newName) {
  const username = getCurrentUsername();
  if (!username) return;
  const key = `playlists_${username}`;
  const playlists = JSON.parse(localStorage.getItem(key)) || [];

  if (playlists.some((p, i) => i !== index && p.name === newName)) {
    alert("มีชื่อเพลย์ลิสต์นี้อยู่แล้ว");
    return;
  }

  playlists[index].name = newName;
  localStorage.setItem(key, JSON.stringify(playlists));
  viewAllplaylistsPopup();
}

function closePlaylistPopup() {
  document.getElementById("addplaylistsPopup").style.display = "none";
}

function addToPlaylist(playlistName, song) {
  const username = getCurrentUsername();
  if (!username) return;
  const key = `playlists_${username}`;
  let playlists = JSON.parse(localStorage.getItem(key)) || [];

  let playlist = playlists.find((p) => p.name === playlistName);
  if (!playlist) {
    playlist = { name: playlistName, songs: [] };
    playlists.push(playlist);
  }

  if (!playlist.songs.find((s) => s.name === song.name && s.artist === song.artist)) {
    playlist.songs.push(song);
    // alert(`เพิ่ม \"${song.artist} - ${song.name}\" เข้าเพลย์ลิสต์ \"${playlistName}\" แล้ว`);
  }

  localStorage.setItem(key, JSON.stringify(playlists));
}

function addplaylistPopup(song) {
  const username = getCurrentUsername();
  if (!username) return;
  const key = `playlists_${username}`;
  const allPlaylists = JSON.parse(localStorage.getItem(key)) || [];

  // กรณีไม่มีเพลย์ลิสต์เลย
  if (!Array.isArray(allPlaylists) || allPlaylists.length === 0) {
    const playlistName = prompt("ใส่ชื่อเพลย์ลิสต์ที่ต้องการเพิ่ม:");
    if (!playlistName) return;
    addToPlaylist(playlistName.trim(), song);
    return;
  }

  document.getElementById("viewAllplaylistsPopup").style.display = "flex";
  const grid = document.getElementById("playlistGrid");
  grid.innerHTML = "";

  // วาดเพลย์ลิสต์ทั้งหมดก่อน
  allPlaylists.forEach((pl, index) => {
    const card = document.createElement("div");
    card.className = "playlist-card";
    card.style.border = "1px solid #ccc";

    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = `<i></i>`;
    deleteBtn.className = "delete-btn , bi bi-x-lg";
    deleteBtn.title = "ลบเพลย์ลิสต์";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deletePlaylist(index);
    });

    const renameBtn = document.createElement("span");
    renameBtn.innerHTML = `<i></i>`;
    renameBtn.className = "rename-btn , bi bi-pencil-square";
    renameBtn.title = "เปลี่ยนชื่อเพลย์ลิสต์";
    renameBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const newName = prompt("ใส่ชื่อใหม่สำหรับเพลย์ลิสต์:", pl.name);
      if (newName) renamePlaylist(index, newName.trim());
    });

    const title = document.createElement("div");
    title.style.textAlign = "center";
    title.className = "title clickable";
    title.textContent = pl.name;
    title.addEventListener("click", () => {
      addToPlaylist(pl.name, song);
      alert(`เพิ่ม "${song.artist} - ${song.name}" เข้าเพลย์ลิสต์ "${pl.name}" แล้ว`);
      closeAllplaylistsPopup();
    });

    card.appendChild(deleteBtn);
    card.appendChild(renameBtn);
    card.appendChild(title);
    grid.appendChild(card);
  });

  // ✅ เพิ่มการ์ด 'สร้างเพลย์ลิสต์ใหม่' ต่อท้าย
  const createCard = document.createElement("div");
  createCard.className = "playlist-card new-playlist";
  createCard.style.border = "1px dashed #ccc";
  createCard.style.backgroundColor = "#f9f9f9";

  const plusSign = document.createElement("div");
  plusSign.className = "plus";
  plusSign.textContent = "+";
  createCard.appendChild(plusSign);

  createCard.addEventListener("click", () => {
    const newName = prompt("ใส่ชื่อเพลย์ลิสต์ใหม่:");
    if (newName) {
      addToPlaylist(newName.trim(), song);
      addplaylistPopup(song);
    }
  });

  grid.appendChild(createCard); // ใส่หลังสุดตรงนี้!
}



