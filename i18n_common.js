;(function () {

  if ('undefined' === typeof I18n) {
    I18n = {};
  }

  I18n.onLanguageSet = function (langdata) {
    // override in client/server
  }

  I18n.translate = function (key) {
    return this.i18n.translate(key).fetch();
  }

  I18n.sprintf = function (key, keys) {
    return this.i18n.sprintf(key, keys);
  }

  


})();
