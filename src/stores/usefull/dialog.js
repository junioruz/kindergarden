import { defineStore } from "pinia"
import { ref } from "vue"

export const useDialogStore = defineStore('dialog', () => {
    const toggle = ref(false)

    const setToggle = (val) => {
        toggle.value = val
    }

    const editToggle = ref(false)
    const setEditToggle = (val) => {
        editToggle.value = val
    }

    return {
        toggle,
        setToggle,

        editToggle,
        setEditToggle
    }

})