import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, DogNoId, FilterOptions, GetAllDogsRequest } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { ClassDogs } from "./ClassDogs";

type State = {
  allDogs: Dog[];
  activeFilter: FilterOptions;
  isLoading: boolean;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    allDogs: [],
    activeFilter: "all",
    isLoading: false,
  };

  refetchAllDogs: GetAllDogsRequest = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((allDogs) => this.setState({ allDogs }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  postDog = (newDog: DogNoId) => {
    this.setState({ isLoading: true });
    return Requests.postDog(newDog)
      .then(() => this.refetchAllDogs())
      .then(() => {
        toast.success(`${newDog.name} created successfully!`);
      })
      .catch((error) => console.log(error));
  };

  deleteDog = (dog: Dog) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(dog.id)
      .then(() => this.refetchAllDogs())
      .then(() => {
        toast.success(`You have successfully deleted ${dog.name}.`);
      })
      .catch((error) => console.log(error));
  };

  favoriteDog = (dog: Dog) => {
    this.setState({ isLoading: true });
    Requests.toggleFavorite(dog.id, true)
      .then(() => this.refetchAllDogs())
      .then(() => {
        toast.success(`You have added ${dog.name} to favorites.`);
      })
      .catch((error) => console.log(error));
  };

  unfavoriteDog = (dog: Dog) => {
    this.setState({ isLoading: true });
    Requests.toggleFavorite(dog.id, false)
      .then(() => this.refetchAllDogs())
      .then(() => {
        toast.success(`You have removed ${dog.name} from favorites.`);
      })
      .catch((error) => console.log(error));
  };

  componentDidMount(): void {
    this.refetchAllDogs();
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={this.state.allDogs}
          activeFilter={this.state.activeFilter}
          setActiveFilter={(filterOption: FilterOptions) => {
            this.setState({ activeFilter: filterOption });
          }}
        >
          {this.state.activeFilter === "create" && (
            <ClassCreateDogForm
              postDog={this.postDog}
              isLoading={this.state.isLoading}
            />
          )}
          {this.state.activeFilter !== "create" && (
            <ClassDogs
              allDogs={this.state.allDogs}
              refetchAllDogs={this.props.refetchAllDogs}
              activeFilter={this.state.activeFilter}
              isLoading={this.state.isLoading}
              setIsLoading={(loadingState: boolean) => {
                this.setState({ isLoading: loadingState });
              }}
              deleteDog={this.deleteDog}
              unfavoriteDog={this.unfavoriteDog}
              favoriteDog={this.favoriteDog}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
