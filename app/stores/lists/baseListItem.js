import { action, observable } from 'mobx';

import { Api, ProcessErrors, SerializeQueryParams, ValidateResponseData } from 'app/helpers';


class BaseListItem {

  @observable isLoading = true;
  @observable isRefreshing = false;
  @observable list = [];
  model = {};
  entity = '';
  entityInUrl = '';
  queryParamas = { page: 1, per_page: 25 };

  @action loadData = async () => {
    this.isLoading = true;

    this.requestData();
  }

  @action refreshData = async () => {
    this.isEndOfTheListReached = false;
    this.isRefreshing = true;

    this.requestData();
  }

  @action getlist = () => this.list;

  @action pushToList = (item) => {
    this.list.push(item)
  }

  @action updateInList = (index, item) => {
    this.list[index] = item
  }

  @action deleteFromList = (index) => {
    this.list[index] = null
  }

  @action updateListFromDetailView = async (item) => {
    let targetItemId = null;

    this.list.forEach((element, id) => {
      if (item.id == element.id) {
        targetItemId = id;
      }
    });
    this.list[targetItemId] = item;
  }

  @action updateById = (index, item) => {
    this.list[index] = item
  }

  requestData = async () => {
    let response = null;
    const queryString = SerializeQueryParams(this.queryParamas);

    try {
      response = await Api.doRequest('GET', `/${this.entityInUrl}?${queryString}`);
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    if (response && response.data && response.data[this.entity]) {
      this.list = ValidateResponseData(response.data[this.entity], this.model);
    }

    // if (!this.list) {
    //   this.list = [];
    // }

    this.isRefreshing = false;
    this.isLoading = false;
  }
}

export default BaseListItem;
