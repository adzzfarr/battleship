// render-active-player.js
export function renderActivePlayer(player) {
    const activePlayerContainer = document.getElementById('active-player');
    activePlayerContainer.innerHTML = `${player.name}'s Turn`;
}