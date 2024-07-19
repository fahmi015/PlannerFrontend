<template>
     <Alert class="mx-3 sm:mx-6" />
     <div class="px-4 py-10 sm:px-4 lg:px-4 lg:py-6">
        <div>
            <h1 class="text-xl font-semibold text-gray-700">Team</h1>
            <h1 class="text-primary font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center">
                <UserPlusIcon class="h-4 w-4 mr-1" aria-hidden="true" /> 
                Create User       
            </h1>
        </div>
        <form @submit="store">
                 
                 <div class="overflow-hidden">
                     <div class="bg-white dark:bg-gray-800 py-2 mb-2">
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
                                 <input v-model="username" autocomplete="username" type="text" name="user_name" id="user_name" placeholder="Enter username" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
 
                             <div class="col-span-6 sm:col-span-3">
                                 <label for="first_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">First name</label>
                                 <input v-model="first_name" type="text" name="first_name" id="first_name" placeholder="Enter first name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
 
                             <div class="col-span-6 sm:col-span-3">
                                 <label for="last_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last name</label>
                                 <input v-model="last_name" type="text" name="last_name" id="last_name" placeholder="Enter last name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
                             <div class="col-span-6 sm:col-span-3">
                                <label for="last_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Permission</label>
                                <Multiselect :searchable="true" :close-on-select="false" v-model="selectedPermission" mode="tags" :options="permissions"/>
                            </div>
                             <div class="col-span-6 sm:col-span-3">
                                 <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                 <input v-model="password" autocomplete="password" type="password" name="password" id="password" placeholder="Enter password" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>

                             <div class="col-span-6 sm:col-span-3">
                                 <label for="confirm_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                 <input v-model="confirm_password" autocomplete="new-password" type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                             </div>
                         </div>
                         <div>

                         </div>
                     </div>
                 </div>
                 <div class="bg-gray-50 dark:bg-gray-800 dark:border-t-2 border-gray-600 px-4 py-3 text-right space-x-2 sm:px-6">
                     <routerLink to="/user/team" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</routerLink>
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
     import { useUserStore } from '@/stores/user/user'
     import { usePermissionStore } from '@/stores/user/permission'
     import { useForm } from 'vee-validate';
     import * as yup from 'yup';
     import Multiselect from '@vueform/multiselect'
 

     const router = useRouter()
     const auth = useAuthStore()
     const alertModel = useAlertStore()
     const userModel = useUserStore()
     const permissionModel = usePermissionStore()
 
     const IsSubmitting = ref(false)
    const permissions = ref([])
    const selectedPermission = ref([])

     const schema = yup.object({
         first_name: yup.string().required(),
         last_name: yup.string().required(),
         username: yup.string().required(),
         password: yup.string(),
         confirm_password:yup.string()
     });
    
 
     const { useFieldModel, errors, handleSubmit } = useForm({
         validationSchema: schema,
     });

    
 
     const [first_name, last_name, username,password,confirm_password,avatar] = useFieldModel(['first_name', 'last_name', 'username','password','confirm_password','avatar']);
     /* Fields and validation end */
 
   
     onMounted(async()=>{
        await permissionModel.getAll()
        permissions.value = permissionModel.permissions.map((item)=>{return {'value':item.id,"label":item.name}})
     })

     const store = handleSubmit( async (values) => {
        alertModel.clear()
        IsSubmitting.value = true
        if(values['password'] != values['confirm_password']){
            alertModel.danger("the passwords not match", null, "modal", 3000)
            IsSubmitting.value = false
            return false
        }
        delete values['confirm_password']
        values['permissions_id'] = selectedPermission.value
        let result = await userModel.store(values)
        IsSubmitting.value = false
    }, onInvalidSubmit);

    function onInvalidSubmit({errors}) {
        alertModel.clear()
        alertModel.errors(Object.values(errors))
    }
 </script>
 <style src="@vueform/multiselect/themes/default.css"></style>