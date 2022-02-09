import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-profile-picture"
      isOpen={isOpen}
      onClose={onClose}
      formTitle="Change profile picture"
      buttonText="save"
      onSubmission={handleSubmit}
    >
      <input
        className="form__input form__input_type_image-link"
        type="url"
        id="avatar"
        name="avatar"
        placeholder="Image Link"
        ref={inputRef}
        required
      />
      <span className="form__error" id="avatar-error" />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
