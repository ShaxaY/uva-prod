/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const addProject = async (data) => {
  try {
    const url = '/api/v1/projects';

    const res = await axios({
      method: 'POST',
      url,
      data,
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
