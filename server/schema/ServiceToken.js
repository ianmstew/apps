'use strict'

module.exports = function(app, mongoose) {
	var serviceTokenSchema = new mongoose.Schema({
		service: String,
		owner: String,
		timestamp: Number,
		tokenSet: Object
	});

	serviceTokenSchema.index({ service: 1 });
	serviceTokenSchema.index({ owner: 1 });

	serviceTokenSchema.set('autoIndex', app.get('env') === 'development');
	app.db.model('ServiceToken', serviceTokenSchema);
};
