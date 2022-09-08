//쿠키가져오기

const getCookie = (name) =>{
    let value = "; " + document.cookie;
    let parts = value.split("; "+name+"=");
    if(parts.length ===2){
        return parts.pop().split(";").shift();
    }
};

const setCookie = (name, value, exp = 5) =>{
    let date = new Date();
    date.setTime(date.getTime() + exp * 30 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT";
};



export {getCookie, setCookie, deleteCookie}