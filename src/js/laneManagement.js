export const setLaneData = (laneElement, laneData) => {
    // Reset current lane info
    console.log('setting lane data for ', laneElement);
    laneElement.classList.remove('lane-active', 'lane-inactive');
    laneElement.querySelector('.players').innerHTML = "";

    laneElement.classList.add(laneData.active ? 'lane-active' : 'lane-inactive');

    laneElement.querySelector('.code').textContent = laneData.code;
    console.log("setting lane code to ", laneData.code);

    for (let player of laneData.players) {
        laneElement.querySelector('.players').innerHTML += `<div class="player">${player.username}</div>`;
    }

};

export const refreshUI = (gameState) => {

    const lanes = document.querySelectorAll('.lane');

    for (let i = 0; i < lanes.length; i++) {
        setLaneData(lanes[i], gameState.lanes[i]);
    }

    drawPlayers(gameState.playerlist, gameState.deadPlayerlist)

    // const codeInput = document.querySelector("#typed-code");
    // codeInput.value = "";
}

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