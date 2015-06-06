'use strict';

exports.port = process.env.PORT || 3000;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost/apinetwork'
};
exports.companyName = 'API Network Foundation, Inc.';
exports.projectName = 'API Network';
exports.systemEmail = 'support@engine.co';
exports.cryptoKey = 'HlWb0ewbpkcY2LNSrfCzFgtQjOGuanhYEACxCy0m5Bxgk46mgkaZTdWVE1wSIyt';
exports.loginAttempts = {
  forIp: 50,
  forIpAndUser: 7,
  logExpiration: '20m'
};
exports.requireAccountVerification = false;
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName +' Website',
    address: process.env.SMTP_FROM_ADDRESS || 'support@engine.co'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'curtis.lacy@ldengine.com',
    password: process.env.SMTP_PASSWORD || 'yW7JWmiyHb',
    host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
    ssl: true
  }
};
