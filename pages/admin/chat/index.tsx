import React, { useState,useEffect, ChangeEvent, useRef } from "react";
import Layout from "@/components/Admin/Layout";
import { GetServerSideProps } from "next";
import ProfileUser from "@/public/svgs/AdminProfile.svg"
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IoSend } from "react-icons/io5";
import { IoRestaurant } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { db } from "@/server/configs/firebase"
import { ref, set,onValue, push} from "firebase/database";
import { chatUser, messageObj } from "@/interfaces";

const Chat: React.FC = () => {
  const messageDef:messageObj={
    recieve:"",
    send:"admin",
    content:"",
    time:null
  }
  const [message, setMessage] = useState<messageObj>(messageDef);
  const [adminLast,setAdminLast]=useState<any>()
  const [userLast,setUserLast]=useState<any>()
  const [admnMessage,setAdmnMessage]=useState<any>()
  const [usrMessage,setUsrMessage]=useState<any>()
  const [lastMessage,setLastMessage]=useState<any>()

  const allMsg=usrMessage && admnMessage ? [...usrMessage, ...admnMessage] : (usrMessage || admnMessage);
  const sortedMsg=allMsg?.sort((a:any, b:any) => a.time - b.time);
  const [chatHeader,setChatHeader]=useState<string>("")
  const [userID,setUserID]=useState<string>("")
  const [users,setUsers]=useState<any>()
  const convertData=(data:chatUser)=>{
    const userName=data?.email?.substring(0, data.email.indexOf('@'))
    return userName
  }


  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    const timeNow = new Date().getTime();
    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
      recieve:userID,
      send:"admin",
      time:timeNow
    }));
  }
  useEffect(()=>{
    const usersR = ref(db, 'users');
    onValue(usersR, (snapshot) => {
    const userdata = snapshot?.val();
    const usersArr=Object.values(userdata)
    setUsers(usersArr)
    });
  },[])
  const handleGetMessages=(usr:string,mail:chatUser)=>{
    setUserID(usr)
    const adminchat = ref(db, 'messages/admin-to-user');
    onValue(adminchat, (snapshot) => {
    const data = snapshot?.val();
    if(data){
      const dataArr=Object?.values(data)
      const adminMessages = dataArr.filter((item:any) =>item.hasOwnProperty('content')&& item.recieve === usr);
    setAdmnMessage(adminMessages)
    
    }
    
    });
    const userchat = ref(db, 'messages/user-to-admin');
    onValue(userchat, (snapshot) => {
      const data = snapshot?.val();
      if(data){
        const dataArr=Object?.values(data)
        const userMessages = dataArr.filter((item:any) =>item.hasOwnProperty('content')&& item.send === usr);
        setUsrMessage(userMessages)
      }
    });
      
      setChatHeader(convertData(mail))
  }
  const handleSend=()=>{
    const msgListRef=ref(db, 'messages/admin-to-user')
    const newMessageRef = push(msgListRef);
    if(message.content!==''){
      set(newMessageRef,message)
      setMessage(messageDef)
    };
    
  }

  return (
    <Layout>
      <div className="w-[98%] mx-[2%] pt-4 mb-1 flex rounded-[10px] h-screen bg-[#090909]">
          <div className="w-[40%]">
            <div className="h-16 w-[95%] justify-between items-center flex rounded-l-[10px] bg-black ml-[5%]">
              <div className="flex items-center">
                <IoRestaurant size={30} className=" ml-[30px] mr-4 text-[#99ffaf]"/>
                <p className="text-[20px] text-[#99ffaf] font-medium">FoodyChat</p>
              </div>
              <div className="w-[6px] h-full bg-[#202020]"></div>
            </div>
            <div id="contactsArea" className="w-[95%] chat overflow-auto pl-6 pr-6 min-h-[80vh] max-h-[80vh] flex flex-col ml-[5%]">
              {users&&
              users?.map((user:any,index:number) => (
              <div id="contactCard" key={index} onClick={()=>handleGetMessages(user.userID,user)} className={`h-16 cursor-pointer w-full ${convertData(user)===chatHeader?'bg-[#2e2e2e]':''} items-center mt-4 flex flex-row hover:bg-[#2e2e2e] rounded-[10px] bg-[#191919]`}>
                <Image className="w-11 ml-2" alt="" src={ProfileUser}/>
                <div className="flex-col ml-3 flex">
                  <p className="text-[20px] font-medium text-[#99ffaf]">{convertData(user)}</p>
                  <p className="text-[14px] font-normal text-[white]">Online</p>
                </div>
              </div>
              ))
              }
              
            </div>
          </div>
          <div className=" relative w-[60%]">
            <div className="h-16 flex items-center rounded-r-[10px] justify-start w-[95%] bg-black mr-[5%]">
                
                {chatHeader?<Image alt="" width={100} height={100} className="w-11 ml-7" src={ProfileUser}/>:""}
                <div className="flex ml-3 flex-col">
                  <p className="text-white text-[18px] font-medium">{chatHeader?chatHeader:"Select the user"}</p>
                  {/* <p className="text-white text-[12px]">Online</p> */}
                </div>
            </div>
            <div id="mesageArea" className="relative w-[96%] chat overflow-auto pb-[35px] pr-6 min-h-[80vh] max-h-[80vh] flex flex-col ml-[4%]">
              {sortedMsg&&
              sortedMsg?.map((message:any,index:number) => (
              <div key={index}  className={`flex justify-${message.send==="admin"?"end":"start"}`}>
                <div className={`min-h-8 text-[12px] max-w-[60%] py-3 px-5 items-center text-white mt-4 flex  rounded-[10px] rounded-${message.send==="admin"?"tr":"tl"}-none bg-green-800`}>
                {message.content}
                </div>
              </div>
              ))}
            </div>
            {chatHeader!==""?
            <div className="absolute bottom-1 flex items-center flex-row h-14 w-[90%] mx-[5%] rounded-[10px] bg-[#282828]">
            <MdEmojiEmotions size={30} className="text-yellow-400 cursor-pointer hover:scale-110 ml-3 duration-500"/>
            <input name="content" onChange={(e)=>handleChange(e)} value={message.content} type="text" className="h-10 text-[#7d7d7d] pl-3 text-[16px] font-medium ml-3 w-full rounded-[10px] bg-[#3c3c3c]" />
            <IoSend onClick={()=>handleSend()} size={30} className="ml-3 mr-3 text-green-700 cursor-pointer hover:scale-110 duration-500"/>
            </div>:""
            }
            
          </div>
      </div>
    </Layout>
  );
};

export default Chat;
  export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  });