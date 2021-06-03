import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentModal from "../components/modal";
import TaskButton from "../components/taskButton";
import TaskListContainer from "../components/taskListContainer";
import { allTaskTypes, currentTaskType, getTaskTypes } from "../store/taskSlice";
import styles from './home.module.css'

export interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {

    const dispatch = useDispatch();
    const allMyTypes = useSelector(allTaskTypes);
    const currentType = useSelector(currentTaskType);

    useEffect(() => {
        dispatch(getTaskTypes());
    }, [dispatch]);
    return (
        <div className={styles.homeContainer}>
            <div className={styles.taskMenuContainer}>
                <ul className={styles.menubar}>
                    {allMyTypes.map(t => (
                        <TaskButton task={t}
                            key={t.id}
                        />
                    ))}
                </ul>
            </div>
            <div className={styles.taskListContainer}>
                <TaskListContainer />
            </div>


        </div>
    );
}

export default Home;