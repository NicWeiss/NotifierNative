import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import NotifyListItemModel from '../models/notifyListItem';


// const processOrders = (data, params = {}) => data.map(item => {
//   const { date, timeStart, timeEnd } = ParseDateTimePeriod(item.date_start, item.date_end);

//   return { ...item, period: `${date} ${timeStart}-${timeEnd}`, ...params };
// });


class NotifyListStoreSample {

  state = null

  @observable isLoading = true
  @observable list = []

  @action loadData = async () => {
    this.isLoading = true;
console.log('START LOAD');
    await this.requestData();
console.log('FINISH LOAD');
    this.isLoading = false;
  }

  @action refreshData = async () => {
    this.isEndOfTheListReached = false;
    this.list = [];
    this.isRefreshing = true;

    await this.requestData();

    this.isRefreshing = false;
  }

  requestData = async () => {
    let response = null;

    try {
      response = await Api.doRequest('GET', '/notify');
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    // const responseNotify = processOrders(
    //   response.data.orders
    // );
   this.list = ValidateResponseData(response.data.notify, NotifyListItemModel);
  }

};

export default NotifyListStoreSample;
