import ShowToast from './ShowToast';


export default async error => {
  const err = error;
  const response = err.response;

  if (response?.status === 504) {
    ShowToast('Сервер не отвечает. Повторите операцию позже.');

    return;
  }

  if (response?.status === 500) {
    ShowToast('Произошла ошибка. Повторите операцию позже.');

    return;
  }

  const errorResponse = response?.data?.errors;

  if (errorResponse) {
    const errorMessage = errorResponse.map(item => `${item.title}\n${item.detail}`).join();

    ShowToast(`${response.status}. ${errorMessage}`, true);
  }
};
