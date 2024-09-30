import{r as a,j as e,y as d}from"./app-BBasbjv1.js";import{r as t}from"./index-Ve6Pk4NC.js";import{X as W}from"./index.es-BnKg5YEA.js";import{L as M}from"./Layout-B0ltOled.js";import{Q as X,B as n}from"./react-toastify.esm-dZoPzqJH.js";/* empty css                      */function $({company:o,employees:i}){console.log(i);const[p,m]=a.useState(""),[h,g]=a.useState(""),[C,x]=a.useState(""),[O,j]=a.useState(""),[y,v]=a.useState(""),[b,k]=a.useState(""),[f,D]=a.useState(""),[Q,S]=a.useState(i.current_page),N=s=>{d.get(`/dashboard/${o.company.slug}/hr/employee`,{page:s,search:f},{preserveState:!0})},F=s=>{S(s),N(s)},P=s=>{s.preventDefault(),D(s.target.value),S(1);var r=s.target.value;d.get(`/dashboard/${o.company.slug}/hr/employee`,{search:r,page:1},{preserveState:!0,preserveScroll:!0,onSuccess:()=>{}})},B=async s=>{s.preventDefault();try{d.post("/delete-employee",{editEmployeeId:b},{onSuccess:()=>{n.success("Deleted Successfully"),c()}})}catch(r){n.dismiss(),n.error(r),console.log("Error checking username:",r)}},z=async s=>{s.preventDefault();try{d.post("/edit-employee",{editEmployeeId:b,editPosition:y},{onSuccess:()=>{n.success("Edited Successfully"),c()}})}catch(r){n.dismiss(),n.error(r),console.log("Error checking username:",r)}},L=async s=>{s.preventDefault();var r=o.company_id;if(h=="")n.dismiss(),n.error("Write the email of the employee");else if(p=="")n.dismiss(),n.error("State the position");else try{d.post("/add-employee",{company_id:r,employeeEmail:h,position:p},{onSuccess:()=>{n.success("registered successfully"),g(""),m(""),l()}})}catch(u){n.dismiss(),n.error(u),g(""),m(""),console.log("Error checking username:",u),l()}};function A(s,r,u,T){c("xl"),x(s),j(r),v(u),k(T)}const H={headRow:{style:{border:"none"}},headCells:{style:{color:"#997400",fontSize:"14px"}},rows:{highlightOnHoverStyle:{backgroundColor:"rgb(230, 244, 244)",borderBottomColor:"#FFFFFF",outline:"1px solid #FFFFFF"}},pagination:{style:{border:"none"}}},I=[{name:"Name",selector:s=>s.user.name},{name:"Position",selector:s=>s.position},{name:"Email",selector:s=>s.user.email},,{name:"Added On",selector:s=>new Date(s.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"})},{selector:s=>e.jsx("button",{onClick:()=>A(s.user.name,s.user.email,s.position,s.id),className:"bg-green-600 rounded-md p-1",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})})})}],[E,R]=a.useState(null),l=s=>R(s),[w,_]=a.useState(null),c=s=>_(s);return e.jsxs("div",{children:[e.jsx(a.Fragment,{children:e.jsxs(t.Dialog,{open:E==="xl",size:E,handler:l,children:[e.jsx(t.DialogHeader,{children:e.jsx(t.Typography,{variant:"h5",color:"blue-gray",children:"Add a employee"})}),e.jsxs("form",{onSubmit:L,children:[e.jsxs(t.DialogBody,{divider:!0,className:"grid place-items-center gap-4",children:[e.jsx(t.Input,{label:"Email",value:h,onChange:s=>g(s.target.value),size:"sm"}),e.jsxs(t.Select,{color:"deep-orange",label:"Position",value:p,onChange:s=>m(s),children:[e.jsx(t.Option,{value:"owner",children:"owner"}),e.jsx(t.Option,{value:"admin",children:"admin"}),e.jsx(t.Option,{value:"accountant",children:"accountant"}),e.jsx(t.Option,{value:"hr",children:"hr"}),e.jsx(t.Option,{value:"dispenser",children:"dispenser"}),e.jsx(t.Option,{value:"cashier",children:"cashier"})]})]}),e.jsxs(t.DialogFooter,{className:"space-x-2",children:[e.jsx(t.Button,{onClick:l,variant:"gradient",color:"blue-gray",children:"Close"}),e.jsx(t.Button,{type:"submit",className:"bg-primary",children:"Add"})]})]})]})}),e.jsx(W,{title:e.jsxs("div",{className:"flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2",children:[e.jsx("span",{children:"Employee"}),e.jsxs("div",{className:"flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden",children:[e.jsx(t.Input,{type:"text",label:"Search",value:f,onChange:P,className:"md:w-full"}),e.jsx("span",{children:e.jsxs(t.Button,{size:"sm",color:"success",type:"submit",className:"flex h-10 items-center bg-primary",onClick:()=>l("xl"),children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"mr-2 w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})}),"Add"]})})]})]}),columns:I,data:i.data,customStyles:H,pointerOnHover:!0,onRowClicked:(s,r)=>!children&&ExpandableComponent?null:editRow(s,r),highlightOnHover:!0,pagination:!0,paginationServer:!0,paginationTotalRows:i.total,paginationPerPage:i.per_page,onChangePage:F,paginationRowsPerPageOptions:[]}),e.jsx(a.Fragment,{children:e.jsxs(t.Dialog,{open:w==="xl",size:w,handler:c,children:[e.jsx(t.DialogHeader,{children:e.jsx(t.Typography,{variant:"h5",color:"blue-gray",children:"Edit Employee"})}),e.jsxs("form",{onSubmit:z,children:[e.jsxs(t.DialogBody,{divider:!0,className:"grid place-items-center gap-4",children:[e.jsx(t.Input,{label:"Name",disabled:!0,value:C,onChange:s=>x(s.target.value),size:"sm"}),e.jsx(t.Input,{label:"Email",disabled:!0,value:O,onChange:s=>j(s.target.value),size:"sm"}),e.jsxs(t.Select,{color:"deep-orange",label:"Position",value:y,onChange:s=>v(s),children:[e.jsx(t.Option,{value:"owner",children:"owner"}),e.jsx(t.Option,{value:"admin",children:"admin"}),e.jsx(t.Option,{value:"accountant",children:"accountant"}),e.jsx(t.Option,{value:"hr",children:"hr"}),e.jsx(t.Option,{value:"dispenser",children:"dispenser"}),e.jsx(t.Option,{value:"cashier",children:"cashier"})]})]}),e.jsx(t.DialogFooter,{children:e.jsxs("div",{className:"flex w-full justify-between",children:[e.jsx(t.Button,{onClick:B,variant:"gradient",color:"red",children:"Delete"}),e.jsxs("div",{className:"space-x-2",children:[e.jsx(t.Button,{onClick:c,variant:"gradient",color:"blue-gray",children:"Close"}),e.jsx(t.Button,{type:"submit",className:"bg-primary",children:"Edit"})]})]})})]})]})}),e.jsx(X,{})]})}$.layout=o=>e.jsx(M,{children:o,props:o.props.company});export{$ as default};