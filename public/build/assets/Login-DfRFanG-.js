import{j as e,W as p,r as f,a as j,d as g}from"./app-CMOklFNi.js";import{G as h}from"./GuestLayout-De_UZ-e_.js";import{T as i,I as l}from"./TextInput-DdG2XRAG.js";import{I as n}from"./InputLabel-CgeYMArp.js";import{P as b}from"./PrimaryButton-Bd1W9gIQ.js";import{N as w}from"./Navbar-Dt3GcQHO.js";import{F as v}from"./Footer-W5EKrLFx.js";import"./ApplicationLogo-CK4YCCr9.js";import"./index-B0hW78u4.js";function N({className:r="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded border-gray-300 text-primary shadow-sm focus:ring-primary "+r})}function G({status:r,canResetPassword:a}){const{data:t,setData:m,post:d,processing:c,errors:o,reset:u}=p({email:"",password:"",remember:!1});f.useEffect(()=>()=>{u("password")},[]);const x=s=>{s.preventDefault(),d(route("login"))};return e.jsxs("div",{children:[e.jsx(w,{}),e.jsxs(h,{children:[e.jsx(j,{title:"Log in"}),r&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:r}),e.jsxs("form",{onSubmit:x,children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"email",value:"Email"}),e.jsx(i,{id:"email",type:"email",name:"email",value:t.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:s=>m("email",s.target.value)}),e.jsx(l,{message:o.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(n,{htmlFor:"password",value:"Password"}),e.jsx(i,{id:"password",type:"password",name:"password",value:t.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:s=>m("password",s.target.value)}),e.jsx(l,{message:o.password,className:"mt-2"})]}),e.jsx("div",{className:"block mt-4",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(N,{name:"remember",checked:t.remember,onChange:s=>m("remember",s.target.checked)}),e.jsx("span",{className:"ms-2 text-sm text-gray-600",children:"Remember me"})]})}),e.jsxs("div",{className:"flex items-center justify-end mt-4",children:[a&&e.jsx(g,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e.jsx(b,{className:"ms-4",disabled:c,children:"Log in"})]})]})]}),e.jsx(v,{})]})}export{G as default};
