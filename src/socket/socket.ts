import { io } from "../bin/start";

io.on("connection", (socket) => {
    socket.emit("welcome", "Server says hello.")
})