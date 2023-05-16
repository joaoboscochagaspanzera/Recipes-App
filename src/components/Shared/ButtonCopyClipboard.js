import { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import copyToClipboard from 'clipboard-copy';

function ButtonCopyClipboard({ text, textToCopy, testId }) {
  const [linkWasCopyToClipboard, setLinkWasCopyToClipboard] = useState(false);
  const handleClickShareButton = useCallback(() => {
    setLinkWasCopyToClipboard(true);
    copyToClipboard(textToCopy);
  }, [textToCopy]);
  return (
    <>
      <button
        style={ { border: 'none', background: 'white' } }
        src="../icons/divers/shareIcon.svg"
        data-testid={ testId }
        onClick={ handleClickShareButton }
      >
        <img src="../icons/divers/shareIcon.svg" alt="share icon" />
        { text }
      </button>
      { linkWasCopyToClipboard && (
        <p>Link copied!</p>
      )}
    </>
  );
}

ButtonCopyClipboard.propTypes = {
  text: propTypes.string.isRequired,
  textToCopy: propTypes.string.isRequired,
  testId: propTypes.string.isRequired,
};

export { ButtonCopyClipboard };
