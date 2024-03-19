 // Función para cambiar el color de la mesa y los asientos
 function toggleMesaSelection(event) {
    // Obtener el elemento .mesa-container que fue clickeado
    const mesaContainer = event.currentTarget;
  
    // Cambiar el color de la mesa y los asientos dependiendo de si ya está seleccionado o no
    const isSelected = mesaContainer.classList.contains('selected');
  
    // Establecer los colores para el estado seleccionado
    const mesaColor = isSelected ? 'teal' : 'yellow';
    const asientoColor = isSelected ? 'teal' : 'yellow';
  
    // Aplicar los colores
    mesaContainer.querySelector('.mesa').style.backgroundColor = mesaColor;
    mesaContainer.querySelectorAll('.asiento').forEach(asiento => {
      asiento.style.backgroundColor = asientoColor;
    });
  
    // Alternar la clase selected
    mesaContainer.classList.toggle('selected');
  }
  
  // Obtener todos los contenedores de mesas
  const mesas = document.querySelectorAll('.mesa-container');
  
  // Añadir el detector de eventos a cada mesa
  mesas.forEach(mesa => {
    mesa.addEventListener('click', toggleMesaSelection);
  });