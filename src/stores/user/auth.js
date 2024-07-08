import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import router from '../../router';
import axios from "axios"
import { useAlertStore } from '@/stores/alert';

const baseUrl = `${import.meta.env.VITE_Api_Url}/auth/`;

export const useAuthStore = defineStore('auth', () => {

    const user = ref(JSON.parse(localStorage.getItem('user')))
    const token = ref(localStorage.getItem('token'))

    const alert = useAlertStore()

    if(user){
        tokenHasExpired()
    }

    async function login(username, password){
        try {
            const response = await axios.post(
                baseUrl+'login',
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Accept": "application/json",
                    },
                }
            );

         
            // update user and token
            this.user = response.data.user;
            this.token = response.data.access_token;


            // store user details and token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.access_token);
            
            await router.push('/user');
            return { status: false }
        } catch (error) {
            alert.danger("error", error.response.data.message, "block")
            return { status: false }
        }
    }
    async function getTokenExpired(){
        try {
            return await axios.get(
                import.meta.env.VITE_Api_Url+'/user/users/token-creation-date',
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token.value}`
                    },
                }
            );
        } catch (error) {
            user.value = null;
            token.value = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            await router.push('/login');
        }
    }

    async function tokenHasExpired(){

        //retrieve user permissions
        const tokenExpired = await getTokenExpired()
        let created_at = tokenExpired.data.created_at;

        // Set the session duration to 15 minutes (in milliseconds)
        let sessionDuration =  60 * 8 * 60 * 1000;

        // Get the session start time from the token
        let sessionStartTime = new Date(created_at).getTime();

        let currentTime = new Date().getTime();

        if ((currentTime - sessionStartTime) > sessionDuration){
            user.value = null;
            token.value = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            await router.push('/login');
        }
    }
    async function logout(){
        this.user = null;
        this.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        await router.push('/login');
    }

    

    return { user, token, login, logout }
})