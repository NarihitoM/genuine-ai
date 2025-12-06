import axios from "axios";

const Url = "http://localhost:4000";

export async function chatbot(message : string) {
    const response = await axios.post(`${Url}/api/chatmessage`,{
      message : message
    });
    return response.data;
}

export async function chatcode(textcontent : string, id : string | undefined) {
    const response = await axios.post(`${Url}/api/chatcode`,{
        textcontent : textcontent,
        id : id
    });
    return response.data;
}

export async function humanize(textcontent : string,id : string | undefined) {
    const response = await axios.post(`${Url}/api/humanize`,{
        textcontent : textcontent,
        id : id
    });
    return response.data;
}