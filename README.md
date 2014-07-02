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

Install and Run
------------

```bash
$ git clone https://github.com/LDEngine/endpoint-manager
$ cd endpoint-manager
$ npm install
$ grunt
```

Setup
------------

You need a few records in the database to start using the user system.  First, start the mongo terminal:

```bash
$ mongo
```

Now, in the mogo terminal, run the following commands. __Make sure to substitute your actual email address below.__

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
