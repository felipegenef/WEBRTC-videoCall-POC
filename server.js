const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// Configurar o roteamento padrão para a página principal
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Iniciar o servidor HTTP
const PORT = process.env.PORT || 3000;
http.listen(PORT, function () {
  console.log(`Servidor rodando na porta ${PORT}`);
});
io.on("connection", (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on("call", () => {
    // Encaminhar a mensagem de chamada para o outro usuário conectado
    socket.broadcast.emit("call");
  });

  socket.on("offer", (offer) => {
    // Encaminhar a oferta para o outro usuário conectado
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    // Encaminhar a resposta para o outro usuário conectado
    socket.broadcast.emit("answer", answer);
  });

  socket.on("hangup", () => {
    // Encaminhar a mensagem de encerramento para o outro usuário conectado
    socket.broadcast.emit("hangup");
  });

  socket.on("disconnect", () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});
