import React, { useState,useEffect } from "react";
import Image from "next/image";
import enImg from "../../../public/svgs/en.svg";
import loginImg from "../../../public/svgs/LoginImg.svg";
import { GetServerSideProps } from 'next';
import NotFound from "@/public/svgs/405.gif"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { useMutation } from "react-query";
import axios, { AxiosResponse } from "axios"; 
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {FadeLoader} from "react-spinners"
import Cookies from 'js-cookie'
const Login: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('common')
  const [email, setEmail] = useState<string>("");
  const [cookie, setCookie] = useState<string|undefined|null>(null)
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("");  
  const accessJWT = Cookies.get('accessJWT');
  useEffect(() => {
    setCookie(Cookies.get('accessJWT'))
  }, [accessJWT])
  const { mutate: signinAdmin } = useMutation({
    mutationFn: async () =>
      await axios.post("/api/auth/signin", {
        email,
        password,
      }),
    onSuccess: (data: AxiosResponse) => {
      if (data  && data.data && data.data.user) {
        setIsLoad(true)
        setTimeout(() => {
          toast.success("Signin successfully!", { autoClose: 1000 });
        });
        // console.log(data?.data.user);
        Cookies.set('accessJWT', data?.data.user.access_token)
        // localStorage.setItem("refresh_token_admin", data?.data.user.refresh_token);
        // localStorage.setItem("access_token_admin", data?.data.user.access_token);
        setTimeout(() => {
          router.push("/admin")
        }, 2000);
      } else {
          toast.error("Please, Enter Correct Email and Password! ", {
            autoClose: 1000,
        });
      }
    },
    onError: () => {
      setTimeout(() => {
        toast.error("Please, Enter Correct Email and Password!", {
          autoClose: 1000,
        });
      });
    },
  });
  const handleLoginAdmin=()=>{
    if (email.trim()==="admin@gmail.com" && password.trim()==="1234567"){
      signinAdmin()
      
    }else{
      toast.error("Please, Enter Correct Email and Password!", {
        autoClose: 1000,
      });
    }
  }
  return (
    <>
  
      <div className="bg-bgc h-screen">
        {!cookie?
        <>
          <h1 className="ml-9px text-24 pt-[4] sm:pt-57px sm:ml-32px font-mukta font-weight800 sm:text-28 text-logocolor">
          <p
            className="text-logocolor font-mukta text-3xl font-extrabold leading-6 tracking-wider
        "
          >
            Foody
            <span className="text-logodotcolor text-4xl font-extrabold leading-6 tracking-wider">
              .
            </span>
          </p>
        </h1>
        <div className="flex justify-center mt-75px sm:mt-110px">
          <div className="flex flex-col-reverse sm:flex-row">
            <div className="sm:bg-loginBgc flex flex-col">
              <h1 className="sm:mt-58px mt-18px mb-23px font-montserrat text-center text-24 sm:text-35 text-gray1 font-weight700 sm:ml-40px sm:mr-48px sm:mb-40px">
                Welcome Admin
              </h1>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="sm:pl-40px pl-19px inline mx-auto h-resinput w-207 text-14 sm:text-18 items-center text-gray1 font-weight400 sm:rounded-4 sm:ml-47px sm:mr-58px sm:w-318 bg-inputBg sm:h-input mb-13px sm:mb-26px"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="sm:pl-40px pl-19px inline mx-auto h-resinput w-207 text-14 sm:text-18 items-center text-gray1 font-weight400 sm:rounded-4 sm:ml-47px sm:mr-58px sm:w-318 bg-inputBg sm:h-input mb-23px sm:mb-26px"
              />
              <button
                type="button"
                onClick={()=>handleLoginAdmin()}
                className="text-white rounded-5 sm:rounded-4 sm:mb-58px sm:ml-47px sm:mr-58px font-medium text-14 sm:text-25 hover:bg-pink00 bg-loginBtn py-6px sm:py-10px hover:opacity-75 transition-all duration-500 "
              >{isLoad ? <div className='flex justify-center items-center mx-0 my-auto'>
              <FadeLoader
                color="#fff"
                // size={15}
              />
            </div> : t('Login')}
              </button>
            </div>
            <div className="flex sm:w-405 sm:bg-white justify-center relative ">
              <Image
                src={enImg}
                className="absolute right-2 top-2 hidden md:block"
                alt="LoginImg"
              />
              <Image
                src={loginImg}
                className="w-174 sm:w-346  sm:mt-55 sm:ml-30 sm:mb-52 sm:mr-30"
                alt="login img"
              />
            </div>
          </div>
        </div>
        </>:<Image alt="" height={100} width={100} className='h-screen w-screen' src={NotFound} />}
      </div>
    </>
  );
};

export default Login;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});