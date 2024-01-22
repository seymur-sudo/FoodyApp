import React from 'react'
import Link from 'next/link'
import DashboardIcon from '../../../public/svgs/AdminDashboardIcon.svg'
import ProductIcon from '../../../public/svgs/AdminProductIcon.svg'
import RestaurantIcon from '../../../public/svgs/AdminRestaurantIcon.svg'
import CategoryIcon from '../../../public/svgs/AdminCategoryIcon.svg'
import OrderIcon from '../../../public/svgs/AdminOrderIcon.svg'
import OfferIcon from '../../../public/svgs/AdminOfferIcon.svg'
import LogoutIcon from '../../../public/svgs/AdminLogoutIcon.svg'
import { BottomLogo } from '../BottomLogo'
import {ROUTER} from '../../../shared/constant/router'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

export const Aside:React.FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className='h-full flex flex-col bg-bgc'>
    <aside className=' sm:block hidden h-2/5 w-fit pb-10 pt-8 pl-6 pr-4 rounded-xl bg-[#C74FEB]'>
        <Link className='flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row' href={ROUTER.ADMIN}>
          <Image className='mr-4' alt='icon' src={DashboardIcon}/>
          <p className='text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]'>{t('Dashboard')}</p>
        </Link>
        <Link className='flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row' href={ROUTER.ADMIN_PRODUCTS}>
          <Image className='mr-4' alt='icon' src={ProductIcon}/>
          <p className='text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]'>{t('Products')}</p>
        </Link>
        <Link className='flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row' href={ROUTER.ADMIN_RESTAURANTS}>
          <Image className='mr-4' alt='icon' src={RestaurantIcon}/>
          <p className='text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]'>{t('Restaurants')}</p>
        </Link>
        <Link className='flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row' href={ROUTER.ADMIN_CATEGORY}>
          <Image className='mr-4' alt='icon' src={CategoryIcon}/>
          <p className='text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]'>{t('Category')}</p>
        </Link>
        <Link className='flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row' href={ROUTER.ADMIN_ORDERS}>
          <Image className='mr-4' alt='icon' src={OrderIcon}/>
          <p className='text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]'>{t('Orders')}</p>
        </Link>
        <Link className='flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row' href={ROUTER.ADMIN_OFFERS}>
          <Image className='mr-4' alt='icon' src={OfferIcon}/>
          <p className='text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]'>{t('Offers')}</p>
        </Link>
        <Link className='flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row' href={ROUTER.ADMIN_LOGIN}>
          <Image className='mr-4' alt='icon' src={LogoutIcon}/>
          <p className='text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]'>{t('Logout')}</p>
        </Link>
    </aside>
    <BottomLogo/>
    </div>
  )
}