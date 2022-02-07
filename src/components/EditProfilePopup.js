import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const user = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setDescription(user.about);
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      isOpen={isOpen}
      formTitle="Edit profile"
      buttonText="Save"
      onClose={onClose}
      onSubmission={handleSubmit}
    >
      <input
        className="form__input form__input_type_name"
        id="name"
        type="text"
        name="name"
        placeholder="jacques cousteau"
        required
        minLength={"2"}
        maxLength={"30"}
        onChange={handleNameChange}
      />
      <span className="form__error" id="name-error" type="text" />
      <input
        className="form__input form__input_type_description"
        type="text"
        id="job"
        name="job"
        placeholder="explorer"
        required
        minLength={"2"}
        maxLength={"30"}
        onChange={handleDescriptionChange}
      />
      <span className="form__error" id="job-error" type="text" />
    </PopupWithForm>
  );
}
