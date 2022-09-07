import React, { useContext } from 'react'
import { AppContext } from '../App';

function Key({keyValue,bigKey,disabled}) {

  //alternative of conditional attribute used below
  // let idName;
  // if(bigKey===true)
  //   idName="big";
  //pass the value idName to id attribute

  const {onSelectLetter,onDelete,onEnter}=useContext(AppContext);

  const selectLetter=()=>{

    //enter key functionality
    if(keyValue==="ENTER"){
      onEnter();
    }

    //delete key functionality
    else if(keyValue==="DELETE"){
      onDelete();
    }

    //functionalities for all the keys accept enter and delete key
    else{
      onSelectLetter(keyValue);
    }
  }
  return (
    
    //refer to https://blog.bitsrc.io/4-methods-to-add-conditional-attributes-to-react-components-b1ad195f449b
    //for adding conditional attributes to the react just like below id={bigKey && "big"}
    <div className="key" id={bigKey ? "big" : disabled && "disabled"} onClick={selectLetter}>{keyValue}</div>
  )
}

export default Key