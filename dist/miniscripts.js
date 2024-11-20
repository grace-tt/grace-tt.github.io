let pokemonRepository = (function () {
  let t = [];
  function e(e) {
    "object" == typeof e && "name" in e
      ? t.push(e)
      : console.log("pokemon is not correct");
  }
  function n() {
    return t;
  }
  function o(t, e) {
    t.addEventListener("click", function () {
      a(e);
    });
  }
  function i(t) {
    pokemonRepository.loadDetails(t).then(function () {
      a(t);
    });
  }
  function a(t) {
    let e = $(".modal-header"),
      n = $(".modal-body");
    e.text(t.name);
    let o = $('<img class="modal-img" style="width:50%">');
    o.attr("src", t.image_front);
    let i = $('<img class="modal-img"style="width:50%">');
    i.attr("src", t.image_Back);
    let a = $("<p>height : " + t.height + "</p>"),
      l = $("<p>weight :" + t.weight + "</p>"),
      s = $(
        "<p>types : " + t.types.map(({ type: t }) => t.name).join(", ") + "<p>"
      ),
      p = $(
        "<p>abilties : " +
          t.abilities.map(({ ability: t }) => t.name).join(", ") +
          "<p/>"
      );
    n.html(""),
      n.append(o),
      n.append(i),
      n.append(l),
      n.append(a),
      n.append(s),
      n.append(p);
  }
  return {
    add: e,
    getAll: n,
    addListItem: function t(e) {
      let n = document.querySelector(".pokemon-list"),
        o = document.createElement("li"),
        a = document.createElement("button");
      (a.innerText = e.name),
        (o.classList = "list-group-item"),
        a.setAttribute("data-bs-toggle", "modal"),
        a.setAttribute("data-bs-target", "#myModal"),
        (a.classList = "btn btn-secondary btn-lg btn-block"),
        o.appendChild(a),
        n.appendChild(o),
        a.addEventListener("click", function (t) {
          i(e);
        });
    },
    LoadList: function t() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=52")
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            e({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: function t(e) {
      return fetch(e.detailsUrl)
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          (e.image_front = t.sprites.front_default),
            (e.image_Back = t.sprites.back_default),
            (e.height = t.height),
            (e.types = t.types),
            (e.abilities = t.abilities),
            (e.weight = t.weight);
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    showDetails: i,
  };
})();
console.log(pokemonRepository.getAll()),
  console.log(pokemonRepository.getAll()),
  pokemonRepository.LoadList().then(function () {
    pokemonRepository.getAll().forEach(function (t) {
      pokemonRepository.addListItem(t);
    });
  });
