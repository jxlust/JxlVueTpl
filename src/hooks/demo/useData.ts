//业务模型和业务逻辑
export const useData = () => {
  const demoData = ref({});
  const getData = () => {};
  const checkPwd = (v1, v2) => {
    return v1 === v2;
  };
  const changePwd = () => {};
  return {
    demoData,
    getData,
    checkPwd,
    changePwd,
  };
};

//交互逻辑
export const useDataControl = () => {
  const { demoData, getData, checkPwd, changePwd } = useData();
  const initData = () => {
    getData();
  };
  const errorModalState = reactive({
    visible: false,
    errorText: '',
  });

  const onChangePwd = (oldPwd, newPwd) => {
    if (checkPwd(oldPwd, newPwd)) {
      changePwd();
    } else {
      errorModalState.visible = true;
      errorModalState.errorText = 'error';
    }
  };
  return {
    demoData,
    initData,
    onChangePwd,
  };
};
