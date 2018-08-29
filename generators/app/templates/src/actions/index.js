
import personalAction from './personalAction';
import loanActions from './loanDetailAction';
import loanApplyAction from './loanApplyAction'
import {fetchJson,phpAjax} from "../utils/fetch";
import urlConfig from "./urlConfig";




let actions = {
  updCardAdminState(attr,value){
    return (dispatch,getState)=>{
      setTimeout(()=> {
        dispatch({
          type: 'UPDATE_CARD_ADMIN_STATE',
          data: {
            [attr] : value
          }
        })
      },3000)
    };
  },
  /*
  * 获取用户信息
  * */
  getWxUserInfo(){
      return function (dispatch,getStore) {
          phpAjax({
              url:urlConfig.getUserInfo,
              success:function (data) {
                  dispatch({
                      type:'UPDATE_CARD_ADMIN_STATE',
                      data:{wxUserInfo:data.data}
                  })
              }
          })
      }
  }

};


export default actions;
