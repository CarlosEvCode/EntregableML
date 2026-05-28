let detector;
let video;
let detecciones = [];

// Contador de fotogramas (60 fotogramas = 1 segundo, 300 fotogramas = 5 segundos)
let fotogramasPersona = 0;
let alarmaSonada = false;

// Cargar modelo
function preload() {
  detector = ml5.objectDetection("cocossd");
}

function setup() {
  // Crear el canvas y colocarlo en el contenedor HTML
  let lienzo = createCanvas(640, 480);
  lienzo.parent("canvas-container");

  // Capturar video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Iniciar deteccion
  detector.detectStart(video, obtenerDetecciones);
}

function draw() {
  // Dibujar video
  image(video, 0, 0, width, height);

  let detectarPersona = false;
  let contadorPersonas = 0;

  // Dibujar objetos
  for (let i = 0; i < detecciones.length; i++) {
    let objeto = detecciones[i];

    stroke(0, 255, 0);
    strokeWeight(3);
    noFill();
    rect(objeto.x, objeto.y, objeto.width, objeto.height);

    noStroke();
    fill(255);
    textSize(18);
    text(objeto.label, objeto.x + 10, objeto.y + 20);

    // Si es persona incrementar contador
    if (objeto.label === "person") {
      detectarPersona = true;
      contadorPersonas++;
    }
  }

  // Evaluar tiempo
  if (detectarPersona) {
    // Incrementar el contador de fotogramas
    fotogramasPersona++;

    // Limitar a un maximo de 300 fotogramas (5 segundos)
    if (fotogramasPersona > 300) {
      fotogramasPersona = 300;
    }

    // Calcular los segundos transcurridos
    let segundos = fotogramasPersona / 60;

    // Dibujar barra de progreso
    noStroke();
    fill(100);
    rect(70, 430, 500, 20);

    // Dibujar la barra roja (ancho maximo de 500px)
    let ancho = (fotogramasPersona / 300) * 500;
    fill(255, 0, 0);
    rect(70, 430, ancho, 20);

    // Mostrar tiempo en texto
    fill(255);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("Tiempo: " + segundos.toFixed(1) + "s / 5s", 320, 420);

    // Alarma de voz
    if (fotogramasPersona >= 300 && !alarmaSonada) {
      // Cancelar cola de voz
      speechSynthesis.cancel();

      // Crear mensaje segun cantidad de personas
      let textoAlerta = "Alerta. Se detectó una persona por más de 5 segundos.";
      if (contadorPersonas > 1) {
        textoAlerta = "Alerta. Se detectaron " + contadorPersonas + " personas por más de 5 segundos.";
      }

      let mensaje = new SpeechSynthesisUtterance(textoAlerta);
      mensaje.lang = "es-ES";
      speechSynthesis.speak(mensaje);

      console.log(textoAlerta);
      alarmaSonada = true;
    }

  } else {
    // Reiniciar variables
    fotogramasPersona = 0;
    alarmaSonada = false;
  }
}

// Actualizar detecciones
function obtenerDetecciones(resultados) {
  detecciones = resultados;
}
