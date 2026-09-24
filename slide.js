// Get elements
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');

// Toggle sidebar visibility when hamburger is clicked
menuIcon.addEventListener('click', (event) => {
    event.stopPropagation();  // Prevent event from propagating to the document
    menuIcon.classList.toggle('open')
    sidebar.classList.toggle('open');  // Toggle the sidebar open/close
});

// Close sidebar when clicking anywhere outside the sidebar or hamburger icon
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && event.target !== menuIcon) {
        sidebar.classList.remove('open');
    }
});

// const menuIcon = document.getElementById('menu-icon');

// menuIcon.addEventListener('click', (event) => {
//   event.stopPropagation();  // ป้องกันการส่ง event ไปยัง document
//   menuIcon.classList.toggle('open');  // เพิ่มหรือลบคลาส 'open'
// });


  
