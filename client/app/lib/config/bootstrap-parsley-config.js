define(function (require) {

  var ParsleyConfig = {

    trigger: 'blur',
    errorClass: 'has-error',
    successClass: 'has-success',

    classHandler: function (parsleyField) {
      var $fieldWrapper = parsleyField.$element.closest('.form-group');
      if (!$fieldWrapper.length) $fieldWrapper = parsleyField.$element.parent();
      return $fieldWrapper;
    },

    errorsContainer: function (parsleyField) {
      var $fieldWrapper = parsleyField.$element.closest('.form-group');
      if (!$fieldWrapper.length) $fieldWrapper = parsleyField.$element.parent();
      return $fieldWrapper.find('.error-messages');
    }
  };

  window.ParsleyConfig = ParsleyConfig;
});
