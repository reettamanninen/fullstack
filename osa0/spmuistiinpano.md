sequenceDiagram
    participant browser
    participand server

    Note right of browser: User writes a new note in the input field
    Note right of browser: User clicks save button

    Note right of browser: browser creates a new note object containing content and date

    browser->>server: POST https://studies.cs.helsinki.fi/new_notes_spa
    activate server
    Note right of browser: Request contains JSON

    server-->>browser: HTTP 201 Creates
    deactivate server

    Note right of browser: stays on same page