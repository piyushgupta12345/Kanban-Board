import { create } from "zustand";
import { persist } from 'zustand/middleware'

// const abhi = (set)=>({
//   count:5,
//   incre:()=>{
//     set((state)=>({
//       count: state.count + 1
//     }))
//   },
//   descre:()=>{
//     set((state)=>({
//       count: state.count - 1
//     }))
//   },
//   reset:()=>{
//     set(()=>({
//       count: 0
//     }))
//   }
// })

// export const countNumber = create(
//     persist(abhi,{name:"abc"})
// )

export const store = (set) => ({
  tasks: [],
  addTodo: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task]
    }))
  },
  editTodo: (id, updateTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        return task?.id === id ? { ...task, ...updateTask } : task
      })
    }))
  },
  removeTodo: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task?.id !== id)
    }))
  }
})

export const todoStore = create(
  persist(store, { name: "tasks-store" })
)
