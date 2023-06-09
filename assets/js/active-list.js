document.addEventListener("DOMContentLoaded", function () {
  const registrosPorPagina = 10; // Cantidad de registros por página
  let registrosTotales = 0; // Total de registros obtenidos
  let paginaActual = 1; // Página actual
  let registros = []; // registros

  // Realizar solicitud GET y crear tabla paginada
  function obtenerInventario() {
    fetch("http://localhost:8090/inventario/active/findAll")
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
    const tabla = document.getElementById("tabla-inventario");
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
      idCell.textContent = registro.id;
      fila.appendChild(idCell);

      const nombreCell = document.createElement("td");
      nombreCell.textContent = registro.name;
      fila.appendChild(nombreCell);

      const codigoCell = document.createElement("td");
      codigoCell.textContent = registro.code;
      fila.appendChild(codigoCell);

      const valorCell = document.createElement("td");
      valorCell.textContent = registro.value;
      fila.appendChild(valorCell);

      const cantidadCell = document.createElement("td");
      cantidadCell.textContent = registro.quantity;
      fila.appendChild(cantidadCell);

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

      // Botón Desactivar
      const botonDesactivar = document.createElement("button");
      botonDesactivar.textContent = "Desactivar";
      botonDesactivar.classList.add("btn", "btn-primary-celeus");
      botonDesactivar.addEventListener("click", function () {
        // Lógica para desactivar el registro
      });
      accionesCell.appendChild(botonDesactivar);

      fila.appendChild(accionesCell);

      // Agregar fila a la tabla
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
    const tabla = document.getElementById("tabla-inventario");
    console.log(tabla);
    const tbody = tabla.querySelector("tbody");

    // Limpiar contenido previo de la tabla
    tbody.innerHTML = "";

    // Iterar sobre los registros y crear filas en la tabla
    registros.forEach((registro) => {
      const fila = document.createElement("tr");

      // Crear celdas para cada propiedad del registro
      const idCell = document.createElement("td");
      idCell.textContent = registro.id;
      fila.appendChild(idCell);

      const nombreCell = document.createElement("td");
      nombreCell.textContent = registro.name;
      fila.appendChild(nombreCell);

      const codigoCell = document.createElement("td");
      codigoCell.textContent = registro.code;
      fila.appendChild(codigoCell);

      const valorCell = document.createElement("td");
      valorCell.textContent = registro.value;
      fila.appendChild(valorCell);

      const cantidadCell = document.createElement("td");
      cantidadCell.textContent = registro.quantity;
      fila.appendChild(cantidadCell);

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

      // Botón Desactivar
      const botonDesactivar = document.createElement("button");
      botonDesactivar.textContent = "Desactivar";
      botonDesactivar.classList.add("btn", "btn-primary-celeus");
      botonDesactivar.addEventListener("click", function () {
        // Lógica para desactivar el registro
      });
      accionesCell.appendChild(botonDesactivar);

      fila.appendChild(accionesCell);

      // Agregar fila a la tabla
      tbody.appendChild(fila);
    });
  }

  function mostrarInformacion(id) {
    const url = `http://localhost:8090/inventario/active/find/${id}`;

    // Realizar la consulta al endpoint
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Obtener los datos del ActiveDto
        const active = data;
        console.log(active);
        // Actualizar el contenido del modal con la información obtenida
        const modalTitulo = document.getElementById("modal-active-title");
        const modalCuerpo = document.getElementById("modal-active-body");

        modalTitulo.textContent = `Activo con código: ${active.code}`;
        modalCuerpo.innerHTML = `
          <p>Nombre: ${active.name}</p>
          <p>Código: ${active.code}</p>
          <p> Valor total activo: ${active.value}</p>
          <p>Cantidad: ${active.quantity}</p>
          <p>Serial: ${active.serial}</p>
          <p>Características: ${active.characteristic}</p>
          <p>Año en el que se adquirio: ${active.yearAcquired}</p>
          <p>Imagen: </p>
          <img id='imageElementActive${active.id}' alt='image' width='30%' heigth='30%' >
          <!-- Agrega aquí el resto de las propiedades que deseas mostrar en el modal -->
        `;
        convertBase64ToFile(active.imageBase, active.id);

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


  function convertBase64ToFile(base64String, elemento) {
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
    const mimeType = window.URL.createObjectURL(blob)
      .split(":")[1]
      .split(";")[0];

    // Crear un objeto File a partir del objeto Blob y el tipo MIME determinado
    const file = new File([blob], "imagen", { type: mimeType });

    // Crear una URL para el objeto File
    const imageUrl = URL.createObjectURL(file);

    // Mostrar la imagen en un elemento <img> en HTML
    const imageElement = document.getElementById("imageElementActive" + elemento);
    imageElement.src = imageUrl;
  }

  // Ejecutar la función para obtener el inventario y mostrarlo en la tabla
  obtenerInventario();
});
