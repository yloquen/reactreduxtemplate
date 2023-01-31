
import store from "./store";
// import { setLoginState } from "./features/user/userSlice";

export async function runQuery(method:string, path:string, query:string|undefined=undefined, body:string|undefined=undefined)
{
    return new Promise(function (resolve, reject)
    {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        let url = "https://gorest.co.in/public/v2" + path;
        if (query)
        {
            url += ("?" + query);
        }
        xhr.open(method, url);

        xhr.onload = function ()
        {
            if (this.status >= 200 && this.status < 300)
            {
                let resp;
                try
                {
                    resp = JSON.parse(xhr.response);
                }
                catch
                {
                    resp = {};
                }
                finally
                {
                    resolve(resp);
                }
            }
            else
            {
                reject();
            }
        };

        xhr.onerror = function ()
        {
            reject({
                status:this.status,
                statusText:xhr.statusText
            });
        };

        xhr.send(body);
    });
}