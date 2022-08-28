import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, buttonName, children, onSubmit}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}>Закрыть</button>
        <h2 className="popup__title">{title}</h2>
        <form name={name} action="#" method="POST" onSubmit={onSubmit} className="form form_type_profile"  noValidate>
          {children}
          <button type="submit" className="form__keep">{buttonName}</button>
        </form>
      </div>
    </div>
  );
}


export default PopupWithForm;

