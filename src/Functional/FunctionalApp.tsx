import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { FilterOptions, Dog, GetAllDogsRequest } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<null | Dog[]>(null);
  const [activeFilter, setActiveFilter] = useState<FilterOptions>("all dogs");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllDogs: GetAllDogsRequest = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((allDogs) => setAllDogs(allDogs))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchAllDogs();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        refetchAllDogs={fetchAllDogs}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      >
        {activeFilter === "create dog" ? (
          <FunctionalCreateDogForm
            refetchAllDogs={fetchAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : null}
      </FunctionalSection>
    </div>
  );
}
