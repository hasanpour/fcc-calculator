import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function SignButton(props) {
  const {
    butt,
    displayText,
    setDisplayText,
    setHistory,
  } = props;

  const buttonRef = useRef(null);

  const handleSignClicked = () => {
    const signRegex = /[\\+\\×\\÷]$/;
    const minusRegex = /[\\+\\×\\÷]-$/;

    // Allow one sign at a time
    if (displayText[displayText.length - 1] === butt.display) {
      return;
    }
    if (signRegex.test(displayText) && butt.key !== '-') {
      setDisplayText(displayText.slice(0, -1) + butt.display);
    } else if (minusRegex.test(displayText)) {
      setDisplayText(displayText.slice(0, -2) + butt.display);
    } else {
      setDisplayText(displayText + butt.display);
    }

    // Clear everything
    if (butt.key === 'Backspace') {
      setDisplayText('0');
      setHistory('');
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === butt.key) {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <button
      id={butt.id}
      type="button"
      ref={buttonRef}
      onClick={() => handleSignClicked()}
    >
      {butt.display}
    </button>
  );
}

SignButton.propTypes = {
  butt: PropTypes.instanceOf(Object).isRequired,
  displayText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setDisplayText: PropTypes.func.isRequired,
  setHistory: PropTypes.func.isRequired,
};
