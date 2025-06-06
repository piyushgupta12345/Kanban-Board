"use client"
import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import EditTask from './EditTask'
import { MdDeleteOutline } from "react-icons/md";
import DeleteTask from './DeleteTask';

const TaskCard = ({ task, editTodo, removeTodo }) => {
    const [editCardOpenModel, setEditCardOpenModel] = useState(false)
    const [deleteCardOpenModel, setDeleteCardOpenModel] = useState(false)
    return (
        <div key={task?.id} className="bg-white shadow-md rounded-2xl p-5 space-y-3 border hover:shadow-lg transition cursor-pointer">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{task?.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task?.description}</p>
                </div>
                <div className='flex gap-2'>
                    <MdEdit onClick={() => setEditCardOpenModel(true)} size={20} className='cursor-pointer text-gray-500' />
                    <MdDeleteOutline onClick={() => setDeleteCardOpenModel(true)} size={20} className='cursor-pointer text-red-500' />
                </div>
                {editCardOpenModel && <EditTask
                    editCardOpenModel={editCardOpenModel}
                    setEditCardOpenModel={setEditCardOpenModel}
                    id={task?.id}
                    task={task}
                    editTodo={editTodo}
                />}
                {deleteCardOpenModel && <DeleteTask
                    deleteCardOpenModel={deleteCardOpenModel}
                    setDeleteCardOpenModel={setDeleteCardOpenModel}
                    id={task?.id}
                    removeTodo={removeTodo}
                />}
            </div>

            <div className="flex gap-2 text-xs font-medium">
                <span className={`text-xl ${task?.priority === 'high' ? 'text-red-500' : task?.priority === 'low' ? 'text-green-500' : 'text-yellow-500'}`}>{task?.priority}</span>
                <span className={`text-white rounded-xl px-4 text-lg ${task?.category === 'todo' ? 'bg-red-300' : task?.category === 'done' ? 'bg-green-300' : 'bg-yellow-300'}`}>{task?.category}</span>
            </div>
        </div>
    )
}

export default TaskCard