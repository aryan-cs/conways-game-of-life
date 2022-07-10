var state = [], nextState = [];

function preload() { defaultFont = loadFont("assets/fonts/default.ttf"); }

function setup () {

  createCanvas(WIDTH, HEIGHT);
  canvas = document.getElementById("defaultCanvas0").getContext("2d");
  frameRate(999);

  createCornerButton("pause");
  
  spawn();

}

function draw () {

  background(BACKGROUND_COLOR);

  display();
  calculate();

}

function spawn () {

  for (var r = 0; r < ROWS; r++) {

    state.push(new Array());
    nextState.push(new Array());

    for (var c = 0; c < COLUMNS; c++) {

      if (random(0, 1) <= SPAWN_PROBABILITY) { state[r].push(1); }
      else { state[r].push(0); }
      nextState[r].push(0);

    }

  }

}

function display () {

  for (var r = 0; r < ROWS; r++) {

    for (var c = 0; c < COLUMNS; c++) {

      if (state[r][c] == 1) { fill(255); noStroke(); rect(r * CELL_SIZE, c * CELL_SIZE, CELL_SIZE, CELL_SIZE); }

    }

  }

}

function calculate () {

  for (var r = 0; r < ROWS; r++) {

    for (var c = 0; c < COLUMNS; c++) {

      var neighbors = 0;

        if ((r - 1) > -1 && (c - 1) > -1       ) { if (state[r - 1][c - 1] == 1) { neighbors++; } }
        if ((r - 1) > -1                       ) { if (state[r - 1][  c  ] == 1) { neighbors++; } }
        if ((r - 1) > -1 && (c < COLUMNS - 1)  ) { if (state[r - 1][c + 1] == 1) { neighbors++; } }
        if ((c - 1) > -1                       ) { if (state[  r  ][c - 1] == 1) { neighbors++; } }
        if (c < COLUMNS - 1                    ) { if (state[  r  ][c + 1] == 1) { neighbors++; } }
        if ((r < ROWS - 1) && (c - 1) > -1     ) { if (state[r + 1][c - 1] == 1) { neighbors++; } }
        if (r < ROWS - 1                       ) { if (state[r + 1][  c  ] == 1) { neighbors++; } }
        if ((r < ROWS - 1) && (c < COLUMNS - 1)) { if (state[r + 1][c + 1] == 1) { neighbors++; } }
        
        if (state[r][c] == 1) {

          if (neighbors == 2 || neighbors == 3) { nextState[r][c] = 1; }
          else                                  { nextState[r][c] = 0; }

        }

        else {

          if (neighbors == 3) { nextState[r][c] = 1; }
          else                { nextState[r][c] = 0; }

        }

    }

  }

  state = nextState;

}