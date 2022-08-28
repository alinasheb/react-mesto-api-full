import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleCardTitle(e) {
    setCardTitle(e.target.value)
  }

  function handleCardLink(e) {
    setCardLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardTitle,
      link: cardLink
    })
  }

  useEffect(() => {
    setCardTitle('')
    setCardLink('')
  }, [isOpen])

  return(
    <PopupWithForm isOpen={isOpen} onSubmit={handleSubmit} title="Новое место" name="add-image" buttonName="Создать" onClose={onClose}>
      <input type="text" className="form__item form__item_type_title"  onChange={handleCardTitle} value={cardTitle ? cardTitle : ''} id="title-item" name="name" minLength={2} maxLength={30}  placeholder="Название" required />
      <span className="form__item-error title-item-error" />

      <input type="url" className="form__item form__item_type_image" onChange={handleCardLink}  value={cardLink ? cardLink : ''} id="image-item" name="link"  placeholder="Ссылка на картинку" required />
      <span className="form__item-error image-item-error" />
    </PopupWithForm>
  )

}

export default AddPlacePopup;
