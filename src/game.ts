import type { Sketch } from "p5-svelte";

import { Entity, Sound } from "~/entities";
import { World } from "~/game/world";

import { v } from "~/utils/vector";

const DEBUG = true;

let world: World;
let interval: NodeJS.Timer;

export const sketch: Sketch = (p5) => {
  p5.setup = () => {
    Entity.injectP5(p5);

    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    world = World.init();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    // p5.pixelDensity(p5.windowWidth / 840);
    p5.background(0);
  };

  p5.draw = () => {
    world.render();
    world.next();

    DEBUG && world.debug();
    // p5.background(0);
    // setCamera();
    //
    // player.render();
    // // player.renderHitboxPoints(walls);
    // sounds.map(sound => sound.render());
    //
    // sounds = sounds.filter(sound => !sound.willBeRemoved());
    //
    // walls.map(wall => wall.render());
    //
    // player.next(walls);
    // sounds.map(sounds => sounds.next(walls));
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
    world.player.createFootstep();
    world.sounds.push(...Sound.createWave(world.player.position));
  };


  // p5.touchStarted = () => {
  //   sounds.push(...Sound.createWave(p5.createVector(p5.mouseX, p5.mouseY)));
  // };
};
