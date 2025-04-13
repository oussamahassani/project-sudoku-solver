"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || !value) {
      return res.json({ error: "Required field(s) missing" });
    }
    if (coordinate.length !== 2 || !/^[A-Ia-i][1-9]$/.test(coordinate)) {
      res.json({ error: "Invalid coordinate" });
      return;
    }
    if (puzzle.length !== 81) {
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    }
    if (!/^[1-9]$/.test(value)) {
      res.json({ error: "Invalid value" });
      return;
    }
    if (!solver.validate(puzzle)) {
      return res.json({ error: "Invalid characters in puzzle" });
    }
    const row = coordinate.toUpperCase().charCodeAt(0) - 65;
    const col = parseInt(coordinate[1]) - 1;
    const conflict = [];
    if (puzzle[row * 9 + col] !== ".") {
      return res.json({ valid: true });
    }
    if (!solver.checkRowPlacement(puzzle, row, col, value)) {
      conflict.push("row");
    }
    if (!solver.checkColPlacement(puzzle, row, col, value)) {
      conflict.push("column");
    }
    if (!solver.checkRegionPlacement(puzzle, row, col, value)) {
      conflict.push("region");
    }
    if (conflict.length > 0) {
      return res.json({ valid: false, conflict });
    }
    return res.json({ valid: true });
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    if (!puzzle) {
      res.json({ error: "Required field missing" });
      return;
    }
    if (puzzle.length !== 81) {
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    }
    if (!solver.validate(puzzle)) {
      res.json({ error: "Invalid characters in puzzle" });
      return;
    }
    const solution = solver.solve(puzzle);
    if (!solution) {
      res.json({ error: "Puzzle cannot be solved" });
      return;
    }
  });
};
