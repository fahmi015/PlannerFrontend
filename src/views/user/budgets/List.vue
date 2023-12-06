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
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Budgets</span>
                </div>
            </li>
        </ol>
    </nav>



   
    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between border-b border-gray-200">
            <h1 class="my-auto text-lg font-medium text-gray-600 dark:text-gray-50">Budget</h1>

            <routerLink to="/user/budgets/create" type="button" class="text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                <PlusIcon class="h-5 mr-1" aria-hidden="true" /> 
                Add Budget       
            </routerLink>
        </div>
       
        <div class="">
            <!-- alert -->
            <Alert class="mx-3 sm:mx-6" />
            <div class="flow-root">
                <div class="-mx-4  overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full  align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-e-lg rounded-b-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Objectives</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created at</th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">Action</span>
                                    </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-if="isLoading" class="text-center text-gray-400">
                                        <td colspan="7" class="p-2">
                                            <p class="flex justify-center">
                                                <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                                                    <IconLoader class="h-6 w-6" aria-hidden="true" />
                                                </span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr v-else-if="budgetModel.budgets.length == 0">
                                        <td colspan="7" class="p-2 text-center text-gray-500 text-sm">
                                            table empty
                                        </td>
                                    </tr>
                                    <tr v-else v-for="item in budgetModel.budgets" :key="item.id">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.id }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.name }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex items-center gap-1"><span>{{ item.date_from }}</span> <ArrowSmallRightIcon class="w-4 h-4" aria-hidden="true"/> <span>{{ item.date_to }}</span></td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.amount }} MAD</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.objectives }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(item.created_at) }}</td>
                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div class="flex justify-center text-primary dark:text-primary font-bold space-x-2">
                                                <RouterLink :to="'/user/budgets/edit/'+item.id"><PencilSquareIcon v-tooltip="'edit'" class="text-green-800 cursor-pointer font-bold h-5 w-5" aria-hidden="true" /></RouterLink>
                                                <TrashIcon v-tooltip="'remove'"  @click="destroy(item.id)" class="text-red-500 cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

 
</template>

<script setup>
    import { TrashIcon,KeyIcon,PencilSquareIcon,PlusIcon,ArrowSmallRightIcon } from '@heroicons/vue/24/outline'
    import { IconLoader } from '@tabler/icons-vue';
    import { ref, onMounted,watch } from 'vue';
    import { useAlertStore } from '@/stores/alert'
    import { useBudgetStore } from '@/stores/user/budget'
    import Alert from '@/components/Alert.vue'
    import moment from 'moment'

    const alertModel = useAlertStore()
    const budgetModel = useBudgetStore()
    const isLoading = ref(true)
 

    const formatDate = (value) => {
        return moment(value).format('DD MMM YYYY, hh:mm A')
    }
  
    /* Destroy Permission start */
    function destroy(id){
        alertModel.clear()
        alertModel.remove('remove budget','are you sure', id)
    }

    watch(alertModel, async () => {
        if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
            await budgetModel.destroy(alertModel.alert.id)
        }
    })
    /* Destroy Permission end */

    onMounted( async() => {
        await budgetModel.getAll()
        isLoading.value = false
    })

</script>