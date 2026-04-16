var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=2, nColumnes=2;

var jocCartes = [
    'carta14', 'carta14', 'carta2', 'carta2'
];


$(function(){
    var f, c, carta;
    f=2;
    c=2;

 

    ampladaCarta=$(".carta").width(); 
    alcadaCarta=$(".carta").height();
    // mida del tauler
    $("#tauler").css({
        "width" : "120px*"+c+"+"+separacioH*(c+1)+"px",
        "height": "160px*"+f+"+"+separacioV*(f+1)+"px"
    });

    carta=$("#f"+f+"c"+c);
    carta.css({
        "left" :  ((c-1)*(ampladaCarta+separacioH)+separacioH)+"px",
        "top"  :  ((f-1)*(alcadaCarta+separacioV) +separacioV)+"px"
    });
    carta.find(".davant").addClass(jocCartes.pop());
   
    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });

});