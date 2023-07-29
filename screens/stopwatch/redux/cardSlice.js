import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

let date=new Date()

export const cardSlice=createSlice({
    name:'cards',
    initialState:[],
    reducers:{
        // Action to set the initial state
        setInitialCards: (state, action) => {
        return action.payload;
      },
        addCard:(state,action)=>{
            const newCard={
                id: new Date().getTime(),
                title:action.payload.title,
                icon:action.payload.icon,
                color:action.payload.color,
                targetTime:action.payload.targetTime,
               date:moment(date).format('DD/MM/YYYY'),
               isRunning: false,
               timeElapsed: 0
            };
            state.push(newCard)
        },
        editCard:(state,action)=>{
            const index=state.findIndex((edit)=>edit.id===action.payload.id)
            state[index].title=action.payload.title
            state[index].icon=action.payload.icon
            state[index].color=action.payload.color
            state[index].targetTime=action.payload.targetTime
            state[index].timeElapsed=action.payload.timeElapsed
           return state
        },
        deleteCard:(state,action)=>{
            return state.filter((card)=>card.id !== action.payload.id)
        },
        defaultTemplate:(state,action)=>{
        state.push(
                {title:'STUDY',icon:'book',color:'white',targetTime:{h:3,m:0},id:new Date().getTime(),date:moment(date).format('DD/MM/YYYY'),isRunning: false,timeElapsed: 0},
                {title:'WORKOUT',icon:'barbell',color:'white',targetTime:{h:1,m:15},id:new Date().getTime()+1,date:moment(date).format('DD/MM/YYYY'),isRunning: false,timeElapsed: 0},
                {title:'CODING',icon:'code',color:'white',targetTime:{h:3,m:0},id:new Date().getTime()+2,date:moment(date).format('DD/MM/YYYY'),isRunning: false,timeElapsed:0},     
                )
        },
        timerStopwatch:(state,action)=>{
            const index=state.findIndex((watch)=>watch.id===action.payload.id)
           state[index].timeElapsed=action.payload.timeElapsed
            return state
        }
        
    }
})

export const todoSLice =createSlice({
    name:'todos',
    initialState:[],
    reducers:{
        addTodo:(state,action)=>{
           const newTodo={
            id:new Date().getTime(),
            title:action.payload.title,
            completed:false
           }
           state.push(newTodo)
           //console.log(newTodo);
        },
        deleteTodo:(state,action)=>{
            return state.filter((card)=>card.id !== action.payload.id)
        },
        toggleComplete:(state,action)=>{
            const index=state.findIndex((todo)=>todo.id===action.payload.id)
            state[index].completed=action.payload.completed
        }
    }
})

export const {addCard,deleteCard,defaultTemplate,timerStopwatch,editCard,resetStopwatchAll,setInitialCards}=cardSlice.actions

export const {addTodo,deleteTodo,toggleComplete}=todoSLice.actions


//export default cardSlice.reducer