let clasificador;
let imagen;
let valorConfianza = 0; // Guardará el porcentaje de confianza actual

// Cargar modelo y la imagen por defecto
function preload() {
    clasificador = ml5.imageClassifier("MobileNet");
    imagen = loadImage("../../assets/images/gato.jpg", clasificar);
}

// Crear el canvas y colocarlo en el contenedor HTML
function setup() {
    let lienzo = createCanvas(400, 400);
    lienzo.parent("canvas-container");
}


function draw() {
    // Dibujar la imagen actual en el canvas
    if (imagen) {
        image(imagen, 0, 0, width, height);
    }
    
    // Definir si la imagen es confiable o no
    if (valorConfianza > 0 && valorConfianza < 50) {
        fill(0, 0, 0, 150); // opacidad oscura
        rect(0, 0, width, height);
        
        fill(255, 0, 0);
        textSize(300);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text("?", width / 2, height / 2);
    }
}

// Clasificar la imagen
function clasificar() {
    clasificador.classify(imagen, gotResult);
}


function gotResult(results) {
    // Obtener la descripción y confianza
    let etiqueta = results[0].label;
    valorConfianza = results[0].confidence * 100;
    
    // Elementos del HTML donde pondremos los datos
    let etiquetaHTML = document.getElementById("resultado-etiqueta");
    let confianzaHTML = document.getElementById("resultado-confianza");

    // Evaluar si la precisión es menor al 50%
    if (valorConfianza < 50) {
        etiquetaHTML.innerHTML = "No se puede saber con precisión qué objeto es.";
        confianzaHTML.innerHTML = "Confianza muy baja: " + valorConfianza.toFixed(2) + "% (" + etiqueta + ")";
    } else {
        etiquetaHTML.innerHTML = "Objeto identificado: " + etiqueta;
        confianzaHTML.innerHTML = "Nivel de confianza: " + valorConfianza.toFixed(2) + "%";
    }
}

// Función al hacer clic la miniatura y cambiar la imagen a clasificar
function cambiarImagen(ruta, elementoClickado) {
    // Actualizar la miniatura seleccionada
    let miniaturas = document.querySelectorAll(".thumbnail");
    miniaturas.forEach(miniatura => miniatura.classList.remove("active"));
    if (elementoClickado) {
        elementoClickado.classList.add("active");
    }
    

    valorConfianza = 0; // Reiniciar al cambiar la imagen

    // Cargar la nueva imagen y clasificarla al cargar
    imagen = loadImage(ruta, clasificar);
}
