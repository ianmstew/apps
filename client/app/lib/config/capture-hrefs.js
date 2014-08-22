define(function (require) {
  var history = require('lib/util/history');
  
  // Pass to router any hyperlinks tagged with "data-app"
  $(document).on('click', '#content-region a:not([data-bypass])', function (evt) {
    var href = $(this).attr('href');

    if (href) {
      evt.preventDefault();
      history.navigate(href, true);
    }
  });
});
