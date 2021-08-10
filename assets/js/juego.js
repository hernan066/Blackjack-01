/* 2c = 2 treboles
2d= 2 diamantes
2h = 2 de corazones
2s = 2 de espada */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
    puntosComputadora = 0;

//Referencis del HTML
const btnPedir = document.querySelector ("#btnPedir");
const btnDetener = document.querySelector ("#btnDetener");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

let marcadorJug = document.querySelectorAll("small")[0];
let marcadorCom = document.querySelectorAll("small")[1];


//Esta funcion crea un deck desordenado
const crearDeck = () => {

    for( let i = 2; i <= 10; i++){
        for( let tipo of tipos ){
            deck.push ( i + tipo);
        }
    }
    for( let tipo of tipos ){
        for(let esp of especiales){
            deck.push ( esp + tipo);
        }
    }
    
    
    //console.log(deck);
    
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//Esta funcion es para pedir carta
const pedirCarta = ()=>{
   if ( deck.length === 0){
       throw "No hay cartas en el Deck";
   }
   
    const carta = deck.pop();
    console.log(deck);
    console.log(carta);
    return carta;
}

pedirCarta();

//funcion para ver cuanto vale cada carta
const valorCarta = (carta)=> {
    //toma todo el string menos la ultima letra
    const valor = carta.substring(0, carta.length -1);
    return ( isNaN(valor))
            ? (valor === "A") ? 11 :10
            : valor * 1; // camo el valor es un string se multiplica por 1 y se transf en numero
                            
}

const valor = valorCarta (pedirCarta());
console.log({valor});

//Turno de la computadora
const turnoComputadora = (puntosMinimos)=>{

do{

    const carta = pedirCarta();
    puntosComputadora = puntosComputadora +valorCarta(carta);
    marcadorCom.innerText = puntosComputadora;

    const imgCarta = document.createElement ("img");
    imgCarta.src =`assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");

    divCartasComputadora.append(imgCarta);
    

    if (puntosMinimos > 21){
        break;
    }
}while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

setTimeout(()=>{

    if (puntosComputadora===puntosMinimos ){
        alert("Nadie gana")
    }else if(puntosMinimos>21){
        alert("La computadora gana");
    }else if(puntosComputadora>21){
        alert ("Felicidades ganaste!!")
    }else{
        alert("La computadora gana");
    }
}, 100);

}



//Eventos
btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador +valorCarta(carta);
    marcadorJug.innerText = puntosJugador;

    const imgCarta = document.createElement ("img");
    imgCarta.src =`assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21){
        console.warn("Has perdido");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if( puntosJugador === 21 ){
        console.warn("21 ganaste");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }

})

btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
    
})

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    marcadorJug.innerText = 0;
    marcadorCom.innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});


