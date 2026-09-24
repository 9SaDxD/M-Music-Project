window.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();

  if (currentUser) {
    const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
    const userProfile = profiles[currentUser.username];

    if (userProfile) {
      document.getElementById("profileName").textContent = userProfile.name || "ไม่มีชื่อ";
      document.getElementById("profileDesc").textContent = userProfile.description || "ไม่มีคำอธิบาย";

      // ใช้ FileReader หรือแสดงรูปภาพตาม URL
      const profileImgElement = document.getElementById("profileImg");
      const coverImgElement = document.getElementById("coverImg");

      profileImgElement.style.backgroundImage = `url('${userProfile.profileImg || "./Pic/default-profile.webp"}')`;
      coverImgElement.style.backgroundImage = `url('${userProfile.coverImg || "./Pic/default-cover.webp"}')`;
      loadPlaylists();
      loadFavorites(); // โหลด favorites
    }
  } else {
    alert("คุณไม่ได้เข้าสู่ระบบ");
  }
});

// เมื่อผู้ใช้ทำการแก้ไขข้อมูล
function saveProfileChanges() {
  const username = getCurrentUser().username; // ใช้ username ปัจจุบัน
  const updatedProfile = {
    name: document.getElementById("profileName").value, // สมมติว่ามี input สำหรับชื่อ
    description: document.getElementById("profileDesc").value, // สมมติว่ามี input สำหรับคำอธิบาย
    profileImg: document.getElementById("profileImgInput").value, // สมมติว่ามี input สำหรับ URL ของรูปโปรไฟล์
    coverImg: document.getElementById("coverImgInput").value, // สมมติว่ามี input สำหรับ URL ของรูปปก
  };

  // เรียกฟังก์ชันอัปเดตข้อมูล
  updateProfile(username, updatedProfile);
}


function updateProfile(username, updatedProfile) {
  // ดึงข้อมูลจาก localStorage หรือใช้ค่าเริ่มต้นถ้าข้อมูลไม่มี
  const profiles = JSON.parse(localStorage.getItem("profiles")) || {};

  // อัปเดตโปรไฟล์ของผู้ใช้ที่มี username ตรงกับที่รับมา
  profiles[username] = updatedProfile;

  // บันทึกข้อมูลทั้งหมดกลับไปที่ localStorage
  localStorage.setItem("profiles", JSON.stringify(profiles));
}



function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function getProfiles() {
  return JSON.parse(localStorage.getItem("profiles")) || {};
}

function openModal() {
  document.getElementById("editModal").style.display = "flex";
}

function openModalPic() {
  document.getElementById("editPic").style.display = "flex";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

function closePic() {
  document.getElementById("editPic").style.display = "none";
}

function getCurrentUsername() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser ? currentUser.username : null;
}


function editProfile() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert("คุณไม่ได้เข้าสู่ระบบ");
    return;
  }

  // ดึงข้อมูลจากฟอร์มแก้ไข
  const newProfile = {
    name: document.getElementById("editName").value,
    description: document.getElementById("editDesc").value,
    profileImg: document.getElementById("editProfileImgFile").files[0]?.name || "", // เก็บชื่อไฟล์
    coverImg: document.getElementById("editCoverImgFile").files[0]?.name || "", // เก็บชื่อไฟล์
  };

  const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
  profiles[currentUser.username] = { ...profiles[currentUser.username], ...newProfile }; // รวมข้อมูลใหม่เข้าไป

  // อัปเดตข้อมูลโปรไฟล์ใน localStorage
  localStorage.setItem("profiles", JSON.stringify(profiles));

  // อัปเดตข้อมูลโปรไฟล์บน UI
  document.getElementById("profileName").textContent = newProfile.name;
  document.getElementById("profileDesc").textContent = newProfile.description;
  
  if (newProfile.profileImg) {
    document.getElementById("profileImg").style.backgroundImage = `url('./images/${newProfile.profileImg}')`;
  }
  
  if (newProfile.coverImg) {
    document.getElementById("coverImg").style.backgroundImage = `url('./images/${newProfile.coverImg}')`;
  }

  closeModal(); // ปิด modal หลังจากบันทึก
}

function editPic() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert("คุณไม่ได้เข้าสู่ระบบ");
    return;
  }

  const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
  const userProfile = profiles[currentUser.username] || {};

  const profileImgFile = document.getElementById("editProfileImgFile").files[0];
  const coverImgFile = document.getElementById("editCoverImgFile").files[0];

  const reader1 = new FileReader();
  const reader2 = new FileReader();

  // ทำงานเมื่อโหลดรูปโปรไฟล์เสร็จ
  reader1.onload = function () {
    const profileImgUrl = reader1.result;

    // ทำงานเมื่อโหลดรูป cover เสร็จ
    reader2.onload = function () {
      const coverImgUrl = reader2.result;

      const newProfile = {
        profileImg: profileImgUrl || userProfile.profileImg,
        coverImg: coverImgUrl || userProfile.coverImg,
      };

      profiles[currentUser.username] = { ...profiles[currentUser.username], ...newProfile }; // รวมข้อมูลใหม่เข้าไป
      localStorage.setItem("profiles", JSON.stringify(profiles));

      document.getElementById("profileImg").style.backgroundImage = `url('${newProfile.profileImg}')`;
      document.getElementById("coverImg").style.backgroundImage = `url('${newProfile.coverImg}')`;

      closePic(); // ปิด modal
    };

    if (coverImgFile) {
      reader2.readAsDataURL(coverImgFile);
    } else {
      reader2.onload(); // call manually if no file selected
    }
  };

  if (profileImgFile) {
    reader1.readAsDataURL(profileImgFile);
  } else {
    reader1.onload(); // call manually if no file selected
  }
}



function displayUserProfile() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert("คุณไม่ได้เข้าสู่ระบบ");
    return;
  }

  const profiles = getProfiles();
  const profile = profiles[currentUser.username];

  if (profile) {
    document.getElementById("profileName").textContent = profile.name || "ไม่มีชื่อ";
    document.getElementById("profileDesc").textContent = profile.description || "ไม่มีคำอธิบาย";
    document.getElementById("profileImg").style.backgroundImage = `url('${profile.profileImg || "./Pic/default-profile.webp"}')`;
    document.getElementById("coverImg").style.backgroundImage = `url('${profile.coverImg || "./Pic/default-cover.webp"}')`;
  }
}


function loadPlaylists() {
  const username = getCurrentUsername();
  const key = `playlists_${username}`;
  const playlists = JSON.parse(localStorage.getItem(key)) || [];
  const grid = document.getElementById("playlistGrid");
  grid.innerHTML = "";

  playlists.forEach((pl, index) => {
    const card = document.createElement("div");
    card.className = "playlist-card";
    card.style.textAlign = "center";
    card.innerHTML = `<div class="title clickable">${pl.name}</div>`;

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

    card.appendChild(deleteBtn);
    card.appendChild(renameBtn);
    card.addEventListener("click", () => {
      showPlaylistPopup(pl);
    });

    grid.appendChild(card);
  });

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
      loadPlaylists(); // โหลดเพลย์ลิสต์ใหม่
    }
  });

  grid.appendChild(createCard); // ใส่หลังสุดตรงนี้!
}

function deletePlaylist(index) {
  const username = getCurrentUsername();
  const key = `playlists_${username}`;
  const playlists = JSON.parse(localStorage.getItem(key)) || [];
  
  const confirmDelete = confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบเพลย์ลิสต์ ${playlists[index].name} ?`);
  if (!confirmDelete) return;

  playlists.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(playlists));
  loadPlaylists(); // โหลดใหม่

  // การลบเพลย์ลิสต์ไม่เกี่ยวข้องกับ audio player แต่ถ้าจำเป็นสามารถเพิ่มได้
  const slideWindow = document.getElementById("slideWindow");
  const audioPlayer = document.getElementById("audioPlayer");
  slideWindow.classList.remove("open");
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
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

  loadPlaylists(); // โหลดใหม่ให้ผู้ใช้เห็นผลลัพธ์
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
  loadPlaylists();
}

function loadFavorites() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  if (!currentUser || !currentUser.username) {
    alert("กรุณาเข้าสู่ระบบก่อนดูรายการโปรด");
    return;
  }

  const grid = document.getElementById("favoritesGrid");
  if (!grid) {
    console.warn("ไม่พบ element ที่ชื่อ favoritesGrid");
    return;
  }

  const favoritesKey = `favorites_${currentUser.username}`;
  const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  // ตรวจสอบว่ามีรายการโปรดหรือไม่
  if (favorites.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "playlist-card";
    emptyMessage.style.textAlign = "center";
    emptyMessage.innerHTML = `<div class="title clickable">ยังไม่มีรายการโปรด</div>`;

    emptyMessage.addEventListener("click", () => {
    createEmptyFavorites();
    });
    grid.appendChild(emptyMessage);
    return;
  }

  // ถ้ามีรายการโปรด จะแสดงผล
  grid.innerHTML = "";

  const card = document.createElement("div");
  card.className = "playlist-card";
  card.style.textAlign = "center";
  card.innerHTML = `<div class="title clickable">รายการโปรดของคุณ</div>`;
  
  card.addEventListener("click", () => {
    showFavoritePopup(); // ใช้แบบรวมทุกเพลง
  });
  
  grid.appendChild(card);
};

function showFavoritePopup() {
  const username = getCurrentUsername(); // ฟังก์ชันนี้คุณต้องมีอยู่แล้ว
  const key = `favorites_${username}`;
  const favoriteSongs = JSON.parse(localStorage.getItem(key)) || [];

  const popup = document.getElementById("favoritesPopup");
  const title = document.getElementById("favoritesTitle");
  const songList = document.getElementById("favoritesSongs");

  songList.innerHTML = "";
  title.textContent = "รายการเพลงโปรด";

  const table = document.createElement("table");
  table.className = "song-table";
  const tbody = document.createElement("tbody");

  if (Array.isArray(favoriteSongs) && favoriteSongs.length > 0) {
    favoriteSongs.forEach((song, index) => {
      const row = document.createElement("tr");
      const cell = document.createElement("td");

      cell.textContent = `${index + 1}. ${song.artist} - ${song.name}`;

      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.gap = "10px";
      buttonContainer.style.marginTop = "5px";

      // ปุ่ม: เล่นเสียง
      const playButton = document.createElement("button");
      playButton.innerHTML = `<i class="bi bi-play-fill"></i> เล่น`;
      playButton.classList.add("buttonClick", "btn", "btn-outline-primary");
      playButton.title = "เล่นเพลงนี้";
      playButton.addEventListener("click", () => {
        const username = getCurrentUsername();
        const favorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
        currentPlaylist = favorites; // ✅ กำหนด playlist ที่ใช้อยู่ให้เป็น favorites
        toggleWindow(playButton, song); // สมมุติว่าคุณมีฟังก์ชัน toggleWindow อยู่
      });

      buttonContainer.appendChild(playButton);
      cell.appendChild(buttonContainer);
      row.appendChild(cell);
      tbody.appendChild(row);
    });
  } else {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = "ยังไม่มีเพลงในรายการโปรด";
    row.appendChild(cell);
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  songList.appendChild(table);
  popup.style.display = "flex";
}

function createEmptyFavorites() {
  const isConfirmed = confirm("คุณต้องการสร้างรายการโปรดใหม่หรือไม่?");
  
  if (isConfirmed) {
    // ถ้าผู้ใช้กด "ใช่" จะไปหน้าหลัก
    window.location.href = "Home.html"; // เปลี่ยนเส้นทางไปยังหน้า Home
  } else {
    // ถ้าผู้ใช้กด "ไม่" จะไม่มีอะไรเกิดขึ้น
    return;
  }
}
function showPlaylistPopup(playlist) {
  currentPlaylist = playlist.songs || [];

  const popup = document.getElementById("playlistPopup");
  const title = document.getElementById("popupTitle");
  const songList = document.getElementById("popupSongs");

  title.textContent = playlist.name;
  songList.innerHTML = ""; // ล้างข้อมูลก่อน

  let songNumber = 0;

  // สร้าง table
  const table = document.createElement("table");
  table.className = "song-table";

  const tbody = document.createElement("tbody");

  if (
    playlist.songs &&
    Array.isArray(playlist.songs) &&
    playlist.songs.length > 0
  ) {
    playlist.songs.forEach((song, index) => {
      const row = document.createElement("tr");

      const cell = document.createElement("td");
      songNumber++;
      cell.textContent = `${songNumber}. ${song.artist} - ${song.name}`;

      // ปุ่มต่าง ๆ
      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.gap = "10px";
      buttonContainer.style.marginTop = "5px";
      buttonContainer.style.position;

      // const removeButton = document.createElement("span");
      // removeButton.textContent = "ลบ";
      // removeButton.classList.add("delete-btn");
      // removeButton.addEventListener("click", () => {
      //   removeFromQueue(index);
      // });
      // buttonContainer.appendChild(removeButton);

      // ปุ่ม: เล่นเสียง
      const playButton = document.createElement("button");
      playButton.innerHTML = `<i class="bi bi-play-fill"></i> เล่น`;
      playButton.classList.add("buttonClick", "btn", "btn-outline-primary", "me-2");
      playButton.title = "เล่นเพลงนี้";
      playButton.addEventListener("click", () => {
        toggleWindow(playButton, song);
      });
      buttonContainer.appendChild(playButton);

      const upButton = document.createElement("button");
      upButton.innerHTML = `<i class="bi bi-caret-up-fill"></i>`;
      upButton.classList.add("buttonClick", "btn", "btn-outline-secondary");
      upButton.title = "เลื่อนขึ้น";
      upButton.addEventListener("click", () => {
        moveSongUpInPlaylist(index, playlist);
      });
      buttonContainer.appendChild(upButton);

      const downButton = document.createElement("button");
      downButton.innerHTML = `<i class="bi bi-caret-down-fill"></i>`;
      downButton.classList.add("buttonClick", "btn", "btn-outline-secondary");
      downButton.title = "เลื่อนลง";
      downButton.addEventListener("click", () => {
        moveSongDownInPlaylist(index, playlist);
      });
      buttonContainer.appendChild(downButton);

      // ใส่ปุ่มลงใน cell และ row
      cell.appendChild(buttonContainer);
      row.appendChild(cell);
      tbody.appendChild(row);
    });
  } else {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = "เพลย์ลิสต์นี้ไม่มีเพลง";
    row.appendChild(cell);
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  songList.appendChild(table);

  popup.style.display = "flex";
}

function moveSongUpInPlaylist(index, playlist) {
  if (index > 0) {
    const songs = playlist.songs;
    [songs[index - 1], songs[index]] = [songs[index], songs[index - 1]];
    currentPlaylist = songs;

    savePlaylistToLocalStorage(playlist);
    showPlaylistPopup(playlist); // รีเฟรช
  }
}

function moveSongDownInPlaylist(index, playlist) {
  const songs = playlist.songs;
  if (index < songs.length - 1) {
    [songs[index + 1], songs[index]] = [songs[index], songs[index + 1]];
    currentPlaylist = songs;

    savePlaylistToLocalStorage(playlist);
    showPlaylistPopup(playlist); // รีเฟรช
  }
}

function savePlaylistToLocalStorage(updatedPlaylist) {
  const username = getCurrentUsername();
  const key = `playlists_${username}`;
  const savedPlaylists = JSON.parse(localStorage.getItem(key)) || [];

  const index = savedPlaylists.findIndex((p) => p.name === updatedPlaylist.name);
  if (index !== -1) {
    savedPlaylists[index] = updatedPlaylist;
    localStorage.setItem(key, JSON.stringify(savedPlaylists));
  }
}

function toggleWindow(button, song) {
  const slideWindow = document.getElementById("slideWindow");

  if (lastClickedButton !== button) {
    slideWindow.classList.add("open");
    lastClickedButton = button;
    playSong(song);
  } else {
    slideWindow.classList.toggle("open");
  }
}

let currentPlaylist = [];
let lastClickedButton = null;
let currentIndex = 0;
async function playSong(song) {
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSource = document.getElementById("audioSource");
  const songTitle = document.getElementById("songTitle");
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
    audioSource.src = "";
    audioPlayer.load();
    return;
  }

  try {
    songTitle.textContent = `${songToPlay.artist} - ${songToPlay.name}`;
    audioSource.src = songToPlay.url;
    await audioPlayer.load();
    await new Promise((resolve, reject) => {
      audioPlayer.oncanplaythrough = resolve; // รอให้โหลดเพลงเสร็จ
      audioPlayer.onerror = (error) => {
        reject("เกิดข้อผิดพลาดในการโหลดเพลง: " + error);
      };
    });
    await audioPlayer.play(); // เล่นเพลง
    lastPlayedSong = songToPlay; // เก็บเพลงล่าสุดที่เล่น
    currentIndex = currentPlaylist.findIndex(
      (s) => s.name === song.name && s.artist === song.artist
    );
  } catch (error) {
    console.error("Error loading audio:", error);
    return;
  }
  closePopup()
  closefavoritesPopup()
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

async function previousSong() {
  try {
    // ดึงข้อมูลเพลงจาก localStorage
    const songslist = JSON.parse(localStorage.getItem("songs")) || [];

    // เปลี่ยนค่า replay ของทุกเพลงใน currentPlaylist เป็น false
    currentPlaylist.forEach((song) => {
      const songIndex = songslist.findIndex(
        (s) => s.name === song.name && s.artist === song.artist
      );
      if (songIndex !== -1) {
        songslist[songIndex].replay = false; // เปลี่ยน replay เป็น false
      }
    });
    // อัปเดตข้อมูลใน localStorage
    localStorage.setItem("songs", JSON.stringify(songslist));

    if (currentIndex > 0) {
      currentIndex--;
      const prevSong = currentPlaylist[currentIndex];
      await playSong(prevSong);
    } else {
      alert("ไม่มีเพลงก่อนหน้า");
    }
  } catch (error) {
    console.error("Error loading audio:", error);
    return;
  }
}

async function nextSong() {
  try {
    // ดึงข้อมูลเพลงจาก localStorage
    const songslist = JSON.parse(localStorage.getItem("songs")) || [];

    // เปลี่ยนค่า replay ของทุกเพลงใน currentPlaylist เป็น false
    currentPlaylist.forEach((song) => {
      const songIndex = songslist.findIndex(
        (s) => s.name === song.name && s.artist === song.artist
      );
      if (songIndex !== -1) {
        songslist[songIndex].replay = false; // เปลี่ยน replay เป็น false
      }
    });

    // อัปเดตข้อมูลใน localStorage
    localStorage.setItem("songs", JSON.stringify(songslist));

    // ตรวจสอบว่า currentIndex อยู่ในขอบเขตที่ถูกต้อง
    if (currentIndex < currentPlaylist.length - 1) {
      currentIndex++; // ไปที่เพลงถัดไป
      const nextSong = currentPlaylist[currentIndex];
      await playSong(nextSong); // เล่นเพลงถัดไป
    } else {
      alert("ไม่มีเพลงถัดไป"); // หากถึงเพลงสุดท้ายแล้ว
    }
  } catch (error) {
    console.error("Error loading audio:", error);
  }
}

async function replay() {
  if (lastPlayedSong) {
    await toggleReplay(lastPlayedSong); // เปลี่ยนค่า replay ของเพลงปัจจุบัน
  } else {
    console.warn("ยังไม่มีเพลงเล่นอยู่!");
  }
}

async function toggleReplay(songObj) {
  const username = getCurrentUsername();
  const key = `playlists_${username}`;
  const playlists = JSON.parse(localStorage.getItem(key)) || [];
  let found = false;

  for (let playlist of playlists) {
    const songIndex = playlist.songs.findIndex(
      (song) => song.name === songObj.name && song.artist === songObj.artist
    );

    if (songIndex !== -1) {
      playlist.songs[songIndex].replay = !playlist.songs[songIndex].replay;
      localStorage.setItem(key, JSON.stringify(playlists));
      console.log(
        `กำลังเล่นซ้ำเพลง "${playlist.songs[songIndex].name}" (replay:${playlist.songs[songIndex].replay})`
      );

      const btn = document.getElementById("replayBtn");
      if (btn) {
        btn.classList.toggle("active", playlist.songs[songIndex].replay);
      }

      const audioPlayer = document.getElementById("audioPlayer");
      if (
        audioPlayer &&
        lastPlayedSong &&
        songObj.name === lastPlayedSong.name &&
        songObj.artist === lastPlayedSong.artist
      ) {
        audioPlayer.onended = playlist.songs[songIndex].replay
          ? async () => playSong(songObj)
          : async () => nextSong();
      }

      found = true;
      break;
    }
  }

  if (!found) {
    console.error("ไม่พบเพลงในข้อมูล!");
    console.log("กำลังหา:", songObj.name, "|", songObj.artist);
    console.log(
      "เพลงทั้งหมด:",
      playlists.flatMap((pl) => pl.songs.map((s) => `${s.name} - ${s.artist}`))
    );
  }
}

function closeSlideWindow() {
  const slideWindow = document.getElementById("slideWindow");
  slideWindow.classList.remove("open");
}

function closePopup() {
  document.getElementById("playlistPopup").style.display = "none";
}

function closefavoritesPopup() {
  document.getElementById("favoritesPopup").style.display = "none";
}

document.querySelector(".logout").addEventListener("click", logout);
function logout() {
  localStorage.removeItem("currentUser");
  setTimeout(() => {
    window.location.href = "index.html"; // เปลี่ยนหน้าไปยังหน้า login หลังจาก 1 วินาที
  }, 1000); // 1000 มิลลิวินาที = 1 วินาที
}



