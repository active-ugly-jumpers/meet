# Meet App - Progressive Web Application

A serverless, progressive web application (PWA) built with React using test-driven development (TDD) techniques. The application uses the Google Calendar API to fetch and display upcoming events with offline capabilities and data visualization.

## Project Overview - The 5 Ws

**Who:** Users include developers, professionals, friends, and potential employers who want to discover and view upcoming events in specific cities.

**What:** A progressive web app with offline functionality and a serverless backend, developed using TDD techniques to ensure code quality and test coverage.

**When:** Users can access the app anytime to view upcoming events for specific cities. The code is immediately available on GitHub for recruiters and employers.

**Where:** The serverless functions are hosted by cloud providers (e.g., AWS), and the responsive application is hosted online, making it shareable and installable on any device.

**Why:** Demonstrates modern web development skills including serverless architecture, PWA capabilities, TDD methodology, and data visualization - distinguishing skills in today's competitive development landscape.

## Features & User Stories

### Feature 1: Filter Events by City

**User Story:**
As a user,
I should be able to filter events by city
So that I can see a list of events taking place in a specific location.

**Scenarios:**
```gherkin
Scenario: User opens the app and sees upcoming events from all cities
Given the user hasn't searched for a city
When the user opens the app
Then the user should see a list of upcoming events from all cities

Scenario: User should see a list of suggestions when they search for a city
Given the main page is open
When the user starts typing in the city textbox
Then the user should receive a list of cities (suggestions) that match what they've typed

Scenario: User can select a city from the suggested list
Given the user was typing "Berlin" in the city textbox and the list of suggested cities is showing
When the user selects a city (e.g., "Berlin, Germany") from the list
Then their city should be changed to that city (i.e., "Berlin, Germany") and the user should receive a list of upcoming events in that city
```

### Feature 2: Show/Hide Event Details

**User Story:**
As a user,
I should be able to show or hide event details
So that I can see more information about an event when interested and keep the view clean when not.

**Scenarios:**
```gherkin
Scenario: An event element is collapsed by default
Given the user opens the app
When the user views the list of events
Then all event elements should be collapsed by default

Scenario: User can expand an event to see details
Given the user sees a list of events
When the user clicks on an event
Then the event details should be expanded to show more information

Scenario: User can collapse an event to hide details
Given an event element is expanded
When the user clicks on the event again
Then the event details should be collapsed
```

### Feature 3: Specify Number of Events

**User Story:**
As a user,
I should be able to specify the number of events displayed
So that I can control how many events I see at once based on my preference.

**Scenarios:**
```gherkin
Scenario: When user hasn't specified a number, 32 events are shown by default
Given the user hasn't specified the number of events to display
When the user views the events list
Then 32 events should be displayed by default

Scenario: User can change the number of events displayed
Given the user is on the main page
When the user changes the number in the "number of events" input field
Then the number of events displayed should match the number entered by the user
```

### Feature 4: Use the App When Offline

**User Story:**
As a user,
I should be able to use the app when offline
So that I can access event information even without an internet connection.

**Scenarios:**
```gherkin
Scenario: Show cached data when there's no internet connection
Given the user has no internet connection
When the user opens the app
Then the app should display cached events data

Scenario: Show error when user changes search settings without internet
Given the user has no internet connection
When the user tries to change city or number of events
Then the app should show an error message indicating the action requires internet connection
```

### Feature 5: Add an App Shortcut to the Home Screen

**User Story:**
As a user,
I should be able to add the app shortcut to my home screen
So that I can quickly access the app like a native mobile application.

**Scenarios:**
```gherkin
Scenario: User can install the meet app as a shortcut on their device home screen
Given the user is using the meet app in a mobile browser
When the user selects the option to "Add to Home Screen"
Then a shortcut to the meet app should be added to the user's home screen

Scenario: User can access the app from the home screen shortcut
Given the user has installed the app shortcut on their home screen
When the user taps on the meet app shortcut
Then the app should open in a standalone mode
```

### Feature 6: Display Charts Visualizing Event Details

**User Story:**
As a user,
I should be able to see charts that visualize event details
So that I can quickly understand event data and trends through visual representations.

**Scenarios:**
```gherkin
Scenario: Show a chart with the number of upcoming events in each city
Given the user is on the main page
When the user views the events dashboard
Then a chart should display showing the number of upcoming events for each city

Scenario: User can interact with the chart to filter events
Given the chart is displaying event data by city
When the user clicks on a city in the chart
Then the events list should filter to show only events from that selected city
```

## Technical Stack

- **Frontend:** React, Progressive Web App (PWA)
- **Backend:** Serverless functions (AWS Lambda)
- **API:** Google Calendar API
- **Development:** Test-Driven Development (TDD)
- **Build Tool:** Vite
- **Testing:** Jest, React Testing Library
- **Charts:** Recharts library for data visualization

## Getting Started

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Development Approach

This project follows Test-Driven Development (TDD) principles:
1. Write tests first
2. Write minimal code to pass tests
3. Refactor code while keeping tests passing
4. Repeat for each feature

## PWA Features

- Offline functionality with service workers
- Responsive design for all devices
- App-like experience when installed
- Fast loading with caching strategies
