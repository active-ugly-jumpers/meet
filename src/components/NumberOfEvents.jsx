import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    
    if (!isNaN(value) && value > 0) {
      setCurrentNOE(value);
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
    </div>
  );
};

export default NumberOfEvents;