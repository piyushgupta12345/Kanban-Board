"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

const EditTask = ({ editCardOpenModel, setEditCardOpenModel, id, editTodo, task }) => {
  console.log(task)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "todo",
    priority: "",
  });

  useEffect(() => {
    if (task)
      setFormData({
        title: task.title || "",
        description: task.description || "",
        category: task.category || "",
        priority: task.priority || "",
      })
  }, [task, editCardOpenModel])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const selectHandle = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const editHandle = (id, editTodo) => {
    const updateTask = {
      id: id,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
    }
    console.log(updateTask)
    editTodo(id, updateTask)
  }
  return (
    <AlertDialog open={editCardOpenModel} onOpenChange={setEditCardOpenModel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} defaultValue="Going School" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" value={formData.description} onChange={handleChange} defaultValue="Write Description" />
          </div>
          <Select value={formData.category} onValueChange={(value) => selectHandle("category", value)}>
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
          <Select value={formData.priority} onValueChange={(value) => selectHandle("priority", value)}>
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
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={() => editHandle(id, editTodo)}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditTask