//desknotif.js

function notify(icon, title, desc) {
  var havePermission = window.webkitNotifications.checkPermission();
  if (havePermission == 0) {
    // 0 is PERMISSION_ALLOWED
    var notification = window.webkitNotifications.createNotification(
      icon, //icon url
      title, //message title
    desc //message
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

function intervalNotify(interval){
  notify('./interval icon.jpg', 'ATTENTION!!', 'You have spent ' + interval + ' minutes on your tracked websites.');
}