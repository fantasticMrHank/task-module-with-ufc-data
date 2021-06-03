import styles from './newTaskForm.module.css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
// import { updateTaskType } from '../store/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, allTaskTypes } from '../store/taskSlice';
import DropDown from './dropDown';
export interface NewTaskFormProps {

}

interface taskInterface {
    id?: number;
    type: string;
    title: string;
    priority: string;
    due: string;
}

const NewTaskForm: React.FC<NewTaskFormProps> = () => {
    const dispatch = useDispatch();
    const [dueDate, setDueDate] = useState(new Date());

    //const taskTypes = useSelector(allTaskTypes);

    let typeDropdownList: string[] = [];

    useSelector(allTaskTypes).map(t => {
        typeDropdownList.push(t.name);
    })


    const [newTask, setNewTask] = useState<taskInterface>({
        type: "",
        title: "",
        priority: "",
        due: ""
    });

    const updateDueDate = (d: Date) => {
        setDueDate(d);

        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        setNewTask({ ...newTask, due: `${month}/${day}/${year}` })
    }

    const addThisTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        dispatch(addNewTask(newTask));

    }

    const updateTaskType = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setNewTask({ ...newTask, [e.currentTarget.name]: e.target.value })
    }
    return (
        <form onSubmit={(e) => addThisTask(e)}>
            <div className={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Task Title"
                    className={styles.formEle}
                    name="title"
                    onChange={updateTaskType} />
                {/* <textarea placeholder="description" className={styles.formEle} /> */}
                <label className={styles.formLabel} >Task Type</label>
                <DropDown updateTaskType={updateTaskType} name="type" options={typeDropdownList} />

                <label className={styles.formLabel} >Priority</label>
                <DropDown updateTaskType={updateTaskType} name="priority" options={['high', 'medium', 'low']} />

                <DatePicker selected={dueDate} onChange={(date: Date) => updateDueDate(date)} />

                <button className={styles.addButton}>Add Task</button>
            </div>
        </form>
    );
}

export default NewTaskForm;