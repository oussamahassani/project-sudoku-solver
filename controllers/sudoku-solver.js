class SudokuSolver {
  validate(puzzleString) {
    const allowedChars = /^[1-9\.0]{81}$/;
    return allowedChars.test(puzzleString);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowStart = row * 9;
    const rowEnd = rowStart + 9;
    for (let i = rowStart; i < rowEnd; i++) {
      if (puzzleString[i] === value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = column; i < 81; i += 9)
      if (puzzleString[i] === value) return false;
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    return true;
  }

  solve(puzzleString) {
    const puzzleArray = puzzleString.split("");
    const emptyCells = puzzleArray
      .map((cell, index) => (cell === "." ? index : null))
      .filter((cell) => cell !== null);
    const solvePuzzle = (puzzle, emptyCells) => {
      if (emptyCells.length === 0) {
        return puzzle;
      }
      const cell = emptyCells[0];
      for (let i = 1; i <= 9; i++) {
        const value = i.toString();
        if (
          this.checkRowPlacement(
            puzzle,
            Math.floor(cell / 9),
            cell % 9,
            value,
          ) &&
          this.checkColPlacement(
            puzzle,
            Math.floor(cell / 9),
            cell % 9,
            value,
          ) &&
          this.checkRegionPlacement(
            puzzle,
            Math.floor(cell / 9),
            cell % 9,
            value,
          )
        ) {
          puzzle[cell] = value;
          const solution = solvePuzzle(puzzle, emptyCells.slice(1));
          if (solution) {
            return solution;
          }
          puzzle[cell] = ".";
        }
      }
      return null;
    };
  }
}

module.exports = SudokuSolver;
