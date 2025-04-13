const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
    suite("POST request to /api/solve", () => {
        test("Solve a puzzle with valid puzzle string", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({
                    puzzle: "135762984946381257728459613694517832812936745357824196473298561581673429269145378",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);

                    done();
                });
        });

        test("Solve a puzzle with missing puzzle string", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({})
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field missing");
                    done();
                });
        });

        test("Solve a puzzle with invalid characters", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37X",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(
                        res.body.error,
                        "Invalid characters in puzzle",
                    );
                    done();
                });
        });

        test("Solve a puzzle with incorrect length", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(
                        res.body.error,
                        "Expected puzzle to be 81 characters long",
                    );
                    done();
                });
        });

        test("Solve a puzzle that cannot be solved", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.375",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Puzzle cannot be solved");
                    done();
                });
        });
    });

    suite("POST request to /api/check", () => {
        test("Check a puzzle placement with all fields", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                    coordinate: "A2",
                    value: "3",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, true);
                    done();
                });
        });

        test("Check a puzzle placement with single placement conflict", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                    coordinate: "A2",
                    value: "4",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict.length, 1);
                    done();
                });
        });

        test("Check a puzzle placement with multiple placement conflicts", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                    coordinate: "A2",
                    value: "2",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.isAbove(res.body.conflict.length, 1);
                    done();
                });
        });

        test("Check a puzzle placement with all placement conflicts", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                    coordinate: "A2",
                    value: "5",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.include(res.body.conflict, "row");

                    done();
                });
        });

        test("Check a puzzle placement with missing required fields", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Required field(s) missing");
                    done();
                });
        });

        test("Check a puzzle placement with invalid characters", function (done) {
            this.timeout(10000); // Extend timeout for debugging

            chai.request(server)
                .post("/api/check")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37X",
                    coordinate: "A2",
                    value: "3",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(
                        res.body.error,
                        "Invalid characters in puzzle",
                    );
                    done();
                });
        });

        test("Check a puzzle placement with incorrect length", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2",
                    coordinate: "A2",
                    value: "3",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(
                        res.body.error,
                        "Expected puzzle to be 81 characters long",
                    );
                    done();
                });
        });

        test("Check a puzzle placement with invalid placement coordinate", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                    coordinate: "K2",
                    value: "3",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid coordinate");
                    done();
                });
        });

        test("Check a puzzle placement with invalid placement value", function (done) {
            chai.request(server)
                .post("/api/check")
                .send({
                    puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                    coordinate: "A2",
                    value: "0",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "Invalid value");
                    done();
                });
        });
    });
});
