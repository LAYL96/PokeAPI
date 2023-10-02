// Selecciona un elemento del DOM con el id "listaPokemon" y lo almacena en la variable listaPokemon.
const listaPokemon = document.querySelector("#listaPokemon");

// Selecciona todos los elementos con la clase "btn-header" y los almacena en la variable botonesHeader.
const botonesHeader = document.querySelectorAll(".btn-header");

// Define la URL base para realizar las solicitudes a la API de Pokémon.
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Un bucle for que va desde 1 hasta 151 (para obtener información sobre los primeros 151 Pokémon).
for (let i = 1; i <= 151; i++) {
    // Realiza una solicitud fetch a la API de Pokémon para obtener información del Pokémon con el número 'i'.
    fetch(URL + i)
        .then((Response) => Response.json()) // Convierte la respuesta a formato JSON.
        .then(data => mostarPokemon(data)) // Llama a la función mostarPokemon con los datos del Pokémon.
}

// Función que recibe los datos de un Pokémon y los muestra en el DOM.
function mostarPokemon(poke) {
    // Crea un array de tipos de Pokémon y los convierte en elementos HTML.
    let tipos = poke.types.map((type) => 
        `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join(''); // Convierte el array en una cadena de texto.

    // Convierte el número de identificación del Pokémon en un formato de tres dígitos (p. ej., "#025").
    let pokeId = poke.id.toString();
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
    } else if(pokeId.length === 2){
        pokeId = "0" + pokeId;
    }

    // Crea un nuevo elemento <div> para mostrar la información del Pokémon y lo personaliza con clases y contenido HTML.
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;

    // Agrega el elemento <div> creado al elemento con id "listaPokemon" en el DOM.
    listaPokemon.append(div);
}

// Agrega un evento de clic a cada botón del encabezado ("ver-todos" y tipos de Pokémon).
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    // Limpia el contenido del elemento con id "listaPokemon" en el DOM.
    listaPokemon.innerHTML = "";

    // Realiza un bucle similar al anterior para obtener datos de Pokémon según el botón seleccionado.
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((Response) => Response.json())
            .then(data => {

                if(botonId === "ver-todos"){
                    mostarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    // Muestra el Pokémon si coincide con el tipo seleccionado en el botón.
                    if(tipos.some(tipo => tipo.includes(botonId))){
                        mostarPokemon(data);
                    }
                }
                
            })
    }
}));
