// Espera a que el DOM se cargue completamente antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {

  // Inicializa un array vacío para almacenar los datos del diccionario
  let diccionario = [];

  // Realiza una petición fetch para cargar el archivo JSON con el corpus lingüístico
  fetch("data/corpus.json")
    .then(response => {
      // Verifica si la respuesta HTTP es correcta
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json(); // Convierte la respuesta a formato JSON
    })
    .then(data => {
      // Verifica que los datos sean un array no vacío
      if (!Array.isArray(data) || data.length === 0) {
        console.error("El archivo JSON no contiene un array o está vacío:", data);
        return;
      }
      // Asigna los datos al diccionario
      diccionario = data;
      console.log("Diccionario cargado:", diccionario.length);
      // Establece el idioma predeterminado como español
      cambiarIdioma("espanol");
    })
    .catch(error => {
      // Maneja errores en la carga del archivo
      console.error("Error al cargar el corpus.json:", error);
      document.getElementById('results').innerHTML = `<p class="error">Error al cargar el diccionario.</p>`;
    });

  // Objeto con traducciones de la interfaz en español y "tu lengua"
  const traducciones = {
    titulo: {
      espanol: "Diccionario Español - tu lengua",
      lengua: "Traducir aquí su lengua"
    },
    buscarEspanol: {
      espanol: "Buscar en Español",
      lengua: "Traducir aquí su lengua"
    },
    buscarLengua: {
      espanol: "Buscar en tu lengua",
      lengua: "Traducir aquí su lengua"
    },
    buscar: {
      espanol: "Buscar",
      lengua: "Traducir aquí su lengua"
    },
    instrucciones: {
      espanol: "Instrucciones:",
      lengua: "Traducir aquí su lengua:"
    },
    instruccion1: {
      espanol: "1. Selecciona el idioma en el que deseas buscar.",
      lengua: "1. Traducir aquí su lengua."
    },
    instruccion2: {
      espanol: "2. Escribe la palabra en el campo de búsqueda.",
      lengua: "2. Traducir aquí su lengua."
    },
    instruccion3: {
      espanol: "3. Haz clic en \"Buscar\" o presiona Enter.",
      lengua: "3. Traducir aquí su lengua."
    },
    instruccion4: {
      espanol: '4. Si deseas sugerir correcciones u observaciones, puedes mandar un mensaje "tu dirección de contacto"',
      lengua: '4. Traducir aquí su lengua.'
    },
    placeholderBusqueda: {
      espanol: "Escribe una palabra en español...",
      lengua: "Traducir aquí su lengua"
    },
    resultadosTexto: {
      espanol: "Los resultados de la búsqueda aparecerán aquí.",
      lengua: "Traducir aquí su lengua"
    },
    traduccionEtiqueta: {
      espanol: "lengua:",
      lengua: "Español:"
    },
    noResultados: {
      espanol: "No se encontraron resultados para tu búsqueda.",
      lengua: "Traducir aquí su lengua"
    },
    ingresaPalabra: {
      espanol: "Por favor, ingresa una palabra para buscar.",
      lengua: "Traducir aquí su lengua"
    },
    caracteresEspeciales: {
      espanol: "Letras del lengua:",
      lengua: "Traducir aquí su lengua"
    },
    footer: {
      espanol: 'Esta es la versión 0.1. aquí puedes escribir el número de palabras que posee su diccionario. Es un proyecto libre, replicable sin fines de lucro. Traducciones pueden realizarse bajo la licencia <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" target="_blank">CC BY-NC-SA 4.0</a>.',
      lengua: 'Traducir aquí su lengua <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es">CC BY-NC-SA 4.0</a>.'
    }
  };

  // Variables de control de la interfaz
  let buscarEnEspanol = true; // Por defecto se busca en español
  let lenguajeActual = "espanol"; // Idioma actual de la interfaz
  
  // Referencias a elementos del DOM
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const resultsDiv = document.getElementById('results');
  const espanolBtn = document.getElementById('espanol-btn');
  const lenguaBtn = document.getElementById('zapoteco-btn'); // Corregido: cambiado a zapoteco-btn para que coincida con el HTML
  const resultadosTexto = document.getElementById('resultados-texto');

  // Función para crear botones de caracteres especiales del lengua
  function crearBotonesEspeciales() {
    let specialCharsContainer = document.getElementById('special-chars-container');
    if (!specialCharsContainer) {
      // Crea un contenedor para los botones si no existe
      specialCharsContainer = document.createElement('div');
      specialCharsContainer.id = 'special-chars-container';
      specialCharsContainer.className = 'special-chars-container';

      // Agrega título para la sección de caracteres especiales
      const titulo = document.createElement('div');
      titulo.className = 'special-chars-title';
      titulo.id = 'special-chars-title';
      specialCharsContainer.appendChild(titulo);

      // Crea un contenedor para los botones
      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'special-chars-buttons';

      // Aquí puedes agregar botones para caracteres especiales
      // Ejemplo:
      // const btnChar = document.createElement('button');
      // btnChar.type = 'button';
      // btnChar.textContent = 'ñ';
      // btnChar.addEventListener('click', function() {
      //   insertAtCursor(searchInput, 'ñ');
      // });
      // buttonsDiv.appendChild(btnChar);

      specialCharsContainer.appendChild(buttonsDiv);

      // Inserta el contenedor de caracteres especiales después del campo de búsqueda
      const searchBox = document.querySelector('.search-box');
      searchBox.parentNode.insertBefore(specialCharsContainer, searchBox.nextSibling);
    }
    // Actualiza la visibilidad de los botones según el idioma seleccionado
    actualizarVisibilidadBotones();
  }

  // Función para mostrar u ocultar los botones de caracteres especiales
  function actualizarVisibilidadBotones() {
    const specialCharsContainer = document.getElementById('special-chars-container');
    if (specialCharsContainer) {
      // Muestra los botones solo cuando se busca en lengua
      specialCharsContainer.style.display = buscarEnEspanol ? 'none' : 'block';
      document.getElementById('special-chars-title').textContent = traducciones.caracteresEspeciales[lenguajeActual];
    }
  }

  // Función para cambiar el idioma de la interfaz
  function cambiarIdioma(idioma) {
    lenguajeActual = idioma;
    
    // Actualizar estado de los botones de toggle
    if (idioma === "espanol") {
      buscarEnEspanol = true;
      espanolBtn.classList.add('active');
      lenguaBtn.classList.remove('active');
      searchInput.placeholder = traducciones.placeholderBusqueda.espanol;
    } else {
      buscarEnEspanol = false;
      espanolBtn.classList.remove('active');
      lenguaBtn.classList.add('active');
      searchInput.placeholder = traducciones.placeholderBusqueda.lengua;
    }

    // Actualiza todos los textos de la interfaz según el idioma seleccionado
    document.getElementById('titulo').textContent = traducciones.titulo[idioma];
    espanolBtn.textContent = traducciones.buscarEspanol[idioma];
    lenguaBtn.textContent = traducciones.buscarLengua[idioma];
    searchBtn.textContent = traducciones.buscar[idioma];
    resultadosTexto.textContent = traducciones.resultadosTexto[idioma];
    searchInput.placeholder = traducciones.placeholderBusqueda[idioma];

    document.getElementById('titulo-instrucciones').textContent = traducciones.instrucciones[idioma];
    document.getElementById('instruccion1').textContent = traducciones.instruccion1[idioma];
    document.getElementById('instruccion2').textContent = traducciones.instruccion2[idioma];
    document.getElementById('instruccion3').textContent = traducciones.instruccion3[idioma];
    document.getElementById('instruccion4').innerHTML = traducciones.instruccion4[idioma];
    document.getElementById('footer-info').innerHTML = traducciones.footer[idioma];

    // Actualiza la visibilidad de los botones de caracteres especiales
    actualizarVisibilidadBotones();
  }

  // Función principal de búsqueda
  function buscarPalabra() {
    // Obtiene el término de búsqueda, lo normaliza y convierte a minúsculas
    const terminoBusqueda = searchInput.value.trim().toLowerCase();

    // Verifica si el campo de búsqueda está vacío
    if (terminoBusqueda === '') {
      resultsDiv.innerHTML = `<p>${traducciones.ingresaPalabra[lenguajeActual]}</p>`;
      return;
    }

    // Arrays para almacenar resultados
    let resultados = [];
    let coincidenciasExactas = []; // Palabras que coinciden exactamente
    let coincidenciasParciales = []; // Palabras que contienen el término de búsqueda

    // Busca en español o su lengua según la configuración actual
    if (buscarEnEspanol) {
      diccionario.forEach(item => {
        if (item.espanol && item.espanol.toLowerCase() === terminoBusqueda) {
          coincidenciasExactas.push(item);
        } else if (item.espanol && item.espanol.toLowerCase().includes(terminoBusqueda)) {
          coincidenciasParciales.push(item);
        }
      });
    } else {
      diccionario.forEach(item => {
        if (item.lengua && item.lengua.toLowerCase() === terminoBusqueda) {
          coincidenciasExactas.push(item);
        } else if (item.lengua && item.lengua.toLowerCase().includes(terminoBusqueda)) {
          coincidenciasParciales.push(item);
        }
      });
    }

    // Combina resultados (primero las coincidencias exactas)
    resultados = [...coincidenciasExactas, ...coincidenciasParciales];
    mostrarResultados(resultados, coincidenciasExactas.length);
  }

  // Función para mostrar los resultados de la búsqueda
  function mostrarResultados(resultados, numExactos) {
    // Muestra mensaje si no hay resultados
    if (resultados.length === 0) {
      resultsDiv.innerHTML = `<p class="no-results">${traducciones.noResultados[lenguajeActual]}</p>`;
      return;
    }

    let html = '';

    // Genera el HTML para cada resultado
    resultados.forEach((item, index) => {
      const esCoincidenciaExacta = index < numExactos;
      const palabraActual = buscarEnEspanol ? item.espanol : item.lengua;
      const traduccionActual = buscarEnEspanol ? item.lengua : item.espanol;
      const tipoActual = item.tipo && item.tipo[lenguajeActual] ? item.tipo[lenguajeActual] : '';
      const definicionActual = item.definicion && item.definicion[lenguajeActual] ? item.definicion[lenguajeActual] : '';

      // Crea la estructura HTML para el resultado actual
      html += `
        <div class="word-item ${esCoincidenciaExacta ? 'exact-match' : ''}">
          <div class="word">${palabraActual}</div>
          <div class="type">${tipoActual}</div>
          <div class="translation"><strong>${traducciones.traduccionEtiqueta[lenguajeActual]}</strong> ${traduccionActual}</div>
          <div class="definition">${definicionActual}</div>
        </div>
      `;
    });

    // Actualiza el contenido del div de resultados
    resultsDiv.innerHTML = html;
  }

  // Función para insertar texto en la posición actual del cursor en un campo de entrada
  function insertAtCursor(input, textToInsert) {
    if (input.selectionStart !== undefined) {
      // Obtiene la posición actual del cursor
      const startPos = input.selectionStart;
      const endPos = input.selectionEnd;
      // Divide el texto actual y combina con el texto a insertar
      const textBefore = input.value.substring(0, startPos);
      const textAfter = input.value.substring(endPos);
      input.value = textBefore + textToInsert + textAfter;
      // Coloca el cursor después del texto insertado
      input.selectionStart = input.selectionEnd = startPos + textToInsert.length;
    } else {
      // Fallback para navegadores antiguos
      input.value += textToInsert;
    }
    // Enfoca el campo de entrada
    input.focus();
  }

  // Event listeners para la interacción con el usuario

  // Listener para el botón de búsqueda
  searchBtn.addEventListener('click', buscarPalabra);
  
  // Listener para detectar cuando el usuario presiona Enter en el campo de búsqueda
  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      buscarPalabra();
    }
  });

  // Listener para el botón de búsqueda en español
  espanolBtn.addEventListener('click', function() {
    buscarEnEspanol = true;
    cambiarIdioma("espanol");
  });

  // Listener para el botón de búsqueda en su lengua
  lenguaBtn.addEventListener('click', function() {
    buscarEnEspanol = false;
    cambiarIdioma("lengua");
  });

  // Inicializa los botones de caracteres especiales
  crearBotonesEspeciales();
});
