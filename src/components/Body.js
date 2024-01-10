
import React, { useState } from 'react';
import Button from './button';
import Checkbox from './checkbox';
import '../App.css';

const usePasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 

  const generatePassword = (checkboxData, length) => {
    let charset = '';
    let generatedPassword = '';

    const selectedOption = checkboxData.filter((checkbox) => checkbox.state);

    if (selectedOption.length === 0) {
      setErrorMessage('* Select at least one option.');
      setPassword('');
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case 'Uppercase Letters':
          charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          break;
        case 'Lowercase Letters':
          charset += 'abcdefghijklmnopqrstuvwxyz';
          break;
        case 'Numbers':
          charset += '0123456789';
          break;
        case 'Symbols':
          charset += '!@#$%^&*()';
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    setErrorMessage('');
  };
  
  
  return { password, errorMessage, generatePassword };
};

const Body = () => {
  const [length, setLength] = useState(8);
  const [checkboxData, setCheckboxData] = useState([
    { title: 'Uppercase Letters', state: false },
    { title: 'Lowercase Letters', state: false },
    { title: 'Numbers', state: false },
    { title: 'Symbols', state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
   

    setTimeout(() => {
      setCopied(false);
    }, 6000);
  };
  

  return (
    <div className='mainContainer'>
    <div className="charlength">
      <span>
        <label> Password Length : </label>
        <label>{length}</label>
      </span>

      <input className='number'
        type="number"
        min="8"
        max="50"
        value={length}
        onChange={(e) => {
          const value = e.target.value;
          if (value <= 50) {
            setLength(value);
          } else {
            alert('Please enter a length less than or equal to 50.');
          }
        }}
      />
    </div>
    <div className="checkboxes">
      {checkboxData.map((checkbox, index) => {
        return (
          <Checkbox
            key={index}
            title={checkbox.title}
            onChange={() => handleCheckboxChange(index)}
            state={checkbox.state}
          />
        );
      })}
    </div>
    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    <b></b>
    <div>
      <Button
        text="Generate Password"
        onClick={() => generatePassword(checkboxData, length)}
        customClass="generateBtn"
      />
    </div>
    {password && (
        <div className='length'>
      <div className="header">
        <div className="title">{password}</div>
        <Button customClass="copyBtn"
          text={copied ? "Copied" : "COPY"}
          onClick={handleCopy}
        />
      </div>
      </div>
    )}
  </div>
  );
};

export default Body;
