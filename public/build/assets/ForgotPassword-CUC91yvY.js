import{W as n,j as s,a as d}from"./app-AjMizA1b.js";import{G as u}from"./GuestLayout-D1ellpJS.js";import{T as c,I as x}from"./TextInput-ByakRqzy.js";import{P as p}from"./PrimaryButton-bO3p9uzl.js";import{N as f}from"./Navbar-CGdn4DoI.js";import"./ApplicationLogo-BAKz6Np0.js";import"./index-DnhOi7Cn.js";function y({status:a}){const{data:t,setData:o,post:r,processing:m,errors:i}=n({email:""}),l=e=>{e.preventDefault(),r(route("password.email"))};return s.jsxs("div",{className:"font-oswald",children:[s.jsx(f,{}),s.jsxs(u,{children:[s.jsx(d,{title:"Forgot Password"}),s.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),a&&s.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:a}),s.jsxs("form",{onSubmit:l,children:[s.jsx(c,{id:"email",type:"email",name:"email",value:t.email,className:"mt-1 block w-full",isFocused:!0,onChange:e=>o("email",e.target.value)}),s.jsx(x,{message:i.email,className:"mt-2"}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(p,{className:"ms-4",disabled:m,children:"Email Password Reset Link"})})]})]})]})}export{y as default};
