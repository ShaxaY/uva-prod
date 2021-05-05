/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:8000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:8000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    type === 'data'
      ? showAlert('success', 'Данные успешно обновились')
      : showAlert('success', 'Пароль успешно обновлён');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
