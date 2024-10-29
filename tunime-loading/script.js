let completeAnimationBG = false;

const a1 = anime({
    targets: '.page-loading > .background > .image',
    backgroundPosition: ['50% 0%', '50% 100%'], // Начальная и конечная позиции
    easing: 'linear', // Линейная анимация для плавного движения
    duration: 40000, // Длительность анимации в миллисекундах
    // loop: true // Зацикливание анимации
    complete: () => {
        completeAnimationBG = true;
    }
});

$('.page-loading').on('click', function () {
    a1.pause();
    if (!completeAnimationBG) {

        const target = {
            translateY: 0 // Начальное значение translateY
        };

        const tl = anime.timeline({
            easing: 'easeInOutCubic',
            duration: 1000
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
                // Получаем текущее значение translateY из целевых свойств анимации
                const currentTranslateY = target.translateY + 'dvh';

                // Применяем текущее значение translateY к элементу
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
                $(`.page-loading`).css("--s-events", `none`);
            }
        }, 500);
    }

});