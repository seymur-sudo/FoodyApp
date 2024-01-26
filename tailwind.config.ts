import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens:{
      lg:'1140px',
      xl:'1140px',
      '2xl':'1140px'
      },
    },
    fontFamily:{
      'mukta':["Mukta"],
      'montserrat': ["Montserrat"],
      'body': ['Roboto']
    },
    extend: {
      borderRadius: {
        '4': '4px',
        '5':'5px',
      },
      boxShadow:{
        'shadoww':'0px 4px 4px 0px rgba(0, 0, 0, 0.25);',
        'shadow2':'0px 4px 4px 0px rgba(57, 57, 57, 0.25);',
        'shadow3':'0px 4px 4px 0px rgba(39, 174, 96, 0.20)',
        'shadow4':'0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        'shadow4Dark':'0px 4px 4px 0px rgba(181, 244, 243, 0.25)',
        'shadow5':'0px 3px 8px -2px rgba(0, 0, 0, 0.20)',
        'shadow5Dark':'0px 3px 8px -2px rgba(22, 201, 251, 0.2)'
      },
      padding: {
        '10px': '10px',
        '11px': '11px',
        '19px': '19px',
        '40px':'40px',
        '57px':'57px',
        '6px':'6px',
        
      },
      gap:{
        'gapp':'30px',
        'gp': '45px'
      },
      margin:{
        "57px":"57px",
        "75px":"75px",
        "72px":"72px",
        "105px":"105px",
        "18":"72px",
        '15':'60px',
        "10px":"10px",
        "11px":"11px",
        "68px":"68px",
        "155px":"155px",
        "87px":"87px",
        "174px":"174px",
        "20px":"20px",
        '30':'30px',
        '55':"55px",        
        '52':"52px",
        "13px":"13px",
        "9px":"9px",
        "18px":"18px",
        "199px":"199px",
        "32px":"32px",
        "26px":"26px",
        "23px":"23px",
        "40px":"40px",
        "48px":"48px",
        "58px":"58px",
        "47px":"47px",
        'mll':'17px',
        'mld': '153px',
        'mtd': '22px',
        'mlu': '16px'
      },
      height:{
        "input":"50px",
        "68px":"68px",
        '153':'153px',
        "resinput":"28px",
        'hh':'346px',
        'dashh': '472px'
      },
      fontSize:{
        "28":"28px",
        "30":"30px",
        "24":"24px",
        // "22":"22px",
        "35":"35px",
        "25":"25px",
        "14":"14px",
        "18":"18px"
        
      },
      width: {
        '337': '337px',
        'max-content': 'max-content',
        '346': '346px',
        '507': '507px',
        "174":"174px",
        '207': '207px',
        '216': '216px',
        '318': '318px',
        '405': '405px',
        '33':'33px',
        '41':'41px',
        'wxl':'235px',
        'wll': '174px',
        'wsl': '472px'
      },
      colors:{
        'pink': '#C74FEB',
        "clientInput":"#FFE7E7",
        "clientRed":"#EB5757",
        "logocolor":"#F5F5F5",
        "gray1":"#C7C7C7",
        "grayInput":"#4F4F4F",
        "clientGray":"#828282",
        "logodotcolor":"#EAAB00",
        "inputBg":"#5A5B70",
        "inputMain":"#38394E",
      },
  
      backgroundColor:{
        "loginBgc":"#38394E",
        "bgc":"#1E1E30",
        "loginBtn":"#C035A2",
        'bgg':'#27283C',
        'bgb': '#1E1E30'
      }
    },
  },
  plugins: [],
}
export default config
