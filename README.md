# Welcome to the Engine API Endpoint Manager

Requirements
------------

You need [Node.js](http://nodejs.org/download/) and [MongoDB](http://www.mongodb.org/downloads) installed and running.

We use [Grunt](http://gruntjs.com/) as our task runner. Get the CLI (command line interface).

```bash
$ npm install grunt-cli -g
```

We use [Bower](http://bower.io/) as our front-end package manager. Get the CLI (command line interface).

```bash
$ npm install bower -g
```

We use [`bcrypt`](https://github.com/ncb000gt/node.bcrypt.js) for hashing secrets. If you have issues during installation related to `bcrypt` then [refer to this wiki page](https://github.com/jedireza/drywall/wiki/bcrypt-Installation-Trouble).

Installation
------------

```bash
$ git clone git@github.com:jedireza/drywall.git && cd ./drywall
$ npm install && bower install
$ grunt
```

Setup
------------

You need a few records in the database to start using the user system.

Run these commands on mongo. __Make sure to substitute your email address below.__

```js
use apinetwork; // your mongo db name

db.admingroups.insert({ _id: 'root', name: 'Root' });
db.admins.insert({ name: {first: 'Root', last: 'Admin', full: 'Root Admin'}, groups: ['root'] });
var rootAdmin = db.admins.findOne();
db.users.save({ username: 'root', isActive: 'yes', email: 'your@email.address', roles: {admin: rootAdmin._id} });
var rootUser = db.users.findOne();
rootAdmin.user = { id: rootUser._id, name: rootUser.username };
db.admins.save(rootAdmin);
```

Now just use the reset password feature to set a password.

 - `http://localhost:3000/login/forgot/`
 - Submit your email address and wait a second.
 - Go check your email and get the reset link.
 - `http://localhost:3000/login/reset/:email/:token/`
 - Set a new password.


**IMPORTANT**: `build` and `temp` are transient folders and will be erased.

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

