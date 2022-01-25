import React from "react";
import { api } from "../utils/api";
import Card from "./Card";

function Main({
  addCardOpen,
  editProfileOpen,
  editAvatarOpen,
  onCardDeleteClick,
  onCardClick,
}) {
  const [user, setUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setUser(userInfo);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-container">
            <button
              className="profile__image-button"
              onClick={editAvatarOpen}
            />
            <img className="profile__image" src={user.avatar} alt=" " />
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
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
