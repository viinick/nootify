var app = require("express")();
var http = require("http").Server(app);

var io = require("socket.io")(http);
const port=process.env.PORT || 3000;

var Usercounter = 0;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  Usercounter = Usercounter + 1;
  io.emit("user", Usercounter);
  console.log("a user is connected");
  socket.on("disconnect", function() {
    Usercounter = Usercounter - 1;
    io.emit("user", Usercounter);
    console.log("user disconnected");
  });

  socket.on("audioMessage", function(msg) {
    io.emit("audioMessage", msg);
  });
});

http.listen(port, function() {
  console.log("listening to port:3000");
});
