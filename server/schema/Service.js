'use strict';

// TODO: Use { type: ObjectId } for 'app'
// TODO: Add 'createdAt' (http://stackoverflow.com/a/12670523/957813)
module.exports = function (app, mongoose) {
  var serviceSchema = new mongoose.Schema({
    app: String,
    type: String,
    connectionData: Object,
    owner: String
  });

  serviceSchema.index({ app: 1 });
  serviceSchema.index({ owner: 1 });

  serviceSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Service', serviceSchema);
};
