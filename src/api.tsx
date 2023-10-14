import { Dog, DogNoId } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: (): Promise<Dog[] | null> =>
    fetch(`${baseUrl}/dogs`)
      .then((response) => response.json())
      .catch((error) => console.log(error)),

  postDog: (dog: DogNoId): Promise<DogNoId> => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify(dog),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },

  deleteDog: (id: Number) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
      redirect: "follow",
    }).catch((error) => console.log("error", error));
  },

  updateDog: (
    dog: Omit<Dog, "isFavorite">
  ): Promise<Omit<Dog, "isFavorite">> => {
    const { name, description, image, id } = dog;
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({
        name,
        description,
        image,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },

  toggleFavorite: (id: number, moveToFavorites: boolean) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite: moveToFavorites }),
      redirect: "follow",
    }).catch((error) => console.log(error));
  },
};
