import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { DogNoId, SetIsLoadingProp, GetAllDogsRequest } from "../types";
import { useState, useRef } from "react";
import ErrorBox from "../Shared/ErrorBox";
import { Validations } from "../Shared/validations";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  refetchAllDogs,
  isLoading,
  setIsLoading,
}: {
  refetchAllDogs: GetAllDogsRequest;
  isLoading: boolean;
  setIsLoading: SetIsLoadingProp;
}) => {
  const [createFormSubmitted, setCreateFormSubmitted] = useState(false);
  const [newDog, setNewDog] = useState<DogNoId>({
    name: "",
    description: "",
    image: defaultSelectedImage,
    isFavorite: false,
  });
  const selectRef = useRef<HTMLSelectElement>(null);
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
            nameValidations.isValidFunc(name) &&
            selectRef.current
          ) {
            setIsLoading(true);
            Requests.postDog(newDog)
              .then(() => refetchAllDogs())
              .then(() => {
                toast.success(`${name} created successfully!`);
              })
              .catch((error) => console.log(error))
              .finally(() => setIsLoading(false));
            setNewDog({
              name: "",
              description: "",
              image: defaultSelectedImage,
              isFavorite: false,
            });
            selectRef.current.value = defaultSelectedImage;
            setCreateFormSubmitted(false);
          } else {
            setCreateFormSubmitted(true);
          }
        }}
      >
        {/* CONTINUE CLASS COPY HERE */}

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
        {nameValidations.isValidFunc(name) || !createFormSubmitted ? null : (
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
        />
        <div className="error-box-container">
          {!createFormSubmitted
            ? null
            : descriptionValidations.map((validationObj, i) =>
                validationObj.isValidFunc(description) ? null : (
                  <ErrorBox message={validationObj.errorMessage} key={i} />
                )
              )}
        </div>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          ref={selectRef}
          name="picture"
          defaultValue={defaultSelectedImage}
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
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    </>
  );
};
