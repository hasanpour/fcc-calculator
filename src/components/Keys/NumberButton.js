import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function NumberButton(props) {
  const {
    butt,
    displayText,
    setDisplayText,
    setHistory,
  } = props;

  const buttonRef = useRef(null);

  const handleNumberClicked = () => {
    const zeroRegex = /^0([^.\\+\\×\\÷-]|$)/;
    const floatNumberRegex = /([0-9]*[.])[0-9]*$/;
    const signRegex = /[\\+\\×\\÷-]/;
    const endSignRegex = /[\\+\\×\\÷-]$/;

    // Don't do anything when there is no sign
    if (
      (!signRegex.test(displayText) || endSignRegex.test(displayText))
      && butt.key === '='
    ) {
      return;
    }

    // Do the calculations
    if (butt.key === '=') {
      setHistory(`${displayText}=`);

      // Correct multiply and divide sign
      const expression = displayText.replace('×', '*').replace('÷', '/');

      // eslint-disable-next-line no-new-func
      const result = Function(`return ${expression}`)();

      setDisplayText(result);

      // Clear screen after showing result
    } else if (typeof (displayText) === 'number') {
      setDisplayText(butt.key);

      // Allow only one 0 on the beginning
    } else if (zeroRegex.test(displayText)) {
      setDisplayText(displayText.slice(0, -1) + butt.key);

      // Show decimal point once.
    } else if (
      (floatNumberRegex.test(displayText) && butt.key !== '.')
      || !floatNumberRegex.test(displayText)
    ) {
      setDisplayText(displayText + butt.key);
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
      onClick={() => handleNumberClicked()}
    >
      {butt.key}
    </button>
  );
}

NumberButton.propTypes = {
  butt: PropTypes.instanceOf(Object).isRequired,
  displayText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setDisplayText: PropTypes.func.isRequired,
  setHistory: PropTypes.func.isRequired,
};
