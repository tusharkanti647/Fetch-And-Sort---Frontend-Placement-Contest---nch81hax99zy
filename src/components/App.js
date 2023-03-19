import React, { useState } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);


  const fatchData = async () => {
    setIsLoading(true);
    const respons = await fetch("https://content.newtonschool.co/v1/pr/main/users");
    const data = await respons.json();
    //const obje = JSON.parse(data);
    setUsers(data);
    setIsLoading(false);
  }


  const sortFun = () => {
    if (!sortAscending) {
      let newarr = [...users];
      newarr.sort(function (a, b) {
        return b.name.length - a.name.length;
      });

      setUsers(newarr);
      setSortAscending(true);
    } else {
      let newarr = [...users];
      newarr.sort(function (a, b) {
        return a.name.length - b.name.length;
      });

      setUsers(newarr);
      setSortAscending(false);
    }
  }


  return (
    <div id="main">

      <h2>User List</h2>


      <button className="fetch-data-btn" onClick={fatchData}>Fetch User Data</button>


      {sortAscending ? (<button className="sort-btn" on onClick={sortFun}>Sort by name length (ascending)</button>) : (
        <button className="sort-btn" on onClick={sortFun}>Sort by name length (descending)</button>
      )}


      {/* loder----------------------------------------------------------------- */}
      {isLoading ? <p>Loading...</p> : ""}

      {/* fatch data -------------------------------------------------------------*/}

      {users.length > 0 ? (users.map((obj, ind) => {
        return (
          < div className='users-section'>
            <li>
              <section className='id-section'>{obj.id}</section>
              <section className='name-email-section'>
                <p className='name'>Name: {obj.name}</p>
                <p className='email'>Email: {obj.email}</p>
              </section>
            </li>
          </div>
        )
      })) : " "}


    </div >
  )
}


export default App;
