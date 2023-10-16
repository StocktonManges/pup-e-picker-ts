import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import {
  FilterOptions,
  Dog,
  SetIsLoadingProp,
  GetAllDogsRequest,
} from "../types";
import { FunctionalModifyDogModal } from "./FunctionalModifyDogModal";
import toast from "react-hot-toast";

export const FunctionalDogs = ({
  allDogs,
  refetchAllDogs,
  activeFilter,
  isLoading,
  setIsLoading,
}: {
  allDogs: Dog[] | null;
  refetchAllDogs: GetAllDogsRequest;
  activeFilter: FilterOptions;
  isLoading: boolean;
  setIsLoading: SetIsLoadingProp;
}) => {
  const [dogToModify, setDogToModify] = useState<Dog | null>(null);
  const shouldDisplay = (dogIsFavorite: Dog["isFavorite"]): boolean => {
    if (activeFilter === "fav dogs") {
      return dogIsFavorite;
    } else if (activeFilter === "unfav dogs") {
      return !dogIsFavorite;
    } else if (activeFilter === "all dogs") {
      return true;
    }
    return false;
  };
  const compare = (a: Dog, b: Dog) => {
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
        {allDogs?.sort(compare).map((dog) => {
          const { id, image, description, isFavorite, name } = dog;
          if (shouldDisplay(isFavorite)) {
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
                  Requests.deleteDog(id)
                    .then(() => refetchAllDogs())
                    .then(() => {
                      toast.success(`You have successfully deleted ${name}.`);
                    })
                    .catch((error) => console.log(error));
                }}
                onHeartClick={() => {
                  Requests.toggleFavorite(id, false)
                    .then(() => refetchAllDogs())
                    .then(() => {
                      toast.success(`You have removed ${name} from favorites.`);
                    })
                    .catch((error) => console.log(error));
                }}
                onEmptyHeartClick={() => {
                  Requests.toggleFavorite(id, true)
                    .then(() => refetchAllDogs())
                    .then(() => {
                      toast.success(`You have added ${name} to favorites.`);
                    })
                    .catch((error) => console.log(error));
                }}
                isLoading={isLoading}
                onModifyDogClick={() => {
                  setDogToModify(dog);
                }}
              />
            );
          }
        })}
      </section>
    </>
  );
};
