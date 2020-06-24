class Header {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.headerMenu = this.header.querySelector('.main-nav');
        this.menuBtn = this.header.querySelector('.main-header__menu-btn');
        this.menuIcon = this.menuBtn.querySelector('.main-header__menu-icon--menu');
        this.crossIcon = this.menuBtn.querySelector('.main-header__menu-icon--cross');

        this.addHandlerForMenuBtn();
    }

    addHandlerForMenuBtn() {
        this.menuBtn.onclick = () => {
            this.headerMenu.classList.toggle('open');
            if(this.headerMenu.classList.contains('open')) {
                this.menuIcon.style.display = "none";
                this.crossIcon.style.display = "block";
            }else {
                this.crossIcon.style.display = "none";
                this.menuIcon.style.display = "block";
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", function() {
    var header = new Header();
});