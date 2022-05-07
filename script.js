
//AVISO!! SE LE ANTEPONDRA EL SIGNO $ A LAS VARIABLES PARA INDICAR QUE SE ESTAN TRABAJANDO CON OBJETOS DEL DOM

//A CONTINUACION GUARDAMOS LA REFERENCIA DEL OBJETO DIV (DISCOS), PARA ASIGNARLES UN VALOR
//ESTE NOS SERIVA MAS ADELANTE PARA COMPROBAR QUE NO SE COLOQUEN DISCOS CON MAYOR VALOR(TAMAÑO).
const $disc1 = document.getElementById('disco1').value = 1;
const $disc2 = document.getElementById('disco2').value = 2;
const $disc3 = document.getElementById('disco3').value = 3;
const $disc4 = document.getElementById('disco4').value = 4;
const $disc5 = document.getElementById('disco5').value = 5;

//SIGUIENTE SE SELECCION EL TIPO DE MODO QUE ES UN SELECTOR; ESTE NOS SERVIRA PARA CAPTAR CUANDO SE HAGA UN CAMBIO
//(SE SELECCION OTRO OPCION DENTRO DEL SELECTOR Y ASI CAMBIAR DE MODO DE JUEGO)
const $modo = document.getElementById("modos");

//SE SELECCIONAN LAS TORRES YA QUE ESTAS NOS SERVIRAN PARA PASAR DE DISCOS DE TORRES EN TORRES, YA QUE NO
//PUDIMOS REALIZAR DE MANERA CORRECTA CON EL DRAG AND DROP
const $torre1 = document.getElementById('torre1');
const $torre2 = document.getElementById("torre2");
const $torre3 = document.getElementById("torre3");

const $mensaje = document.getElementById("mensajes");
const $alerta = document.getElementById("alerta");
//SE GUARDA EN UNA VARIABLE LLAMADA MOVIMIENTOS LA REFERENCIA DEL OBJETO DEL ELEMENTO DIV DONDE SE ACTUALIZARA LOS
//MOVIENTOS QUE EL JUGADOR HAGA
let movimientos = document.getElementById('movimientos');
var audio = new Audio("music.mp3"); //SE GUARDA EN UNA VARIABLE LA MUSICA QUE VAMOS A REPRODUCIR MAS ADELANTE :D

window.onload = function(){
    $mensaje.style.backgroundColor = "#1dbfd5";
    $alerta.textContent = "OJO!! PARA JUGAR SOLO TIENE QUE DAR CLICK EN LA TORRE QUE QUIERE SELECCIONAR EL DISCO Y LA TORRE A LA QUE QUIERE PASARLO"
    setTimeout(()=>{
        $alerta.textContent = "";
        $mensaje.removeAttribute("style");
    },5400);
};

$modo.addEventListener("change",(event)=>{
    if($modo.value == 2){ // EL VALOR 2 CORRESPONDE AL MODO DE JUEGO "MODO MAESTRO" CUANDO ESTE SE SELECCIONA ENTRA AL CONDICIONAL
        const body = document.querySelector("body");
        body.style.backgroundImage = "url('giphy.gif')";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "100%";
        body.style.backgroundPosition = "center";

        audio.play(); //REPRODUCE CANCION DEL JUEGO, QUE SE GUARDO EN LA LINEA 28 DEL CODIGO
        var iterador = 0; //ITERADOR PARA CONTAR LOS MINUTOS QUE DECRECE EN EL TEMPORIZADOR 
        var minutos = 3; //SE CREA UNA VARIABLE MINUTOS Y SE LE AGREGA EL VALOR DE 2
        var segundos = 20; // SE CREA UNA VARIABLE SEGUNDOS Y SE LE ASIGNA EL VALOR DE 60, QUE CORRESPONDERAN A 3 MINUTOS
        const contador = setInterval(function(){
            document.getElementById("timer").innerHTML = minutos +" : " + segundos ; //SE REFERENCIA AL OBJETO DDEL ELEMENTO DIV
            //DONDE SE ACTUALIZARA CADA 1 SEGUNDO (1000MILISEGUNDOS), EL VALOR DEL TEMPORIZADOR DECRECIENDO.
            segundos--; //SE DECRECE EL VALOR DE LA VARIABLE SEGUNDOS
            if(segundos == 00) //CUANDO EL VALOR DE LA VARIABLE SEGUNDOS LLEGUE A CERO ESTA ENTRARA AL CONDICIONAL
            { //SE INCREMENTA EL VALOR DEL ITERADOR, ESTE NOS SERVIRA PARA CONTROLAR LAS ITERACIONES DEL TEMPORIZADOR
                iterador++;
                minutos--;//SE DECREMENTA EL VALOR DE LOS MINUTOS
                segundos = 60; //SE LE AGREGA NUEVAMENTE EL VALOR DE 60 SEGUNDOS (CORRESPONDIENTE A 1 MINUTO)
                if(iterador == 4){ //CUANDO EL ITERADOR SE IGUAL A 4 ENTRARA A ESTE CONDICIONAL
                    //SE REFERENCIA AL DIV LLAMADO TIMER, Y SE LE AGREGA EL TEXTO QUE EL TIEMPO HA TERMINADO
                    document.getElementById("timer").textContent = "SE TERMINO EL TIEMPO!!";
                    setTimeout(()=>{
                        location.reload(true);
                    },5100);
                    //LUEGO PARA ROMPER EL BUCLE, LIMPIAR EL INTERVALOR DE LA CONSTANTE CONTADOR,
                    clearInterval(contador);
                }
            }
        },1000);
    }
});

let actualMovim = 'escogido'; 
let torreActual = $torre1;
let torreDestino = $torre2;
let contadorMovimientos = 0;


$torre1.addEventListener("click", (evento)=>{
    TorreClickeada($torre1);
});

$torre2.addEventListener("click",(evento)=>{
    TorreClickeada($torre2);
});

$torre3.addEventListener("click",(evento)=>{
    TorreClickeada($torre3);
});



function DiscoPosicion() {
        if ((torreActual.childElementCount !== 0) && (torreDestino.childElementCount === 0 
            || torreDestino.lastElementChild.value < torreActual.lastElementChild.value)) {
        torreDestino.appendChild(torreActual.lastElementChild);
        contadorDeMovimientos();
        ganaste();
    }
    else {
        const img = document.createElement("img");
        img.setAttribute("src","https://cdn-icons-png.flaticon.com/512/6467/6467134.png");
        img.style.width = "50px";
        $mensaje.appendChild(img);
        $mensaje.style.backgroundColor = "#FF475A";
        $alerta.textContent = "ERROR!! NO SE PUEDE PONER UN ARO GRANDE ENCIMA DE UNO PEQUEÑO"
        setTimeout(()=>{
            $alerta.textContent = "";
            img.removeAttribute("src");
            $mensaje.style.backgroundColor = "";
        },3100);
    }
}

function TorreClickeada(tower) {
    if (actualMovim === 'escogido') {
        torreActual = tower;
        actualMovim = 'colocado';
    }
    else {
        torreDestino= tower;
        DiscoPosicion();
        actualMovim = 'escogido';
    }
}

function contadorDeMovimientos() {
    contadorMovimientos++;
    movimientos.innerHTML = contadorMovimientos;
}


function ganaste() {
    //SI LAS TORRES 3 O 2 TIENEN LA CANTIDAD DE 5 NIÑOS ENTRAN AL CONDICIONAL
    if ($torre2.childElementCount === 5 || $torre3.childElementCount === 5) {
        //SI EL NUMERO DE MOVIMIENTOS DELJUGADOR HA SIDO MENOR A 60, ENTONES HIZO UN GRAN TRABAJO Y ENTRA AL CONDICIONAL
        if (contadorMovimientos < 60) {
            //ANTERIORMENTE SE HABIA GUARDADO LA REFERNCIA DEL OBJETO ELEMENTO MENSAJE
            //ACA SE LE CAMBIA EL ESTILO A LA TARJETITA A UN COLOR VERDE, DE ENHORABUENA
            $mensaje.style.backgroundColor = "green";
            // SE LE AGREGA UN MENSAJE CON EL NUMERO DE PASOS O MOVIENTOS QUE HIZO Y SE LE INDICA QUE HIZO U JUEGO PERFECTO!
            $alerta.textContent =  `GANASTE CON UN TOTAL DE ${contadorMovimientos} MOVIMIENTOS, JUEGO PERFECTO!!`;
            const img = document.createElement("img");
            img.setAttribute("src","https://cdn-icons-png.flaticon.com/512/1828/1828516.png");
            img.style.width = "50px";
            $mensaje.appendChild(img);

            setTimeout(()=>{
                $alerta.textContent = "";
                img.removeAttribute("src");
                $mensaje.style.backgroundColor = "";
            },5100);
        } 
        else{
            $mensaje.style.backgroundColor = "blue";
            $alerta.textContent = `UFF GANASTE CON ${contadorMovimientos} PASOS, BIEN JUGADO!!`;
            setTimeout(()=>{
                $alerta.textContent = "";
                $mensaje.style.backgroundColor = "";
            },5100);
        }
    }
}
/* 

function contador(){

};
 */