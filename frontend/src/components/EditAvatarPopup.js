import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
const avatarRef = useRef('');

function handleSubmit(e) {
  e.preventDefault();

  onUpdateAvatar({
    avatar: avatarRef.current.value
  });
}
  useEffect(() => {
    avatarRef.current.value = ''; }, [isOpen])


  return (
    <PopupWithForm isOpen={isOpen} title="Обновить аватар" name="avatar" buttonName="Сохранить" onClose={onClose} onSubmit={handleSubmit}>
      <input type="url" className="form__item form__item_type_avatar" id="avatar-item" ref={avatarRef} name="avatar" defaultValue placeholder="Аватар" required />
      <span className="form__item-error avatar-item-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;

