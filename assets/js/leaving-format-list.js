document.addEventListener("DOMContentLoaded", function () {
    const registrosPorPagina = 10; // Cantidad de registros por página
    let registrosTotales = 0; // Total de registros obtenidos
    let paginaActual = 1; // Página actual
    let registros = [] // registros 
  
    // Realizar solicitud GET y crear tabla paginada
    function obtenerInventario() {
      fetch("http://localhost:8090/inventario/LeavingFormat/findAll")
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
  
    // Mostrar los registros en la tabla
    function mostrarRegistrosEnTabla(registros) {
      console.log("entra");
      const tabla = document.getElementById("tabla-leaving");
      console.log(tabla);
      const tbody = tabla.querySelector("tbody");
  
      // Limpiar contenido previo de la tabla
      tbody.innerHTML = "";
  
      // Iterar sobre los registros y crear filas en la tabla
      registros.forEach((registro) => {
        const fila = document.createElement("tr");
        let id = 1;
        // Crear celdas para cada propiedad del registro
        const idCell = document.createElement("td");
        idCell.textContent =id;
        fila.appendChild(idCell);
  
        const nombreActivoCell = document.createElement("td");
        nombreActivoCell.textContent = registro.activeStatusDto.activeDto.name;
        fila.appendChild(nombreActivoCell);
  
        const valueCell = document.createElement("td");
        valueCell.textContent = registro.activeStatusDto.activeDto.value;
        fila.appendChild(valueCell);
  
        const statusCell = document.createElement("td");
        statusCell.textContent = registro.activeStatusDto.activeTypeStatusDto.description;
        fila.appendChild(statusCell);
  
        const fechaBajaCell = document.createElement("td");
        fechaBajaCell.textContent = registro.requestDate;
        fila.appendChild(fechaBajaCell);

        const razonCell = document.createElement("td");
        razonCell.textContent = registro.reason;
        fila.appendChild(razonCell);

        const departamentoCell = document.createElement("td");
        departamentoCell.textContent = registro.deparmentDto.name;
        fila.appendChild(departamentoCell);
        
        // Agregar fila a la tabla
        tbody.appendChild(fila);
        id++;
      });
    }
  
    function mostrarRegistrosPaginados(registros, pagina) {
      const tabla = document.getElementById("tabla-leaving");
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
      registros.forEach((registro) => {
        const fila = document.createElement("tr");
        let id = 1;
        // Crear celdas para cada propiedad del registro
        const idCell = document.createElement("td");
        idCell.textContent =id;
        fila.appendChild(idCell);
  
        const nombreActivoCell = document.createElement("td");
        nombreActivoCell.textContent = registro.activeStatusDto.activeDto.name;
        fila.appendChild(nombreActivoCell);
  
        const valueCell = document.createElement("td");
        valueCell.textContent = registro.activeStatusDto.activeDto.value;
        fila.appendChild(valueCell);
  
        const statusCell = document.createElement("td");
        statusCell.textContent = registro.activeStatusDto.activeTypeStatusDto.description;
        fila.appendChild(statusCell);
  
        const fechaBajaCell = document.createElement("td");
        fechaBajaCell.textContent = registro.requestDate;
        fila.appendChild(fechaBajaCell);

        const razonCell = document.createElement("td");
        razonCell.textContent = registro.reason;
        fila.appendChild(razonCell);

        const departamentoCell = document.createElement("td");
        departamentoCell.textContent = registro.deparmentDto.name;
        fila.appendChild(departamentoCell);
        
        // Agregar fila a la tabla
        tbody.appendChild(fila);
        id++;
      });
    }
  
    // Crear botones de paginación
    function crearBotonesPaginacion() {
      const paginacionDiv = document.getElementById("paginacion-assigned");
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
  
    obtenerInventario();
  });
  