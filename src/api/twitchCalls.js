import apiClient from './apiClient';
import settings from '../globalSettings';

export const getChat = async (url, content) => {
  try {
    const response = await apiClient.post(url, content, {
      headers: {
        'Client-ID': settings.TWITCH_CLIENT_ID,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `HTTP error! status: ${error.response?.status || 'unknown'}`
    );
  }
};
