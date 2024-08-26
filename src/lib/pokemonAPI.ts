const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList(limit = 25, offset: number = 0) {
  const response = await fetch(POKEMON_API + "pokemon?limit=151&offset=0");
  const data = await response.json();

  const pokemonList = await Promise.all(
    data.results.map(async (pokemon: { name: string }) => {
      const pokemonData = await getPokemon(pokemon.name);
      const types = pokemonData.types.map(
        (typeInfo: { type: { name: string } }) => typeInfo.type.name
      );
      
      return {
        id: pokemonData.id,
        name: pokemon.name,
        image: pokemonData.sprites.other["official-artwork"].front_default,
        types: types,
      };
    })
  );

  return pokemonList;
}

export async function getPokemon(name: string) {
  const response = await fetch(POKEMON_API + "pokemon/" + name);
  const data = await response.json();
  return data;
}
