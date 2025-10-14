import axios from "axios";

const API_URL = '/api/goals/'

const createGoal = async (goalData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config)
    return response.data
}

const updateGoal = async (goalData, token) =>{

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL, goalData, config)

    return response.data
}

const getAll = async (token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteGoal = async (id, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config)

    return response.data
}

const goalService = {
    createGoal,
    getAll,
    deleteGoal,
    updateGoal
}

export default goalService