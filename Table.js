import React, { useState, useEffect } from 'react';

function UserTable({ columns, data }) {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  


  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())  
      .then(data => {
        setUsers(data.users);  
      });
  }, []);

  // организация поиска
  const handleSearch = () => {
    fetch(`https://dummyjson.com/users/search?q=${search}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
      });
  }

  // организация сортировки

  const handleSort = (field) => {
    let order = 'asc';
    if(sortField === field && sortOrder === 'asc') {
      order = 'desc';
    }
    setSortField(field);  
    setSortOrder(order);
  }

  const sortedUsers = users.sort((a, b) => {
    if(a[sortField] < b[sortField]) {
      return (sortOrder === 'asc') ? -1 : 1;
    }
    if(a[sortField] > b[sortField]) {
      return (sortOrder === 'asc') ? 1 : -1;  
    }
    return 0;
  }); 


  return (
    <>
      <input 
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)} 
      />
      <button onClick={handleSearch}>Поиск</button>

      <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('firstName')} >
            Full Name 
          </th>
          <th onClick={() => handleSort('age')}  >Age</th>
          <th onClick={() => handleSort('gender')} >Gender</th>
          <th >Phone</th>
          <th onClick={() => handleSort('firstName') }>Address</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map(user => ( // отображение отсортированных данных
          <tr key={user.id}> 
          <td>{user.firstName + " " + user.lastName + " " + user.maidenName}</td>
          <td>{user.age}</td>
          <td>{user.gender}</td>
          <td>{user.phone}</td>
          <td>{user.address.city + ", " + user.address.address}</td>
        </tr>
        ))}
      </tbody> 
      </table>
    </>
  );  

  
}

export default UserTable;