(function () {
  const FRUITS = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍑", "🍍", "🥝", "🍓", "🥭", "🍈", "🍐", "🍊", "🍋", "🥥", "🍅", "🍈", "🍐"];
  const TOTAL_PAIRS = FRUITS.length;
  const FLIP_BACK_DELAY_MS = 900;

  function shuffle(array) {
    const clonedArray = [...array];

    for (let index = clonedArray.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [clonedArray[index], clonedArray[randomIndex]] = [
        clonedArray[randomIndex],
        clonedArray[index],
      ];
    }

    return clonedArray;
  }

  window.PuzzleUtils = {
    FRUITS,
    TOTAL_PAIRS,
    FLIP_BACK_DELAY_MS,
    shuffle,
  };
})();
