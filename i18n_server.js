;(function () {
  Jed = Npm.require('jed');

  I18n.setLanguage = function(langdata, domain){
    this.i18n = new Jed({
      locale_data: langdata,
      domain: domain,
      // This callback is called when a key is missing
      "missing_key_callback" : function(key) {
        // Do something with the missing key
        // e.g. send key to web service or
        if(I18n.lang != 'en'){
          console.error("Missing key (" + I18n.lang + "): " + key);
        }
      },
    });
    I18n.onLanguageSet(langdata);
  }

  I18n.settings = function(options){
    this.path = options.path || '/locals/';
    this.lang = options.lang || 'en';
    this.domain = options.domain;
    _this = this;
    defLangPack = JSON.parse('{"' + _this.domain + '":{"":{"Language":"en"}}}');
    I18n.setLanguage(defLangPack, _this.domain);
  }

  I18n.__ = function (key) {

    // if (!Session.get('langLoaded')){
    //   return;
    // }

    if (arguments.length === 1){
      return I18n.translate(key);
    }

    var max = arguments.length - 1;
    var keys = [];
    var count = 0;
    var i = 1;
    for(i; i <= max; i++){
      keys.push( arguments[i] );
    }

    return I18n.sprintf(key, keys);
  }

}());