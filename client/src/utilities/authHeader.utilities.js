import { getItem } from './localStorage.utilities'

export default function authHeader() {
    //store user in local storage of browser
    const user = getItem('user') //JSON.parse(localStorage.getItem('user'))
    
    //check if user and if user has accessToken
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken }
    } else {
        return{}
    }
}