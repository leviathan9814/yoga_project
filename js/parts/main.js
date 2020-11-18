window.addEventListener("DOMContentLoaded", function() {

    "use strict";

    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }
    
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", function (event) {
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = "2020-05-01";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));
        // hours = Math.floor((t/1000/60/60) % 24),
        // days = Math.floor((t/(1000*60*60*24)))

        return {
            "total" : t,
            "hours" : hours,
            "minutes" : minutes,
            "seconds" : seconds
        };
    }

     function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    //Modal

    let more = document.querySelector(".more"),
    overlay = document.querySelector(".overlay"),
    close = document.querySelector(".popup-close");

    more.addEventListener("click", function() {
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden"; //Забороняєм прокрутку сторінки, поки відкрите модальне вікно
    });

    close.addEventListener("click", function() {
        overlay.style.display = "none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";  // Все працює
    });


    // Form

    let message = {
        loading: 'Загрузка...',       // саме вона буде показуватися користувачу, коли запрос ще не обробився
        success: 'Спасибо! Скоро мы с вами свяжемся!', // коли вже обробився
        failure: 'Что-то пошло не так...' // коли сталась помилка
    };

    let form = document.querySelector('.main-form'),  //отримали саму форму
        input = form.getElementsByTagName('input'),  //всі інпути з цієї форми
        statusMessage = document.createElement('div');  //створення елементу для повідомлення статусу

        statusMessage.classList.add('status');  // стилістика яка є в css

    form.addEventListener('submit', function(event) {   // submit - підтвердження нашої форми, працює коли форма відправляється
        event.preventDefault();  // щоб сторінка не перезагружалась
        form.appendChild(statusMessage); // поміщаємо новий елемент в нашу форму

        let request = new XMLHttpRequest();  //новий конструктор з обєктом XMLHT...
        request.open('POST', 'Yoga/server.php'); // настройки нашого запросу
        // request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // в JSON формате
        request.setRequestHeader("Content-type", "application/x-www-form-urlencode"); // настройки http запроса
            
    
        let formData = new FormData(form);  //Получаєм всі дані які записав користувач в наші інпути, створює структуру в формі ключ - значення

        // let obj = {};
        // formData.forEach(function(value, key) {
        //     obj[key] = value;                        //// в JSON формате
        // });
        // let json = JSON.stringify(obj);

        request.send(formData); //(json)   // відправляємо всі дані на сервер

        request.addEventListener('readystatechange', function() {  //ready... щоб слідкувати за змінами нашого запросу
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;   // каже, що загружається
            } else if(request.readyState === 4 && request.status == 200) { //якщо наш запрос вже в 4 состоянии і получает код 200(все хорошо)
                statusMessage.innerHTML = message.success;  // каже, що все добре, можна добавляти контент на сторінку, міняти його і тд, замість обєкта message ми моголи би анімаційні блоки з загрузкою, полоску з загрузкою(progress bar), 
            } else {
                statusMessage.innerHTML = message.failure; // каже, що сталась якась помилка
            }
        });

        for (let i = 0; i < input.length; i++) {  // завдяки циклу очищаємо інпут
            input[i].value = '';  // беремо кожний інпут з його значенням(value) і перетворюємо в пусту строку
        }
    });

//Form 2

    // let formTwo = document.querySelector(".contact-form"),
    //     inputOne = formTwo.getElementsByTagName("input"),
    //     statusMessageOne = document.createElement("div");

    //     statusMessageOne.classList.add("status");

    // formTwo.addEventListener("submit", function(e) {
    //     e.preventDefault();
    //     formTwo.appendChild(statusMessageOne);

    //     let req = new XMLHttpRequest();
    //         req.open("POST", "Yoga/server.php");
    //         req.setRequestHeader("Content-type", "application/x-www-form-urlencode");

    //     let formDataTwo = new FormData(formTwo);

    //     req.send(formDataTwo);

    //     req.addEventListener("readystatechange", function() {
    //         if(req.readyState < 4) {
    //             statusMessageOne.innerHTML = message.loading;
    //         } else if(req.readyState === 4 && req.status == 200) {
    //             statusMessageOne.innerHTML = message.success;
    //         } else {
    //             statusMessageOne.innerHTML = message.failure;
    //         };

    //         for ( let i = 0; i < inputOne.value; i++) {
    //             inputOne[i].value = "";
    //         }
    //     });
    // });
    
    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");

        showSlides(slideIndex);

    function showSlides(n) {
        
        if(n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = "none");   // ета запись современа
        // for (let i = 0; i < slides.length; i++) {          // одно и тоже
        //     slides[i].style.display = "none";
        // }
        dots.forEach((item) => item.classList.remove("dot-active"));

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("dot-active");
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener("click", function() {
        plusSlides(-1);
    });

    next.addEventListener("click", function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener("click", function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains("dot") && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    //Calc

    let persons = document.querySelectorAll(".counter-block-input")[0],
        restDays = document.querySelectorAll(".counter-block-input")[1],
        place = document.getElementById("select"),
        totalValue = document.getElementById("total"),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener("change", function() {
            personsSum = +this.value;
            total = (daysSum + personsSum)* 4000;

            if(restDays.value == "") {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });


        restDays.addEventListener("change", function() {
            daysSum = +this.value;
            total = (daysSum + personsSum)* 4000;

            if(persons.value == "") {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener("change", function() {
            if (restDays.value == "" || persons.value == "") {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }

        });

});