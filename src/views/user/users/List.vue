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
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Team</span>
                </div>
            </li>
        </ol>
    </nav>



   
    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between border-b border-gray-200">
            <h1 class="my-auto text-lg font-medium text-gray-600 dark:text-gray-50">Team</h1>

            <routerLink to="/user/team/create" type="button" class="text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                <UserPlusIcon class="h-5 mr-1" aria-hidden="true" /> 
                Add User       
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
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Full Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Login</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created at</th>
                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span class="sr-only">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-if="isLoading" class="text-center text-gray-400">
                                        <td colspan="5" class="p-2">
                                            <p class="flex justify-center">
                                                <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                                                    <IconLoader class="h-6 w-6" aria-hidden="true" />
                                                </span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr v-else-if="userModel.users.length == 0">
                                        <td colspan="5" class="p-2 text-center text-gray-500 text-sm">
                                            table empty
                                        </td>
                                    </tr>
                                    <tr v-else v-for="item in userModel.users" :key="item.id">
                                        
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <div class="flex items-center">
                                                <div class="h-10 w-10 flex-shrink-0">
                                                    <img class="inline-block h-10 w-10 rounded-full" :src="'/'+item.avatar" alt="" />
                                                </div>
                                                <div class="ml-2">
                                                    <div class="text-base font-medium text-gray-900 dark:text-gray-300">{{ item.first_name }} {{ item.last_name }}</div>
                                                    <div class="font-normal text-gray-500 dark:text-gray-400">{{ item.username }}</div>
                                                </div>
                                            </div>

                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(item.last_login) }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(item.created_at) }}</td>
                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div class="flex justify-center text-primary dark:text-primary font-bold space-x-2">
                                                <KeyIcon v-tooltip="'change password'" @click="editPassword(item.id)" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                                                <RouterLink :to="'/user/team/edit/'+item.id"><PencilSquareIcon v-tooltip="'edit'" class="text-green-800 cursor-pointer font-bold h-5 w-5" aria-hidden="true" /></RouterLink>
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

    <!-- Edit Password Modal -->
    <TransitionRoot as="template" :show="editPasswordModal">
        <Dialog as="div" class="relative z-50" >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
                
            <div class="fixed inset-0 z-50 overflow-y-auto sm:w-full">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative w-full transform overflow-hidden rounded-md dark:bg-gray-800 bg-white px-4 pt-5 pb-3 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-sm sm:p-6">
                            <div class="border-b-2 border-gray-200 w-full py-2 mb-7 text-gray-500 text-lg">
                                Change Password
                            </div>
                            <!-- alert block for modal -->
                            <Alert class="m-0" v-if="editPasswordModal"/>
                            <form @submit="updatePassword">
                                
                                <div class="mt-6 grid grid-cols-4 gap-6">
            
                                    <div class="col-span-4 relative">
                                        <label for="password" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Password</label>
                                        <input v-model='password' type="password" name="password" id="password" autocomplete="password" class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6" />
                                    </div>

                                    <div class="col-span-4 relative">
                                        <label for="confirm_password" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Retype password</label>
                                        <input v-model='confirm_password' type="password" name="confirm_password" id="confirm_password" autocomplete="confirm_password" class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6" />
                                    </div>
            
                                </div>
                                <div class="mt-9 flex flex-row w-full content-center justify-center items-center space-x-2">
                                    <button :disabled="IsSubmitting" @click="editPasswordModal = false; alertModel.clear()" type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                    <button type="submit" :disabled="IsSubmitting" class="button inline-flex bg-primary w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto">
                                        <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <IconLoader class="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                        Change password
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    
</template>

<script setup>
    import { TrashIcon,KeyIcon,PencilSquareIcon,UserPlusIcon } from '@heroicons/vue/24/outline'
    import { IconLoader } from '@tabler/icons-vue';
    import { ref, onMounted,watch } from 'vue';
    import { useAuthStore } from '@/stores/user/auth'
    import { useAlertStore } from '@/stores/alert'
    import { useUserStore } from '@/stores/user/user'
    import Alert from '@/components/Alert.vue'
    import { Dialog, DialogPanel, Switch, SwitchGroup, SwitchLabel, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';
    import moment from 'moment'

    const auth = useAuthStore()
    const alertModel = useAlertStore()
    const userModel = useUserStore()
    const editPasswordModal = ref(false)
    const isLoading = ref(true)
    const IsSubmitting = ref(false)
  
    /* Destroy Permission start */
    function destroy(id){
        alertModel.clear()
        alertModel.remove('remove user','are you sure', id)
    }

    watch(alertModel, async () => {
        if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
            await userModel.destroy(alertModel.alert.id)
        }
    })
    /* Destroy Permission end */

    const formatDate = (value) => {
        return moment(value).format('DD MMM YYYY, hh:mm A')
    }

    /* Fields and validation start */
    const schema = yup.object({
        password: yup.string().min(8).required(),
        confirm_password: yup.string().min(8).required(),
    });

    const { useFieldModel, errors, handleSubmit } = useForm({
        validationSchema: schema,
    });

    const [password, confirm_password] = useFieldModel(['password', 'confirm_password']);
    const updatePassword = handleSubmit( async (values) => {
        alertModel.clear()
        IsSubmitting.value = true
        if(values['password'] != values['confirm_password']){
            alertModel.danger(t('message.the_passwords_not_match'), null, "block")
            IsSubmitting.value = false
            return false
        }
        delete values['confirm_password']
        let result = await userModel.forceUpdatePassword(userModel.user.id, values)
        if(result.status){
            editPasswordModal.value = false
        }
        IsSubmitting.value = false
    }, onInvalidSubmit);

    function onInvalidSubmit({ errors }) {
        alertModel.clear()
        alertModel.danger(Object.keys(errors)[0], Object.values(errors)[0], "block")
    }

    async function editPassword(id){
        alertModel.clear()
        userModel.getById(id)
        editPasswordModal.value = true
    }

    onMounted( async() => {
        await userModel.getAll()
        isLoading.value = false
    })

</script>