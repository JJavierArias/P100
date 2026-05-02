var ampladaCarta = 80, alcadaCarta = 120; // Definidos para que el cálculo inicial funcione
var separacioH = 20, separacioV = 20;
var nFiles = 2, nColumnes = 3;

var jocCartes = [
    'carta14', 'carta14', 'carta3', 'carta3', 'carta11', 'carta11'
];


//TASCA 1
// Completa

//TASCA 2
// en principio la hice, completada --> function barajar()

//TASCA 3
// el tablero se tiene que crear dinamicamente no hay que poner los 6 divs en el html
// supongo que mediante un bucle, haciendo algo parecido a esto (carta=$("#f"+f+"c"+c);) de insertar html
//Completa

//TASCA 4
// es lo que modifique del width y height, usando los variables globales fijos

//TASCA 5 X
//comparar si dos cartas son iguales
//habra que meter algo en el "carta onclick" para que cuente cuando gire dos cartas y compare, 
// si son pareja las elimina del juego
// si no son pareja les da la vuelta y continua

//aqui van las dos cartas que levantemos
var comparaCartas = [];

//TASCA 6 X
// si se encontraron todas las parejas, mostrar un mensaje de exito "you win"
// contador de parejas, cuando se llegue al numero, muestra mensaje 
// parejas = (nfiles* ncolumnes)/2

var parejasEncontradas = 0;

// TASCA 7 
// el usuario pierde la partida si su numero de clicks es 3 veces el numero de cartas
// hay que mostrar un mensaje de "you lose" y empezar nueva partida

var maxClicks = jocCartes.length * 3;
//para contar el numero de clicks que hacemos
var numClicks = 0;

function barajar(array) 
{
    for (var i = array.length - 1; i > 0; i--) 
    {
        var j = Math.floor(Math.random() * (i + 1));
        var aux = array[i];
        array[i] = array[j];
        array[j] = aux;
    }
}



//tasca 6
function comprovarVictoria() 
{
    // calculamos cuantas parejas hay en total según las filas y columnas 
    var totalParejas = (nFiles * nColumnes) / 2;

    // comparamos si las que hemos encontrado son iguales al total
    if (parejasEncontradas === totalParejas) 
        {
        
        
        setTimeout(function() 
        {
            alert("¡ENHORABUENA! Has completado el juego en " + numClicks + " clics");
            
            //Reiniciamos la partida 
            location.reload();
        }, 500); 
    }
}


//tasca7

function comprovarDerrota()
{
    if (numClicks >= maxClicks)
        {
            alert("Has perdut! Has fet " + numClicks + " clics");
            location.reload();
        }
}

// Y en el evento click simplemente llamas a la función:
numClicks++;
comprovarDerrota();

$(function() 
{
    var f = 1, c = 1;

    // Mida del tauler
    $("#tauler").css({
        "width": (nColumnes * ampladaCarta) + (separacioH * (nColumnes + 1)) + "px",
        "height": (nFiles * alcadaCarta) + (separacioV * (nFiles + 1)) + "px",
        
    });

    barajar(jocCartes);

    // TASCA 3 & 4, crear dinamicamente los divs en el taule
    while (jocCartes.length > 0) 
        {
        
        var idActual = "f" + f + "c" + c;
        var claseImagen = jocCartes.pop(); // Sacamos la última carta del array barajado

        //Tasca 3
        var $novaCarta = $(
            '<div class="carta" id="' + idActual + '">' +
                '<div class="cara darrera"></div>' +
                '<div class="cara davant ' + claseImagen + '"></div>' +
            '</div>'
        );

        // Aplicamos el CSS de posicionamiento (Tasca 4)
        $novaCarta.css({
            "width": ampladaCarta + "px",
            "height": alcadaCarta + "px",
            "left": ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
            "top": ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px",
            
        });

        //insertamos la carta en el tablero
        $("#tauler").append($novaCarta);

        
        f++;
        if (f > nFiles) {
            f = 1;
            c++;
        }
        if (c > nColumnes) {
            break;
        }
    }

    // Delegación de eventos para las cartas creadas dinámicamente
  
    $("#tauler").on("click", ".carta", function() 
    {
    
        // guardamos la carta que acabamos de clicar en una variable 
        var $cartaActual = $(this);

        
        // Si la carta ya está girada (clase 'carta-girada') 
        // o si ya hay 2 cartas en proceso de comparación, no hacemos nada.
        if ($cartaActual.hasClass("carta-girada") || comparaCartas.length >= 2)
            {
                return;
            }
           

    //giramos la carta 
    $cartaActual.addClass("carta-girada");

    // Guardamos esta carta en nuestro array 'comparaCartas' para recordarla
    comparaCartas.push($cartaActual);
    
    // TASCA 7: Sumamos un clic al contador y comprobamos si el usuario ha perdido
    numClicks++;
    comprovarDerrota();

    //compruebo si hay dos cartas giradas
    if (comparaCartas.length === 2) 
    {

            // Buscamos el div interno '.davant' y leemos TODAS sus clases de CSS.
            // Esto nos devolverá algo como "cara davant carta14"
            var carta1 = comparaCartas[0].find(".davant").attr("class");
            var carta2 = comparaCartas[1].find(".davant").attr("class");

            // comparamos la clase de ambas cartas
            if (carta1 === carta2) 
            {
            
            // si son iguales
            // Esperamos 600ms para que termine la animación de giro antes de borrarlas 
            setTimeout(function() 
            {
                // lo sacamos del tablero las q son pareja
                comparaCartas[0].remove();
                comparaCartas[1].remove();


                // si coincide, pareja encontrada
                parejasEncontradas++;
        
                // funcion que comprueba si se hallaron todas las parejas y si es asi, salta un alert de victoria sino sigue el juego
                comprovarVictoria();
                
                // Vaciamos el array para poder elegir la siguiente pareja
                comparaCartas = [];

                
            }, 1000);

        } 
        else 
        {
            
            // NO son iguales 
            // Esperamos 1 segundo para que al jugador le de tiempo a ver el error
            setTimeout(function() 
            {
                // Les quitamos la clase para que vuelvan a quedar boca abajo
                comparaCartas[0].removeClass("carta-girada");
                comparaCartas[1].removeClass("carta-girada");
                
                // Vaciamos el array para seguir intentándolo
                comparaCartas = [];
            }, 1000);
        }
    }

});
});


//22/04/2026
//apuntes profe: 

// primera observacion:

// meter en funciones el codigo

// segunda observacion,:

// al hacer el primer click , guardar la carta
// y al segundo click , guardar la carta
//pasar una funcion que las compare y nos devuelva un booleano

// esto puede ir en una funcion : 
// f++;
//         if (f > nFiles) {
//             f = 1;
//             c++;
//         }
//         if (c > nColumnes) {
//             break;
//         }

//esto puede ir en otra funcion, la funcion que genera los divs

//  var idActual = "f" + f + "c" + c;
//         var claseImagen = jocCartes.pop(); // Sacamos la última carta del array barajado

//         //Tasca 3
//         var $novaCarta = $(
//             '<div class="carta" id="' + idActual + '">' +
//                 '<div class="cara darrera"></div>' +
//                 '<div class="cara davant ' + claseImagen + '"></div>' +
//             '</div>'
//         );

//         // Aplicamos el CSS de posicionamiento (Tasca 4)
//         $novaCarta.css({
//             "width": ampladaCarta + "px",
//             "height": alcadaCarta + "px",
//             "left": ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
//             "top": ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px",
            
//         });

// y depende si es true o no, pasa una cosa u otra (suma un punto si coincide, giralas si no coincide)