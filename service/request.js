import axios from "axios";

let request = (params) => {
    axios({
        method: params.method,
        url: params.url,
        data: params.data,
    })
}

export default request