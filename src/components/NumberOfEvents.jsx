import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    // Check if value is a number and > 0
    if (isNaN(value) || value <= 0) {
      setErrorAlert('Please enter a valid number of events (positive integer).');
    } else {
      setErrorAlert('');
      setCurrentNOE(Number(value));
    }
    setNumberOfEvents(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        role="textbox"
        placeholder="Number of Events"
        value={numberOfEvents}
        onChange={handleInputChanged}
      />
        <small style={{ display: 'block', marginTop: '4px', color: '#666' }}>
          Enter a positive number to set how many events are shown.
        </small>
    </div>
  );
};

export default NumberOfEvents;