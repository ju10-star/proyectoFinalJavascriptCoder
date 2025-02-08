// DOM getElementById
const btnAgregarCancion = document.getElementById('agregarCancionBtn');
const btnFiltrarCanciones = document.getElementById('filtrarCancionesBtn');
const songList = document.getElementById('songList');

// Cargar canciones localStorage
let canciones = JSON.parse(localStorage.getItem('canciones')) || [];

// Función mostrar canciones
// Función para mostrar canciones
const mostrarCanciones = (cancionesFiltradas = canciones) => {
    songList.innerHTML = ''; // Limpiar la lista antes de mostrar

    if (cancionesFiltradas.length === 0) {
        songList.innerHTML = '<p>No hay canciones disponibles.</p>';
    } else {
        cancionesFiltradas.forEach((cancion, indice) => {
            const itemCancion = document.createElement('div');
            itemCancion.classList.add('cancion-item');
            itemCancion.innerHTML = `
                <strong>${cancion.titulo}</strong> - ${cancion.artista} (${cancion.genero})
                <button onclick="eliminarCancion(${indice})" style="float:right; color: red;">Eliminar</button>
            `;
            songList.appendChild(itemCancion); // 🔹 Corrección aquí
        });
    }
};

// Mostrar las canciones al cargar la página
mostrarCanciones();

// Función agregar nueva canción
btnAgregarCancion.addEventListener('click', () => {
    Swal.fire({
        title: 'Agregar Canción',
        html: `  
            <input type="text" id="tituloCancion" class="swal2-input" placeholder="Título">
            <input type="text" id="artistaCancion" class="swal2-input" placeholder="Artista">
            <input type="text" id="generoCancion" class="swal2-input" placeholder="Género">
        `,
        confirmButtonText: 'Agregar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const titulo = document.getElementById('tituloCancion').value.trim();
            const artista = document.getElementById('artistaCancion').value.trim();
            const genero = document.getElementById('generoCancion').value.trim();

            if (!titulo || !artista || !genero) {
                Swal.showValidationMessage('Todos los campos son obligatorios.');
                return false;
            }

            return { titulo, artista, genero };
        }
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            // 🔹 Se añadió esta parte para enviar los datos al servidor
            fetch('http://localhost:3000/agregar-cancion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resultado.value)
            })
            .then(response => response.json())
            .then(data => {
                Swal.fire('¡Éxito!', data.mensaje, 'success');
                mostrarCanciones(); // 🔹 Se refresca la lista de canciones después de agregar
            })
            .catch(error => {
                console.error('Error al agregar canción:', error);
                Swal.fire('Error', 'Hubo un problema al agregar la canción.', 'error');
            });
        }
    });
});


// Filtrar canciones por género
btnFiltrarCanciones.addEventListener('click', () => {
    Swal.fire({
        title: 'Filtrar Canciones',
        input: 'text',
        inputPlaceholder: 'Ingrese el género a filtrar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Filtrar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            const generoFiltro = resultado.value.trim().toLowerCase();
            const cancionesFiltradas = canciones.filter(cancion => cancion.genero.toLowerCase() === generoFiltro);

            if (cancionesFiltradas.length === 0) {
                Swal.fire('Sin resultados', `No se encontraron canciones del género "${resultado.value}".`, 'info');
            } else {
                mostrarCanciones(cancionesFiltradas);
            }
        }
    });
});

// Funcióneliminar una canción
const eliminarCancion = (indice) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'La canción será eliminada permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            canciones.splice(indice, 1);
            localStorage.setItem('canciones', JSON.stringify(canciones));
            mostrarCanciones();
            Swal.fire('Eliminado', 'La canción fue eliminada correctamente.', 'success');
        }
    });
};

mostrarCanciones();

