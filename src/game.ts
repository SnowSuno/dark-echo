import type { Sketch } from "p5-svelte";

import { Entity, Sound } from "~/entities";
import { World } from "~/game/world";

import footstepSound from "~/assets/foot.mp3";
import windSound from "~/assets/wind.wav";

// import Pizzicato from "pizzicato";
import { Howl } from "howler";

const DEBUG = false;

let world: World;
let interval: NodeJS.Timer;

let bgSound: Howl;
let sound: Howl;

let once = false;

export const sketch: Sketch = (p5) => {
  p5.preload = async () => {
    bgSound = new Howl({
      src: [windSound],
      loop: true,
    })

    sound = new Howl({
      src: [footstepSound],
    })

    // bgSound.play();
    // bgSound = new Pizzicato.Sound({
    //   source: "file",
    //   options: { path: windSound, loop: true },
    // }, () => {
    //   bgSound.play();
    // })
    //
    // sound = new Pizzicato.Sound(footstepSound, () => {
    //   // sound.addEffect(lowPassFilter)
    //   console.log("loaded");
    //   // sound.addEffect(reverb);
    // });
  };

  p5.setup = () => {
    Entity.injectP5(p5);

    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    world = World.init();

    // sound.addEffect(reverb);
    // bgSound.play();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
  };

  p5.draw = () => {
    world.render();
    world.next();

    DEBUG && world.debug();
  };

  p5.touchStarted = () => {
    if (!once) {
      bgSound.play();
      once = true;
    }

    if (interval) return;
    createFootstep();
    interval = setInterval(createFootstep, 600);
  };

  p5.touchEnded = () => {
    clearInterval(interval);
    interval = undefined;
  };

  const createFootstep = () => {
    //   (new Pizzicato.Group([sound])).play();
    // const s = sound.clone();
    // s.addEffect(reverb);
    // s.play();
    // s.removeEffect(reverb);
    sound.play();

    world.player.createFootstep();
    world.sounds.push(...Sound.createWave(world.player.position, world.map));
  };
};
