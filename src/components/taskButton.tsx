import { useDispatch, useSelector } from 'react-redux';
import { currentTaskType, updateTaskType } from '../store/taskSlice';
import styles from './taskButton.module.css'

export interface TaskButtonProps {
    task: {
        id: number,
        name: string
    }

}

const TaskButton: React.FC<TaskButtonProps> = ({ task }) => {

    const dispatch = useDispatch();

    const currentType = useSelector(currentTaskType);

    const updateMe = () => {
        dispatch(updateTaskType(task))
    }

    return (
        <li className={currentType === task ? styles.taskButtonActive : styles.taskButton} onClick={updateMe}>{task.name}</li>
    );
}

export default TaskButton;