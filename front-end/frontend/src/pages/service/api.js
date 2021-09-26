  
import axios from  'axios';
//criação de componente para informar o axios onde está o nosso backend
const api = axios.create ({
    baseURL: 'http://localhost:3111'
});

export default api;