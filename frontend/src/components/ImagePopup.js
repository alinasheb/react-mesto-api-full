import React from 'react';

function ImagePopup({card, onClose}) {
  return(
    <div className={`popup popup_type_open-photo ${card && "popup_opened"}`}>
    <div className="popup__container">
      <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}>Закрыть</button>
      <img className="popup__big-photo" src={card ? card.link : ""} alt="Фото" />
      <h2 className="popup__photo-caption">{card ? card.name : ""}</h2>
    </div>
  </div>
  );
}

export default ImagePopup;
