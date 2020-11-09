import ShowToast from './ShowToast';


export default async error => {
  const err = error;
  const response = err.response;

  if (response?.status === 504) {
    ShowToast('Сервер не отвечает. Повторите операцию позже.');

    return;
  }

  if (response?.status === 500) {
    ShowToast('500 | Ошибка сервера');

    return;
  }

  if (response?.status === 502) {
    ShowToast('502 | Сервер недоступен');

    return;
  }

  if (response?.status === 404) {
    ShowToast('404 | Ресурс недоступен');

    return;
  }

  if (response?.status === 422) {
    ShowToast('422 | Ошибка данных');

    return;
  }

  if (response?.status === 403) {
    ShowToast('403 | Ресурс недоступен');

    return;
  }

  const errorResponse = response?.data?.errors;

  if (errorResponse) {
    const errorMessage = errorResponse.map(item => `${item.title}\n${item.detail}`).join();

    ShowToast(`${response.status}. ${errorMessage}`, true);
  }
};
