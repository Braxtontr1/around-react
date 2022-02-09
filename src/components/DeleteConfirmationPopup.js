import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteConfirmationPopup({ isOpen, onClose, onCardDelete, card }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="delete-confirmation"
      isOpen={isOpen}
      formTitle="Are you sure?"
      buttonText="yes"
      onClose={onClose}
      onSubmission={handleSubmit}
    />
  );
}

export default DeleteConfirmationPopup;
