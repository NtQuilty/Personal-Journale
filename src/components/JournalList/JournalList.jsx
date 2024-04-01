import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';


function JournalList(props) {
	const { userId } = useContext(UserContext);
	const {items} = props;
	if (items.length === 0) {
		return <p>There are no records yet, add the first one</p>;
		
	}
	
	const sortItems = (a, b) => a.date - b.date;

	return <> 
		{items
			.filter(el => el.userId === userId)
			.sort(sortItems)
			.map(el => (
				<CardButton key={el.id}>
					<JournalItem 
						title={el.title}
						post={el.post}
						date={el.date}
					/>
				</CardButton>
			))}
	</>;
}

export default JournalList;