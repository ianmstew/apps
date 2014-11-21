'use strict';

module.exports = function (app, mongoose) {
  var appSchema = new mongoose.Schema({
    clientId: { type: String, unique: true },
    clientSecret: { type: String },
    description: String,
    logo: String,
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    createdAt: { type: Date, default: Date.now }
  });

  appSchema.index({ clientId: 1 }, { unique: true });
  appSchema.index({ owner: 1 });
  appSchema.set('autoIndex', (app.get('env') === 'development'));

  appSchema.pre('remove', function (next) {
    // Remove my associated AppTokens and Services
    app.db.models.AppToken.remove({ app: this._id }).exec();
    app.db.models.Service.remove({ app: this._id }).exec();
    next();
  });

  app.db.model('App', appSchema);
};
