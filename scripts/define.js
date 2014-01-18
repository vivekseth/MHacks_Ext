SMALL_TICK_INT = 500
BIG_TICK_INT = -1;

var app = {}
app.db = null;
app.tracking = false;
app.log = {}
app.log.tracking = false;
app.log.hostname = null;
app.log.start_time = null;
app.log.end_time = null;
app.blocked_sites = [];
app.big_ticker = [];
app.small_ticker = [];