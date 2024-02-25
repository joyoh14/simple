import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import {onValue, ref, set} from 'firebase/database';
import {db} from './firebase';
import { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);
const onClickSend = () => {
  set(ref(db, 
    `message/${moment().format('YYYYMMDDhhmmss')}`),
    {
      text: text,
    }
  )
}

useEffect(() => {
  const query = ref(db, "/message");

  return onValue(query, (snapshot) => {
    const data = snapshot.val();

    if(snapshot.exists()){
      const r = Object.entries(data).map( r => {
        return {
          time: r[0],
          ...r[1]
        }
      })

      setMessages(r);
    }
  })
}, [])
  return (
    <div className="App">
      <h1>채팅</h1>
      {
        messages.map(m => {
          const year = m.time.substr(0, 4);
          const month = m.time.substr(4, 2);
          const day = m.time.substr(6, 2);

          const hour = m.time.substr(8, 2);
          const min = m.time.substr(10, 2);
          const sec = m.time.substr(12, 2);
          
          return (
            <div>
              {m.text}, {year}-{month}-{day} {hour}:{min}:{sec}
            </div>
          )
        })
      }
      <input onChange={(e) => setText(e.target.value)}></input>
      <button onClick={onClickSend}>전송</button>
    </div>
  );
}

export default App;
