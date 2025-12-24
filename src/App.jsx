import React from 'react';
import { useEffect, useState } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from "./components/EventGenresChart";
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css'


const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are offline. The displayed events are loaded from cache and may not be up to date.");
    }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">

      <header className="app-header">
        <h1>Meet</h1>
        <p>Find events in your city</p>
      </header>

      <main className="app-main">
        <section className="controls">
          <div className="alerts-container">
            {infoAlert && <InfoAlert text={infoAlert} />}
            {errorAlert && <ErrorAlert text={errorAlert} />}
            {warningAlert && <WarningAlert text={warningAlert} />}
          </div>
          <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
          <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
        </section>
        <section className="data-vis-section">
          <div className='charts-container'>
            <EventGenresChart events={events} />
            <CityEventsChart allLocations={allLocations} events={events} />
          </div>
        </section>
        <section className="events-section">
          <EventList events={events} />
        </section>
      </main>
    </div>
  )
}

export default App;
