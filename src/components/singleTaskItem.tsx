import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToDeleteList, removeFromDeleteList } from '../store/taskSlice';
import styles from './taskList.module.css'
export interface SingleTaskItemProps {
    task: {
        id: number;
        type: string;
        title: string;
        priority: string;
        due: string;
    }
    checkOn: boolean
}

const SingleTaskItem: React.FC<SingleTaskItemProps> = ({ task, checkOn }) => {

    // set priority color
    let priorityColor;
    if (task.priority === 'high') {
        priorityColor = styles.highPill;
    }
    else if (task.priority === 'medium') {
        priorityColor = styles.mediumPill;
    }
    else {
        priorityColor = styles.lowPill;
    }
    // set due date pill color
    let dueColor = styles.black;
    const dueDate = new Date(task.due);
    const today = new Date();
    if (dueDate < today) {
        dueColor = styles.red;
    }

    const dispatch = useDispatch();

    const whatGotChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            dispatch(addToDeleteList(task));
        }
        else {
            dispatch(removeFromDeleteList(task.id));
        }
    }

    const checkRef: React.RefObject<HTMLInputElement> = useRef(null);
    useEffect(() => {
        if (checkRef.current) {
            checkRef.current.checked = checkOn;

        }
    }, [checkOn])

    return (
        <>
            <div className={styles.ListHeader}>

                <div className={styles.checkBoxContainer}>
                    <input
                        ref={checkRef}
                        type="checkbox"
                        id={`checkbox_${task.title}_${task.id}`}
                        onChange={whatGotChanged} />
                    <label htmlFor={`checkbox_${task.title}_${task.id}`} />
                </div>


                <div className={`${styles.taskTitleHeading}`}>
                    {task.title}
                </div>
                <div className={`${styles.taskPriorityHeading}`}>
                    <div className={`${styles.priorityPill} ${priorityColor}`}>
                        {task.priority}
                    </div>
                </div>
                <div className={`${styles.taskDuedateHeading} ${dueColor}`}>
                    {task.due}
                </div>
            </div>
            <div className={styles.spacer} />
        </>
    );
}

export default SingleTaskItem