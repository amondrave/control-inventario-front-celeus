document.getElementById("from-login").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  
    const email = document.getElementById("yourUsername").value;
    const password = document.getElementById("yourPassword").value;
  
    // Realizar la solicitud POST utilizando fetch
    fetch('http://localhost:8090/inventario/login', {
      method: 'POST',
      // Agrega las opciones necesarias para enviar los datos de inicio de sesión
      // como el cuerpo de la solicitud
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.id) {
          // Si se obtiene una respuesta válida con datos de usuario,
          // puedes guardar los datos en localStorage como se mencionó anteriormente
          localStorage.setItem('userData', JSON.stringify(data));
          console.log('Datos guardados en localStorage:', data);
          // Realizar cualquier otra acción necesaria, como redireccionar a otra página
          window.location.href = 'principal.html';
        } else {
          // Si la respuesta está vacía o no contiene datos de usuario válidos,
          // muestra una alerta al usuario
          alert('No fue posible iniciar sesión. Verifica tus credenciales.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Muestra una alerta en caso de error de conexión o solicitud
        alert('Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo más tarde.');
      });
  });
  