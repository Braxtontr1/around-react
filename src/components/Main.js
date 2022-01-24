import React from 'react';
import {api} from '../utils/api';
import Card from './Card';


function Main ({
    addCardOpen,
    editProfileOpen,
    editAvatarOpen,
    onCardDeleteClick,
    onCardClick
}) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo() 
        .then((userInfo) => {
            setUserName(userInfo.name);
            setUserDescription(userInfo.about);
            setUserAvatar(userInfo.avatar);
        });

        api.getCards()
        .then((cardData) => {
            setCards(cardData);
        });
    }, []);

    return (
        <main>
        <section className="profile">
            <div className="profile__container">
                <div className="profile__image-container">
                    <button className="profile__image-button" onClick={editAvatarOpen}>
                    </button>
                    <img className="profile__image" src={userAvatar} alt=" " />
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__button button" type="button"
                         name="edit profile button" onClick={editProfileOpen}></button>
                    </div>
                    <p className="profile__about-me">{userDescription}</p>
                </div>
            </div>
            <button type="button" name="card edit button" className="profile__card-button button" onClick={addCardOpen}></button>
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
    )
}

export default Main;