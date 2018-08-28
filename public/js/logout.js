$(document).ready(function() {
    $('.logout').submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: '/logout',
            type: 'POST',
            success: function() {
                document.location.pathname = '/';
            }
        });
    });
});