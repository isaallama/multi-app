import axios from 'axios';

const findIp = async (ip) => {
  try {
    const url = `https://ipinfo.io/${ip}/json`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching IP address data:", error);
    throw new Error('Unable to fetch IP address data. Please check the IP address and try again.');
  }
}

const createIP = async (data) => {
  try {
    return await axios.post('/ip', data);
  } catch (error) {
    console.error("Error creating IP record:", error);
    throw new Error('Unable to create IP record. Please try again later.');
  }
}

export default { findIp, createIP };
