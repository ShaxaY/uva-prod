/* eslint-disbale */
import axios from 'axios';
import { showAlert } from './alerts';

export const addFace = async (data) => {
  try {
    const url = '/api/v1/faces';

    const res = await axios({
      method: 'POST',
      url,
      data,
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
