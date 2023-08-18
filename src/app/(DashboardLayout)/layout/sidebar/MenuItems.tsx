import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconFileCertificate,
  IconFileDescription,
  IconSettings,
  IconFileSettings,
  IconSettingsAutomation,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Tools",
  },
  {
    id: uniqueId(),
    title: "Resume",
    icon: IconFileCertificate,
    href: "/tools/resume",
  },
  {
    id: uniqueId(),
    title: "Cover Letter",
    icon: IconFileDescription,
    href: "/tools/coverletter",
  },
  {
    id: uniqueId(),
    title: "Job Task",
    icon: IconSettingsAutomation,
    href: "/tools/jobtasks",
  },
  {
    id: uniqueId(),
    title: "Config",
    icon: IconFileSettings,
    href: "/tools/jobconfig",
  },
 
];

export default Menuitems;



//**
 
 // ,
 // {
 //   navlabel: true,
 //   subheader: "Auth",
//  },
 // {
 //   id: uniqueId(),
 //   title: "Login",
 //   icon: IconLogin,
 //   href: "/authentication/login",
 // },
 // {
  //  id: uniqueId(),
  //  title: "Register",
  //  icon: IconUserPlus,
//    href: "/authentication/register",
//  },
 // {
 //   navlabel: true,
 //   subheader: "Extra",
 // },
 // {
 //   id: uniqueId(),
  //  title: "Icons",
 //   icon: IconMoodHappy,
  //  href: "/icons",
  //},
 // {
  //  id: uniqueId(),
   // title: "Sample Page",
  //  icon: IconAperture,
   // href: "/sample-page",
 // },
 // {
   // id: uniqueId(),
   // title: "Settings",
   // icon: IconSettings,
  //  href: "/utilities/typography",
 // },
 // */
//
//*/
