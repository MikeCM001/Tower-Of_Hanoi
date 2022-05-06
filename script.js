//SE LE ANTEPONDRA EL SIGNO $ PARA INDICAR QUE SE ESTAN TRABAJANDO CON OBJETOS DEL DOM
const $disc1 = document.getElementById('disco1').value = 1;
const $disc2 = document.getElementById('disco2').value = 2;
const $disc3 = document.getElementById('disco3').value = 3;
const $disc4 = document.getElementById('disco4').value = 4;
const $disc5 = document.getElementById('disco5').value = 5;

const $modo = document.getElementById("modos");
const $torre1 = document.getElementById('torre1');
const $torre2 = document.getElementById("torre2");
const $torre3 = document.getElementById("torre3");

const $mensaje = document.getElementById("mensajes");
const $alerta = document.getElementById("alerta");



let movimientos = document.getElementById('movimientos');
var audio = new Audio("music.mp3");

$modo.addEventListener("change",function(){
audio.play();
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
    if ($torre2.childElementCount === 5 || $torre3.childElementCount === 5) {
        if (contadorMovimientos < 60) {
            $mensaje.style.backgroundColor = "green";
            $alerta.textContent =  `GANASTE CON UN TOTAL DE ${contadorMovimientos} MOVIMIENTOS, JUEGO PERFECTO!!`;
            const img = document.createElement("img");
            img.setAttribute("src","https://cdn-icons.flaticon.com/png/512/2724/premium/2724742.png?token=exp=1651812044~hmac=8423392128232094aaac6194de1d9d30");
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
