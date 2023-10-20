// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FilterOptions, Dog, SetActiveFilterProp } from "../types";

export const FunctionalSection = ({
  allDogs,
  activeFilter,
  setActiveFilter,
  children,
}: {
  allDogs: Dog[];
  activeFilter: FilterOptions;
  setActiveFilter: SetActiveFilterProp;
  children: ReactNode;
}) => {
  const totalDogs = allDogs.length;
  const totalFavs = allDogs.reduce(
    (acc, curr) => (curr.isFavorite ? acc + 1 : acc),
    0
  );
  const totalNonFavs = totalDogs - totalFavs;

  const updateActiveFilter = (filterOption: FilterOptions) => {
    filterOption === activeFilter
      ? setActiveFilter("all")
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
              activeFilter === "favorite" ? "selector active" : "selector"
            }
            onClick={() => {
              updateActiveFilter("favorite");
            }}
          >
            favorited ( {totalFavs} )
          </div>

          <div
            className={
              activeFilter === "non-favorite" ? "selector active" : "selector"
            }
            onClick={() => {
              updateActiveFilter("non-favorite");
            }}
          >
            unfavorited ( {totalNonFavs} )
          </div>
          <div
            className={
              activeFilter === "create" ? "selector active" : "selector"
            }
            onClick={() => {
              updateActiveFilter("create");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
