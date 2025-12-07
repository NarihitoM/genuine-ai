export type message = {
    sender : string,
    message : string,
    loading?: boolean,
}

export type decodedtoken = {
    id: string,
    username : string,
    email : string,
    tier : string
}

export type chatmessage = {
    sender : string,
    message : string,
    loading?: boolean,
}

export type storemessage = {
    sender : string,
    message : string,
}

export type chatcode = {
    _id : string,
    type : string,
    textcontent : [string]
}

export type humanize = {
    _id : string,
    type : string,
    textcontent : [string]
}