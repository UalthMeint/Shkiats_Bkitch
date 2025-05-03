# Shkiats Bkitch - Los Papeles del Cenzontle

**Shkiats Bkiat** es un proyecto que tiene por objetivo suministrar una plataforma de diccionario digital en diferentes lenguas indígenas. La iniciativa busca fomentar el desarrollo de un sistema de escritura estandarizado y validado, generado por y para las comunidades.

## ¿Qué significa Shkiats Bkitch?

El nombre **Shkiats Bkitch** significa *Los papeles del cenzontle* en Ditsaa (zapoteco).  
El cenzontle, conocido como el ave de las 400 voces, representa la riqueza y diversidad de las lenguas indígenas. El número 400 es simbólico: expresa una cantidad indefinida, muchísimas, como cuando se dice "cientos de miles" o "miles de miles".  
Este proyecto plantea ser una prueba piloto para evaluar la viabilidad del software y adaptarlo a otras lenguas originarias, brindando herramientas tecnológicas que permitan a cada comunidad construir su propio proceso de validación lingüística.

---

## Características principales

- Diccionario en línea de acceso abierto para la comunidad.
- Personalización de botones digitales para ingresar caracteres propios de la lengua objetivo.
- Proyecto colaborativo en continuo desarrollo.
- Fácil adaptación a otras lenguas indígenas con cambios mínimos.
- Facilita procesos de validación y documentación comunitaria.
- Búsqueda por palabra en español o en la lengua indígena.
- Muestra definiciones y categoría gramatical.
- Interfaz bilingüe (español/lengua indígena).

---

## Validación comunitaria

Para realizar la validación comunitaria, se recomienda:

1. Investigar si ya existen diccionarios, silabarios u otros materiales escritos en la lengua.
2. Recopilar un vocabulario base.
3. Organizar reuniones comunitarias para discutir y validar colectivamente la escritura y pronunciación.
4. Usar las herramientas del proyecto para registrar los consensos alcanzados.

---

## ¿Cómo usarlo?

1. Descarga o clona este repositorio.
2. Modifica el `index.html` en los campos indicados para traducir a tu lengua.
3. Ingresa las palabras en el archivo `banco_de_palabras.xls`. Luego, copia los datos y conviértelos en formato `.json` (puedes usar https://jsonlint.com/ para validarlo). Guarda el archivo como `corpus.json` dentro de la carpeta `/data/`.
4. Abre `index.html` en tu navegador usando un **servidor local** (por ejemplo, Live Server) o súbelo a un **hosting web**.  
   *Nota: debido al uso de `fetch` en JavaScript, no funcionará correctamente si se abre directamente desde el explorador local (file://).*
5. Alternativamente, visita el ejemplo del diccionario zapoteco de Xhaali (San Baltazar Guelavila) alojado en Neocities:  
   [https://diidxxhaali.neocities.org/Diccionario/DiccionarioZXhaali](https://diidxxhaali.neocities.org/Diccionario/DiccionarioZXhaali)

---

## Estructura del proyecto

```
Shkiats_Bkitch/
│
├── index.html        # Página principal del diccionario
├── script.js         # Lógica del buscador
├── styles.css        # Estilos generales
├── README.md         # Este archivo
├── LICENSE           # Licencia del proyecto
├── .gitignore
│
├── img/
│   ├── logo.png      # Logo del diccionario
│   └── favico.png    # Icono del sitio
│
└── data/
    └── corpus.json   # Base de datos del diccionario
```

---

## Estructura del sitio web

1. **Logo y encabezado**: Indica que el diccionario corresponde a la variante que desarrolla.
2. **Botones de búsqueda**: Puedes elegir buscar en español o en su lengua.
3. **Campo de búsqueda**:  
   - Si se selecciona español: *"Escribe una palabra en español..."*
   - Si se selecciona su lengua, el texto cambia, pero las funciones se mantienen iguales.
4. **Zona de resultados**: Muestra los resultados bajo el texto *"Los resultados de la búsqueda aparecerán aquí."*
5. **Instrucciones de uso**:
   - Selecciona el idioma en el que deseas buscar.
   - Escribe la palabra en el campo de búsqueda.
   - Haz clic en "Buscar" o presiona Enter.
   - Si deseas sugerir correcciones u observaciones, puedes mandar un mensaje a **contacto**.

---

## ¿Quieres contribuir?

¡Sí! Este es un proyecto abierto al aprendizaje y la colaboración. Si tienes interés en mejorar el programa, proponer nuevas funcionalidades o ayudar a adaptarlo a otra lengua, eres bienvenido/a.

---

## Licencia

Este proyecto está licenciado bajo la [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Puedes compartir y adaptar el contenido, siempre que:
- Des crédito adecuado.
- No lo uses con fines comerciales.
- Lo compartas bajo la misma licencia.

---
