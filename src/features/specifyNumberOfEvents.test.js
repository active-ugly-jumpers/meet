import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn\'t specified a number, 32 events are shown by default', ({ given, when, then }) => {
        let AppComponent;
        
        given('the user hasn\'t specified the number of events to display', () => {
            AppComponent = render(<App />);
        });

        when('the user views the events list', async () => {
            await waitFor(() => {
                const EventListDOM = AppComponent.container.querySelector('#event-list');
                const allRenderedEventItems = EventListDOM.querySelectorAll('li');
                expect(allRenderedEventItems.length).toBeGreaterThan(0);
            });
        });

        then(/^(\d+) events should be displayed by default$/, async (arg0) => {
            const expectedNumber = parseInt(arg0);
            await waitFor(() => {
                const EventListDOM = AppComponent.container.querySelector('#event-list');
                const allRenderedEventItems = EventListDOM.querySelectorAll('li');
                expect(allRenderedEventItems).toHaveLength(expectedNumber);
            });
        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
        let AppComponent;
        let numberTextBox;

        given('the user is on the main page', async () => {
            AppComponent = render(<App />);
            
            // Wait for initial events to load
            const EventListDOM = AppComponent.container.querySelector('#event-list');
            await waitFor(() => {
                const allRenderedEventItems = EventListDOM.querySelectorAll('li');
                expect(allRenderedEventItems.length).toBeGreaterThan(0);
            });
            
            // Get the number input textbox
            const NumberOfEventsDOM = AppComponent.container.querySelector('#number-of-events');
            numberTextBox = NumberOfEventsDOM.querySelector('input[type="text"]');
            expect(numberTextBox).toBeInTheDocument();
        });

        when(/^the user changes the number in the "(.*)" input field$/, async (arg0) => {
            const user = userEvent.setup();
            await user.type(numberTextBox, '{backspace}{backspace}10');
        });

        then('the number of events displayed should match the number entered by the user', async () => {
            await waitFor(() => {
                const EventListDOM = AppComponent.container.querySelector('#event-list');
                const allRenderedEventItems = EventListDOM.querySelectorAll('li');
                expect(allRenderedEventItems).toHaveLength(10);
            });
        });
    });
});