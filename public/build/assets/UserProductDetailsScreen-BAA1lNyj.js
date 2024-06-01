import{g as Y,r as x,j as r}from"./app-Co8BOSdG.js";import{F as Z}from"./Footer-B3g6D92e.js";import{N as ee}from"./Navbar-BhZb6kJb.js";import{c as D}from"./index-C23UCwZM.js";var V={exports:{}},F={exports:{}},_=1e3,L=_*60,O=L*60,W=O*24,te=W*365.25,ne=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return re(e);if(n==="number"&&isNaN(e)===!1)return t.long?oe(e):ie(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function re(e){if(e=String(e),!(e.length>100)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),i=(t[2]||"ms").toLowerCase();switch(i){case"years":case"year":case"yrs":case"yr":case"y":return n*te;case"days":case"day":case"d":return n*W;case"hours":case"hour":case"hrs":case"hr":case"h":return n*O;case"minutes":case"minute":case"mins":case"min":case"m":return n*L;case"seconds":case"second":case"secs":case"sec":case"s":return n*_;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function ie(e){return e>=W?Math.round(e/W)+"d":e>=O?Math.round(e/O)+"h":e>=L?Math.round(e/L)+"m":e>=_?Math.round(e/_)+"s":e+"ms"}function oe(e){return I(e,W,"day")||I(e,O,"hour")||I(e,L,"minute")||I(e,_,"second")||e+" ms"}function I(e,t,n){if(!(e<t))return e<t*1.5?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}(function(e,t){t=e.exports=a.debug=a.default=a,t.coerce=h,t.disable=u,t.enable=c,t.enabled=l,t.humanize=ne,t.names=[],t.skips=[],t.formatters={};var n;function i(o){var s=0,d;for(d in o)s=(s<<5)-s+o.charCodeAt(d),s|=0;return t.colors[Math.abs(s)%t.colors.length]}function a(o){function s(){if(s.enabled){var d=s,f=+new Date,v=f-(n||f);d.diff=v,d.prev=n,d.curr=f,n=f;for(var g=new Array(arguments.length),C=0;C<g.length;C++)g[C]=arguments[C];g[0]=t.coerce(g[0]),typeof g[0]!="string"&&g.unshift("%O");var y=0;g[0]=g[0].replace(/%([a-zA-Z%])/g,function(k,B){if(k==="%%")return k;y++;var S=t.formatters[B];if(typeof S=="function"){var M=g[y];k=S.call(d,M),g.splice(y,1),y--}return k}),t.formatArgs.call(d,g);var A=s.log||t.log||console.log.bind(console);A.apply(d,g)}}return s.namespace=o,s.enabled=t.enabled(o),s.useColors=t.useColors(),s.color=i(o),typeof t.init=="function"&&t.init(s),s}function c(o){t.save(o),t.names=[],t.skips=[];for(var s=(typeof o=="string"?o:"").split(/[\s,]+/),d=s.length,f=0;f<d;f++)s[f]&&(o=s[f].replace(/\*/g,".*?"),o[0]==="-"?t.skips.push(new RegExp("^"+o.substr(1)+"$")):t.names.push(new RegExp("^"+o+"$")))}function u(){t.enable("")}function l(o){var s,d;for(s=0,d=t.skips.length;s<d;s++)if(t.skips[s].test(o))return!1;for(s=0,d=t.names.length;s<d;s++)if(t.names[s].test(o))return!0;return!1}function h(o){return o instanceof Error?o.stack||o.message:o}})(F,F.exports);var ae=F.exports;(function(e,t){var n={};t=e.exports=ae,t.log=c,t.formatArgs=a,t.save=u,t.load=l,t.useColors=i,t.storage=typeof chrome<"u"&&typeof chrome.storage<"u"?chrome.storage.local:h(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function i(){return typeof window<"u"&&window.process&&window.process.type==="renderer"?!0:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}t.formatters.j=function(o){try{return JSON.stringify(o)}catch(s){return"[UnexpectedJSONParseError]: "+s.message}};function a(o){var s=this.useColors;if(o[0]=(s?"%c":"")+this.namespace+(s?" %c":" ")+o[0]+(s?"%c ":" ")+"+"+t.humanize(this.diff),!!s){var d="color: "+this.color;o.splice(1,0,d,"color: inherit");var f=0,v=0;o[0].replace(/%[a-zA-Z%]/g,function(g){g!=="%%"&&(f++,g==="%c"&&(v=f))}),o.splice(v,0,d)}}function c(){return typeof console=="object"&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function u(o){try{o==null?t.storage.removeItem("debug"):t.storage.debug=o}catch{}}function l(){var o;try{o=t.storage.debug}catch{}return!o&&typeof process<"u"&&"env"in process&&(o=n.DEBUG),o}t.enable(l());function h(){try{return window.localStorage}catch{}}})(V,V.exports);var se=V.exports,U=se("jsonp"),ce=ue,le=0;function de(){}function ue(e,t,n){typeof t=="function"&&(n=t,t={}),t||(t={});var i=t.prefix||"__jp",a=t.name||i+le++,c=t.param||"callback",u=t.timeout!=null?t.timeout:6e4,l=encodeURIComponent,h=document.getElementsByTagName("script")[0]||document.head,o,s;u&&(s=setTimeout(function(){d(),n&&n(new Error("Timeout"))},u));function d(){o.parentNode&&o.parentNode.removeChild(o),window[a]=de,s&&clearTimeout(s)}function f(){window[a]&&d()}return window[a]=function(v){U("jsonp got",v),d(),n&&n(null,v)},e+=(~e.indexOf("?")?"&":"?")+c+"="+l(a),e=e.replace("?&","?"),U('jsonp req "%s"',e),o=document.createElement("script"),o.src=e,h.parentNode.insertBefore(o,h),f}const j=Y(ce);var he=Object.defineProperty,we=Object.defineProperties,fe=Object.getOwnPropertyDescriptors,P=Object.getOwnPropertySymbols,X=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable,z=(e,t,n)=>t in e?he(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,b=(e,t)=>{for(var n in t||(t={}))X.call(t,n)&&z(e,n,t[n]);if(P)for(var n of P(t))q.call(t,n)&&z(e,n,t[n]);return e},E=(e,t)=>we(e,fe(t)),$=(e,t)=>{var n={};for(var i in e)X.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&P)for(var i of P(e))t.indexOf(i)<0&&q.call(e,i)&&(n[i]=e[i]);return n};function K(e){return n=>{var i=n,{bgStyle:a={},borderRadius:c=0,iconFillColor:u="white",round:l=!1,size:h=64}=i,o=$(i,["bgStyle","borderRadius","iconFillColor","round","size"]);return r.jsxs("svg",E(b({viewBox:"0 0 64 64",width:h,height:h},o),{children:[l?r.jsx("circle",{cx:"32",cy:"32",r:"32",fill:e.color,style:a}):r.jsx("rect",{width:"64",height:"64",rx:c,ry:c,fill:e.color,style:a}),r.jsx("path",{d:e.path,fill:u})]}))}}function w(e){const t=Object.entries(e).filter(([,n])=>n!=null).map(([n,i])=>`${encodeURIComponent(n)}=${encodeURIComponent(String(i))}`);return t.length>0?`?${t.join("&")}`:""}const me=e=>!!e&&(typeof e=="object"||typeof e=="function")&&typeof e.then=="function",pe=(e,t)=>({left:window.outerWidth/2+(window.screenX||window.screenLeft||0)-e/2,top:window.outerHeight/2+(window.screenY||window.screenTop||0)-t/2}),ge=(e,t)=>({top:(window.screen.height-t)/2,left:(window.screen.width-e)/2});function be(e,t,n){var i=t,{height:a,width:c}=i,u=$(i,["height","width"]);const l=b({height:a,width:c,location:"no",toolbar:"no",status:"no",directories:"no",menubar:"no",scrollbars:"yes",resizable:"no",centerscreen:"yes",chrome:"yes"},u),h=window.open(e,"",Object.keys(l).map(o=>`${o}=${l[o]}`).join(", "));if(n){const o=window.setInterval(()=>{try{(h===null||h.closed)&&(window.clearInterval(o),n(h))}catch(s){console.error(s)}},1e3)}return h}function xe(e){var t=e,{beforeOnClick:n,children:i,className:a,disabled:c,disabledStyle:u={opacity:.6},forwardedRef:l,htmlTitle:h,networkLink:o,networkName:s,onClick:d,onShareWindowClose:f,openShareDialogOnClick:v=!0,opts:g,resetButtonStyle:C=!0,style:y,url:A,windowHeight:k=400,windowPosition:B="windowCenter",windowWidth:S=550}=t,M=$(t,["beforeOnClick","children","className","disabled","disabledStyle","forwardedRef","htmlTitle","networkLink","networkName","onClick","onShareWindowClose","openShareDialogOnClick","opts","resetButtonStyle","style","url","windowHeight","windowPosition","windowWidth"]);const G=async T=>{const R=o(A,g);if(!c){if(T.preventDefault(),n){const H=n();me(H)&&await H}if(v){const H=b({height:k,width:S},B==="windowCenter"?pe(S,k):ge(S,k));be(R,H,f)}d&&d(T,R)}},J=D("react-share__ShareButton",{"react-share__ShareButton--disabled":!!c,disabled:!!c},a),Q=b(b(C?{backgroundColor:"transparent",border:"none",padding:0,font:"inherit",color:"inherit",cursor:"pointer"}:{},y),c&&u);return r.jsx("button",E(b({},M),{className:J,onClick:G,ref:l,style:Q,title:h,children:i}))}function p(e,t,n,i){function a(c,u){const l=n(c),h=b({},c);return Object.keys(l).forEach(s=>{delete h[s]}),r.jsx(xe,E(b(b({},i),h),{forwardedRef:u,networkName:e,networkLink:t,opts:n(c)}))}return a.displayName=`ShareButton-${e}`,x.forwardRef(a)}function ve(e,{subject:t,body:n,separator:i}){return"mailto:"+w({subject:t,body:n?n+i+e:e})}p("email",ve,e=>({subject:e.subject,body:e.body,separator:e.separator||" "}),{openShareDialogOnClick:!1,onClick:(e,t)=>{window.location.href=t}});const ke=K({color:"#0965FE",networkName:"facebook",path:"M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"}),ye=ke;function je(e,{appId:t,redirectUri:n,to:i}){return"https://www.facebook.com/dialog/send"+w({link:e,redirect_uri:n||e,app_id:t,to:i})}p("facebookmessenger",je,e=>({appId:e.appId,redirectUri:e.redirectUri,to:e.to}),{windowWidth:1e3,windowHeight:820});class Ne extends Error{constructor(t){super(t),this.name="AssertionError"}}function m(e,t){if(!e)throw new Ne(t)}function Ce(e,{hashtag:t}){return m(e,"facebook.url"),"https://www.facebook.com/sharer/sharer.php"+w({u:e,hashtag:t})}const Se=p("facebook",Ce,e=>({hashtag:e.hashtag}),{windowWidth:550,windowHeight:400}),_e=Se;function Le(){const e=x.useRef(!1);return x.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]),x.useCallback(()=>e.current,[])}function Oe(e){var t=e,{children:n=f=>f,className:i,getCount:a,url:c}=t,u=$(t,["children","className","getCount","url"]);const l=Le(),[h,o]=x.useState(void 0),[s,d]=x.useState(!1);return x.useEffect(()=>{d(!0),a(c,f=>{l()&&(o(f),d(!1))})},[c]),r.jsx("span",E(b({className:D("react-share__ShareCount",i)},u),{children:!s&&h!==void 0&&n(h)}))}function N(e){const t=n=>r.jsx(Oe,b({getCount:e},n));return t.displayName=`ShareCount(${e.name})`,t}function We(e,t){const n=`https://graph.facebook.com/?id=${e}&fields=og_object{engagement}`;j(n,(i,a)=>{t(!i&&a&&a.og_object&&a.og_object.engagement?a.og_object.engagement.count:void 0)})}N(We);function He(e,{title:t}){return m(e,"hatena.url"),`http://b.hatena.ne.jp/add?mode=confirm&url=${e}&title=${t}`}p("hatena",He,e=>({title:e.title}),{windowWidth:660,windowHeight:460,windowPosition:"windowCenter"});function Ie(e,t){j("https://bookmark.hatenaapis.com/count/entry"+w({url:e}),(i,a)=>{t(a??void 0)})}N(Ie);function Pe(e,{title:t,description:n}){return m(e,"instapaper.url"),"http://www.instapaper.com/hello2"+w({url:e,title:t,description:n})}p("instapaper",Pe,e=>({title:e.title,description:e.description}),{windowWidth:500,windowHeight:500,windowPosition:"windowCenter"});function Ee(e,{title:t}){return m(e,"line.url"),"https://social-plugins.line.me/lineit/share"+w({url:e,text:t})}p("line",Ee,e=>({title:e.title}),{windowWidth:500,windowHeight:500});function $e(e,{title:t,summary:n,source:i}){return m(e,"linkedin.url"),"https://linkedin.com/shareArticle"+w({url:e,mini:"true",title:t,summary:n,source:i})}p("linkedin",$e,({title:e,summary:t,source:n})=>({title:e,summary:t,source:n}),{windowWidth:750,windowHeight:600});function Ae(e,{title:t,description:n}){return m(e,"livejournal.url"),"https://www.livejournal.com/update.bml"+w({subject:t,event:n})}p("livejournal",Ae,e=>({title:e.title,description:e.description}),{windowWidth:660,windowHeight:460});function Be(e,{title:t,description:n,imageUrl:i}){return m(e,"mailru.url"),"https://connect.mail.ru/share"+w({url:e,title:t,description:n,image_url:i})}p("mailru",Be,e=>({title:e.title,description:e.description,imageUrl:e.imageUrl}),{windowWidth:660,windowHeight:460});function Me(e,{title:t,description:n,image:i}){return m(e,"ok.url"),"https://connect.ok.ru/offer"+w({url:e,title:t,description:n,imageUrl:i})}p("ok",Me,e=>({title:e.title,description:e.description,image:e.image}),{windowWidth:588,windowHeight:480,windowPosition:"screenCenter"});function Ve(e,t){window.OK||(window.OK={Share:{count:function(c,u){var l,h;(h=(l=window.OK.callbacks)[c])==null||h.call(l,u)}},callbacks:[]});const n="https://connect.ok.ru/dk",i=window.OK.callbacks.length;return window.ODKL={updateCount(a,c){var u,l;const h=a===""?0:parseInt(a.replace("react-share-",""),10);(l=(u=window.OK.callbacks)[h])==null||l.call(u,c===""?void 0:parseInt(c,10))}},window.OK.callbacks.push(t),j(n+w({"st.cmd":"extLike",uid:`react-share-${i}`,ref:e}))}N(Ve);function Fe(e,{media:t,description:n,pinId:i}){return i?`https://pinterest.com/pin/${i}/repin/x/`:(m(e,"pinterest.url"),m(t,"pinterest.media"),"https://pinterest.com/pin/create/button/"+w({url:e,media:t,description:n}))}p("pinterest",Fe,e=>({media:e.media,description:e.description,pinId:e.pinId}),{windowWidth:1e3,windowHeight:730});function Ke(e,t){j("https://api.pinterest.com/v1/urls/count.json"+w({url:e}),(i,a)=>{t(a?a.count:void 0)})}N(Ke);function Te(e,{title:t}){return m(e,"pocket.url"),"https://getpocket.com/save"+w({url:e,title:t})}p("pocket",Te,e=>({title:e.title}),{windowWidth:500,windowHeight:500});function Re(e,{title:t}){return m(e,"reddit.url"),"https://www.reddit.com/submit"+w({url:e,title:t})}p("reddit",Re,e=>({title:e.title}),{windowWidth:660,windowHeight:460,windowPosition:"windowCenter"});function Ue(e,{title:t}){return m(e,"gab.url"),"https://gab.com/compose"+w({url:e,text:t})}p("gab",Ue,e=>({title:e.title}),{windowWidth:660,windowHeight:640,windowPosition:"windowCenter"});function ze(e,t){const n=`https://www.reddit.com/api/info.json?limit=1&url=${e}`;j(n,{param:"jsonp"},(i,a)=>{t(!i&&a&&a.data&&a.data.children.length>0&&a.data.children[0].data.score?a.data.children[0].data.score:void 0)})}N(ze);function De(e,{title:t}){return m(e,"telegram.url"),"https://telegram.me/share/url"+w({url:e,text:t})}p("telegram",De,e=>({title:e.title}),{windowWidth:550,windowHeight:400});function Xe(e,{title:t,caption:n,tags:i,posttype:a}){return m(e,"tumblr.url"),"https://www.tumblr.com/widgets/share/tool"+w({canonicalUrl:e,title:t,caption:n,tags:i,posttype:a})}p("tumblr",Xe,e=>({title:e.title,tags:(e.tags||[]).join(","),caption:e.caption,posttype:e.posttype||"link"}),{windowWidth:660,windowHeight:460});function qe(e,t){return j("https://api.tumblr.com/v2/share/stats"+w({url:e}),(i,a)=>{t(!i&&a&&a.response?a.response.note_count:void 0)})}N(qe);function Ge(e,{title:t,via:n,hashtags:i=[],related:a=[]}){return m(e,"twitter.url"),m(Array.isArray(i),"twitter.hashtags is not an array"),m(Array.isArray(a),"twitter.related is not an array"),"https://twitter.com/intent/tweet"+w({url:e,text:t,via:n,hashtags:i.length>0?i.join(","):void 0,related:a.length>0?a.join(","):void 0})}const Je=p("twitter",Ge,e=>({hashtags:e.hashtags,title:e.title,via:e.via,related:e.related}),{windowWidth:550,windowHeight:400}),Qe=Je;function Ye(e,{title:t,separator:n}){return m(e,"viber.url"),"viber://forward"+w({text:t?t+n+e:e})}p("viber",Ye,e=>({title:e.title,separator:e.separator||" "}),{windowWidth:660,windowHeight:460});function Ze(e,{title:t,image:n,noParse:i,noVkLinks:a}){return m(e,"vk.url"),"https://vk.com/share.php"+w({url:e,title:t,image:n,noparse:i?1:0,no_vk_links:a?1:0})}p("vk",Ze,e=>({title:e.title,image:e.image,noParse:e.noParse,noVkLinks:e.noVkLinks}),{windowWidth:660,windowHeight:460});function et(e,t){window.VK||(window.VK={}),window.VK.Share={count:(a,c)=>{var u,l;return(l=(u=window.VK.callbacks)==null?void 0:u[a])==null?void 0:l.call(u,c)}},window.VK.callbacks=[];const n="https://vk.com/share.php",i=window.VK.callbacks.length;return window.VK.callbacks.push(t),j(n+w({act:"count",index:i,url:e}))}N(et);function tt(e,{title:t,image:n}){return m(e,"weibo.url"),"http://service.weibo.com/share/share.php"+w({url:e,title:t,pic:n})}p("weibo",tt,e=>({title:e.title,image:e.image}),{windowWidth:660,windowHeight:550,windowPosition:"screenCenter"});const nt=K({color:"#25D366",networkName:"whatsapp",path:"m42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155m14.58906,-31.58846c-3.93529,-3.80584 -9.1133,-5.95471 -14.62789,-5.95471c-11.36055,0 -20.60848,9.2065 -20.61625,20.52564c0,3.61684 0.94757,7.14565 2.75211,10.26282l-2.92557,10.63564l10.93337,-2.85309c3.0136,1.63108 6.4052,2.4958 9.85634,2.49839l0.01037,0c11.36574,0 20.61884,-9.2091 20.62403,-20.53082c0,-5.48093 -2.14111,-10.64081 -6.03239,-14.51915"}),rt=nt;function it(){return/(android|iphone|ipad|mobile)/i.test(navigator.userAgent)}function ot(e,{title:t,separator:n}){return m(e,"whatsapp.url"),"https://"+(it()?"api":"web")+".whatsapp.com/send"+w({text:t?t+n+e:e})}const at=p("whatsapp",ot,e=>({title:e.title,separator:e.separator||" "}),{windowWidth:550,windowHeight:400}),st=at;function ct(e,{quote:t,hashtag:n}){return m(e,"workplace.url"),"https://work.facebook.com/sharer.php"+w({u:e,quote:t,hashtag:n})}p("workplace",ct,e=>({quote:e.quote,hashtag:e.hashtag}),{windowWidth:550,windowHeight:400});const lt=K({color:"#000000",networkName:"X",path:"M 41.116 18.375 h 4.962 l -10.8405 12.39 l 12.753 16.86 H 38.005 l -7.821 -10.2255 L 21.235 47.625 H 16.27 l 11.595 -13.2525 L 15.631 18.375 H 25.87 l 7.0695 9.3465 z m -1.7415 26.28 h 2.7495 L 24.376 21.189 H 21.4255 z"}),dt=lt;function mt({product:e}){const t=location.href,[n,i]=x.useState(!1),a=()=>{navigator.clipboard.writeText(t),i(!0),setTimeout(()=>i(!1),2e3)};let[c,u]=x.useState(0),[l,h]=x.useState(0);function o(){c==1e3?toast.error("1000 is the max number"):(c=c+1,u(parseInt(c)),l=l*parseInt(c))}function s(){c==0?toast.error("Quantity below 0 is forbidden"):(c=c-1,u(parseInt(c)))}const d=f=>{f.preventDefault(),u(f.target.value)};return x.useEffect(()=>{l=c*parseInt(e.product.retail_price),h(l)},[c]),console.log(e),r.jsxs("div",{children:[r.jsxs("div",{children:[r.jsx(ee,{}),r.jsx("div",{className:"w-full fill",children:r.jsxs("div",{className:"container mx-auto flex flex-wrap  max-w-full",children:[r.jsx("main",{className:"w-full md:w-4/5 flex flex-col items-center",children:r.jsxs("article",{className:"w-full flex flex-col shadow my-2 ",children:[r.jsxs("div",{className:"bg-white flex flex-col justify-start px-3 md:px-5",children:[r.jsx("h1",{className:"text-3xl font-semibold hover:text-gray-700",children:e.product.name}),r.jsxs("p",{className:"font-san text-sm font-semibold hover:text-gray-700 text-primary pb-1",children:["by ",e.company.name]})]}),r.jsxs("div",{className:"container mx-auto flex flex-wrap  max-w-full",children:[r.jsx("main",{className:"w-full md:w-2/4 flex flex-col items-center",children:r.jsx("div",{className:"py-5 text-center",children:r.jsx("img",{src:`/${e.image}`,className:"w-full h-96 object-contain rounded-lg p-1"})})}),r.jsxs("aside",{className:"w-full md:w-2/4 flex flex-col items-center",children:[r.jsxs("div",{className:" p-2 mt-3 w-full flex ",children:[r.jsx("p",{className:"w-full justify-start text-base leading-4 text-gray-500 font-light",children:r.jsx("span",{className:"text-gray-900 text-md font-semibold",children:"Price"})}),r.jsx("p",{className:"w-full text-end text-base leading-4 text-gray-500 font-light",children:r.jsxs("span",{className:"text-red-500 text-md font-semibold",children:["UGX ",Intl.NumberFormat("en-US").format(e.product.retail_price)]})})]}),r.jsxs("div",{className:"bg-gray-200 p-2 mt-3 w-full flex items-center",children:[r.jsx("p",{className:"w-full justify-start text-base leading-4 text-gray-500 font-light",children:r.jsx("span",{className:"text-gray-900 text-md font-semibold",children:"Quantity"})}),r.jsxs("div",{className:"flex gap-1",children:[r.jsx("button",{onClick:s,className:"bg-primary h-10 w-10 rounded-full flex justify-center items-center",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-6 h-6",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 12h14"})})}),r.jsx("input",{type:"number",required:!0,placeholder:"",form:"stock_item_form",className:"rounded-md w-16 flex [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",value:c,onChange:d}),r.jsx("button",{onClick:o,className:"bg-primary h-10 w-10 rounded-full flex justify-center items-center",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"white",className:"w-6 h-6",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})})})]})]}),r.jsxs("div",{className:" p-2 mt-3 w-full flex ",children:[r.jsx("p",{className:"w-full justify-start text-base leading-4 text-gray-500 font-light",children:r.jsx("span",{className:"text-gray-900 text-md font-bold",children:"You will pay"})}),r.jsx("p",{className:"w-full text-end text-base leading-4 text-gray-500 font-light",children:r.jsxs("span",{className:"text-red-500 text-md font-bold",children:["UGX ",Intl.NumberFormat("en-US").format(l)]})})]}),r.jsxs("div",{className:"p-2 mt-7 w-full grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 place-items-center class justify-center",children:[r.jsxs("button",{className:"text-white rounded-md flex justify-center items bg-primary p-2 w-full sm:w-32",children:[" ",r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-6 h-6 mr-1",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"})})," Add to cart"]}),r.jsxs("button",{className:"text-white rounded-md flex justify-center items bg-primary p-2 w-full sm:w-32",children:[" ",r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-6 h-6 mr-1",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"})})," Order Now"]})]})]})]}),r.jsxs("div",{className:" px-3 md:px-5 my-5",children:[r.jsx("div",{className:"text-md my-3 font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r to-black from-primary",children:"About"}),e.description]}),r.jsx("div",{className:"ml-4 text-sm pb-6 text-blue-900 font-thin"}),r.jsx("h4",{className:"text-lg ml-7 font-semibold hover:text-gray-700 pb-2",children:"Share Item"}),r.jsxs("div",{className:"grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-2 px-3",children:[r.jsxs(st,{title:"Check this interesting article I found: ",url:t,className:"flex space-x-3 items-center",children:[r.jsx(rt,{round:!0,size:30}),r.jsx("span",{children:"WhatsApp"})]}),r.jsxs(Qe,{title:"Check this interesting article I found: ",url:t,className:"flex space-x-3 items-center",children:[r.jsx(dt,{round:!0,size:30}),r.jsx("span",{children:"X (Former Twitter)"})]}),r.jsxs(_e,{quote:"Check this interesting article I found: ",url:t,className:"flex space-x-3 items-center",children:[r.jsx(ye,{round:!0,size:30}),r.jsx("span",{children:"Facebook"})]}),r.jsxs("button",{onClick:a,className:"flex space-x-3 items-center",children:[r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"})}),r.jsx("span",{children:n?"Copied":"Copy link"})]})]})]})}),r.jsx("aside",{className:"p-2 w-full md:w-1/5 flex flex-col items-center",children:r.jsx("div",{className:"text-sm py-6 sticky top-20",children:r.jsx("div",{className:"w-full text-center",children:r.jsx("a",{className:"uppercase mt-5",href:"",children:"Promoted"})})})})]})})]}),r.jsx(Z,{})]})}export{mt as default};