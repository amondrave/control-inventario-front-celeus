document.addEventListener("DOMContentLoaded", function() {  

    const footerContainer = document.getElementById('footer');
    // Carga el contenido del encabezado
    function loadFooter() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "componentes/footer.html", true);
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            footerContainer.innerHTML = xhr.responseText;;
        }
      };
  
      xhr.send();
    }
  
  
    // Carga el contenido del encabezado y la barra lateral al cargar la página
    loadFooter();
  });
  