import axios from "axios";

const Url = "http://localhost:4000";

export async function chatbot(message: string) {
    const response = await axios.post(`${Url}/api/chatmessage`, {
        message: message
    });
    return response.data;
}

export async function chatcode(textcontent: string, id: string | undefined) {
    const response = await axios.post(`${Url}/api/chatcode`, {
        textcontent: textcontent,
        id: id
    });
    return response.data;
}

export async function humanize(textcontent: string, id: string | undefined) {
    const response = await axios.post(`${Url}/api/humanize`, {
        textcontent: textcontent,
        id: id
    });
    return response.data;
}

export async function getchatcode(token: any) {
    const response = await axios.get(`${Url}/api/getchatcode`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export async function gethumanize(token: any) {
    const response = await axios.get(`${Url}/api/gethumanize`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export async function deletechatcodeindex(id: string | undefined, index: number | null) {
    const response = await axios.post(`${Url}/api/deletechatcodeindex`,
        {
            id: id,
            index: index,
        }
    )
    return response.data;
}

export async function deletehumanizeindex(id: string | undefined, index: number | null) {
    const response = await axios.post(`${Url}/api/deletehumanizeindex`,
        {
            id: id,
            index: index,
        }
    )
    return response.data;
}