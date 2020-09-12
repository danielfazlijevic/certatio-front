const socket = io("http://localhost:3000");

socket.on("welcome", (data) => {
  console.log(data);
  console.log("id korisnika je", socket.id);
  document.getElementById("player-id-paragraph").innerHTML =
    "Socket ID: " + socket.id;
});

const joinRoomBtn = document.querySelector("#join-room-btn");
const roomCodeInput = document.querySelector("#room-code");
const confirmUsernameBtn = document.querySelector("#confirm-username-btn");
const usernameInput = document.querySelector("#username-input");

//slanje unetog username-a serveru
confirmUsernameBtn.addEventListener("click", () => {
  socket.emit("createUsername", usernameInput.value);
});

//potvrda username
socket.on("usernameConfirmed", () => {
  document.getElementById("username-tab").style.display = "none";
  document.getElementById("join-tab").style.display = "flex";
});

//emitovanje zahteva za join
joinRoomBtn.addEventListener("click", () => {
  socket.emit("room:join", roomCodeInput.value);
  console.log("trying to join room");
});

//povratne informacije o kreiranoj sobi
socket.on("room:created", (data) => {
  console.log("You have joined room", data);

  document.getElementById("lobby").style.display = "none";
});

//povratne informacije o uspesnoj konekciji u sobu
socket.on("room:joined", (data) => {
  console.log("You have joined room", data);
  document.getElementById("room-name-display").innerHTML = "Room: " + data;
  document.getElementById("lobby").style.display = "none";
});

//informacije o novom korisniku u sobi u kojoj je trenutni korisnik
socket.on("room:userJoined", (userID) => {
  console.log("User", userID, "has joined the room.");
});

//notifikacija izlaska iz sobe
socket.on("room:userLeft", (userID) => {
  console.log("User", userID, "has left the room.");
});
