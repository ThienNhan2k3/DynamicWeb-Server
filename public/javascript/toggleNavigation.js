var menu_btn = document.querySelector("#menu-btn")
var sidebar = document.querySelector("#sidebar")
var containers = document.querySelectorAll(".dynamic-container")
menu_btn.addEventListener("click", () => {
    sidebar.classList.toggle("active-sidenav");
    console.log(sidebar);
    containers.forEach(container=>{
        container.classList.toggle("active-cont")
        console.log(container);
        console.log(container.classList);
    });
    menu_btn.classList.toggle("active");
});


