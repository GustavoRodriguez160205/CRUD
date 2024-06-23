// Esperamos a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {

  // Obtenemos referencias a los elementos del DOM
  const formRegister = document.getElementById('formRegister'); // Formulario de registro
  const nameInput = document.getElementById('nameInput'); // Campo de entrada para el nombre
  const emailInput = document.getElementById('emailInput'); // Campo de entrada para el email
  const tableBody = document.getElementById('tableBody'); // Cuerpo de la tabla donde se mostrarán los datos

  // Inicializamos los datos desde localStorage o como un arreglo vacío si no hay datos
  let data = JSON.parse(localStorage.getItem('formData')) || [];

  // Añadimos un evento al formulario para manejar el envío de datos
  formRegister.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Obtenemos los valores de los campos de entrada
    const name = nameInput.value.trim(); // Utilizamos trim para eliminar espacios en blanco al inicio y final
    const email = emailInput.value.trim();

    // Verificamos que los campos no estén vacíos
    if (name && email) {
      const newData = { name, email }; // Creamos un objeto con los nuevos datos
      const editIndex = formRegister.getAttribute('data-edit-index'); // Obtenemos el índice de edición si existe

      if (editIndex !== null) {
        // Si editIndex no es null, significa que estamos editando un registro existente
        data[editIndex] = newData; // Actualizamos los datos en el arreglo en lugar de agregar uno nuevo
      } else {
        data.push(newData); // Añadimos los nuevos datos al arreglo si no estamos editando


      }


      saveDataToLocalStorage(); // Guardamos los datos en localStorage
      renderTable(); // Actualizamos la tabla con los nuevos datos
      formRegister.reset(); // Reiniciamos el formulario
      formRegister.removeAttribute('data-edit-index'); // Removemos el atributo de índice de edición
    }
  });

  // Función para guardar los datos en localStorage
  function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
  }

  // Función para renderizar la tabla con los datos
  function renderTable() {
    tableBody.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    // Iteramos sobre los datos para crear las filas de la tabla
    data.forEach((item, index) => {
      // Creamos una nueva fila (<tr>)
      const row = document.createElement('tr');
      // Creamos una celda para el nombre (<td>)
      const nameCell = document.createElement('td');
      // Creamos una celda para el email (<td>)
      const emailCell = document.createElement('td');
      // Creamos una celda para las acciones (<td>)
      const actionsCell = document.createElement('td');
      // Creamos un botón para editar
      const editButton = document.createElement('button');
      // Creamos un botón para eliminar
      const deleteButton = document.createElement('button');

      // Agregamos clases a los botones
      editButton.classList.add('button', 'button__secondary');
      deleteButton.classList.add('button', 'button__tertiary');

      // Configuramos eventos para los botones
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', () => {
        editData(index);
      });

      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', () => {
        deleteData(index);
      });

      // Asignamos el texto a las celdas de nombre y email
      nameCell.textContent = item.name;
      emailCell.textContent = item.email;

      // Añadimos botones a la celda de acciones
      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      // Añadimos las celdas a la fila
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(actionsCell);

      // Añadimos la fila a la tabla
      tableBody.appendChild(row);
    });
  }

  // Función para editar un elemento del arreglo de datos
  function editData(index) {
    const item = data[index];
    nameInput.value = item.name;
    emailInput.value = item.email;

    // Guardamos el índice del elemento que estamos editando en el formulario
    formRegister.setAttribute('data-edit-index', index.toString());
  }

  // Función para eliminar un elemento del arreglo de datos
  function deleteData(index) {
    // Eliminamos el elemento del arreglo
    data.splice(index, 1);

    // Guardamos el arreglo modificado en localStorage y actualizamos la tabla
    saveDataToLocalStorage();
    renderTable();
  }

  // Renderizamos la tabla al cargar la página
  renderTable();
});
