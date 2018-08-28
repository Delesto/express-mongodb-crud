$(document).ready(function () {
    function flagError(which, message) {
        $('.validation-error.email-status').text(which === 'email' ? message : '');
        $('.validation-error.password-status').text(which === 'password' ? message : '');
    }

    $('#signin-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/signin',
            type: 'POST',
            data: $(this).find('input').serialize(), //Using urlencoded
            statusCode: {
                200: function (res) {
                    $('.auth-form input[type="email"]').removeClass('is-invalid');
                    $('.validation-error.email-status').text('');
                    $('.validation-error.password-status').text('');
                    $.each($('#signin').find('input'), function (i, input) {
                        input.value = '';
                    });
                    //redirect to page
                    document.location.pathname = '/';
                },
                400: function (res) {
                    if (res.responseJSON.message == 'Неверный пароль') {
                        flagError('password', res.responseJSON.message);
                    } else {
                        flagError('email', res.responseJSON.message);
                    }
                }
            }
        });
    });
});