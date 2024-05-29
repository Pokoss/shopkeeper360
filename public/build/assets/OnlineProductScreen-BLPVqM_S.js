import{r as a,j as t,y}from"./app-C8WKr6KS.js";import{L as X}from"./Layout-l3DxoYn-.js";import{S as Q}from"./react-select.esm-BGGa9RfJ.js";import{r as n}from"./index-faAi_gFe.js";import{C as U}from"./compressor.esm-BndlrjPy.js";import{X as Z}from"./index.es-Co7BxNCE.js";import{Q as G,B as r}from"./react-toastify.esm-Bd0QyV2l.js";/* empty css                      */function J({company:l,products:d,product:m,category:f}){console.log(d);const[v,F]=a.useState(""),[K,S]=a.useState(1),[k,P]=a.useState(""),[I,D]=a.useState(null),L=e=>{D(e),O(e.value),A(e.product),console.log(e)},[g,O]=a.useState(""),[u,j]=a.useState(""),[h,B]=a.useState(""),[b,A]=a.useState(""),[w,C]=a.useState(null),z=e=>{const s=e.target.files[0];new U(s,{quality:.6,success(c){C(c)},error(c){console.log(c.message)}})},E=e=>{y.get(`/dashboard/${l.company.slug}/online-portal/product`,{page:e,search:v},{preserveState:!0})},H=e=>{S(e),E(e)},R=e=>{e.preventDefault(),F(e.target.value),S(1);var s=e.target.value;y.get(`/dashboard/${l.company.slug}/online-portal/product`,{search:s,page:1},{preserveState:!0,preserveScroll:!0,onSuccess:()=>{}})},_=async e=>{e.preventDefault(),r.loading();var s=l.company_id;if(w==null)r.dismiss(),r.error("Product Image is a must Online");else if(g=="")r.dismiss(),r.error("Select the product");else if(u=="0"||u=="")r.dismiss(),r.error("Select the category");else if(h=="")r.dismiss(),r.error("Select the category");else{r.success("success");try{y.post("/add-online-product",{companyId:s,productId:g,categoryId:u,image:w,description:h,productName:b},{onSuccess:()=>{r.success("Product added successfully"),p(),s(""),g(""),j(""),b(""),C(null)}})}catch(c){r.dismiss(),r.error(c)}}},[$,i]=a.useState([]);a.useEffect(()=>{var e=m.data.map(s=>({value:s.id,label:String(s.name),product:s.name}));i(e)},[m]);const M=async e=>{if(P(e),!e){var s=m.data.map(o=>({value:o.id,label:String(o.name),product:o.name}));i(s);return}try{var c=l.company_id;const o=await axios.get(`/search_stock?q=${e}&company_id=${c}`);if(console.log("full response",o.data),o.data.product.data&&o.data.product.data){console.log("pro data:",o.data.product.data);var W=o.data.product.data.map(x=>({value:x.id,label:String(x.name),product:x.name}));i(W)}else console.error("unexpected"),i([])}catch(o){console.error("Error fetching products:",o),i([])}},[N,q]=a.useState(null),p=e=>q(e);a.useState(null);const T={headRow:{style:{border:"none"}},headCells:{style:{color:"#997400",fontSize:"14px"}},rows:{highlightOnHoverStyle:{backgroundColor:"rgb(230, 244, 244)",borderBottomColor:"#FFFFFF",outline:"1px solid #FFFFFF"}},pagination:{style:{border:"none"}}},V=[{selector:e=>t.jsx("img",{className:"h-28 w-28 object-cover rounded-md",src:"/"+e.image})},{name:"Name",selector:e=>e.product.name},{name:"Category",selector:e=>e.category.name},{name:"Description",selector:e=>e.description},,{name:"Added On",selector:e=>new Date(e.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"})},{selector:e=>t.jsx("button",{onClick:()=>editEmployee(e.user.name,e.user.email,e.position,e.id),className:"bg-green-600 rounded-md p-1",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})})})}];return t.jsxs("div",{children:[t.jsx(Z,{title:t.jsxs("div",{className:"flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2",children:[t.jsx("span",{children:"Online Products"}),t.jsxs("div",{className:"flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden",children:[t.jsx(n.Input,{type:"text",label:"Search",value:v,onChange:R,className:"md:w-full"}),t.jsx("span",{children:t.jsxs(n.Button,{size:"sm",color:"success",type:"submit",className:"flex h-10 items-center bg-primary",onClick:()=>p("xl"),children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"mr-2 w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})}),"Add"]})})]})]}),columns:V,data:d.data,customStyles:T,pointerOnHover:!0,onRowClicked:(e,s)=>!children&&ExpandableComponent?null:editRow(e,s),highlightOnHover:!0,pagination:!0,paginationServer:!0,paginationTotalRows:d,paginationPerPage:d,onChangePage:H,paginationRowsPerPageOptions:[]}),t.jsx(a.Fragment,{children:t.jsxs(n.Dialog,{open:N==="xl",size:N,handler:p,children:[t.jsx(n.DialogHeader,{children:t.jsx(n.Typography,{variant:"h5",color:"blue-gray",children:"Add a product"})}),t.jsxs("form",{onSubmit:_,children:[t.jsxs(n.DialogBody,{divider:!0,className:"h-[28rem] overflow-scroll grid place-items-center gap-4",children:[t.jsx(n.Input,{label:"Company Logo",accept:".jpg,.jpeg,.png",size:"md",type:"file",onChange:z}),t.jsx(Q,{className:"w-full",value:I,onChange:L,options:$,isClearable:!0,placeholder:"Search for a product...",onInputChange:M,inputValue:k,loadingMessage:"searching..",styles:{control:(e,s)=>({...e,borderColor:(s.isFocused,"brown")})}}),t.jsxs("select",{className:"w-full",value:u,onChange:e=>j(e.target.value),children:[t.jsx("option",{value:0,className:"bg-gray-200",children:" Select the category......."}),f&&f.map((e,s)=>t.jsxs("option",{value:e.id,children:[" ",e.name]}))]}),t.jsx(n.Input,{label:"Description",value:h,onChange:e=>B(e.target.value),size:"sm"})]}),t.jsxs(n.DialogFooter,{className:"space-x-2",children:[t.jsx(n.Button,{onClick:p,variant:"gradient",color:"blue-gray",children:"Close"}),t.jsx(n.Button,{type:"submit",className:"bg-primary",children:"Add"})]})]})]})}),t.jsx(G,{})]})}J.layout=l=>t.jsx(X,{children:l,props:l.props.company});export{J as default};
