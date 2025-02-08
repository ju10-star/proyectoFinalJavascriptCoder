// 1️⃣ Seleccionamos los elementos del DOM
const subirArchivo = document.getElementById('subirArchivo');
const btnSubir = document.getElementById('btnSubir');
const listaCanciones = document.getElementById('listaCanciones');
const reproductor = document.getElementById('reproductor');

// 2️⃣ Función para obtener la lista de canciones y mostrarlas en la página
const obtenerCanciones = () => {
    fetch('http://localhost:3000/canciones')
        .then(response => response.json())
        .then(canciones => {
            listaCanciones.innerHTML = ''; // Limpiamos la lista
            canciones.forEach(cancion => {
                const btnCancion = document.createElement('button');
                btnCancion.textContent = cancion;
                btnCancion.onclick = () => {
                    reproductor.src = `http://localhost:3000/upload/${cancion}`;
                    reproductor.style.display = 'block';
                    reproductor.play();
                };
                listaCanciones.appendChild(btnCancion);
            });
        })
        .catch(error => console.error('Error al obtener canciones:', error));
};

// 3️⃣ Función para subir un archivo al servidor
btnSubir.addEventListener('click', () => {
    const archivo = subirArchivo.files[0]; // Obtenemos el archivo seleccionado

    if (!archivo) {
        alert('Selecciona un archivo antes de subir.');
        return;
    }

    console.log('Archivo seleccionado:', archivo); // Verificación en consola

    const formData = new FormData();
    formData.append('archivo', archivo);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data); // Verifica la respuesta del servidor
        alert(data.mensaje);
        obtenerCanciones(); // Refresca la lista de canciones después de subir una nueva
    })
    .catch(error => {
        console.error('Error al subir archivo:', error);
        alert('Hubo un error al subir el archivo.');
    });
});

// 4️⃣ Cargar canciones al inicio
obtenerCanciones();

