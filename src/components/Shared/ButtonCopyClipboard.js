import { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import copyToClipboard from 'clipboard-copy';
import shareIcon from '../../images/divers/shareIcon.svg';

function ButtonCopyClipboard({ text = '', textToCopy, testId }) {
  const [linkWasCopyToClipboard, setLinkWasCopyToClipboard] = useState(false);
  const handleClickShareButton = useCallback(() => {
    setLinkWasCopyToClipboard(true);
    copyToClipboard(textToCopy);
  }, [textToCopy]);
  return (
    <>
      <button
        style={ { border: 'none', background: 'none' } }
        src={ shareIcon }
        data-testid={ testId }
        onClick={ handleClickShareButton }
      >
        <img src={ shareIcon } alt="share icon" />
        { text && <p>{text}</p> }
      </button>
      { linkWasCopyToClipboard && (
        <p>Link copied!</p>
      )}
    </>
  );
}

ButtonCopyClipboard.propTypes = {
  text: propTypes.string,
  textToCopy: propTypes.string.isRequired,
  testId: propTypes.string.isRequired,
};

export { ButtonCopyClipboard };
