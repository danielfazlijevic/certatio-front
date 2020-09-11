const socket = io("http://localhost:3000");

socket.on("welcome", (data) => {
  console.log(data);
  console.log("id korisnika je", socket.id);
});

const createRoomBtn = document.querySelector("#create-room-btn");

createRoomBtn.addEventListener("click", () => {
  socket.emit("room:create", "MilesGayne");
});

socket.on("room:created", (data) => {
  //   const roomCode = data.roomCode;
  console.log(data);

  socket.join(data);
  //   alert(`Room created, your code is ${roomCode}`);
});

socket.emit("join room", {
  code: "abc"
});