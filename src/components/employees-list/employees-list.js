import './employees-list.css';
import EmployeesListItem from '../employees-list-item/employees-list-item';

const EmployeesList = ({data, onDelete, onToggleIncrease, onToggleRise}) => {

    const elements = data.map(item => {
        return <EmployeesListItem name={item.name}
                                  salary={item.salary} 
                                  increase={item.increase}
                                  rise = {item.rise} 
                                  key={item.id}
                                  onDelete = {() => onDelete(item.id)}
                                  onToggleIncrease= {() => onToggleIncrease(item.id)}
                                  onToggleRise= {() => onToggleRise(item.id)}/>
                                  
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;