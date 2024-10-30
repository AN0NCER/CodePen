import { LTransition } from "./mod_transition.js";

let animatedBG = false;

LTransition.Loading.Parameters([
    { name: "image", value: `url(../resources/map.jpg)` },
    { name: "image-size", value: `cover` },
    { name: "image-postion", value: `center top` },
    { name: "progress-color", value: `#19140e` },
    { name: "background", value: `rgba(0, 0, 0, 0)` },
    { name: "animation-display", value: `block` },
    { name: "animation-background", value: `linear-gradient(180deg, rgba(1, 1, 1, 0.85) 50 %, transparent)` },
]);

const imageAnimation = anime({
    targets: '.page-loading > .background > .image',
    backgroundPosition: ['50% 0%', '50% 100%'], // Начальная и конечная позиции
    easing: 'linear', // Линейная анимация для плавного движения
    duration: 35000, // Длительность анимации в миллисекундах
    // loop: true // Зацикливание анимации
    complete: () => {
        animatedBG = true;
    }
});

const animation = (resolve) => {
    try {
        imageAnimation.pause();
        if (!animatedBG) {
            const target = {
                translateY: 0 // Начальное значение translateY
            };

            const tl = anime.timeline({
                easing: 'easeInOutCubic',
                duration: 1000,
                complete: () => {
                    return resolve(true);
                }
            });

            tl.add({
                targets: '.page-loading > .background > .image',
                backgroundPosition: [$('.page-loading > .background > .image').css('backgroundPosition'), '50% 100%'],
                duration: 800,
            });

            tl.add({
                targets: '.page-loading > .background',
                top: ['0%', '-100%'],
                duration: 500,
            }, 400);

            tl.add({
                targets: target,
                translateY: -100,
                update: function (anim) {
                    const currentTranslateY = target.translateY + 'dvh';
                    $('.page-loading > .load-content > .loader').css({ transform: `translateY(${currentTranslateY})` });
                    $('.page-loading > .load-content > .wrapper').css({ transform: `translateY(${currentTranslateY})` });
                },
                duration: 850,
            }, 0);

            tl.add({
                targets: '.page-loading > .load-content > .wrapper',
                opacity: 0,
                duration: 850,
            }, 0);

            tl.add({
                targets: '.page-loading > .animation',
                translateY: ['50%', '-100%'],
                duration: 500,
                begin: () => {
                    LTransition.Loading.Parameters("point-events", `none`);
                }
            }, 500);
        } else {
            anime({
                targets: '.page-loading',
                opacity: 0,
                easing: 'linear',
                duration: 500,
                complete: () => {
                    return resolve(true);
                }
            });
        }
    } catch {
        return resolve(true);
    }
}

export default {
    on: {
        load: () => {

        }
    },
    callback: {
        load: () => {

        }
    },
    animation
}