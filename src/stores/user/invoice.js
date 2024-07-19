import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `${import.meta.env.VITE_Api_Url}/user/invoices`;

export const useInvoiceStore = defineStore('invoice', () => {

    const invoice = ref('')
    const invoices = ref([])
   

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
            this.invoices = response.data;
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
            this.invoice = response.data
        } catch (error) {
            console.log('get invoice error')
        }
    }

   
    async function store(invoice){
        try {
            const response = await axios.post(
                baseUrl, invoice,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("invoice Created Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            if(error.response.data.hasOwnProperty('errors')){
                if (error.response.data.errors.first_name) {
                    alert.danger("first name", error.response.data.errors.first_name[0], "block")
                }
                if (error.response.data.errors.last_name) {
                    alert.danger("last name", error.response.data.errors.last_name[0], "block")
                }
                if (error.response.data.errors.invoice_name) {
                    alert.danger("invoice name", error.response.data.errors.invoice_name[0], "block")
                }
            }else{
                alert.danger("error", error.response.data.message, "block")
            }
            return { status: false }
        }
    }

    async function update(id, invoice){
        try {
            const response = await axios.put(
                baseUrl+'/'+id, invoice,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("invoice Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            if(error.response.data.hasOwnProperty('errors')){
                if (error.response.data.errors.first_name) {
                    alert.danger("first name", error.response.data.errors.first_name[0], "block")
                }
                if (error.response.data.errors.last_name) {
                    alert.danger("last name", error.response.data.errors.last_name[0], "block")
                }
                if (error.response.data.errors.invoice_name) {
                alert.danger("invoice name", error.response.data.errors.invoice_name[0], "block")
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
            alert.success("invoice Deleted Successfully", null, "modal", 3000)
            this.invoices = this.invoices.filter(function (item) {
                return item.id !== id;
            });
        }catch(error){
            alert.danger("invoice Not Deleted", null, "block", 3000)
        }
    }

   

    return { invoice, invoices, getAll, getById, destroy, store, update}
})