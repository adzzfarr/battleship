// render-active-player.js
export function renderActivePlayer(player, gameIsWon) {
    const activePlayerContainer = document.getElementById('active-player');

    if (gameIsWon) {
        activePlayerContainer.innerHTML = `${player.name} Won!`
    } else {
        activePlayerContainer.innerHTML = `${player.name}'s Turn`;
    }
}