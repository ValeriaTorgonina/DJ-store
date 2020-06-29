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
                document.body.style = "overflow: hidden";
            }else {
                this.crossIcon.style.display = "none";
                this.menuIcon.style.display = "block";
                document.body.style = "overflow: auto";
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
        closeBtns = [...HTMLUtils.nodeListToArray(document.querySelectorAll('.cross-btn'))],
        openBtns = [...HTMLUtils.nodeListToArray(document.querySelectorAll('.callback-btn'))]
    ) {
        this.overlay = document.querySelector('.overlay');
        this.closeBtns = closeBtns;
        this.openBtns = openBtns;
        this.popups = [...HTMLUtils.nodeListToArray(document.querySelectorAll('.popup'))];
        this.addHandlerForOpenBtns();
        this.addHandlersForCloseBtns();
    }

    addHandlerForOpenBtns() {
        document.body.addEventListener('click', e => {
            let target = e.target;
            let currentTarget = e.currentTarget;
            let isOpenBtn = false;
            let btnName = null;

            while(target !== currentTarget) {
                if(this.openBtns.includes(target)) {                    
                    e.stopImmediatePropagation();
                    isOpenBtn = true;
                    btnName = target.dataset.name;
                    const popup = document.getElementById(btnName);
                    if(popup) {
                        return this.openPopup(popup);
                    }else {
                        return;
                    }
                }
                target = target.parentElement;
            }
        })
    }

    openPopup(popup) {
        popup.classList.add('active');
        popup.hidden = false;
        if(popup.getAttribute('id') === 'callback') {
            this.overlay.classList.add('active');
            this.overlay.hidden = false;
        }
    }

    addHandlersForCloseBtns() {
        document.body.addEventListener('click', e => {
            let target = e.target;
            let currentTarget = e.currentTarget;
            let isCloseBtn = false;
            let isPopup = false;
            while(target !== currentTarget) {
                if(this.closeBtns.includes(target)) {
                    isCloseBtn = true;
                }
                if(target.classList.contains('popup')) {
                    isPopup = true;
                }
                if(isCloseBtn && isPopup) {
                    return this.closePopup(target);
                }
                target = target.parentElement;
            }
            if(!isPopup) {
                this.popups.forEach(el => this.closePopup(el));
            }
        })
    }

    closePopup(popup) {
        popup.classList.remove('active');
        this.overlay.classList.remove('active');
        setTimeout(() => {
            popup.hidden = true;
            this.overlay.hidden = true;
        }, 500)
    }
}

class HTMLUtils {
    static nodeListToArray(elems) {
        return Array.prototype.map.call(elems, e => e)
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const header = new Header();
    const form = new Form();
    const popup = new Popup([
        ...HTMLUtils.nodeListToArray(document.querySelectorAll('.cross-btn')),
        form.formSuccess.querySelector('.blue-btn')
    ],[
        ...HTMLUtils.nodeListToArray(document.querySelectorAll('.callback-btn')),
        ...HTMLUtils.nodeListToArray(document.querySelectorAll('.circle-btn'))
    ]);

    const introSlider = new Swiper ('.intro-slider', {
        speed: 500,
        navigation: {
            nextEl: '#intro-next',
            prevEl: '#intro-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            }
        }
    });

    const imgSlider = new Swiper ('.img-slider', {
        effect: 'fade',
        speed: 700,
        navigation: {
            nextEl: '#intro-next',
            prevEl: '#intro-prev',
        },
    });
});