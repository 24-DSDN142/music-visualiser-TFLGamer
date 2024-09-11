
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  let wallColour1 = color("#aa8453");
  let wallColour2 = color("#5b492f");
  let wallHeight = (height / 5) * 3;
  background(wallColour1);
  rectMode(CENTER);


  // draws sky gradient
  let bgColour1 = color("#fbe18d");
  let bgColour2 = color("#c8871e");
  
  for (let i = 0; i < wallHeight; i++) {
    let m = map(i, 0, wallHeight, 0, 1);
    let newColour = lerpColor(bgColour2, bgColour1, m);
    stroke(newColour);
    line(0, i, width, i);
  }


  // draws raised wall bits
  noStroke();
  let topHeight = wallHeight - (height / 7);
  let bottomHeight = topHeight + (height / 6);
  let cornerWidth = width / 5;
  const extraHeight = 80;

  fill(wallColour2);
  // left
  quad(0, bottomHeight, 0, bottomHeight + extraHeight, cornerWidth, topHeight + extraHeight, cornerWidth, topHeight);
  quad(0, wallHeight, 0, topHeight + extraHeight, cornerWidth, topHeight + extraHeight, cornerWidth, wallHeight);
  // right
  quad(width, bottomHeight, width, bottomHeight + extraHeight, width - cornerWidth, topHeight + extraHeight, width - cornerWidth, topHeight);
  quad(width, wallHeight, width, topHeight + extraHeight, width - cornerWidth, topHeight + extraHeight, width - cornerWidth, wallHeight);

  fill(wallColour1);
  // left
  triangle(0, bottomHeight, 0, topHeight, cornerWidth, topHeight);
  // right
  triangle(width, bottomHeight, width, topHeight, width - cornerWidth, topHeight);


  // switches which "cat" it draws depending on individual channel threshold
  let vocalRange = map(vocal, 0, 100, 0, 20);
  let bassRange = map(bass, 0, 100, 0, 20);
  let drumRange = map(drum, 0, 100, 0, 20);
  let otherRange = map(other, 0, 100, 0, 20);

  if (vocalRange > 12) {
    drawCat(width / 2, wallHeight * 1.4, color(200, 0, 0));
  } else {
    drawCat(width / 2, wallHeight * 1.4, color(0, 200, 0));
  }

  if (bassRange > 15.5) {
    drawCat((width / 7) * 2.5, wallHeight * 1.3, color(0, 0, 200));
  } else {
    drawCat((width / 7) * 2.5, wallHeight * 1.3, color(200, 200, 0));
  }

  if (drumRange > 15) {
    drawCat(width / 2, wallHeight * 1.1, color(200, 0, 200));
  } else {
    drawCat(width / 2, wallHeight * 1.1, color(0, 200, 200));
  }

  if (otherRange > 16) {
    drawCat((width / 7) * 4.5, wallHeight * 1.3, color(0, 0, 0));
  } else {
    drawCat((width / 7) * 4.5, wallHeight * 1.3, color(200, 200, 200));
  }
}


function drawCat(x, y, colour) {
  fill(colour);
  ellipse(x, y, 50, 50);
}