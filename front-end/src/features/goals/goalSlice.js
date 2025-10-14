import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from './goalService'

const initialState = {
    goals: [],
    isSuccess: false,
    isLoading:false,
    isError: false,
    editingGoal: null,
    message: ''
}

export const createGoal= createAsyncThunk('goals/create', async(goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token
        return await goalService.createGoal(goalData,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const updateGoal = createAsyncThunk('goals/update', async(goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token
        return await goalService.updateGoal(goalData,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})
//xuwr li lai cai nay
export const getGoals = createAsyncThunk('goals/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token
        console.log(token)
        return await goalService.getAll(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk('goals/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth?.user?.token
        return await goalService.deleteGoal(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState,
        startEditingGoal: (state, action)=>{
            const goalEdit = state.goals.find((goal)=>goal._id === action.payload._id) || null
            state.editingGoal = goalEdit
        },
        cancelEditingGoal: (state)=>{
            state.editingGoal = null
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(createGoal.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(getGoals.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(updateGoal.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(updateGoal.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals.find((goal,index)=>{
                if(goal._id === action.payload._id){
                    state.goals[index] = action.payload
                    return true
                }
                return false
            })
            state.editingGoal = null
        })
        .addCase(updateGoal.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(deleteGoal.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deleteGoal.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter((goal)=>goal._id !== action.payload.id) 
        })
        .addCase(deleteGoal.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})
export const { reset, startEditingGoal, cancelEditingGoal } = goalSlice.actions
export default goalSlice.reducer 