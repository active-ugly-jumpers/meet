Feature: Specify Number of Events
    Scenario: When user hasn't specified a number, 32 events are shown by default
        Given the user hasn't specified the number of events to display
        When the user views the events list
        Then 32 events should be displayed by default

    Scenario: User can change the number of events displayed
        Given the user is on the main page
        When the user changes the number in the "number of events" input field
        Then the number of events displayed should match the number entered by the user