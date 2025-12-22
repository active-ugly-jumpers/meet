import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents 
        setCurrentNOE={() => {}} 
        setErrorAlert={() => { }}
      />
    );
  });

  test('renders an element with "textbox" role', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
  });

  test('default value of the input field is 32', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toHaveValue('32');
  });

  test('value changes when user types in the textbox', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    
    await user.type(numberTextBox, '{backspace}{backspace}10');
    
    expect(numberTextBox).toHaveValue('10');
  });
});

describe('<NumberOfEvents /> integration', () => {
  test('number of events rendered matches the number inputted by user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    
    // Wait for initial events to load
    const EventListDOM = AppComponent.container.querySelector('#event-list');
    await waitFor(() => {
      const allRenderedEventItems = EventListDOM.querySelectorAll('li');
      expect(allRenderedEventItems.length).toBeGreaterThan(0);
    });
    
    // Change the number of events
    const NumberOfEventsDOM = AppComponent.container.querySelector('#number-of-events');
    const numberTextBox = NumberOfEventsDOM.querySelector('input[type="text"]');
    await user.type(numberTextBox, '{backspace}{backspace}10');
    
    // Wait for events to update and check count
    await waitFor(() => {
      const allRenderedEventItems = EventListDOM.querySelectorAll('li');
      expect(allRenderedEventItems).toHaveLength(10);
    });
  });
});