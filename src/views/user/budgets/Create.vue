<template>
     <Alert class="mx-3 sm:mx-6" />
     <div class="px-4 py-10 sm:px-4 lg:px-4 lg:py-6">
        <div>
            <h1 class="text-xl font-semibold text-gray-700">Budgets</h1>
            <h1 class="text-primary font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center">
                <UserPlusIcon class="h-4 w-4 mr-1" aria-hidden="true" /> 
                Create Budget       
            </h1>
        </div>
        
        <form @submit="store">
                 <div class="overflow-hidden">
                     <div class="bg-white dark:bg-gray-800 py-2 mb-2">
                         <div class="grid grid-cols-6 gap-6">
                             <div class="col-span-6 sm:col-span-3">
                                 <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                 <input v-model="name" autocomplete="name" type="text" name="name" id="name" placeholder="Enter name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
 
                             <div class="col-span-6 sm:col-span-3">
                                 <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                                 <input v-model="amount" type="number" step="0.01" name="amount" id="amount" placeholder="Enter amount" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
 
                             <div class="col-span-6 sm:col-span-3">
                                 <label for="date_from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start at</label>
                                 <input v-model="date_from" type="date" name="date_from" id="date_from" placeholder="Enter Date" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
                             <div class="col-span-6 sm:col-span-3">
                                 <label for="date_to" class="block text-sm font-medium text-gray-700 dark:text-gray-300">End at</label>
                                 <input v-model="date_to" type="date" name="date_to" id="date_to" placeholder="Enter Date" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="bg-gray-50 dark:bg-gray-800 dark:border-t-2 border-gray-600 px-4 py-3 text-right space-x-2 sm:px-6">
                     <routerLink to="/user/budgets" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</routerLink>
                     <button type="submit" :disabled="IsSubmitting" class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                         <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                             <IconLoader class="h-5 w-5 text-white" aria-hidden="true" />
                         </span>
                         Create
                     </button>
                 </div>
             </form>
    </div>


    
 </template>
 
 <script setup>
 
 
 import { UserPlusIcon, EyeIcon, TrashIcon, PencilSquareIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
     import { IconLoader } from '@tabler/icons-vue';
     import { ref,onMounted } from 'vue'
     import { useRoute, useRouter } from 'vue-router'
     import Alert from '@/components/Alert.vue'
     import { useAlertStore } from '@/stores/alert'
     import { useAuthStore } from '@/stores/user/auth'
     import { useBudgetStore } from '@/stores/user/budget'
     import { useForm } from 'vee-validate';
     import * as yup from 'yup';
 
 

     const router = useRouter()
     const auth = useAuthStore()
     const alertModel = useAlertStore()
     const budgetModel = useBudgetStore()
 
     const IsSubmitting = ref(false)
 
     const schema = yup.object({
        name: yup.string().required(),
        amount: yup.number().required(),
        date_from: yup.date().required(),
        date_to: yup.date().required(),
     });
    
 
     const { useFieldModel, errors, handleSubmit } = useForm({
         validationSchema: schema,
     });

    
 
     const [name, amount, date_from,date_to] = useFieldModel(['name', 'amount', 'date_from','date_to']);
     /* Fields and validation end */
 
   
     const store = handleSubmit( async (values) => {
        alertModel.clear()
        IsSubmitting.value = true
        let result = await budgetModel.store(values)
        IsSubmitting.value = false
    }, onInvalidSubmit);

    function onInvalidSubmit({errors}) {
        alertModel.clear()
        alertModel.errors(Object.values(errors))
    }
 </script>