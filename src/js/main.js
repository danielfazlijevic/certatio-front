import io from "socket.io-client";

import {
  generateLanes
} from "./generators";

import {
  refreshUI
} from "./laneManagement";

const socket = io("localhost:3000");

const joinRoomBtn = document.querySelector("#join-room-btn");
const roomCodeInput = document.querySelector("#room-code");
const confirmUsernameBtn = document.querySelector("#confirm-username-btn");
const usernameInput = document.querySelector("#username-input");
const startGameBtn = document.querySelector("#start-game-btn");
const numberOfLanesInput = document.querySelector("#number-of-lanes-input");

const gameWrapper = document.querySelector("#game");

const codeInput = document.querySelector("#typed-code");

function startEventListeners() {
  codeInput.addEventListener("input", onInput);
  console.log(codeInput);
}

function onInput(e) {
  const typedCode = e.target.value;
  const roomByCode = socket.gameState.lanes.find(
    (lane) => lane.code.toUpperCase() === typedCode.toUpperCase()
  );
  // Room code typed
  if (roomByCode) {
    console.log("Moving into lane", roomByCode);
    socket.emit("code:typed", typedCode);
    e.target.value = "";
  }
}
// TODO: Premestiti ovu funkciju da se pokrene tek kad se startuje igra
startEventListeners();

socket.username = null;
socket.currentRoom = null;
socket.gameState = null;

socket.on("welcome", (data) => {
  console.log(data);
  console.log("id korisnika je", socket.id);
  console.log(socket);
  document.getElementById("player-id-paragraph").innerHTML =
    "Socket ID: " + socket.id;
});

//slanje unetog username-a serveru
confirmUsernameBtn.addEventListener("click", () => {
  socket.emit("createUsername", usernameInput.value);
});

socket.on("game:signalAdmin", () => {
  document.getElementById("number-of-lanes-input").style.display = "block";
  document.getElementById("start-game-btn").style.display = "block";
  document.getElementById("host-or-player-text").innerHTML = "Number of lanes (2-6):";
  numberOfLanesInput.focus();
});

//startovanje igre admin
startGameBtn.addEventListener("click", () => {
  socket.emit("game:start", numberOfLanesInput.value);
});

socket.on("game:started", () => {
  document.getElementById("pre-game-lobby").style.display = "none";
  codeInput.style.visibility = "visible";
  codeInput.focus();
});

//potvrda username
socket.on("usernameConfirmed", (username) => {
  document.getElementById("username-tab").style.display = "none";
  document.getElementById("join-tab").style.display = "flex";
  socket.username = username;
});

socket.on("createLanes", (gameState) => {
  console.log("Generating lanes");
  const lanesElement = generateLanes(gameState.lanes.length);
  gameWrapper.appendChild(lanesElement);

  refreshUI(gameState);
  socket.gameState = gameState;
});

socket.on("refreshGameState", (gameState) => {
  console.log("primio zahtev da refreshujem");
  refreshUI(gameState);
  socket.gameState = gameState;
});

//emitovanje zahteva za join
joinRoomBtn.addEventListener("click", () => {
  socket.emit("room:join", roomCodeInput.value);
});

//povratne informacije o uspesnoj konekciji u sobu
socket.on("room:joined", (roomID) => {
  console.log("You have joined room", roomID);
  socket.currentRoom = roomID;
  let bodyDiv = document.getElementById("page-body");
  bodyDiv.classList.add("game-started");
  document.getElementById("room-name-display").innerHTML = 'Room: "' + roomID + '"';
  document.getElementById("lobby").style.display = "none";
});

//informacije o novom korisniku u sobi u kojoj je trenutni korisnik
socket.on("room:userJoined", (data) => {
  console.log("User", data.id, "has joined the room.");
  console.log("User has the nickname", data.username);
});

//notifikacija izlaska iz sobe
socket.on("room:userLeft", (userID) => {
  console.log("User", userID, "has left the room.");
});