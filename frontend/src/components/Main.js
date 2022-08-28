import React, { useContext } from 'react';
import Card from './Card.js';
import CurrentUserContext from  '../contexts/CurrentUserContext.js';
import Header from "./Header";


function Main({isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, cards, onCardClick, onCardLike, onCardDelete, logout, userLoginData, loginIn}) {

  const currentUser = useContext(CurrentUserContext);

    return (
      <>
      <Header loginIn={loginIn} login={userLoginData} onClick={logout}  text={'Выйти'} link="sing-in" />

      <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={isEditAvatarPopupOpen}>
          <img className="profile__image" src={`${currentUser.avatar}`} alt="Аватар пользователя" />
          <button className="profile__photo-add" type="button">Обновить фото</button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button className="profile__edit" type="button" onClick={isEditProfilePopupOpen}>Редактировать</button>
        </div>
        <button className="profile__add" type="button" onClick={isAddPlacePopupOpen}>Добавить</button>
      </section>
      <section className="photo-elements">
        <ul className="photo">
          {
          cards.map(card => (
            <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}/>
          ))
          }
        </ul>
      </section>
    </main>
      </>
    
    );
  }

export default Main;
