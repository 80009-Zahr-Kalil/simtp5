const costoViaje = 6;
const gananciaAuto = 2;
const costoPerdida = 1;
const maxEspera = 12;
const tiempoLlegadaA = 1;
const tiempoLlegadaB = 5;
const cantLlegadaA = 1;
const cantLlegadaB = 3;
const duracionViaje = 5;
const capacidadVagon = 5;


var tablaColas = document.getElementById("tablaColas");


function obtenerInputs(){
    var cantEventos = Number(document.getElementById("cantEventos").value);
    var desde = Number(document.getElementById("mostrarDesde").value);
    var hasta = Number(document.getElementById("mostrarHasta").value);
    var politica = document.getElementById("selector").value;
    return [cantEventos, desde, hasta, politica];
}

function generarColasPA(cantEventos, desde, hasta){

    var ubicacionVagon = "A";
    var autosPerdidosAC = 0;
    var arrayAutosA = [];
    var arrayAutosB = [];
    var tiempoViajeAC = 0;
    var cantAutosFinViaje = 0;
    var gananciaAC = 0;
    var colaA = 0; 
    var colaB = 0;
    var filaTabla = [ new Array(24).fill(0), new Array(24).fill(0)];
    var grillaFinal = [];  
    

    for (var i=1; i<=cantEventos ; i++){
        
        var reloj = i;
        var autosPerdidos = 0;
        var proxLlegadaA = reloj + tiempoLlegadaA;
        var proxLlegadaB = reloj + tiempoLlegadaB;
        var finViaje = reloj + duracionViaje;
        var gananciaActual = 0;

        var autoA = {
            tiempoEspera: -1
        }
        arrayAutosA.push(autoA);



        for (var k=0; k<arrayAutosA.length; k++){   
            arrayAutosA[k].tiempoEspera++;   
        }

        if (reloj % 5 == 0 ){
            for (var j=0; j<3 ; j++){
                var autoB = {
                    tiempoEspera: -1
                }
                arrayAutosB.push(autoB);
            }

            if(ubicacionVagon=="A"){
                ubicacionVagon = "B";

                if (arrayAutosA.length >= 5){
                    arrayAutosA.splice(0,5);
                    cantAutosFinViaje += 5;
                    gananciaActual+= (capacidadVagon * gananciaAuto) - costoViaje 
                }
            }
            else{
                ubicacionVagon = "A";

                if (arrayAutosB.length >= 5){
                    arrayAutosB.splice(0,5);
                    cantAutosFinViaje += 5;
                    gananciaActual+= (capacidadVagon * gananciaAuto) - costoViaje 
                }
            }

            if (reloj >= 10){
                tiempoViajeAC += 5;
            }
        }
        
        for (var k=0; k<arrayAutosB.length; k++){     
            arrayAutosB[k].tiempoEspera++;
        }

        
        if(arrayAutosA[0]?.tiempoEspera >= 12){
            arrayAutosA.splice(0,1);
            autosPerdidos++;
            gananciaActual--;
        }


        for (var k=0; k<arrayAutosB.length; k++){           

            if(arrayAutosB[k].tiempoEspera >= 12){
                arrayAutosB.splice(k,1);
                autosPerdidos++;
                gananciaActual--;
            }
        } 
        
        
        colaA = arrayAutosA.length;
        colaB = arrayAutosB.length;
        gananciaAC+= gananciaActual;
        autosPerdidosAC+= autosPerdidos;
        // console.log( "ganancia:" + gananciaAC)
             

    
        filaTabla.splice(0, 1);
        var insertarRegistro = [reloj,proxLlegadaA,proxLlegadaB,finViaje,colaA,colaB,gananciaAC,tiempoViajeAC,cantAutosFinViaje,autosPerdidosAC];
    
        filaTabla.push(insertarRegistro);
    
        if((i >= desde && i <= hasta) || i == cantEventos) {
            grillaFinal.push(insertarRegistro);
        }
    
        
    }
    
    console.log(grillaFinal);   
    // console.log(arrayAutosA,arrayAutosB);
    return grillaFinal;
}




function rellenarTabla() {

    var cantEventos = obtenerInputs()[0];
    var desde = obtenerInputs()[1];
    var hasta = obtenerInputs()[2];
    var politica = obtenerInputs()[3]; 

    tablaColas.innerHTML = "<tr><th>Reloj</th><th>Proxima Llegada A</th><th>Proxima Llegada B</th><th>Fin de Viaje Actual</th><th>Cola A</th><th>Cola B</th><th>AC ganancia</th><th>AC tiempos de viaje</th><th>Cantidad de Autos con viaje finalizado</th><th>Cantidad de Autos perdidos</th></tr>";
    var grilla;
    if(politica=="PA"? grilla = generarColasPA(cantEventos,desde,hasta): grilla = generarColasPB(cantEventos,desde,hasta))
    for(var i=0; i<grilla.length; i++) {
        var cadena = '<tr><td>' + grilla[i][0] +'</td>'
        cadena += '<td>' + (grilla[i][1]) + '</td>';
        cadena += '<td>' + (grilla[i][2]) + '</td>';
        cadena += '<td>' + grilla[i][3] + '</td>';
        cadena += '<td>' + grilla[i][4] + '</td>';
        cadena += '<td>' + grilla[i][5] + '</td>';
        cadena += '<td>' + grilla[i][6] + '</td>';
        cadena += '<td>' + grilla[i][7] + '</td>';
        cadena += '<td>' + grilla[i][8] + '</td>';
        cadena += '<td>' + grilla[i][9] + '</td></tr>';
        tablaColas.innerHTML += cadena;
    }

}

function generarColasPB(){
    
}



// document.getElementsByClassName("btn")[0].addEventListener("click",()=>{generarColasPA(30)});


function main() {
    rellenarTabla();
    tablaColas.style.display = "block";
}

document.getElementById("btnAceptar").addEventListener('click', () => {
    main();
})

