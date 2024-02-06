import React from "react";
import Layout from "@/components/Admin/Layout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";

const Chat: React.FC = () => {

  return (
    <Layout>
      <div className="w-[98%] mx-[2%] rounded-[10px] h-screen bg-[#090909]">

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