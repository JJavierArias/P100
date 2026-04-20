var ampladaCarta=80, alcadaCarta=120;
var separacioH=20, separacioV=20;
var nFiles=4, nColumnes=4;

var jocCartes = [
    'carta14', 'carta14', 'carta2', 'carta2'
];


$(function(){
    

    // mida del tauler
    $("#tauler").css({
       "width" : ampladaCarta*nColumnes + separacioH*(nColumnes+1) + "px",
        "height": alcadaCarta*nFiles + separacioV*(nFiles+1) + "px"
    });

    var indexCarta=0;
    for(var f=1; f<=nFiles; f++){
        for(var c=1; c<=nColumnes; c++){

            carta=$("f"+f+"c"+c);
            var $novaCarta = $(
                '<div class="carta" id="' + carta + '">' +
                    '<div class="cara darrera"></div>' +
                    '<div class="cara davant"></div>' +
                '</div>'
                );

            var posLeft = ((c - 1) * (ampladaCarta + separacioH) + separacioH);
            var posTop = ((f - 1) * (alcadaCarta + separacioV) + separacioV);
            $novaCarta.css({
             "left" :  posLeft+"px",
              "top"  :  posTop+"px"
            });
             var figura = jocCartes[indexCarta];
            $novaCarta.find(".davant").addClass(figura);
            indexCarta++;

        $("#tauler").append($novaCarta);
        }
     }
    carta.find(".davant").addClass(jocCartes.pop());
   
    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });

}

);