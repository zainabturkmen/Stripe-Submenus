import sublinks from "./data.js"

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const linkBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");

// hide/show sidebar

toggleBtn.addEventListener("click", ()=>{
    sidebarWrapper.classList.add("show")
});

closeBtn.addEventListener("click", ()=>{
    sidebarWrapper.classList.remove("show")
});

// set sidebar

sidebar.innerHTML = sublinks.map((item)=>{
    const {links, page} = item;
    return `<article> 
    <h4>${page}</h4>
    <div class="sidebar-sublinks">
    ${links
        .map((link)=>{
            return `<a href="${link.url}">
            <i class="${link.icon}"></i>${link.label}
            </a>`
    }).join("")}
    </div>
    </article>`
}).join("");

linkBtns.forEach((btn)=>{
    btn.addEventListener("mouseover", function(e){
        const text = e.currentTarget.textContent;
        const temBtn = e.currentTarget.getBoundingClientRect();
        const center = (temBtn.left + temBtn.right) / 2;
        const bottom = temBtn.bottom -3;


        const temPage =sublinks.find(({page})=>page === text);
        if (temPage) {
            const {page, links} = temPage
            submenu.classList.add("show");
            submenu.style.left = `${center}px`;
            submenu.style.top = `${bottom}px`;

            // optional
            let columns = "col-2";
            if(links.length === 3){
                columns = "col-3"
            };
            if(links.length > 3){
                columns = "col-4"
            };

            submenu.innerHTML = `
            <section>
            <h4>${page}</h4>
            <div class="submenu-center ${columns}">
            ${links.map((link)=>{
                return `<a href="${link.url}">
                <i class="${link.icon}"></i>${link.label}
                </a>`
            }).join("")}
            </div>
            </section>
            `
        };
    });
});

hero.addEventListener("mouseover", function(e){
    submenu.classList.remove("show");
});

nav.addEventListener("mouseover", function(e){
    if (!e.target.classList.contains("link-btn")) {
        submenu.classList.remove("show");
    };
});