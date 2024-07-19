<template>
    <Alert class="mx-3 sm:mx-6" />
    <aside class="fixed inset-y-0 w-96 overflow-y-auto border-r border-gray-200 py-6">
      <!-- Secondary column (hidden on smaller screens) -->
        <div class="flex items-center justify-between px-4 sm:px-4 lg:px-4">
            <h1 class="font-bold text-2xl text-gray-700">Budgets</h1>
            <routerLink to="/user/budgets/create" v-tooltip="'Add Project'"  class="group-hover:opacity-100 rounded-full text-indigo-600 p-1.5 border border-indigo-600 hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <PlusIcon class="h-3 w-3" aria-hidden="true" />
            </routerLink>
        </div>
        <div v-if="isLoading">
            <p class="flex justify-center">
                <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                    <IconLoader class="h-6 w-6" aria-hidden="true" />
                </span>
            </p>
        </div>
        <div v-else class="py-4">
            <div v-if="budgetModel.budgets.length == 0">
                <span class="text-sm text-gray-600 p-4">There is no budgets!</span>
            </div>
            <div v-else v-for="budget in budgetModel.budgets" @click="()=>{selectedBudget=budget}" class="cursor-pointer py-4 border-b group-hover:bg-gray-50 border-gray-50 px-4 sm:px-4 lg:px-4 group" :class="selectedBudget==budget ? 'bg-gray-100':'bg-white'">
                <div class="flex items-center gap-x-2">
                    <div class="w-11 rounded h-11 bg-black text-base font-bold border-b-4 relative text-gray-500 border-gray-500">
                        <div class="absolute top-1 left-1">
                            <span class="m-0 p-0">{{ shortName(budget.name) }}</span>
                        </div>
                    </div>
                    <div class="justify-between flex w-full">
                        <div class="w-full">
                            <p>
                                <span class="text-gray-800 font-bold text-sm">{{ budget.name }}</span>
                            </p>
                            <div class="flex justify-between w-full">
                                <p class="grid grid-flow-row items-center leading-3">
                                    <span class="text-blue-600 font-extrabold text-sm">
                                        {{ budget.amount }} MAD
                                    </span>
                                    <span class="text-gray-600 text-xs">Budget</span>
                                </p>
                                <p class="grid grid-flow-row items-center leading-3">
                                    <span class="text-gray-800 font-extrabold text-sm">
                                        {{ getTotalInvoices(budget.invoices) }} MAD
                                    </span>
                                    <span class="text-gray-600 text-xs">Usage</span>
                                </p>

                                <p class="grid grid-flow-row items-center leading-3">
                                    <span  :class="[{'text-red-600':budget.amount - getTotalInvoices(budget.invoices) < 0,'text-green-600':budget.amount - getTotalInvoices(budget.invoices) >= 0},'font-extrabold text-sm']">
                                        {{ budget.amount - getTotalInvoices(budget.invoices) }} MAD
                                    </span>
                                    <span class="text-gray-600 text-xs">Rest</span>
                                </p>
                            </div>
                            
                        </div>
                        <div class="self-center">
                            <button type="button" v-tooltip="'Delete'"  @click="destroy(budget.id)" class="opacity-0 group-hover:opacity-100  rounded-full text-red-600 p-1.5 border border-red-600 hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                <TrashIcon class="h-3 w-3" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </aside>
    <main class="lg:pl-4">
      <div class="xl:pl-96">
        <div class="px-4 py-10 sm:px-4 lg:px-4 lg:py-6">
          <!-- Main area -->
            <div v-if="selectedBudget!=null">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-semibold text-gray-700">{{  selectedBudget.name  }}</h1>
                    <button @click="openCreateInvoice=true" class="text-sm text-gray-600 flex gap-x-1 items-center"><PlusIcon class="h-3 w-3" aria-hidden="true" /> Add Transaction</button>
                </div>

                <div class="mt-8 flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 rounded-md">
                        <table class="min-w-full divide-y divide-gray-300 rounded-md">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th scope="col" class="whitespace-nowrap py-3.5 px-2 text-center text-sm font-semibold text-gray-900 sm:pl-0">Transaction ID</th>
                                    <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900">Details</th>
                                    <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900">Status</th>
                                    <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900">Amount</th>
                                    <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900">Created at</th>
                                    <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900">
                                        Updated at
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="invoice in selectedBudget.invoices" :key="invoice.id">
                                <td class="whitespace-nowrap py-2 px-2 text-sm text-center text-gray-500">{{ invoice.id }}</td>
                                <td class="whitespace-nowrap px-2 py-2 text-sm text-center font-medium text-gray-900">{{ invoice.details }}</td>
                                <td class="whitespace-nowrap px-2 py-2 text-sm text-center text-gray-900">{{ invoice.status }}</td>
                                <td class="whitespace-nowrap px-2 py-2 text-sm text-center text-gray-500">{{ invoice.amount }} MAD</td>
                                <td class="whitespace-nowrap px-2 py-2 text-sm text-center text-gray-500">{{ formatDate(invoice.created_at) }}</td>
                                <td class="whitespace-nowrap px-2 py-2 text-sm text-center text-gray-500">{{ formatDate(invoice.updated_at) }}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    </main>


    <TransitionRoot as="template" :show="openCreateInvoice">
    <Dialog class="relative z-10" @close="openCreateInvoice = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div class="relative">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="details" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Details</label>
                            <input v-model="details" autocomplete="details" type="text" name="details" id="details" placeholder="Enter details" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                            <input v-model="amount" autocomplete="details" type="number" step="0.01" name="details" id="details" placeholder="Enter amount" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>
                    <div class="py-3 text-right space-x-2">
                        <button @click="openCreateInvoice=false" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</button>
                        <button @click='storeInvoice' type="submit" :disabled="IsSubmitting" class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <IconLoader class="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                            Create
                        </button>
                    </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

</template>

<script setup>
    import { TrashIcon,KeyIcon,PencilSquareIcon,PlusIcon,ArrowSmallRightIcon } from '@heroicons/vue/24/outline'
    import { IconLoader } from '@tabler/icons-vue';
    import { ref, onMounted,watch } from 'vue';
    import { useAlertStore } from '@/stores/alert'
    import { useBudgetStore } from '@/stores/user/budget'
    import { useInvoiceStore } from '@/stores/user/invoice'
    import { useAuthStore } from '@/stores/user/auth'
    
    import Alert from '@/components/Alert.vue'
    import moment from 'moment'
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

    const alertModel = useAlertStore()
    const budgetModel = useBudgetStore()
    const invoiceModel = useInvoiceStore()
    const auth = useAuthStore()
    const isLoading = ref(true)
    const selectedBudget = ref(null)
    const openCreateInvoice = ref(false)

    const details = ref('')
    const amount = ref(null)
    const IsSubmitting = ref(false)

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

    const getTotalInvoices = (invoices)=>{

        const sum = invoices.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.amount;
            }, 0);

        return sum;
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

    const storeInvoice = async () => {
        alertModel.clear()
        IsSubmitting.value = true
        await invoiceModel.store({
            'details':details.value,
            'amount':amount.value,
            'budget_id':selectedBudget.value.id,
            'status':'paid',
            'user_id':auth.user.id
        })
        IsSubmitting.value = false
        openCreateInvoice.value = false
        isLoading.value = true
        await budgetModel.getAll()
        selectedBudget.value = budgetModel.budgets.filter((item)=>item.id == selectedBudget.value.id)[0]
        isLoading.value = false

    }


</script>