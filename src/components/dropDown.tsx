import styles from './newTaskForm.module.css'
export interface DropDownProps {
    updateTaskType(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): any,
    name: string,
    options: string[]
}

const DropDown: React.FC<DropDownProps> = ({ updateTaskType, name, options }) => {
    return (
        <select className={styles.formEle} onChange={updateTaskType} name={name} >
            {options.map(o => (
                <option value={o}>{o}</option>
            ))}
        </select>
    );
}

export default DropDown;