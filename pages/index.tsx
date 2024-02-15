import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import PizzaH from "../public/svgs/hoveredPizza.svg";
import card1 from "../public/svgs/card1.svg";
import card2 from "../public/svgs/soupHome.svg";
import kfcbox from "../public/svgs/kfcbox.svg";
import FriH from "../public/svgs/friHome.svg";
import BurgerH from "../public/svgs/burgerHome.svg";
import { GetServerSideProps } from "next";
import HomeImg from "../public/svgs/HomeImg.svg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainHeader from "@/components/Client/MainHeader";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import { getOffer, getUser } from "@/services/index";
import { useQuery } from "react-query";
import MainFooter from "@/components/Client/MainFooter";
import { ROUTER } from "../shared/constant/router";
import { OfferPostDataType } from "@/interfaces";
import { QUERIES } from "../constant/Queries";
import { SidebarContextProps } from "../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { animated } from "@react-spring/web";
import ChatClient from "@/components/Client/ChatClient";
import { FaRocketchat, FaTimes } from "react-icons/fa";
import dynamic from "next/dynamic";
import { chatUser } from "@/interfaces";
import { db } from "@/server/configs/firebase";
import { ref, set } from "firebase/database";
import LoadingImg from "../public/loadingImg.gif";

const Home: NextPage = () => {
  const { showUserModal, openUserModal, closeUserModal, modalSpring } =
    useSidebarContext() as SidebarContextProps;
  const DynamicReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
  });
  const { t } = useTranslation("common");
  const { push } = useRouter();
  const userProps: chatUser = {
    user_id: "",
    email: "",
  };
  const [userData, setUserData] = useState<chatUser>(userProps);

  const { data: userD, isSuccess } = useQuery(QUERIES.User, getUser);

  const toggleChat = () => {
    if (showUserModal) {
      closeUserModal();
    } else {
      openUserModal();
    }
  };

  const {
    data: offerD,
    isLoading,
    isError,
  } = useQuery(QUERIES.Offers, getOffer, {
    refetchOnWindowFocus: false,
  });
  const mainData = userD?.data.user;
  useEffect(() => {
    if (isSuccess) {
      setUserData({ user_id: mainData?.id, email: mainData?.email });
      userData.user_id
        ? set(ref(db, "users/" + userData.user_id), {
            userID: userData.user_id,
            email: userData.email,
          })
        : "";
    }
    AOS.init({
      duration: 500,
    });
    AOS.refresh();
  }, [userD]);

  if (isLoading) {
    return (
      <Image
        alt="LoadingImg"
        height={1000}
        width={1000}
        className="h-screen w-screen"
        src={LoadingImg}
      />
    );
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <Head>
        <title>Foody</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="rounded-4">
        <MainHeader />

        <div className="bg-[#F3F4F6] flex sm:flex-row flex-col-reverse justify-between dark:bg-gray-900 sm:mx-[30px] font-body tracking-wide">
          <div className="sm:ml-14 w-fit">
            <p className=" sm:text-[66px] text-[20px] sm:pt-[120px] pt-[300px] sm:px-0 px-10 py-4 text-center sm:text-start  font-bold text-transparent bg-gradient-to-r bg-clip-text  from-gray-900  to-red-400 dark:from-green-300 dark:to-orange-400">
              {t("Our Food site makes it easy to find local food")}
            </p>
            <p className="sm:text-[22px] text-[#828282] text-[16px] text-center sm:text-start font-normal">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </p>
            <div className="flex mt-11 flex-col sm:flex-row">
              <button
                onClick={() => push(ROUTER.LOGIN)}
                className="text-white font-medium text-[25px] px-[43px] mb-4 sm:w-full w-fit mx-auto sm:mr-10 py-[12px] dark:hover:bg-green-700 dark:bg-green-600 rounded-[30px] bg-[#D63626] cursor-pointer  transition-all duration-500"
              >
                {t("Register")}
              </button>
              <button className="font-medium text-[25px] px-[43px] py-[12px] sm:w-full mb-5 w-fit mx-auto text-[#828282] border-[2px] border-solid rounded-[30px] border-[#828282] cursor-pointer  transition-all duration-500">
                {t("Order now")}
              </button>
            </div>
          </div>
          <div className=" pt-5 sm:mr-18">
            <div className="sm:w-[500px] relative mb sm:mb-48 ml-5 z-0 sm:h-[475px] rounded-[80px] bg-transparent sm:bg-black">
              <Image
                className="absolute sm:w-[657px] w-[271px] h-[231px] sm:h-[559px] scale-125 mt-5 z-0"
                src={HomeImg}
                alt="hamburgers"
              />
              <div
                data-aos="fade-left"
                className=" float-animation -right-[30px] -top-[15px] sm:flex hidden items-center absolute rounded-[15px] h-[92px] dark:bg-green-600 bg-white w-fit z-20 flex-row"
              >
                <Image className="ml-5 mr-6" alt="pizza" src={PizzaH} />
                <div className="flex flex-col mr-15">
                  <p className="text-[16px] dark:text-white text-[#4F4F4F] font-medium">
                    Pizza Hut
                  </p>
                  <p className="text-[16px] dark:text-white text-[#4F4F4F] font-medium">
                    Yummy...
                  </p>
                </div>
              </div>
              <div
                data-aos="fade-right"
                className=" float-animation bottom-20 -left-[100px] sm:flex items-center hidden absolute rounded-[15px] h-[92px] dark:bg-green-600 bg-white w-fit z-20 flex-row"
              >
                <Image className="ml-5 mr-6" alt="pizza" src={FriH} />
                <div className="flex flex-col mr-15">
                  <p className="text-[16px] dark:text-white text-[#4F4F4F] font-medium">
                    French Fries
                  </p>
                  <p className="text-[16px] dark:text-white text-[#4F4F4F] font-medium">
                    Yummy...
                  </p>
                </div>
              </div>
              <div
                data-aos="fade-left"
                className=" float-animation top-[100px] sm:-bottom-12 right-0 flex items-center absolute rounded-[15px] h-[92px] dark:bg-green-600 bg-white w-fit z-20 flex-row"
              >
                <Image className="ml-5 mr-6" alt="pizza" src={BurgerH} />
                <div className="flex flex-col mr-15">
                  <p className="text-[16px] dark:text-white text-[#4F4F4F] font-medium">
                    Cheesburger
                  </p>
                  <p className="text-[16px] dark:text-white text-[#4F4F4F] font-medium">
                    Yummy...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isSuccess && (
          <>
            <button
              onClick={() => toggleChat()}
              //
              className="text-red-500 dark:text-cyan-400 text-6xl fixed bottom-5 right-5 z-50 "
            >
              {showUserModal ? <FaTimes /> : <FaRocketchat />}
            </button>

            {/* CHAT */}
            {showUserModal && (
              <>
                <div className="fixed inset-0 bg-black   dark:bg-gray-700 opacity-60 z-40 "></div>

                <animated.div
                  style={{
                    ...modalSpring,
                    position: "fixed",
                    top: "10vh",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 50,
                  }}
                  className="bg-white  dark:bg-gray-800  rounded-t-[20px] flex flex-col  w-10/12 md:w-5/12  items-center justify-start "
                >
                  <div className="w-full h-ful">
                    <ChatClient user={userData} />
                  </div>
                </animated.div>
                {/* CHAT_END */}
              </>
            )}
          </>
        )}

        <div data-aos="zoom-in" className="text-center mt-20">
          <p className="text-[40px] dark:text-white font-black pb-3">
            {t("Features")}
          </p>
          <p className="text-[22px] text-[#828282] font-normal">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and <br className="hidden sm:block" /> publishing industries for
            previewing layouts and visual mockups.
          </p>
        </div>

        <div
          data-aos="zoom-in"
          className="flex flex-row mt-10 flex-wrap gap-16 justify-center"
        >
          <div
            data-aos="zoom-in"
            data-aos-delay={300}
            className="text-center sm:mx-0 mx-5 dark:bg-gray-900 rounded-4 flex items-center flex-col shadow-2xl"
          >
            <Image className="" alt="" src={card1} />
            <p className="text-[30px] sm:px-6 dark:text-white py-2 text-[#4F4F4F] font-bold">
              {" "}
              {t("Discount Boucher")}
            </p>
            <p className="text-[18px] mx-5 mb-15 text-[#4F4F4F] font-normal">
              Lorem ipsum is placeholder <br className="hidden sm:block" />
              commonly used in the graphic{" "}
            </p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay={600}
            className="text-center sm:mx-0 mx-5 dark:bg-gray-900 flex rounded-4 items-center flex-col  shadow-2xl"
          >
            <Image className="" alt="" src={card2} />
            <p className="text-[30px] sm:px-6 dark:text-white text-[#4F4F4F] py-2 font-bold">
              {t("Fresh healthy Food")}
            </p>
            <p className="text-[18px] mx-5 mb-15 text-[#4F4F4F] font-normal">
              Lorem ipsum is placeholder <br className="hidden sm:block" />
              commonly used in the graphic{" "}
            </p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay={900}
            className="text-center sm:mx-0 mx-5 dark:bg-gray-900 rounded-4 flex items-center flex-col shadow-2xl"
          >
            <Image className="" alt="" src={card1} />
            <p className="text-[30px] sm:px-6 dark:text-white py-2 text-[#4F4F4F] font-bold">
              {" "}
              {t("Fast Home Delivery")}
            </p>
            <p className="text-[18px] mx-5 mb-15 text-[#4F4F4F] font-normal">
              Lorem ipsum is placeholder <br className="hidden sm:block" />{" "}
              commonly used in the graphic{" "}
            </p>
          </div>
        </div>
        {offerD &&
          offerD.data.result.data.map((offer: OfferPostDataType, index) =>
            index % 2 === 0 ? (
              <div
                key={index}
                className={`justify-between mt-24 sm:mt-64 sm:ml-[100px] flex flex-col sm:flex-row`}
              >
                <div className="">
                  <p className="sm:text-[50px] text-[25px] sm:text-start text-center font-bold dark:text-white sm:font-black">
                    {offer.name}
                  </p>
                  <p className="sm:text-[22px] mb-10 text-[16px] sm:text-start text-center text-[#828282] font-normal">
                    {offer.description}
                  </p>
                </div>
                <div className="relative mr-28 ml-24">
                  <div
                    className={`bg-[#D63626] dark:bg-green-900 rounded-[50px]  z-0 duration-500 rotate-[22deg] w-[190px] h-[250px] sm:w-[420px] sm:h-[550px]`}
                  ></div>
                  <Image
                    alt=""
                    width={1000}
                    priority={true}
                    height={1000}
                    src={offer.img_url ? offer.img_url : kfcbox}
                    className="sm:w-[600px] w-[282px] h-[200px] top-[30px] sm:top-[100px] hover:scale-110 duration-500 absolute z-10 sm:h-[400px]"
                  />
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={`justify-between mt-24 sm:mt-64 sm:mr-[50px] flex flex-col sm:flex-row-reverse`}
              >
                <div className="">
                  <p className="sm:text-[50px] text-[25px] sm:text-start text-center font-bold dark:text-white sm:font-black">
                    {offer.name}
                  </p>
                  <p className="sm:text-[22px] mb-10 text-[16px] text-[#828282] sm:text-start text-center font-normal">
                    {offer.description}
                  </p>
                </div>
                <div className="relative mr-28 ml-24">
                  <div
                    className={`bg-[#D63626] dark:bg-green-900 rounded-[50px]  z-0 duration-500 rotate-[22deg] w-[190px] h-[250px] sm:w-[420px] sm:h-[550px]`}
                  ></div>
                  <Image
                    alt=""
                    width={1000}
                    height={1000}
                    src={offer.img_url ? offer.img_url : kfcbox}
                    className="sm:w-[600px] w-[282px] h-[200px] top-[30px] sm:top-[100px] hover:scale-110 duration-500 absolute z-10 sm:h-[400px]"
                  />
                </div>
              </div>
            )
          )}

        <div
          className=" w-10/12 md:w-[69%]  mx-auto text-center pt-20"
          data-aos="zoom-in"
        >
          <h1 className="capitalize  text-xl md:text-5xl font-body pt-5 pb-9 font-bold text-transparent bg-gradient-to-r bg-clip-text  from-gray-900  to-red-400 dark:from-green-300 dark:to-orange-400 ">
            {t("foody delivery advertisement")}
          </h1>
          <div className="border-[3px] h-[26vh] md:h-[81vh] rounded-md border-red-600 dark:border-green-300">
            <DynamicReactPlayer
              url="https://www.youtube.com/watch?v=OZzoAw9QHXY"
              width="100%"
              height="100%"
              controls
            />
          </div>
        </div>

        <div
          data-aos="zoom-in"
          className="text-center mt-20 dark:text-white sm:text-[40px] text-[25px] font-black "
        >
          <p>{t("Our Popular Update New Foods")}</p>
          <br className="hidden sm:block" />
        </div>
        <div
          data-aos="zoom-in"
          className="text-[#828282] text-center sm:text-[22px] text-[16px] font-normal "
        >
          <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and <br className="hidden sm:block" /> publishing industries for
            previewing layouts and visual mockups.
          </p>
        </div>

        <div className="flex flex-row mt-10 flex-wrap gap-16 justify-center">
          <div
            data-aos="zoom-in"
            data-aos-delay={300}
            className="text-center mx-5 dark:bg-gray-900 rounded-4 flex items-center flex-col shadow-2xl"
          >
            <Image className="w-[220px] h-[220px]" alt="" src={BurgerH} />
            <p className="text-[30px] sm:px-6 dark:text-white text-[#4F4F4F] font-bold">
              Double Chees
            </p>
            <p className="text-[18px] mx-5 sm:px-6 mb-7 text-[#4F4F4F] font-normal">
              Lorem ipsum is placeholder <br className="hidden sm:block" />{" "}
              commonly used in the graphic{" "}
            </p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay={600}
            className="text-center mx-5 dark:bg-gray-900 flex rounded-4 items-center flex-col  shadow-2xl"
          >
            <Image className="w-[220px] h-[220px]" alt="" src={PizzaH} />
            <p className="text-[30px] sm:px-6 dark:text-white text-[#4F4F4F] font-bold">
              Margarita
            </p>
            <p className="text-[18px] mx-5 mb-7 sm:px-6 text-[#4F4F4F] font-normal">
              Lorem ipsum is placeholder <br className="hidden sm:block" />{" "}
              commonly used in the graphic{" "}
            </p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay={900}
            className="text-center mx-5 dark:bg-gray-900 rounded-4 flex items-center flex-col shadow-2xl"
          >
            <Image className="w-[220px] h-[220px]" alt="" src={kfcbox} />
            <p className="text-[30px] sm:px-6 dark:text-white text-[#4F4F4F] font-bold">
              Twister Menu
            </p>
            <p className="text-[18px] mx-5 mb-7 sm:px-6 text-[#4F4F4F] font-normal">
              Lorem ipsum is placeholder <br className="hidden sm:block" />{" "}
              commonly used in the graphic{" "}
            </p>
          </div>
        </div>

        <div className="relative mt-[200px] sm:mt-[400px] w-full flex justify-center">
          <div
            data-aos="fade-up"
            data-aos-duration={1000}
            className="flex flex-row z-20 absolute bottom-[-100px] rounded-[50px]  mx-[12%] bg-[#272727] items-center sm:pt-20 justify-between px-10"
          >
            <Image
              className="w-[200px] sm:flex hidden h-[200px]"
              alt=""
              src={PizzaH}
            />
            <div className="text-center">
              <p className="text-white mt-10 sm:mt-0 font-medium text-[20px] sm:text-[50px]">
                {t("Discover Restaurants")} <br className="hidden sm:block" />
                {t("Near From you")}
              </p>
              <button className="bg-[#FB9300] sm:mb-18 mb-[30px] sm:mt-11 mt-5 px-11 py-2 rounded-[30px] text-white  text-[18px] sm:text-[22px] cursor-pointer hover:opacity-75 transition-all duration-500 ">
                {t("Explore now")}
              </button>
            </div>
            <Image
              className="w-[200px] sm:flex hidden h-[200px]"
              alt=""
              src={HomeImg}
            />
          </div>
        </div>
        <MainFooter />
      </div>
    </>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
