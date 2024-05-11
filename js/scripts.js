/*assign pokemonlist*/

let pokemonRepository = (function () {
  let pokemonlist = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon /*&&
        "detailsUrl" in pokemon*/
    ) {
      pokemonlist.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonlist;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function LoadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    console.log("test1", pokemon);
    pokemonRepository.loadDetails(pokemon).then(function () {
      let modalcontainer = document.querySelector("#modalcontainer");
      let modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
      <h1>${pokemon.name}</h1>
      <p>Height: ${pokemon.height}</p>
      <p>Types: ${pokemon.types.map((type) => type.type.name)}</p>   
      <img src="${pokemon.imageUrl}" alt="${pokemon.name}" /> 
      `;

      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("button-close");
      closeButtonElement.innerText = "Close";
      closeButtonElement.addEventListener("click", hideModal);

      modalcontainer.appendChild(modal);
      modal.appendChild(closeButtonElement);

      modalcontainer.classList.add("is-visible");

      modalcontainer
        .querySelector(".button-close")
        .addEventListener("click", function () {
          modal.remove();
        });

      /* modalcontainer.addEventListener("click", function (event) {
          if (event.target === modalcontainer) {
            modalcontainer.remove();
          }
        });
    */
    });
  }

  window.addEventListener("keydown", (e) => {
    let modalcontainer1 = document.querySelector("#modalcontainer.is-visible");
    if (
      e.key === "Escape" &&
      modalcontainer1.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });

  function hideModal() {
    let modalcontainer1 = document.querySelector("#modalcontainer");
    modalcontainer1.classList.remove("is-visible");
  }

  modalcontainer.addEventListener("click", (e) => {
    let modalcontainer = document.querySelector("#modalcontainer");
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalcontainer) {
      hideModal();
    }
  });

  /*console.log(showModal)*/

  function showDetails(pokemon) {
    /*console.log("test");*/
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    LoadList: LoadList,
    loadDetails: loadDetails,
    showModal: showModal,
    showDetails: showDetails,
    hideModal: hideModal,
  };

  /*for (let i = 0; i < pokemonlist.length; i++) { */
})();

console.log(pokemonRepository.getAll());
/*pokemonRepository.add({ name: "Pikachu", height: 1.04, Types: ["electric"]});*/

console.log(pokemonRepository.getAll());

pokemonRepository.LoadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
