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
            for (let i = 0; i < rostro.leftEye.keypoints.length; i++) {
                let punto = rostro.leftEye.keypoints[i];
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "ojo-der") {
            for (let i = 0; i < rostro.rightEye.keypoints.length; i++) {
                let punto = rostro.rightEye.keypoints[i];
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "ojos-ambos") {
            for (let i = 0; i < rostro.leftEye.keypoints.length; i++) {
                let punto = rostro.leftEye.keypoints[i];
                circle(punto.x, punto.y, 5);
            }
            for (let i = 0; i < rostro.rightEye.keypoints.length; i++) {
                let punto = rostro.rightEye.keypoints[i];
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "ceja-izq") {
            for (let i = 0; i < rostro.leftEyebrow.keypoints.length; i++) {
                let punto = rostro.leftEyebrow.keypoints[i];
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "ceja-der") {
            for (let i = 0; i < rostro.rightEyebrow.keypoints.length; i++) {
                let punto = rostro.rightEyebrow.keypoints[i];
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "cejas-ambas") {
            for (let i = 0; i < rostro.leftEyebrow.keypoints.length; i++) {
                let punto = rostro.leftEyebrow.keypoints[i];
                circle(punto.x, punto.y, 5);
            }
            for (let i = 0; i < rostro.rightEyebrow.keypoints.length; i++) {
                let punto = rostro.rightEyebrow.keypoints[i];
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "labios") {
            for (let i = 0; i < rostro.lips.keypoints.length; i++) {
                let punto = rostro.lips.keypoints[i];
                circle(punto.x, punto.y, 5);
            }
        } 
        else if (parteElegida === "rostro") {
            for (let i = 0; i < rostro.keypoints.length; i++) {
                let punto = rostro.keypoints[i];
                circle(punto.x, punto.y, 4);
            }
        }
    }
}

function gotFaces(results) {
    faces = results;
}
