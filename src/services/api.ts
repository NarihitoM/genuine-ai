import axios from "axios";

const Url = "http://localhost:5000";

export async function signup(username : string, useremail : string, userpassword : string) {
    const response = await axios.post(`${Url}/api/signup`,{
       username : username,
       useremail : useremail,
       userpassword : userpassword
    })
    return response.data;
}

export async function signin(email : string | null, code : string) {
    const response = await axios.post(`${Url}/api/signin`,{
        email : email,
        code : code,
    })
    return response.data;
}

export async function resendemail(email : string | null) {
    const response = await axios.post(`${Url}/api/resend`,{
        email : email,
    });
    return response.data;
}

export async function login(useremail : string, userpassword : string) {
    const response = await axios.post(`${Url}/api/login`,{
        useremail : useremail,
        userpassword : userpassword
    })
    return response.data;
}

export async function changeusername (id : string | undefined, username: string, useremail : string | undefined){
    const response = await axios.post(`${Url}/api/changeusername`,{
        id : id, 
        username: username,
        useremail: useremail,
    })
    return response.data;
}

export async function Deleteuser(id : string | undefined){
    const response = await axios.post(`${Url}/api/deleteuser`,{
        id : id
    });
    return response.data;
}