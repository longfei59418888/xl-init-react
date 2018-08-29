


export const getCookie = (name)=>{
    let arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null)
        return unescape(arr[2]);
    return null;
}
export const setCookie = (name, value, timeout=50)=>{
    let date = new Date()
    date.setDate(date.getDate() + timeout)
    document.cookie = name + '=' + value + ';expires=' + date
}