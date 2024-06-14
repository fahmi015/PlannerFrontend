<template>
    <Alert class="mx-3 sm:mx-6" />
    <main class="lg:pl-4">
      <div class="xl:pl-96">
        <div class="px-4 py-10 sm:px-4 lg:px-4 lg:py-6">
          <!-- Main area -->
            <div v-if="selectedProject!=null">
                <div>
                    <h1 class="text-xl font-semibold text-gray-700">{{ selectedProject.title }}</h1>
                </div>
                <div class="my-4">
                    <ul role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                        <li class="overflow-hidden h-[calc(100vh-6rem)]">
                            <h3 class="rounded-md p-1 inline-flex items-center bg-gray-50 mb-2">
                                <IconHourglassEmpty class="h-5 w-5 shrink-0 text-gray-700" />
                                <span class="text-sm text-gray-600 font-semibold">To Do</span>
                            </h3>
                            <div class="bg-gray-50 h-full rounded-md p-2">
                                
                                    <div class="bg-white border border-gray-100 rounded-md mb-2 p-2" v-for="task in selectedProject.tasks.filter((task)=>task.status == 'todo')">
                                        <h4 class="text-gray-800 text-sm font-semibold">{{ task.title }}</h4>
                                        <p class="text-gray-600 text-xs mb-1">{{ task.task }}</p>
                                        <div class='flex items-center justify-between'>
                                            <span class="text-xs font-extralight text-gray-500">{{ task.created_at }}</span>
                                            <div class="flex items-center gap-x-1">
                                                <button @click="destroyTask(task.id)" v-tooltip="'Delete'" class="bg-gray-100 w-5 h-5 flex justify-center items-center rounded cursor-pointer">
                                                    <TrashIcon class="w-4 h-4 text-gray-700"  aria-hidden="true"/>
                                                </button>
                                                <button @click="updateStatus(task.id,'in_progress')" v-tooltip="'In Progress'" class="bg-blue-100 w-5 h-5 flex justify-center items-center rounded cursor-pointer">
                                                    <IconHourglassLow class="w-4 h-4 text-blue-700"  aria-hidden="true"/>
                                                </button>
                                                <button @click="updateStatus(task.id,'done')" v-tooltip="'Done'" class="bg-green-100 w-5 h-5 flex justify-center items-center rounded cursor-pointer">
                                                    <CheckIcon class="w-4 h-4 text-green-700"  aria-hidden="true"/>
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                
                                <button @click="()=>{open=true;selectedStatus = 'todo'}" class="text-sm text-gray-600 flex gap-x-1 items-center"><PlusIcon class="h-3 w-3" aria-hidden="true" /> Add Task</button>
                            </div>
                        </li>

                        <li class="overflow-hidden h-[calc(100vh-6rem)]">
                            <h3 class="rounded-md p-1 inline-flex items-center bg-blue-100 mb-2">
                                <IconHourglassLow class="h-5 w-5 shrink-0 text-gray-700" />
                                <span class="text-sm text-gray-600 font-semibold">In Progress</span>
                            </h3>
                            <div class="bg-blue-50 h-full rounded-md p-2">
                                <div class="bg-white border border-gray-100 rounded-md mb-2 p-2" v-for="task in selectedProject.tasks.filter((task)=>task.status == 'in_progress')">
                                    <h4 class="text-gray-800 text-sm font-semibold">{{ task.title }}</h4>
                                    <p class="text-gray-600 text-xs mb-1">{{ task.task }}</p>
                                    <div class='flex items-center justify-between'>
                                        <span class="text-xs font-extralight text-gray-500">{{ task.created_at }}</span>
                                        <div class="flex items-center gap-x-1">
                                            <button @click="destroyTask(task.id)" v-tooltip="'Delete'" class="bg-gray-100 w-5 h-5 flex justify-center items-center rounded cursor-pointer">
                                                <TrashIcon class="w-4 h-4 text-gray-700"  aria-hidden="true"/>
                                            </button>
                                            <button @click="updateStatus(task.id,'done')" v-tooltip="'Done'" class="bg-green-100 w-5 h-5 flex justify-center items-center rounded cursor-pointer">
                                                <CheckIcon class="w-4 h-4 text-green-700"  aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button @click="()=>{open=true;selectedStatus = 'in_progress'}" class="text-sm text-gray-600 flex gap-x-1 items-center"><PlusIcon class="h-3 w-3" aria-hidden="true" /> Add Task</button>
                            </div>
                        </li>

                        <li class="overflow-hidden h-[calc(100vh-6rem)]">
                            <h3 class="rounded-md p-1 inline-flex items-center bg-green-100 mb-2">
                                <IconHourglassOff class="h-5 w-5 shrink-0 text-gray-700" />
                                <span class="text-sm text-gray-600 font-semibold">Done</span>
                            </h3>
                            <div class="bg-green-50 h-full rounded-md p-2">
                                <div class="bg-white border border-gray-100 rounded-md mb-2 p-2" v-for="task in selectedProject.tasks.filter((task)=>task.status == 'done')">
                                    <h4 class="text-gray-800 text-sm font-semibold">{{ task.title }}</h4>
                                    <p class="text-gray-600 text-xs mb-1">{{ task.task }}</p>
                                    <div class='flex items-center justify-between'>
                                        <span class="text-xs font-extralight text-gray-500">{{ task.created_at }}</span>
                                        <div @click="destroyTask(task.id)" v-tooltip="'Delete'" class="bg-gray-100 w-5 h-5 flex justify-center items-center rounded cursor-pointer">
                                            <TrashIcon class="w-4 h-4 text-gray-700"  aria-hidden="true"/>
                                        </div>
                                    </div>
                                </div>
                                <button @click="()=>{open=true;selectedStatus = 'done'}" class="text-sm text-gray-600 flex gap-x-1 items-center"><PlusIcon class="h-3 w-3" aria-hidden="true" /> Add Task</button>
                            </div>
                        </li>                    
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </main>

    <aside class="fixed inset-y-0 w-96 overflow-y-auto border-r border-gray-200 py-6">
      <!-- Secondary column (hidden on smaller screens) -->
        <div class="flex items-center justify-between px-4 sm:px-4 lg:px-4">
            <h1 class="font-bold text-2xl text-gray-700">Tasks</h1>
            <button type="button" v-tooltip="'Add Project'" @click="openCreateProject=true" class="group-hover:opacity-100 rounded-full text-indigo-600 p-1.5 border border-indigo-600 hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <PlusIcon class="h-3 w-3" aria-hidden="true" />
            </button>
        </div>
        <div v-if="isLoading">
            <p class="flex justify-center">
                <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                    <IconLoader class="h-6 w-6" aria-hidden="true" />
                </span>
            </p>
        </div>
        <div v-else class="py-4">
            <div v-if="projectModel.projects.length == 0">
                <span class="text-sm text-gray-600 p-4">There is no projects!</span>
            </div>
            <div v-else v-for="project in projectModel.projects" @click="()=>{selectedProject=project}" class="cursor-pointer py-4 border-b group-hover:bg-gray-50 border-gray-50 px-4 sm:px-4 lg:px-4 group" :class="selectedProject==project ? 'bg-gray-100':'bg-white'">
                <div class="flex items-center gap-x-2">
                    <div :class="['w-11 rounded h-11 bg-black text-base font-bold border-b-4 relative', {'text-green-500 border-green-500': project.type === 'markting'}, {'text-red-500 border-red-500': project.type === 'software'}, {'text-blue-500 border-blue-500': project.type === 'opertion'}, {'text-orange-500 border-orange-500': project.type === 'other'}]">
                        <div class="absolute top-1 left-1">
                            <span class="m-0 p-0">{{ shortName(project.title) }}</span>
                        </div>
                    </div>
                    <div class="justify-between flex w-full">
                        <div>
                            <p>
                                <span class="text-gray-800 font-bold text-sm">{{ project.title }}</span>
                                <span class="text-gray-600 font-extralight text-sm ml-1">({{ project.tasks.length }})</span>
                            </p>
                            <p v-if="project.tasks.length>0" class="text-gray-600 text-xs">
                                {{ project.tasks[project.tasks.length-1].title }} 
                            </p>
                        </div>
                        <div class="self-center">
                            <button type="button" v-tooltip="'Delete'"  @click="destroyProject(project.id)" class="opacity-0 group-hover:opacity-100  rounded-full text-red-600 p-1.5 border border-red-600 hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                <TrashIcon class="h-3 w-3" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>

    <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div class="relative">
                    <div class="overflow-hidden rounded-lg">
                    <label for="title" class="sr-only">Title</label>
                    <input type="text" name="title" v-model="title" id="title" class="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0" placeholder="Title" />
                    <label for="description" class="sr-only">Description</label>
                    <textarea v-model="task" rows="2" name="description" id="description" class="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Write a description..." />

                    <!-- Spacer element to match the height of the toolbar -->
                    <div aria-hidden="true">
                        <div class="py-2">
                        <div class="h-9" />
                        </div>
                        <div class="h-px" />
                        <div class="py-2">
                        <div class="py-px">
                            <div class="h-9" />
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="absolute inset-x-px bottom-0">
                    <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
                    <div class="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
                        <Listbox as="div" v-model="labelled" class="flex-shrink-0">
                            <ListboxLabel class="sr-only">Add a label</ListboxLabel>
                            <div class="relative">
                                <ListboxButton class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                <TagIcon :class="[labelled.value === null ? 'text-gray-300' : 'text-gray-500', 'h-5 w-5 flex-shrink-0 sm:-ml-1']" aria-hidden="true" />
                                <span :class="[labelled.value === null ? '' : 'text-gray-900', 'hidden truncate sm:ml-2 sm:block']">{{ labelled.value === null ? 'Label' : labelled.name }}</span>
                                </ListboxButton>

                                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute right-0 z-10 mt-1 w-52 h-24 overflow-y-auto rounded-lg bg-white text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption as="template" v-for="label in labels" :key="label.value" :value="label" v-slot="{ active }">
                                    <li :class="[active ? 'bg-gray-100' : 'bg-white', 'relative cursor-default select-none px-3 py-2']">
                                        <div class="flex items-center">
                                        <span class="block truncate font-medium">{{ label.name }}</span>
                                        </div>
                                    </li>
                                    </ListboxOption>
                                </ListboxOptions>
                                </transition>
                            </div>
                        </Listbox>

                        <Listbox as="div" v-model="dated" class="flex-shrink-0">
                            <ListboxLabel class="sr-only">Add a due date</ListboxLabel>
                            <div class="relative">
                                <ListboxButton class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                <CalendarIcon :class="[dated.value === null ? 'text-gray-300' : 'text-gray-500', 'h-5 w-5 flex-shrink-0 sm:-ml-1']" aria-hidden="true" />
                                <span :class="[dated.value === null ? '' : 'text-gray-900', 'hidden truncate sm:ml-2 sm:block']">{{ dated.value === null ? 'Due date' : dated.name }}</span>
                                </ListboxButton>

                                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                    <ListboxOptions class="absolute right-0 z-10 mt-1 w-52 h-24 overflow-y-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        <ListboxOption as="template" v-for="dueDate in dueDates" :key="dueDate.value" :value="dueDate" v-slot="{ active }">
                                        <li :class="[active ? 'bg-gray-100' : 'bg-white', 'relative cursor-default select-none px-3 py-2']">
                                            <div class="flex items-center">
                                            <span class="block truncate font-medium">{{ dueDate.name }}</span>
                                            </div>
                                        </li>
                                        </ListboxOption>
                                    </ListboxOptions>
                                </transition>
                            </div>
                        </Listbox>
                    </div>
                    <div class="flex items-center justify-end space-x-3px-2 py-2 sm:px-3">
                        <div class="flex gap-x-2">
                            <button @click="open = false" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</button>
                            <button @click="store" type="submit" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>



  <TransitionRoot as="template" :show="openCreateProject">
    <Dialog class="relative z-10" @close="openCreateProject = false">
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
                            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name your project</label>
                            <input v-model="title" autocomplete="title" type="text" name="user_name" id="title" placeholder="Enter name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                            <select name="type" id="type" v-model="type" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option>markting</option>
                                <option>software</option>
                                <option>opertion</option>
                                <option>other</option>
                            </select>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="date_from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start at</label>
                            <input v-model="date_from" autocomplete="date_from" type="date" name="user_name" id="user_name" placeholder="Enter name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="date_to" class="block text-sm font-medium text-gray-700 dark:text-gray-300">End at</label>
                            <input v-model="date_to" type="date" name="date_to" id="date_to" placeholder="Enter description" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>
                    <div class="py-3 text-right space-x-2">
                        <button @click="openCreateProject=false" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Annuler</button>
                        <button @click='storeProject' type="submit" :disabled="IsSubmitting" class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
    import { TrashIcon,KeyIcon,PencilSquareIcon,ArchiveBoxIcon,ArrowPathIcon,CheckIcon,PlusIcon,ArrowSmallRightIcon, PencilIcon, EyeIcon } from '@heroicons/vue/24/outline'
    import { IconLoader } from '@tabler/icons-vue';
    import { IconHourglassEmpty,IconHourglassLow,IconHourglassOff } from '@tabler/icons-vue';
    import { ref, onMounted,watch } from 'vue';
    import { useAlertStore } from '@/stores/alert'
    import { useProjectStore } from '@/stores/user/project'
    import { useTaskStore } from '@/stores/user/task'
    import { useAuthStore } from '@/stores/user/auth';
    import { useUserStore } from '@/stores/user/user'

    import Alert from '@/components/Alert.vue'
    import moment from 'moment'
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
    import { CalendarIcon, TagIcon } from '@heroicons/vue/20/solid'
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
    
   


    const alertModel = useAlertStore()
    const projectModel = useProjectStore()
    const taskModel = useTaskStore()
    const userModel = useUserStore()
    const auth = useAuthStore()

    const isLoading = ref(true)
    const selectedProject = ref(null)
    const open = ref(false)
    const openCreateProject = ref(false)
    const IsSubmitting = ref(false)
    const title = ref('')
    const task  = ref('')
    const type = ref('')
    const date_from = ref(null)
    const date_to = ref(null)
    const labels = [
        { name: 'Meeting', value: 'Meeting' },
        { name: 'Coding', value: 'Coding' },
        { name: 'Posting', value: 'Posting' },
        { name: 'Thinking', value: 'Thinking' },
        { name: 'Other', value: 'Other' },
    ]
    const dueDates = [
        { name: 'No due date', value: 'No due date' },
        { name: 'Today', value:'Today'},
        { name: 'Tomorrow', value:'Tomorrow'},
        { name: 'After Tomorrow', value:'After Tomorrow'},
        { name: 'Week', value:'Week'},
        { name: 'Next Week', value:'Next Week'},
        { name: 'Month', value:'Month'},
        { name: 'Next Month', value:'Next Month'},
    ]
    const labelled = ref(labels[0])
    const dated = ref(dueDates[0])
    const selectedPerson = ref([])
    const selectedStatus = ref('')
    onMounted( async() => {
        await projectModel.getAll()
        await userModel.getAll()
        selectedPerson.value.push({
            id:auth.user.id,
            username:auth.user.username,
            avatar:auth.user.avatar,
        })
        isLoading.value = false
    })

    const store = async () => {    
        IsSubmitting.value = true
        if(title.value == '' && task.value == ''){
            alertModel.danger("you can let title and description both empty at same time", null, "modal", 6000)
            IsSubmitting.value = false
            return false
        }
        const result = await taskModel.store({
            title:title.value,
            task:task.value,
            type:labelled.value.value,
            status:selectedStatus.value,
            project_id:selectedProject.value.id,
            due:dated.value.value
        })
        title.value = null
        task.value = null
        IsSubmitting.value = false
        open.value = false
        localStorage.setItem('due',JSON.stringify(dated.value));
        localStorage.setItem('type',JSON.stringify(labelled.value));
        console.log(result.data)
        
        isLoading.value = true
        await projectModel.getAll()
        selectedProject.value = projectModel.projects.filter((item)=>item.id == selectedProject.value.id)[0]
        isLoading.value = false
    };

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

    const destroyProject = async(id)=>{
        await projectModel.destroy(id)
    }

    const destroyTask = async(id)=>{
        await taskModel.destroy(id)
        selectedProject.value.tasks = selectedProject.value.tasks.filter(function (item) {
            return item.id !== id;
        });
    }

    const updateStatus = async(id,status)=>{
        await taskModel.update_status(id,{
            'status':status
        })
        isLoading.value = true
        await projectModel.getAll()
        selectedProject.value = projectModel.projects.filter((item)=>item.id == selectedProject.value.id)[0]
        isLoading.value = false
    }
    
    const storeProject = async () => {
        alertModel.clear()
        IsSubmitting.value = true
        await projectModel.store({
            'users_id': selectedPerson.value.map((item)=>item.id),
            'title': title.value,
            'date_from':date_from.value,
            'date_to':date_to.value,
            'type':type.value
        })
        IsSubmitting.value = false
        openCreateProject.value = false
        isLoading.value = true
        await projectModel.getAll()
        isLoading.value = false

    }

   
</script>
