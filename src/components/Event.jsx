import React, { useState } from 'react';


const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <li className='event'>
            <h2>{event.summary}</h2>
            <p>{new Date(event.created).toLocaleString()}</p>
            <p>{event.location}</p>
            
            <button className='details-btn' onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'hide details' : 'show details'}
            </button>
            
            {showDetails && (
                <div className="details">
                    <p>{event.description}</p>
                </div>
            )}
        </li>
    );
};


export default Event;