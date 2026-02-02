sequenceDiagram
    participant browser
    participand server

    Note right of browser: User is on the /notes page
    Note right of browser: User writes a new note in the input field
    Note right of browser: User clicks save button

    browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note
    activate server

    Note right of server: reads note content
    Note right of server: creates a new note object
    Note right of serves: pushes new note object to notes array

    server->>browser: HTTP 302 redirect to /notes
    deactivate server

    Note right of browser: follows redirect

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: the updated notes list
    deactivate server

    Note right of browser: The browser shows updated notes list