import{j as e,d as a}from"./app-CwDc9VGS.js";import{r}from"./index-CswU6oJv.js";import{N as l}from"./Navbar-DYJMlJpW.js";import{F as n}from"./Footer-CFqFhyxa.js";function i({props:s}){return e.jsx("div",{className:"w-full hover:bg-gray-200",children:e.jsx(a,{href:`/dashboard/${s.company.slug}`,children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(r.Avatar,{className:"mr-2",src:s.company.logo!=""?"/"+s.company.logo:"/images/user/user.png"}),e.jsxs("div",{className:"flex justify-between py-4 px-2 items-center w-full border-b-2 ",children:[e.jsxs("div",{className:"w-full content-start",children:[e.jsx("div",{className:" text-start text-lg font-semibold",children:s.company.name}),e.jsx("span",{className:"text-gray-900"})]}),e.jsx("div",{className:"p-2 text-xs font-light text-white bg-primary rounded-full",children:s.position})]})]})})})}function x({companies:s}){return console.log(s),e.jsxs("div",{children:[e.jsx(l,{}),e.jsxs("section",{className:"max-w-4xl p-6 mx-auto bg-gray-100 rounded-md shadow-md dark:bg-gray-800 my-10",children:[e.jsxs("div",{className:"flex justify-between my-3",children:[e.jsx("h1",{className:"text-xl font-bold text-gray-800 center dark:text-white",children:"My Businesses"}),e.jsx(a,{href:"/company/register",children:e.jsx(r.Button,{className:"bg-primary",children:"Register New Business"})})]}),s&&s.map(t=>e.jsx(i,{props:t}))]}),e.jsx(n,{})]})}export{x as default};
