export const generateLane = (laneIndex, state = {}) => {
    return `<div class="lane" data-js-index="${laneIndex}">
    <p class="code"></p>
    <div class="effect">
    </div>
    <div class="players">
    </div></div>`;
};

export const generateLanes = (numberOfLanes) => {
    const lanesWrapper = document.createElement('div');
    lanesWrapper.classList.add('lanes');

    for (let i = 0; i < numberOfLanes; i++)
        lanesWrapper.innerHTML += generateLane(i);

    return lanesWrapper;
};

