export const config = {
  env: 'production',
  port: 5001,
  logger: {
    console: false,
    remote: {
      host: 'logstash01pr.almundo.it',
      port: 5515,
    },
  },
  apiBasePath: 'http://api.almundo.it:8080/api/',
  absBasePath: 'http://abs.almundo.it:8080/abs/',
};
