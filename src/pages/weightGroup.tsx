import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import SingleFighter from "../components/singleFighter";
import { currentFighterGroup, getFightersByWeightClass } from "../store/fighterSlice";
import styles from '../components/fighter.module.css'
import { motion } from 'framer-motion';

export interface WeightGroupProps {
}

interface paramInterface {
    id: string
}

const WeightGroup: React.FC<WeightGroupProps> = () => {

    const myParams = useParams<paramInterface>();
    const dispatch = useDispatch();

    const myGroup = useSelector(currentFighterGroup)

    useEffect(() => {
        dispatch(getFightersByWeightClass(myParams.id.replace('%20', ' ')));
    }, [myParams.id])

    return (
        <motion.div className={styles.groupCon}
            initial={{
                y: -500,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
        >
            {myGroup && myGroup.map((f, idx) => <SingleFighter fighter={f} idx={idx} />)}
        </motion.div>
    );
}

export default WeightGroup