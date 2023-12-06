<template>
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
                <RouterLink to="/user/team" class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-700 md:ml-2 dark:text-gray-300">Team</span>
                </RouterLink>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Edit</span>
                </div>
            </li>
        </ol>
    </nav>

    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between border-b border-gray-200">
            <h1 class="my-auto text-lg font-medium text-gray-600 dark:text-gray-50">Edit User</h1>
        </div>
       
        <div class="mt-3">
            <!-- alert -->
            <Alert class="mx-3 sm:mx-6" />
            <div v-if="isLoading">
                <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                    <IconLoader class="h-6 w-6" aria-hidden="true" />
                </span>
            </div>
            <form v-else @submit="update">
                
                <div class="overflow-hidden">
                    <div class="bg-white dark:bg-gray-800 py-2 px-3 sm:px-6 mb-2">
                        
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="avatar" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Aavatar</label>
                                <select v-model="avatar"  class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <option value="avatar1.png">Chicken</option>
                                    <option value="avatar2.png">Boos</option>
                                    <option value="avatar3.png">Robot</option>
                                    <option value="avatar4.png">Eye</option>
                                </select>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="user_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">User name</label>
                                <input v-model="username" type="text" name="user_name" id="user_name" placeholder="Enter username" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="first_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">First name</label>
                                <input v-model="first_name" type="text" name="first_name" id="first_name" placeholder="Enter first name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="last_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last name</label>
                                <input v-model="last_name" type="text" name="last_name" id="last_name" placeholder="Enter last name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-800 dark:border-t-2 border-gray-600 px-4 py-3 text-right space-x-2 sm:px-6">
                    <routerLink to="/user/team" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</routerLink>
                    <button type="submit" :disabled="IsSubmitting" class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <IconLoader class="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                        Update
                    </button>
                </div>
            </form>
        </div>

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
    import { useUserStore } from '@/stores/user/user'
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';


    const route = useRoute()
    const router = useRouter()
    const auth = useAuthStore()
    const alertModel = useAlertStore()
    const userModel = useUserStore()

    const isLoading = ref(true)
    const IsSubmitting = ref(false)

    const schema = yup.object({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        username: yup.string().required(),
    });

    const { useFieldModel, errors, handleSubmit } = useForm({
        validationSchema: schema,
    });

    const [avatar,first_name, last_name, username] = useFieldModel(['avatar','first_name', 'last_name', 'username']);
    /* Fields and validation end */

    onMounted( async() => {
        await userModel.getById(route.params.id)
        avatar.value = userModel.user.avatar
        first_name.value = userModel.user.first_name
        last_name.value = userModel.user.last_name
        username.value = userModel.user.username
        isLoading.value = false
    })

    const update = handleSubmit( async (values) => {
        alertModel.clear()
        IsSubmitting.value = true
        let result = await userModel.update(userModel.user.id, values)
        IsSubmitting.value = false
        if(result.status){
            setTimeout(() => {router.push('/user/team')}, 1000);
        }
    }, onInvalidSubmit);

    function onInvalidSubmit({ errors }) {
        alertModel.clear()
        alertModel.errors(Object.values(errors))
    }
</script>