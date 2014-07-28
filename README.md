GEO-1-Information-System
========================

GEO-1-Information-System for indoor navigation

Languages: German, English, Portuguese

Database composed of three tables: 
Logged Data: Everey action is logged by the system. After 120 seconds without any action, the logged text is send to 
the database.
Staff: Every row contains the name, affiliation, and room number of a staff member.
Rooms: Every row contains the room number, affiliation, and all(!) staff members in this room.

Every room has two pictures, e.g. 100Foto.jpeg and 100Map.jpeg.

changeEntries.html (http://giv-konkol.uni-muenster.de/changeEntries.html) includes a small user interface making it 
possible to update the tables Staff and Rooms.
