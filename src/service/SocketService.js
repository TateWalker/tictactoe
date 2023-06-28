import { io } from "socket.io-client";
class SocketService {
  socket = null;

  connect() {
    return new Promise((resolve, reject) => {
      this.socket = io("localhost:4242");
      if (!this.socket) {
        console.log("No socket, rejecting");
        return reject();
      }
      this.socket.on("connect", () => {
        console.log("Connected to socket");
        resolve(this.socket);
      });
      this.socket.on("connect_error", (err) => {
        console.log("Socket connection error");
        reject(err);
      });
    });
  }
}

export default new SocketService();
