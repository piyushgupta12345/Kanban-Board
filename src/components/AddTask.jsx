"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import {v4 as uuidv4} from 'uuid'

const AddTask = ({ addTaskOpenModel, setAddTaskOpenModel, addTodo }) => {
    const[formData,setFormData] = useState({
        title: "",
        description: "",
        category:"todo",
        priority:""
    })
    

    const handleChange = (e)=>{
        const {name,value} = e.target
        setFormData({...formData, [name]:value})
    }

    const selectHandle = (field,value)=>{
        setFormData({...formData, [field]:value})
    }

    const handleAddTask = () => {
        const newTask = {
            id: uuidv4(),
            title: formData.title,
            description: formData.description,
            category: formData.category,
            priority: formData.priority
        }
        console.log("Form Sumbited", formData)
        setFormData({
            id: uuidv4(),
            title: "",
            description: "",
            category: "",
            priority: ""
        })
        addTodo(newTask);
        setAddTaskOpenModel(false)
    };
    return (
        <Dialog open={addTaskOpenModel} onOpenChange={setAddTaskOpenModel} >
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={formData.title} onChange={handleChange}  defaultValue="Going School" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" name="description" value={formData.description} onChange={handleChange}  defaultValue="Write Description" />
                    </div>
                    <Select value={formData.category} onValueChange={(value)=>selectHandle("category", value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Work Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="todo">Todo</SelectItem>
                                <SelectItem value="progress">Progress</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select value={formData.priority} onValueChange={(value)=>selectHandle("priority", value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Work Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="meduim">Meduim</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="cursor-pointer" onClick={() => handleAddTask()}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddTask