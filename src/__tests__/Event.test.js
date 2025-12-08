import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test('renders event title', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('renders show details button', () => {
    expect(EventComponent.queryByText('show details')).toBeInTheDocument();
  });

  test('by default, events details are hidden', () => {
    const eventDOM = EventComponent.container.firstChild;
    const details = eventDOM.querySelector('.details');
    expect(details).not.toBeInTheDocument();
  });

  test('shows the details section when user clicks on show details button', async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.queryByText('show details');
    await user.click(showDetailsButton);

    const eventDOM = EventComponent.container.firstChild;
    const details = eventDOM.querySelector('.details');
    expect(details).toBeInTheDocument();
  });

  test('hides the details section when user clicks on hide details button', async () => {
    const user = userEvent.setup();
    
    // First click to show details
    const showDetailsButton = EventComponent.queryByText('show details');
    await user.click(showDetailsButton);
    
    // Verify details are shown
    let eventDOM = EventComponent.container.firstChild;
    let details = eventDOM.querySelector('.details');
    expect(details).toBeInTheDocument();
    
    // Click to hide details
    const hideDetailsButton = EventComponent.queryByText('hide details');
    await user.click(hideDetailsButton);
    
    // Verify details are hidden
    eventDOM = EventComponent.container.firstChild;
    details = eventDOM.querySelector('.details');
    expect(details).not.toBeInTheDocument();
  });
});