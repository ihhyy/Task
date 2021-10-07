import React, { useState } from "react";
import AditionalInfo from "./AditionalInfo";

const Table = (props) => {
  
  const [status, setStatus] = useState();
  const [inputValue, setInputValue] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const onFind = () => {
    if (inputValue) {
      props.findUsers(inputValue);
      setInputValue('');
    }
  }

  const onRawSelect = (user) => {
    setSelectedUser(user);
  }

  return (
      <div className="App">
        <input type="text" onChange={(e) => handleChange(e)} value={inputValue}></input>
        <button onClick={onFind}> Find </button>
        <input type="button" value="Reset filter" onClick={props.resetFilter}/>
      <select onChange={props.onStateSelect}>
        {
          props.states.sort().map(s => 
            <option key={s}>{s}</option>
          )
        }
      </select>
      <div style={{display: "flex"}}>
        <table>
          <thead>
              <tr>
                <th onClick={() => props.filterData('id', status, setStatus)}> Id </th>
                <th onClick={() => props.filterData('firstName', status, setStatus)}>First name</th>
                <th onClick={() => props.filterData('lastName', status, setStatus)}>Last name </th>
                <th onClick={() => props.filterData('email', status, setStatus)}>Email</th>
                <th onClick={() => props.filterData('phone', status, setStatus)}>Phone</th>
                <th onClick={() => props.filterData('state', status, setStatus)}>State</th>
              </tr>
              {
                props.users.map((user, index) => 
                  <tr key={user.id + index.toString()} onClick={() => onRawSelect(user)}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.adress.state}</td>
                  </tr>
                )
              }
          </thead>
        </table>
        {selectedUser ? <AditionalInfo selectedUser={selectedUser}/> : null}
      </div>
    </div>
  );
}

export default Table;