import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';


function JournalList(props) {
	const {items} = props;
	if (items.length === 0) {
		return <p>There are no records yet, add the first one</p>;
		
	}
	
	const sortItems = (a, b) => a.date - b.date;

	return <> 
		{items.sort(sortItems).map(el => (
			<CardButton key={el.id} >
				<JournalItem
					title={el.title}
					date={el.date}
					text={el.text}
				/>
			</CardButton>
		))}
	</>;
}

export default JournalList;