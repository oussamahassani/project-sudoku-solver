# Sudoku Solver
API Documentation
1. API Endpoint - /api/solve
This endpoint solves a Sudoku puzzle based on the provided puzzle string.

Test Cases for /api/solve
Test Case 1: Solve a puzzle with a valid puzzle string (81 characters long)

Request:
Method: POST
URL: /api/solve
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
}
Expected Response:
Status Code: 200 OK
Body:

json
Copier
Modifier
{
  "solution": "769225316851431372432171555174269283393222261623713449263222194511124237241321625"
}
Test Case 2: Solve a puzzle with a missing puzzle string

Request:
Method: POST
URL: /api/solve
Body (form-data):

json
Copier
Modifier
{
  "puzzle": ""
}
Expected Response:
Status Code: 400 Bad Request
Body:

json
Copier
Modifier
{
  "error": "Required field missing"
}
Test Case 3: Solve a puzzle with invalid characters

Request:
Method: POST
URL: /api/solve
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432xyz......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
}
Expected Response:
Status Code: 400 Bad Request
Body:

json
Copier
Modifier
{
  "error": "Invalid characters in puzzle"
}
Test Case 4: Solve a puzzle with incorrect length (not 81 characters)

Request:
Method: POST
URL: /api/solve
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3.."
}
Expected Response:
Status Code: 400 Bad Request
Body:

json
Copier
Modifier
{
  "error": "Expected puzzle to be 81 characters long"
}
Test Case 5: Solve a puzzle that cannot be solved

Request:
Method: POST
URL: /api/solve
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..7.."
}
Expected Response:
Status Code: 400 Bad Request
Body:

json
Copier
Modifier
{
  "error": "Puzzle cannot be solved"
}
2. API Endpoint - /api/check
This endpoint checks whether a particular placement in a Sudoku puzzle is valid.

Test Cases for /api/check
Test Case 1: Check a puzzle placement with all fields

Request:
Method: POST
URL: /api/check
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
  "coordinate": "A1",
  "value": "3"
}
Expected Response:
Status Code: 200 OK
Body:

json
Copier
Modifier
{
  "valid": true
}
Test Case 2: Check a puzzle placement with a single placement conflict

Request:
Method: POST
URL: /api/check
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
  "coordinate": "A1",
  "value": "5"
}
Expected Response:
Status Code: 200 OK
Body:

json
Copier
Modifier
{
  "valid": false,
  "error": "Row conflict"
}
Test Case 3: Check a puzzle placement with multiple placement conflicts

Request:
Method: POST
URL: /api/check
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
  "coordinate": "B3",
  "value": "9"
}
Expected Response:
Status Code: 200 OK
Body:

json
Copier
Modifier
{
  "valid": false,
  "error": "Row conflict, Column conflict"
}
Test Case 4: Check a puzzle placement with all placement conflicts

Request:
Method: POST
URL: /api/check
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
  "coordinate": "C5",
  "value": "8"
}
Expected Response:
Status Code: 200 OK
Body:

json
Copier
Modifier
{
  "valid": false,
  "error": "Row conflict, Column conflict, Region conflict"
}
Test Case 5: Check a puzzle placement with missing required fields

Request:
Method: POST
URL: /api/check
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
  "coordinate": "A1"
}
Expected Response:
Status Code: 400 Bad Request
Body:

json
Copier
Modifier
{
  "error": "Required fields missing"
}
Test Case 6: Check a puzzle placement with invalid characters

Request:
Method: POST
URL: /api/check
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432xyz......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
  "coordinate": "A1",
  "value": "5"
}
Expected Response:
Status Code: 400 Bad Request
Body:

json
Copier
Modifier
{
  "error": "Invalid characters in puzzle"
}
Test Case 7: Check a puzzle placement with incorrect length

Request:
Method: POST
URL: /api/check
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..",
  "coordinate": "A1",
  "value": "5"
}
Expected Response:
Status Code: 400 Bad Request
Body:

json
Copier
Modifier
{
  "error": "Expected puzzle to be 81 characters long"
}
Test Case 8: Check a puzzle placement with invalid placement coordinates

Request:
Method: POST
URL: /api/check
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
  "coordinate": "Z9",
  "value": "5"
}
Expected Response:
Status Code: 400 Bad Request
Body:

json
Copier
Modifier
{
  "error": "Invalid coordinate"
}
Test Case 9: Check a puzzle placement with invalid placement value

Request:
Method: POST
URL: /api/check
Body (form-data):

json
Copier
Modifier
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
  "coordinate": "A1",
  "value": "10"
}
Expected Response:
Status Code: 400 Bad Request
Body:

json
Copier
Modifier
{
  "error": "Invalid value"
}
✅ Final Notes:
