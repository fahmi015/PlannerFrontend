import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"
import moment from 'moment'

const baseUrl = `${import.meta.env.VITE_Api_Url}/user/users`;

export const useUserStore = defineStore('user', () => {

    const user = ref('')
    const users = ref([])
   

    const alert = useAlertStore()
    const auth = useAuthStore()


    async function getAll(){
        try {
            const response = await axios.get(
                baseUrl,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            console.log(response.data)
            console.log(response.data[0])
            this.users = response.data;
        } catch (error) {
            console.log('get users error')
        }
    }

    async function getById(id){
        try {
            const response = await axios.get(
                baseUrl+'/'+id,
                {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                }
            );
            this.user = response.data
        } catch (error) {
            console.log('get user error')
        }
    }

   
    async function store(user){
        try {
            const response = await axios.post(
                baseUrl, user,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("User Created Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            if(error.response.data.hasOwnProperty('errors')){
                if (error.response.data.errors.first_name) {
                    alert.danger("first name", error.response.data.errors.first_name[0], "block")
                }
                if (error.response.data.errors.last_name) {
                    alert.danger("last name", error.response.data.errors.last_name[0], "block")
                }
                if (error.response.data.errors.user_name) {
                    alert.danger("user name", error.response.data.errors.user_name[0], "block")
                }
            }else{
                alert.danger("error", error.response.data.message, "block")
            }
            return { status: false }
        }
    }

    async function update(id, user){
        try {
            const response = await axios.put(
                baseUrl+'/'+id, user,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("User Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            if(error.response.data.hasOwnProperty('errors')){
                if (error.response.data.errors.first_name) {
                    alert.danger("first name", error.response.data.errors.first_name[0], "block")
                }
                if (error.response.data.errors.last_name) {
                    alert.danger("last name", error.response.data.errors.last_name[0], "block")
                }
                if (error.response.data.errors.user_name) {
                alert.danger("user name", error.response.data.errors.user_name[0], "block")
                }
                if (error.response.data.errors.email) {
                    alert.danger("email", error.response.data.errors.email[0], "block")
                }
               
            }else{
                alert.danger("error", error.response.data.message, "block")
            }
            return { status: false }
        }
    }

    async function updatePassword(id, data){
        try {
            const response = await axios.put(
                baseUrl+'/'+id+'/update-password', data,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Password Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
        if(error.response.data.hasOwnProperty('errors')){
            if (error.response.data.errors.current_password) {
                alert.danger("current password", error.response.data.errors.current_password[0], "block")
            }
            if (error.response.data.errors.new_password) {
                alert.danger("new password", error.response.data.errors.new_password[0], "block")
            }
        }else{
            alert.danger("error", error.response.data.message, "block")
        }
            return { status: false }
        }
    }

    async function forceUpdatePassword(id, data){
        try {
            const response = await axios.put(
                baseUrl+'/'+id+'/force-update-password', data,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Password Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
        if(error.response.data.hasOwnProperty('errors')){
            if (error.response.data.errors.current_password) {
                alert.danger("current password", error.response.data.errors.current_password[0], "block")
            }
            if (error.response.data.errors.new_password) {
                alert.danger("new password", error.response.data.errors.new_password[0], "block")
            }
        }else{
            alert.danger("error", error.response.data.message, "block")
        }
            return { status: false }
        }
    }

    
    async function destroy(id){
        try{
            const response = await axios.delete(
                baseUrl+'/'+id,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("User Deleted Successfully", null, "modal", 3000)
            this.users = this.users.filter(function (item) {
                return item.id !== id;
            });
        }catch(error){
            alert.danger("User Not Deleted", null, "block", 3000)
        }
    }

   

    return { user, users, getAll, getById, destroy, store, update, updatePassword, forceUpdatePassword }
})