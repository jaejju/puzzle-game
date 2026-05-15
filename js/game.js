(function () {
  const { FRUITS, TOTAL_PAIRS, FLIP_BACK_DELAY_MS, shuffle } = window.PuzzleUtils;
  const { renderBoard, updateStatus } = window.PuzzleBoard;

  function createCards() {
    return shuffle([...FRUITS, ...FRUITS]).map(function (fruit, index) {
      return {
        id: index,
        fruit,
        flipped: false,
        matched: false,
      };
    });
  }

  function createGame(onChange) {
    const state = {
      cards: [],
      flippedCards: [],
      matchedPairs: 0,
      attemptCount: 0,
      isChecking: false,
      message: "카드를 두 장 뒤집어보세요.",
    };

    function notify() {
      onChange(state);
    }

    function resetTurnState(message) {
      state.flippedCards = [];
      state.isChecking = false;
      state.message = message;
      notify();
    }

    function finishGameIfComplete() {
      if (state.matchedPairs !== TOTAL_PAIRS) {
        return false;
      }

      state.message = "축하합니다. 모든 짝을 맞췄습니다.";
      notify();
      return true;
    }

    function handleMatchedPair(firstCard, secondCard) {
      firstCard.matched = true;
      secondCard.matched = true;

      if (finishGameIfComplete()) {
        state.flippedCards = [];
        state.isChecking = false;
        return;
      }

      state.matchedPairs += 1;
      resetTurnState("짝을 맞췄습니다. 계속 진행하세요.");
    }

    function handleMismatchedPair(firstCard, secondCard) {
      state.message = "짝이 아닙니다. 잠시 후 다시 뒤집습니다.";
      notify();

      setTimeout(function () {
        firstCard.flipped = false;
        secondCard.flipped = false;
        resetTurnState("다시 두 장의 카드를 골라보세요.");
      }, FLIP_BACK_DELAY_MS);
    }

    function checkMatch() {
      const [firstCard, secondCard] = state.flippedCards;
      state.isChecking = true;
      state.attemptCount += 1;

      if (firstCard.fruit === secondCard.fruit) {
        handleMatchedPair(firstCard, secondCard);
        return;
      }

      handleMismatchedPair(firstCard, secondCard);
    }

    function handleCardClick(event) {
      const clickedId = Number(event.currentTarget.dataset.id);
      const clickedCard = state.cards.find(function (card) {
        return card.id === clickedId;
      });

      if (
        !clickedCard ||
        clickedCard.flipped ||
        clickedCard.matched ||
        state.isChecking
      ) {
        return;
      }

      clickedCard.flipped = true;
      state.flippedCards.push(clickedCard);
      notify();

      if (state.flippedCards.length === 1) {
        state.message = "한 장 더 뒤집어서 같은 과일을 찾아보세요.";
        notify();
        return;
      }

      if (state.flippedCards.length === 2) {
        checkMatch();
      }
    }

    function startGame() {
      state.cards = createCards();
      state.matchedPairs = 0;
      state.attemptCount = 0;
      state.message = "카드를 두 장 뒤집어보세요.";
      notify();
    }

    return {
      state,
      startGame,
      handleCardClick,
    };
  }

  function renderGame(game) {
    updateStatus(
      game.state.message,
      game.state.attemptCount,
      game.state.matchedPairs,
      TOTAL_PAIRS
    );
    renderBoard(game.state.cards, game.state.isChecking, game.handleCardClick);
  }

  window.PuzzleGame = {
    createGame,
    renderGame,
  };
})();
