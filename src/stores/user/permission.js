import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `${import.meta.env.VITE_Api_Url}/user/permissions`;

export const usePermissionStore = defineStore('permission', () => {

    const permission = ref('')
    const permissions = ref([])
   

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
            this.permissions = response.data;
        } catch (error) {
            console.log('get users error')
        }
    }

    

    return { permission, permissions, getAll}
})