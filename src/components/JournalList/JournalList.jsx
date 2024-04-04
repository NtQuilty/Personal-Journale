import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { useContext, useMemo} from 'react';
import { UserContext } from '../../context/user.context';


function JournalList({ items, setItem }) {
	const { userId } = useContext(UserContext);
	if (items.length === 0) {
		return <p>There are no records yet, add the first one</p>;
		
	}
	
	const sortItems = (a, b) => a.date - b.date;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const filteredItems = useMemo(() => items
		.filter(el => el.userId === userId)
		.sort(sortItems), [items, userId]);

	return <> 
		{filteredItems
			.map(el => (
				<CardButton key={el.id} onClick={() => setItem(el)}>
					<JournalItem 
						title={el.title}
						text={el.post}
						date={el.date}
					/>
				</CardButton>
			))}
	</>;
}

export default JournalList;