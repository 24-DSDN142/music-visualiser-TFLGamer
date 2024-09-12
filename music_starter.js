
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
  strokeWeight(1);


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
    drawDrumFull(width / 2, wallHeight * 1, catColours, drumColours);
  } else {
    drawDrumFull(width / 2, wallHeight * 1, catColours, drumColours);
  }

  if (vocalRange > 12) {
    drawVocalFull(width / 2, wallHeight * 1.4, catColours, vocalColours);
  } else {
    drawVocalFull(width / 2, wallHeight * 1.4, catColours, vocalColours);
  }

  if (bassRange > 15.5) {
    drawBassFull((width / 7) * 2.5, wallHeight * 1.3, catColours, bassColours);
  } else {
    drawBassFull((width / 7) * 2.5, wallHeight * 1.3, catColours, bassColours);
  }

  if (otherRange > 16) {
    drawOtherFull((width / 7) * 4.5, wallHeight * 1.3, catColours, otherColours);
  } else {
    drawOtherFull((width / 7) * 4.5, wallHeight * 1.3, catColours, otherColours);
  }
}

// draws full volume channel representation, including cat and instrument
function drawVocalFull(x, y, catColours, vocalColours) {
  drawCatMain(x, y, catColours[0], catColours[1], catColours[2], catColours[3]);
  drawCatHead(x, y, catColours[0]);
  drawVocal(x, y, vocalColours[0], vocalColours[1]);
}

function drawDrumFull(x, y, catColours, drumColours) {
  drawCatMain(x, y, catColours[0], catColours[1], catColours[2], catColours[3]);
  drawCatHead(x, y, catColours[0]);
  drawDrum(x, y, drumColours[0], drumColours[1]);
}

function drawBassFull(x, y, catColours, bassColours) {
  drawCatMain(x, y, catColours[0], catColours[1], catColours[2], catColours[3]);
  drawCatHead(x, y, catColours[0]);
  drawBass(x, y, bassColours[0], bassColours[1], bassColours[2]);
}

function drawOtherFull(x, y, catColours, otherColours) {
  drawCatMain(x, y, catColours[0], catColours[1], catColours[2], catColours[3]);
  drawCatHead(x, y, catColours[0]);
  drawBass(x, y, otherColours[0], otherColours[1], otherColours[2]);
}


//draws instruments
function drawVocal(x, y, colour1, colour2) {
  push();
  translate(x, y)
  fill(colour1);
  quad(-7, -10, 7, -10, 9, -45, -9, -45);
  fill(colour2);
  ellipse(0, -54, 26, 26);
  strokeWeight(5);
  stroke(colour1);
  noFill();
  arc(0, -65, 36, 34, 55, 125);
  pop();
}

function drawDrum(x, y, colour1, colour2) {
  // floor tom
  push();
  translate(x - 50, y + 29);
  fill(colour1);
  rect(0, 0, 45, 50);
  quad(-8, 16, -8, 24, -18, 35, -26, 35);
  quad(8, 16, 8, 24, 18, 35, 26, 35);
  fill(colour2);
  rect(0, 0, 45, 40);
  pop();

  // snare
  push();
  translate(x + 50, y + 19)
  fill(colour1);
  rect(0, 0, 45, 30);
  rect(0, 30, 8, 30);
  quad(0, 26, 0, 34, -10, 45, -18, 45);
  quad(0, 26, 0, 34, 10, 45, 18, 45);
  fill(colour2);
  rect(0, 0, 45, 18);
  pop();

  // tom toms
  push();
  translate(x - 30, y - 5);
  rotate(7);
  fill(colour1);
  rect(0, 0, 45, 24);
  fill(colour2);
  rect(0, 0, 45, 14);
  pop();
  push();
  translate(x + 30, y - 5);
  rotate(-7);
  fill(colour1);
  rect(0, 0, 45, 24);
  fill(colour2);
  rect(0, 0, 45, 14);
  pop();

  // cymbals
  push();
  translate(x - 70, y - 34);
  fill(colour1);
  rect(0, 52, 8, 92);
  quad(0, 79, 0, 87, -10, 98, -18, 98);
  quad(0, 79, 0, 87, 10, 98, 18, 98);
  rotate(15);
  fill(colour2);
  ellipse(0, 0, 50, 16);
  fill(colour1);
  ellipse(0, 0, 8, 5);
  rotate(-15);
  quad(-4, -1, 4, 1, 4, -5, -4, -5);
  pop();
  
  push();
  translate(x + 70, y - 34);
  fill(colour1);
  rect(0, 52, 8, 92);
  quad(0, 79, 0, 87, -10, 98, -18, 98);
  quad(0, 79, 0, 87, 10, 98, 18, 98);
  rotate(-15);
  fill(colour2);
  ellipse(0, 0, 50, 16);
  fill(colour1);
  ellipse(0, 0, 8, 5);
  rotate(15);
  quad(4, -1, -4, 1, -4, -5, 4, -5);
  pop();

  // bass
  push();
  translate(x, y + 30);
  fill(colour1);
  quad(-10, 22, -10, 30, -20, 41, -28, 41);
  quad(10, 22, 10, 30, 20, 41, 28, 41);
  ellipse(0, 0, 75, 75);
  fill(colour2);
  ellipse(0, 0, 63, 63);
  pop();
}

function drawBass(x, y, colour1, colour2, colour3) {
  push();
  translate(x, y);
  fill(colour1);
  quad(13, -18, -13, -18, -20, 20, 20, 20);
  ellipse(0, 20, 40, 10);
    push();
    rotate(12);
    ellipse(-15, 6, 10, 36);
    rotate(-24);
    ellipse(15, 6, 10, 36);
    pop();
  ellipse(-13, -28, 15, 15);
  quad(-20.5, -28, -4.5, -28, 7, 12, -7, 12);
  ellipse(15, -25.5, 10, 10);
  quad(10, -25.5, 20, -25.5, 7, 12, -7, 12);
    push();
    strokeWeight(5);
    stroke(colour1);
    noFill();
    arc(-21.5, -14, 15, 25, 300, 60);
    arc(21.5, -14, 15, 25, 120, 240);
    arc(5.5, -28, 15, 20, 0, 80);
    pop();
  fill(colour2);
  rect(0, -48, 14, 60);
  ellipse(0, -18, 14, 5)
  rect(0, -2, 14, 5);
  rect(0, 15, 14, 5);
  ellipse(-9, -85, 7, 7);
  ellipse(-5.5, -96, 7, 7);
  fill(colour1);
  rect(0, -78, 14, 6);
  ellipse(-6.5, -78, 6, 6);
  ellipse(6.5, -78, 6, 6);
  ellipse(2, -96, 12, 12);
  quad(8, -96, -4, -96, -9.5, -78, 3.5, -78);
    push();
    strokeWeight(5);
    stroke(colour1);
    noFill();
    arc(11, -87, 15, 22, 115, 230);
    pop();
    push();
    strokeWeight(2);
    stroke(colour3);
    line(-3, 11.5, -3, -83);
    line(3, 11.5, 3, -94);
    pop();
  pop();
}


// draws head of cat body
function drawCatHead(x, y, colour) {
  let headWidth = 90;
  let headHeight = 70;

  // main head
  noStroke();
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
  noStroke();
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