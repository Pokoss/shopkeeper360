import{r as s,j as t,b as Y,y as x}from"./app-BbYHg183.js";import{L as ee}from"./Layout-DSOdhjl9.js";import{r as a}from"./index-DfelUISi.js";import{X as te}from"./index.es-Bi7Rxc_D.js";import{S as ae}from"./react-select.esm-QUWrzaNv.js";import{Q as se,B as o}from"./react-toastify.esm-CJl8foUy.js";/* empty css                      */function re({company:l,stock_item:h,product:m}){console.log(l);const[y,L]=s.useState(""),[d,v]=s.useState(""),[b,j]=s.useState(""),[S,f]=s.useState(""),[P,w]=s.useState(""),[C,k]=s.useState(null),Q=e=>{k(e),console.log(e.value)},[A,ne]=s.useState([]),[H,i]=s.useState([]),[R,E]=s.useState(""),[_,B]=s.useState(""),[q,N]=s.useState(""),[M,F]=s.useState("");function $(e,r,c,n,O){p("xl"),E(e+" ("+r+")"),F(c),B(n),N(O)}s.useEffect(()=>{var e=m.data.map(r=>({value:r.id,label:r.name+" ("+r.brand+")"}));i(e)},[m]);const T=async e=>{if(w(e),!e){var r=m.data.map(n=>({value:n.id,label:n.name+" ("+n.brand+")"}));i(r);return}try{const n=await Y.get(`/search_stock?q=${e}`);if(console.log("full response",n),n.data.product.data&&n.data.product.data){console.log("pro data:",n.data.product.data);var c=n.data.product.data.map(g=>({value:g.id,label:g.name+" ("+g.brand+")"}));i(c)}else console.error("unexpected"),i([])}catch(n){console.error("Error fetching products:",n),i([])}},W={headRow:{style:{border:"none"}},headCells:{style:{color:"#997400",fontSize:"14px"}},rows:{highlightOnHoverStyle:{backgroundColor:"rgb(230, 244, 244)",borderBottomColor:"#FFFFFF",outline:"1px solid #FFFFFF"}},pagination:{style:{border:"none"}}},V=[{name:"Product",selector:e=>e.product.name},{name:"Brand",selector:e=>e.product.brand},{name:"Quantity",selector:e=>e.quantity},{name:"Batch",selector:e=>e.batch},{name:"Expiry Date",selector:e=>e.expiry_date},,{name:"Added On",selector:e=>new Date(e.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"})},{selector:e=>t.jsx("button",{onClick:()=>$(e.product.name,e.product.brand,e.quantity,e.batch,e.expiry_date),className:"bg-green-600 rounded-md p-1",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})})})}],[oe,D]=s.useState(A.current_page),X=e=>{x.get(`/dashboard/${l.company.slug}/inventory/stock`,{page:e,search:y},{preserveState:!0})},U=e=>{D(e),X(e)},Z=e=>{e.preventDefault(),L(e.target.value),D(1);var r=e.target.value;x.get(`/dashboard/${l.company.slug}/inventory/stock`,{search:r,page:1},{preserveState:!0,preserveScroll:!0,onSuccess:()=>{}})},G=async e=>{e.preventDefault(),o.loading();var r=l.company_id;o.success(r);var c=C.value;if(d=="")o.dismiss(),o.error("Write the quantity");else if(d<=0)o.dismiss(),o.error("Quantity cannot be 0 pr less");else try{x.post("/add-stock",{product_id:c,companyId:r,quantity:d,batch:b,expiry:S},{onSuccess:()=>{o.success("Product added successfully"),w(""),k(s.useState(null)),v(""),j(""),f(""),u()}})}catch(n){o.dismiss(),o.error(n)}},[z,J]=s.useState(null),[I,K]=s.useState(null),u=e=>J(e),p=e=>K(e);return t.jsxs("div",{children:[t.jsx(s.Fragment,{children:t.jsxs(a.Dialog,{open:z==="xl",size:z,handler:u,children:[t.jsx(a.DialogHeader,{children:t.jsx(a.Typography,{variant:"h5",color:"blue-gray",children:"Add a stock"})}),t.jsxs("form",{onSubmit:G,children:[t.jsxs(a.DialogBody,{divider:!0,className:"grid place-items-center gap-4",children:[t.jsx(ae,{className:"w-full",value:C,onChange:Q,options:H,isClearable:!0,placeholder:"Search for a product...",onInputChange:T,inputValue:P,loadingMessage:"searching..",styles:{control:(e,r)=>({...e,borderColor:(r.isFocused,"brown")})}}),t.jsx(a.Input,{label:"Quantity",type:"number",value:d,onChange:e=>v(e.target.value)}),t.jsx(a.Input,{label:"Batch",value:b,onChange:e=>j(e.target.value)}),t.jsx(a.Input,{label:"Expiry",type:"date",value:S,onChange:e=>f(e.target.value)})]}),t.jsxs(a.DialogFooter,{className:"space-x-2",children:[t.jsx(a.Button,{onClick:u,variant:"gradient",color:"blue-gray",children:"Close"}),t.jsx(a.Button,{type:"submit",className:"bg-primary",children:"Add"})]})]})]})}),t.jsx(te,{title:t.jsxs("div",{className:"flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2",children:[t.jsx("span",{children:"Stock"}),t.jsxs("div",{className:"flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden",children:[t.jsx(a.Input,{type:"text",label:"Search",value:y,onChange:Z,className:"md:w-full"}),t.jsx("span",{children:t.jsxs(a.Button,{size:"sm",color:"green",type:"submit",className:"flex h-10 items-center bg-primary",onClick:()=>u("xl"),children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"mr-2 w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})}),"Add"]})})]})]}),columns:V,data:h.data,customStyles:W,pointerOnHover:!0,onRowClicked:(e,r)=>!children&&ExpandableComponent?null:editRow(e,r),highlightOnHover:!0,pagination:!0,paginationServer:!0,paginationTotalRows:h.total,paginationPerPage:h.per_page,onChangePage:U,paginationRowsPerPageOptions:[]}),t.jsx(s.Fragment,{children:t.jsxs(a.Dialog,{open:I==="xl",size:I,handler:p,children:[t.jsx(a.DialogHeader,{children:t.jsx(a.Typography,{variant:"h5",color:"blue-gray",children:"Edit a Stock"})}),t.jsxs("form",{children:[t.jsxs(a.DialogBody,{divider:!0,className:"grid place-items-center gap-4",children:[t.jsx(a.Input,{label:"Name",disabled:!0,value:R,onChange:e=>E(e.target.value),size:"sm"}),t.jsx(a.Input,{label:"Quantity",type:"number",value:M,onChange:e=>F(e.target.value),size:"sm"}),t.jsx(a.Input,{label:"Batch",value:_,onChange:e=>B(e.target.value),size:"sm"}),t.jsx(a.Input,{label:"Expiry",type:"date",value:q,onChange:e=>N(e.target.value),size:"sm"})]}),t.jsx(a.DialogFooter,{children:t.jsxs("div",{className:"flex w-full justify-between",children:[t.jsx(a.Button,{onClick:p,variant:"gradient",color:"red",children:"Delete"}),t.jsxs("div",{className:"space-x-2",children:[t.jsx(a.Button,{onClick:p,variant:"gradient",color:"blue-gray",children:"Close"}),t.jsx(a.Button,{type:"submit",className:"bg-primary",children:"Edit"})]})]})})]})]})}),t.jsx(se,{})]})}re.layout=l=>t.jsx(ee,{children:l,props:l.props.company});export{re as default};
