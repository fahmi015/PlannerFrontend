import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `${import.meta.env.VITE_Api_Url}/user/budgets`;

export const useBudgetStore = defineStore('budget', () => {

    const budget = ref('')
    const budgets = ref([])
   

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
            this.budgets = response.data;
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
            this.budget = response.data
        } catch (error) {
            console.log('get budget error')
        }
    }

   
    async function store(budget){
        try {
            const response = await axios.post(
                baseUrl, budget,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("budget Created Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            if(error.response.data.hasOwnProperty('errors')){
                if (error.response.data.errors.first_name) {
                    alert.danger("first name", error.response.data.errors.first_name[0], "block")
                }
                if (error.response.data.errors.last_name) {
                    alert.danger("last name", error.response.data.errors.last_name[0], "block")
                }
                if (error.response.data.errors.budget_name) {
                    alert.danger("budget name", error.response.data.errors.budget_name[0], "block")
                }
            }else{
                alert.danger("error", error.response.data.message, "block")
            }
            return { status: false }
        }
    }

    async function update(id, budget){
        try {
            const response = await axios.put(
                baseUrl+'/'+id, budget,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("budget Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            if(error.response.data.hasOwnProperty('errors')){
                if (error.response.data.errors.first_name) {
                    alert.danger("first name", error.response.data.errors.first_name[0], "block")
                }
                if (error.response.data.errors.last_name) {
                    alert.danger("last name", error.response.data.errors.last_name[0], "block")
                }
                if (error.response.data.errors.budget_name) {
                alert.danger("budget name", error.response.data.errors.budget_name[0], "block")
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
            alert.success("budget Deleted Successfully", null, "modal", 3000)
            this.budgets = this.budgets.filter(function (item) {
                return item.id !== id;
            });
        }catch(error){
            alert.danger("budget Not Deleted", null, "block", 3000)
        }
    }

   

    return { budget, budgets, getAll, getById, destroy, store, update}
})