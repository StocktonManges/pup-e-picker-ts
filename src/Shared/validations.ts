type InputValidationObj = {
  isValidFunc: (input: string) => boolean;
  errorMessage: string;
};

type ValidationsObj = {
  nameValidations: InputValidationObj;
  descriptionValidations: InputValidationObj[];
};

export const Validations: ValidationsObj = {
  nameValidations: {
    isValidFunc: (dogName) =>
      dogName.replace(/\s/g, "").length > 1 && dogName.length < 13,
    errorMessage: "The name must be 2 to 12 characters.",
  },

  descriptionValidations: [
    {
      isValidFunc: (dogDescription) => {
        const matches = dogDescription.match(/\s\w/g)?.length;
        return matches ? matches >= 2 : false;
      },
      errorMessage: "The description must have 3 or more words.",
    },

    {
      isValidFunc: (dogDescription) => {
        const allWordLengthsComply = dogDescription
          .replace(/[!@#$%^&*()-=+,.?'"]/, "")
          .split(/\s/)
          .map((word) => word.length < 13);
        return !allWordLengthsComply.includes(false);
      },
      errorMessage: "Each word must be 12 characters or less.",
    },

    {
      isValidFunc: (dogDescription) => dogDescription.length < 75,
      errorMessage: "The description must be 75 characters or less.",
    },
  ],
};
