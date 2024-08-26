"use client";
import * as React from "react";
import { PokemonCard } from "./pokemon-card";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

interface PokemonGridProps {
  pokemonList: Pokemon[];
}

const ITEMS_PER_PAGE = 25;

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchFilter = (pokemonList: Pokemon[]) => {
    return pokemonList.filter((pokemon: Pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(pokemonList);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedPokemonList = filteredPokemonList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredPokemonList.length / ITEMS_PER_PAGE);

  return (
    <>
      <div>
        <h3 className='text-2xl py-6 text-center'> Find Your Pokemon!</h3>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='mx-30' htmlFor='pokemonName'>
            Pokemon Name
          </Label>
          <Input
            className='mx-30'
            type='text'
            value={searchText}
            autoComplete='off'
            id='pokemonName'
            placeholder='Enter the name of your Pokemon here!'
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <h3 className='text-3xl pt-12 pb-6 text-center'>Pokemon Collection</h3>
      </div>

      <div className='mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-center'>
        {paginatedPokemonList.map((pokemon: Pokemon) => {
          return (
            <PokemonCard
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          );
        })}
      </div>
      <Pagination className='mt-10'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href='#'
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
