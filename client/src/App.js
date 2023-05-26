import ListHeader from "./components/ListHeader";
import {useEffect, useState} from 'react'
import ListItem from "./components/ListItem";
import(ListHeader)


const App = () => {
  const userEmail = 'roomydianka@yandex.ru'
  const [ tasks, setTasks] = useState(null)
  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8000/projects/${userEmail}')
      const json = await response.json()
      setTasks(json)
    } catch (err) {
        console.error(err)
    }
  }

  useEffect(() => getData,[])
  console.log(tasks)

  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
      <div className="wrap">
    <div className="app">
      <ListHeader listName = {'Notes'}/>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task}/>)}
    </div>
      </div>
  );
}

export default App
