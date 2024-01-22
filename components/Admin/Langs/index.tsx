import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from "next/link";
import en from "../../../public/svgs/en.svg";
import az from "../../../public/svgs/az.svg";
import fr from "../../../public/svgs/fr.svg";

type Languages='fr' | 'az' | 'en' | string

export const LangSelect: React.FC = () => {
const { t } = useTranslation('common')
const router = useRouter()
const updatedLocale: Languages = router.locale || 'en'
const [currentLang,setCurrentLang]=useState<Languages>('en')
const [isDropdownOpen,setIsDropdownOpen]=useState<boolean>(false)
useEffect(()=>{
    setCurrentLang(updatedLocale)
},[updatedLocale])
const changeLang=(language:Languages)=>{
    setCurrentLang(language)
    setIsDropdownOpen(false)
    localStorage.setItem("language", language);
}

  return (
    <div className=" relative  flex flex-col">
    <Image onClick={()=>{setIsDropdownOpen(!isDropdownOpen)}} alt="lang" className=" scale-100 hover:scale-110" src={currentLang==='en'?en:currentLang==='fr'?fr:currentLang==='az'?az:''}/>
    {isDropdownOpen &&
    <div className="flex absolute top-[50px] z-30 flex-col">
        {currentLang==='en'?
        <div>
            <Link href='' locale='az' onClick={() => changeLang('az')}>
                <Image className=" pb-2 scale-100 hover:scale-110" src={az} alt='az' />
            </Link>
            <Link href='' locale='fr' onClick={() => changeLang('fr')}>
                <Image className="scale-100 hover:scale-110" src={fr} alt='fr' />
            </Link>
        </div>:
        currentLang==='az'?
        <div>
            <Link href='' locale='en' onClick={() => changeLang('en')}>
                <Image className="pb-2 scale-100 hover:scale-110" src={en} alt='en' />
            </Link>
            <Link href='' locale='fr' onClick={() => changeLang('fr')}>
                <Image className=" scale-100 hover:scale-110" src={fr} alt='fr' />
            </Link>
        </div>:
        currentLang==='fr'?
        <div>
             <Link href='' locale='az' onClick={() => changeLang('az')}>
                <Image className="pb-2 scale-100 hover:scale-110" src={az} alt='az' />
            </Link>
            <Link href='' locale='en' onClick={() => changeLang('en')}>
                <Image className=" scale-100 hover:scale-110" src={en} alt='en' />
            </Link>
        </div>:''
        }
    </div>
    }
    </div>
  );
};
