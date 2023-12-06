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
                 <RouterLink to="/user/tasks" class="flex items-center">
                     <svg aria-hidden="true" class="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                     </svg>
                     <span class="ml-1 text-sm font-medium text-gray-700 md:ml-2 dark:text-gray-300">Tasks</span>
                 </RouterLink>
             </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Add Task</span>
                </div>
            </li>
        </ol>
    </nav>



   
    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between border-b border-gray-200">
            <h1 class="my-auto text-lg font-medium text-gray-600 dark:text-gray-50">Create Task</h1>
        </div>
       
        <div class="">
            <!-- alert -->
            <Alert class="mx-3 sm:mx-6" />
           
                <form @submit.prevent="store" class="relative">
                    <div class="overflow-hidden rounded-lg">
                    <label for="title" class="sr-only">Title</label>
                    <input type="text" name="title" v-model="title" id="title" class="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0" placeholder="Title" />
                    <label for="description" class="sr-only">Description</label>
                    <textarea v-model="task" rows="2" name="description" id="description" class="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Write a description..." />

                    <!-- Spacer element to match the height of the toolbar -->
                    <div aria-hidden="true">
                        <div class="py-2">
                        <div class="h-9" />
                        </div>
                        <div class="h-px" />
                        <div class="py-2">
                        <div class="py-px">
                            <div class="h-9" />
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="absolute inset-x-px bottom-0">
                    <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
                    <div class="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
                        
                        


                        <Listbox as="div" v-model="labelled" class="flex-shrink-0">
                        <ListboxLabel class="sr-only">Add a label</ListboxLabel>
                            <div class="relative">
                                <ListboxButton class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                <TagIcon :class="[labelled.value === null ? 'text-gray-300' : 'text-gray-500', 'h-5 w-5 flex-shrink-0 sm:-ml-1']" aria-hidden="true" />
                                <span :class="[labelled.value === null ? '' : 'text-gray-900', 'hidden truncate sm:ml-2 sm:block']">{{ labelled.value === null ? 'Label' : labelled.name }}</span>
                                </ListboxButton>

                                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption as="template" v-for="label in labels" :key="label.value" :value="label" v-slot="{ active }">
                                    <li :class="[active ? 'bg-gray-100' : 'bg-white', 'relative cursor-default select-none px-3 py-2']">
                                        <div class="flex items-center">
                                        <span class="block truncate font-medium">{{ label.name }}</span>
                                        </div>
                                    </li>
                                    </ListboxOption>
                                </ListboxOptions>
                                </transition>
                            </div>
                        </Listbox>

                        <Listbox as="div" v-model="dated" class="flex-shrink-0">
                        <ListboxLabel class="sr-only">Add a due date</ListboxLabel>
                            <div class="relative">
                                <ListboxButton class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                <CalendarIcon :class="[dated.value === null ? 'text-gray-300' : 'text-gray-500', 'h-5 w-5 flex-shrink-0 sm:-ml-1']" aria-hidden="true" />
                                <span :class="[dated.value === null ? '' : 'text-gray-900', 'hidden truncate sm:ml-2 sm:block']">{{ dated.value === null ? 'Due date' : dated.name }}</span>
                                </ListboxButton>

                                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption as="template" v-for="dueDate in dueDates" :key="dueDate.value" :value="dueDate" v-slot="{ active }">
                                    <li :class="[active ? 'bg-gray-100' : 'bg-white', 'relative cursor-default select-none px-3 py-2']">
                                        <div class="flex items-center">
                                        <span class="block truncate font-medium">{{ dueDate.name }}</span>
                                        </div>
                                    </li>
                                    </ListboxOption>
                                </ListboxOptions>
                                </transition>
                            </div>
                        </Listbox>
                    </div>
                    <div class="flex items-center justify-end space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                        <div class="flex gap-x-2">
                            <routerLink to="/user/projects" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</routerLink>
                            <button type="submit" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                        </div>
                    </div>
                    </div>
                </form>
              
        </div>
    </div>

 
</template>

<script setup>
    
    import { ref, onMounted } from 'vue';
    import { useAlertStore } from '@/stores/alert'
    import { useTaskStore } from '@/stores/user/task'
    import Alert from '@/components/Alert.vue'
    import { useRoute,useRouter } from 'vue-router'
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
    import { CalendarIcon, TagIcon } from '@heroicons/vue/20/solid'
    
    const alertModel = useAlertStore()
    const taskModel = useTaskStore()
    const route = useRoute()
    const router = useRouter()

    const IsSubmitting = ref(false)
    const title = ref('')
    const task  = ref('')
    const labels = [
        { name: 'Meeting', value: 'Meeting' },
        { name: 'Coding', value: 'Coding' },
        { name: 'Posting', value: 'Posting' },
        { name: 'Thinking', value: 'Thinking' },
        { name: 'Other', value: 'Other' },
    ]

    const dueDates = [
        { name: 'No due date', value: 'No due date' },
        { name: 'Today', value:'Today'},
        { name: 'Tomorrow', value:'Tomorrow'},
        { name: 'After Tomorrow', value:'After Tomorrow'},
        { name: 'Week', value:'Week'},
        { name: 'Next Week', value:'Next Week'},
        { name: 'Month', value:'Month'},
        { name: 'Next Month', value:'Next Month'},
    ]
    const labelled = ref(labels[0])
    const dated = ref(dueDates[0])
    
    onMounted(()=>{
        if(localStorage.getItem('due')){
            dated.value = JSON.parse(localStorage.getItem('due'))
        }
        if(localStorage.getItem('type')){
            labelled.value = JSON.parse(localStorage.getItem('type'))
        }
    })

    const store = async () => {    
        IsSubmitting.value = true
        if(title.value == '' && task.value == ''){
            alertModel.danger("you can let title and description both empty at same time", null, "modal", 6000)
            IsSubmitting.value = false
            return false
        }
        let result = await taskModel.store({
            amount:0,
            title:title.value,
            task:task.value,
            type:labelled.value.value,
            status:'pending',
            project_id:route.query.project_id,
            date_from:'2023-12-12',
            date_to:'2023-12-12',
            due:dated.value.value
        })
        if(result.status){
            IsSubmitting.value = false
            localStorage.setItem('due',JSON.stringify(dated.value));
            localStorage.setItem('type',JSON.stringify(labelled.value));
            setTimeout(() => {router.push('/user/projects')}, 1000);
        }
    };

</script>