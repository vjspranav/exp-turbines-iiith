"use strict";
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const arrayRemove = (arr, value) => {
  return arr.filter(function (ele) {
    return ele != value;
  });
};

let rotating=true;
let updateRotating = (boo) => {
  rotating=boo
}

const ids = ["vertical", "horizontal"];

const asyncMove = async (id, curPosition = 0, finalPosition = 1) => {
  let path = document.getElementById(id);
  let flags = [true, true];
  while (true) {
    let animation_speed = document.getElementById("water-flow").value;
    animation_speed = animation_speed * 0.0001;
    animation_speed = animation_speed == 0 ? 0.0001 : animation_speed;
    if (curPosition > finalPosition) break;
    curPosition += animation_speed
    path.setAttribute("offset", curPosition);
    await sleep(0.5);
  }
};

const animation = async () => {
  let flags = [true];
  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    let path = document.getElementById(id);
    let finalPosition = 1;
    let curPosition = 0;
    while (true) {
      let animation_speed = document.getElementById("water-flow").value;
      animation_speed = animation_speed * 0.0001;
      animation_speed = animation_speed == 0 ? 0.0001 : animation_speed;
      if (curPosition > finalPosition) break;
      curPosition += animation_speed;
      if (id === "lcontainer") {
        if (curPosition >= 0.45 && flags[0]) {
          asyncMove("left-curve");
          flags[0] = false;
        }
      }
      path.setAttribute("offset", curPosition);
      await sleep(2);
    }
  }
  rotate();
  const tube_ids = ["splash1", "splash2", "splash3"];
  while(rotating){
    let path = document.getElementById(tube_ids[0]);
    path.setAttribute("offset", 1)
    await sleep(0.3)
    path.setAttribute("offset", 0)
    path = document.getElementById(tube_ids[1]);
    path.setAttribute("offset", 1)
    await sleep(0.3)
    path.setAttribute("offset", 0)
    path = document.getElementById(tube_ids[2]);
    path.setAttribute("offset", 1)
    await sleep(0.3)
    path.setAttribute("offset", 0)
  }
};

const resetEverything = () => {
  const tube_ids = ["splash1", "splash2", "splash3"];
  tube_ids.forEach((element) => {
    let path = document.getElementById(element);
    path.setAttribute("offset", 0);
  });
  ids.forEach((ele) => {
    let path = document.getElementById(ele);
    path.setAttribute("offset", 0);
  });
  updateRotating(false);
};

const rotate = async () => {
  let b = document.getElementById("wheel");
  for (var i = 0; i < 360; i++) {
    console.log(rotating)
    //console.log(i);
    b.setAttribute("transform", `rotate(-${i})`);
    // document.getElementById("wheel").transform = `rotate(${i})`;
    await sleep(0.5)
    if(i > 358 && rotating)
      i=0
    if(!rotating)
      break
  }
};

const startAnimation = async () => {
  resetEverything();
  document.getElementById("startbutton").disabled = true;
  //document.getElementById("resetbutton").disabled = true;
  updateRotating(true);
  await animation();
  document.getElementById("startbutton").disabled = false;
  //document.getElementById("resetbutton").disabled = false;
};
