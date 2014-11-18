# API Network Apps Client

Notes:
* The API Network Apps client is a Backbone.Marionette 2.x application that runs in a single page at the HTTP path _/account_.  I.e., http://127.0.0.1/account renders this app into the main content region of the page.
* All assets are compiled/copied by grunt into the the local _build_ folder, which is served from _/client_. I.e., http://127.0.0.1/client maps to _build_.
* Data is synced with the server through the Backbone models found under _app/entities_.
