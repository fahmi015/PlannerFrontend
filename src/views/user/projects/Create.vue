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
                 <RouterLink to="/user/projects" class="flex items-center">
                     <svg aria-hidden="true" class="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                     </svg>
                     <span class="ml-1 text-sm font-medium text-gray-700 md:ml-2 dark:text-gray-300">Projects</span>
                 </RouterLink>
             </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Add Project</span>
                </div>
            </li>
        </ol>
    </nav>



   
    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between border-b border-gray-200">
            <h1 class="my-auto text-lg font-medium text-gray-600 dark:text-gray-50">Create Project</h1>
        </div>
       
        <div class="">
            <!-- alert -->
            <Alert class="mx-3 sm:mx-6" />
            <form @submit="store">
                 
                 <div class="overflow-hidden">
                     <div class="bg-white dark:bg-gray-800 py-4 px-3 sm:px-6 mb-2">
                         <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3" >
                                 <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Team is always first 🎯</label>
                                 <div v-if="isLoading">
                                    <p class="flex justify-center">
                                        <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                                        <IconLoader class="h-6 w-6" aria-hidden="true" />
                                        </span>
                                    </p>
                                </div>
                                 <Listbox v-model="selectedPerson" :multiple="true" v-else>
                                    <div class="relative mt-1">
                                        <ListboxButton class="relative w-full dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block  rounded-md border-gray-300 border text-left py-2 px-3  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                            <div class="block truncate" v-if="selectedPerson.length > 0">
                                                <div class="flex gap-x-2">
                                                    <div v-for="user in selectedPerson" class="flex items-center gap-x-1 rounded-full bg-gray-50 px-2 text-xs py-0.5 font-medium text-gray-500 hover:bg-gray-100">
                                                        <img :src="'/'+user.avatar" alt="" srcset="" class="h-4 w-4 flex-shrink-0 rounded-full">
                                                        <p class="hidden truncate sm:ml-2 sm:block ">{{ user.username }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <span class="block truncate">select users</span>
                                            </div>
                                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon
                                                class="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                                />
                                            </span>
                                        </ListboxButton>

                                        <transition
                                        leave-active-class="transition duration-100 ease-in"
                                        leave-from-class="opacity-100"
                                        leave-to-class="opacity-0"
                                        >
                                        <ListboxOptions
                                            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                                        >
                                            <ListboxOption
                                            v-slot="{ active, selected }"
                                            v-for="user in userModel.users.filter((user)=>user.id!=auth.user.id)"
                                            :key="user.id"
                                            :value="user"
                                            as="template"
                                            >
                                            <li
                                                :class="[
                                                active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 flex justify-between pl-4 pr-4',
                                                ]"
                                            >
                                                <div class="flex items-center gap-x-1">
                                                    <img :src="'/'+user.avatar" alt="" srcset="" class="h-4 w-4 flex-shrink-0 rounded-full">
                                                    <span
                                                    :class="[
                                                        selected ? 'font-medium' : 'font-normal',
                                                        'block truncate',
                                                    ]"
                                                    >{{ user.username }}</span
                                                    >
                                                </div>
                                                <div v-if="selected" class="flex items-center pl-3 text-indigo-600">
                                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                </div>
                                            </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                             </div>

                             <div class="col-span-6 sm:col-span-3">
                                <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">What a industry you will work on</label>
                                <select name="type" id="type" v-model="type" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <option>markting</option>
                                    <option>software</option>
                                    <option>opertion</option>
                                    <option>other</option>
                                </select>
                             </div>

                             <div class="col-span-6 sm:col-span-3">
                                 <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name your project</label>
                                 <input v-model="title" autocomplete="title" type="text" name="user_name" id="title" placeholder="Enter name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
                             

                            
                             <div class="col-span-6 sm:col-span-3">
                                 <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Add a description</label>
                                 <input v-model="description" type="text" name="description" id="description" placeholder="Enter description" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
 
                             <div class="col-span-6 sm:col-span-3">
                                 <label for="objectives" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tell us what it's for</label>
                                 <input v-model="objectives" type="text" name="objectives" id="objectives" placeholder="Enter objectives" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
                         </div>
                         <hr class="my-6">
                         <div class="grid grid-cols-6 gap-6">

                            <div class="col-span-6 sm:col-span-3">
                                <label for="date_from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start at</label>
                                <input v-model="date_from" autocomplete="date_from" type="date" name="user_name" id="user_name" placeholder="Enter name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="date_to" class="block text-sm font-medium text-gray-700 dark:text-gray-300">End at</label>
                                <input v-model="date_to" type="date" name="date_to" id="date_to" placeholder="Enter description" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>

                            <div class="col-span-6 sm:col-span-3" >
                                <label for="last_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Budget Type</label>
                                <div v-if="isLoading">
                                    <p class="flex justify-center">
                                        <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                                        <IconLoader class="h-6 w-6" aria-hidden="true" />
                                        </span>
                                    </p>
                                </div>
                                <select v-else name="budget_id" id="budget_id" v-model="budget_id" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <option v-for="item in budgetModel.budgets" :value="item.id">{{ item.name }}</option>
                                </select>
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tel us how much you need</label>
                                <input v-model="amount" type="number" step="0.01" name="amount" id="amount" placeholder="Enter budget" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>
                        </div>
                     </div>
                 </div>
                 <div class="bg-gray-50 dark:bg-gray-800 dark:border-t-2 border-gray-600 px-4 py-3 text-right space-x-2 sm:px-6">
                     <routerLink to="/user/projects" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</routerLink>
                     <button type="submit" :disabled="IsSubmitting" class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                         <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                             <IconLoader class="h-5 w-5 text-white" aria-hidden="true" />
                         </span>
                         Create
                     </button>
                 </div>
             </form>         
        </div>
    </div>

 
</template>

<script setup>
    import { TrashIcon,KeyIcon,PencilSquareIcon,PlusIcon,ArrowSmallRightIcon } from '@heroicons/vue/24/outline'
    import { IconLoader } from '@tabler/icons-vue';
    import { ref, onMounted,watch } from 'vue';
    import { useAlertStore } from '@/stores/alert'
    import { useProjectStore } from '@/stores/user/project'
    import { useAuthStore } from '@/stores/user/auth';
    import { useUserStore } from '@/stores/user/user'
    import { useBudgetStore } from '@/stores/user/budget'
    import Alert from '@/components/Alert.vue'
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';

    import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    } from '@headlessui/vue'
    import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'


    const selectedPerson = ref([])
   

    const alertModel = useAlertStore()
    const projectModel = useProjectStore()
    const budgetModel = useBudgetStore()
    const userModel = useUserStore()
    const auth = useAuthStore()
    const isLoading = ref(true)
    const IsSubmitting = ref(false)
 

    onMounted( async() => {
        await budgetModel.getAll()
        await userModel.getAll()
        selectedPerson.value.push({
            id:auth.user.id,
            username:auth.user.username,
            avatar:auth.user.avatar,
        })
        
        isLoading.value = false
        
    })

    const schema = yup.object({
        title: yup.string().required(),
        description: yup.string(),
        objectives: yup.string(),
        amount: yup.number(),
        budget_id:yup.number(),
        date_from: yup.date().required(),
        date_to: yup.date().required(),
        type:yup.string(),
     });
    
 
     const { useFieldModel, errors, handleSubmit } = useForm({
         validationSchema: schema,
     });

    
 
     const [title, description, objectives,amount,date_from,date_to,budget_id,type] = useFieldModel(['title', 'description', 'objectives','amount','date_from','date_to','budget_id','type']);
     /* Fields and validation end */


     const store = handleSubmit( async (values) => {
        alertModel.clear()
        IsSubmitting.value = true
        values['users_id'] = selectedPerson.value.map((item)=>item.id)
        let result = await projectModel.store(values)
        IsSubmitting.value = false
    }, onInvalidSubmit);

    function onInvalidSubmit({errors}) {
        alertModel.clear()
        alertModel.errors(Object.values(errors))
    }
</script>