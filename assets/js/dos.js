let currentStep = 1; // Paso inicial

// Contenido para cada paso
const stepsContent = [
  {
    texto:
      "Un atacante envía millones de solicitudes a un servidor de un sitio de ecommerce durante un día de promociones.",
    imagen: "assets/img/card.png",
  },
  {
    texto: [
      "El sitio se cae, los clientes no pueden realizar compras y la empresa pierde ingresos y credibilidad.",
    ],
    imagen: "assets/img/cifrar.png",
  },
];

// Actualizar los círculos según el paso
function updateCircles() {
  const circles = document.querySelectorAll(".circulo");
  circles.forEach((circulo) => circulo.classList.remove("activo"));

  const activeCircle = document.getElementById("circulo" + currentStep);
  if (activeCircle) {
    activeCircle.classList.add("activo");
  }
}

// Cambiar contenido según el paso
function updateContent() {
  const content = stepsContent[currentStep - 1];
  const contenidoEjemplo = document.getElementById("contenido-ejemplo");

  // Limpiar el contenido actual
  contenidoEjemplo.innerHTML = "";

  // Crear el nuevo contenido
  const infoSituacion = document.createElement("div");
  infoSituacion.classList.add("informacion-situacion");

  // Verificar si el texto es un array o una cadena
  if (Array.isArray(content.texto)) {
    // Si es un array, crear una lista ordenada (<ol>)
    const ol = document.createElement("ol");
    content.texto.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ol.appendChild(li);
    });
    infoSituacion.appendChild(ol); // Añadir la lista ordenada
  } else {
    // Si no es un array, agregar el texto como un párrafo (<p>)
    const texto = document.createElement("p");
    texto.textContent = content.texto;
    infoSituacion.appendChild(texto);
  }

  // Crear el contenedor de la imagen
  const imagenContainer = document.createElement("div");
  imagenContainer.classList.add("imagen");

  const imagen = document.createElement("img");
  imagen.src = content.imagen;
  imagen.alt = "Imagen relacionada";

  imagenContainer.appendChild(imagen);
  infoSituacion.appendChild(imagenContainer);

  // Agregar el nuevo contenido al contenedor
  contenidoEjemplo.appendChild(infoSituacion);
}

// Manejador de evento para el botón 'Siguiente'
document.getElementById("siguiente").addEventListener("click", () => {
  if (currentStep < stepsContent.length) {
    currentStep++;
    updateCircles();
    updateContent();
    document.getElementById("atras").style.display = "inline"; // Mostrar botón atrás
  }
});

// Manejador de evento para el botón 'Atrás'
document.getElementById("atras").addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    updateCircles();
    updateContent();
    if (currentStep === 1) {
      document.getElementById("atras").style.display = "none"; // Ocultar el botón atrás en el primer paso
    }
  }
});

// Inicializar el primer paso al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  updateCircles();
  updateContent();
});
