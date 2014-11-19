# API Network's Apps Server

1. Permits creation of apps with access to the API Network
1. Authenticates apps with API Network itself and child services
1. Maintains service endpoint for API calls, leveraging the personal-data-module
1. Will ultimately enable billing for those API calls

Requirements
------------

* Ensure NodeJS and MongoDB are installed and running.

  ```bash
  node --version # Should report v0.10.x
  mongo          # Should connect to "MongoDB shell"
  ```

* Ensure grunt and bower command line tools are installed.

  ```bash
  npm install -g grunt-cli
  npm install -g bower
  ```

* If encountering any issues related to _bcrypt_, refer to https://github.com/jedireza/drywall/wiki/bcrypt-Installation-Trouble.

* Key-based Github access: https://gist.github.com/ianmstew/a240726f111f335220ba

Install and Run
---------------

```bash
$ git clone git@github.com:APINetwork/apps
$ cd apps
$ npm install
$ grunt
```

Setup
-----

You need a few records in the database to initialize the user system.  First, start the mongo terminal:

```bash
$ mongo
```

In the mogo terminal, run the following commands. _Make sure to substitute your actual email address below._

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

Use the reset password feature to set a password.

 - `http://localhost:3000/login/forgot/`
 - Submit your email address and wait a second.
 - Go check your email and get the reset link.
 - `http://localhost:3000/login/reset/:email/:token/`
 - Set a new password.
