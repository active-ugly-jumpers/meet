Feature: Show/Hide an event's details    
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