'use strict';

const IS_MINE = 8;

function random(max) {
  return Math.floor(Math.random() * max);
}

function getRange(x, min, max) {
  const range = [];
  range.push(x);
  if (x !== min) {
    range.push(x - 1);
  }
  if (x !== max) {
    range.push(x + 1);
  }
  return range;
}


class IO {
  static write(text) {
    process.stdout.write(text);
  }

  static toCoord(input) {
    const coord = input.split(',');
    return {
      x: parseInt(coord[0], 10),
      y: parseInt(coord[1], 10)
    };
  }

  static read(cb) {
    process.stdin.resume();
    process.stdin.on('data', (data) => {
      const coord = this.toCoord(data.toString());
      cb(coord);
    });
  }
}

class GridUtils {
  static initialize(n) {
    const grid = [];
    for (let i = 0; i < n; i += 1) {
      const row = [];
      for (let j = 0; j < n; j += 1) {
        row.push(0);
      }
      grid.push(row);
    }
    return grid;
  }

  static plantMine(x, y, grid) {
    const xRange = getRange(x, 0, grid.length - 1);
    const yRange = getRange(y, 0, grid.length - 1);
    for (let i = xRange.length - 1; i >= 0; i -= 1) {
      for (let j = yRange.length - 1; j >= 0; j -= 1) {
        const _x = xRange[i];
        const _y = yRange[j];
        if (grid[_x][_y] !== IS_MINE) {
          grid[_x][_y] ++;
        }
      }
    }
    grid[x][y] = IS_MINE;
  }

  static pickMines(n, grid) {
    let count = 0;
    while (count < n) {
      const x = random(grid.length);
      const y = random(grid.length);
      if (grid[x][y] !== IS_MINE) {
        this.plantMine(x, y, grid);
        count += 1;
      }
    }
  }

  static reveal(coord, grid) {
    const x = coord.x;
    const y = coord.y;
    if (grid[x][y] === IS_MINE) {
      console.log('Stepped on a mine');
    } else {
      // TODO: set the grid as visible
      this.print(grid);
    }
  }

  static print(grid) {
    for (let i = 0; i < grid.length; i += 1) {
      IO.write('|');
      for (let j = 0; j < grid.length; j += 1) {
        IO.write(` ${grid[i][j]} |`);
      }
      IO.write('\n');
    }
    IO.write('--------------------\n');
  }
}

function init() {
  const grid = GridUtils.initialize(10);
  GridUtils.pickMines(25, grid);
  GridUtils.print(grid);
  IO.read((coord) => {
    GridUtils.reveal(coord, grid);
  });
}

init();

