var UPSAMPLE_FACTOR = 6;

var WIDTH = 160;
var HEIGHT = 100;

var MAX_STARS = 100;
var MAX_PLANES = 5;
var BASE_SPEED = 0.35;

var g_Stars = [];

function rand_range(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

function rand_int(i) {
    return rand_range(0, i);
}

function pixel(x, y) {
    rect(x * UPSAMPLE_FACTOR, y * UPSAMPLE_FACTOR, UPSAMPLE_FACTOR, UPSAMPLE_FACTOR);
}

function gen_star() {
    return { "x": rand_int(WIDTH), "y": rand_int(HEIGHT), "plane" : rand_int(MAX_PLANES) };
}

function setup() {
    createCanvas(WIDTH * UPSAMPLE_FACTOR, HEIGHT * UPSAMPLE_FACTOR);
    background(0);

    var i;
    for (i = 0; i < MAX_STARS; ++i) {
        var s = gen_star();
        // console.log(s);
        g_Stars.push(s);
    }

    noStroke();
}

function draw() {
    background(0);
    var i;
    for (i = 0; i < MAX_STARS; ++i) {
        var color = 40 + ((255 - 40) / MAX_PLANES) * g_Stars[i].plane;
        // console.log(color);
        // stroke(color);
        fill(color);
        pixel(g_Stars[i].x, g_Stars[i].y);

        g_Stars[i].x += BASE_SPEED * g_Stars[i].plane;
        if (g_Stars[i].x >= WIDTH) {
            g_Stars[i].x = 0;
            g_Stars[i].y = rand_int(WIDTH);
        }
    }
}
