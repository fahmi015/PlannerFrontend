<template>
    <Alert class="mx-3 sm:mx-6" />
    <div class="px-4 py-10 sm:px-4 lg:px-4 lg:py-6">
        <div>
            <h1 class="text-xl font-semibold text-gray-700">Team</h1>
            <routerLink to="/user/team/create"  class="text-primary hover:underline font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center">
                <UserPlusIcon class="h-4 w-4 mr-1" aria-hidden="true" /> 
                Create User       
            </routerLink>

            <div class="flow-root">
                <div class="-mx-4 py-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full  align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
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