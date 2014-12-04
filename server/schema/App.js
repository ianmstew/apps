'use strict';
var _ = require('lodash');

module.exports = function (app, mongoose) {
  var appSchema = new mongoose.Schema({
    clientId: { type: String, unique: true },
    clientSecret: { type: String },
    description: String,
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    createdAt: { type: Date, default: Date.now }
  });

  appSchema.index({ clientId: 1 }, { unique: true });
  appSchema.index({ owner: 1 });
  appSchema.set('autoIndex', (app.get('env') === 'development'));

  appSchema.pre('remove', function (next) {
    // Remove my associated AppTokens
    app.db.models.AppToken.remove({ app: this._id }).execQ()
      .catch(next).done();

    // Remove child services using doc.remove() to trigger 'remove' hook on Service
    // https://github.com/learnboost/mongoose/issues/1241
    app.db.models.Service.find({ app: this._id }).execQ()
      .then(function (services) {
        _.invoke(services, 'remove');
      })
      .catch(next).done();
    next();
  });

  app.db.model('App', appSchema);
};
