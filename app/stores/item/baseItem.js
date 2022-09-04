import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';


class BaseItemStore {

  @observable isLoading = true
  @observable isRefreshing = false;
  @observable item = {};
  model = {};
  entity = '';
  entityInUrl = '';

  @action getItem = () => this.item;

  @action clear = () => {
    this.item = [];
    this.isRefreshing = false;
    this.isLoading = true;
  }

  @action loadData = async (id) => {
    this.isLoading = true;

    await this.query({ id });
  }

  @action refreshData = async () => {
    this.isEndOfTheListReached = false;
    this.item = [];
    this.isRefreshing = true;

    this.query({ id: this.item.id });
  }

  @action deleteItem = async (item) => {
    if (item) {
      this.item = item;
    }

    this.query({ method: 'DELETE', id: this.item.id });
  };

  @action updateItem = async (item) => {
    if (item) {
      this.item = item;
    }

    await this.query({ method: 'PUT', id: this.item.id, data: this.item });

    return this.item;
  };

  @action createItem = async (item) => {
    this.query({ method: 'POST', data: item });
  };

  query = async (params) => {
    const metod = params.method || 'GET';
    const id = params.id || '';
    const data = params.data || null;

    let response = null;
    let queryData = null;

    if (data) {
      queryData = {
        data: { [this.entity]: data }
      }
    }

    try {
      response = await Api.doRequest(metod, `/${this.entityInUrl}/` + id, queryData);
    } catch (error) {
      ProcessErrors(error);
    }

    if (response && response.data && response.data[this.entity]) {
      this.item = ValidateResponseData(response.data[this.entity], this.model);
    } else {
      this.item = {};
    }

    this.isLoading = false;
    this.isRefreshing = false;
  }
}

export default BaseItemStore;
