import React, { useEffect, useState } from 'react'
import TodoCard from './components/TodoCard';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [todoItem, setTodoItem] = useState({
    task: "",
    priority: ""
  });

  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("todoList")) || [];
  });

  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
    if (todoList.length === 0) return;
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const onDelete = (index) => {
    const listAfterDeletion = todoList.filter((_, i) => i !== index);
    setTodoList(listAfterDeletion);
  };

  return (
    <div className='bg-amber-50 min-h-screen'>
      <div className='flex justify-around border border-b-2 border-slate-400 pt-4'>
        {["All", "High", "Medium", "Low"].map((tab, i) => {
        return (
          <span 
            className={`py-1 text-lg md:text-xl text-center w-[100px] md:w-[250px] rounded-tl-lg rounded-tr-lg block cursor-pointer ${tab === selectedTab ? "bg-slate-400 text-white" : "bg-white"}`} 
            key={i}  
            onClick={() => setSelectedTab(tab)}  
          >
            {tab}
          </span>
        )
      })}
      </div>

      <div className='h-[60vh] md:h-[80vh] overflow-y-scroll'>
        {todoList.map((taskItem, index) => {
          const { task, priority } = taskItem;

          return (
            <TodoCard
              task={task}
              priority={priority}
              key={index}
              index={index}
              onDelete={onDelete}
            />
          );
        })}
      </div>

      
      <Toaster />
    </div>
  );
}

export default App;