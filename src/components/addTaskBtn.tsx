import { useDispatch } from 'react-redux'
import { toggleModal } from '../store/taskSlice';
import styles from './addTaskBtn.module.css'

export interface AddTaskButtonProps {

}

const AddTaskButton: React.FC<AddTaskButtonProps> = () => {

    const dispatch = useDispatch();

    const switchModalVisibility = () => {
        dispatch(toggleModal());
    }
    return (<button className={styles.addTaskButton} onClick={switchModalVisibility}>Add Task</button>);
}

export default AddTaskButton