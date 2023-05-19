# Dark Echo

> ID: 20220042 
> 
> Name: Soonho Kwon
> 
> Email: snowsuno@kaist.ac.kr

[Github Repo](https://github.com/SnowSuno/dark-echo)
&nbsp;
[Youtube]()

* * *

## Game Description

"Dark Echo" is a puzzle game where the player navigates through dark environments using only sound. 
The objective of the game is to guide the player character to the end of each level while avoiding obstacles and traps. 
The player emits sounds that bounce off objects in the environment, creating a visual representation of the surroundings. 
The player must use this visualization to navigate to the exit.

The game will be divided into several levels, each with its own unique environment and challenges. T
he difficulty will gradually increase as the player progresses through the levels. 
The player will win by reaching the end of the final level, and they will lose if they collide with an obstacle or an enemy.

## Code Description

The repository has a structure as follows:

```
dark-echo/
├─ node_modules/
├─ public/
├─ src/
│  ├─ assets/      # assets used in the game
│  ├─ entities/    # game entities
│  ├─ game/        # game logic
│  ├─ levels/      # level data
│  ├─ pages/       # pages
│  ├─ utils/       # utility functions
│  ├─ main.ts      # Entry point
├─ .gitignore
├─ package.json
├─ README.md
├─ ...other config files
```
You can check the details of each file in the repository.

The game is mainly written in object-oriented style. 
Each game entity extends the base class `Entity`, which has basic functions such as `render` and `next`.
The `World` class contains and manages all the entities, and handles the main game logic and renders the game.

The basic game logic cycle is the following form:
```typescript
p5.draw = () => {
  world.render();
  world.next();
}
```
Every frame, the game renders the current state and updates the state to the next frame.

## Known Issues
- Collisions in the map corners are not handled properly
- Game audio code is not well encapsulated
    - due to implementation time limits
- Missing minor end-to-end features
    - Level selection
    - Game progress persistence
    - etc.
