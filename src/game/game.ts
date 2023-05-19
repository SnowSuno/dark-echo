import type { Sketch } from "p5-svelte";

import { Entity, Sound } from "~/entities";
import { World } from "~/game/world";

import type { Navigate } from "~/types";
import { Audio } from "~/assets/audio";

const DEBUG = false;

export const game = (transition: Navigate, level: number): Sketch => {
  let world: World;
  let interval: NodeJS.Timer;

  return (p5) => {

    p5.setup = () => {
      Entity.injectP5(p5);

      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0);

      world = World.init();
      Audio.background.play();
      Audio.background.fade(0, 1, 5000);

      addControls();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0);
    };

    p5.draw = () => {

      world.render();
      world.next();

      DEBUG && world.debug();

      p5.fill(255);
      p5.beginShape();
      p5.bezierVertex(-14.77, -57, 8.77, -57, -3, -57);
      p5.bezierVertex(19.81, -27.23, 23.19, -5.77, 21.5, -21.5);
      p5.endShape();

      world.map.deaths.some(death => death.contains(world.player.position)) &&
      die();
    };

    const addControls = () => {
      console.log("add controls");
      p5.touchStarted = () => {
        if (interval) return;
        createFootstep();
        interval = setInterval(createFootstep, 500);
      };

      p5.touchEnded = () => {
        clearInterval(interval);
        interval = undefined;
      };
    };

    const createFootstep = () => {
      Audio.footstep.play();

      world.player.createFootstep();
      world.sounds.push(...Sound.createWave(world.player.position, world.map));
    };

    const die = () => {
      Audio.background.fade(1, 0, 100);
      Audio.background.stop();
      Audio.footstep.fade(1, 0, 100);
      Audio.footstep.stop();
      clearInterval(interval);
      p5.remove();
      transition("restart");
    };
  };
};
