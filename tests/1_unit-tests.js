const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
const puzzleString =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
suite("Unit Tests", () => {
  suite("Logic handles a valid", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
 

      assert.isTrue(solver.validate(puzzleString));
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      const nonpuzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..AX....926914.37."

      assert.isFalse(solver.validate(nonpuzzleString));
    });

    test("Logic handles a puzzle string that is not 81 characters in length", () => {
      const puzzleStrings = "1.5..2.84..63.12.7.2..5.....9..1...";

      assert.isFalse(solver.validate(puzzleStrings));
    });
  });

  suite("Logic handles  row placement", () => {
    test("Logic handles a valid row placement", () => {
  
      assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 0, "3"));
    });
    test("Logic handles a valid row placement false", () => {
  
      assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 0, "2"));
    });
    test("Logic handles a valid row placement", () => {

      assert.isFalse(solver.checkColPlacement(puzzleString, 0, 0, "1"));
    });
  });


  test("Logic handles a valid region (3x3 grid) placement", function (done) {
    assert.equal(
      solver.checkRegionPlacement(puzzleString, "1", "2", "3"),
      true
    );
    done();
  });

  test("Logic handles an invalid region (3x3 grid) placement", function (done) {
    assert.equal(
      solver.checkRegionPlacement(puzzleString, "1", "2", "1"),
      false
    );
    done();
  });
});