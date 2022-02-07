import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  addCardOpen,
  editProfileOpen,
  editAvatarOpen,
  onCardDeleteClick,
  onCardClick,
  onCardLikeClick,
}) {
  const user = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-container">
            <button
              className="profile__image-button"
              onClick={editAvatarOpen}
            />
            <img className="profile__image" src={user.avatar} alt={user.name} />
          </div>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{user.name}</h1>
              <button
                className="profile__button button"
                type="button"
                name="edit profile button"
                onClick={editProfileOpen}
              />
            </div>
            <p className="profile__about-me">{user.about}</p>
          </div>
        </div>
        <button
          type="button"
          name="card edit button"
          className="profile__card-button button"
          onClick={addCardOpen}
        />
      </section>
      <section className="destinations">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDeleteClick={onCardDeleteClick}
            onCardLikeClick={onCardLikeClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
