import React from "react";
import MainHeader from "@/components/Client/MainHeader";
import Image from "next/image";
import MainFooter from "@/components/Client/MainFooter";
import { Accordion, AccordionItem } from "@nextui-org/react";
const Faqs = () => {
  return (
    <div className="h-screen">
      <MainHeader />
      <div>
        <p className="text-center dark:text-white text-[45px] mb-10 font-medium mt-[91px]">
          F.A.Q
        </p>
        <div className="flex justify-center">
          <Accordion
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
            className="sm:mx-[200px] mx-4 w-full sm:w-min mb-[280px]"
            selectionMode="multiple"
          >
            <AccordionItem
              className="sm:text-center  sm:max-w-screen-lg max-w-[90%] truncate dark:text-white text-[22px] font-medium font-[Roboto]"
              key="1"
              aria-label="Accordion 1"
              title="How to contact with Customer Service?"
            >
              <p className="text-[18px] text-start text-wrap text-[#828282] font-[Roboto] font-medium">
                Our Customer Experience Team is available 7 days a week and we
                offer 2 ways to get in contact.Email and Chat . We try to reply
                quickly, so you need not to wait too long for a response!.
              </p>
            </AccordionItem>
            <AccordionItem
              className="sm:text-center sm:max-w-screen-lg max-w-[90%] truncate dark:text-white text-[22px] font-medium font-[Roboto]"
              key="2"
              aria-label="Accordion 2"
              title="App installation failed, how to update system information?"
            >
              <p className="text-[18px] text-start text-wrap text-[#828282] font-[Roboto] font-medium">
                Our Customer Experience Team is available 7 days a week and we
                offer 2 ways to get in contact.Email and Chat . We try to reply
                quickly, so you need not to wait too long for a response!.
              </p>
            </AccordionItem>
            <AccordionItem
              className="sm:text-center sm:max-w-screen-lg max-w-[90%] truncate dark:text-white text-[22px] font-medium font-[Roboto]"
              key="3"
              aria-label="Accordion 3"
              title="Website reponse taking time, how to improve?"
            >
              <p className="text-[18px] text-start text-wrap text-[#828282] font-[Roboto] font-medium">
                Our Customer Experience Team is available 7 days a week and we
                offer 2 ways to get in contact.Email and Chat . We try to reply
                quickly, so you need not to wait too long for a response!.
              </p>
            </AccordionItem>
            <AccordionItem
              className="sm:text-center text-start sm:max-w-screen-lg max-w-[90%] truncate dark:text-white text-[22px] font-medium font-[Roboto]"
              key="4"
              aria-label="Accordion 4"
              title="How do I create a account?"
            >
              <p className="text-[18px] text-start text-wrap text-[#828282] font-[Roboto] font-medium">
                Our Customer Experience Team is available 7 days a week and we
                offer 2 ways to get in contact.Email and Chat . We try to reply
                quickly, so you need not to wait too long for a response!.
              </p>
            </AccordionItem>
            <AccordionItem
              className="sm:text-center sm:max-w-screen-lg max-w-[90%] truncate dark:text-white text-[22px] font-medium font-[Roboto]"
              key="5"
              aria-label="Accordion 5"
              title="Website reponse taking time, how to improve?"
            >
              <p className="text-[18px] text-start text-wrap text-[#828282] font-[Roboto] font-medium">
                Our Customer Experience Team is available 7 days a week and we
                offer 2 ways to get in contact.Email and Chat . We try to reply
                quickly, so you need not to wait too long for a response!.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};
export default Faqs;
