import React, { useContext } from "react";
import CurrentUserContext from  '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

   //Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (`photo__delete ${isOwn ? 'photo__delete_show' : ''}`);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`photo__like ${isLiked ?  'photo__like_active' : ''}`);

  function handleCardClick() {
    onCardClick(card)
  }

  function handleCardLike() {
    onCardLike(card)
  }

  function handleDeleteCard() {
    onCardDelete(card)
  }

  return(
    <div className="photo-template">
    <li className="photo__card">
      <button type="submit" className={cardDeleteButtonClassName} onClick={handleDeleteCard}>Удалить</button>
      <img className="photo__image" src={card.link} alt="Фото" onClick={handleCardClick} />
      <div className="photo__description">
        <h2 className="photo__title">{card.name}</h2>
        <div className="photo__likes">
        <button className={cardLikeButtonClassName} onClick={handleCardLike} type="button">Нравится</button>
        <div className="photo__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  </div>
  )
}

export default Card;
