import { Howl } from "howler";
import windSound from "~/assets/wind.wav";
import footstepSound from "~/assets/foot.mp3";


export class Audio {
  private static bg: Howl;
  private static sound: Howl;

  static get background() {
    if (!Audio.bg) {
      Audio.bg = new Howl({
        src: [windSound],
        loop: true,
        volume: 0,
      });
    }
    return Audio.bg;
  }

  static get footstep() {
    if (!Audio.sound) {
      Audio.sound = new Howl({
        src: [footstepSound],
      });
    }
    return Audio.sound;
  }

// export const bgSound = new Howl({
//   src: [windSound],
//   loop: true,
// });
//
// export const sound = new Howl({
//   src: [footstepSound],
// });
}
