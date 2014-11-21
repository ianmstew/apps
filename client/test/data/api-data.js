define(function (require) {
  var apiData = {
    apps: [{
      name: 'App one',
      logo: 'http://placekitten.com/200/100',
      description: 'Bacon ipsum dolor sit amet culpa sirloin do ham hock pig cupidatat ut tail' +
         'consequat. Cow commodo sunt frankfurter pork excepteur.'
    }, {
      name: 'App two',
      logo: 'http://placekitten.com/200/100',
      description: 'Pancetta rump dolore, fugiat cow exercitation porchetta esse commodo quis ' +
          'chuck ham hock dolore drumstick ham.',
      services: []
    }],

    services: [{
      type: 'facebook',
      connectionData: {
        clientID: 'app1-facebookClientId',
        clientSecret: 'app1-facebookClientSecret'
      }
    }, {
      type: 'twitter',
      connectionData: {
        consumerKey: 'app1-twitterClientId',
        consumerSecret: 'app1-twitterClientSecret'
      }
    }]
  };

  return apiData;
});
