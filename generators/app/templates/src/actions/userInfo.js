

export default {
    async getUserInfo(){
        return async dispatch=>{
            await new Promise(((resolve, reject) => {
                setTimeout(function () {
                    dispatch({
                        type:'SET_USER_INFO',
                        data:{isLogin:1}
                    })
                    resolve()
                },1500)
            }))

        }
    }
}