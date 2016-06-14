var UPSAMPLE_FACTOR = 6;

var WIDTH = 160;
var HEIGHT = 100;

var STAR_RANGE_FACTOR = 20;
var STAR_RANGE_X = WIDTH * STAR_RANGE_FACTOR;
var STAR_RANGE_Y = HEIGHT * STAR_RANGE_FACTOR;
var STAR_RANGE_Z = 80;

var MAX_PLANES = 3;

var MAX_STARS = 200;
var BASE_SPEED = 0.45;

var BASE_COLOR_INTENSITY = 0;
var MAX_COLOR_INTENSITY = 255;

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
    return { "x": rand_range(-STAR_RANGE_X, STAR_RANGE_X),
        "y": rand_range(-STAR_RANGE_Y, STAR_RANGE_Y),
        "z": rand_range(0.1, STAR_RANGE_Z),
        "speed_class" : rand_int(MAX_PLANES) };
}

function setup() {
    createCanvas(WIDTH * UPSAMPLE_FACTOR, HEIGHT * UPSAMPLE_FACTOR);
    background(0);

    var i;
    for (i = 0; i < MAX_STARS; ++i) {
        var s = gen_star();
        g_Stars.push(s);
    }
}

function draw() {
    background(0);
    var i;
    for (i = 0; i < MAX_STARS; ++i) {
        var color = BASE_COLOR_INTENSITY +
            ((MAX_COLOR_INTENSITY - BASE_COLOR_INTENSITY) / STAR_RANGE_Z) * (STAR_RANGE_Z - g_Stars[i].z);
        stroke(color);
        fill(color);
        var x = round(g_Stars[i].x / g_Stars[i].z) + WIDTH / 2;
        var y = round(g_Stars[i].y / g_Stars[i].z) + HEIGHT / 2;
        pixel(x, y);

        g_Stars[i].z -= BASE_SPEED * (g_Stars[i].speed_class + 1);
        if (g_Stars[i].z <= 0) {
            g_Stars[i] = gen_star();
        }
    }
}
