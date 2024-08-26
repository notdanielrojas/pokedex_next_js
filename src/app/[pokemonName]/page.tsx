import { getPokemon } from "@/lib/pokemonAPI";
import { PokemonImage } from "@/components/pokemon-image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Pokemon {
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: PokemonStat[];
}

export default async function PokemonPage({
  params,
}: {
  params: { pokemonName: string };
}) {
  const { pokemonName } = params;
  const pokemonObject: Pokemon = await getPokemon(pokemonName);
  const types = pokemonObject.types.map((typeInfo) => typeInfo.type.name);

  return (
    <>
      <div className='grid grid-cols-2 rounded-lg border border-transparent transition dark:border-gray-500 transition ease-in-out delay-150 m-10 p-20'>
        <div
          className='m-3'
          style={{ position: "relative", width: "400px", height: "400px" }}
        >
          <PokemonImage
            image={
              pokemonObject.sprites.other["official-artwork"].front_default
            }
            name={pokemonName}
          />
        </div>

        <div className='flex-col'>
          <h1 className='text-4xl text-bold py-8 '>
            {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
          </h1>
          {pokemonObject.stats.map((stateObject: PokemonStat) => {
            const statName = stateObject.stat.name;
            const statValue = stateObject.base_stat;
            return (
              <div
                className='flex items-stretch'
                style={{ width: "500px" }}
                key={statName}
              >
                <h3 className='p-3 w-2/4'>
                  {statName} : {statValue}
                </h3>
                <Progress className='w-2/4 m-auto' value={statValue} />
              </div>
            );
          })}
          <div className='flex mt-4 gap-2'>
            {types.map((type) => (
              <Badge className="py-2 px-10" key={type}>{type}</Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
