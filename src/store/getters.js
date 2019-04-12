const getters = {
  shssToken: state => state.user.shssToken,
  userInfo: state => state.user.userInfo,
  userState: state => state.user.userState,
  loginFormFlag: state => state.user.loginFormFlag
};
export default getters;
