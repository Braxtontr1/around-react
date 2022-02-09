import React, { useRef, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AddPlacePopup({ isOpen, onAddNewCard, onClose }) {
  const user = useContext(CurrentUserContext);

  const nameInputRef = useRef();
  const linkInputRef = useRef();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleTitleChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddNewCard({
      name: name,
      link: link,
      owner: { _id: user._id },
      likes: [],
      _id: "",
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      isOpen={isOpen}
      formTitle="New place"
      buttonText="create"
      onClose={onClose}
      onSubmission={handleSubmit}
    >
      <input
        className="form__input form__input_type_title"
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        required
        minLength={"2"}
        maxLength={"30"}
        value={name.value}
        onChange={handleTitleChange}
        ref={nameInputRef}
      />
      <span className="form__error" id="title-error" />
      <input
        className="form__input form__input_type_image-link"
        type="url"
        id="image"
        name="image"
        placeholder="Image Link"
        value={link.value}
        onChange={handleLinkChange}
        ref={linkInputRef}
        required
      />
      <span className="form__error" id="image-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
