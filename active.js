window.addEventListener('focus', function() {
    document.title = 'focused';
});

window.addEventListener('blur', function() {
    document.title = 'not focused';
});