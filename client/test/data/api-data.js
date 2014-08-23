define(function (require) {
  var apiData = {
    apps: [{
      name: 'App one',
      logo: 'http://placekitten.com/200/100',
      description: 'Bacon ipsum dolor sit amet culpa sirloin do ham hock pig cupidatat ut tail consequat. Cow commodo sunt frankfurter pork excepteur. Dolor eiusmod in consequat deserunt beef, cow t-bone ad shoulder. Tenderloin deserunt magna porchetta boudin consequat. Excepteur ground round drumstick dolor ball tip shoulder voluptate ad. Turducken hamburger andouille, veniam cillum flank frankfurter duis tenderloin.',
      services: [{
        name: 'facebook',
        icon: 'http://placekitten.com/50/50',
        dateAdded: '10/20/2013',
        callbackUrl: 'http://callback.facebook.com',
        clientId: 'app100-facebookClientIdHash',
        clientSecret: 'app100-facebookClientSecret'
      }, {
        name: 'twitter',
        icon: 'http://placekitten.com/50/50',
        dateAdded: '04/10/2014',
        callbackUrl: 'http://callback.twitter.com',
        clientId: 'app100-twitterClientIdHash',
        clientSecret: 'app100-twitterClientSecret'
      }]
    }, {
      name: 'App two',
      logo: 'http://placekitten.com/200/100',
      description: 'Pancetta rump dolore, fugiat cow exercitation porchetta esse commodo quis chuck ham hock dolore drumstick ham. Fugiat ut in ball tip do anim et pork adipisicing turkey pancetta drumstick kielbasa meatloaf quis. Sirloin aute kevin shoulder ham hock ribeye turkey nisi doner exercitation shankle boudin ball tip.',
      services: [{
        name: 'facebook',
        icon: 'http://placekitten.com/50/50',
        dateAdded: '10/20/2013',
        callbackUrl: 'http://callback.facebook.com',
        clientId: 'app200-facebookClientIdHash',
        clientSecret: 'app200-facebookClientSecret'
      }, {
        name: 'twitter',
        icon: 'http://placekitten.com/50/50',
        dateAdded: '04/10/2014',
        callbackUrl: 'http://callback.twitter.com',
        clientId: 'app200-twitterClientIdHash',
        clientSecret: 'app200-twitterClientSecret'
      }]
    }]
  };

  return apiData;
});
