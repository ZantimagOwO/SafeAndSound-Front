// config.js
const configs = {
    mario: 'http://192.168.0.16:3000', 
    santi: 'http://localhost:3000', 
  };
  
  const activeConfig = 'santi'; 
  
  export const serverIP = configs[activeConfig];
  
  