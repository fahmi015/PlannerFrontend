import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useAlertStore = defineStore('alert', () => {

    const alert = ref('')

    function success(title = null, message = null, display = 'block', timeOut = 0) {
        this.alert = { title: title, message: message, type: 'alert-success', display: display, timeOut: timeOut };
    }

    function danger(title = null, message = null, display = 'modal', timeOut = 0) {
        this.alert = { title: title, message: message, type: 'alert-danger', display: display, timeOut: timeOut };
    }

    function warning(title = null, message = null, display = 'block', timeOut = 0) {
        this.alert = { title: title, message: message, type: 'alert-warning', display: display, timeOut: timeOut };
    }

    function notification(title = null, message = null, display = 'block', timeOut = 0) {
        this.alert = { title: title, message: message, type: 'alert-notification', display: display, timeOut: timeOut };
    }

    function confirm(title = null, message = null) {
        this.alert = { title: title, message: message, type: 'alert-confirm', display: 'modal', timeOut: 0, confirm: false, callback: false };
    }

    function remove(title = null, message = null, id = null) {
        this.alert = { title: title, message: message, type: 'alert-remove', display: 'modal', timeOut: 0, confirm: false, callback: false, id: id };
    }

    function clear() {
        this.alert = null;
    }

    function errors(errors = null, message = null, display = 'model', timeOut = 3000) {
        this.alert = { title: errors, message: message, type: 'alert-errors', display: display, timeOut: timeOut };
    }

    return { alert, success, danger, confirm, warning, notification, remove,errors, clear }
})