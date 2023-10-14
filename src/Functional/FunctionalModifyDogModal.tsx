import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { Dog, GetAllDogsRequest } from "../types";
import { useState } from "react";
import ErrorBox from "../Shared/ErrorBox";
import { Validations } from "../Shared/validations";

export const FunctionalModifyDogModal = ({
  refetchAllDogs,
  isLoading,
  setIsLoading,
  dogToModify,
  setDogToModify,
}: {
  refetchAllDogs: GetAllDogsRequest;
  isLoading: boolean;
  setIsLoading: (loadingState: boolean) => void;
  dogToModify: Dog | null;
  setDogToModify: (dog: Dog | null) => void;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  let cancelled = false;
  if (dogToModify) {
    const { name, description, image, isFavorite, id } = dogToModify;
    const { nameValidations, descriptionValidations } = Validations;
    const descriptionIsValidArr: boolean[] = descriptionValidations.map(
      (validationObj) => validationObj.isValidFunc(description)
    );

    return (
      <section className="modify-dog-modal">
        <div className="modify-dog-form-container">
          <form
            id="modify-dog-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (cancelled) {
                setDogToModify(null);
                setIsSubmitted(false);
              } else if (
                !descriptionIsValidArr.includes(false) &&
                nameValidations.isValidFunc(name)
              ) {
                setIsLoading(true);
                Requests.updateDog({ name, description, image, id })
                  .then(() => refetchAllDogs())
                  .catch((error) => console.log(error))
                  .finally(() => setIsLoading(false));
                setIsSubmitted(false);
                setDogToModify(null);
              } else {
                setIsSubmitted(true);
              }
            }}
          >
            <h4>Modify Dog</h4>
            <label htmlFor="name">Dog Name</label>
            <input
              type="text"
              disabled={isLoading}
              value={name}
              onChange={(e) =>
                setDogToModify({
                  name: e.target.value,
                  description,
                  image,
                  isFavorite,
                  id,
                })
              }
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
                setDogToModify({
                  name,
                  description: e.target.value,
                  image,
                  isFavorite,
                  id,
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
              defaultValue={image}
              onChange={(e) =>
                setDogToModify({
                  name,
                  description,
                  image: e.target.value,
                  isFavorite,
                  id,
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
            <span className="modify-dog-submit-container">
              <input type="submit" disabled={isLoading} value="Save Changes" />
              <input
                type="submit"
                disabled={isLoading}
                value="Cancel"
                onClick={() => {
                  cancelled = true;
                }}
              />
            </span>
          </form>
        </div>
      </section>
    );
  }
};
