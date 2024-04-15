import create from 'zustand';
import axios from "axios";

const AuthStore = create((set) => ({
    Authenticate: null,
    AuthenticateRequest: async (username) => {
        try {
            let response = await axios.post(`/authenticate`, { username });
            set({ Authenticate: response.data });
        } catch (error) {
            console.error("Authentication request failed:", error);
            set({ Authenticate: null });
        }
    },

    GetUser:null,
    GetUserRequest: async () =>{
        try{
            set({ GetUser: null });
            let response = await axios.get()

        }catch (e) {

        }
    }
}));

export default AuthStore;
