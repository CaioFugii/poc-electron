import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({
  close,
  onSubmit,
  children,
  buttonText,
  buttonCancelText = 'cancelar',
}) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <button className="close" onClick={() => close()}>
          <FontAwesomeIcon icon={faTimes} />
          Fechar
        </button>

        <div className="content">{children}</div>

        <div className="footer">
          <button className="button" onClick={() => close()}>
            {buttonCancelText}
          </button>
          {buttonText && (
            <button className="button" onClick={onSubmit}>
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export { Modal };
