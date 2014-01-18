//desknotif.js

function notify() {
  var havePermission = window.webkitNotifications.checkPermission();
  if (havePermission == 0) {
    // 0 is PERMISSION_ALLOWED
    var notification = window.webkitNotifications.createNotification(
      'http://i.stack.imgur.com/dmHl0.png', //icon
      'ATTENTION!!', //icon
    'You have spent X amount of time on your list of watched websites.' //message
    );
    
    //do something when they click the notifiction
    notification.onclick = function () {
      //open the settings to see stats?
      //window.open("google.com");
      notification.close();
    }
    notification.show();
  } else {
      window.webkitNotifications.requestPermission();
  }
} 