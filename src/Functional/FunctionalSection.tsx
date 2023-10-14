// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FilterOptions, Dog, GetAllDogsRequest, SetIsLoading } from "../types";

export const FunctionalSection = ({
  allDogs,
  refetchAllDogs,
  activeFilter,
  setActiveFilter,
  isLoading,
  setIsLoading,
  children,
}: {
  allDogs: Dog[] | null;
  refetchAllDogs: GetAllDogsRequest;
  activeFilter: FilterOptions;
  setActiveFilter: (filterOption: FilterOptions) => void;
  isLoading: boolean;
  setIsLoading: SetIsLoading;
  children: ReactNode;
}) => {
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
        <div className="container-label">Dogs:</div>
        <Link to={"/class"} className="btn">
          Change to Class
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
        <FunctionalDogs
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
};
