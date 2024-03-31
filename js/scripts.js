/*assign pokemonlist*/
window.onload = () => {
  let pokemonRepository = (function () {
    let pokemonlist = [
      {
        Name: "Charizard",
        height: 1.7,
        types: ["Fire", "Flying"],
        Egg_Groups: ["Monster", "Dragon"],
      },
      {
        Name: "Lvysaur",
        height: 1,
        types: ["Grass", "Poison"],
        Egg_Groups: ["Monster", "Dragon"],
      },
      {
        Name: "Spearow",
        height: 0.3,
        types: ["Fire", "Normal"],
        Egg_Groups: ["Flying"],
      },
      {
        Name: "Nidoking",
        height: 1.4,
        types: ["Ground", "Poison"],
        Egg_Groups: ["Monster", "Field"],
      },
    ];

    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "Name" in pokemon &&
        "height" in pokemon &&
        "types" in pokemon
      ) {
        pokemonlist.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }

    function getAll() {
      return pokemonlist;
    }
    /*add button and eventlistener*/
    function addListItem(pokemon) {
      let rrrpokemon = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.Name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      rrrpokemon.appendChild(listpokemon);
      button.addEventListener("click", function (event) {
        showDetails(pokemon);
      });
    }

    function showDetails(pokemon) {
      console.log(pokemon);
    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
    };

    /*for (let i = 0; i < pokemonlist.length; i++) { */
  })();

  console.log(pokemonRepository.getAll());
  pokemonRepository.add({ Name: "Pikachu", height: 1.04, types: "electric" });

  console.log(pokemonRepository.getAll());

  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

}
