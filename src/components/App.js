import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import "../index.css";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);

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

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
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
    const isLiked = card.likes.some((i) => i._id === user._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
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
        ></EditProfilePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddNewCard={handleAddNewCard}
        ></AddPlacePopup>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm
          name="delete-confirmation"
          isOpen={isConfirmDeleteOpen}
          formTitle="Are you sure?"
          buttonText="yes"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <Header />
        <Main
          cards={cards}
          user={user}
          editProfileOpen={() => handleEditProfileClick()}
          addCardOpen={() => handleAddCardClick()}
          editAvatarOpen={() => handleEditAvatarClick()}
          onCardClick={handleCardImageClick}
          onCardDeleteClick={handleCardDelete}
          onCardLikeClick={handleCardLikeClick}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
