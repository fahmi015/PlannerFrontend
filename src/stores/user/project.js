import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `${import.meta.env.VITE_Api_Url}/user/projects`;

export const useProjectStore = defineStore('project', () => {

    const project = ref('')
    const projects = ref([])
   

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
            this.projects = response.data;
        } catch (error) {
            console.log('get projects error')
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
            this.project = response.data
        } catch (error) {
            console.log('get project error')
        }
    }

   
    async function store(project){
        try {
            const response = await axios.post(
                baseUrl, project,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Project Created Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            
            return { status: false }
        }
    }

    async function update(id, project){
        try {
            const response = await axios.put(
                baseUrl+'/'+id, project,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("project Updated Successfully", null, "modal", 3000)
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
            alert.success("project Deleted Successfully", null, "modal", 3000)
            this.projects = this.projects.filter(function (item) {
                return item.id !== id;
            });
        }catch(error){
            alert.danger("project Not Deleted", null, "block", 3000)
        }
    }

   

    return { project, projects, getAll, getById, destroy, store, update}
})