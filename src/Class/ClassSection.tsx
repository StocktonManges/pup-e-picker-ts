// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, FilterOptions, SetActiveFilterProp } from "../types";

export class ClassSection extends Component<{
  allDogs: Dog[];
  activeFilter: FilterOptions;
  setActiveFilter: SetActiveFilterProp;
  children: ReactNode;
}> {
  render() {
    const { allDogs, activeFilter, setActiveFilter, children } = this.props;

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
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
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

            {/* This should display the unfavorited count */}
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
  }
}
