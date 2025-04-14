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
    const grid = [];
    for (let i = 0; i < 9; i++) {
      grid.push(puzzleString.slice(i * 9, (i + 1) * 9).split(""));
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (grid[r][c] === value) {
          return false; // value already exists in the region
        }
      }
    }

    return true; // value can be placed safely
  }

  solve(puzzleString) {
    const puzzleArray = puzzleString.split("");
    const emptyCells = puzzleArray
      .map((cell, index) => (cell === "." ? index : null))
      .filter((cell) => cell !== null);
      for (let i = 0; i < 81; i++) {
        const char = puzzleArray[i];
        if (char !== "." && char !== "0") {
          const row = Math.floor(i / 9);
          const col = i % 9;
          puzzleArray[i] = "."; // Temporarily remove value to avoid self-conflict
          const valid =
            this.checkRowPlacement(puzzleArray.join(""), row, col, char) &&
            this.checkColPlacement(puzzleArray.join(""), row, col, char) &&
            this.checkRegionPlacement(puzzleArray.join(""), row, col, char);
          puzzleArray[i] = char;
          if (!valid) return null; // ❌ Invalid puzzle
        }
      }
    
    const solvePuzzle = (puzzleString, puzzle, emptyCells) => {
      if (emptyCells.length === 0) {
        return puzzle;
      }
      const cell = emptyCells[0];
      for (let i = 1; i <= 9; i++) {
        const value = i.toString();
        if (
          this.checkRowPlacement(
            puzzleString,
            Math.floor(cell / 9),
            cell % 9,
            value,
          ) &&
          this.checkColPlacement(
            puzzleString,
            Math.floor(cell / 9),
            cell % 9,
            value,
          ) &&
          this.checkRegionPlacement(
            puzzleString,
            Math.floor(cell / 9),
            cell % 9,
            value,
          )
        ) {
          puzzle[cell] = value;
          const solution = solvePuzzle(
            puzzleString,
            puzzle,
            emptyCells.slice(1),
          );
          if (solution) {
            return solution;
          }
          puzzle[cell] = ".";
        }
      }
      return null;
    };
    return solvePuzzle(puzzleString, puzzleArray, emptyCells);
  }
}

module.exports = SudokuSolver;
