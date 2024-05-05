// config.js
const configs = {
    mario: '192.168.0.16', 
    santi: 'localhost', 
  };
  
  const activeConfig = 'mario'; 
  
  export const serverIP = configs[activeConfig];
  
  