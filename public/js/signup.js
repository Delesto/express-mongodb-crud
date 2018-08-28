$(document).ready(function () {
    function flagError() {
        $('.auth-form input[type="email"]').addClass('is-invalid')
        $('.validation-error.email-status').text(res.responseJSON.message);
    }

    $('#signup-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/signup',
            type: 'POST',
            data: $(this).find('input').serialize(), //Using urlencoded
            statusCode: {
                200: function () {
                    $('.auth-form input[type="email"]').removeClass('is-invalid');
                    $('.validation-error.email-status').text('');
                    $.each($('#signup').find('input'), function (i, input) {
                        input.value = '';
                    });
                    document.location.pathname = '/';
                },
                400: function (res) {
                    flagError();
                },
                422: function (res) {
                    flagError();
                },
            }
        });
    });
});
