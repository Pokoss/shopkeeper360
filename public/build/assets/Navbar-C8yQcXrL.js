import{r as i,q as o,j as e,d as r}from"./app-BBasbjv1.js";import{r as s}from"./index-Ve6Pk4NC.js";function d(){const[n,l]=i.useState(!1),{auth:t}=o().props;return console.log(t),e.jsx("nav",{className:"font-oswald w-full bg-primary shadow sticky top-0 z-50",children:e.jsxs("div",{className:"justify-between px-2 mx-auto lg:max-w-7xl md:items-center md:flex md:px-4",children:[e.jsx("div",{children:e.jsxs("div",{className:"flex items-center justify-between py-3 md:py-4 md:block",children:[e.jsxs(r,{className:"flex items-center",href:"/",children:[e.jsx("img",{src:"/images/user/shopwhite.png",className:"h-10 cursor-pointer"}),e.jsx("p",{className:"ml-2 text-white text-lg font-semibold",children:"Shopkeeper360"})]}),e.jsx("div",{className:"md:hidden",children:e.jsx("button",{className:"p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border",onClick:()=>l(!n),children:n?e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}):e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h16"})})})})]})}),e.jsx("div",{children:e.jsx("div",{className:`flex-1 justify-self-center mt-8 md:block md:pb-0 md:mt-0 ${n?"block":"hidden"}`,children:e.jsxs("ul",{className:"flex flex-col md:flex-row items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0",children:[e.jsx("li",{className:"text-white hover:text-yellow-500",children:e.jsx(r,{href:"/home",children:e.jsx("p",{children:"Home"})})}),e.jsx("li",{className:"text-white hover:text-yellow-500",children:e.jsx(r,{href:"/",children:e.jsx("p",{children:"About"})})}),e.jsx("li",{className:"text-white hover:text-yellow-500",children:e.jsxs(s.Menu,{animate:{mount:{y:0},unmount:{y:25}},children:[e.jsx(s.MenuHandler,{children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-7 h-7",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"})})}),e.jsxs(s.MenuList,{children:[e.jsx(r,{href:"/favourite-business",children:e.jsx(s.MenuItem,{children:"Favourite Businesses"})}),e.jsx(r,{href:"/company",children:e.jsx(s.MenuItem,{children:"Favourite Products"})})]})]})}),e.jsx("li",{className:"text-white hover:text-yellow-500",children:e.jsxs(s.Menu,{animate:{mount:{y:0},unmount:{y:25}},children:[e.jsx(s.MenuHandler,{children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-7 h-7",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"})})}),e.jsxs(s.MenuList,{children:[e.jsx(r,{href:"/company",children:e.jsx(s.MenuItem,{children:"Search Business"})}),e.jsx(r,{href:"/products/nearby",children:e.jsx(s.MenuItem,{children:"Search Product"})})]})]})}),e.jsx("li",{className:"text-white hover:text-yellow-500",children:e.jsxs(s.Menu,{animate:{mount:{y:0},unmount:{y:25}},children:[e.jsx(s.MenuHandler,{children:e.jsx(s.Avatar,{src:"/images/user/user.png",alt:"avatar",variant:"circular"})}),e.jsxs(s.MenuList,{children:[t.user?e.jsx(r,{href:"/company",children:e.jsx(s.MenuItem,{children:"My Businesses"})}):e.jsx(r,{href:"/login",children:e.jsx(s.MenuItem,{children:"Login"})}),t.user?e.jsx(r,{href:route("logout"),method:"post",as:"button",className:"w-full",children:e.jsx(s.MenuItem,{children:"Login Out"})}):e.jsx(r,{href:"/register",children:e.jsx(s.MenuItem,{children:"Create Account"})})]})]})})]})})})]})})}export{d as N};