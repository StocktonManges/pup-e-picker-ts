import { Component, createRef } from "react";
import { dogPictures } from "../dog-pictures";
import { DogNoId, GetAllDogsRequest, SetIsLoadingProp } from "../types";
import { Validations } from "../Shared/validations";
import { Requests } from "../api";
import toast from "react-hot-toast";
import ErrorBox from "../Shared/ErrorBox";

type State = {
  createFormSubmitted: boolean;
  newDog: DogNoId;
};

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<{
  refetchAllDogs: GetAllDogsRequest;
  isLoading: boolean;
  setIsLoading: SetIsLoadingProp;
}> {
  state: State = {
    createFormSubmitted: false,
    newDog: {
      name: "",
      description: "",
      image: defaultSelectedImage,
      isFavorite: false,
    },
  };
  render() {
    const selectRef = createRef<HTMLSelectElement>();
    const { refetchAllDogs, isLoading, setIsLoading } = this.props;
    const { name, description, image, isFavorite } = this.state.newDog;
    const { nameValidations, descriptionValidations } = Validations;
    const descriptionIsValidArr: boolean[] = descriptionValidations.map(
      (validationObj) => validationObj.isValidFunc(description)
    );
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            !descriptionIsValidArr.includes(false) &&
            nameValidations.isValidFunc(name) &&
            selectRef.current
          ) {
            setIsLoading(true);
            Requests.postDog(this.state.newDog)
              .then(() => refetchAllDogs())
              .then(() => {
                toast.success(`${name} created successfully!`);
              })
              .catch((error) => console.log(error))
              .finally(() => setIsLoading(false));
            this.setState({
              newDog: {
                name: "",
                description: "",
                image: defaultSelectedImage,
                isFavorite: false,
              },
            });
            selectRef.current.value = defaultSelectedImage;
            this.setState({ isSubmitted: false });
          } else {
            this.setState({ isSubmitted: true });
          }
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            nameValidations.isValidFunc(name);
            return this.setState({
              newDog: {
                name: e.target.value,
                description,
                image,
                isFavorite,
              },
            });
          }}
          disabled={isLoading}
        />
        {nameValidations.isValidFunc(name) ||
        !this.state.createFormSubmitted ? null : (
          <ErrorBox message={nameValidations.errorMessage} />
        )}
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="description"
          cols={80}
          rows={10}
          onChange={(e) =>
            this.setState({
              newDog: {
                name,
                description: e.target.value,
                image,
                isFavorite: false,
              },
            })
          }
          disabled={isLoading}
          value={description}
        />
        <div className="error-box-container">
          {!this.state.createFormSubmitted
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
          onChange={(e) =>
            this.setState({
              newDog: {
                name,
                description,
                image: e.target.value,
                isFavorite: false,
              },
            })
          }
          disabled={isLoading}
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
    );
  }
}
