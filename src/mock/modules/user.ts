import Mock from 'mockjs';
import qs from 'qs';
const analog = Mock.mock({
  'data|1000': [
    // 生成1000条数据 数组
    {
      // 生成100条数据
      'id|+1': 1,
      userName: '@cname',
      'account|100000-999999': 100000, // 100000只作为数据类型的判断，数值没有实际意义
      info: '@county(true)',
      datetime: '@datetime',
      // 模拟一组包含两个元素，元素值在1-5之间
      'roleIds|2': [() => Mock.Random.integer(1, 6)],
    },
  ],
});

const mockList = analog.data;
type QuerType = {
  userName?: string;
  pageNum?: number;
  pageSize?: number;
};
const getUserList = {
  url: '/user/getUserListxxxx',
  methods: 'get',
  template: (config) => {
    console.log('config getUserList:', config);
    const index = config.url.indexOf('?');
    let query: QuerType = {};
    if (index >= 0) {
      const urlQuery = config.url.slice(index + 1);
      query = qs.parse(urlQuery) as QuerType;
      console.log('urlQuery:', urlQuery);
      console.log('query:', query);
    }
    const { userName, pageNum, pageSize } = query;
    let userList = [];
    let totalList = [];
    if (userName) {
      totalList = mockList.filter((item) => item.userName.toUpperCase().includes(userName.toUpperCase()));
    }
    if (pageSize && pageNum) {
      userList = totalList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
    } else {
      userList = totalList;
    }
    return {
      code: 200,
      msg: 'success',
      data: { list: userList, ...{ total: totalList.length } },
    };
  },
};

const doSave = {
  url: '/user/doSave',
  methods: 'post',
  template: {
    msg: '模拟保存成功',
    code: 200,
    data: null,
  },
};

export default [getUserList, doSave];
