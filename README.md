# Welcome to the Engine API Endpoint Manager

## Install

1. Install latest Node.js
1. Install latest MongoDB
1. Ensure Mongo is running: `$ mongo` (Ctrl+C to quit)
1. Install grunt comand line app `$ sudo npm install -g grunt-cli`

## Run

1. `$ npm install`
1. `$ grunt`
1. `$ node server`
1. Access `http://localhost:3000`

## Developing App (front end)

1. Start server (see **Run**)
1. Start watch command `$ grunt watch` (required to be running continually during front end development)
1. Install [LiveReload Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) to take advatage of automatic brower refreshing while editing .html and .less files (optional)
1. Before committing any front end code, run `$ grunt jshint` and solve Javascript syntax issues, then `$ grunt jscs` and solve any style issues.

**IMPORTANT**: `client-build` and `temp` are transient folders and will be erased.

## While-you-type Javascript linting (Sublime Text 3)

1. Install JSHint command line app `$ sudo npm install -g jshint`
1. Install JSCS command line app `$sudo npm install -g jscs`
1. Install Sublime Package Control
   * Within Sublime Text, follow instructions here: https://sublime.wbond.net/installation
1. Install SublimeLinter
   * Within Sublime Text, pres Ctrl+Shift+P (PC) Cmd+Shift+P (Mac) and type/select "Package Control: Install Package"
   * Type/select "SublimeLinter"
   * Type/select "SublineLinter-JSHint"
   * Type/select "SublimeLinter-JSCS"
