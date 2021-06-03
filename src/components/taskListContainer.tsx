import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentTaskType, getTaskListByType, currentTaskList, AddAllTaskForDeletion, RemoveAllTaskForDeletion } from "../store/taskSlice";
import AddTaskButton from "./addTaskBtn";
import DeleteTaskBtn from "./deleteTaskBtn";
import SingleTaskItem from "./singleTaskItem";
import styles from './taskList.module.css'
export interface TaskListContainerProps {

}

const TaskListContainer: React.FC<TaskListContainerProps> = () => {

    const [checkOn, setCheckOn] = useState(false);
    const dispatch = useDispatch();
    const thisType = useSelector(currentTaskType);
    const thisTaskGroup = useSelector(currentTaskList);

    const toggleWholeDeleteGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            setCheckOn(true);
            dispatch(AddAllTaskForDeletion());
        } else {
            setCheckOn(false);
            dispatch(RemoveAllTaskForDeletion());
        }
    }

    useEffect(() => {
        dispatch(getTaskListByType(thisType.name));
    }, [thisType.name, dispatch])
    return (
        <div style={{ width: "100%" }}>
            <AddTaskButton />

            <div className={styles.ListHeader}>
                <div className={styles.checkBoxContainer}>
                    <input type="checkbox" id={`checkbox_${thisType.name}`} onChange={toggleWholeDeleteGroup} />
                    <label htmlFor={`checkbox_${thisType.name}`} />
                </div>
                <div className={`${styles.taskTitleHeading} ${styles.boldHeading}`}>
                    {thisType.name.toUpperCase()}
                </div>
                <div className={`${styles.taskPriorityHeading} ${styles.boldHeading}`}>
                    PRIORITY
                </div>
                <div className={`${styles.taskDuedateHeading} ${styles.boldHeading}`}>
                    DUE DATE
                </div>
            </div>

            <div className={styles.spacer} />
            {thisTaskGroup.map(t => (
                <SingleTaskItem task={t} checkOn={checkOn} />
            ))}

            <div className={styles.spacer} />

            <DeleteTaskBtn />
        </div>
    );
}

export default TaskListContainer;