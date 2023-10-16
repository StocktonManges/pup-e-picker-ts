import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, FilterOptions, GetAllDogsRequest } from "../types";
import { Requests } from "../api";

type State = {
  allDogs: null | Dog[];
  activeFilter: FilterOptions;
  isLoading: boolean;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    allDogs: null,
    activeFilter: "all dogs",
    isLoading: false,
  };

  fetchAllDogs: GetAllDogsRequest = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((allDogs) => this.setState({ allDogs }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount(): void {
    this.fetchAllDogs();
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={this.state.allDogs}
          refetchAllDogs={this.fetchAllDogs}
          activeFilter={this.state.activeFilter}
          setActiveFilter={(filterOption: FilterOptions) => {
            this.setState({ activeFilter: filterOption });
          }}
          isLoading={this.state.isLoading}
          setIsLoading={(loadingState: boolean) => {
            this.setState({ isLoading: loadingState });
          }}
        >
          {this.state.activeFilter === "create dog" ? (
            <ClassCreateDogForm
              refetchAllDogs={this.fetchAllDogs}
              isLoading={this.state.isLoading}
              setIsLoading={(loadingState: boolean) => {
                this.setState({ isLoading: loadingState });
              }}
            />
          ) : null}
        </ClassSection>
      </div>
    );
  }
}
