define(function (require) {
  var apiData = {
    apps: [{
      name: 'App one',
      logo: 'http://placekitten.com/200/100',
      description: 'Bacon ipsum dolor sit amet culpa sirloin do ham hock pig cupidatat ut tail' +
         'consequat. Cow commodo sunt frankfurter pork excepteur. Dolor eiusmod in consequat ' +
         'deserunt beef, cow t-bone ad shoulder. Tenderloin deserunt magna porchetta boudin ' +
         'consequat. Excepteur ground round drumstick dolor ball tip shoulder voluptate ad. ' +
         'Turducken hamburger andouille, veniam cillum flank frankfurter duis tenderloin.',
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
    }, {
      name: 'App two',
      logo: 'http://placekitten.com/200/100',
      description: 'Pancetta rump dolore, fugiat cow exercitation porchetta esse commodo quis ' +
          'chuck ham hock dolore drumstick ham. Fugiat ut in ball tip do anim et pork ' +
          'adipisicing turkey pancetta drumstick kielbasa meatloaf quis. Sirloin aute kevin ' +
          'shoulder ham hock ribeye turkey nisi doner exercitation shankle boudin ball tip.',
      services: []
    }]
  };

  return apiData;
});
