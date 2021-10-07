import { useRef, useEffect, useState } from 'react';
import Table from './Table';

const url = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';

const App = () => {
    const [users, setUsers] = useState([]);
    const usersRef = useRef([]);
    const set = new Set(usersRef.current.map(u => u.adress.state) || []);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                usersRef.current = data
                setUsers( data )
            });
    }, []);

    const onStateSelect = (state) => {
        const sortByState = usersRef.current
          .filter(u => u.adress.state === state.target.value);

        setUsers(sortByState);
    }

    const findUsers = ( inputValue) => {
        const sortedUsers = usersRef.current
          .filter(u => u.firstName.toLowerCase().includes(inputValue.toLocaleLowerCase())
              || u.lastName.toLowerCase().includes(inputValue.toLocaleLowerCase())
              || u.adress.state.toLowerCase().includes(inputValue.toLocaleLowerCase()
          ));
        setUsers(sortedUsers);
    }

    const filterData = (sortField, status, setStatus) => {
        const sortedUsers = users.slice(0).sort(function (a, b) {
            const nameA = sortField === 'state' ? a.adress.state : a[sortField];
            const nameB = sortField === 'state' ? b.adress.state : b[sortField];

            if(status === true) {
                setStatus(!status);
                return nameA > nameB ? -1 : 1;
            }

            else {
                setStatus(!status);
                return nameB > nameA ? -1 : 1;
            }
        });
        setUsers(sortedUsers);
    }

    const resetFilter = () => {
        setUsers(usersRef.current);
    }

    return (
        <Table
            users={users}
            filterData={filterData}
            findUsers={findUsers}
            resetFilter={resetFilter}
            onStateSelect={onStateSelect}
            states={Array.from(set)}
        />
    )
}

export default App;

