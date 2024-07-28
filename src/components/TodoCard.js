import React from 'react'
import "../styles/todoCard.css"
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';


const TodoCard = ({data, idx, handleDelete, handleCompleted, isCompleted}) => {
    const {title, desc} = data;

  return (
    <div className='card'>
        <div className='card_inner'>
            <h2>{title}</h2>
            <p>{desc}</p>
        </div>

        <div className='card_inner'>
            <DeleteIcon style={{"cursor": "pointer"}} onClick={() => handleDelete(idx)}/>
            {!isCompleted && <DoneIcon style={{"cursor": "pointer"}} onClick={() => handleCompleted(idx)}/>}
        </div>
       
    </div>
  )
}

export default TodoCard