export const setLaneData = (laneElement, laneData) => {
    // Reset current lane info
    console.log('setting lane data for ', laneElement);
    laneElement.classList.remove('lane-active','lane-inactive');
    laneElement.querySelector('.players').innerHTML = "";

    laneElement.classList.add(laneData.active ? 'lane-active' : 'lane-inactive');

    laneElement.querySelector('.code').textContent = laneData.code;

    for(const player of laneData.players){
        laneElement.querySelector('.players').innerHTML += `<div class="player">${player}</div>`;
    }

};