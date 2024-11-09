/*assign pokemonlist*/

let pokemonRepository = (function () {
  let pokemonlist = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=50";

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

  function LoadList() {
    console.log("aaa");
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
        pokemon.image_front = details.sprites.front_default;
        pokemon.image_Back = details.sprites.back_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
        pokemon.weight = details.weight;
      })
      .catch(function (event) {
        console.error(event);
      });
  }

  function addEventListener(event, pokemon) {
    event.addEventListener("click", function () {
      showModal(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    listpokemon.classList = "list-group-item";
    button.setAttribute("data-toggle", "container");
    button.setAttribute("data-target", "#myModal");
    button.classList = "btn btn-secondary btn-lg btn-block";

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle = $(".modal-header");
    let modalBody = $(".modal-body");
    modalTitle.innerText = pokemon.name;

    // Clear all existing modal content
    // $("#myModal").on("shown.bs.modal", function () {
    //   $("#myInput").trigger("focus");
    // });
    //creating lelment for name in modal content
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    //creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img"style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    //creating element for height in modal content
    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
    //creating element for weight in modal content
    let weightElement = $("<p>" + "weight :" + pokemon.weight + "</p>");
    //creating element for type in modal content
    let typesElement = $("<p>" + "types : " + pokemon.types + "<p>");
    //creating element for abilities in modal content
    let abilitiesElement = $(
      "<p>" + "abilties : " + pokemon.abilities + "<p/>"
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  //open modal test//

  //***************************************************//

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    LoadList: LoadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    // hideModal: hideModal,
    // showModal: showModal,
  };
})();

console.log(pokemonRepository.getAll());

console.log(pokemonRepository.getAll());

pokemonRepository.LoadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
