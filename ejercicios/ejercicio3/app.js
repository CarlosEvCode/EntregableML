let faceMesh;
let video;
let faces = [];

function preload() {
    // Cargar modelo
    faceMesh = ml5.faceMesh({ maxFaces: 1 });
}

function setup() {
    // Crear el canvas y ponerlo en el contenedor HTML
    let lienzo = createCanvas(640, 480);
    lienzo.parent("canvas-container");
    
    // Capturar el video
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    
    // Iniciar la detección de rostros
    faceMesh.detectStart(video, gotFaces);
}

function draw() {
    // Dibujar el video en el canvas
    image(video, 0, 0, width, height);
    
    // Verificar si se detectó al menos un rostro
    if (faces.length > 0) {
        let rostro = faces[0];
        
        // Obtener la parte del rostro y color seleccionado
        let parteElegida = document.getElementById("selector-parte").value;
        let colorElegido = document.getElementById("selector-color").value;
        
        // Configurar el estilo del trazo
        fill(colorElegido);
        noStroke();
        
        // Dibujar los puntos segun la selección
        if (parteElegida === "ojo-izq") {
            for (let punto of rostro.leftEye.keypoints) {
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "ojo-der") {
            for (let punto of rostro.rightEye.keypoints) {
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "ojos-ambos") {
            for (let punto of rostro.leftEye.keypoints) {
                circle(punto.x, punto.y, 5);
            }
            for (let punto of rostro.rightEye.keypoints) {
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "ceja-izq") {
            for (let punto of rostro.leftEyebrow.keypoints) {
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "ceja-der") {
            for (let punto of rostro.rightEyebrow.keypoints) {
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "cejas-ambas") {
            for (let punto of rostro.leftEyebrow.keypoints) {
                circle(punto.x, punto.y, 5);
            }
            for (let punto of rostro.rightEyebrow.keypoints) {
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "labios") {
            for (let punto of rostro.lips.keypoints) {
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "rostro") {
            for (let punto of rostro.keypoints) {
                circle(punto.x, punto.y, 4);
            }
        }
    }
}

function gotFaces(results) {
    faces = results;
}
