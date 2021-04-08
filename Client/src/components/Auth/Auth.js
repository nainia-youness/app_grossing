import axios from 'axios'
import {reactLocalStorage} from 'reactjs-localstorage';


function Auth(token){//https://medium.com/@monkov/react-using-axios-interceptor-for-token-refreshing-1477a4d5fc26
    axios.defaults.headers.common['Token'] = token;
    axios.defaults.headers.common['Device'] = "device";
    /*axios.interceptors.request.use(function (config) {
        //console.log('before Request')
        let now = new Date().getTime();
        if(now-reactLocalStorage.getObject('user').expiredTime>6000)
        {
            //console.log("expired")
            let email=reactLocalStorage.getObject('user').email
            reactLocalStorage.setObject('user', {'expiredTime':new Date().getTime(),'token':token,'email':email ,'isLogin':true});
            /*axios.post('/refresh',{refresh:send it here,message:'acess token expired'})
            .then(res=>{
                console.log(res)//here you should take take the new token and put it in local storage
              })
            .catch(error=>{
                console.log(error)
            })*/
        /*}
        else{
            console.log("not yet")
        }
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });*/
    axios.interceptors.response.use(response => {//if there is no error don t do anything 
        return response;
    }, err => {//incase there is an error we need to return the expired token and acess token
        return new Promise((resolve, reject) => {//remove everything and leave reidrect to login
            /*const originalReq = err.config;
            if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
            {
                originalReq._retry = true;

                let res = fetch('/refresh', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Device': 'device',
                        'Token': localStorage.getItem("token")
                    },
                    redirect: 'follow',
                    referrer: 'no-referrer',
                    body: JSON.stringify({
                        token: localStorage.getItem("token"),
                        refresh_token: localStorage.getItem("refresh_token")
                    }),
                }).then(res => res.json()).then(res => {//in case i sent the tokens succesfully
                    console.log(res);
                    this.setLocalStorage({token: res.token, refresh_token: res.refresh});
                    //this.setLocalStorage({token: res.token, refresh_token: res.refresh});
                    originalReq.headers['Token'] = res.token;
                    originalReq.headers['Device'] = "device";


                    return axios(originalReq);
                });

                resolve(res);
                
            }*/


            //Promise.
            return reject(err);
        });
    });
    
    
}
export default Auth