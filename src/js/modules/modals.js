const modals = () => {
    let btnPressed = false;
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {

        const triggers = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        triggers.forEach((items) => {
            items.addEventListener('click', (e) => {
                btnPressed = true;
                if (e.target) {
                    e.preventDefault();
                }

                if(destroy){
                    items.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block";
                document.body.style.marginRight = `${scroll}px`
                //document.body.style.overflow = "hidden";
                document.body.classList.add('modal-open');
            });
        })

        close.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.marginRight = `0px`
            // document.body.style.overflow = "";
            windows.forEach(item => {
                item.style.display = 'none';
                document.body.style.marginRight = `0px`
            });
            document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                //document.body.style.overflow = "";
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                document.body.classList.add('modal-open');
                document.body.classList.remove('modal-open');
            }
        })
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector){
        window.addEventListener('scroll', ()=>{
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)){
                document.querySelector(selector).click();
            }
        })
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let  scroll = calcScroll();
                document.body.style.marginRight `${scroll}px`
            }

        }, time);
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)
    openByScroll('.fixed-gift');

   // showModalByTime('.popup-consultation', 5000);


}

export default modals;