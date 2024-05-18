

class Erico {
    static async StoreUserData({ data }) {
        console.log(data);
        console.log(data['user']);
        console.log(data['access_token']);
        console.log(data['role']);

        const name = data['user']
        const token = data['access_token']
        const role = data['role']
        try {
            localStorage.setItem('name', name);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
        } catch (error) {
            console.log(error);
        }
    }
}

export default Erico