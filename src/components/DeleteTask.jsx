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
  
const DeleteTask = ({deleteCardOpenModel, setDeleteCardOpenModel, id, removeTodo}) => {

    const deleteHandle = (id,removeTodo)=>{
        removeTodo(id)
        setDeleteCardOpenModel(false)
    }
    return (
        <AlertDialog open={deleteCardOpenModel} onOpenChange={setDeleteCardOpenModel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer bg-red-500 hover:bg-red-600" onClick={()=>deleteHandle(id, removeTodo)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteTask