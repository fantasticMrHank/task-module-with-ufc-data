import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { allWeightClasses, getWeightClasses } from '../store/fighterSlice';
import styles from './Navbar.module.css'
export interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {

    const dispatch = useDispatch();
    const allClasses = useSelector(allWeightClasses);

    useEffect(() => {
        dispatch(getWeightClasses());
    }, [])

    return (
        <nav className={styles.headerContainer}>
            <NavLink to="/" exact={true} className={styles.linkItem} activeClassName={styles.activeLink}>Home</NavLink>
            <NavLink to="/add" exact={true} className={styles.linkItem} activeClassName={styles.activeLink}>Add Fighter</NavLink>
            {
                allClasses.map(w => (
                    <NavLink to={`/weightclass/${w.name}`} className={styles.linkItem} activeClassName={styles.activeLink} key={w.id}>{w.name}</NavLink>
                ))
            }
        </nav>);
}

export default Navbar;