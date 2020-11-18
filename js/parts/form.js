function form() {
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
}

module.exports = form;