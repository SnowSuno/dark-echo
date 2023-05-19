import type { Sketch } from "p5-svelte";

import { Entity, Sound } from "~/entities";
import { World } from "~/game/world";

import footstepSound from "~/assets/foot.mp3";
import windSound from "~/assets/wind.wav";

import { Howl } from "howler";
import type { Navigate } from "~/types";

const DEBUG = true;

let world: World;
let interval: NodeJS.Timer;

let bgSound: Howl;
let sound: Howl;

export const game = (transition: Navigate, level: number): Sketch => (p5) => {
  p5.preload = async () => {
    bgSound = new Howl({
      src: [windSound],
      loop: true,
    })

    sound = new Howl({
      src: [footstepSound],
    })

  };

  p5.setup = () => {
    Entity.injectP5(p5);

    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    world = World.init();
    bgSound.play();
    bgSound.fade(0, 1, 5000);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
  };

  p5.draw = () => {
    world.render();
    world.next();

    DEBUG && world.debug();

    world.map.deaths.some(death => death.contains(world.player.position)) && die();
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
    sound.play();

    world.player.createFootstep();
    world.sounds.push(...Sound.createWave(world.player.position, world.map));
  };

  const die = () => {
    bgSound.stop();
    p5.remove();
    transition("restart");
  }
  // const navigateLevel = (restart: boolean) => {
  //
  //   if (restart) {
  //     world = World.init();
  //   }
  // }
};
