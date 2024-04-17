import create from 'zustand';
import axios from "axios";
import {basePath} from "../utility/utility.js";
let BASEURL = basePath();


 const AuthStore = create((set) => ({
    Authenticate: null,
    AuthenticateRequest: async (username) => {
        try {
            let response = await axios.post(`${BASEURL}/authenticate`, { username });
            set({ Authenticate: response.data });
        } catch (error) {
            console.error("Authentication request failed:", error);
            set({ Authenticate: null });
        }
    },

    GetUser:null,
    GetUserRequest: async ({username}) =>{
        try{
            set({ GetUser: null });
            let response = await axios.get(`${BASEURL}/user/${username}`);
            set({ GetUser: response.data });
        }catch (e) {
            console.error("password doesn't match:", e);
            set({ GetUser: null });
        }
    },
     GetRegister:null,
     GetRegisterRequest: async (credentials) =>{

        //TODO
         try{
             set({ GetRegister: null });
             let response = await axios.post(`${BASEURL}/register`,credentials);

             set({ GetRegister: response.data });
         }catch (e) {
             console.error("Register error", e);
             set({ GetRegister: null });
         }
     },
     GetVerifyPassword:null,
     GetVerifyPasswordRequest: async ({username,password}) =>{
         try{
             set({ GetVerifyPassword: null });
             let response = await axios.post(`${BASEURL}/login`,{username,password});
             set({ GetVerifyPassword: response.data });
         }catch (e) {
             console.error("password doesn't match:", e);
             set({ GetVerifyPassword: null });
         }
     },
     GetUpdateUser:null,
     GetUpdateUserRequest: async (response) =>{
         try{
             set({ GetUpdateUser: null });
             const token = await localStorage.getItem('token');
             let response = await axios.put(`${BASEURL}/updateUser`,response,{headers: {"Authorization": `Bearer ${token}`}});
             set({ GetUpdateUser: response.data });
         }catch (e) {
             console.error("could not update profile", e);
             set({ GetUpdateUser: null });
         }
     },
     GetGenerateOTP:null,
     GetGenerateOTPRequest: async (username) =>{
         try{
             set({ GetGenerateOTP: null });

             let response = await axios.get(`${BASEURL}/generateOTP`,{params: {username}});

             set({ GetGenerateOTP: response.data });
         }catch (e) {
             console.error("OPR", e);
             set({ GetGenerateOTP: null });
         }
     }

}));

export default AuthStore;
