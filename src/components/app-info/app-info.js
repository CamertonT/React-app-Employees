import './app-info.css'

const AppInfo = (props) => {
    const {totalAmount, increaseAmount} = props;
    return (
        <div className="app-info">
            <h1>Учет сотрудников компании CamertonT</h1>
            <h2>Общее количество сотрудников: {totalAmount}</h2>
            <h2>Премию получат: {increaseAmount}</h2>
        </div>
    )
}

export default AppInfo;