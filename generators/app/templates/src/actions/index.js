import { get } from '../utils/fetch';
import urlConfig from '../constants/urlConfig';

const actions = {
  updCardAdminState(attr, value) {
    return dispatch => {
      setTimeout(() => {
        dispatch({
          type: 'UPDATE_CARD_ADMIN_STATE',
          data: {
            [attr]: value
          }
        });
      }, 3000);
    };
  },
  /*
  * 获取用户信息
  * */
  getWxUserInfo() {
    return function(dispatch) {
      get({
        url: urlConfig.getUserInfo,
        success(data) {
          dispatch({
            type: 'UPDATE_CARD_ADMIN_STATE',
            data: { wxUserInfo: data.data }
          });
        }
      });
    };
  }
};

export default actions;
