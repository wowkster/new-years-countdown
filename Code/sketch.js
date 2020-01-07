// Global Variable Declaration:

// create an empty array for the fireworks
var fireworks = [];
//create a global gravitational force
var gravity;
//set is New year to false
var isNewYear = false;
//set the date of new years
var deadline = "January 1 2020 00:00:00";
// var explosion;
var opened = false;
var ukieMode = false;
var message;
var message2;
var changed = false;
var message3;
var openUrl = 'https://www.youtube.com/watch?v=HWSqv-xsc5o';
var soundSrc = 'assets/explosion.mp3';
// --------------------------------------------------------------


//the setup function runs once on startup
function setup() {
    // create a canvas with a width of just under the browser's width and just under the browser's height
    createCanvas(innerWidth - 10, innerHeight - 20);
    //set the background to 0 (black)
    background(0);
    //set the global gravitational force as a vector object
    if (height > width) {
        gravity = createVector(0, 0.12);
    } else {
        gravity = createVector(0, 0.2);
    }
    // explosion.preload();
    if (ukieMode) {
        message = "Відлічіть до Нового року";
        message2 = "Щасливого Нового Року!";
    } else {
        message = "New Year's Eve Count Down";
        message2 = "Happy New Year!";
    }
}

// --------------------------------------------------------------

//the draw function loops at 60 times a second
function draw() {
    if (!changed) {
        if (ukieMode) {
            message = "Відлічіть до Нового року";
            message2 = "Щасливого Нового Року!";
        } else {
            message = "New Year's Eve Count Down";
            message2 = "Happy New Year!";
        }
    }

    //set the background to 0 (black) with some opacity to show the previous frame creating a trail effect
    background(0, 50);
    //loop through the fireworks array and update their location and show them on the screen
    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        //if the firework is done remove it from the array (this makes the sketch run faster)
        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
    }

    // detect if it is New Year
    if (Math.floor(getTimeRemaining(deadline).total) <= 1) {
        // set is New Year to true
        isNewYear = true;
    }

    // if it is New Year, do this:
    if (isNewYear) {

        //if a random float between 0 and 1 is less than 0.2, add a new firework to the firworks array
        if (random(1) < 0.075) {
            fireworks.push(new Firework());
        }

        //display the text "Happy New Years!" and set the clock to 0
        displayText(message2, "000:00:00:00", 72, 0, 0, 255, 255, 255, 255, 150, 250)
    }

    //if it's not new year, run this:
    else {
        if (Math.floor(getTimeRemaining(deadline).total) <= 3600000) {
            var timeLeft = getTimeRemaining(deadline).days + ":" + getTimeRemaining(deadline).hours + ":" + getTimeRemaining(deadline).minutes + ":" + getTimeRemaining(deadline).seconds;
            //display the text "New Years Eve Count Down" and show the timeLeft Variable as the clock
            displayText(message, timeLeft, 64, 0, 255, 0, 255, 255, 255, 150, 250);


            if (Math.floor(getTimeRemaining(deadline).total) <= 60000) {
                if (random(1) < 0.005) {
                    fireworks.push(new Firework());
                }

                //set the time left variable to a string with all of the different times seperated by a ":"
                var secLeft = getTimeRemaining(deadline).seconds;
                //display the text "New Years Eve Count Down" and show the timeLeft Variable as the clock
                displayText(message, secLeft + " Seconds", 72, 255, 0, 255, 255, 255, 255, 150, 250);
                if (Math.floor(getTimeRemaining(deadline).total) <= 47000 && opened == false) {
                    window.open(openUrl, 'NewWin', 'toolbar=no,status=no,width=350,height=135');
                    opened = true;
                }
            }
        }

        else {
            if (random(1) < 0.001) {
                fireworks.push(new Firework());
            }
            //set the time left variable to a string with all of the different times seperated by a ":"
            var timeLeft = getTimeRemaining(deadline).days + ":" + getTimeRemaining(deadline).hours + ":" + getTimeRemaining(deadline).minutes + ":" + getTimeRemaining(deadline).seconds;
            //display the text "New Years Eve Count Down" and show the timeLeft Variable as the clock
            displayText(message, timeLeft, 64, 255, 0, 0, 255, 255, 255, 150, 250);
        }
    }
}

const sound = new Audio();
function playExplosion() {
    // const sound = new Audio();
    sound.src = soundSrc;
    sound.cloneNode(true).play();
}