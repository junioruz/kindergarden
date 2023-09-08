import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiStore } from '../helpers/api'
import { ElMessage } from 'element-plus'

export const useFoodStore = defineStore('food', () => {
    const foods = ref([])
    const foodsCount = ref(0)

    const api = useApiStore()

    // barcha ovqatlarni olish
    const get_all_foods = async () => {
        let res = await api.getAxios({
            url: 'food'
        })
        if (res.status == 200) {
            foods.value = [...res.data.foods]
            foodsCount.value = res.data.count
        }
    }

    // ovqat qo'shish
    const new_food = async (data) => {
        await api.postAxios({
            url: 'food',
            data
        }).then(res => {
            foods.value = [res.data, ...foods.value]
            foodsCount.value += 1
            ElMessage({
                type: 'success',
                message: 'Yangi ovqat qo`shildi'
            })
        })
    }

    // bitta ovqatni olish
    const get_food = async (_id) => {
        return await api.getAxios({
            url: `food/${_id}`
        })
    }

    // ma'lumotni yangilash
    const save_food = async (data) => {
        await api.putAxios({
            url: 'food',
            data
        })
            .then(res => {
                foods.value = foods.value.map(food => {
                    if (food._id === res.data._id) return res.data

                    return food
                })
                ElMessage({
                    type: 'success',
                    message: 'Ovqat yangilandi'
                })
            })
    }

    // ovqatni o'chirish
    const delete_food = async (_id) => {
        await api.deleteAxios({
            url: `food/${_id}`
        })
            .then(() => {
                foods.value = foods.value.filter(food => {
                    if (food._id == _id) return false

                    return food
                })
                foodsCount.value -= 1
                ElMessage({
                    type: 'warning',
                    message: 'Mahsulot o\'chirildi'
                })
            })
    }

    // ovqat holatini o`zgartisrish
    const status_food = async (_id) => [
        await api.getAxios({
            url: `food/change/${_id}`
        })
            .then(() => {
                foods.value = foods.value.map(food => {

                    if (food._id == _id) return {
                        ...food,
                        status: food.status == 0 ? 1 : 0
                    }

                    return food
                })
                ElMessage({
                    type: 'success',
                    message: 'Ovqat yangilandi'
                })
            })
    ]

    const excel_food = async () => {
        return await api.getAxios({
            url: 'food/excel'
        })
    }


    return {
        foods,
        foodsCount,
        get_all_foods,
        get_food,
        new_food,
        save_food,
        delete_food,
        status_food,
        excel_food
    }

})