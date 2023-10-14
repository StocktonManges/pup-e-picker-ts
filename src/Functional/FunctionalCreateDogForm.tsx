import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { DogNoId, SetIsLoading, GetAllDogsRequest } from "../types";
import { useState } from "react";
import ErrorBox from "../Shared/ErrorBox";
import { Validations } from "../Shared/validations";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  refetchAllDogs,
  isLoading,
  setIsLoading,
}: {
  refetchAllDogs: GetAllDogsRequest;
  isLoading: boolean;
  setIsLoading: SetIsLoading;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newDog, setNewDog] = useState<DogNoId>({
    name: "",
    description: "",
    image: defaultSelectedImage,
    isFavorite: false,
  });
  const { name, description, image, isFavorite } = newDog;
  const { nameValidations, descriptionValidations } = Validations;
  const descriptionIsValidArr: boolean[] = descriptionValidations.map(
    (validationObj) => validationObj.isValidFunc(description)
  );

  return (
    <>
      <form
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            !descriptionIsValidArr.includes(false) &&
            nameValidations.isValidFunc(name)
          ) {
            setIsLoading(true);
            Requests.postDog(newDog)
              .then(() => refetchAllDogs())
              .catch((error) => console.log(error))
              .finally(() => setIsLoading(false));
            setNewDog({
              name: "",
              description: "",
              image: defaultSelectedImage,
              isFavorite: false,
            });
            setIsSubmitted(false);
          } else {
            setIsSubmitted(true);
          }
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          disabled={isLoading}
          value={name}
          onChange={(e) => {
            nameValidations.isValidFunc(name);
            return setNewDog({
              name: e.target.value,
              description,
              image,
              isFavorite,
            });
          }}
        />
        {nameValidations.isValidFunc(name) || !isSubmitted ? null : (
          <ErrorBox message={nameValidations.errorMessage} />
        )}
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="description"
          cols={80}
          rows={10}
          disabled={isLoading}
          value={description}
          onChange={(e) =>
            setNewDog({
              name,
              description: e.target.value,
              image,
              isFavorite: false,
            })
          }
        ></textarea>
        <div className="error-box-container">
          {!isSubmitted
            ? null
            : descriptionValidations.map((validationObj) =>
                validationObj.isValidFunc(description) ? null : (
                  <ErrorBox message={validationObj.errorMessage} />
                )
              )}
        </div>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          name="picture"
          disabled={isLoading}
          onChange={(e) =>
            setNewDog({
              name,
              description,
              image: e.target.value,
              isFavorite: false,
            })
          }
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" disabled={isLoading} />
      </form>
    </>
  );
};
