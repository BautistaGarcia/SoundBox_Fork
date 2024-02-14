
// function hide() {
//     document.getElementById("desplegable").style.display = "none";
//     document.getElementById("labels-ordenador").style.display = "none";
// }

// function show() {
//     document.getElementById("desplegable").style.display = "block";
//     document.getElementById("labels-ordenador").style.display = "flex";


    // var desplegable = document.getElementById("desplegable");
    // desplegable.addClass('productCart-open')
// }


// ________________________________________________________________________________________________
//                                      ORDENAR POR ALFABETO
// ________________________________________________________________________________________________

function ordenarAlfabeticamente() {
    // Obtener el elemento desplegable
    const desplegable = document.getElementById("desplegable");
  
    // Obtener los elementos .card dentro del desplegable
    const cards = Array.from(desplegable.getElementsByClassName("card"));
  
    // Ordenar las tarjetas alfabéticamente
    cards.sort((a, b) => {
      const aName = a.getElementsByClassName("nombre-marca")[0].getElementsByTagName("h5")[0].innerText;
      const bName = b.getElementsByClassName("nombre-marca")[0].getElementsByTagName("h5")[0].innerText;
  
      return aName.localeCompare(bName);
    });
  
    // Limpiar el desplegable
    desplegable.innerHTML = "";
  
    // Agregar las tarjetas ordenadas al desplegable
    cards.forEach(card => {
      desplegable.appendChild(card);
    });
  }






// ________________________________________________________________________________________________
const showCart = document.querySelector('.showCart');
const desplegable = document.querySelector('.desplegable');
const hideCart = document.querySelector('.hideCart');
const ordenadorContainer = document.querySelector('ordenador-container')

showCart.addEventListener('click', (e)=> {
    e.preventDefault();
    desplegable.classList.add('modal__show');
});

hideCart.addEventListener('click', (e)=> {
    e.preventDefault();
    desplegable.classList.remove('modal__show');
    // ordenadorContainer.style.width = "0";
})

// _______________________________________________________________________________________________

function decrementar(id) {
    const cantidadElement = document.getElementById(`cantidad-${id}`);
    let cantidad = parseInt(cantidadElement.innerText, 10);
    if (cantidad > 1) {
        cantidad--;
        cantidadElement.innerText = cantidad;
        // Puedes enviar una solicitud al servidor para actualizar la cantidad allí
    }
}

function incrementar(id, stock) {
    const cantidadElement = document.getElementById(`cantidad-${id}`);
    let cantidad = parseInt(cantidadElement.innerText, 10);
    if (cantidad < stock) {
        cantidad++;
        cantidadElement.innerText = cantidad;

    } else {
        alert("no hay stock suficiente");
        // Puedes enviar una solicitud al servidor para actualizar la cantidad allí
    }
}

