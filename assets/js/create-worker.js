// Variable para almacenar la lista
let optionsList = [];

let chargeList = [];

function loadDocumentType() {
  if (optionsList.length > 0) {
    // Si la lista ya existe, utilizarla para formar los options
    createOptions(optionsList);
    return;
  }
  // Realizar la consulta al endpoint para obtener la lista
  // Puedes utilizar fetch u otra función para realizar la solicitud HTTP
  fetch("http://localhost:8090/inventario/DocumentType/findAll")
    .then((response) => response.json())
    .then((data) => {
      // Almacenar la lista obtenida
      optionsList = data;

      // Formar los options con la lista obtenida
      createOptions(optionsList);
    })
    .catch((error) => {
      console.error("Error al obtener la lista:", error);
    });
}

// Función para formar los options en el select
function createOptions(list) {
  const select = document.getElementById("documentType");

  // Limpiar las opciones existentes en el select
  select.innerHTML = "";

  // Crear y agregar las nuevas opciones en base a la lista
  list.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.sigle;
    select.appendChild(option);
  });
}

  // Evento onchange del select
  document.getElementById('documentType').addEventListener('focus', loadDocumentType);

function loadCharge() {
  if (chargeList.length > 0) {
    // Si la lista ya existe, utilizarla para formar los options
    createOptionsChange(chargeList);
    return;
  }

  // Puedes utilizar fetch u otra función para realizar la solicitud HTTP
  fetch("http://localhost:8090/inventario/charge/findAll")
    .then((response) => response.json())
    .then((data) => {
      // Almacenar la lista obtenida
      chargeList = data;

      // Formar los options con la lista obtenida
      createOptionsChange(chargeList);
    })
    .catch((error) => {
      console.error("Error al obtener la lista:", error);
    });
}

function createOptionsChange(list) {
  const select = document.getElementById("charge");

  // Limpiar las opciones existentes en el select
  select.innerHTML = "";

  // Crear y agregar las nuevas opciones en base a la lista
  list.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    select.appendChild(option);
  });
}

  // Evento onchange del select
  document.getElementById('charge').addEventListener('focus', loadCharge);

  document.getElementById("create-worker").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const form = document.getElementById("create-worker");
    const formData = new FormData(form);

    const headers = {
        "content-type": "application/json; charset=UTF-8"
    }


    const workerDto = {
     documentTypeDto:{
        id: formData.get("documentType")
      },
      chargeDto:{
        id: formData.get("charge")
      },
      name: formData.get("nameWorker"),
      identification: formData.get("identification")
    };
  



    fetch("http://localhost:8090/inventario/worker/create", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(workerDto)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: 'Buen Trabajo!',
          text: 'El registro ha sido exitoso!',
          icon: 'success'
        }).then(() => {
          window.location.href = 'worker.html'; // Redireccionar a 'principal.html'
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Lo sentimos no fue posible realizar el registro'
        })
      });
});
