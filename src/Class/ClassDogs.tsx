import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import {
  Dog,
  FilterOptions,
  GetAllDogsRequest,
  SetIsLoadingProp,
} from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { ClassModifyDogModal } from "./ClassModifyDogModal";

type State = {
  dogToModify: Dog | null;
};

export class ClassDogs extends Component<
  {
    allDogs: Dog[] | null;
    refetchAllDogs: GetAllDogsRequest;
    activeFilter: FilterOptions;
    isLoading: boolean;
    setIsLoading: SetIsLoadingProp;
  },
  State
> {
  state: State = {
    dogToModify: null,
  };
  render() {
    const { allDogs, refetchAllDogs, activeFilter, isLoading, setIsLoading } =
      this.props;
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
          <ClassModifyDogModal
            refetchAllDogs={refetchAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            dogToModify={this.state.dogToModify}
            setDogToModify={(modifiedDog: Dog | null) => {
              this.setState({ dogToModify: modifiedDog });
            }}
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
                        toast.success(
                          `You have removed ${name} from favorites.`
                        );
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
                    this.setState({ dogToModify: dog });
                  }}
                />
              );
            }
          })}
        </section>
      </>
    );
  }
}
