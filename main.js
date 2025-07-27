import axios from "axios";

import './style.css'

// const url = 'https://jsonplaceholder.typicode.com/todos';

// Перший варіант (послідовні запити)
// async function getTodos() {
//   const todo1 = await axios(`${url}/1`);
//   const todo2 = await axios(`${url}/2`);
//   const todo3 = await axios(`${url}/3`);

//   return [todo1.data, todo2.data, todo3.data];
// }

// getTodos()
//   .then(data => console.log(data))
//   .catch(error => {
//     console.log(error);
//   });



// / Другий варіант (паралельні запити через Promise.all)
// async function getTodos() {
//   const todosArr = [1, 2, 3];

//   const todos = todosArr.map(async (item) => {
//     const res = await axios(`${url}/${item}`);
//     return res.data;
//   });

//   const result = await Promise.all(todos);
//   return result;
// }

// getTodos()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   });


//    Різниця:

// Перший варіант — послідовне виконання (запити виконуються один за одним, повільніше).

// Другий варіант — паралельне виконання (всі запити надсилаються одночасно, швидше). Рекомендується для незалежних запитів.











/**
 * Використовуємо https://pokeapi.co/ та створимо сторінку перегляду покемонів
 *
 */

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';



const container = document.querySelector(".card-container");
const form = document.querySelector(".search-form");

form.addEventListener("submit", onSearch);

async function fetchData(pokemonName) {
    const result = await axios(`${BASE_URL}${pokemonName}`);
    return result.data;
}

async function onSearch(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value.trim();
    
    try {
        const data = await fetchData(searchQuery);
        console.log(data);
        
        container.innerHTML = renderPokemon(data);
    } catch(error) {
       onFetchError(error.message);
    }
}


function renderPokemon({ name, weight, height, abilities, sprites }) {

    const abilitiesList = abilities.map(({ ability }) => `
        <li class="list-group-item">${ability.name}</li>
    `).join("");

    return `
        <div class="card">
            <div class="card-img-top">
                <img src="${sprites.front_default}" alt="${name}"/>
            </div>
            <div class="card-body">
                <h3 class="card-title">Ім'я: ${name}</h3>
                <p class="card-text">Вага: ${weight}</p>
                <p class="card-text">Зріст: ${height}</p>
            </div>

            <p class="card-text">
                <h4>Вміння:</h4>
                <ul>
                    ${abilitiesList}
                </ul>
            </p>
        </div>
    `
}

function onFetchError(message) {
    alert(message)
}