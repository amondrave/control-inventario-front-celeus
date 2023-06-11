const registrosPorPagina = 10; // Cantidad de registros por página
let registrosTotales = 0; // Total de registros obtenidos
let paginaActual = 1; // Página actual
let registros = []; // registros

// Realizar solicitud GET y crear tabla paginada
function obtenerInventario(idActive) {
  const url = `http://localhost:8090/inventario/maintenance/findAll/active/${idActive}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      registros = data; // Asigna los datos de respuesta a una variable (lista de registros)
      console.log(data);
      if (registros.length <= 10) {
        // Mostrar todos los registros sin paginación
        console.log("Sin paginar");
        mostrarRegistrosEnTabla(registros);
      } else {
        // Implementar paginación
        // Implementar paginación
        registrosTotales = registros.length;
        mostrarRegistrosPaginados(registros, paginaActual);
        crearBotonesPaginacion();
      }
    })
    .catch((error) => console.error(error));
}

function mostrarRegistrosPaginados(registros, pagina) {
  const tabla = document.getElementById("tabla-mantenimiento");
  console.log(tabla);
  const tbody = tabla.querySelector("tbody");

  // Limpiar contenido previo de la tabla
  tbody.innerHTML = "";

  // Calcular índices de inicio y fin de los registros de la página actual
  const indiceInicio = (pagina - 1) * registrosPorPagina;
  const indiceFin = indiceInicio + registrosPorPagina;

  // Obtener los registros de la página actual
  const registrosPagina = registros.slice(indiceInicio, indiceFin);

  // Iterar sobre los registros y crear filas en la tabla
  registrosPagina.forEach((registro) => {
    const fila = document.createElement("tr");

    // Crear celdas para cada propiedad del registro
    const idCell = document.createElement("td");
    idCell.textContent = id;
    fila.appendChild(idCell);

    const mantenimientoType = document.createElement("td");
    mantenimientoType.textContent = registro.maintenanceTypeDto.description;
    fila.appendChild(mantenimientoType);

    const codigoCell = document.createElement("td");
    codigoCell.textContent = registro.activeDto.code;
    fila.appendChild(codigoCell);

    const fechaCell = document.createElement("td");
    codigoCell.textContent = convertirFecha(registro.createdDate);
    fila.appendChild(fechaCell);

    const accionesCell = document.createElement("td");

    // Botón Visualizar
    const botonVisualizar = document.createElement("button");
    botonVisualizar.textContent = "Visualizar";
    botonVisualizar.classList.add("btn", "btn-primary-celeus");
    botonVisualizar.addEventListener("click", function () {
      // Lógica para visualizar el registro
      mostrarInformacion(registro.id);
    });
    accionesCell.appendChild(botonVisualizar);

    fila.appendChild(accionesCell);

    // Agregar fila a la tabla
    id++;
    tbody.appendChild(fila);
  });
}

// Crear botones de paginación
function crearBotonesPaginacion() {
  const paginacionDiv = document.getElementById("paginacion");
  paginacionDiv.innerHTML = "";

  const totalPaginas = Math.ceil(registrosTotales / registrosPorPagina);

  // Botón "Anterior"
  const botonAnterior = document.createElement("button");
  botonAnterior.textContent = "Anterior";
  botonAnterior.addEventListener("click", function () {
    if (paginaActual > 1) {
      paginaActual--;
      mostrarRegistrosPaginados(registros, paginaActual);
    }
  });
  paginacionDiv.appendChild(botonAnterior);

  // Botones de número de página
  for (let i = 1; i <= totalPaginas; i++) {
    const botonPagina = document.createElement("button");
    botonPagina.textContent = i;
    botonPagina.addEventListener("click", function () {
      paginaActual = i;
      mostrarRegistrosPaginados(registros, paginaActual);
    });
    paginacionDiv.appendChild(botonPagina);
  }

  // Botón "Siguiente"
  const botonSiguiente = document.createElement("button");
  botonSiguiente.textContent = "Siguiente";
  botonSiguiente.addEventListener("click", function () {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      mostrarRegistrosPaginados(registros, paginaActual);
    }
  });
  paginacionDiv.appendChild(botonSiguiente);
}

// Mostrar los registros en la tabla
function mostrarRegistrosEnTabla(registros) {
  console.log("entra");
  const tabla = document.getElementById("tabla-mantenimiento");
  console.log(registros);
  const tbody = tabla.querySelector("tbody");

  // Limpiar contenido previo de la tabla
  tbody.innerHTML = "";
  let id = 1;
  // Iterar sobre los registros y crear filas en la tabla
  registros.forEach((registro) => {
    const fila = document.createElement("tr");

    // Crear celdas para cada propiedad del registro
    const idCell = document.createElement("td");
    idCell.textContent = id;
    fila.appendChild(idCell);

    const mantenimientoType = document.createElement("td");
    mantenimientoType.textContent = registro.maintenanceTypeDto.description;
    fila.appendChild(mantenimientoType);

    const codigoCell = document.createElement("td");
    codigoCell.textContent = registro.activeDto.code;
    fila.appendChild(codigoCell);

    const fechaCell = document.createElement("td");
    fechaCell.textContent = convertirFecha(registro.createdDate);
    fila.appendChild(fechaCell);

    const accionesCell = document.createElement("td");

    // Botón Visualizar
    const botonVisualizar = document.createElement("button");
    botonVisualizar.textContent = "Visualizar";
    botonVisualizar.classList.add("btn", "btn-primary-celeus");
    botonVisualizar.addEventListener("click", function () {
      // Lógica para visualizar el registro
      mostrarInformacion(registro.id);
    });
    accionesCell.appendChild(botonVisualizar);

    fila.appendChild(accionesCell);

    // Agregar fila a la tabla
    id++;
    tbody.appendChild(fila);
  });
}

function mostrarInformacion(id) {
  const url = `http://localhost:8090/inventario/maintenance/find/${id}`;

  // Realizar la consulta al endpoint
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Obtener los datos del ActiveDto
      const mantenimiento = data;
      // Actualizar el contenido del modal con la información obtenida
      const modalTitulo = document.getElementById("modal-active-title");
      modalTitulo.textContent = `Mantenimiento pertenciente al Activo: ${mantenimiento.activeDto.code}`;

      //convertBase64ToFile(active.imageBase, active.id);
      crearImagenes(mantenimiento.listEvidence,mantenimiento);
      // Abrir el modal
      const modal = document.getElementById("mi-modal");
      modal.style.display = "block";
    })
    .catch((error) => {
      console.log("Error al obtener la información:", error);
    });
  // Añadir el event listener al botón de cierre
  const closeButton = document.getElementById("closeButtonActiveModal");
  closeButton.addEventListener("click", function () {
    // Cerrar el modal
    const modalElement = document.getElementById("modalDialogScrollable");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    // Restablecer la información consultada
    // ...
  });

  // Mostrar el modal
  const modalElement = document.getElementById("modalDialogScrollable");
  const modalInstance = new bootstrap.Modal(modalElement);
  modalInstance.show();
}

function convertBase64ToFile(base64String) {
  // Obtener los primeros bytes de la cadena Base64
  const byteCharacters = atob(base64String);
  const byteArrays = [];
  const sliceSize = 512;
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // Crear un objeto Blob a partir de los primeros bytes
  const blob = new Blob(byteArrays);

  // Determinar el tipo MIME de la imagen
  const mimeType = window.URL.createObjectURL(blob).split(":")[1].split(";")[0];

  // Crear un objeto File a partir del objeto Blob y el tipo MIME determinado
  const file = new File([blob], "imagen", { type: mimeType });

  // Crear una URL para el objeto File
  const imageUrl = URL.createObjectURL(file);
  console.log("Crea la url: "+imageUrl);
  return imageUrl;
}

function crearImagenes(list,mantenimiento,modalCuerpo) {
  if (list != null && list.length > 0) {
    const modalCuerpo = document.getElementById("modal-active-body");
    let observacion = "";
    if (
      mantenimiento.listObservation != null &&
      mantenimiento.listObservation.length > 0
    ) {
      let listaO = mantenimiento.listObservation;
      observacion = listaO[0].observationText;
    }
    let modalCuerpoHTML = `
    <p>Observación: ${observacion}</p>
    <p>Tipo de mantenimiento: ${mantenimiento.maintenanceTypeDto.description}</p>
`;
    // Itera sobre la lista de imágenes
    list.forEach((imageUrl, index) => {
      // Crea un elemento <div>
      console.log(imageUrl);
      modalCuerpoHTML += `
      <p>Imagen ${index + 1}:</p>
      <img id="imageElement${index}" alt="image" width="30%" height="30%" src="${convertBase64ToFile(imageUrl.imageBase)}">
    `;
    });

    modalCuerpo.innerHTML = modalCuerpoHTML;
  }
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    // Verifica si se presionó la tecla Enter
    event.preventDefault(); // Evita el comportamiento por defecto del Enter en un formulario

    const codeInput = document.getElementById("codeActive").value;
    const code = codeInput.toUpperCase();
    console.log(code);
    const endpoint = `http://localhost:8090/inventario/active/find/code/${code}`;

    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la respuesta del servidor");
        }
      })
      .then((data) => {
        obtenerInventario(data.id);
      })
      .catch((error) => {
        // Si ocurre un error en la consulta o en la respuesta del servidor
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Lo sentimos no fue posible encontrar el registro",
        });
        const tabla = document.getElementById("tabla-mantenimiento");
        const tbody = tabla.querySelector("tbody");
        tbody.innerHTML = "";
      });
  }
}

function convertirFecha(fechaCompleta) {
  const fecha = new Date(fechaCompleta);
  const anio = fecha.getFullYear();
  const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
  const dia = ("0" + fecha.getDate()).slice(-2);

  const fechaFormateada = `${anio}-${mes}-${dia}`;
  return fechaFormateada;
}
