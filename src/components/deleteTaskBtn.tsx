import { useDispatch, useSelector } from 'react-redux'
import { deleteTaskById, taskListForDeletion } from '../store/taskSlice';
import styles from './addTaskBtn.module.css'

export interface DeleteTaskBtnProps {

}

const DeleteTaskBtn: React.FC<DeleteTaskBtnProps> = () => {

    const dispatch = useDispatch();
    const deleteGroup = useSelector(taskListForDeletion);

    const deleteTasks = () => {
        //dispatch(deleteTaskGroup())

        deleteGroup.map(t => {
            dispatch(deleteTaskById(t.id.toString()));
        })
    }
    return (
        <>{deleteGroup.length ?
            <button className={styles.DeleteTaskBtn} onClick={deleteTasks}>Delete Selected Tasks </button> : null
        }</>
    );
}

export default DeleteTaskBtn