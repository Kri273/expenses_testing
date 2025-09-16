import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';

const ExpenseList = (props) => {
  if(props.isLoading){
    return <p className='expenses-list_fallback'><b>Fetching expenses data...</b></p>
  }
  
  const { data } = props; 

  if (data.length === 0) {

    return <p className='expenses-list__fallback'>No expenses found.</p>;
  }

  return (
    <ul className="expenses-list">
      {data.map((expense) => (
        <ExpenseItem 
          key={expense.id} 
          date={expense.date} 
          title={expense.title} 
          price={expense.price} 
        />
      ))}
    </ul>
  );
};

export default ExpenseList;