import { defineStore } from 'pinia';

const ajaxGetData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve(520) : reject('fail');
    }, 1000);
  });
};

interface StateInfo {
  count: number;
  testData?: any;
}
export const useCounterStore = defineStore('counter', {
  state: (): StateInfo => {
    return { count: 0, testData: null };
  },
  getters: {
    // automatically infers the return type as a number
    doubleCount(state) {
      return state.count * 2;
    },
    // the return type **must** be explicitly set
    doublePlusOne(): number {
      // autocompletion and typings for the whole store ✨
      return this.doubleCount + 1;
    },
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
    async getTestData() {
      try {
        this.testData = await ajaxGetData();
      } catch (error) {
        return error;
      }
    },
  },
});
