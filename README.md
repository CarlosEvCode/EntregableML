# Entregable de Machine Learning

Este repositorio contiene los 5 ejercicios que conforman el entregable práctico de Machine Learning, desarrollados con la librería ml5.js y el framework p5.js.

## Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas y archivos principales:

*   **css/**: Estilos visuales comunes para la interfaz de los ejercicios.
*   **assets/**: Modelos locales e imágenes de prueba.
*   **ejercicios/**: Contiene una carpeta para cada uno de los 5 ejercicios prácticos.
*   **index.html**: Menú principal interactivo que permite navegar a cada ejercicio.

---

## Descripción de los Ejercicios

A continuación se detalla el objetivo y funcionamiento de cada ejercicio:

### Ejercicio 1: Clasificación de Imágenes
Permite clasificar imágenes estáticas utilizando el modelo preentrenado MobileNet. Evalúa la precisión del reconocimiento y muestra un mensaje indicando si la predicción es confiable o no según el porcentaje de acierto.

### Ejercicio 2: Trazado de Líneas entre Índices
Detecta y realiza el seguimiento de los indices de la mano en tiempo real a través de la cámara web, utilizando el modelo HandPose. Dibuja las líneas que conectan los puntos de los dedos.

### Ejercicio 3: Detección de Partes del Rostro
Realiza el seguimiento de los puntos de referencia del rostro mediante el modelo FaceMesh en tiempo real. Permite identificar y dibujar siluetas detalladas del rostro.

### Ejercicio 4: Clasificador con Teachable Machine
Implementa un clasificador que utiliza un modelo personalizado entrenado previamente en Teachable Machine. Integra síntesis de voz para anunciar en español el nombre del objeto detectado únicamente cuando este cambia.

### Ejercicio 5: Detector de Personas con Alarma
Utiliza el modelo de detección de objetos CocoSSD en tiempo real para contar e identificar personas frente a la cámara web. Incorpora una barra de carga y un temporizador que mide 5 segundos reales y activa una alarma de voz si la persona permanece dentro del encuadre por ese tiempo.

---

## Tecnologías Utilizadas

*   **p5.js**: Librería de JavaScript para creación gráfica interactiva y manipulación del lienzo (canvas).
*   **ml5.js**: Librería de Inteligencia Artificial que facilita el uso de modelos de Machine Learning en el navegador.
*   **Web Speech API**: API nativa del navegador para síntesis de voz en español.
*   **HTML5 / CSS3**: Estructura de la aplicación y diseño responsivo.
