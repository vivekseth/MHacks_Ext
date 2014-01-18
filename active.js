function active(){
var totalms=0;
window.addEventListener('focus', function() {
    document.title = 'focused';
    
});

window.addEventListener('blur', function() {
    document.title = 'not focused';
});
}