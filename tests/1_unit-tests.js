const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  suite("Logic handles a valid", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
      const puzzleString =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";

      assert.isTrue(solver.validate(puzzleString));
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      const puzzleString =
        "1.5..2.84..63.12.7.2..5.....9..1....xx2.3674.3.7.2..9.47...8..1..16....926914.37.";

      assert.isFalse(solver.validate(puzzleString));
    });

    test("Logic handles a puzzle string that is not 81 characters in length", () => {
      const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1...";

      assert.isFalse(solver.validate(puzzleString));
    });
  });

  suite("Logic handles  row placement", () => {
    test("Logic handles a valid row placement", () => {
      const puzzleString =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 0, "3"));
    });
    test("Logic handles a valid row placement false", () => {
      const puzzleString =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 0, "2"));
    });
    test("Logic handles a valid row placement", () => {
      const puzzleString =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.isFalse(solver.checkColPlacement(puzzleString, 0, 0, "1"));
    });
  });
});
