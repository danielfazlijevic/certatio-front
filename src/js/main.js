import io from 'socket.io-client';

import {
  generateLanes
} from './generators';

const socket = io("localhost:3000");

const joinRoomBtn = document.querySelector("#join-room-btn");
const roomCodeInput = document.querySelector("#room-code");
const confirmUsernameBtn = document.querySelector("#confirm-username-btn");
const usernameInput = document.querySelector("#username-input");
const playerListElement = document.querySelector("#player-list");

const gameWrapper = document.querySelector('#game');


const NUMBER_OF_LANES = 5;

socket.username = null;
socket.currentRoom = null;

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

//potvrda username
socket.on("usernameConfirmed", (username) => {
  document.getElementById("username-tab").style.display = "none";
  document.getElementById("join-tab").style.display = "flex";
  socket.username = username;
});


socket.on("createLanes", () => {
  console.log('Generating lanes');
  const lanesElement = generateLanes(NUMBER_OF_LANES);
  gameWrapper.appendChild(lanesElement);
});

//emitovanje zahteva za join
joinRoomBtn.addEventListener("click", () => {
  socket.emit("room:join", roomCodeInput.value);
});

//povratne informacije o uspesnoj konekciji u sobu
socket.on("room:joined", (roomID) => {
  console.log("You have joined room", roomID);
  socket.currentRoom = roomID;
  document.getElementById("room-name-display").innerHTML = "Room: " + roomID;
  document.getElementById("lobby").style.display = "none";
  drawPlayers(socket.currentRoom);
});

//informacije o novom korisniku u sobi u kojoj je trenutni korisnik
socket.on("room:userJoined", (data) => {
  console.log("User", data.id, "has joined the room.");
  console.log("User has the nickname", data.username);
  drawPlayers(socket.currentRoom);
});

//notifikacija izlaska iz sobe
socket.on("room:userLeft", (userID) => {
  console.log("User", userID, "has left the room.");
  drawPlayers(socket.currentRoom);
});

function drawPlayers(currentRoom) {

  socket.emit("request:playerlist", currentRoom);

  socket.on("receive:playerlist", (playerList) => {

    console.log(playerList);
    playerListElement.innerHTML = "";
    for (let playerName of playerList) {
      playerListElement.innerHTML += `<p> ${playerName} </p>`;
    }
  });

}