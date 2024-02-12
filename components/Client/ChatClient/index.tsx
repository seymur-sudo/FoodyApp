import React, { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FaTelegramPlane } from "react-icons/fa";
import { db } from "@/server/configs/firebase"
import { chatUser, messageObj} from "@/interfaces";
import { SidebarContextProps } from "@/interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
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
  const { closeUserModal } =
  useSidebarContext() as SidebarContextProps;
  const [message, setMessage] = useState<messageObj>(messageClient);
  const [admnMessage,setAdmnMessage]=useState<any>()
  const [myMessage,setMyMessage]=useState<any>()
  const allMsg=myMessage && admnMessage ? [...myMessage, ...admnMessage] : (myMessage || admnMessage);
  const sortedMsg=allMsg?.sort((a:any, b:any) => a.time - b.time);

  const msgListRef=ref(db, 'messages/user-to-admin')
  const newMessageRef = push(msgListRef);
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const timeNow = new Date().getTime();
    const {name,value}=e.target
    setMessage((prevMsg)=>({
      ...prevMsg,
      [name]: value,
      recieve:"admin",
      send:user.user_id,
      time:timeNow
    }));
  }
  useEffect(()=>{
    const adminchat = ref(db, 'messages/admin-to-user');
    onValue(adminchat, (snapshot) => {
    const data = snapshot?.val();
    if(data){
      const dataArr=Object?.values(data)
      const adminMessages = dataArr.filter((item:any) =>item.hasOwnProperty('content')&& item.recieve ===user.user_id);
    console.log(dataArr);
    setAdmnMessage(adminMessages)
    // console.log(adminMessages);
    
    }
    
    });
    const mechat = ref(db, 'messages/user-to-admin');
    onValue(mechat, (snapshot) => {
      const data = snapshot?.val();
      if(data){
        const dataArr=Object?.values(data)
        const meMessages = dataArr.filter((item:any) =>item.hasOwnProperty('content')&& item.send === user.user_id);
        setMyMessage(meMessages)
      }
    });
  },[])
  const handleKeyPress = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Call the same function when Enter key is pressed
      handleSend();
    }
  };
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
              Admin
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
          <button onClick={()=>closeUserModal()} className="bg-[#b83ace] dark:bg-blue-600 px-3 py-1 rounded-[6px] text-white">
            close
          </button>
        </div>
      </nav>

      <main className="min-h-[55vh] relative max-h-[55vh] overflow-y-auto my-scrollable-component bg-white dark:bg-blue-200 ">
        {sortedMsg&&
              sortedMsg?.map((message:any,index:number) => (
              <div key={index}  className={`flex m${message.send==="admin"?"l":"r"}-2 justify-${message.send==="admin"?"start":"end"}`}>
                <div className={`min-h-8 text-[12px] max-w-[60%] py-3 px-5 items-center text-white mt-4 flex  rounded-[10px] rounded-${message.send==="admin"?"tl":"tr"}-none bg-green-800`}>
                {message.content}
                </div>
              </div>
        ))}
      </main>

      <footer className="p-3 rounded-b-md flex justify-between items-center cursor-pointer border-t-2 border-gray-200 dark:border-blue-600 bg-white dark:bg-blue-200">
        <input
          type="text"
          name="content" 
          onChange={(e)=>handleChange(e)} 
          onKeyUp={handleKeyPress}
          value={message.content}
          placeholder=" ask your question..."
          className="capitalize py-1 outline-none w-11/12 text-gray-600 dark:text-blue-700 font-bold text-xl bg-white dark:bg-blue-200"
        />
        <FaTelegramPlane onClick={handleSend} className="text-[#ba68c8] dark:text-blue-600 text-3xl" />
      </footer>
    </>
  );
};

export default ChatClient;
