let detector;
let video;
let detecciones = [];

// Variables de tiempo y alarma
let tiempoInicio = null;
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

  // Dibujar objetos detectados
  for (let objeto of detecciones) {
    stroke(0, 255, 0);
    strokeWeight(3);
    noFill();
    rect(objeto.x, objeto.y, objeto.width, objeto.height);

    noStroke();
    fill(255);
    textSize(18);
    text(objeto.label, objeto.x + 10, objeto.y + 20);

    // Si es persona, incrementar el contador
    if (objeto.label === "person") {
      detectarPersona = true;
      contadorPersonas++;
    }
  }

  // Evaluar tiempo de detección de personas
  if (detectarPersona) {
    // Si es la primera vez que se detecta en esta racha, guardar el tiempo de inicio
    if (tiempoInicio === null) {
      tiempoInicio = millis();
    }

    // Calcular el tiempo transcurrido (máximo 5000 ms / 5 segundos)
    let tiempoTranscurrido = millis() - tiempoInicio;
    let tiempoLimitado = min(tiempoTranscurrido, 5000);
    let segundos = tiempoLimitado / 1000;

    // Dibujar barra de progreso (fondo gris)
    noStroke();
    fill(100);
    rect(70, 430, 500, 20);

    // Dibujar barra de progreso activa (roja, ancho proporcional)
    let ancho = (tiempoLimitado / 5000) * 500;
    fill(255, 0, 0);
    rect(70, 430, ancho, 20);

    // Mostrar tiempo en texto
    fill(255);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("Tiempo: " + segundos.toFixed(1) + "s / 5s", 320, 420);

    // Activar alarma de voz al llegar a los 5 segundos reales
    if (tiempoTranscurrido >= 5000 && !alarmaSonada) {
      speechSynthesis.cancel(); // Cancelar cualquier voz en cola

      // Crear mensaje según la cantidad de personas detectadas
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
    // Reiniciar variables si ya no se detecta ninguna persona
    tiempoInicio = null;
    alarmaSonada = false;
  }
}

// Actualizar detecciones
function obtenerDetecciones(resultados) {
  detecciones = resultados;
}
