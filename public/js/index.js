$(document).ready(function() {
    /* Client js */

    //Close settings box
    $(document).click(function (e) {
        var container = $(".language-box-container");
        if (container.has(e.target).length === 0){
            hideLangs();
        } else {
            showLangs();
        }
    });

    function showLangs() {
        $('.language-box').animate({
            right: '-100%'
        }, 200, function() {
            $('.languages').animate({
                right: 0
            }, 200);
        });
    }

    function hideLangs() {
        $('.languages').animate({
            right: '-100%'
        }, 200, function() {
            $('.language-box').animate({
                right: '0'
            }, 200);
        });
    }

    $('.languages .btn').click(function(e) {
        if($(e.target).hasClass('btn-ru')) {
            document.cookie = 'lang=ru';
        } else {
            document.cookie = 'lang=eng';
        }
    })

    function changeLang(lang) {

    }
})