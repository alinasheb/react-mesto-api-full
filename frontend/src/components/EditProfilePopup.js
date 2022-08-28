import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);

const [name, setName] = useState('');
const [description, setDescription] = useState('');

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
}, [currentUser]);


function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();

  // Передаём значения управляемых компонентов во внешний обработчик
  onUpdateUser({
    name: name,
    about: description,
  });
}

function handleUserName(e) {
  setName(e.target.value)
}

function handleUserDescription(e) {
  setDescription(e.target.value)
}

  return(
    <PopupWithForm isOpen={isOpen} title="Редактировать профиль" name="edit-profile" buttonName="Сохранить" onClose={onClose} onSubmit={handleSubmit}>
    <input type="text" className="form__item form__item_type_name" onChange={handleUserName} value={name ? name : ''} id="name-item" name="name" minLength={2} maxLength={40} placeholder="Имя" required />
    <span className="form__item-error name-item-error" />

    <input type="text" className="form__item form__item_type_job" onChange={handleUserDescription} value={description ? description : ''} id="job-item" name="about" minLength={2} maxLength={200} placeholder="Работа" required />
    <span className="form__item-error job-item-error" />
  </PopupWithForm>
  )
}

export default EditProfilePopup;
