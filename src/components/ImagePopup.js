import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`modal modal_type_image ${card && "modal_open"}`}>
      <div className="modal__box modal__box_type_image">
        <button
          className="modal__close-button button js-image-close"
          type="button"
          name="close button"
          onClick={onClose}
        />
        <img
          className="modal__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <div>
          <p className="modal__image-title">{card ? card.name : ""}</p>
        </div>
      </div>
    </div>
  );
}
