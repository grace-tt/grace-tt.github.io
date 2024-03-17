/*assign pokemonlist*/
let pokemonlist = [
    {
        Name: 'Charizard',
        height: 1.7,
        types: ['Fire', 'Flying'],
        Egg_Groups: ['Monster', 'Dragon']
        
    },
    {
        Name: 'Lvysaur',
        height: 1,
        types: ['Grass', 'Poison'],
        Egg_Groups: ['Monster', 'Dragon']
        
    },
    {
        Name: 'Spearow',
        height: 0.3,
        types: ['Fire', 'Normal'],
        Egg_Groups: ['Flying']
        
    },
    {
        Name: 'Nidoking',
        height: 1.4,
        types: ['Ground', 'Poison'],
        Egg_Groups: ['Monster', 'Field']
        
    }
];


/*console.log(pokemonlist);/

/*add for loop to show every name in pokemonlist*/
for (let i = 0; i < pokemonlist.length; i++) {
/*if height is over 1.5, then showing 'wow, it is big!'*/
  if (pokemonlist[i].height > 1.5) {
    document.write("<br>"+ pokemonlist[i].Name + "\n" + "(height:" + pokemonlist[i].height +")" + " - Wow, it is big!");
/*if height is less than 1.5, then only showing name and height*/
  } else {
    document.write("<br>"+pokemonlist[i].Name + "\n" + "(height:" + pokemonlist[i].height + ")" ); 
  }
}

