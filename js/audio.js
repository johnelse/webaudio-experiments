var context;

var info, source, filter;
var running = false

var toggle, cutoff;

window.addEventListener("load", init, false);

function toggleSource() {
    if (running) {
        source.stop();
        toggle.value = "start";
        running = false;
    }
    else {
        source = context.createOscillator();
        source.type = "square";
        source.frequency.value = 50;
        source.start();

        source.connect(filter);

        toggle.value = "stop";
        running = true;
    }
}

function updateCutoff() {
    filter.frequency.value = cutoff.value;
    info.innerHTML = filter.frequency.value;
}

function init() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;;
        context = new AudioContext();
    }
    catch(e) {
        alert("Web Audio API is not supported in this browser");
    }

    info = document.getElementById("info");
    toggle = document.getElementById("toggle");
    cutoff = document.getElementById("cutoff");

    filter = context.createBiquadFilter();
    filter.type = filter.LOWPASS;
    filter.gain.value = 1;
    filter.Q.value = 10;

    filter.connect(context.destination);

    toggle.addEventListener("click", toggleSource);
    cutoff.addEventListener("input", updateCutoff);
    updateCutoff();
}
