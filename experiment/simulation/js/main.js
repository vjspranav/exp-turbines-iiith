"use strict";
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const arrayRemove = (arr, value) => {
  return arr.filter(function (ele) {
    return ele != value;
  });
};

const ids = ["long", "lcontainer"];

const asyncMove = async (id, curPosition = 0, finalPosition = 1) => {
  let path = document.getElementById(id);
  let flags = [true, true];
  while (true) {
    let animation_speed = document.getElementById("water-flow").value;
    animation_speed = animation_speed * 0.0001;
    animation_speed = animation_speed == 0 ? 0.0001 : animation_speed;
    if (curPosition > finalPosition) break;
    curPosition += animation_speed;
    if (id === "left-curve") {
      if (curPosition > 0.99 && flags[0]) {
        asyncMove("right-curve");
        flags[0] = false;
      }
    }
    if (id === "right-curve") {
      if (curPosition > 0.99 && flags[1]) {
        asyncMove("rcontainer");
        flags[1] = false;
      }
    }
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
};

const resetEverything = () => {
  const tube_ids = ["left-curve", "right-curve", "rcontainer"];
  tube_ids.forEach((element) => {
    let path = document.getElementById(element);
    path.setAttribute("offset", 0);
  });
  ids.forEach((ele) => {
    let path = document.getElementById(ele);
    path.setAttribute("offset", 0);
  });
};

const chhotu = async () => {
  var b = document.getElementById("wheel");
  for (var i = 0; i < 360; i++) {
    console.log(i);
    b.setAttribute("transform", `rotate(${i})`);
    // document.getElementById("wheel").transform = `rotate(${i})`;
    await new Promise((r) => setTimeout(r, 100));
  }
};

const startAnimation = async () => {
  resetEverything();
  document.getElementById("startbutton").disabled = true;
  document.getElementById("resetbutton").disabled = true;
  await animation();
  document.getElementById("startbutton").disabled = false;
  document.getElementById("resetbutton").disabled = false;
};
chhotu();
