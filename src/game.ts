import type { Sketch } from "p5-svelte";

import { Entity, Player, Sound, Wall } from "~/entities";
import { v } from "~/utils/vector";

const DEBUG = false;

let sounds: Sound[];
let walls: Wall[];
let player: Player;

let interval: NodeJS.Timer;

export const sketch: Sketch = (p5) => {
  p5.setup = () => {
    // p5.pixelDensity(p5.windowWidth / 840);
    // console.log(p5.displayDensity());

    Entity.injectP5(p5);

    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    player = new Player();

    sounds = [];

    walls = [
      new Wall(v(200, 100), v(600, 100)),
      new Wall(v(800, 800), v(500, -400)),
    ];

  };

  p5.windowResized = () => {
    // p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    // p5.pixelDensity(p5.windowWidth / 840);
    p5.background(0);
  };

  p5.draw = () => {
    p5.background(0);
    setCamera();

    sounds.map(sound => sound.render());

    sounds = sounds.filter(sound => !sound.willBeRemoved());

    player.render();
    if (DEBUG) {
      walls.map(wall => wall.render());
    }

    player.next();
    sounds.map(sounds => sounds.next(walls));
  };

  p5.touchStarted = () => {
    if (interval) return;
    createFootstep();
    interval = setInterval(createFootstep, 600);
  };

  p5.touchEnded = () => {
    clearInterval(interval);
    interval = undefined;
  };

  const createFootstep = () => {
    player.createFootstep();
    sounds.push(...Sound.createWave(player.position));
  };

  const setCamera = () => {
    p5.translate(
      v(p5.width / 2, p5.height / 2)
        .sub(player.position),
    );
  };

  // p5.touchStarted = () => {
  //   sounds.push(...Sound.createWave(p5.createVector(p5.mouseX, p5.mouseY)));
  // };
};
