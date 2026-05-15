(function () {
  const resetButton = document.getElementById("reset-button");
  const { createGame, renderGame } = window.PuzzleGame;

  const game = createGame(function () {
    renderGame(game);
  });

  resetButton.addEventListener("click", game.startGame);

  game.startGame();
})();
