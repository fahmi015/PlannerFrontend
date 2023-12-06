import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `${import.meta.env.VITE_Api_Url}/user/tasks`;

export const useTaskStore = defineStore('task', () => {

    const task = ref('')
    const tasks = ref([])
   

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
            this.tasks = response.data;
        } catch (error) {
            console.log('get tasks error')
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
            this.task = response.data
        } catch (error) {
            console.log('get task error')
        }
    }

   
    async function store(task){
        try {
            const response = await axios.post(
                baseUrl, task,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("task Created Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            
            return { status: false }
        }
    }

    async function update(id, task){
        try {
            const response = await axios.put(
                baseUrl+'/'+id, task,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Task Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            return { status: false }
        }
    }

    async function update_status(id, values){
        try {
            const response = await axios.put(
                baseUrl+'/'+id+'/update-status', values,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Task Status Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
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
            alert.success("Task Deleted Successfully", null, "modal", 3000)
            this.tasks = this.tasks.filter(function (item) {
                return item.id !== id;
            });
        }catch(error){
            alert.danger("Task Not Deleted", null, "block", 3000)
        }
    }

   

    return { task, tasks, getAll, getById, destroy, store, update,update_status}
})