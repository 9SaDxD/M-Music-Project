

function getUsers() {
  try {
    // ดึงข้อมูลจาก localStorage
    const users = JSON.parse(localStorage.getItem("users"));

    // ตรวจสอบว่าข้อมูลที่ดึงมาเป็นอาเรย์และไม่เป็น null
    if (Array.isArray(users)) {
      return users;
    } else {
      console.error("ข้อมูลใน localStorage ไม่ใช่อาเรย์ที่ถูกต้อง");
      return [];  // คืนค่าเป็นอาเรย์ว่างหากข้อมูลไม่ถูกต้อง
    }
  } catch (error) {
    // ถ้าเกิดข้อผิดพลาดในการแปลงข้อมูล (เช่นข้อมูลไม่สามารถ parse ได้)
    console.error("เกิดข้อผิดพลาดในการอ่านข้อมูลจาก localStorage:", error);
    return [];  // คืนค่าเป็นอาเรย์ว่างในกรณีเกิดข้อผิดพลาด
  }
}

    function getProfiles() {
    return JSON.parse(localStorage.getItem("profiles")) || {};
  }

  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function saveProfiles(username, profileData) {
    const profiles = getProfiles();
    if (!profiles[username]) {
      profiles[username] = profileData;
    }
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }
  

  function register(event) {
    event.preventDefault(); // ป้องกัน reload
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value;
    // const role = document.getElementById("role").value;
    // const mood = document.getElementById("mood").value;
    // const type = document.getElementById("type").value;
  
    if (!username || !password) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
  
    const users = getUsers();
  
    if (users.find((u) => u.username === username)) {
      alert("ชื่อผู้ใช้นี้มีอยู่แล้ว");
      return;
    }
  
    // เพิ่มข้อมูลผู้ใช้
    users.push({
      username,
      password: password,  // เข้ารหัสรหัสผ่าน
      isFirstLogin: true,
      preferredGenre: [],
      preferredMood: [],
    });
  
    saveUsers(users);
  
    // สร้างโปรไฟล์เริ่มต้นให้ผู้ใช้ใหม่
    const profiles = getProfiles();
    profiles[username] = {
      name: username, // ชื่อเริ่มต้นเป็นชื่อผู้ใช้
      description: "คำอธิบายเริ่มต้น", // คำอธิบายเริ่มต้น
      profileImg: "./Pic/default-profile.webp", // ใช้โปรไฟล์เริ่มต้น
      coverImg: "./Pic/default-cover.webp" // ใช้ cover เริ่มต้น
    };
  
    saveProfiles(username, profiles[username]); // บันทึกโปรไฟล์
  
    alert("สมัครสมาชิกสำเร็จ!");
    window.location.href = "login.html"; // ไปหน้าเข้าสู่ระบบ 
  }