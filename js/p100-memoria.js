var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=1, nColumnes=1;

var jocCartes = [
    'carta14',
    'carta14',
    'carta15',
    'carta15',
];


$(function(){
    var f, c, carta;
    f=2;
    c=2;

 

    ampladaCarta=$(".carta").width(); 
    alcadaCarta=$(".carta").height();
    // mida del tauler
    $("#tauler").css({
        "width" : "120px",
        "height": "160px"
    });

    carta=$("#f"+f+"c"+c);
    carta.css({
        "left" :  ((c-1)*(ampladaCarta+separacioH)+separacioH*(c+1))+"px",
        "top"  :  ((f-1)*(alcadaCarta+separacioV) +separacioV*(f+1))+"px"
    });
    carta.find(".davant").addClass(jocCartes.pop());
   
    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });

});