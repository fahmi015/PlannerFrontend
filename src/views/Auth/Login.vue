
<template>
  
    <div class="flex min-h-full flex-1 h-screen">
      <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
               don't forget to check your daily
              {{ ' ' }}
              <span class="font-semibold text-indigo-600 hover:text-indigo-500">tasks</span>
            </p>
          </div>
  
          <div class="mt-10">
            <div>
              <form class="space-y-6" @submit.prevent="submit">
                <!-- alert -->
                <Alert />
                <div>
                  <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                  <div class="mt-2">
                    <input id="username" v-model="username"  name="username" type="text" autocomplete="username" class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
  
                <div>
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  <div class="mt-2">
                    <input id="password" v-model="password" name="password" type="password" autocomplete="current-password"  class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
  
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-700">Remember me</label>
                  </div>
                </div>
  
                <div>
                  
                  <button type="submit" :disabled="IsSubmitting" class="relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <span v-if="!IsSubmitting" class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <LockClosedIcon class="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                            <span v-else class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                        </span>
                        Log in
                    </button>
                </div>
              </form>
            </div>
  
            
          </div>
        </div>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
      </div>
    </div>
  </template>
  

  <script setup>
    import { Cog6ToothIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/user/auth';
    import Alert from '@/components/Alert.vue'
    import { useAlertStore } from '@/stores/alert'

    const auth = useAuthStore()
    const alertModel = useAlertStore()

    const username = ref('');
    const password = ref('');

    const IsSubmitting = ref(false)

    const submit = async () => {
        alertModel.clear()
        IsSubmitting.value = true
        let result = await auth.login(username.value, password.value)
        IsSubmitting.value = false
        if(!result){
          console.log("err")
        }
    };
</script>