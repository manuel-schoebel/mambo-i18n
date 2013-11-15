Package.describe({
  summary: "Localization Package for meteor based on Jed.js"
});

Npm.depends({jed: "0.5.4"});

Package.on_use(function (api) {
  var both = ['client', 'server'];
  api.use(['underscore', 'jed', 'handlebars'], both);

  api.export && api.export('I18n');

  api.add_files('i18n_common.js', both);
  api.add_files('i18n_client.js', 'client');  
  api.add_files('i18n_server.js', 'server');
});