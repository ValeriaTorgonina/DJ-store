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

class Form {
    constructor(
        form = document.querySelector('.form'),
        formSuccess = document.querySelector('.form-success')
    ) {
        this.form = form;
        this.formSuccess = formSuccess;
        this.addHandlersForForm();
    }

    addHandlersForForm() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.form.hidden = true;
            this.formSuccess.hidden = false;
        })
    }
}

class Popup {
    constructor(
        closeBtns = [...document.querySelectorAll('.cross-btn')]
    ) {
        this.overlay = document.querySelector('.overlay');
        this.closeBtns = closeBtns;
        this.addHandlersForCloseBtns();
    }

    addHandlersForCloseBtns() {
        document.body.addEventListener('click', e => {
            let target = e.target;
            let currentTarget = e.currentTarget;
            let isCloseBtn = false;
            while(target !== currentTarget) {
                if(this.closeBtns.includes(target)) {
                    isCloseBtn = true;
                }
                if(isCloseBtn && target.classList.contains('popup')) {
                    return this.closePopup(target);
                }

                target = target.parentElement;
            }
        })
    }

    closePopup(popup) {
        popup.hidden = true;
        this.overlay.hidden = true;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const header = new Header();
    const form = new Form();
    const popup = new Popup([
        ...document.querySelectorAll('.cross-btn'),
        form.formSuccess.querySelector('.blue-btn')
    ]);
});