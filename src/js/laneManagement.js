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

    drawPlayers(gameState.playerlist)

    // const codeInput = document.querySelector("#typed-code");
    // codeInput.value = "";
}

function drawPlayers(playerlist) {

    const playerListElement = document.querySelector("#player-list");

    playerListElement.innerHTML = "";
    for (let player of playerlist) {
        playerListElement.innerHTML += `<p> ${player.username} </p>`;
    }

}