import { Dog, DogNoId } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch all dogs.");
      }
      return response.json();
    }),

  postDog: (dog: DogNoId): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dog),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to post dog: ${dog.name}.`);
      }
      return response.json();
    });
  },

  deleteDog: (id: number) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to delete dog: ${id}.`);
      }
      return response.json();
    });
  },

  updateDog: (dog: Omit<Dog, "isFavorite">): Promise<Dog> => {
    const { name, description, image, id } = dog;
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        image,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to update dog: ${dog.id}.`);
      }
      return response.json();
    });
  },

  toggleFavorite: (id: number, moveToFavorites: boolean) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite: moveToFavorites }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Unable to toggle 'isFavorite' attribute on dog: ${id}.`
        );
      }
      return response.json();
    });
  },
};
