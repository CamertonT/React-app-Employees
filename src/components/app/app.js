import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: false, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: true, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filterName: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    // Добавить сотрудника в список
    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleIncrease = (id) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase}
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
        //     return {
        //         data: newArr
        //     }
        // }) // code below is the second variant of this code
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }))
    }

    searchEmployee = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onUpdateFilter = (filterName) => {
        this.setState({filterName})
    }

    onChangeFilter = (items, filterName) => {
        if (filterName === 'all') {
            return items;
        } else if (filterName === 'rise') {
            return items.filter(item => {
                return item.rise === true;
            })
        } else if (filterName === 'moreThan1000') {
            return items.filter(item => {
                return item.salary > 1000;
            })
        }
    }

    render() {
        const {data, term, filterName} = this.state;
        const totalAmountOfEmployees = data.length;
        const increaseAmountOfEmployees = data.filter(item => item.increase).length;
        const visibleData = this.onChangeFilter(this.searchEmployee(data, term), filterName); // 
        
        return (
            <div className="app">
                <AppInfo 
                totalAmount={totalAmountOfEmployees}
                increaseAmount={increaseAmountOfEmployees}/>
    
                <div className="search-panel">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                    onUpdateFilter = {this.onUpdateFilter}
                    filter = {filterName}
                    />
                </div>
                
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;