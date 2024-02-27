
"use client"
import { ITask } from "@/type/task";
import { FormEventHandler, useState } from "react";
import { BiEdit  } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./modal";
import { deleteTodo, editTodo } from "@/api";
import { v4 as uuidv4 } from 'uuid';

import { MdOutlineCheckBox } from "react-icons/md";
import { ImCheckboxUnchecked } from "react-icons/im";
import { stringify } from "querystring";
import moment from "moment";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ImRadioUnchecked } from "react-icons/im";

interface TaskProps {
    task: ITask;
}

const Task: React.FC<TaskProps> = ({task} ) =>{
    

  

    const [openModalEdit, setOpenModalEdit]= useState<boolean>(false);
    const [id, setTaskid]= useState<string>(task.id);
    const [todo, setTasktodo]= useState<string>(task.todo);

    const [isCompleted, setTaskisCompleted]= useState<boolean>(task.isCompleted ? task.isCompleted : false);

   
    const [createdAt, setTaskToEdit4]= useState<any>(task.createdAt);
    const [openModalDelete, setOpenModalDelete]= useState <boolean>(false);
    
    const handleSubmitEditTodo:FormEventHandler<HTMLFormElement> = async (e)=>{
        e.preventDefault();

    if (createdAt.trim() === "" || todo ==="" || isCompleted === undefined) {
        alert("Please input data ");
        return;
    }
    
    await editTodo({
        id:id,
        todo:todo,
        isCompleted: isCompleted,
        createdAt: createdAt,
    });

      setTaskisCompleted(isCompleted)

     console.log('isCompleted', isCompleted);
     setOpenModalEdit(false);
    };

 

    const  handleSubmitDeleteTodo = async (id: any)=>{
        await deleteTodo(id);  
        setOpenModalDelete(false);
        console.log('id', id);
     
    };
    
    const handleCheckboxChange = () => {
        
        setTaskisCompleted(!isCompleted);
      };
    
    return (

        <tr key ={task.id}>
             <th>{task.isCompleted ? <FaRegCircleCheck /> : <ImRadioUnchecked /> } </th>
             <th style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.todo }</th>
             <th >{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "N/A"}</th>

             <th className="flex gap-5"> <BiEdit onClick={()=>setOpenModalEdit(true)} cursor="pointer"  size={18} color="blue" />
            <Modal modalOpen ={openModalEdit} setModelOpen={setOpenModalEdit}>
                <form onSubmit={(handleSubmitEditTodo)}>
                    <h3 className="ffont-bold text-lg"> Edit Task</h3>
                    <div className="modal-action">


                    <div className="grid grid-row-2">
                    <div className="grid grid-cols-2 gap-4 pb-4">
                        
                        <input value={todo} onChange={e=> setTasktodo(e.target.value)} type="text" placeholder="to do" className="input input-borderd w-full  "/>                   
                        <input value={createdAt} onChange={e=> setTaskToEdit4(e.target.value)} type="text" readOnly placeholder=" created at" className="input input-borderd w-full  "/>                   

                    </div>

                    <div className="grid grid-cols-2 gap-4 ">
                    
                    <label className="label cursor-pointer">
                            <input type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} />
                            <span className="label-text">Is Complete</span> 
                        </label>                          

                    </div>

                    <button type='submit' className=" btn btn-outline btn-success mt-4">Submit</button>

                    </div>

                    </div>
                </form>
            </Modal>
           <FiTrash2 onClick={()=>setOpenModalDelete(true)} cursor="pointer"  size={18} color="red" />
            <Modal modalOpen ={openModalDelete} setModelOpen={setOpenModalDelete}>
                <h3 className="text-lg">Are you want to delete this task?  </h3>
                <div className="modal-action">
                    <button  className=" btn btn-outline btn-success"onClick={() => handleSubmitDeleteTodo(task.id)}>Yes</button>
                </div>
            </Modal>
             </th>
        </tr>
    )
}

export default Task;