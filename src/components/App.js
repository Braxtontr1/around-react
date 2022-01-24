import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';

function App() {

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState(undefined);
const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false)


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

function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard(undefined);
    setIsEditAvatarPopupOpen(false);
}

  return (
<div className="page">

        <PopupWithForm name="edit-profile" isOpen={isEditProfilePopupOpen} formTitle="Edit profile"
         buttonText="Save" onClose={closeAllPopups}>
               <input className="form__input form__input_type_name" id="name" type="text" name="name"
                    placeholder="jacques cousteau" required minLength={"2"} maxLength={"30"} />
                <span className="form__error" id="name-error" type="text"></span>
                <input className="form__input form__input_type_description" type="text" id="job" name="job"
                    placeholder="explorer" required minLength={"2"} maxLength={"30"} />
                <span className="form__error" id="job-error" type="text"></span>
        </PopupWithForm>

        <PopupWithForm name="add-card" isOpen={isAddCardPopupOpen} formTitle="New place" buttonText="create" 
        onClose={closeAllPopups}>
                <input className="form__input form__input_type_title" type="text" id="title" name="title"
                    placeholder="Title" required minLength={"2"} maxLength={"30"} />
                <span className="form__error" id="title-error"></span>
                <input className="form__input form__input_type_image-link" type="url" id="image" name="image"
                    placeholder="Image Link" required />
                <span className="form__error" id="image-error"></span>
        </PopupWithForm>

        <PopupWithForm name="update-profile-picture" isOpen={isEditAvatarPopupOpen} formTitle="Change profile picture" 
        buttonText="save" onClose={closeAllPopups}>
                <input className="form__input form__input_type_image-link" type="url" id="avatar" name="avatar"
                    placeholder="Image Link" required />
                <span className="form__error" id="avatar-error"></span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm name="delete-confirmation" isOpen={isConfirmDeleteOpen} formTitle="Are you sure?" buttonText="yes"
        onClose={() => setIsConfirmDeleteOpen(false)}>

        </PopupWithForm>

    <div className="modal modal_type_delete-confirmation">
        <div className="modal__box">
            <button className="modal__close-button button" type="button" name="close button"></button>
            <form className="form" name="delete-button">
                <h2 className="form__heading">Are you sure?</h2>
                <button className="form__button button" type="submit" name="delete button" value="Yes">yes</button>
            </form>

        </div>
    </div>

    <Header />
    <Main
         editProfileOpen={() => handleEditProfileClick()} 
        addCardOpen={() => handleAddCardClick()}
        editAvatarOpen={() => handleEditAvatarClick()} 
        onCardClick={handleCardImageClick} 
        onCardDeleteClick={() => setIsConfirmDeleteOpen(true)}/>
    <Footer />

</div>
  );
}

export default App;
