import ShowToast from './ShowToast';


export default async error => {
  const err = error;
  const response = err.response;

  if (response?.status === 504) {
    ShowToast('The server is not responding. Retry the operation later.');

    return;
  }

  if (response?.status === 500) {
    ShowToast('500 | Server error');

    return;
  }

  if (response?.status === 502) {
    ShowToast('502 | Server is not available');

    return;
  }

  if (response?.status === 404) {
    ShowToast('404 | Resource not found');

    return;
  }

  if (response?.status === 422) {
    ShowToast('422 | Data validation error');

    return;
  }

  if (response?.status === 403) {
    ShowToast('403 | Resource unavailable');

    return;
  }

  const errorResponse = response?.data?.errors;

  if (errorResponse) {
    const errorMessage = errorResponse.map(item => `${item.title}\n${item.detail}`).join();

    ShowToast(`${response.status}. ${errorMessage}`, true);
  }
};
