import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer} from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';




function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE); 
	const {isValid, isFormReadyToSubmit, values} = formState;

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.text || !isValid.title) {
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit ) {
			onSubmit(values);
			dispatchForm({type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit]);

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value}});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT'});
		
	};

	return (
		<div>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div>
					<input type='text' onChange={onChange} value={values.title} name='title' className={cn(styles['input-title'], {
						[styles['invalid']]: !isValid.title
					})}/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="date" className={styles['form-label']}>
						<img src="/calendar.svg" alt="Icon calendar" />
						<span>Date</span> 
					</label>
					<input type='date' onChange={onChange} value={values.date} id='date' name='date' className={cn(styles['input'], {
						[styles['invalid']]: !isValid.date
					})}/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="date" className={styles['form-label']}>
						<img src="/folder.svg" alt="Icon calendar" />
						<span>Tags</span> 
					</label>
					<input type='text' onChange={onChange}  value={values.tag} id='tag' name='tag' className={styles['input']}/>
				</div>
				<textarea name="text" onChange={onChange} value={values.text} id="" cols="30" rows="10" className={cn(styles['input'], {
					[styles['invalid']]: !isValid.text
				})}></textarea>
				<Button text={'Save'}></Button>
			</form>
		</div>
	);
  
}

export default JournalForm;