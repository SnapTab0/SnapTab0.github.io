function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

// share btn

const shareBtn = document.getElementById('shareBtn')

shareBtn.addEventListener('click', event => {

  // Check for Web Share api support
  if (navigator.share) {
    // Browser supports native share api
    navigator.share({
      text: 'Shah Shah Digital Business Card Powered By Snaptab: ',
      url: 'https://snaptab0.github.io/seba/index.html'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
      .catch((err) => console.error(err));
  } else {
    // Fallback
    alert("The current browser does not support the share function. Please, manually share the link")
  }
});


// QR Code btn

const section = document.querySelector(".qrcode-btn"),
overlay = document.querySelector(".overlay"),
showBtn = document.querySelector(".show-modal"),
closeBtn = document.querySelector(".close-btn");

showBtn.addEventListener("click", () => section.classList.add("active"));

overlay.addEventListener("click", () =>
section.classList.remove("active")
);

closeBtn.addEventListener("click", () =>
section.classList.remove("active")
);

