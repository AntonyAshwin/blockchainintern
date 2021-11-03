
import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';
const ethers = require('ethers');


function App() {
  const [factoryContract, setFactoryContract] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [contractAddresses, setContractAddresses] = useState(undefined);
  const [owner, setOwner] = useState(undefined);
  const[sr_number, setSrNumber] = useState(undefined);
  const[branch, setBranch] = useState(undefined);
  const[date, setDate] = useState(undefined);
  const[grade,setGrade] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { factoryContract } = await getBlockchain();
      setFactoryContract(factoryContract);
      setOwner(owner);
      setName(name);
      setSrNumber(sr_number);
      setBranch(branch);
      setDate(date);
      setGrade(grade);
    };

    init();
  }, []);

  const getDeployedContracts = async e => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    const sr_number = e.target.elements[1].value;
    const branch = e.target.elements[2].value;
    const date = e.target.elements[3].value;
    const grade = e.target.elements[4].value;
    const tx = await factoryContract.createContract(name, sr_number, branch, date, grade);
    const owner = await factoryContract.getOwner();
    await tx.wait();
    const contractAddresses = await factoryContract.getDeployedContracts();
    setContractAddresses(contractAddresses);
    setName(name);
    setOwner(owner);
    setSrNumber(sr_number);
    setBranch(branch);
    setDate(date);
    setGrade(grade);
  };

  //

  const first_div = async e => {
    e.preventDefault();
  };
  //


  if(
    typeof factoryContract === 'undefined'
  ) {
    return 'Loading...';
  }

  return (
    <div className='container'>
      <div className='row'>
{/* 
        <div className='col-sm-6'>
        
        </div> */}


        <div className='col-sm-6'>
          <h2>Certificate Embedment </h2>
          <form className="form-inline" onSubmit={e => getDeployedContracts(e)}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Name"
            />

            <input 
              type="text" 
              className="form-control" 
              placeholder="Serial Number"
            />
           
           <br/>
<p>
 

<select name="branch" id="branch">
  <option value="CSE">CSE</option>
  <option value="ECE">ECE</option>
  <option value="EEE">EEE</option>
  <option value="MEC">MEC</option>
</select>
</p>

              

<select name="grade" id="grade">
  <option value="Distinction">Distinction</option>
  <option value="First Class">First Class</option>
  <option value="Second Class">Second Class</option>
  <option value="Pass">Pass</option>
  <option value="Failed">Failed</option>
</select>


          <input 
              type="date" 
              className="form-control" 
              placeholder="Date"
            />
            
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
          <hr/>
          
          <p><h3>Contract Address : </h3> {contractAddresses}</p>
          <p><h3>Owner Address :  </h3> {owner}</p>
          <p><h4>Name :</h4>{name}</p>
          <p><h4>Serial Number :</h4>{sr_number}</p>
          <p><h4>Branch :</h4>{branch}</p>
          <p><h4>Grade :</h4>{date}</p>
          <p><h4>Date of Graduation :</h4>{grade}</p>
        </div>

      </div>
    </div>
  );
}

export default App;
