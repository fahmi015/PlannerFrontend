<template>
    <div>

         <!-- ALERT CONFIRM/REMOVE -->
         <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <TransitionRoot as="template" :show="open">
                    <Dialog as="div" class="relative z-10" >
                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </TransitionChild>
                    
                        <div class="fixed inset-0 z-10 overflow-y-auto sm:w-full">
                            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                    <DialogPanel class="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-sm sm:p-6">
                                        <div>
                                            <div :class="[
                                                    'mx-auto flex h-12 w-12 items-center justify-center rounded-full ',
                                                    {'bg-purple-100' : alert_type == 'alert-confirm'},
                                                    {'bg-red-100' : alert_type == 'alert-remove'},
                                                ]">
                                                <CheckCircleIcon v-if="alert_type == 'alert-confirm'" class="h-6 w-6 text-primary" aria-hidden="true" />
                                                <TrashIcon v-if="alert_type == 'alert-remove'" class="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div class="mt-3 text-center sm:mt-5">
                                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">{{ alert_title }}</DialogTitle>
                                                <div class="mt-2">
                                                    <p class="text-sm text-gray-500">{{ alert_message }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-5 sm:mt-6 flex flex-row w-full content-center justify-center items-center space-x-2">
                                            <button @click="_refuse" type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                                Cancel
                                            </button>
                                            <button @click="_confirm" type="button" :class="[
                                                'button inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto',
                                                {'bg-red-500' : alert_type == 'alert-remove'},
                                                {'hover:bg-red-700' : alert_type == 'alert-remove'},
                                                {'bg-primary' : alert_type == 'alert-confirm'},
                                                {'hover:bg-indigo-700' : alert_type == 'alert-confirm'},
                                            ]">
                                                Confirm
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </TransitionRoot>
            </div>
        </div>

        <div aria-live="assertive" class="pointer-events-none z-50 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
                <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <div  v-if="showerrors" class="pointer-events-auto ring-opacity-5 rounded-md bg-red-50 p-4 w-1/3">
                        <div class="flex">
                        <div class="flex-shrink-0">
                            <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">There were {{ alert_title.length }} errors with your request</h3>
                            <div class="mt-2 text-sm text-red-700">
                            <ul role="list" class="list-disc space-y-1 pl-5">
                                <li v-for="error in  alert_title">{{ error.replace('_',' ') }}</li>
                            </ul>
                            </div>
                        </div>
                        
                        </div>
                        <div class="mt-4">
                            <div class="-mx-2 -my-1.5 flex">
                                <button type="button" @click="showerrors=false" class="ml-3 rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">Dismiss</button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        

        <div aria-live="assertive" class="pointer-events-none z-50 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
                <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div  :class="['rounded-md p-4',
                                {'bg-green-50': alert_type == 'alert-success'},
                                {'bg-red-50': alert_type == 'alert-danger'},
                                {'bg-yellow-50': alert_type == 'alert-warning'},
                                {'bg-primary-50': alert_type == 'alert-notification'}
                        ]">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                   
                                    <CheckBadgeIcon v-if="alert_type == 'alert-success'" class="h-5 w-5 text-green-400" aria-hidden="true" /> 
                                    <HandRaisedIcon v-if="alert_type == 'alert-danger'" class="h-5 w-5 text-red-400" aria-hidden="true" /> 
                                    <ExclamationTriangleIcon v-if="alert_type == 'alert-warning'" class="h-5 w-5 text-yellow-400" aria-hidden="true" /> 
                                    <BellAlertIcon v-if="alert_type == 'alert-notification'" class="h-5 w-5 text-blue-400" aria-hidden="true" />
                                </div>
                                <div class="ml-3">
                                    <p :class="[
                                                    'text-sm font-medium',
                                                    {'text-green-800' : alert_type == 'alert-success'},
                                                    {'text-red-800' : alert_type == 'alert-danger'},
                                                    {'text-yellow-800' : alert_type == 'alert-warning'},
                                                    {'text-primary' : alert_type == 'alert-notification'},
                                                ]">
                                                {{ alert_title }}
                                    </p>
                                </div>
                                <div class="ml-auto pl-3">
                                    <div class="-mx-1.5 -my-1.5">
                                        <button @click="show=false" type="button" :class="['inline-flex rounded-md  p-1.5  focus:outline-none focus:ring-2  focus:ring-offset-2 ',
                                        {'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50':alert_type == 'alert-success'},
                                        {'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50':alert_type == 'alert-danger'},
                                        {'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50':alert_type == 'alert-warning'},
                                        {'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50':alert_type == 'alert-notification'},
                                        ]">
                                            <span class="sr-only">Dismiss</span>
                                            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        


       
        



    </div>
    
</template>

<script setup>
import { useAlertStore } from '@/stores/alert';
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon, BellAlertIcon, CheckBadgeIcon, CheckCircleIcon, HandRaisedIcon, TrashIcon, XMarkIcon, CheckIcon } from '@heroicons/vue/24/outline'

const alert = useAlertStore()
const open = ref(false)
const show = ref(false)
const showerrors = ref(false)

const _confirm = () => {
    alert.alert.confirm = true; 
    alert.alert.callback = true; 
    open.value = false;
}

const _refuse = () => {
    alert.alert.confirm = false; 
    alert.alert.callback = true; 
    open.value = false;
}

const alert_type = ref('')
const alert_title = ref('')
const alert_message = ref('')



watch(alert, () => {
    if(alert.alert){
        alert_type.value = alert.alert.type
        alert_title.value = alert.alert.title
        alert_message.value = alert.alert.message
    }
    if(alert.alert && !alert.alert.callback && (alert.alert.type == 'alert-confirm' || alert.alert.type == 'alert-remove') && alert.alert.display == 'modal'){
        open.value = true
        if(alert.alert.timeOut > 0){
            setTimeout(() => open.value = false, alert.alert.timeOut);
        }
    }
    if(alert.alert && !alert.alert.callback && alert.alert.type != 'alert-confirm' && alert.alert.type != 'alert-errors' && alert.alert.type != 'alert-remove' && alert.alert.display == 'modal'){
        show.value = true
        if(alert.alert.timeOut > 0){
            setTimeout(() => show.value = false, alert.alert.timeOut);
        }
    }
    if(alert.alert && !alert.alert.callback && alert.alert.type == 'alert-errors'){
        showerrors.value = true
    }
    // if(alert.alert && alert.alert.display == 'block'){
    //     if(alert.alert.timeOut > 0){
    //         setTimeout(() => alert.alert = null, alert.alert.timeOut);
    //     }
    // }
})

</script>