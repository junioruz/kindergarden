import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { useHelperStore } from '.'
import { useTokenStore } from '../user/token'

import { ElMessage } from 'element-plus'
import router from '../../router'


export const useApiStore = defineStore('api', () => {

    const helperStore = useHelperStore()
    const { url } = helperStore

    const tokenStore = useTokenStore()
    const { header } = storeToRefs(tokenStore)

    const getAxios = (payload) => {
        return axios.get(`${url}/${payload.url}`, {
            ...header.value,
        }).catch(e => {
            if (e.response.status == 401) {
                router.push({ name: 'login' })
                ElMessage({
                    type: 'error',
                    message: 'Sizda sahifaga ruxsat yo`q'
                })
                router.push({name: 'login'})
                return false
            }
            ElMessage({
                type: 'error',
                message: e.response.data
            })
        })
    }

    const postAxios = (payload) => {
        return axios.post(`${url}/${payload.url}`, payload.data, {
            ...header.value,
        }).catch(e => {
            console.log(e.response.data);
            ElMessage({
                type: 'error',
                message: e.response.data
            })
        })
    }

    const putAxios = (payload) => {
        return axios.put(`${url}/${payload.url}`, payload.data, {
            ...header.value,
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data
            })
        })
    }
    const deleteAxios = (payload) => {
        return axios.delete(`${url}/${payload.url}`, {
            ...header.value,
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data
            })
        })
    }

    return {
        getAxios,
        postAxios,
        putAxios,
        deleteAxios
    }

})