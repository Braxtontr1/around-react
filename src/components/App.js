import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import "../index.css";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [user, setUser] = useState({});

  const [cards, setCards] = useState([]);

  const [cardConfirmDelete, setCardConfirmDelete] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setUser(userInfo);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setIsConfirmDeleteOpen(true);
    setCardConfirmDelete(card);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardImageClick(card) {
    setSelectedCard(card);
  }
  function handleCardLikeClick(card) {
    const isLiked = card.likes.some((item) => item._id === user._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleUpdateUser(user) {
    api
      .editProfile(user)
      .then((newUserInfo) => {
        setUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .editProfilePicture(userAvatar)
      .then((newUserAvatar) => {
        setUser(newUserAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleAddNewCard(card) {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsConfirmDeleteOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddNewCard={handleAddNewCard}
        />

        <DeleteConfirmationPopup
          isOpen={isConfirmDeleteOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={cardConfirmDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Header />
        <Main
          cards={cards}
          user={user}
          onEditProfileOpen={handleEditProfileClick}
          onAddCardOpen={handleAddCardClick}
          onEditAvatarOpen={handleEditAvatarClick}
          onCardClick={handleCardImageClick}
          onCardDeleteClick={handleCardDeleteClick}
          onCardLikeClick={handleCardLikeClick}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
