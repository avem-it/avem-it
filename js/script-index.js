
// Скрипт для главной страницы index.html


// Скрипт прокрутки при нажатии на стрелку "вниз"

document.getElementById('scrollButton').addEventListener('click', function() {
  // Определяем процентное значение прокрутки
  const percentage = 16; // Процент от высоты экрана
  const viewportHeight = window.innerHeight;
  const scrollAmount = viewportHeight * (percentage / 12);

  window.scrollBy({
    top: scrollAmount,  // Перемещение на расчетное количество пикселей
    behavior: 'smooth'  // Плавное перемещение
  });
});

// Скрипт модального окна обратной связи

document.addEventListener("DOMContentLoaded", function () {
// Получить модальное окно
var modal = document.getElementById("contactModal");

// Получить все кнопки с классом contactBtn
var btns = document.getElementsByClassName("contactBtn");

// Получить элемент <span>, который закрывает модальное окно
var span = document.getElementsByClassName("modal-content-exit-close")[0];

// Добавить обработчик события для каждой кнопки
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        modal.style.display = "block";
        document.body.classList.add("no-scroll");
    }
}

// Когда пользователь нажимает на <span> (x), закрыть модальное окно
span.onclick = function() {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
}

// Когда пользователь нажимает в любом месте за пределами модального окна, закрыть его
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
    }
}

// Валидация формы обратной связи
const form = document.getElementById('form');
const fields = [
    { id: 'company', errorMessage: 'Вы пропустили поле' },
    { id: 'name', errorMessage: 'Вы пропустили поле' },
    { id: 'email', errorMessage: 'Вы пропустили поле или ввели некорректный адрес электронной почты', validate: validateEmail },
    { id: 'phone', errorMessage: 'Вы пропустили поле' },
    { id: 'message', errorMessage: 'Вы пропустили поле' },
    { id: 'confirm', errorMessage: 'Вы должны согласиться на получение рассылки', type: 'checkbox' }
];

form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Останавливаем стандартное поведение формы

    let isValid = true;

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorSpan = document.getElementById(field.id + '-error');

        if (field.type === 'checkbox') {
            if (!input.checked) {
                showError(input, errorSpan, field.errorMessage);
                isValid = false;
            } else {
                hideError(input, errorSpan);
            }
        } else {
            if (input.value.trim() === '' || (field.validate && !field.validate(input.value))) {
                showError(input, errorSpan, field.errorMessage);
                isValid = false;
            } else {
                hideError(input, errorSpan);
            }
        }
    });

    if (isValid) {
        // Если форма валидна, отправляем данные
        form.classList.add('_sending');
        let formData = new FormData(form);
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Обработка успешной отправки
            document.getElementById('formContainer').style.display = 'none';
            document.getElementById('successMessage').style.display = 'flex';
            form.reset();
        } else {
            showModal('Ошибка при отправке формы. Попробуйте еще раз.');
        }
        form.classList.remove('_sending');
    } else {
        // Показываем сообщение, если форма содержит ошибки
        showModal('Введены некорректные данные');
    }
});

fields.forEach(field => {
    const input = document.getElementById(field.id);
    const errorSpan = document.getElementById(field.id + '-error');

    // Убираем ошибку при вводе текста
    if (field.type === 'checkbox') {
        input.addEventListener('change', function () {
            if (input.checked) {
                hideError(input, errorSpan);
            }
        });
    } else {
        input.addEventListener('input', function () {
            if (input.value.trim() !== '') {
                hideError(input, errorSpan);
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showError(input, errorSpan, message) {
    errorSpan.textContent = message;
    errorSpan.classList.add('visible');
    input.classList.add('error-border');
}

function hideError(input, errorSpan) {
    errorSpan.textContent = '';
    errorSpan.classList.remove('visible');
    input.classList.remove('error-border');
}

});

// Появление нижнего меню после того, как пользователь доматывает экран до него

document.addEventListener('DOMContentLoaded', function () {
const menu = document.querySelector('.header__menu-container-sticky');
const delay = 500; // Задержка в миллисекундах (2 секунды)

window.addEventListener('scroll', function () {
const menuPosition = menu.getBoundingClientRect().top;
const screenHeight = window.innerHeight;

if (menuPosition < screenHeight) {
  setTimeout(() => {
    menu.classList.add('visible');
  }, delay);
}
});
});


// В бургер-меню определение нахождения экрана пользователя (от чего бурегр-меню "отталкивается" сверху при появлении)

// document.addEventListener('DOMContentLoaded', () => {
//   const burgerCheckbox = document.querySelector('.burger-checkbox');
//   const menuList = document.querySelector('.menu-list');

//   burgerCheckbox.addEventListener('change', () => {
//     if (burgerCheckbox.checked) {
//       const scrollY = window.scrollY;
//       menuList.style.setProperty('--menu-start', `${scrollY}px`);
//     }
//   });
// });
