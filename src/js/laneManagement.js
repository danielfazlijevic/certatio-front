export const setLaneData = (laneElement, laneData) => {
    // Reset current lane info
    // console.log('setting lane data for ', laneElement);
    laneElement.classList.remove('lane-active', 'lane-inactive');
    laneElement.querySelector('.players').innerHTML = "";

    laneElement.classList.add(laneData.active ? 'lane-active' : 'lane-inactive');

    laneElement.querySelector('.code').textContent = laneData.code;
    // console.log("setting lane code to ", laneData.code);

    for (let player of laneData.players) {
        laneElement.querySelector('.players').innerHTML += `<div class="player">${player.username}</div>`;
    }

};

export const highlightPlayerLane = (gameState, ID) => {

    const lanes = document.querySelectorAll('.lane');

    for (let lane of lanes) {
        lane.classList.remove("currentLane");
    }

    for (let i = 0; i < gameState.lanes.length; i++) {

        if (gameState.lanes[i].players.filter(player => player.ID === ID).length > 0) {
            lanes[i].classList.add("currentLane");
        }
    }

}

export const refreshUI = (gameState) => {

    const lanes = document.querySelectorAll('.lane');

    for (let i = 0; i < lanes.length; i++) {
        setLaneData(lanes[i], gameState.lanes[i]);
    }

    drawPlayers(gameState.playerlist, gameState.deadPlayerlist);
    displayRound(gameState.round);

    // const codeInput = document.querySelector("#typed-code");
    // codeInput.value = "";
};

function drawPlayers(playerlist, deadPlayerlist) {

    const playerListElement = document.querySelector("#player-list");

    playerListElement.innerHTML = "";

    for (let player of playerlist) {

        playerListElement.innerHTML += `<p style="color:white"> ${player.username}, ${player.lives} </p>`;
    }

    for (let player of deadPlayerlist) {

        playerListElement.innerHTML += `<p style="color:red"> ${player.username} </p>`;
    }

}

function displayRound(round) {

    const roundNumberElement = document.querySelector("#round-number");
    roundNumberElement.innerHTML = `Round: ${round}`;
}

export const displayTime = (roundTime) => {

    let time = (roundTime / 1000).toFixed(2);

    const timeDisplayElement = document.querySelector("#time-remaining");
    timeDisplayElement.innerHTML = `${time}`;


    let secondsVariable = setInterval(() => {
        time = (time - 0.1).toFixed(2);
        if (time <= 0) {
            clearInterval(secondsVariable);
            return;
        }
        // console.log("displaying", roundTime / 1000, "seconds");
        timeDisplayElement.innerHTML = `${time}`;


    }, 100);

};