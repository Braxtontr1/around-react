import React from "react";

export default function Card({ card, onCardClick, onCardDeleteClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="destination">
      <button
        className="destination__delete-button button"
        onClick={onCardDeleteClick}
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
            className=" destination__like-button button"
            type="button"
            name="like button"
          />
          <span className="destination__like-button-count">
            {card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}
