import React, { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FaTelegramPlane } from "react-icons/fa";
import { db } from "@/server/configs/firebase"
import { chatUser, messageObj} from "@/interfaces";
import { ref, set,onValue, push} from "firebase/database";
interface ChatClientProps {
  user: chatUser;
}
const ChatClient:React.FC<ChatClientProps> = ({user}) => {
  const messageClient:messageObj={
    recieve:"admin",
    send:"",
    content:"",
    time:null
  }
  const [message, setMessage] = useState<messageObj>(messageClient);
  const [usrMessage,setUsrMessage]=useState<any>()
  const msgListRef=ref(db, 'messages/user-to-admin')
  const newMessageRef = push(msgListRef);
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    const timeNow = new Date().getTime();
    setMessage((prevMessag) => ({
      ...prevMessag,
      [name]: value,
      recieve:"admin",
      send:user?.user_id,
      time:timeNow
    }));
  }
  useEffect(()=>{},)
  const handleGetMessages=(usr:string,mail:chatUser)=>{
    const adminchat = ref(db, 'messages/admin-to-user');
    const userChat=ref(db,'messages/user-to-admin')
    onValue(userChat, (snapshot) => {
      const data = snapshot?.val();
      const dataArr=Object.values(data)
      const userMessages = dataArr.filter((item:any) =>item.hasOwnProperty('content')&& item.send === usr);
      console.log(dataArr);
      });
    onValue(adminchat, (snapshot) => {
    const data = snapshot?.val();
    const dataArr=Object.values(data)
    const adminMessages = dataArr.filter((item:any) =>item.hasOwnProperty('content')&& item.recieve === usr);
    });
  }
  const handleSend=()=>{
    if(message.content!==''){
      set(newMessageRef,message)
      setMessage(messageClient)
    };
    
  }
  return (
    <>
      <nav className="py-1 px-3 rounded-t-md bg-[#BA68C8] dark:bg-blue-400 font-body flex justify-between items-center">
        <div className="flex items-center ">
          <div className="border-2 border-white dark:border-blue-100  h-12 w-12 rounded-full flex justify-center items-center">
            <FaRobot className="text-white text-4xl" />
          </div>

          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-lg font-semibold ml-4 text-white dark:text-blue-950">
              ChatBot
            </h1>
            <div className="flex  items-center">
              <p>
                <GoDotFill className="text-green-400 text-3xl" />
              </p>
              <p className="text-medium  text-white dark:text-black">online</p>
            </div>
          </div>
        </div>

        <div>
          <button className="bg-[#b83ace] dark:bg-blue-600 px-3 py-1 rounded-[6px] text-white">
            Logout
          </button>
        </div>
      </nav>

      <main className="min-h-[55vh] relative max-h-[55vh] overflow-y-auto my-scrollable-component bg-white dark:bg-blue-200 ">
        <div id="messageMe"  className="flex mr-2 justify-end">
          <div className="min-h-8 text-[12px] max-w-[60%] py-3 px-5 items-center text-white mt-4 flex  rounded-[10px] rounded-tr-none bg-green-800">
            salam
          </div>
        </div>
        <div id="messageAdmin"  className="flex ml-2 justify-start">
          <div className="min-h-8 text-[12px] max-w-[60%] py-3 px-5 items-center text-white mt-4 flex  rounded-[10px] rounded-tl-none bg-green-800">
            necesen
          </div>
        </div>
      </main>

      <footer className="p-3 rounded-b-md flex justify-between items-center cursor-pointer border-t-2 border-gray-200 dark:border-blue-600 bg-white dark:bg-blue-200">
        <input
          type="text"
          name="content" 
          onChange={(e)=>handleChange(e)} 
          value={message.content}
          placeholder=" ask your question..."
          className="capitalize py-1 outline-none w-11/12 text-gray-600 dark:text-blue-700 font-bold text-xl bg-white dark:bg-blue-200"
        />
        <FaTelegramPlane onClick={handleSend} className="text-gray-300  dark:text-blue-600 text-3xl" />
      </footer>
    </>
  );
};

export default ChatClient;
