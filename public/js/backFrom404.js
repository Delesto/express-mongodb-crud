$(document).ready(function() {
    /* Client js */
    var errorBack = document.querySelector('.error-back');
    errorBack.addEventListener('click', function() {
        window.history.back();
    });
})