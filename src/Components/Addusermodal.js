import React, { useState } from 'react';
import styles from './Addusermodal.module.css';

export default function Addusermodal({ getState }) {
  const [userList, setUserList] = useState({});
 console.log(userList,'userlist......')
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const [addModalState, setAddModalState] = useState({
    firstname: '',
    lastname: '',
    select: '',
    id: generateRandomId(),
  });
 

  const [modalVisible, setModalVisible] = useState(true);

  const inputHandler = (identifier, value) => {
    setAddModalState((prev) => ({ ...prev, [identifier]: value }));
  };

  const addHandler = (event) => {
    event.preventDefault();
    const obj = {...addModalState};

    
    setUserList(obj);
    getState(obj);
    setAddModalState({
      firstname: '',
      lastname: '',
      select: '',
      id: generateRandomId(),
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // console.log(userList, 'child');
  return (
    <>
      {modalVisible && (
        <div>
          <form onSubmit={addHandler} className={styles.userform}>
            <label htmlFor="firstname" className={styles.label}>
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={addModalState.firstname}
              onChange={(event) => inputHandler('firstname', event.target.value)}
              className={styles.input}
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={addModalState.lastname}
              onChange={(event) => inputHandler('lastname', event.target.value)}
            />
            <select
              onChange={(event) => inputHandler('select', event.target.value)}
              value={addModalState.select}
            >
              <option>Groceries</option>
              <option>Personal</option>
              <option>Work</option>
            </select>
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button type="button" onClick={closeModal} className={styles.button}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}
