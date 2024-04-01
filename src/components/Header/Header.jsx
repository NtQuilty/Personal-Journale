import SelectUser from '../SelectUsers/SelectUsers';
import styles from './Header.module.css';

function Header() {
	return (
		<>
			<img className={styles.logo} src="/logo.svg" alt="Логотип журнала" />
			<SelectUser />		
		</>	
	);
  
}

export default Header;