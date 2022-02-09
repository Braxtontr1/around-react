import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDeleteClick, onCardLikeClick }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLikeClick(card);
  }

  function handleCardDelete() {
    onCardDeleteClick(card);
  }

  const user = useContext(CurrentUserContext);

  const isLiked = card.likes.some((item) => item._id === user._id);
  const cardLikeButtonClassName = `button destination__like-button ${
    isLiked && "destination__like-button_active"
  }`;

  const isOwn = card.owner._id === user._id;
  const cardDeleteButtonClassName = `button destination__delete-button ${
    isOwn
      ? "destination__delete-button_visible"
      : "destination__delete-button_hidden"
  }`;

  return (
    <article className="destination">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
      />
      <img
        className="destination__image"
        src={card.link}
        alt={card.name}
        onClick={() => handleClick()}
      />
      <div className="destination__info">
        <h2 className="destination__title">{card.name}</h2>
        <div className="destination__like-button-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            name="like button"
            onClick={() => handleLikeClick()}
          />
          <span className="destination__like-button-count">
            {card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}

export default Card;
