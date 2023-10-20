import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
import {
  FilterOptions,
  Dog,
  SetIsLoadingProp,
  GetAllDogsRequest,
} from "../types";
import { FunctionalModifyDogModal } from "./FunctionalModifyDogModal";

const compareDogsByName = (a: Dog, b: Dog) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

export const FunctionalDogs = ({
  allDogs,
  refetchAllDogs,
  activeFilter,
  isLoading,
  setIsLoading,
  deleteDog,
  favoriteDog,
  unfavoriteDog,
}: {
  allDogs: Dog[];
  refetchAllDogs: GetAllDogsRequest;
  activeFilter: FilterOptions;
  isLoading: boolean;
  setIsLoading: SetIsLoadingProp;
  deleteDog: (dog: Dog) => void;
  favoriteDog: (dog: Dog) => void;
  unfavoriteDog: (dog: Dog) => void;
}) => {
  const [dogToModify, setDogToModify] = useState<Dog | null>(null);
  const shouldDisplay = (dogIsFavorite: Dog["isFavorite"]): boolean => {
    if (activeFilter === "favorite") {
      return dogIsFavorite;
    } else if (activeFilter === "non-favorite") {
      return !dogIsFavorite;
    } else if (activeFilter === "all") {
      return true;
    }
    return false;
  };

  return (
    <>
      <section className="dog-cards">
        <FunctionalModifyDogModal
          refetchAllDogs={refetchAllDogs}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          dogToModify={dogToModify}
          setDogToModify={setDogToModify}
        />
        {allDogs.sort(compareDogsByName).map((dog) => {
          const { id, image, description, isFavorite, name } = dog;
          if (!shouldDisplay(isFavorite)) {
            return <></>;
          }
          return (
            <DogCard
              dog={{
                id,
                image,
                description,
                isFavorite,
                name,
              }}
              key={id}
              onTrashIconClick={() => {
                deleteDog(dog);
              }}
              onHeartClick={() => {
                unfavoriteDog(dog);
              }}
              onEmptyHeartClick={() => {
                favoriteDog(dog);
              }}
              isLoading={isLoading}
              onModifyDogClick={() => {
                setDogToModify(dog);
              }}
            />
          );
        })}
      </section>
    </>
  );
};
