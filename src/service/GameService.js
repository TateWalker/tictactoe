class GameService {
  socket = null;

  async joinGameRoom(socket, roomId, isHost, name) {
    return new Promise((resolve, reject) => {
      socket.emit("join_game", { roomId, isHost, name });
      socket.on("room_joined", () => resolve(true));
      socket.on("room_join_error", ({ error }) => reject(error));
      socket.on("room_doesnt_exist", ({ error }) => reject(error));
    });
  }

  async updateGame(socket, board) {
    socket.emit("update_game", { board });
  }

  async onGameUpdate(socket, listener) {
    socket.on("on_game_update", ({ board }) => {
      listener(board);
    });
  }

  async onUserJoined(socket, listener) {
    socket.on("on_user_joined", ({ name }) => {
      console.log(name);
      listener(name);
    });
  }

  async updateOpponent(socket, opponent) {
    socket.emit("update_opponent", { opponent });
  }

  async onUpdatedOpponent(socket, listener) {
    socket.on("on_updated_opponent", ({ opponent }) => {
      listener(opponent);
    });
  }

  async startGame(socket, gameData) {
    socket.emit("start_game", gameData);
  }

  async onGameStarted(socket, listener) {
    socket.on("game_started", ({ gameData }) => {
      console.log(gameData);
      listener(gameData);
    });
  }
  async playTurn(socket, board) {
    socket.emit("play_turn", { board });
  }

  async onCategoryChanged(socket, listener) {
    socket.on("category_changed", ({ icebreaker }) => {
      listener(icebreaker);
    });
  }

  async playTurn(socket, board, user) {
    socket.emit("play_turn", { board, user });
  }

  async onTurnPlayed(socket, listener) {
    socket.on("on_turn_played", ({ board }) => {
      listener({ board });
    });
  }

  async handleEndRound(socket, board) {
    socket.emit("end_round", board);
  }

  async onRoundEnded(socket, listener) {
    socket.on("round_ended", (board) => {
      listener(board);
    });
  }

  async handleNewRound(socket, icebreaker) {
    socket.emit("new_round", icebreaker);
  }

  async onNewRound(socket, listener) {
    socket.on("new_round_started", (icebreaker) => {
      listener(icebreaker);
    });
  }

  async handleEndSession(socket) {
    socket.emit("end_session");
  }

  async onSessionEnded(socket, listener) {
    const x = true;
    socket.on("session_ended", (x) => {
      listener(x);
    });
  }
}

export default new GameService();
