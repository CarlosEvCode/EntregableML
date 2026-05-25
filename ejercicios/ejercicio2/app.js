let manoPose;
let video;
let manos = [];

function preload() {
    // Cargar modelo
    manoPose = ml5.handPose();
}

function setup() {
    // Crear el canvas y ponerlo en el contenedor HTML
    let lienzo = createCanvas(640, 480);
    lienzo.parent("canvas-container");
    
    // Capturar video
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    
    // Iniciar la deteccion de manos
    manoPose.detectStart(video, gotResults);
}

function draw() {
    // Dibujar el video en el canvas
    image(video, 0, 0, width, height);
    
    // Verificar si estan las dos manos
    if (manos.length >= 2) {

        // obtener los indices
        let indiceMano1 = manos[0].index_finger_tip;
        let indiceMano2 = manos[1].index_finger_tip;
        
        // Calcular la distancia entre ambos índices
        let distancia = dist(indiceMano1.x, indiceMano1.y, indiceMano2.x, indiceMano2.y);

        // Calcular el punto medio para poner la distancia
        let centroX = (indiceMano1.x + indiceMano2.x) / 2;
        let centroY = (indiceMano1.y + indiceMano2.y) / 2;
        
        // Cambiar el color segun la distancia
        let colorTrazo;
        if (distancia < 180) {
            colorTrazo = color(30, 200, 90);
        } else if (distancia < 350) {
            colorTrazo = color(30, 90, 200);
        } else {
            colorTrazo = color(200, 30, 90);
        }
        
        
        // trazar la linea
        stroke(colorTrazo); 
        strokeWeight(10);      
        line(indiceMano1.x, indiceMano1.y, indiceMano2.x, indiceMano2.y);
        
        // las puntas de los indices
        noStroke();
        fill(255, 255, 255);
        circle(indiceMano1.x, indiceMano1.y, 18);
        circle(indiceMano2.x, indiceMano2.y, 18);
        
        fill(colorTrazo);
        circle(indiceMano1.x, indiceMano1.y, 12);
        circle(indiceMano2.x, indiceMano2.y, 12);
        
        // La etiqueta de distancia
        rectMode(CENTER);
        fill(15, 23, 42, 200);
        rect(centroX, centroY, 130, 28, 20);
        
        fill(255, 255, 255);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("Distancia: " + Math.round(distancia) + " px", centroX, centroY);
    }
}

function gotResults(resultados) {
    manos = resultados;
}
