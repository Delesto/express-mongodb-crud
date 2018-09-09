$(document).ready(function () {
    /* Client js */

    //Close settings box
    $(document).click(function (e) {
        var container = $(".language-box-container");
        if (container.has(e.target).length === 0) {
            hideLangs();
        } else {
            showLangs();
        }
    });

    function showLangs() {
        $('.language-box').animate({
            right: '-100%'
        }, 200, function () {
            $('.languages').animate({
                right: 0
            }, 200);
        });
    }

    function hideLangs() {
        $('.languages').animate({
            right: '-100%'
        }, 200, function () {
            $('.language-box').animate({
                right: '0'
            }, 200);
        });
    }

    $('.languages .btn').click(function (e) {
        if ($(e.target).hasClass('btn-ru')) {
            document.cookie = 'lang=ru';
        } else {
            document.cookie = 'lang=eng';
        }
    });

    if ($('#user-settings').length) {
        $('#user-settings .save').click(function () {
            var data = new FormData();
                data.append('user-avatar', $('#user-avatar')[0].files[0]);
                data.append($('#userAboutText').attr('name'), $('#userAboutText').val());
                $.each($('#user-data-form').find('input'), function(index, input) {
                    data.append(input.name, input.value);
                })

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/user/settings',
                data: data,
                contentType: false,
                processData: false,
                statusCode: {
                    200: function () {
                        console.log('Success')
                    }
                }
            });
        })

    }
})