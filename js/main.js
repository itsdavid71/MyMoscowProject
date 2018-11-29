$(document).ready(function() {
    // $(window).resize(function() {
    //     var wrapperwidht = $('.wrapper-main').width();
    //     console.log(wrapperwidht);
    // });

    // jQuery Validate пропускает требования и отправляет форму
    $("#contact-form").validate({
        rules:{
           name:{
             required: true,
             minlength: 4,
             maxlength: 56,
           },
           email:{
             required: true,
             email: true,
             minlength: 6,
             maxlength: 32,
           },
        },
        messages:{
          name:{
            required: "<br>Это поле обязательно для заполнения",
            minlength: "<br>Логин должен быть минимум 4 символа",
            maxlength: "<br>Максимальное число символов - 16",
        },
            email:{
            required: "<br>Это поле обязательно для заполнения",
            minlength: "<br>Почта должна быть минимум 6 символов",
            email: "<br>Неправильный формат (ex: Hello@gmail.com)",
            maxlength: "<br>Почта должна быть не более 36 символов",
            },
        message:{
            required: "<br>Это поле обязательно для заполнения",
            minlength: "<br>Сообщение должно быть минимум 6 символов",
            maxlength: "<br>Сообщение должно быть не более 255 символов",
        },
        }
     });

    $('#login, #pass').focusin(function() {
        var focus = $(this).next();
            $(focus).animate({
                fontSize: '10px',
                top: '-70%'
            },100);
            // if (inValue == 0) {
            //     $('span').animate ({
            //         left: '7%',
            //         top: '15%',   
            //         fontSize: '15px'
            //     })
            // }
        });


    $('#login, #pass').focusout(function() {
        var outvalue = $(this).val();
        if (outvalue  == "") {
            var text = $(this).next();
            $(text).animate({
                fontSize: '15px',
                top: '10%'
            },100);
        }   
    })


    //Получить значение атрибута


    $('[type=submit]').click(function() {
       var passType = $('#pass').attr('type');
       console.log(passType);
    });

    $('.menu-btn').click(function() {
        $('.menu-mobile').slideToggle(500);
        $('.menu-btn-stick:nth-child(2)').toggleClass('opacity');
        $('.menu-btn-stick:nth-child(1)').toggleClass('stick-rotate-top');
        $('.menu-btn-stick:nth-child(3)').toggleClass('stick-rotate-bottom');
    });


    $('.contact-form-success-window-close').click(function() {
        $('.contact-form-success-area').css('display', 'none');
        $('.contact-form-success-window-text').html('');
        console.log(123);
    });

    $('#contact-form').submit(function() {
        // Валидируем форму именно здесь и сохраняем результат проверки
        var result = $("#contact-form").validate({
            rules:{
               name:{
                 required: true,
                 minlength: 4,
                 maxlength: 56,
               },
               email:{
                 required: true,
                 email: true,
                 minlength: 6,
                 maxlength: 32,
               },
            },
            messages:{
              name:{
                required: "<br>Это поле обязательно для заполнения",
                minlength: "<br>Логин должен быть минимум 4 символа",
                maxlength: "<br>Максимальное число символов - 16",
            },
                email:{
                required: "<br>Это поле обязательно для заполнения",
                minlength: "<br>Почта должна быть минимум 6 символов",
                email: "<br>Неправильный формат (ex: Hello@gmail.com)",
                maxlength: "<br>Почта должна быть не более 36 символов",
                },
            message:{
                required: "<br>Это поле обязательно для заполнения",
                minlength: "<br>Сообщение должно быть минимум 6 символов",
                maxlength: "<br>Сообщение должно быть не более 255 символов",
            },
            }
         });

        // Полезная информация о результатах валидации (можно удалить)
        console.log(result);

        // Проверяем на наличие ошибок
        if (result.errorList.length > 0) {
            return false;
        }
        var user_name = $('#name').val();
        var user_email = $('#email').val();
        var user_message = $('#message').val();
        
        var data = {
            name: user_name,
            email: user_email,
            message: user_message
        }
        data = JSON.stringify(data);
        console.log(data);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'send_message.php', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(data);

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status == 200) {
                $('.contact-form-success-area').css('display', 'block');
                $('.contact-form-success-window-text').append('<p>' + xhr.responseText + '</p>');
                
            }
        }
        return false;
    });
});
// функция открытия всплывающих окон
function popUp(openBlock) {
    $(openBlock).fadeIn(300);
}

function closed(closeBlock) {
    $(closeBlock).fadeOut(300);
}
// Пояснение к ДЗ - отъезжающий текст
// НЕ PLACEHOLDER. Сделать див с текстом . Использовать label. $(..).focusin(function(){}
// 
// При focusout сделать проверку с помощью value 
// 




