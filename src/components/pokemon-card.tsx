import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export function PokemonCard({ id, name, image, types }: PokemonCardProps) {
  return (
    <Link
      href={name}
      className='group rounded-lg border border-transparent m-3 py-6 transition dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 transition ease-in-out delay-150 hover:-translate-y-1 delay-150 duration-300 ease-in-out hover:scale-105 hover:bg-indigo-500 duration-300'
      rel='noopener noreferrer'
    >
      <h2 className='flex justify-end text-2xl font-semibold pr-5'>#{id}</h2>
      <img src={image} alt={`Picture of ${name}`} />
      <h2 className=' text-2xl font-semibold'>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
      <div className='flex justify-center mt-2 gap-2'>
        {types.map((type) => (
          <Badge key={type}>{type}</Badge>
        ))}
      </div>
    </Link>
  );
}
