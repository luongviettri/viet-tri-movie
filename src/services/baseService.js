import Axios from "axios"
import { DOMAIN, TOKEN, TOKEN_CYBERSOFT, USER_LOGIN } from '../util/settings/config'

export class baseService {
    //put json về phía backend
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: {
                TokenCybersoft: TOKEN_CYBERSOFT
            }
        })
    }

    post = (url, model = "") => {

        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers:
            {
                Authorization: "Bearer " + localStorage.getItem(TOKEN)
                ,
                TokenCybersoft: TOKEN_CYBERSOFT
            }

        })
    }


    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: {
                TokenCybersoft: TOKEN_CYBERSOFT
            }
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers:
            {
                Authorization: "Bearer " + localStorage.getItem(TOKEN)
                ,
                TokenCybersoft: TOKEN_CYBERSOFT
            }
        })
    }
}