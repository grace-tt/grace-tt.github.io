/*assign pokemonlist*/

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
    pokemonlist.push(pokemon);
  }

  function getAll() {
    return pokemonlist;
  }

  return {
    add: add,
    getAll: getAll,
  };

  /*for (let i = 0; i < pokemonlist.length; i++) { */
})();

pokemonRepository.add({ Name: "Pikachu", height: 1.04 });
pokemonRepository.getAll().forEach(function (currentitem) {
  if (currentitem.height > 1.5) {
    document.write(
      "<br>" +
        currentitem.Name +
        "\n" +
        "(height:" +
        currentitem.height +
        ")" +
        " - Wow, it is big!"
    );
  } else {
    document.write(
      "<br>" + currentitem.Name + "\n" + "(height:" + currentitem.height + ")"
    );
  }
});

console.log(pokemonRepository.getAll());
