const socket = io("http://localhost:3000");

socket.on("welcome", (data) => {
  console.log(data);
  console.log("id korisnika je", socket.id);
});

const createRoomBtn = document.querySelector("#create-room-btn");
const joinRoomBtn = document.querySelector("#join-room-btn");
const roomCodeInput = document.querySelector("#room-code");

//emitovanje zahteva za create
createRoomBtn.addEventListener("click", () => {
  socket.emit("room:create", "MilesGayne");
});

//emitovanje zahteva za join
joinRoomBtn.addEventListener("click", () => {
  socket.emit("room:join", roomCodeInput.value);
});


//povratne informacije o kreiranoj sobi
socket.on("room:created", (data) => {
  //   const roomCode = data.roomCode;
  console.log("You have joined room", data);
});

//informacije o novom korisniku u sobi u kojoj je trenutni korisnik
socket.on("room:userJoined", (userID) => {
  console.log("User", userID, "has joined the room.");
})