const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Let the battle begin!");
});

app.post("/", function (req, res) {
  console.log(
    req.body.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"]
  );
  currentPlayers = req.body;
  currentX =
    req.body.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"].x;
  currentY =
    req.body.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"].y;
  currentDirection =
    req.body.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"].direction;

  moveNeeded = true;
  if (currentDirection != "W" && currentX != 0) {
    moveNeeded = false;
    move = faceLeft(currentDirection);
  } else if (currentX != 0 && moveNeeded) {
    moveNeeded = false;
    move = "F";
  } else if (currentDirection != "N" && currentY != 0 && moveNeeded) {
    moveNeeded = false;
    move = faceUp(currentDirection);
  }
  if (currentY != 0 && moveNeeded) {
    moveNeeded = false;
    move = "F";
  }

  if (currentdirection == "E" || currentDirection == "S") {
    move = checkOtherPlayers(currentPlayers, currentDirection);
  }

  // var currentPosition =
  // console.log(req.body);

  res.send(move);
});

app.listen(process.env.PORT || 8080);

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
