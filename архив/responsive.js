 function toggleMenu() {
    const menu = document.getElementById("offcanvasMenu");
    const overlay = document.getElementById("overlay");
    const body = document.body;

    if (menu.style.width === "250px") {
      menu.style.width = "0";
      overlay.style.display = "none";
      body.classList.remove("menu-open");
    } else {
      menu.style.width = "250px";
      overlay.style.display = "block";
      body.classList.add("menu-open");
    }
  }
