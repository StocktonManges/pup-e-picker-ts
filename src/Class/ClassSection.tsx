// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Dog,
  FilterOptions,
  GetAllDogsRequest,
  SetActiveFilterProp,
  SetIsLoadingProp,
} from "../types";
import { ClassDogs } from "./ClassDogs";

export class ClassSection extends Component<{
  allDogs: Dog[] | null;
  refetchAllDogs: GetAllDogsRequest;
  activeFilter: FilterOptions;
  setActiveFilter: SetActiveFilterProp;
  isLoading: boolean;
  setIsLoading: SetIsLoadingProp;
  children: ReactNode;
}> {
  render() {
    const {
      allDogs,
      refetchAllDogs,
      activeFilter,
      setActiveFilter,
      isLoading,
      setIsLoading,
      children,
    } = this.props;

    const totalDogs = allDogs ? allDogs.length : 0;
    const totalFavs = allDogs
      ? allDogs.reduce((acc, curr) => (curr.isFavorite ? acc + 1 : acc), 0)
      : 0;
    const totalNotFavs = totalDogs - totalFavs;

    const updateActiveFilter = (
      classList: DOMTokenList,
      filterOption: FilterOptions
    ) => {
      Array.from(classList).includes("active")
        ? setActiveFilter("all dogs")
        : setActiveFilter(filterOption);
    };

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            <div
              className={
                activeFilter === "fav dogs" ? "selector active" : "selector"
              }
              onClick={(e) => {
                updateActiveFilter(
                  (e.target as HTMLDivElement).classList,
                  "fav dogs"
                );
              }}
            >
              favorited ( {totalFavs} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={
                activeFilter === "unfav dogs" ? "selector active" : "selector"
              }
              onClick={(e) => {
                updateActiveFilter(
                  (e.target as HTMLDivElement).classList,
                  "unfav dogs"
                );
              }}
            >
              unfavorited ( {totalNotFavs} )
            </div>
            <div
              className={
                activeFilter === "create dog" ? "selector active" : "selector"
              }
              onClick={(e) => {
                updateActiveFilter(
                  (e.target as HTMLDivElement).classList,
                  "create dog"
                );
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          <ClassDogs
            allDogs={allDogs}
            refetchAllDogs={refetchAllDogs}
            activeFilter={activeFilter}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          {children}
        </div>
      </section>
    );
  }
}
