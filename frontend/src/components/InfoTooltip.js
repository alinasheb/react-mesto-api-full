import React from "react";
import successfully from '../images/successfully.svg';
import error from '../images/error.svg';


function InfoTooltip({isOpen, onClose, isRegSuccess, regSuccess, regFailed}) {
    return (
        <>
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container popup__reg">
                <button type="submit" className="popup__close" onClick={onClose} />
                <img className="popup__image-reg" src={`${isRegSuccess ? successfully : error}`} alt="Статус регистрации" />
                <p className="popup__text-reg">{`${isRegSuccess ? regSuccess : regFailed}`}</p>
            </div>

        </div>
        </>

    )
}

export default InfoTooltip;