const users = [
    {
      username: "john123",
      password: "123", // *ไม่ปลอดภัยในระบบจริง*
      isFirstLogin: true,
      preferredGenre: ["rnb"],
      preferredMood: ["sad"],
      playlists: [],
      favorites: [],
      queue: [],
      
    },
    {
      username: "alex01",
      password: "1234", 
      isFirstLogin: false,
      preferredGenre: ["HipHop", "rnb"],
      preferredMood: ["sad", "chill"], 
      playlists: [],
      favorites: [],
      queue: [],
    }
];

// ข้อมูลโปรไฟล์
const profiles = {
  "john123": {
    name: "John",
    description: "A passionate user",   
    profileImg: "./Pic/john-profile.jpg",
    coverImg: "./Pic/john-cover.jpg"
  },
  "alex01": {
    name: "Alex",
    description: "A music lover",
    profileImg: "./Pic/alex-profile.webp",
    coverImg: "./Pic/alex-cover.jpg"
  }
};

// เก็บลง localStorage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
}

if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify(profiles));
}

  // โหลด users จาก localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  function getProfiles() {
    return JSON.parse(localStorage.getItem("profiles")) || {};
  }
  
  // บันทึก users
  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function saveProfiles(username, profileData) {
    const profiles = getProfiles();
    profiles[username] = profileData;
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }
  
  // เข้าสู่ระบบ
  function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    const users = getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (!user) {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      return;
    }
  
    // เก็บข้อมูลผู้ใช้ที่เข้าสู่ระบบ
    localStorage.setItem("currentUser", JSON.stringify(user));
  
    // โหลดโปรไฟล์ผู้ใช้
    const profiles = getProfiles();
    const profile = profiles[username];
  
    if (!profile) {
      alert("ไม่พบโปรไฟล์ผู้ใช้");
      return;
    }
  
    // บันทึกโปรไฟล์ที่โหลดจาก localStorage ลงใน UI (สามารถเพิ่มโค้ดแสดงโปรไฟล์ที่นี่)
    document.getElementById("profileName").textContent = profile.name;
    document.getElementById("profileDesc").textContent = profile.description;
    // ... ส่วนที่เหลือ เช่น รูปโปรไฟล์
  
    if (user.isFirstLogin) {
      user.isFirstLogin = false;
      saveUsers(users); // อัปเดตสถานะ
      window.location.href = "./Page/Form.html"; // แบบสอบถาม
    } else {
      window.location.href = "Home.html"; // ไปหน้า Home
    }
  }
  
  
  // สำหรับ logout (ถ้าคุณจะใช้ใน Home หรือ Profile)
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  }
  
  // สำหรับตรวจ role
  function getCurrentUserRole() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user?.role || null;
  }
  
