// logon user main information
export interface MainUserInfo{
    id:number
    name:string
}


export default {
    getSelfInfo(): Promise<MainUserInfo>{
        return Promise.resolve({
            id:1,
            name: 'san'
        })
    }
}