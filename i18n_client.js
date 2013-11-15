;(function () {

  Meteor.startup(function(){
    Session.set('langLoaded', false);
  });

  I18n.settings = function(options){
    this.path = options.path || '/locals/';
    this.lang = options.lang || 'en';
    this.domain = options.domain;
    this.version = options.version || '1'
    _this = this;

    Session.set('lang', this.lang);

    Deps.autorun(function() {
      Session.set('langLoaded', false);
      lang = Session.get('lang');
      _this.lang = lang;

      if(!options.autoload === false){
        $.getJSON(_this.path + _this.lang + '/lang_pack.json' + '?v=' + _this.version, function(data){
          I18n.setLanguage(data, _this.domain);
        })
        .done(function(){ /* all good */ })
        .fail(function(){
          defLangPack = JSON.parse('{"' + _this.domain + '":{"":{"Language":"en"}}}');
          I18n.setLanguage(defLangPack, _this.domain);
        });
      };
    });
  }

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

  I18n.onLanguageSet = function(langdata) {
    Session.set('langLoaded', true);
  }

  I18n.__ = function (key) {

    if (!Session.get('langLoaded')){
      return;
    }

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

  I18n._handlebarsHelpers = {
    __: function(key) {
      if(!Session.get('langLoaded')){
        return;
      }

      if (arguments.length === 2){
        return I18n.translate(key);
      }

      var max = arguments.length - 2;
      var keys = [];
      var i = 1;
      for(i; i <= max; i++){
        keys.push( arguments[i] );
      }

      return I18n.sprintf(key, keys);
    }
  }

  if ('undefined' !== typeof Handlebars) {
    _.each(I18n._handlebarsHelpers, function (func, name){
      Handlebars.registerHelper(name, func);
    });
  }
  else {
    console.log ('WARNING: I18n Handlebars helpers not registered. Handlebars not defined');
  }

}());