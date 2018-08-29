let initState = {
    isLogin:0
};

function userInfo(state = initState, action) {
    switch (action.type){
        case 'SET_USER_INFO':
            return Object.assign({},state,action.data);
        default : return state;
    }
};

export default userInfo;