import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import {onValue, ref, set} from 'firebase/database';
import {db} from './firebase';
import { useEffect, useState } from 'react';
import styled from 'styled-components';


const StyledChat = styled.div`
  width: 430px;
  margin: 0 auto;
  h1{
    text-align: center;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    padding: 1rem 2rem;
    font-size: 1.25rem;;
   
  }
  .send{
    position: fixed;
    bottom: 0;
    width: 150px;
    right: 0;
    z-index: 100;
    height: 50px;
  }
  
`

const MyChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 1rem;
  .c{
    background-color: #E4C129;
    color: black;
    display: inline-block;
    border-radius: 10px;
    padding: .5rem 1rem;
    .text{
      font-size: 20px;
      font-weight: bold;
      
    }
  }
`;

const OtherChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  .c{
    background-color: #007DFF;
    color: white;
    display: inline-block;
    border-radius: 10px;
    padding: .5rem 1rem;
    .text{
      font-size: 20px;
      font-weight: bold;
      
    }
  }
`
function App() {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);
const onClickSend = () => {
  if(text === ''){
    return;
  }
  const m = moment().millisecond();
  set(ref(db, 
    `message/${moment().format('YYYYMMDDhhmmss')}${m}`),
    {
      text: text,
      user: window.navigator.userAgent
    }
  )
  setText("")
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
    <StyledChat>
      <h1>채팅</h1>
      {
        messages.map(m => {
          const year = m.time.substr(0, 4);
          const month = m.time.substr(4, 2);
          const day = m.time.substr(6, 2);

          const hour = m.time.substr(8, 2);
          const min = m.time.substr(10, 2);
          const sec = m.time.substr(12, 2);
          
          if(m.user === window.navigator.userAgent){
            return (
              <MyChat>
                <div className='c'>
                  <div className='text'>
                  {m.text}
                  </div>
                  <div className='time'>
                  {year}-{month}-{day} {hour}:{min}:{sec}
                  </div>
                </div>
              </MyChat>
            )
          }
          else{
            return(
              <OtherChat>
                <div className='c'>
                  <div className='text'>
                {m.text}
                </div>
                <div className='time'>
                {year}-{month}-{day} {hour}:{min}:{sec}
                </div>
                </div>
            </OtherChat>
            )
          }
        })
      }
      <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e)=> e.key === "Enter"&& onClickSend()}></input>
      <button  className="send"onClick={onClickSend}>전송</button>
    </StyledChat>
  );
}

export default App;
