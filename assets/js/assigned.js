document.addEventListener("DOMContentLoaded", function () {
    const registrosPorPagina = 10; // Cantidad de registros por página
    let registrosTotales = 0; // Total de registros obtenidos
    let paginaActual = 1; // Página actual
    let registros = [];
  
    // Realizar solicitud GET y crear tabla paginada
    function obtenerInventario() {
      fetch("http://localhost:8090/inventario/ActiveAssignment/findAll")
        .then((response) => response.json())
        .then((data) => {
          registros = data; // Asigna los datos de respuesta a una variable (lista de registros)
          console.log(data);
          if (registros.length <= 10) {
            // Mostrar todos los registros sin paginación
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
      const tabla = document.getElementById("tabla-assigned");
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
  
        const nombreActiveCell = document.createElement("td");
        nombreActiveCell.textContent = registro.activeDto.name;
        fila.appendChild(nombreActiveCell);
  
        const valorTotal = document.createElement("td");
        valorTotal.textContent = registro.totalValue;
        fila.appendChild(valorTotal);
  
        const estado = document.createElement("td");
        estado.textContent = returnState(registro.loan);
        fila.appendChild(estado);
  
        const fecha = document.createElement("td");
        fecha.textContent = registro.requestDate;
        fila.appendChild(fecha);

        const responsable = document.createElement("td");
        responsable.textContent = registro.workerDto.name;
        fila.appendChild(responsable);

        const tipo = document.createElement("td");
        tipo.textContent = registro.typeAssignment;
        fila.appendChild(tipo);
  
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
      const tabla = document.getElementById("tabla-assigned");
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
  
        const nombreActiveCell = document.createElement("td");
        nombreActiveCell.textContent = registro.activeDto.name;
        fila.appendChild(nombreActiveCell);
  
        const valorTotal = document.createElement("td");
        valorTotal.textContent = registro.totalValue;
        fila.appendChild(valorTotal);
  
        const estado = document.createElement("td");
        estado.textContent = returnState(registro.loan);
        fila.appendChild(estado);
  
        const fecha = document.createElement("td");
        fecha.textContent = registro.requestDate;
        fila.appendChild(fecha);

        const responsable = document.createElement("td");
        responsable.textContent = registro.workerDto.name;
        fila.appendChild(responsable);

        const tipo = document.createElement("td");
        tipo.textContent = registro.typeAssignment;
        fila.appendChild(tipo);
  
        // Agregar fila a la tabla
        tbody.appendChild(fila);
      });
    }

    function returnState(loan) {
        return loan ? "EN PRESTAMO":"DEVUELTO"
    }
  
  
    // Ejecutar la función para obtener el inventario y mostrarlo en la tabla
    obtenerInventario();
  });
  