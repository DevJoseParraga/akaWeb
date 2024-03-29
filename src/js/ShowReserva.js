const urlParams = new URLSearchParams(window.location.search);
const idShow = urlParams.get('id');
 // Obtiene el id del parámetro URL
fetch(`http://localhost:8080/api/show/${idShow}`)
  .then(response => response.json())
  .then(data => {
    console.log('==============data======================');
    console.log(data);
    console.log('================data====================');
        const reservaTitle = document.getElementById("RSTitle")
        reservaTitle.innerHTML = ""
        reservaTitle.innerHTML = data.showName

       
  })
  .catch(error => console.error('Error:', error));


function marcarAsientosNoDisponibles(tables) {
    Object.entries(tables).forEach(([mesaId, asientos]) => {
        asientos.forEach(asiento => {
            // Escapar el identificador numérico para CSS
            const selector = `#\\3${mesaId[0]} ${mesaId.slice(1)} .asiento.${asiento}`;
            const asientoElem = document.querySelector(selector);
            if (asientoElem) {
                asientoElem.classList.add('no-disponible');
                asientoElem.style.backgroundColor = 'red';
                asientoElem.removeEventListener('click', toggleAsientoSelection);
            }
        });
    });
}



   // Objeto para almacenar los asientos seleccionados
let asientosSeleccionados = {};

function toggleAsientoSelection(event) {
    // Evitar que el evento se propague al contenedor de la mesa
    event.stopPropagation();

    const asiento = event.currentTarget;
    const mesaContainer = asiento.closest('.mesa-container');
    const mesaId = mesaContainer.id;
    const asientoClass = asiento.classList[1]; // asume que la segunda clase indica la posición (norte, sur, este, oeste)

    // Cambiar el color del asiento seleccionado
    asiento.classList.toggle('selected');
    const isSelected = asiento.classList.contains('selected');
    asiento.style.backgroundColor = isSelected ? 'yellow' : 'teal';

    // Actualizar el objeto de asientos seleccionados
    if (!asientosSeleccionados[mesaId]) {
        asientosSeleccionados[mesaId] = [];
    }

    if (isSelected) {
        // Agregar el asiento al array si está seleccionado
        if (!asientosSeleccionados[mesaId].includes(asientoClass)) {
            asientosSeleccionados[mesaId].push(asientoClass);
        }
    } else {
        // Remover el asiento del array si no está seleccionado
        asientosSeleccionados[mesaId] = asientosSeleccionados[mesaId].filter(a => a !== asientoClass);
    }
}

// Añadir el detector de eventos a cada asiento
    document.querySelectorAll('.asiento').forEach(asiento => {
    asiento.addEventListener('click', toggleAsientoSelection);
});

// Función para enviar los asientos seleccionados al backend
function enviarAsientosSeleccionados() {
    const cambios = {
        tables: asientosSeleccionados
    };
    
    fetch(`http://localhost:8080/api/showUpdate/${idShow}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cambios),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el show');
        }
        return response.json();
    })
    .then(data => {
        console.log('Show actualizado con éxito:', data);
        // Aquí puedes realizar acciones adicionales después de la actualización exitosa
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

