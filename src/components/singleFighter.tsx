import { fighter } from '../store/fighterSlice'
import styles from './fighter.module.css'
import { motion } from 'framer-motion'
export interface SingleFighterProps {
    fighter: fighter,
    idx: number
}

const SingleFighter: React.FC<SingleFighterProps> = ({ fighter, idx }) => {

    const removeFighter = () => {
        // we can add this later
    }
    return (
        <motion.div
            className={fighter.champion ? styles.fighterCardChamp : styles.fighterCard}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 * idx }}
        >
            <img src={fighter.pic} alt="Avatar" className={styles.avatar}></img>
            <h3 className={styles.fighterName}>{fighter.name}</h3>
            <h3 className={styles.fighterRecord}>{fighter.record}</h3>
            {fighter.champion ? <h3 className={styles.champText}>Champion</h3> : <></>}
            <button className={styles.deleteFighterBtn} onClick={removeFighter}>Delete Fighter</button>
        </motion.div>
    );
}

export default SingleFighter