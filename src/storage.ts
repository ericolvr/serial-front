

class Storage {
    static async StoreUserData({ data }) {
        const name = data['user']
        const token = data['access_token']
        const role = data['role']
        try {
            localStorage.setItem('name', name);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            return 'ok'
        } catch (error) {
            console.log(error);
        }
    }

    static RetriveUserToken() {
        try {
            const token = localStorage.getItem('token');
            if (token){
                return token
            } else {
                return token 
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async DeleteUserToken() {
        try {
            localStorage.removeItem('name')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
        } catch (error) {
            console.log(error)
        }
    }
}

export default Storage;