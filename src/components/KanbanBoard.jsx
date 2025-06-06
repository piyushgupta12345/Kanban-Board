"use client"

import React, { useState } from 'react'
import AddTask from './AddTask'
import { PiTargetBold } from "react-icons/pi";
import { IoCloudDoneSharp } from "react-icons/io5";
import { TbProgressAlert } from "react-icons/tb";
import TaskCard from './TaskCard';
import { todoStore } from '@/store/todostore';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const initialItems = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
];

const KanbanBoard = () => {
    const { tasks, addTodo, editTodo, removeTodo } = todoStore()

    // const [tasks, setTasks] = useState(
    //     [
    //         {
    //             id: 1,
    //             title: "Design System Research",
    //             description: "Research and analyze modern design systems for our new project",
    //             priority: "high",
    //             category: "todo"
    //         },
    //         {
    //             id: 2,
    //             title: "API Documentation Update",
    //             description: "Update API docs with new endpoints and authentication info",
    //             priority: "medium",
    //             category: "todo"
    //         },
    //         {
    //             id: 3,
    //             title: "Client Feedback Analysis",
    //             description: "Review feedback from last client meeting and prepare report",
    //             priority: "low",
    //             category: "progress"
    //         },
    //         {
    //             id: 4,
    //             title: "User Authentication Flow",
    //             description: "Implement secure user authentication with JWT tokens",
    //             priority: "high",
    //             category: "progress"
    //         },
    //         {
    //             id: 5,
    //             title: "Landing Page Wireframes",
    //             description: "Create wireframes for landing page sections",
    //             priority: "medium",
    //             category: "progress"
    //         },
    //         {
    //             id: 6,
    //             title: "Feature Testing: Login/Signup",
    //             description: "Test login and signup functionality on all major browsers",
    //             priority: "low",
    //             category: "done"
    //         },
    //         {
    //             id: 7,
    //             title: "Production Deployment",
    //             description: "Deploy latest features to production environment",
    //             priority: "low",
    //             category: "done"
    //         }
    //     ]
    // )

    const [addTaskOpenModel, setAddTaskOpenModel] = useState(false)
    const [items, setItems] = useState(tasks)
    console.log(items)

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [movedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, movedItem);

        setItems(newItems);
    };


    return (
        <div className='flex flex-col gap-10 pt-5 px-8'>
            <section className='flex justify-between items-center w-full'>
                <h1 className='text-3xl font-semibold'>My Daily Task Routain</h1>
                <button onClick={() => setAddTaskOpenModel(true)} className='bg-green-400 text-white py-3 px-8 rounded-lg text-xl cursor-pointer hover:bg-green-500'>+ Add New task</button>
            </section>
            <section className='flex justify-center items-start gap-16'>
                <div className='w-[400px] min-h-full bg-white border-2 border-dashed border-blue-300 rounded-xl scroll-auto'>
                    <div className='bg-blue-400 text-white rounded-t-xl p-5 flex justify-start gap-5 items-center'>
                        <PiTargetBold size={30} />
                        <h2 className='text-2xl font-semibold'>Todo</h2>
                    </div>
                    <div className='p-5 flex flex-col gap-5'>
                        {tasks?.length > 0 && tasks?.filter((task) => task?.category === "todo")?.map((task) => {
                            return (
                                <TaskCard key={task?.id} task={task} editTodo={editTodo} removeTodo={removeTodo} />
                            )
                        })}
                        {tasks?.length === 0 && <p className='text-center font-semibold text-xl'>No Todo Tasks</p>}
                    </div>
                </div>
                <div className='w-[400px] min-h-full bg-white border-2 border-dashed border-yellow-300 rounded-xl scroll-auto'>
                    <div className='bg-yellow-400 text-white rounded-t-xl p-5 flex justify-start gap-5 items-center'>
                        <TbProgressAlert size={30} />
                        <h2 className='text-2xl font-semibold'>Progress</h2>
                    </div>
                    <div className='p-5 flex flex-col gap-5'>
                        {tasks?.length > 0 && tasks?.filter((task) => task?.category === "progress").map((task) => {
                            // if (task?.category === "progress")
                                return (
                                    <TaskCard key={task?.id} task={task} editTodo={editTodo} removeTodo={removeTodo} />
                                )
                        })}
                        {tasks?.length === 0 && <p className='text-center font-semibold text-xl'>No Progress Tasks</p>}
                    </div>
                </div>
                <div className='w-[400px] min-h-full bg-white border-2 border-dashed border-green-300 rounded-xl scroll-auto'>
                    <div className='bg-green-400 text-white rounded-t-xl p-5 flex justify-start gap-5 items-center'>
                        <IoCloudDoneSharp size={30} />
                        <h2 className='text-2xl font-semibold'>Done</h2>
                    </div>
                    <div className='p-5 flex flex-col gap-5'>
                        {tasks?.length > 0 && tasks?.filter((task) => task?.category === "done").map((task) => {
                            // if (task?.category === "done")
                                return (
                                    <TaskCard key={task?.id} task={task} editTodo={editTodo} removeTodo={removeTodo} />
                                )
                        })}
                        {tasks?.length === 0 && <p className='text-center font-semibold text-xl'>No Done Tasks</p>}
                    </div>
                </div>
            </section>
            {addTaskOpenModel && <AddTask
                addTaskOpenModel={addTaskOpenModel}
                setAddTaskOpenModel={setAddTaskOpenModel}
                addTodo={addTodo}
            />}
        </div>

        // <DragDropContext onDragEnd={handleOnDragEnd} className='flex flex-col gap-10 pt-5 px-8'>
        //     <section className='flex justify-between items-center w-full'>
        //         <h1 className='text-3xl font-semibold'>My Daily Task Routain</h1>
        //         <button onClick={() => setAddTaskOpenModel(true)} className='bg-green-400 text-white py-3 px-8 rounded-lg text-xl cursor-pointer hover:bg-green-500'>+ Add New task</button>
        //     </section>
        //     <Droppable droppableId="droppable-list" direction="horizontal">
        //         {(provided) => (
        //             <section {...provided.droppableProps} ref={provided.innerRef} className='flex justify-center items-start gap-16'>
        //                 <div className='w-[400px] min-h-full bg-white border-2 border-dashed border-blue-300 rounded-xl scroll-auto'>
        //                     <div className='bg-blue-400 text-white rounded-t-xl p-5 flex justify-start gap-5 items-center'>
        //                         <PiTargetBold size={30} />
        //                         <h2 className='text-2xl font-semibold'>Todo</h2>
        //                     </div>
        //                     <div className='p-5 flex flex-col gap-5'>
        //                         {tasks?.length > 0 && tasks?.map((task) => {
        //                             if (task?.category === "todo")
        //                                 return (
        //                                     <Draggable key={task?.id} draggableId={task?.id}>
        //                                         {(provided) => (
        //                                             <TaskCard
        //                                                 ref={provided.innerRef}
        //                                                 {...provided.draggableProps}
        //                                                 {...provided.dragHandleProps}
        //                                                 task={task}
        //                                                 editTodo={editTodo}
        //                                                 removeTodo={removeTodo}
        //                                             >
        //                                                 {task.content}
        //                                             </TaskCard>
        //                                         )}
        //                                     </Draggable>
        //                                     // <TaskCard key={task?.id} task={task} editTodo={editTodo} removeTodo={removeTodo} />
        //                                 )
        //                         })}
        //                         {tasks?.length === 0 && <p className='text-center font-semibold text-xl'>No Todo Tasks</p>}
        //                     </div>
        //                 </div>
        //                 <div className='w-[400px] min-h-full bg-white border-2 border-dashed border-yellow-300 rounded-xl scroll-auto'>
        //                     <div className='bg-yellow-400 text-white rounded-t-xl p-5 flex justify-start gap-5 items-center'>
        //                         <TbProgressAlert size={30} />
        //                         <h2 className='text-2xl font-semibold'>Progress</h2>
        //                     </div>
        //                     <div className='p-5 flex flex-col gap-5'>
        //                         {tasks?.length > 0 && tasks?.map((task) => {
        //                             if (task?.category === "progress")
        //                                 return (
        //                                     <Draggable key={task?.id} draggableId={task?.id} index={index}>
        //                                         {(provided) => (
        //                                             <TaskCard
        //                                                 ref={provided.innerRef}
        //                                                 {...provided.draggableProps}
        //                                                 {...provided.dragHandleProps}
        //                                                 task={task}
        //                                                 editTodo={editTodo}
        //                                                 removeTodo={removeTodo}
        //                                             >
        //                                                 {task.content}
        //                                             </TaskCard>
        //                                         )}
        //                                     </Draggable>
        //                                     // <TaskCard key={task?.id} task={task} editTodo={editTodo} removeTodo={removeTodo} />
        //                                 )
        //                         })}
        //                         {tasks?.length === 0 && <p className='text-center font-semibold text-xl'>No Progress Tasks</p>}
        //                     </div>
        //                 </div>
        //                 <div className='w-[400px] min-h-full bg-white border-2 border-dashed border-green-300 rounded-xl scroll-auto'>
        //                     <div className='bg-green-400 text-white rounded-t-xl p-5 flex justify-start gap-5 items-center'>
        //                         <IoCloudDoneSharp size={30} />
        //                         <h2 className='text-2xl font-semibold'>Done</h2>
        //                     </div>
        //                     <div className='p-5 flex flex-col gap-5'>
        //                         {tasks?.length > 0 && tasks?.map((task) => {
        //                             if (task?.category === "done")
        //                                 return (
        //                                     <Draggable key={task?.id} draggableId={task?.id} index={index}>
        //                                         {(provided) => (
        //                                             <TaskCard
        //                                                 ref={provided.innerRef}
        //                                                 {...provided.draggableProps}
        //                                                 {...provided.dragHandleProps}
        //                                                 task={task}
        //                                                 editTodo={editTodo}
        //                                                 removeTodo={removeTodo}
        //                                             >
        //                                                 {task.content}
        //                                             </TaskCard>
        //                                         )}
        //                                     </Draggable>
        //                                     // <TaskCard key={task?.id} task={task} editTodo={editTodo} removeTodo={removeTodo} />
        //                                 )
        //                         })}
        //                         {tasks?.length === 0 && <p className='text-center font-semibold text-xl'>No Done Tasks</p>}
        //                     </div>
        //                 </div>
        //                 {provided.placeholder}
        //             </section>
        //         )}
        //     </Droppable>
        //     {addTaskOpenModel && <AddTask
        //         addTaskOpenModel={addTaskOpenModel}
        //         setAddTaskOpenModel={setAddTaskOpenModel}
        //         addTodo={addTodo}
        //     />}
        // </DragDropContext>


        // <DragDropContext onDragEnd={handleOnDragEnd}>
        //     <Droppable droppableId="droppable-list">
        //         {(provided) => (
        //             <ul
        //                 {...provided.droppableProps}
        //                 ref={provided.innerRef}
        //                 style={{ listStyle: 'none', padding: 0 }}
        //             >
        //                 {items.map((item, index) => (
        //                     <Draggable key={item.id} draggableId={item.id} index={index}>
        //                         {(provided) => (
        //                             <li
        //                                 ref={provided.innerRef}
        //                                 {...provided.draggableProps}
        //                                 {...provided.dragHandleProps}
        //                                 style={{
        //                                     padding: '8px',
        //                                     marginBottom: '4px',
        //                                     backgroundColor: '#eee',
        //                                     borderRadius: '4px',
        //                                     ...provided.draggableProps.style,
        //                                 }}
        //                             >
        //                                 {item.content}
        //                             </li>
        //                         )}
        //                     </Draggable>
        //                 ))}
        //                 {provided.placeholder}
        //             </ul>
        //         )}
        //     </Droppable>
        // </DragDropContext>

    )
}

export default KanbanBoard