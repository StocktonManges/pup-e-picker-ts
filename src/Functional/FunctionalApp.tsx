import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { FilterOptions, Dog, GetAllDogsRequest, DogNoId } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import toast from "react-hot-toast";
import { FunctionalDogs } from "./FunctionalDogs";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterOptions>("all");
  const [isLoading, setIsLoading] = useState(false);

  const refetchAllDogs: GetAllDogsRequest = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((allDogs) => setAllDogs(allDogs))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const postDog = (newDog: DogNoId) => {
    setIsLoading(true);
    return Requests.postDog(newDog)
      .then(() => refetchAllDogs())
      .then(() => {
        toast.success(`${newDog.name} created successfully!`);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (dog: Dog) => {
    Requests.deleteDog(dog.id)
      .then(() => refetchAllDogs())
      .then(() => {
        toast.success(`You have successfully deleted ${dog.name}.`);
      })
      .catch((error) => console.log(error));
  };

  const favoriteDog = (dog: Dog) => {
    Requests.toggleFavorite(dog.id, true)
      .then(() => refetchAllDogs())
      .then(() => {
        toast.success(`You have removed ${dog.name} from favorites.`);
      })
      .catch((error) => console.log(error));
  };

  const unfavoriteDog = (dog: Dog) => {
    Requests.toggleFavorite(dog.id, false)
      .then(() => refetchAllDogs())
      .then(() => {
        toast.success(`You have removed ${dog.name} from favorites.`);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    refetchAllDogs();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      >
        {activeFilter === "create" && (
          <FunctionalCreateDogForm postDog={postDog} isLoading={isLoading} />
        )}
        {activeFilter !== "create" && (
          <FunctionalDogs
            allDogs={allDogs}
            refetchAllDogs={refetchAllDogs}
            activeFilter={activeFilter}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            deleteDog={deleteDog}
            favoriteDog={favoriteDog}
            unfavoriteDog={unfavoriteDog}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
