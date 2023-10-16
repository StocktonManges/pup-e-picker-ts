export type Dog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};

export type GetAllDogsRequest = () => Promise<void>;

export type SetIsLoadingProp = (loadingState: boolean) => void;

export type SetActiveFilterProp = (filterOption: FilterOptions) => void;

export type FilterOptions =
  | "all dogs"
  | "fav dogs"
  | "unfav dogs"
  | "create dog";

export type DogNoId = Omit<Dog, "id">;
