
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  let catColours = [color("#e4c899"), color("#432a27"), color("#b38b6f"), color("#57433e")];
  let wallColours = [color("#5b492f"), color("#aa8453")];
  let bgColours = [color("#fbe18d"), color("#c8871e")];
  let vocalColours = [color("#ca8573"), color("#bd9f97")]
  let drumColours = [color("#75c27a"), color("#9ac49c")]
  let bassColours = [color("#8cb0c2"), color("#a0c4cc"), color("#6b96bc")]
  let otherColours = [color("#ad7bc2"), color("#d6a2e2"), color("#8f66ac")]
  let wallHeight = (height / 5) * 3;
  background(wallColours[1]);
  rectMode(CENTER);


  // draws sky gradient
  for (let i = 0; i < wallHeight; i++) {
    let m = map(i, 0, wallHeight, 0, 1);
    let newColour = lerpColor(bgColours[1], bgColours[0], m);
    stroke(newColour);
    line(0, i, width, i);
  }


  // draws raised wall bits
  noStroke();
  let topHeight = wallHeight - (height / 7);
  let bottomHeight = topHeight + (height / 6);
  let cornerWidth = width / 5;
  const extraHeight = 80;

  fill(wallColours[0]);
  quad(0, bottomHeight, 0, bottomHeight + extraHeight, cornerWidth, topHeight + extraHeight, cornerWidth, topHeight); // left
  quad(0, wallHeight, 0, topHeight + extraHeight, cornerWidth, topHeight + extraHeight, cornerWidth, wallHeight);
  quad(width, bottomHeight, width, bottomHeight + extraHeight, width - cornerWidth, topHeight + extraHeight, width - cornerWidth, topHeight); // right
  quad(width, wallHeight, width, topHeight + extraHeight, width - cornerWidth, topHeight + extraHeight, width - cornerWidth, wallHeight);

  fill(wallColours[1]);
  triangle(0, bottomHeight, 0, topHeight, cornerWidth, topHeight); // left
  triangle(width, bottomHeight, width, topHeight, width - cornerWidth, topHeight); // right


  // switches which cat state it draws depending on individual channel threshold
  let vocalRange = map(vocal, 0, 100, 0, 20);
  let drumRange = map(drum, 0, 100, 0, 20);
  let bassRange = map(bass, 0, 100, 0, 20);
  let otherRange = map(other, 0, 100, 0, 20);

  if (drumRange > 15) {
    drawDrum(width / 2, wallHeight * 1, catColours);
  } else {
    drawDrum(width / 2, wallHeight * 1, catColours);
  }

  if (vocalRange > 12) {
    drawVocal(width / 2, wallHeight * 1.4, catColours);
  } else {
    drawVocal(width / 2, wallHeight * 1.4, catColours);
  }

  if (bassRange > 15.5) {
    drawBass((width / 7) * 2.5, wallHeight * 1.3, catColours);
  } else {
    drawBass((width / 7) * 2.5, wallHeight * 1.3, catColours);
  }

  if (otherRange > 16) {
    drawOther((width / 7) * 4.5, wallHeight * 1.3, catColours);
  } else {
    drawOther((width / 7) * 4.5, wallHeight * 1.3, catColours);
  }
}


function drawVocal(x, y, catColours) {
  drawCatMain(x, y, catColours[0], catColours[1], catColours[2], catColours[3]);
  drawCatHead(x, y, catColours[0]);
}

function drawDrum(x, y, catColours) {
  drawCatMain(x, y, catColours[0], catColours[1], catColours[2], catColours[3]);
  drawCatHead(x, y, catColours[0]);
}

function drawBass(x, y, catColours) {
  drawCatMain(x, y, catColours[0], catColours[1], catColours[2], catColours[3]);
  drawCatHead(x, y, catColours[0]);
}

function drawOther(x, y, catColours) {
  drawCatMain(x, y, catColours[0], catColours[1], catColours[2], catColours[3]);
  drawCatHead(x, y, catColours[0]);
}


// draws head of cat body
function drawCatHead(x, y, colour) {
  let headWidth = 90;
  let headHeight = 70;

  // main head
  fill(colour);
  ellipse(x, y - 70, headWidth, headHeight);

  // ears
  quad(x + 7 - headWidth / 2, y - 54 - headHeight / 2, x - 32, y - 72 - headHeight / 2, 
    x - 18, y - 76 - headHeight / 2, x - 8, y - 68 - headHeight / 2); // left
  ellipse(x + 20.3 - headWidth / 2, y - 72.8 - headHeight / 2, 14, 12);
  quad(x - 7 + headWidth / 2, y - 54 - headHeight / 2, x + 32, y - 72 - headHeight / 2, 
    x + 18, y - 76 - headHeight / 2, x + 8, y - 68 - headHeight / 2); // right
  ellipse(x - 20.3 + headWidth / 2, y - 72.8 - headHeight / 2, 14, 12);

  // cheeks & chin
  ellipse(x + 16 - headWidth / 2, y - 62, 40, 50); // left
  ellipse(x - 16 + headWidth / 2, y - 62, 40, 50); // right
  ellipse(x, y - 5 - headHeight / 2, 70, 15)
}


// draws non-animated parts of cat body
function drawCatMain(x, y, colour1, colour2, colour3, colour4) {
  let catWidth = 70;
  let catHeight = 30;

  // main body
  fill(colour1);
  ellipse(x, y, catWidth, catHeight);
  ellipse(x + 12 - catWidth / 2, y - 2, 1 + catWidth / 3, catHeight * 2);
  ellipse(x - 12 + catWidth / 2, y - 2, 1 + catWidth / 3, catHeight * 2);
  quad(x - catWidth / 2, y - 10, x + catWidth / 2, y - 10, x + catWidth / 3, y - 20 - catHeight, x - catWidth / 3, y - 20 - catHeight);

  // jacket
  fill(colour4);
  rect(x, y - 24, 30, 7);
  fill(colour3);
  quad(x - 5 - catWidth / 2, y - 15, x - 15, y - 10, x - 10, y - 20 - catHeight, x - catWidth / 3, y - 20 - catHeight); // left
  push();
  translate(x + 4 - catWidth / 2, y - 1 - catHeight);
  rotate(24);
  ellipse(0, 0, 10, 35);
  pop();
  quad(x + 5 + catWidth / 2, y - 15, x + 15, y - 10, x + 10, y - 20 - catHeight, x + catWidth / 3, y - 20 - catHeight); // right
  push();
  translate(x - 4 + catWidth / 2, y - 1 - catHeight);
  rotate(-24);
  ellipse(0, 0, 10, 35);
  pop();

  // legs
  fill(colour1);
  quad(x - 5, y + 7 + catHeight / 2, x + 5 - catWidth / 2, y + 7 + catHeight / 2, 
    x - catWidth / 2, y, x, y); // left
  quad(x + 5, y + 7 + catHeight / 2, x - 5 + catWidth / 2, y + 7 + catHeight / 2, 
    x + catWidth / 2, y, x, y); // right

  // hip things
  fill(colour4);
  quad(x - 1 - catWidth / 2, y + 1, x + 0.5 + catWidth / 2, y + 1, x + 1 + catWidth / 2, y - 6, x - 0.5 - catWidth / 2, y - 6);
  fill(colour2);
  triangle(x + 25, y, x - 1 - catWidth / 2, y, x + 2 - catWidth / 2, y + 3 + catHeight / 2); // left
  triangle(x - 25, y, x + 1 + catWidth / 2, y, x - 2 + catWidth / 2, y + 3 + catHeight / 2); // right
  
  // boots
  ellipse(x - catWidth / 4, y + 8 + catHeight, 19, 19); // left
  quad(x - 10 - catWidth / 4, y + 8 + catHeight, x + 10 - catWidth / 4, y + 8 + catHeight, 
    x - 5, y + 7 + catHeight / 2, x + 5 - catWidth / 2, y + 7 + catHeight / 2);
  ellipse(x + catWidth / 4, y + 8 + catHeight, 19, 19); // right
  quad(x + 10 + catWidth / 4, y + 8 + catHeight, x - 10 + catWidth / 4, y + 8 + catHeight, 
    x + 5, y + 7 + catHeight / 2, x - 5 + catWidth / 2, y + 7 + catHeight / 2);
}