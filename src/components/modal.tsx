import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal, toggleModal } from "../store/taskSlice";
import styles from './modal.module.css'
import NewTaskForm from "./newTaskForm";
export interface ModalProps {

}

const ContentModal: React.FC<ModalProps> = () => {

    const dispatch = useDispatch();
    const bgRef: React.RefObject<HTMLDivElement> = useRef(null);

    const turnOffModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (bgRef.current) {
            if (e.target === bgRef.current) {
                dispatch(toggleModal());
            }
        }
    }
    const showMe: boolean = useSelector(showModal);
    let output = (
        <div className={styles.modalBG} onClick={(e) => turnOffModal(e)} ref={bgRef}>
            <div className={styles.modalContainer}>
                <NewTaskForm />
            </div>
        </div>
    )

    return (<>

        {showMe && output}
    </>)
}

export default ContentModal;