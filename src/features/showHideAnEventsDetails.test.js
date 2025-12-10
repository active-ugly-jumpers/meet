import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppComponent;
        
        given('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        when('the user views the list of events', async () => {
            await waitFor(() => {
                const showDetailsButtons = screen.getAllByText(/show details/i);
                expect(showDetailsButtons[0]).toBeInTheDocument();
            });
        });

        then('all event elements should be collapsed by default', () => {
            const eventDetails = AppComponent.container.querySelector('.details');
            expect(eventDetails).not.toBeInTheDocument();
        });
    });

    test('User can expand an event to see details', ({ given, when, then }) => {
        let AppComponent;
        let showDetailsButton;

        given('the user sees a list of events', async () => {
            AppComponent = render(<App />);
            await waitFor(() => {
                const showDetailsButtons = screen.getAllByText(/show details/i);
                showDetailsButton = showDetailsButtons[0];
                expect(showDetailsButton).toBeInTheDocument();
            });
        });

        when('the user clicks on an event', async () => {
            const user = userEvent.setup();
            await user.click(showDetailsButton);
        });

        then('the event details should be expanded to show more information', async () => {
            await waitFor(() => {
                const eventDetails = AppComponent.container.querySelector('.details');
                expect(eventDetails).toBeInTheDocument();
            });
        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {
        let AppComponent;
        let hideDetailsButton;

        given('an event element is expanded', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            
            await waitFor(() => {
                const showDetailsButtons = screen.getAllByText(/show details/i);
                expect(showDetailsButtons[0]).toBeInTheDocument();
            });
            
            const showDetailsButtons = screen.getAllByText(/show details/i);
            await user.click(showDetailsButtons[0]);
            
            await waitFor(() => {
                hideDetailsButton = screen.getByText(/hide details/i);
                expect(hideDetailsButton).toBeInTheDocument();
            });
        });

        when('the user clicks on the event again', async () => {
            const user = userEvent.setup();
            await user.click(hideDetailsButton);
        });

        then('the event details should be collapsed', async () => {
            await waitFor(() => {
                const eventDetails = AppComponent.container.querySelector('.details');
                expect(eventDetails).not.toBeInTheDocument();
            });
        });
    });
});