import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import {
  Dog,
  FilterOptions,
  GetAllDogsRequest,
  SetIsLoadingProp,
} from "../types";
import { ClassModifyDogModal } from "./ClassModifyDogModal";

type State = {
  dogToModify: Dog | null;
};

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

export class ClassDogs extends Component<
  {
    allDogs: Dog[];
    refetchAllDogs: GetAllDogsRequest;
    activeFilter: FilterOptions;
    isLoading: boolean;
    setIsLoading: SetIsLoadingProp;
    deleteDog: (dog: Dog) => void;
    unfavoriteDog: (dog: Dog) => void;
    favoriteDog: (dog: Dog) => void;
  },
  State
> {
  state: State = {
    dogToModify: null,
  };
  render() {
    const {
      allDogs,
      refetchAllDogs,
      activeFilter,
      isLoading,
      setIsLoading,
      deleteDog,
      unfavoriteDog,
      favoriteDog,
    } = this.props;
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
          <ClassModifyDogModal
            refetchAllDogs={refetchAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            dogToModify={this.state.dogToModify}
            setDogToModify={(modifiedDog: Dog | null) => {
              this.setState({ dogToModify: modifiedDog });
            }}
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
                  this.setState({ dogToModify: dog });
                }}
              />
            );
          })}
        </section>
      </>
    );
  }
}
