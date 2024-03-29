
// const finalizarReserva = document.getElementById("btnFReserva")
// finalizarReserva.addEventListener("click",() =>{
//   enviarAsientosSeleccionados()

// })


 
  async function fetchShows() {
    try {
      const response = await fetch('http://localhost:8080/api/shows'); // Asegúrate de usar tu URL correcta
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const shows = await response.json();
        console.log('================shows====================');
        console.log(shows);
        console.log('================shows====================');
      // Llama a la función para actualizar la galería con los datos recibidos
      createGallery(shows);
    } catch (error) {
      console.error("No se pudo obtener los shows:", error);
    }
  }
  
  function createGallery(shows) {
    const gallery = document.getElementById('galleryImg');
    
    // Limpia la galería antes de agregar nuevos elementos
    gallery.innerHTML = '';
  
    // Itera sobre cada show para crear un enlace y una imagen
    shows.forEach(show => {
      const anchor = document.createElement('a');
      // Aquí asumimos que quieres redireccionar a 'showDetail.html' y pasar el id como parámetro en la URL
      anchor.href = `/src/pages/showDetail.html?id=${show.id}`;
      const image = document.createElement('img');
      image.src = show.flayer; // Usa la propiedad flayer para la fuente de la imagen
      image.alt = show.showName; // Usa el nombre del show como texto alternativo
      
      // Añade la imagen al enlace
      anchor.appendChild(image);
      
      // Añade el enlace a la galería
      gallery.appendChild(anchor);
    });
  }
  
   






  

