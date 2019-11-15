import axios from "axios";

const AxiosWithAuth = () => {
  const token = sessionStorage.getItem('token');

  return axios.create({
    baseURL: 'http://localhost:5000',
    headers: {authorization: token}
  });
};

export default AxiosWithAuth;