import React, { useState, useEffect } from 'react';
import Displaymodal from './Displaymodal';
import axios from 'axios';	
import styles from './Addfield.module.css';  
import Addusermodal from './Addusermodal';

const Addfield = () => {
  
  const [addModal, setAddModal] = useState({});
  const [select, setSelect] = useState('');
  const [selectedDataArray, setSelectedDataArray] = useState([]);
  const [changeData, setChangeData] = useState([]);
  const [enteredValues, setEnteredValues] = useState({ title: '', body: '' });
  const [storedValues, setStoredValues] = useState([]);
  const [localValues, setLocalValues] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [data, setData] = useState([]);

const [addField, setAddField]= useState([])


  const getState = (state) => {
	
    setAddModal(state);
  };
  useEffect(() => {
    if (addModal.firstname && addModal.lastname && addModal.select && addModal.id) {
      const newarr = [...addField];
  
      setAddField([...newarr, {
        firstname: addModal.firstname,
        lastname: addModal.lastname,
        select: addModal.select,
        id: addModal.id
      }]);
    }
  }, [addModal]);

  



  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const openAddUserModal = () => {
    setShowAddUserModal(true);
  };

  const closeAddUserModal = () => {
    setShowAddUserModal(false);
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/read-json');
        console.log(response.status, 'response status');
        setData(response.data);
        setIsTrue(true); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (!isTrue) {
      fetchData();
    }
  }, [isTrue]);
  




  console.log(data.length, 'response data-----------------------------');
  
  useEffect(() => {

    setSelectedDataArray([]);
  }, [select]);


const handleInputChanges = (identifier, value) => {
  setEnteredValues({ ...enteredValues, [identifier]: value });
};

  const addHandler = async (e) => {
    e.preventDefault();
	
    const selectedId = select;
	const updatedStoredValues = [...storedValues, enteredValues];


    setStoredValues(updatedStoredValues);
    
const updatedDataArray = [...selectedDataArray];
     const obj = {[selectedId] : enteredValues}
	 
	
	
	 setSelectedDataArray([...updatedDataArray, obj])
	 setChangeData([obj])  

  
    try {
      await axios.post('http://localhost:8001/write-json',{modal: addModal, value: [obj]} );
      console.log('Data written to file successfully');
    } catch (error) {
      console.error('Error writing to file:', error.message);
    }
  };

  

  const listHandler = () => {
    setIsTrue((prevIsTrue) => !prevIsTrue);
    if (data.length > 0) {
      const firstData = data;
      data.map((element,index)=>{
      
        const { modal } = element;
        
 
        if (modal && modal.firstname && modal.lastname && modal.select && modal.id) {
          setAddField((prevAddField) => [
            ...prevAddField,
            {
              firstname: modal.firstname,
              lastname: modal.lastname,
              select: modal.select,
              id: modal.id
            }
          ]);
        }


     
      })
      
      
  
   
    }
  };
  
  const selectHandler = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue, 'selecteditem-----------------');
  
  
    setLocalValues([]);
  
    if (selectedValue) {
      data.forEach((element) => {
        const { value } = element;
  
        value.forEach((item) => {
          
          if (item[selectedValue]) {
            setLocalValues((prev) => [...prev, item[selectedValue]]);
          }
        });
      });
    }
  };
  
  console.log(localValues,'localValues----------------')
  console.log(storedValues,'storedValues----------------')

  const deleteHandler = () => {
   
  };

 
  return (
    <>
      <div>
        <form onSubmit={(e) => addHandler(e)} className={styles.form}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="Add Title"
            name="title"
            value={enteredValues.title}
            onChange={(event) => handleInputChanges('title', event.target.value)}
          />
          <label htmlFor="body">Body</label>
          <input
            type="text"
            placeholder="Body"
            name="body"
            value={enteredValues.body}
            onChange={(event) => handleInputChanges('body', event.target.value)}
          />
          <button type="submit" className={styles.button}>
            Add
          </button>
        </form>

        <button onClick={openAddUserModal} className={styles.button}>
          Adduser
        </button>

        {showAddUserModal ? <Addusermodal onClose={closeAddUserModal} getState={getState} /> : null}

        <button onClick={listHandler} className={styles.button}>
          List
        </button>

        {isTrue ? <button onClick={deleteHandler}>Delete</button> : null}

        <Displaymodal values={isTrue ? localValues : storedValues??[]} />
      </div>
      <select style={{ width: '300px' }}   onChange={selectHandler}>
		<option>Select User</option>

    {addField.map((item,index) => {
      return(
          <option key={index} value={item.id}>
            {item.firstname + ' ' + item.lastname + ' '+item.select+ ' ' + item.id}
          </option>)
})} 
      </select>
    </>
  );
};

export default Addfield;
