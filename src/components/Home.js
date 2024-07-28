import React, { useState, useCallback, useEffect } from 'react'
import TodoCard from './TodoCard'
import "../styles/home.css";

const Home = () => {

    const [todo, setTodo] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [formData, setFormData] = useState({"title": "", "desc": ""});
    const [isCompleted, setIsCompleted] = useState(false);

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
          }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(formData.title){
            setTodo((prev) => [...prev, formData]);
        }
       
        setFormData({"title": "", "desc": ""});
    }

    const handleAdd = (e) => {
        e.preventDefault();
        handleFormSubmit(e);
    }

    const handleToggle = useCallback((e) => {
        setIsCompleted(e.target.innerHTML !== "Todo");
    }, []);

    const handleDelete = useCallback((index, isCompleted) => {
        if(!isCompleted){
            setTodo((prev) => prev.filter((ele, i) => i !== index ));
        }
        else{
            setCompleted((prev) => prev.filter((_, i) => i !== index ));
        }
    }, []);

    const handleCompleted = (index) => {
        const reducedTodos = [...todo];
        const [completedTodo] = reducedTodos.splice(index, 1);
        setTodo(reducedTodos);
        setCompleted((prev) => [...prev, completedTodo]);
    };

    useEffect(() => {
        const savedTodos =  JSON.parse(localStorage.getItem("todolist"));
        if(savedTodos){
            setTodo(savedTodos);
        }

        const savedCompletedTodos = JSON.parse(localStorage.getItem("completedTodos"));
        if(savedCompletedTodos){
            setCompleted(savedCompletedTodos);
        }
       
    }, [])


    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(todo));
    }, [todo])

    useEffect(() => {
        localStorage.setItem("completedTodos", JSON.stringify(completed));
    }, [completed])

  return (
    <div className='home'>
        <h1>My Todo List</h1>

        <div className='todo_block'>
            <form className='section' onSubmit={handleFormSubmit}>
                <div className='title_desc'>
                    <label>Title</label>
                    <input type='text' id='title' name= "title" placeholder='Write Title' value={formData.title} onChange={(e) => handleFormData(e)} />
                </div>

                <div className='title_desc'>
                    <label>Description</label>
                    <input type='text' id='desc' name='desc' placeholder='Add description'  value={formData.desc} onChange={handleFormData} />
                </div>

                <div className='add_btn title_desc' onClick={handleAdd}>
                    Add
                </div>
            </form>

            <div className='section'>
                <hr/>
            </div>

            <div className='section'>
                <div className='todo_completed' onClick={handleToggle} >
                    <div className={`tab ${(isCompleted) ? "": "active"}`}>Todo</div>
                    <div className={`tab ${(isCompleted) ? "active": ""}`}>Completed</div>
                </div>

                <div className='todoList'>
                    {(isCompleted) ? (completed && completed?.map((elem, i) => (<TodoCard key={i} data={elem} idx={i} handleDelete={() => handleDelete(i, true)} handleCompleted={() => handleCompleted(i)} isCompleted={isCompleted} />))) 
                    :
                    (todo && todo.map((elem, i) => (<TodoCard key={i} data={elem} idx={i} handleDelete={() => handleDelete(i, false)} handleCompleted={() => handleCompleted(i)} isCompleted={isCompleted} />)))
                    }

                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Home