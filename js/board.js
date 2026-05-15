(function () {
  const board = document.getElementById("board");
  const statusText = document.getElementById("status");
  const attemptCountText = document.getElementById("attempt-count");
  const matchedCountText = document.getElementById("matched-count");

  function updateStatus(message, attemptCount, matchedPairs, totalPairs) {
    statusText.textContent = message;
    attemptCountText.textContent = String(attemptCount);
    matchedCountText.textContent = `${matchedPairs} / ${totalPairs}`;
  }

  function createCardElement(card, isChecking, onClick) {
    const cardButton = document.createElement("button");
    cardButton.className = "card";
    cardButton.dataset.id = String(card.id);
    cardButton.setAttribute("aria-label", "과일 카드");

    if (card.flipped || card.matched) {
      cardButton.textContent = card.fruit;
      cardButton.classList.add(card.matched ? "matched" : "flipped");
    }

    if (card.flipped || card.matched || isChecking) {
      cardButton.disabled = true;
    }

    cardButton.addEventListener("click", onClick);
    return cardButton;
  }

  function renderBoard(cards, isChecking, onClick) {
    board.innerHTML = "";

    cards.forEach(function (card) {
      board.appendChild(createCardElement(card, isChecking, onClick));
    });
  }

  window.PuzzleBoard = {
    renderBoard,
    updateStatus,
  };
})();
