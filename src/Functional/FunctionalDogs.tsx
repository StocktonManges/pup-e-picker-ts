import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { FilterOptions, Dog, SetIsLoading, GetAllDogsRequest } from "../types";
import { FunctionalModifyDogModal } from "./FunctionalModifyDogModal";

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
  setIsLoading: SetIsLoading;
}) => {
  const [dogToModify, setDogToModify] = useState<Dog | null>(null);
  const shouldDisplay = (dog: Dog): boolean => {
    if (activeFilter === "fav dogs") {
      return dog.isFavorite;
    } else if (activeFilter === "unfav dogs") {
      return !dog.isFavorite;
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
          if (shouldDisplay(dog)) {
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
                    .catch((error) => console.log(error));
                  alert(`You have successfully deleted ${name}.`);
                }}
                onHeartClick={() => {
                  Requests.toggleFavorite(id, false)
                    .then(() => refetchAllDogs())
                    .catch((error) => console.log(error));
                  alert(`You have removed ${name} from favorites.`);
                }}
                onEmptyHeartClick={() => {
                  Requests.toggleFavorite(id, true)
                    .then(() => refetchAllDogs())
                    .catch((error) => console.log(error));
                  alert(`You have added ${name} to favorites.`);
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
