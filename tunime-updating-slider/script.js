
const swiper = new Swiper('.sWrapper', {
    // Parametrs
    init: false,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        740: {
            slidesPerView: 2
        }
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true,
        bulletActiveClass: 'swiper-pagination-bullet-active',
        bulletClass: 'swiper-pagination-bullet',
        bulletSize: '10px',
        bulletStyle: 'circle',
        bulletElement: 'span',
        hideOnClick: false,
        watchOverflow: true,
    },
});

let activeElement = {
    el: undefined,
    video: undefined,
    controls: undefined
};

swiper.on('slideChange', function () {
    if (activeElement) {
        activeElement.find('video')[0].pause();
    }
    activeElement = $(this.slides[this.activeIndex]);
    activeElement.find('video')[0].play();
});

swiper.on('resize', function () {
    if(this.params.slidesPerView == 2){
        swiper.destroy(true, true)
    }
});

swiper.on('init', function () {
    activeElement = $(this.slides[this.activeIndex]);
    console.log(activeElement.find('video')[0].play());
});

swiper.init();