export const config = {
  env: 'development',
  logger: {
    console: true,
    remote: {
      host: 'logstash01dv.almundo.it',
      port: 5515,
    },
  },

  apiBasePath: 'http://apidv.almundo.it:8080/api/',
  absBasePath: 'http://absdv.almundo.it:8080/abs/',
};
