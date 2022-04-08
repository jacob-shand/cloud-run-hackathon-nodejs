const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Let the battle begin!");
});

app.post("/", function (req, res) {
  console.log(
    req.body.arena.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"]
  );
  currentPlayers = req.body;
  currentX =
    req.body.arena.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"].x;
  currentY =
    req.body.arena.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"].y;
  currentDirection =
    req.body.arena.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"]
      .direction;

  moveNeeded = true;
  if (currentDirection != "W" && currentX != 0) {
    console.log("turn left for X");
    moveNeeded = false;
    move = faceLeft(currentDirection);
  } else if (currentX != 0 && moveNeeded) {
    console.log("move forward for x");
    moveNeeded = false;
    move = "F";
  } else if (currentDirection != "N" && currentY != 0 && moveNeeded) {
    console.log("face up for y");
    moveNeeded = false;
    move = faceUp(currentDirection);
  } else if (currentY != 0 && moveNeeded) {
    console.log("move forward for y");
    moveNeeded = false;
    move = "F";
  } else if (currentDirection != "E") {
    if (currentDirection != "S") {
      console.log("face east");
      move = faceEast(currentDirection);
    }
  } else if (currentDirection == "E" || currentDirection == "S") {
    console.log("check other playerss");
    move = checkOtherPlayers(currentPlayers, currentDirection);
  }

  // var currentPosition =
  // console.log(req.body);
  console.log(move);
  res.send(move);
});

app.listen(process.env.PORT || 8080);

function faceEast(currentDirection) {
  switch (currentDirection) {
    case "N":
      return "R";
    case "W":
      return "R";
    case "S":
      return "L";
  }
}

function faceLeft(currentDirection) {
  switch (currentDirection) {
    case "N":
      return "L";
    case "E":
      return "L";
    case "S":
      return "R";
  }
}

function faceUp(currentDirection) {
  switch (currentDirection) {
    case "E":
      return "L";
    case "W":
      return "R";
    case "S":
      return "R";
  }
}

function checkOtherPlayers(currentPlayers, currentDirection) {
  for (player in currentPlayers) {
    if (
      (player.x < 3 && player.y == 0 && currentDirection == "E") ||
      (player.y < 3 && player.x == 0 && currentDirection == "S")
    ) {
      return "T";
    } else if (currentDirection == "E") {
      return "R";
    } else {
      return "L";
    }
  }
}
