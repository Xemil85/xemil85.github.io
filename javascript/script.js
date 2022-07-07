function showImages(el) {
    var windowHeight = jQuery( window ).height();
    $(el).each(function(){
        var thisPos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (topOfWindow + windowHeight - 200 > thisPos ) {
            $(this).addClass("fadeIn");
        }
    });
}

// if the image in the window of browser when the page is loaded, show that image
$(document).ready(function(){
    showImages('.star');
});

// if the image in the window of browser when scrolling the page, show that image
$(window).scroll(function() {
    showImages('.star');
});

function kello() {
    var str = "";
    var paivat = new Array("Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai");
    var kuukaudet = new Array("Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu");

    var nyt = new Date();

    str += paivat[nyt.getDay()] + ", " + nyt.getDate() + " " + kuukaudet[nyt.getMonth()] + " " + nyt.getUTCFullYear();
    str += " " + nyt.getHours() + ":" + nyt.getMinutes() + ":" + nyt.getSeconds();

    document.getElementById("tanaan").innerHTML = str;
}

setInterval(kello, 1000);