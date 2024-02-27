
"use client"
import React, { FormEventHandler, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "./modal";
import { addTodo, getAllTodos } from "@/api";
import { ITask } from "@/type/task";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const AddTask = ()=>{

    const [modalOpen, setModelOpen]= useState<boolean>(false);
    const [todo, setNewTasktodo]= useState<string>("");
    const [isCompleted, setNewTaskisCompleted]= useState<boolean>(false);
    const [createdAt, setNewTaskcreatedAt]= useState<string>(`${new Date()}`);
    const uuidString: string = uuidv4();
    

    const handleSubmitNewTodo:FormEventHandler<HTMLFormElement> = async (e)=>{
        e.preventDefault();

        if (createdAt.trim() === "" || todo === "" || isCompleted === undefined) {
            alert("Please input data ");
            return;
          }
          
        await addTodo({
            id:uuidString,
            todo:todo,
            isCompleted: isCompleted,
            createdAt: createdAt,

        });

      

        setNewTasktodo("");  
        setNewTaskisCompleted(false);  
        setNewTaskcreatedAt(createdAt);  
        setModelOpen(false);
    };


    const handleCheckboxChange = () => {
      setNewTaskisCompleted(!isCompleted);
      
      };

    return (
        <div>
           
            <div className="grid justify-items-stretch ">
            <button  onClick={() => setModelOpen(true)  }className="  justify-self-end btn btn-outline btn-success " > Add New <AiOutlinePlusCircle size={20}/></button>
  
            </div>

            

            <Modal modalOpen ={modalOpen} setModelOpen={setModelOpen}>
                <form onSubmit={(handleSubmitNewTodo)}>
                    <h3 className="font-bold text-lg add-new "> Add New</h3>
                    <div className="modal-action ">

                    <div className="grid grid-row-2">
                    <div className="grid grid-cols-2 gap-4 pb-4">
                        
                        <input value={todo} onChange={e=> setNewTasktodo(e.target.value)} type="text" placeholder="to do" className="input input-borderd w-full  "/>                   
                        <input value={createdAt} onChange={e=> setNewTaskcreatedAt(e.target.value)} type="text" readOnly placeholder=" created at" className="input input-borderd w-full  "/>   
                      
                    </div>

                    <div className="grid grid-cols-2 gap-0 ">
                    

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
        </div>
    )
 
}


export default AddTask; 