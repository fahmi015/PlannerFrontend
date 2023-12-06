<template>
    <!-- breadcrumb -->
    <nav class="mb-3 px-3 py-3 text-gray-700 dark:text-gray-50 bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <RouterLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-white">
                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Dashboard
                </RouterLink>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Projects</span>
                </div>
            </li>
        </ol>
    </nav>



   
    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between border-b border-gray-200">
            <h1 class="my-auto text-xl font-medium text-gray-600 dark:text-gray-50">Projects</h1>

            <routerLink to="/user/projects/create" type="button" class="text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                <PlusIcon class="h-5 mr-1" aria-hidden="true" /> 
                Add Project       
            </routerLink>
        </div>
       
        <div class="p-4">
            <!-- alert -->
            <Alert class="mx-3 sm:mx-6" />
            <div v-if="isLoading">
                <p class="flex justify-center">
                    <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                        <IconLoader class="h-6 w-6" aria-hidden="true" />
                    </span>
                </p>
            </div>
            <div v-else>
                <div v-if="projectModel.projects.length == 0">
                    <span class="text-sm text-gray-600">There is no projects!</span>
                </div>
                <div v-else v-for="project in projectModel.projects" class="mb-6">
                    <div class="flex justify-between items-center gap-x-1">
                        <div class="flex items-center gap-1 group relative">
                            <div v-tooltip="project.type" :class="['w-11 rounded h-11 bg-black text-base font-bold border-b-4', {'text-green-500 border-green-500': project.type === 'markting'}, {'text-red-500 border-red-500': project.type === 'software'}, {'text-blue-500 border-blue-500': project.type === 'opertion'}, {'text-orange-500 border-orange-500': project.type === 'other'}]">
                                <div class="absolute top-1 left-1">
                                    <span class="m-0 p-0">{{ shortName(project.title) }}</span>
                                </div>
                            </div>
                            <div>
                                <span class="text-gray-800 font-bold text-lg">{{ project.title }}</span>
                                <span class="text-gray-600 font-extralight text-lg ml-1">({{ project.tasks.length }})</span>
                            </div>
                            <button type="button" v-tooltip="'Show'" class="opacity-0 group-hover:opacity-100 rounded-full text-indigo-600 p-1.5 border border-indigo-600 hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <EyeIcon class="h-3 w-3" aria-hidden="true" />
                            </button>

                            <button type="button" v-tooltip="'Edit'" class="opacity-0 group-hover:opacity-100 rounded-full text-indigo-600 p-1.5 border border-indigo-600 hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <PencilIcon class="h-3 w-3" aria-hidden="true" />
                            </button>
                            
                            <button type="button" v-tooltip="'Delete'"  @click="destroyProject(project.id)" class="opacity-0 group-hover:opacity-100 rounded-full text-red-600 p-1.5 border border-red-600 hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                <TrashIcon class="h-3 w-3" aria-hidden="true" />
                            </button>
                        </div>
                        <div class="flex -space-x-2 overflow-hidden">
                            <img v-for="user in project.users" v-tooltip="user.username" class="inline-block h-8 w-8 rounded-full ring-2 ring-white" :src="'/'+user.avatar" :alt="user.username" />
                            
                        </div>
                    
                    </div>
                    <div class="pl-10">
                        <ul role="list" class="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                            <RouterLink tag="li" :to="'/user/tasks/create?project_id='+project.id" class="cursor-pointer p-4 rounded border border-gray-200 border-dashed text-gray-600 flex justify-center items-center gap-x-3">
                                <PlusIcon class="w-6 h-6" /> <span class="text-lg">New Task</span>
                            </RouterLink>
                            <li v-for="task in project.tasks" :class="['p-4 rounded border',{'border-gray-200':task.status!='done'},{'border-gray-50':task.status=='done'}]">
                                <div class="flex gap-x-3">
                                    <div class="flex gap-x-1">
                                        <div v-if="task.status!='done'" v-tooltip="'Done'" class="bg-green-100 w-10 h-10 flex justify-center items-center rounded cursor-pointer" @click="update_status(task.id,'done')">
                                            <CheckIcon class="w-5 h-5 text-green-700"  aria-hidden="true"/>
                                        </div>
                                        <div v-else class="bg-orange-100 w-10 h-10 flex justify-center items-center rounded cursor-pointer" v-tooltip="'Pending'" @click="update_status(task.id,'pending')">
                                            <ArrowPathIcon class="w-5 h-5 text-orange-700"  aria-hidden="true"/>
                                        </div>
                                        <div @click="destroy(task.id)" v-tooltip="'Delete'" class="bg-gray-100 w-10 h-10 flex justify-center items-center rounded cursor-pointer">
                                            <TrashIcon class="w-5 h-5 text-gray-700"  aria-hidden="true"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p :class="['text-base font-semibold leading-6',{'text-gray-900':task.status!='done'},{'text-gray-400':task.status=='done'}]">
                                                {{ task.title }}
                                            </p>
                                            <p :class="['text-xs font-semibold leading-6',{'text-gray-700':task.status!='done'},{'text-gray-400':task.status=='done'}]">
                                                {{ task.task }}
                                            </p>
                                        </div>
                                        <div :class="['mt-1 flex items-center gap-x-2 text-xs leading-5',{'text-gray-700':task.status!='done'},{'text-gray-400':task.status=='done'}]">
                                            <p>
                                                {{task.type}}
                                            </p>
                                            <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                                                <circle cx="1" cy="1" r="1" />
                                            </svg>
                                            <p>
                                                {{task.due}}
                                            </p>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>            
        </div>
    </div>

   
 
</template>

<script setup>
    import { TrashIcon,KeyIcon,PencilSquareIcon,ArchiveBoxIcon,ArrowPathIcon,CheckIcon,PlusIcon,ArrowSmallRightIcon, PencilIcon, EyeIcon } from '@heroicons/vue/24/outline'
    import { IconLoader } from '@tabler/icons-vue';
    import { ref, onMounted,watch } from 'vue';
    import { useAlertStore } from '@/stores/alert'
    import { useProjectStore } from '@/stores/user/project'
    import { useTaskStore } from '@/stores/user/task'
    import Alert from '@/components/Alert.vue'
    import moment from 'moment'
  
    const alertModel = useAlertStore()
    const alertModel2 = useAlertStore()
    const projectModel = useProjectStore()
    const taskModel = useTaskStore()
    const isLoading = ref(true)
   
    const formatDate = (value) => {
        return moment(value).format('DD MMM YYYY, hh:mm A')
    }

    const formatDateByDay = (value) => {
        return moment(value).format('DD MMM')
    }
  
    /* Destroy Permission start */
    function destroy(id){
        alertModel.clear()
        alertModel.remove('Remove Task','are you sure', id)
    }

    watch(alertModel, async () => {
        if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
            await taskModel.destroy(alertModel.alert.id)
            isLoading.value = true
            await projectModel.getAll()
            isLoading.value = false
        }
    })
    /* Destroy Permission end */

    /* Destroy Permission start */
    function destroyProject(id){
        alertModel2.clear()
        alertModel2.remove('Remove Project','are you sure', id)
    }

    watch(alertModel2, async () => {
        if(alertModel2.alert && alertModel2.alert.callback && alertModel2.alert.confirm){
            await projectModel.destroy(alertModel2.alert.id)
            isLoading.value = false
        }
    })
    /* Destroy Permission end */

    

    onMounted( async() => {
        await projectModel.getAll()
        isLoading.value = false
    })

    const update_status = async(id,status)=>{
        await taskModel.update_status(id,{
            'status':status
        })
        isLoading.value = true
        await projectModel.getAll()
        isLoading.value = false
    }

    const shortName=(inputString) => {
        // Split the input string into an array of words
        const words = inputString.split(' ');

        // Check if there is more than one word
        if (words.length > 1) {
            return words[0][0]+""+words[1][0]; // Return "MP" for multiple words
        } else {
            return words[0][0]+""+words[0][1]; // Return "MA" for a single word
        }
    }

</script>