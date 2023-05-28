

// Variable para almacenar la lista
let optionsList = [];

// Función para realizar la consulta al endpoint y formar los options
function loadOptions() {
  // Verificar si la lista ya existe
  console.log(optionsList.length)
  if (optionsList.length > 0) {
    // Si la lista ya existe, utilizarla para formar los options
    createOptions(optionsList);
    return;
  }

  // Realizar la consulta al endpoint para obtener la lista
  // Puedes utilizar fetch u otra función para realizar la solicitud HTTP
  fetch('http://localhost:8090/inventario/ActiveType/findAll')
    .then(response => response.json())
    .then(data => {
      // Almacenar la lista obtenida
      optionsList = data;

      // Formar los options con la lista obtenida
      createOptions(optionsList);
    })
    .catch(error => {
      console.error('Error al obtener la lista:', error);
    });
}

// Función para formar los options en el select
function createOptions(list) {
  const select = document.getElementById('activeType');

  // Limpiar las opciones existentes en el select
  select.innerHTML = '';

  // Crear y agregar las nuevas opciones en base a la lista
  list.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.type;
    select.appendChild(option);
  });
}

// Evento onchange del select
document.getElementById('activeType').addEventListener('focus', loadOptions);


document.getElementById("create-active").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const form = document.getElementById("create-active");
    const formData = new FormData(form);
    let userDataString = localStorage.getItem("userData");
    let userData = JSON.parse(userDataString);
  
    const activeDto = {
      name: formData.get("name"),
      serial: formData.get("serial"),
      characteristic: formData.get("characteristic"),
      quantity: formData.get("quantity"),
      yearAcquired: formData.get("yearAcquired"),
      value: formData.get("value"),
      userDto: {
        id: userData.id,
      },
      activeTypeDto: {
        id: formData.get("activeType"),
      },
    };
  
    const file = formData.get("formFile");
  
    const requestData = new FormData();
    requestData.append("body", JSON.stringify(activeDto));
    requestData.append("image", file);
  
    console.log(activeDto);
    console.log(requestData.get('body'));
    console.log(requestData.get('image'));

    fetch("http://localhost:8090/inventario/active/create", {
      method: "POST",
      body: requestData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('El elemento se ha registrado correctamente.');
        // Redirigir a principal.html
        window.location.href = 'principal.html';
      })
      .catch((error) => {
        console.error("Error:", error);
        alert('fallo');
      });
});