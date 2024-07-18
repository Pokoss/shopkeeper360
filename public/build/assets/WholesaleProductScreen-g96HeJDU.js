import{r as t,j as s,y as p}from"./app-DqdQbFl3.js";import{L as B}from"./Layout-BUSpZ79B.js";import{r as a}from"./index-BE2QP_1H.js";import{C as A}from"./compressor.esm-BndlrjPy.js";import{X as O}from"./index.es-BCFqlvJK.js";import{Q as z,B as r}from"./react-toastify.esm-uHPeAeNH.js";/* empty css                      */function H({company:n,products:l,product:R,category:g}){console.log(l);const[h,w]=t.useState(""),[E,x]=t.useState(l.current_page);t.useState(""),t.useState(null);const[u,W]=t.useState(""),[i,y]=t.useState(""),[m,b]=t.useState(""),[j,_]=t.useState(""),[v,f]=t.useState(null),C=e=>{const o=e.target.files[0];new A(o,{quality:.6,success(c){f(c)},error(c){console.log(c.message)}})},N=e=>{p.get(`/dashboard/${n.company.slug}/wholesale/products`,{page:e,search:h},{preserveState:!0})},F=e=>{x(e),N(e)},P=e=>{e.preventDefault(),w(e.target.value),x(1);var o=e.target.value;p.get(`/dashboard/${n.company.slug}/wholesale/products`,{search:o,page:1},{preserveState:!0,preserveScroll:!0,onSuccess:()=>{}})},k=async e=>{e.preventDefault(),r.loading();var o=n.company_id;if(v==null)r.dismiss(),r.error("Product Image is a must Online");else if(u=="")r.dismiss(),r.error("Select the product");else if(i=="0"||i=="")r.dismiss(),r.error("Select the category");else if(m=="")r.dismiss(),r.error("Select the category");else{r.success("success");try{p.post("/add-wholesale-product",{companyId:o,productId:u,categoryId:i,image:v,description:m,productName:j},{onSuccess:()=>{r.success("Product added successfully"),d(),o(""),u(""),y(""),j(""),f(null)}})}catch(c){r.dismiss(),r.error(c)}}};t.useState([]);const[S,D]=t.useState(null),d=e=>D(e);t.useState(null);const I={headRow:{style:{border:"none"}},headCells:{style:{color:"#997400",fontSize:"14px"}},rows:{highlightOnHoverStyle:{backgroundColor:"rgb(230, 244, 244)",borderBottomColor:"#FFFFFF",outline:"1px solid #FFFFFF"}},pagination:{style:{border:"none"}}},L=[{selector:e=>s.jsx("img",{className:"h-28 w-28 object-cover rounded-md",src:"/"+e.image})},{name:"Name",selector:e=>e.product.name},{name:"Category",selector:e=>e.category.name},{name:"Description",selector:e=>e.description},,{name:"Added On",selector:e=>new Date(e.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"})},{selector:e=>s.jsx("button",{onClick:()=>editEmployee(e.user.name,e.user.email,e.position,e.id),className:"bg-green-600 rounded-md p-1",children:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-5 h-5",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})})})}];return s.jsxs("div",{children:[s.jsx(O,{title:s.jsxs("div",{className:"flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2",children:[s.jsx("span",{children:"Wholesale Product"}),s.jsxs("div",{className:"flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden",children:[s.jsx(a.Input,{type:"text",label:"Search",value:h,onChange:P,className:"md:w-full"}),s.jsx("span",{children:s.jsxs(a.Button,{size:"sm",color:"success",type:"submit",className:"flex h-10 items-center bg-primary",onClick:()=>d("xl"),children:[s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"mr-2 w-5 h-5",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})}),"Add"]})})]})]}),columns:L,data:l.data,customStyles:I,pointerOnHover:!0,onRowClicked:(e,o)=>!children&&ExpandableComponent?null:editRow(e,o),highlightOnHover:!0,pagination:!0,paginationServer:!0,paginationTotalRows:l.total,paginationPerPage:l.per_page,onChangePage:F,paginationRowsPerPageOptions:[]}),s.jsx(t.Fragment,{children:s.jsxs(a.Dialog,{open:S==="xl",size:S,handler:d,children:[s.jsx(a.DialogHeader,{children:s.jsx(a.Typography,{variant:"h5",color:"blue-gray",children:"Add a product"})}),s.jsxs("form",{onSubmit:k,children:[s.jsxs(a.DialogBody,{divider:!0,className:"h-[28rem] overflow-scroll grid place-items-center gap-4",children:[s.jsx(a.Input,{label:"Company Logo",accept:".jpg,.jpeg,.png",size:"md",type:"file",onChange:C}),s.jsxs("select",{className:"w-full",value:i,onChange:e=>y(e.target.value),children:[s.jsx("option",{value:0,className:"bg-gray-200",children:" Select the category......."}),g&&g.map((e,o)=>s.jsxs("option",{value:e.id,children:[" ",e.name]}))]}),s.jsx(a.Input,{label:"Description",value:m,onChange:e=>b(e.target.value),size:"sm"})]}),s.jsxs(a.DialogFooter,{className:"space-x-2",children:[s.jsx(a.Button,{onClick:d,variant:"gradient",color:"blue-gray",children:"Close"}),s.jsx(a.Button,{type:"submit",className:"bg-primary",children:"Add"})]})]})]})}),s.jsx(z,{})]})}H.layout=n=>s.jsx(B,{children:n,props:n.props.company});export{H as default};
