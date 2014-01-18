//desknotif.js

<script>
function notify() {
  var havePermission = window.webkitNotifications.checkPermission();
  if (havePermission == 0) {
    // 0 is PERMISSION_ALLOWED
    var notification = window.webkitNotifications.createNotification(
      'http://i.stack.imgur.com/dmHl0.png', //icon
      'ATTENTION!!', //icon
    'You have spent X amount of time on your list of watched websites.' //message
    );
    
    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");
      notification.close();
    }
    notification.show();
  } else {
      window.webkitNotifications.requestPermission();
  }
}  
</script>