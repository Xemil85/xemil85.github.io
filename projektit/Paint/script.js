// Määritetään meidän piirtämisalue
const canvas = document.getElementById("sheet");

// Piirtoalustan leveys ja korkeus
canvas.width = document.getElementById('leveys').offsetWidth;
canvas.height = document.getElementById('korkeus').offsetWidth;

// Muuttuja, joka mahdollistaa sen, että voidaan piirtää jotakin alustalle ja alusta on valkoinen.
let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

// Muuttujat, jolla pystytään määrittelemään piirtovärin, paksuuden, piirto toimivuuden.
let piirravari = "black";
let paksuus = 1;
let piirretaan = false;
let kumoapiirto = [];
let i = -1;

// Värin vaihto
function vaihdavari(element) {
    piirravari = element.style.background;
}

// Tallennus piirretylle kuvalle
function tallenna() {
    context.fillStyle = "white";
    var latauslinkki = document.getElementById("lataa");
    var kuva = document.getElementById("sheet").toDataURL("image/png").replace("image/png", "image/octet-stream");
    latauslinkki.setAttribute("href", kuva);
}

// EventListenereihin ollaan määritelty hiiren toimivuus piirtämiseen
// Mousedown, kun painetaan hiiren painiketta, joka aloittaa piirtämisen.
// Mouseup, kun hiiren painikeesta päästetään irti, joka lopettaa piirtämisen.
// Mousemove mahdollistaa piirtämisen liikkuvuuden hiirellä.
canvas.addEventListener("mousedown", aloita, false);
canvas.addEventListener("mousemove", piirra, false);
canvas.addEventListener("mouseup", lopeta, false);
canvas.addEventListener("mouseout", lopeta, false);

function aloita(event) {
    piirretaan = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, 
                    event.clientY - canvas.offsetTop);
    event.preventDefault();
}

// Piirtaminen
function piirra(event) {
    if (piirretaan) {
        context.lineTo(event.clientX - canvas.offsetLeft, 
                        event.clientY - canvas.offsetTop);
        context.strokeStyle = piirravari;
        context.lineWidth = paksuus;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    event.preventDefault();
}

function lopeta(event) {
    if (piirretaan) {
        context.stroke();
        context.closePath();
        piirretaan = false;
    }
    event.preventDefault();

    if (event.type != 'mouseout') {
        kumoapiirto.push(context.getImageData(0,0, canvas.width, canvas.height));
        i += 1;
    }
    
}

// Pyyhkii kokonaan canvasista mitä olet piirtänyt.
function pyyhitaideteos() {
    context.fillStyle = "white";
    context.clearRect(0,0, canvas.width, canvas.height);
    context.fillRect(0,0, canvas.width, canvas.height);

    kumoapiirto = [];
    i = -1;
}

// Kumoaa piirtämäsi kohdan.
// Tarkistaa, että jos piirtämiäsi kohtia ei ole kuin nolla tai vähemmän, niin pyyhkii alustan.
// Jos piirtämiä kohtia on enemmän, niin se poistaa yhden kerrallaan kumoa painikkeella.
function kumoa() {
    if (i <= 0) {
        pyyhitaideteos();
    } else {
        i -= 1;
        kumoapiirto.pop();
        context.putImageData(kumoapiirto[i], 0, 0);
    }
}