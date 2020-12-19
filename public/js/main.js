const menu = document.querySelector('.slide')
const menuBtn = document.querySelector('.menu-btn')
const darkModeToggle = document.querySelector('.dark-toggle')
const body = document.querySelector('body')

let darkMode = false
let menuOpen = false

menuBtn.addEventListener('click',()=>{
    if (!menuOpen){
        menuOpen = true
        menu.classList.add('open')
    } else {
        menuOpen = false
        menu.classList.remove('open')
    }
})

darkModeToggle.addEventListener('click',()=>{
    if (!darkMode){
        darkMode = true
        body.classList.add('dark')
        darkMode.classList.add('dark')
    } else {
        darkMode = false
        body.classList.remove('dark')
        darkMode.classList.remove('dark')
    }
})