import React from "react";

function PopupWithForm({
    name,
    isOpen,
    onClose,
    children,
    formTitle,
    buttonText
}) {


    return(
        <>
        <div className={`modal modal_type_${name} ${isOpen ? 'modal_open' : ''}`}>
        <div className="modal__box">
            <button className="modal__close-button button" type="button" name="close button" onClick={onClose}></button>
            <form className="form" name={name}>
                <h2 className="form__heading">{formTitle}</h2>
                {children}
                <button className="form__button button" type="submit" name="delete button" value={buttonText}>{buttonText}</button>
            </form>

        </div>
    </div>
    </>
    )
}

export default PopupWithForm;