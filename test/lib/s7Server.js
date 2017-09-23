var snap7 = require('node-snap7');


function Server() {
    this.s7server = new snap7.S7Server();

    // Set up event listener
    this.s7server.on('event', function(event) {
        console.log(this.s7server.EventText(event));
    }.bind(this));

    // Create a new Buffer and register it to the server as DB1
    var db1 = new Buffer(100);
    for (var i = 0; i < db1.length; i++) {
        db1[i] = i;
    }

    this.start = function (bind) {
        this.s7server.RegisterArea(this.s7server.srvAreaDB, 1, db1);
        // Start the server
        this.s7server.StartTo(bind || '127.0.0.1');
    }.bind(this);

    this.stop = function () {
        this.s7server.Stop();
        this.s7server.UnregisterArea(this.s7server.srvAreaDB, 1);
    }.bind(this);

    return this;
}
if (module && module.parent) {
    module.exports = Server;
} else {
    var server = new Server();
    server.start();
}


