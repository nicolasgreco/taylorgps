export const config = {
  env: 'staging',
  port: 5001,
  logger: {
    console: true,
    remote: {
      host: 'logstash01st.almundo.it',
      port: 5515,
    },
  },
  apiBasePath: 'https://apist.almundo.com/api/',
  absBasePath: 'http://absst.almundo.it:8080/abs/',
};
