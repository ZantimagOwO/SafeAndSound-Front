// config.js
const configs = {
  mario: "http://192.168.0.16:3000",
  santi: "http://192.168.1.132:3000",
  AWS: "https://myeventz.es:3000",
};

const activeConfig = 'AWS'; 

export const serverIP = configs[activeConfig];