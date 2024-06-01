import{j as b,R as Te,r as Lt,y as ur,d as at}from"./app-Co8BOSdG.js";import{F as cr}from"./Footer-B3g6D92e.js";import{N as lr}from"./Navbar-BhZb6kJb.js";import"./index-C23UCwZM.js";function fr({title:e,time:n,image:t,price:r}){return b.jsx("div",{children:b.jsx("div",{className:"py-2 border-t border-gray-300 hover:bg-gray-300",children:b.jsxs("div",{className:"flex justify-start items-center",children:[b.jsx("div",{className:"lg:w-auto mr-2 mb-8 lg:mb-0",children:b.jsx("img",{className:"block w-40 h-20 object-cover",src:t,alt:""})}),b.jsx("div",{className:"w-full lg:w-9/12 mr-2 mb-10 lg:mb-0",children:b.jsxs("div",{className:"",children:[b.jsx("p",{className:"text-sm font-semibold line-clamp-3 text-black hover:underline",children:e}),b.jsx("p",{className:"text-sm font-medium line-clamp-3 text-red-700 hover:underline",children:"UGX "+Intl.NumberFormat("en-US").format(r)}),b.jsx("p",{className:"text-sm font-thin line-clamp-3 text-black hover:underline",children:n})]})})]})})})}function cn(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function vr(e,n,t){return n&&cn(e.prototype,n),t&&cn(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}var ln="(prefers-reduced-motion: reduce)",De=1,dr=2,Me=3,ke=4,Ze=5,st=6,ft=7,hr={CREATED:De,MOUNTED:dr,IDLE:Me,MOVING:ke,SCROLLING:Ze,DRAGGING:st,DESTROYED:ft};function he(e){e.length=0}function ye(e,n,t){return Array.prototype.slice.call(e,n,t)}function z(e){return e.bind.apply(e,[null].concat(ye(arguments,1)))}var xn=setTimeout,Dt=function(){};function fn(e){return requestAnimationFrame(e)}function mt(e,n){return typeof n===e}function We(e){return!zt(e)&&mt("object",e)}var Gt=Array.isArray,Tn=z(mt,"function"),_e=z(mt,"string"),Je=z(mt,"undefined");function zt(e){return e===null}function wn(e){try{return e instanceof(e.ownerDocument.defaultView||window).HTMLElement}catch{return!1}}function Qe(e){return Gt(e)?e:[e]}function re(e,n){Qe(e).forEach(n)}function Bt(e,n){return e.indexOf(n)>-1}function ut(e,n){return e.push.apply(e,Qe(n)),e}function fe(e,n,t){e&&re(n,function(r){r&&e.classList[t?"add":"remove"](r)})}function se(e,n){fe(e,_e(n)?n.split(" "):n,!0)}function et(e,n){re(n,e.appendChild.bind(e))}function Wt(e,n){re(e,function(t){var r=(n||t).parentNode;r&&r.insertBefore(t,n)})}function He(e,n){return wn(e)&&(e.msMatchesSelector||e.matches).call(e,n)}function Ln(e,n){var t=e?ye(e.children):[];return n?t.filter(function(r){return He(r,n)}):t}function tt(e,n){return n?Ln(e,n)[0]:e.firstElementChild}var Ye=Object.keys;function we(e,n,t){return e&&(t?Ye(e).reverse():Ye(e)).forEach(function(r){r!=="__proto__"&&n(e[r],r)}),e}function Xe(e){return ye(arguments,1).forEach(function(n){we(n,function(t,r){e[r]=n[r]})}),e}function Ee(e){return ye(arguments,1).forEach(function(n){we(n,function(t,r){Gt(t)?e[r]=t.slice():We(t)?e[r]=Ee({},We(e[r])?e[r]:{},t):e[r]=t})}),e}function vn(e,n){re(n||Ye(e),function(t){delete e[t]})}function ue(e,n){re(e,function(t){re(n,function(r){t&&t.removeAttribute(r)})})}function j(e,n,t){We(n)?we(n,function(r,i){j(e,i,r)}):re(e,function(r){zt(t)||t===""?ue(r,n):r.setAttribute(n,String(t))})}function Ce(e,n,t){var r=document.createElement(e);return n&&(_e(n)?se(r,n):j(r,n)),t&&et(t,r),r}function ie(e,n,t){if(Je(t))return getComputedStyle(e)[n];zt(t)||(e.style[n]=""+t)}function $e(e,n){ie(e,"display",n)}function bn(e){e.setActive&&e.setActive()||e.focus({preventScroll:!0})}function ae(e,n){return e.getAttribute(n)}function dn(e,n){return e&&e.classList.contains(n)}function te(e){return e.getBoundingClientRect()}function Le(e){re(e,function(n){n&&n.parentNode&&n.parentNode.removeChild(n)})}function In(e){return tt(new DOMParser().parseFromString(e,"text/html").body)}function le(e,n){e.preventDefault(),n&&(e.stopPropagation(),e.stopImmediatePropagation())}function Rn(e,n){return e&&e.querySelector(n)}function Ht(e,n){return n?ye(e.querySelectorAll(n)):[]}function ve(e,n){fe(e,n,!1)}function Ct(e){return e.timeStamp}function xe(e){return _e(e)?e:e?e+"px":""}var nt="splide",Yt="data-"+nt;function ze(e,n){if(!e)throw new Error("["+nt+"] "+(n||""))}var Ae=Math.min,vt=Math.max,dt=Math.floor,qe=Math.ceil,ee=Math.abs;function On(e,n,t){return ee(e-n)<t}function ct(e,n,t,r){var i=Ae(n,t),d=vt(n,t);return r?i<e&&e<d:i<=e&&e<=d}function Re(e,n,t){var r=Ae(n,t),i=vt(n,t);return Ae(vt(r,e),i)}function Pt(e){return+(e>0)-+(e<0)}function Mt(e,n){return re(n,function(t){e=e.replace("%s",""+t)}),e}function Xt(e){return e<10?"0"+e:""+e}var hn={};function gr(e){return""+e+Xt(hn[e]=(hn[e]||0)+1)}function Dn(){var e=[];function n(a,o,u,l){i(a,o,function(s,f,h){var g="addEventListener"in s,c=g?s.removeEventListener.bind(s,f,u,l):s.removeListener.bind(s,u);g?s.addEventListener(f,u,l):s.addListener(u),e.push([s,f,h,u,c])})}function t(a,o,u){i(a,o,function(l,s,f){e=e.filter(function(h){return h[0]===l&&h[1]===s&&h[2]===f&&(!u||h[3]===u)?(h[4](),!1):!0})})}function r(a,o,u){var l,s=!0;return typeof CustomEvent=="function"?l=new CustomEvent(o,{bubbles:s,detail:u}):(l=document.createEvent("CustomEvent"),l.initCustomEvent(o,s,!1,u)),a.dispatchEvent(l),l}function i(a,o,u){re(a,function(l){l&&re(o,function(s){s.split(" ").forEach(function(f){var h=f.split(".");u(l,h[0],h[1])})})})}function d(){e.forEach(function(a){a[4]()}),he(e)}return{bind:n,unbind:t,dispatch:r,destroy:d}}var pe="mounted",Vt="ready",ge="move",Ue="moved",$t="click",Cn="active",Pn="inactive",Mn="visible",Vn="hidden",$="refresh",J="updated",Ve="resize",Et="resized",jn="drag",kn="dragging",Un="dragged",_t="scroll",Ie="scrolled",mr="overflow",qt="destroy",Fn="arrows:mounted",Gn="arrows:updated",zn="pagination:mounted",Bn="pagination:updated",Kt="navigation:mounted",Zt="autoplay:play",Wn="autoplay:playing",Jt="autoplay:pause",Qt="lazyload:loaded",Hn="sk",Yn="sh",ht="ei";function H(e){var n=e?e.event.bus:document.createDocumentFragment(),t=Dn();function r(d,a){t.bind(n,Qe(d).join(" "),function(o){a.apply(a,Gt(o.detail)?o.detail:[])})}function i(d){t.dispatch(n,d,ye(arguments,1))}return e&&e.event.on(qt,t.destroy),Xe(t,{bus:n,on:r,off:z(t.unbind,n),emit:i})}function At(e,n,t,r){var i=Date.now,d,a=0,o,u=!0,l=0;function s(){if(!u){if(a=e?Ae((i()-d)/e,1):1,t&&t(a),a>=1&&(n(),d=i(),r&&++l>=r))return h();o=fn(s)}}function f(_){_||c(),d=i()-(_?a*e:0),u=!1,o=fn(s)}function h(){u=!0}function g(){d=i(),a=0,t&&t(a)}function c(){o&&cancelAnimationFrame(o),a=0,o=0,u=!0}function v(_){e=_}function A(){return u}return{start:f,rewind:g,pause:h,cancel:c,set:v,isPaused:A}}function Er(e){var n=e;function t(i){n=i}function r(i){return Bt(Qe(i),n)}return{set:t,is:r}}function _r(e,n){var t=At(n||0,e,null,1);return function(){t.isPaused()&&t.start()}}function Ar(e,n,t){var r=e.state,i=t.breakpoints||{},d=t.reducedMotion||{},a=Dn(),o=[];function u(){var c=t.mediaQuery==="min";Ye(i).sort(function(v,A){return c?+v-+A:+A-+v}).forEach(function(v){s(i[v],"("+(c?"min":"max")+"-width:"+v+"px)")}),s(d,ln),f()}function l(c){c&&a.destroy()}function s(c,v){var A=matchMedia(v);a.bind(A,"change",f),o.push([c,A])}function f(){var c=r.is(ft),v=t.direction,A=o.reduce(function(_,E){return Ee(_,E[1].matches?E[0]:{})},{});vn(t),g(A),t.destroy?e.destroy(t.destroy==="completely"):c?(l(!0),e.mount()):v!==t.direction&&e.refresh()}function h(c){matchMedia(ln).matches&&(c?Ee(t,d):vn(t,Ye(d)))}function g(c,v,A){Ee(t,c),v&&Ee(Object.getPrototypeOf(t),c),(A||!r.is(De))&&e.emit(J,t)}return{setup:u,destroy:l,reduce:h,set:g}}var yt="Arrow",pt=yt+"Left",Nt=yt+"Right",Xn=yt+"Up",$n=yt+"Down",gn="rtl",St="ttb",bt={width:["height"],left:["top","right"],right:["bottom","left"],x:["y"],X:["Y"],Y:["X"],ArrowLeft:[Xn,Nt],ArrowRight:[$n,pt]};function yr(e,n,t){function r(d,a,o){o=o||t.direction;var u=o===gn&&!a?1:o===St?0:-1;return bt[d]&&bt[d][u]||d.replace(/width|left|right/i,function(l,s){var f=bt[l.toLowerCase()][u]||l;return s>0?f.charAt(0).toUpperCase()+f.slice(1):f})}function i(d){return d*(t.direction===gn?1:-1)}return{resolve:r,orient:i}}var de="role",Pe="tabindex",pr="disabled",oe="aria-",rt=oe+"controls",qn=oe+"current",mn=oe+"selected",ne=oe+"label",en=oe+"labelledby",Kn=oe+"hidden",tn=oe+"orientation",Ke=oe+"roledescription",En=oe+"live",_n=oe+"busy",An=oe+"atomic",nn=[de,Pe,pr,rt,qn,ne,en,Kn,tn,Ke],ce=nt+"__",Ne="is-",It=nt,yn=ce+"track",Nr=ce+"list",xt=ce+"slide",Zn=xt+"--clone",Sr=xt+"__container",rn=ce+"arrows",Tt=ce+"arrow",Jn=Tt+"--prev",Qn=Tt+"--next",wt=ce+"pagination",er=wt+"__page",xr=ce+"progress",Tr=xr+"__bar",wr=ce+"toggle",Lr=ce+"spinner",br=ce+"sr",Ir=Ne+"initialized",be=Ne+"active",tr=Ne+"prev",nr=Ne+"next",jt=Ne+"visible",kt=Ne+"loading",rr=Ne+"focus-in",ir=Ne+"overflow",Rr=[be,jt,tr,nr,kt,rr,ir],Or={slide:xt,clone:Zn,arrows:rn,arrow:Tt,prev:Jn,next:Qn,pagination:wt,page:er,spinner:Lr};function Dr(e,n){if(Tn(e.closest))return e.closest(n);for(var t=e;t&&t.nodeType===1&&!He(t,n);)t=t.parentElement;return t}var Cr=5,pn=200,ar="touchstart mousedown",Rt="touchmove mousemove",Ot="touchend touchcancel mouseup click";function Pr(e,n,t){var r=H(e),i=r.on,d=r.bind,a=e.root,o=t.i18n,u={},l=[],s=[],f=[],h,g,c;function v(){m(),C(),E()}function A(){i($,_),i($,v),i(J,E),d(document,ar+" keydown",function(p){c=p.type==="keydown"},{capture:!0}),d(a,"focusin",function(){fe(a,rr,!!c)})}function _(p){var I=nn.concat("style");he(l),ve(a,s),ve(h,f),ue([h,g],I),ue(a,p?I:["style",Ke])}function E(){ve(a,s),ve(h,f),s=M(It),f=M(yn),se(a,s),se(h,f),j(a,ne,t.label),j(a,en,t.labelledby)}function m(){h=L("."+yn),g=tt(h,"."+Nr),ze(h&&g,"A track/list element is missing."),ut(l,Ln(g,"."+xt+":not(."+Zn+")")),we({arrows:rn,pagination:wt,prev:Jn,next:Qn,bar:Tr,toggle:wr},function(p,I){u[I]=L("."+p)}),Xe(u,{root:a,track:h,list:g,slides:l})}function C(){var p=a.id||gr(nt),I=t.role;a.id=p,h.id=h.id||p+"-track",g.id=g.id||p+"-list",!ae(a,de)&&a.tagName!=="SECTION"&&I&&j(a,de,I),j(a,Ke,o.carousel),j(g,de,"presentation")}function L(p){var I=Rn(a,p);return I&&Dr(I,"."+It)===a?I:void 0}function M(p){return[p+"--"+t.type,p+"--"+t.direction,t.drag&&p+"--draggable",t.isNavigation&&p+"--nav",p===It&&be]}return Xe(u,{setup:v,mount:A,destroy:_})}var je="slide",Fe="loop",it="fade";function Mr(e,n,t,r){var i=H(e),d=i.on,a=i.emit,o=i.bind,u=e.Components,l=e.root,s=e.options,f=s.isNavigation,h=s.updateOnMove,g=s.i18n,c=s.pagination,v=s.slideFocus,A=u.Direction.resolve,_=ae(r,"style"),E=ae(r,ne),m=t>-1,C=tt(r,"."+Sr),L;function M(){m||(r.id=l.id+"-slide"+Xt(n+1),j(r,de,c?"tabpanel":"group"),j(r,Ke,g.slide),j(r,ne,E||Mt(g.slideLabel,[n+1,e.length]))),p()}function p(){o(r,"click",z(a,$t,P)),o(r,"keydown",z(a,Hn,P)),d([Ue,Yn,Ie],S),d(Kt,U),h&&d(ge,D)}function I(){L=!0,i.destroy(),ve(r,Rr),ue(r,nn),j(r,"style",_),j(r,ne,E||"")}function U(){var O=e.splides.map(function(N){var R=N.splide.Components.Slides.getAt(n);return R?R.slide.id:""}).join(" ");j(r,ne,Mt(g.slideX,(m?t:n)+1)),j(r,rt,O),j(r,de,v?"button":""),v&&ue(r,Ke)}function D(){L||S()}function S(){if(!L){var O=e.index;x(),T(),fe(r,tr,n===O-1),fe(r,nr,n===O+1)}}function x(){var O=k();O!==dn(r,be)&&(fe(r,be,O),j(r,qn,f&&O||""),a(O?Cn:Pn,P))}function T(){var O=Y(),N=!O&&(!k()||m);if(e.state.is([ke,Ze])||j(r,Kn,N||""),j(Ht(r,s.focusableNodes||""),Pe,N?-1:""),v&&j(r,Pe,N?-1:0),O!==dn(r,jt)&&(fe(r,jt,O),a(O?Mn:Vn,P)),!O&&document.activeElement===r){var R=u.Slides.getAt(e.index);R&&bn(R.slide)}}function V(O,N,R){ie(R&&C||r,O,N)}function k(){var O=e.index;return O===n||s.cloneStatus&&O===t}function Y(){if(e.is(it))return k();var O=te(u.Elements.track),N=te(r),R=A("left",!0),F=A("right",!0);return dt(O[R])<=qe(N[R])&&dt(N[F])<=qe(O[F])}function W(O,N){var R=ee(O-n);return!m&&(s.rewind||e.is(Fe))&&(R=Ae(R,e.length-R)),R<=N}var P={index:n,slideIndex:t,slide:r,container:C,isClone:m,mount:M,destroy:I,update:S,style:V,isWithin:W};return P}function Vr(e,n,t){var r=H(e),i=r.on,d=r.emit,a=r.bind,o=n.Elements,u=o.slides,l=o.list,s=[];function f(){h(),i($,g),i($,h)}function h(){u.forEach(function(S,x){v(S,x,-1)})}function g(){L(function(S){S.destroy()}),he(s)}function c(){L(function(S){S.update()})}function v(S,x,T){var V=Mr(e,x,T,S);V.mount(),s.push(V),s.sort(function(k,Y){return k.index-Y.index})}function A(S){return S?M(function(x){return!x.isClone}):s}function _(S){var x=n.Controller,T=x.toIndex(S),V=x.hasFocus()?1:t.perPage;return M(function(k){return ct(k.index,T,T+V-1)})}function E(S){return M(S)[0]}function m(S,x){re(S,function(T){if(_e(T)&&(T=In(T)),wn(T)){var V=u[x];V?Wt(T,V):et(l,T),se(T,t.classes.slide),I(T,z(d,Ve))}}),d($)}function C(S){Le(M(S).map(function(x){return x.slide})),d($)}function L(S,x){A(x).forEach(S)}function M(S){return s.filter(Tn(S)?S:function(x){return _e(S)?He(x.slide,S):Bt(Qe(S),x.index)})}function p(S,x,T){L(function(V){V.style(S,x,T)})}function I(S,x){var T=Ht(S,"img"),V=T.length;V?T.forEach(function(k){a(k,"load error",function(){--V||x()})}):x()}function U(S){return S?u.length:s.length}function D(){return s.length>t.perPage}return{mount:f,destroy:g,update:c,register:v,get:A,getIn:_,getAt:E,add:m,remove:C,forEach:L,filter:M,style:p,getLength:U,isEnough:D}}function jr(e,n,t){var r=H(e),i=r.on,d=r.bind,a=r.emit,o=n.Slides,u=n.Direction.resolve,l=n.Elements,s=l.root,f=l.track,h=l.list,g=o.getAt,c=o.style,v,A,_;function E(){m(),d(window,"resize load",_r(z(a,Ve))),i([J,$],m),i(Ve,C)}function m(){v=t.direction===St,ie(s,"maxWidth",xe(t.width)),ie(f,u("paddingLeft"),L(!1)),ie(f,u("paddingRight"),L(!0)),C(!0)}function C(P){var O=te(s);(P||A.width!==O.width||A.height!==O.height)&&(ie(f,"height",M()),c(u("marginRight"),xe(t.gap)),c("width",I()),c("height",U(),!0),A=O,a(Et),_!==(_=W())&&(fe(s,ir,_),a(mr,_)))}function L(P){var O=t.padding,N=u(P?"right":"left");return O&&xe(O[N]||(We(O)?0:O))||"0px"}function M(){var P="";return v&&(P=p(),ze(P,"height or heightRatio is missing."),P="calc("+P+" - "+L(!1)+" - "+L(!0)+")"),P}function p(){return xe(t.height||te(h).width*t.heightRatio)}function I(){return t.autoWidth?null:xe(t.fixedWidth)||(v?"":D())}function U(){return xe(t.fixedHeight)||(v?t.autoHeight?null:D():p())}function D(){var P=xe(t.gap);return"calc((100%"+(P&&" + "+P)+")/"+(t.perPage||1)+(P&&" - "+P)+")"}function S(){return te(h)[u("width")]}function x(P,O){var N=g(P||0);return N?te(N.slide)[u("width")]+(O?0:k()):0}function T(P,O){var N=g(P);if(N){var R=te(N.slide)[u("right")],F=te(h)[u("left")];return ee(R-F)+(O?0:k())}return 0}function V(P){return T(e.length-1)-T(0)+x(0,P)}function k(){var P=g(0);return P&&parseFloat(ie(P.slide,u("marginRight")))||0}function Y(P){return parseFloat(ie(f,u("padding"+(P?"Right":"Left"))))||0}function W(){return e.is(it)||V(!0)>S()}return{mount:E,resize:C,listSize:S,slideSize:x,sliderSize:V,totalSize:T,getPadding:Y,isOverflow:W}}var kr=2;function Ur(e,n,t){var r=H(e),i=r.on,d=n.Elements,a=n.Slides,o=n.Direction.resolve,u=[],l;function s(){i($,f),i([J,Ve],g),(l=A())&&(c(l),n.Layout.resize(!0))}function f(){h(),s()}function h(){Le(u),he(u),r.destroy()}function g(){var _=A();l!==_&&(l<_||!_)&&r.emit($)}function c(_){var E=a.get().slice(),m=E.length;if(m){for(;E.length<_;)ut(E,E);ut(E.slice(-_),E.slice(0,_)).forEach(function(C,L){var M=L<_,p=v(C.slide,L);M?Wt(p,E[0].slide):et(d.list,p),ut(u,p),a.register(p,L-_+(M?0:m),C.index)})}}function v(_,E){var m=_.cloneNode(!0);return se(m,t.classes.clone),m.id=e.root.id+"-clone"+Xt(E+1),m}function A(){var _=t.clones;if(!e.is(Fe))_=0;else if(Je(_)){var E=t[o("fixedWidth")]&&n.Layout.slideSize(0),m=E&&qe(te(d.track)[o("width")]/E);_=m||t[o("autoWidth")]&&e.length||t.perPage*kr}return _}return{mount:s,destroy:h}}function Fr(e,n,t){var r=H(e),i=r.on,d=r.emit,a=e.state.set,o=n.Layout,u=o.slideSize,l=o.getPadding,s=o.totalSize,f=o.listSize,h=o.sliderSize,g=n.Direction,c=g.resolve,v=g.orient,A=n.Elements,_=A.list,E=A.track,m;function C(){m=n.Transition,i([pe,Et,J,$],L)}function L(){n.Controller.isBusy()||(n.Scroll.cancel(),p(e.index),n.Slides.update())}function M(N,R,F,K){N!==R&&P(N>F)&&(S(),I(D(V(),N>F),!0)),a(ke),d(ge,R,F,N),m.start(R,function(){a(Me),d(Ue,R,F,N),K&&K()})}function p(N){I(T(N,!0))}function I(N,R){if(!e.is(it)){var F=R?N:U(N);ie(_,"transform","translate"+c("X")+"("+F+"px)"),N!==F&&d(Yn)}}function U(N){if(e.is(Fe)){var R=x(N),F=R>n.Controller.getEnd(),K=R<0;(K||F)&&(N=D(N,F))}return N}function D(N,R){var F=N-W(R),K=h();return N-=v(K*(qe(ee(F)/K)||1))*(R?1:-1),N}function S(){I(V(),!0),m.cancel()}function x(N){for(var R=n.Slides.get(),F=0,K=1/0,q=0;q<R.length;q++){var me=R[q].index,y=ee(T(me,!0)-N);if(y<=K)K=y,F=me;else break}return F}function T(N,R){var F=v(s(N-1)-Y(N));return R?k(F):F}function V(){var N=c("left");return te(_)[N]-te(E)[N]+v(l(!1))}function k(N){return t.trimSpace&&e.is(je)&&(N=Re(N,0,v(h(!0)-f()))),N}function Y(N){var R=t.focus;return R==="center"?(f()-u(N,!0))/2:+R*u(N)||0}function W(N){return T(N?n.Controller.getEnd():0,!!t.trimSpace)}function P(N){var R=v(D(V(),N));return N?R>=0:R<=_[c("scrollWidth")]-te(E)[c("width")]}function O(N,R){R=Je(R)?V():R;var F=N!==!0&&v(R)<v(W(!1)),K=N!==!1&&v(R)>v(W(!0));return F||K}return{mount:C,move:M,jump:p,translate:I,shift:D,cancel:S,toIndex:x,toPosition:T,getPosition:V,getLimit:W,exceededLimit:O,reposition:L}}function Gr(e,n,t){var r=H(e),i=r.on,d=r.emit,a=n.Move,o=a.getPosition,u=a.getLimit,l=a.toPosition,s=n.Slides,f=s.isEnough,h=s.getLength,g=t.omitEnd,c=e.is(Fe),v=e.is(je),A=z(V,!1),_=z(V,!0),E=t.start||0,m,C=E,L,M,p;function I(){U(),i([J,$,ht],U),i(Et,D)}function U(){L=h(!0),M=t.perMove,p=t.perPage,m=P();var y=Re(E,0,g?m:L-1);y!==E&&(E=y,a.reposition())}function D(){m!==P()&&d(ht)}function S(y,G,Q){if(!me()){var X=T(y),Z=W(X);Z>-1&&(G||Z!==E)&&(F(Z),a.move(X,Z,C,Q))}}function x(y,G,Q,X){n.Scroll.scroll(y,G,Q,function(){var Z=W(a.toIndex(o()));F(g?Ae(Z,m):Z),X&&X()})}function T(y){var G=E;if(_e(y)){var Q=y.match(/([+\-<>])(\d+)?/)||[],X=Q[1],Z=Q[2];X==="+"||X==="-"?G=k(E+ +(""+X+(+Z||1)),E):X===">"?G=Z?O(+Z):A(!0):X==="<"&&(G=_(!0))}else G=c?y:Re(y,0,m);return G}function V(y,G){var Q=M||(q()?1:p),X=k(E+Q*(y?-1:1),E,!(M||q()));return X===-1&&v&&!On(o(),u(!y),1)?y?0:m:G?X:W(X)}function k(y,G,Q){if(f()||q()){var X=Y(y);X!==y&&(G=y,y=X,Q=!1),y<0||y>m?!M&&(ct(0,y,G,!0)||ct(m,G,y,!0))?y=O(N(y)):c?y=Q?y<0?-(L%p||p):L:y:t.rewind?y=y<0?m:0:y=-1:Q&&y!==G&&(y=O(N(G)+(y<G?-1:1)))}else y=-1;return y}function Y(y){if(v&&t.trimSpace==="move"&&y!==E)for(var G=o();G===l(y,!0)&&ct(y,0,e.length-1,!t.rewind);)y<E?--y:++y;return y}function W(y){return c?(y+L)%L||0:y}function P(){for(var y=L-(q()||c&&M?1:p);g&&y-- >0;)if(l(L-1,!0)!==l(y,!0)){y++;break}return Re(y,0,L-1)}function O(y){return Re(q()?y:p*y,0,m)}function N(y){return q()?Ae(y,m):dt((y>=m?L-1:y)/p)}function R(y){var G=a.toIndex(y);return v?Re(G,0,m):G}function F(y){y!==E&&(C=E,E=y)}function K(y){return y?C:E}function q(){return!Je(t.focus)||t.isNavigation}function me(){return e.state.is([ke,Ze])&&!!t.waitForTransition}return{mount:I,go:S,scroll:x,getNext:A,getPrev:_,getAdjacent:V,getEnd:P,setIndex:F,getIndex:K,toIndex:O,toPage:N,toDest:R,hasFocus:q,isBusy:me}}var zr="http://www.w3.org/2000/svg",Br="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z",ot=40;function Wr(e,n,t){var r=H(e),i=r.on,d=r.bind,a=r.emit,o=t.classes,u=t.i18n,l=n.Elements,s=n.Controller,f=l.arrows,h=l.track,g=f,c=l.prev,v=l.next,A,_,E={};function m(){L(),i(J,C)}function C(){M(),m()}function L(){var x=t.arrows;x&&!(c&&v)&&U(),c&&v&&(Xe(E,{prev:c,next:v}),$e(g,x?"":"none"),se(g,_=rn+"--"+t.direction),x&&(p(),S(),j([c,v],rt,h.id),a(Fn,c,v)))}function M(){r.destroy(),ve(g,_),A?(Le(f?[c,v]:g),c=v=null):ue([c,v],nn)}function p(){i([pe,Ue,$,Ie,ht],S),d(v,"click",z(I,">")),d(c,"click",z(I,"<"))}function I(x){s.go(x,!0)}function U(){g=f||Ce("div",o.arrows),c=D(!0),v=D(!1),A=!0,et(g,[c,v]),!f&&Wt(g,h)}function D(x){var T='<button class="'+o.arrow+" "+(x?o.prev:o.next)+'" type="button"><svg xmlns="'+zr+'" viewBox="0 0 '+ot+" "+ot+'" width="'+ot+'" height="'+ot+'" focusable="false"><path d="'+(t.arrowPath||Br)+'" />';return In(T)}function S(){if(c&&v){var x=e.index,T=s.getPrev(),V=s.getNext(),k=T>-1&&x<T?u.last:u.prev,Y=V>-1&&x>V?u.first:u.next;c.disabled=T<0,v.disabled=V<0,j(c,ne,k),j(v,ne,Y),a(Gn,c,v,T,V)}}return{arrows:E,mount:m,destroy:M,update:S}}var Hr=Yt+"-interval";function Yr(e,n,t){var r=H(e),i=r.on,d=r.bind,a=r.emit,o=At(t.interval,e.go.bind(e,">"),p),u=o.isPaused,l=n.Elements,s=n.Elements,f=s.root,h=s.toggle,g=t.autoplay,c,v,A=g==="pause";function _(){g&&(E(),h&&j(h,rt,l.track.id),A||m(),M())}function E(){t.pauseOnHover&&d(f,"mouseenter mouseleave",function(U){c=U.type==="mouseenter",L()}),t.pauseOnFocus&&d(f,"focusin focusout",function(U){v=U.type==="focusin",L()}),h&&d(h,"click",function(){A?m():C(!0)}),i([ge,_t,$],o.rewind),i(ge,I)}function m(){u()&&n.Slides.isEnough()&&(o.start(!t.resetProgress),v=c=A=!1,M(),a(Zt))}function C(U){U===void 0&&(U=!0),A=!!U,M(),u()||(o.pause(),a(Jt))}function L(){A||(c||v?C(!1):m())}function M(){h&&(fe(h,be,!A),j(h,ne,t.i18n[A?"play":"pause"]))}function p(U){var D=l.bar;D&&ie(D,"width",U*100+"%"),a(Wn,U)}function I(U){var D=n.Slides.getAt(U);o.set(D&&+ae(D.slide,Hr)||t.interval)}return{mount:_,destroy:o.cancel,play:m,pause:C,isPaused:u}}function Xr(e,n,t){var r=H(e),i=r.on;function d(){t.cover&&(i(Qt,z(o,!0)),i([pe,J,$],z(a,!0)))}function a(u){n.Slides.forEach(function(l){var s=tt(l.container||l.slide,"img");s&&s.src&&o(u,s,l)})}function o(u,l,s){s.style("background",u?'center/cover no-repeat url("'+l.src+'")':"",!0),$e(l,u?"none":"")}return{mount:d,destroy:z(a,!1)}}var $r=10,qr=600,Kr=.6,Zr=1.5,Jr=800;function Qr(e,n,t){var r=H(e),i=r.on,d=r.emit,a=e.state.set,o=n.Move,u=o.getPosition,l=o.getLimit,s=o.exceededLimit,f=o.translate,h=e.is(je),g,c,v=1;function A(){i(ge,C),i([J,$],L)}function _(p,I,U,D,S){var x=u();if(C(),U&&(!h||!s())){var T=n.Layout.sliderSize(),V=Pt(p)*T*dt(ee(p)/T)||0;p=o.toPosition(n.Controller.toDest(p%T))+V}var k=On(x,p,1);v=1,I=k?0:I||vt(ee(p-x)/Zr,Jr),c=D,g=At(I,E,z(m,x,p,S),1),a(Ze),d(_t),g.start()}function E(){a(Me),c&&c(),d(Ie)}function m(p,I,U,D){var S=u(),x=p+(I-p)*M(D),T=(x-S)*v;f(S+T),h&&!U&&s()&&(v*=Kr,ee(T)<$r&&_(l(s(!0)),qr,!1,c,!0))}function C(){g&&g.cancel()}function L(){g&&!g.isPaused()&&(C(),E())}function M(p){var I=t.easingFunc;return I?I(p):1-Math.pow(1-p,4)}return{mount:A,destroy:C,scroll:_,cancel:L}}var Oe={passive:!1,capture:!0};function ei(e,n,t){var r=H(e),i=r.on,d=r.emit,a=r.bind,o=r.unbind,u=e.state,l=n.Move,s=n.Scroll,f=n.Controller,h=n.Elements.track,g=n.Media.reduce,c=n.Direction,v=c.resolve,A=c.orient,_=l.getPosition,E=l.exceededLimit,m,C,L,M,p,I=!1,U,D,S;function x(){a(h,Rt,Dt,Oe),a(h,Ot,Dt,Oe),a(h,ar,V,Oe),a(h,"click",W,{capture:!0}),a(h,"dragstart",le),i([pe,J],T)}function T(){var w=t.drag;un(!w),M=w==="free"}function V(w){if(U=!1,!D){var B=Z(w);X(w.target)&&(B||!w.button)&&(f.isBusy()?le(w,!0):(S=B?h:window,p=u.is([ke,Ze]),L=null,a(S,Rt,k,Oe),a(S,Ot,Y,Oe),l.cancel(),s.cancel(),P(w)))}}function k(w){if(u.is(st)||(u.set(st),d(jn)),w.cancelable)if(p){l.translate(m+Q(q(w)));var B=me(w)>pn,Se=I!==(I=E());(B||Se)&&P(w),U=!0,d(kn),le(w)}else R(w)&&(p=N(w),le(w))}function Y(w){u.is(st)&&(u.set(Me),d(Un)),p&&(O(w),le(w)),o(S,Rt,k),o(S,Ot,Y),p=!1}function W(w){!D&&U&&le(w,!0)}function P(w){L=C,C=w,m=_()}function O(w){var B=F(w),Se=K(B),Ge=t.rewind&&t.rewindByDrag;g(!1),M?f.scroll(Se,0,t.snap):e.is(it)?f.go(A(Pt(B))<0?Ge?"<":"-":Ge?">":"+"):e.is(je)&&I&&Ge?f.go(E(!0)?">":"<"):f.go(f.toDest(Se),!0),g(!0)}function N(w){var B=t.dragMinThreshold,Se=We(B),Ge=Se&&B.mouse||0,sr=(Se?B.touch:+B)||10;return ee(q(w))>(Z(w)?sr:Ge)}function R(w){return ee(q(w))>ee(q(w,!0))}function F(w){if(e.is(Fe)||!I){var B=me(w);if(B&&B<pn)return q(w)/B}return 0}function K(w){return _()+Pt(w)*Ae(ee(w)*(t.flickPower||600),M?1/0:n.Layout.listSize()*(t.flickMaxPages||1))}function q(w,B){return G(w,B)-G(y(w),B)}function me(w){return Ct(w)-Ct(y(w))}function y(w){return C===w&&L||C}function G(w,B){return(Z(w)?w.changedTouches[0]:w)["page"+v(B?"Y":"X")]}function Q(w){return w/(I&&e.is(je)?Cr:1)}function X(w){var B=t.noDrag;return!He(w,"."+er+", ."+Tt)&&(!B||!He(w,B))}function Z(w){return typeof TouchEvent<"u"&&w instanceof TouchEvent}function or(){return p}function un(w){D=w}return{mount:x,disable:un,isDragging:or}}var ti={Spacebar:" ",Right:Nt,Left:pt,Up:Xn,Down:$n};function an(e){return e=_e(e)?e:e.key,ti[e]||e}var Nn="keydown";function ni(e,n,t){var r=H(e),i=r.on,d=r.bind,a=r.unbind,o=e.root,u=n.Direction.resolve,l,s;function f(){h(),i(J,g),i(J,h),i(ge,v)}function h(){var _=t.keyboard;_&&(l=_==="global"?window:o,d(l,Nn,A))}function g(){a(l,Nn)}function c(_){s=_}function v(){var _=s;s=!0,xn(function(){s=_})}function A(_){if(!s){var E=an(_);E===u(pt)?e.go("<"):E===u(Nt)&&e.go(">")}}return{mount:f,destroy:g,disable:c}}var Be=Yt+"-lazy",lt=Be+"-srcset",ri="["+Be+"], ["+lt+"]";function ii(e,n,t){var r=H(e),i=r.on,d=r.off,a=r.bind,o=r.emit,u=t.lazyLoad==="sequential",l=[Ue,Ie],s=[];function f(){t.lazyLoad&&(h(),i($,h))}function h(){he(s),g(),u?_():(d(l),i(l,c),c())}function g(){n.Slides.forEach(function(E){Ht(E.slide,ri).forEach(function(m){var C=ae(m,Be),L=ae(m,lt);if(C!==m.src||L!==m.srcset){var M=t.classes.spinner,p=m.parentElement,I=tt(p,"."+M)||Ce("span",M,p);s.push([m,E,I]),m.src||$e(m,"none")}})})}function c(){s=s.filter(function(E){var m=t.perPage*((t.preloadPages||1)+1)-1;return E[1].isWithin(e.index,m)?v(E):!0}),s.length||d(l)}function v(E){var m=E[0];se(E[1].slide,kt),a(m,"load error",z(A,E)),j(m,"src",ae(m,Be)),j(m,"srcset",ae(m,lt)),ue(m,Be),ue(m,lt)}function A(E,m){var C=E[0],L=E[1];ve(L.slide,kt),m.type!=="error"&&(Le(E[2]),$e(C,""),o(Qt,C,L),o(Ve)),u&&_()}function _(){s.length&&v(s.shift())}return{mount:f,destroy:z(he,s),check:c}}function ai(e,n,t){var r=H(e),i=r.on,d=r.emit,a=r.bind,o=n.Slides,u=n.Elements,l=n.Controller,s=l.hasFocus,f=l.getIndex,h=l.go,g=n.Direction.resolve,c=u.pagination,v=[],A,_;function E(){m(),i([J,$,ht],E);var D=t.pagination;c&&$e(c,D?"":"none"),D&&(i([ge,_t,Ie],U),C(),U(),d(zn,{list:A,items:v},I(e.index)))}function m(){A&&(Le(c?ye(A.children):A),ve(A,_),he(v),A=null),r.destroy()}function C(){var D=e.length,S=t.classes,x=t.i18n,T=t.perPage,V=s()?l.getEnd()+1:qe(D/T);A=c||Ce("ul",S.pagination,u.track.parentElement),se(A,_=wt+"--"+p()),j(A,de,"tablist"),j(A,ne,x.select),j(A,tn,p()===St?"vertical":"");for(var k=0;k<V;k++){var Y=Ce("li",null,A),W=Ce("button",{class:S.page,type:"button"},Y),P=o.getIn(k).map(function(N){return N.slide.id}),O=!s()&&T>1?x.pageX:x.slideX;a(W,"click",z(L,k)),t.paginationKeyboard&&a(W,"keydown",z(M,k)),j(Y,de,"presentation"),j(W,de,"tab"),j(W,rt,P.join(" ")),j(W,ne,Mt(O,k+1)),j(W,Pe,-1),v.push({li:Y,button:W,page:k})}}function L(D){h(">"+D,!0)}function M(D,S){var x=v.length,T=an(S),V=p(),k=-1;T===g(Nt,!1,V)?k=++D%x:T===g(pt,!1,V)?k=(--D+x)%x:T==="Home"?k=0:T==="End"&&(k=x-1);var Y=v[k];Y&&(bn(Y.button),h(">"+k),le(S,!0))}function p(){return t.paginationDirection||t.direction}function I(D){return v[l.toPage(D)]}function U(){var D=I(f(!0)),S=I(f());if(D){var x=D.button;ve(x,be),ue(x,mn),j(x,Pe,-1)}if(S){var T=S.button;se(T,be),j(T,mn,!0),j(T,Pe,"")}d(Bn,{list:A,items:v},D,S)}return{items:v,mount:E,destroy:m,getAt:I,update:U}}var oi=[" ","Enter"];function si(e,n,t){var r=t.isNavigation,i=t.slideFocus,d=[];function a(){e.splides.forEach(function(c){c.isParent||(l(e,c.splide),l(c.splide,e))}),r&&s()}function o(){d.forEach(function(c){c.destroy()}),he(d)}function u(){o(),a()}function l(c,v){var A=H(c);A.on(ge,function(_,E,m){v.go(v.is(Fe)?m:_)}),d.push(A)}function s(){var c=H(e),v=c.on;v($t,h),v(Hn,g),v([pe,J],f),d.push(c),c.emit(Kt,e.splides)}function f(){j(n.Elements.list,tn,t.direction===St?"vertical":"")}function h(c){e.go(c.index)}function g(c,v){Bt(oi,an(v))&&(h(c),le(v))}return{setup:z(n.Media.set,{slideFocus:Je(i)?r:i},!0),mount:a,destroy:o,remount:u}}function ui(e,n,t){var r=H(e),i=r.bind,d=0;function a(){t.wheel&&i(n.Elements.track,"wheel",o,Oe)}function o(l){if(l.cancelable){var s=l.deltaY,f=s<0,h=Ct(l),g=t.wheelMinThreshold||0,c=t.wheelSleep||0;ee(s)>g&&h-d>c&&(e.go(f?"<":">"),d=h),u(f)&&le(l)}}function u(l){return!t.releaseWheel||e.state.is(ke)||n.Controller.getAdjacent(l)!==-1}return{mount:a}}var ci=90;function li(e,n,t){var r=H(e),i=r.on,d=n.Elements.track,a=t.live&&!t.isNavigation,o=Ce("span",br),u=At(ci,z(s,!1));function l(){a&&(h(!n.Autoplay.isPaused()),j(d,An,!0),o.textContent="…",i(Zt,z(h,!0)),i(Jt,z(h,!1)),i([Ue,Ie],z(s,!0)))}function s(g){j(d,_n,g),g?(et(d,o),u.start()):(Le(o),u.cancel())}function f(){ue(d,[En,An,_n]),Le(o)}function h(g){a&&j(d,En,g?"off":"polite")}return{mount:l,disable:h,destroy:f}}var fi=Object.freeze({__proto__:null,Media:Ar,Direction:yr,Elements:Pr,Slides:Vr,Layout:jr,Clones:Ur,Move:Fr,Controller:Gr,Arrows:Wr,Autoplay:Yr,Cover:Xr,Scroll:Qr,Drag:ei,Keyboard:ni,LazyLoad:ii,Pagination:ai,Sync:si,Wheel:ui,Live:li}),vi={prev:"Previous slide",next:"Next slide",first:"Go to first slide",last:"Go to last slide",slideX:"Go to slide %s",pageX:"Go to page %s",play:"Start autoplay",pause:"Pause autoplay",carousel:"carousel",slide:"slide",select:"Select a slide to show",slideLabel:"%s of %s"},di={type:"slide",role:"region",speed:400,perPage:1,cloneStatus:!0,arrows:!0,pagination:!0,paginationKeyboard:!0,interval:5e3,pauseOnHover:!0,pauseOnFocus:!0,resetProgress:!0,easing:"cubic-bezier(0.25, 1, 0.5, 1)",drag:!0,direction:"ltr",trimSpace:!0,focusableNodes:"a, button, textarea, input, select, iframe",live:!0,classes:Or,i18n:vi,reducedMotion:{speed:0,rewindSpeed:0,autoplay:"pause"}};function hi(e,n,t){var r=n.Slides;function i(){H(e).on([pe,$],d)}function d(){r.forEach(function(o){o.style("transform","translateX(-"+100*o.index+"%)")})}function a(o,u){r.style("transition","opacity "+t.speed+"ms "+t.easing),xn(u)}return{mount:i,start:a,cancel:Dt}}function gi(e,n,t){var r=n.Move,i=n.Controller,d=n.Scroll,a=n.Elements.list,o=z(ie,a,"transition"),u;function l(){H(e).bind(a,"transitionend",function(g){g.target===a&&u&&(f(),u())})}function s(g,c){var v=r.toPosition(g,!0),A=r.getPosition(),_=h(g);ee(v-A)>=1&&_>=1?t.useScroll?d.scroll(v,_,!1,c):(o("transform "+_+"ms "+t.easing),r.translate(v,!0),u=c):(r.jump(g),c())}function f(){o(""),d.cancel()}function h(g){var c=t.rewindSpeed;if(e.is(je)&&c){var v=i.getIndex(!0),A=i.getEnd();if(v===0&&g>=A||v>=A&&g===0)return c}return t.speed}return{mount:l,start:s,cancel:f}}var mi=function(){function e(t,r){this.event=H(),this.Components={},this.state=Er(De),this.splides=[],this._o={},this._E={};var i=_e(t)?Rn(document,t):t;ze(i,i+" is invalid."),this.root=i,r=Ee({label:ae(i,ne)||"",labelledby:ae(i,en)||""},di,e.defaults,r||{});try{Ee(r,JSON.parse(ae(i,Yt)))}catch{ze(!1,"Invalid JSON")}this._o=Object.create(Ee({},r))}var n=e.prototype;return n.mount=function(r,i){var d=this,a=this.state,o=this.Components;ze(a.is([De,ft]),"Already mounted!"),a.set(De),this._C=o,this._T=i||this._T||(this.is(it)?hi:gi),this._E=r||this._E;var u=Xe({},fi,this._E,{Transition:this._T});return we(u,function(l,s){var f=l(d,o,d._o);o[s]=f,f.setup&&f.setup()}),we(o,function(l){l.mount&&l.mount()}),this.emit(pe),se(this.root,Ir),a.set(Me),this.emit(Vt),this},n.sync=function(r){return this.splides.push({splide:r}),r.splides.push({splide:this,isParent:!0}),this.state.is(Me)&&(this._C.Sync.remount(),r.Components.Sync.remount()),this},n.go=function(r){return this._C.Controller.go(r),this},n.on=function(r,i){return this.event.on(r,i),this},n.off=function(r){return this.event.off(r),this},n.emit=function(r){var i;return(i=this.event).emit.apply(i,[r].concat(ye(arguments,1))),this},n.add=function(r,i){return this._C.Slides.add(r,i),this},n.remove=function(r){return this._C.Slides.remove(r),this},n.is=function(r){return this._o.type===r},n.refresh=function(){return this.emit($),this},n.destroy=function(r){r===void 0&&(r=!0);var i=this.event,d=this.state;return d.is(De)?H(this).on(Vt,this.destroy.bind(this,r)):(we(this._C,function(a){a.destroy&&a.destroy(r)},!0),i.emit(qt),i.destroy(),r&&he(this.splides),d.set(ft)),this},vr(e,[{key:"options",get:function(){return this._o},set:function(r){this._C.Media.set(r,!0,!0)}},{key:"length",get:function(){return this._C.Slides.getLength(!0)}},{key:"index",get:function(){return this._C.Controller.getIndex()}}]),e}(),on=mi;on.defaults={};on.STATES=hr;var Sn=[[pe,"onMounted"],[Vt,"onReady"],[ge,"onMove"],[Ue,"onMoved"],[$t,"onClick"],[Cn,"onActive"],[Pn,"onInactive"],[Mn,"onVisible"],[Vn,"onHidden"],[$,"onRefresh"],[J,"onUpdated"],[Ve,"onResize"],[Et,"onResized"],[jn,"onDrag"],[kn,"onDragging"],[Un,"onDragged"],[_t,"onScroll"],[Ie,"onScrolled"],[qt,"onDestroy"],[Fn,"onArrowsMounted"],[Gn,"onArrowsUpdated"],[zn,"onPaginationMounted"],[Bn,"onPaginationUpdated"],[Kt,"onNavigationMounted"],[Zt,"onAutoplayPlay"],[Wn,"onAutoplayPlaying"],[Jt,"onAutoplayPause"],[Qt,"onLazyLoadLoaded"]];function sn(...e){return e.filter(Boolean).join(" ")}function gt(e){return e!==null&&typeof e=="object"}function Ut(e,n){if(Array.isArray(e)&&Array.isArray(n))return e.length===n.length&&!e.some((t,r)=>!Ut(t,n[r]));if(gt(e)&&gt(n)){const t=Object.keys(e),r=Object.keys(n);return t.length===r.length&&!t.some(i=>!Object.prototype.hasOwnProperty.call(n,i)||!Ut(e[i],n[i]))}return e===n}function Ei(e,n){return e.length===n.length&&!e.some((t,r)=>t!==n[r])}function _i(e,n){if(e){const t=Object.keys(e);for(let r=0;r<t.length;r++){const i=t[r];if(i!=="__proto__"&&n(e[i],i)===!1)break}}return e}function Ft(e,n){const t=e;return _i(n,(r,i)=>{Array.isArray(r)?t[i]=r.slice():gt(r)?t[i]=Ft(gt(t[i])?t[i]:{},r):t[i]=r}),t}var Ai=({children:e,className:n,...t})=>Te.createElement("div",{className:sn("splide__track",n),...t},Te.createElement("ul",{className:"splide__list"},e)),yi=class extends Te.Component{constructor(){super(...arguments),this.splideRef=Te.createRef(),this.slides=[]}componentDidMount(){const{options:e,extensions:n,transition:t}=this.props,{current:r}=this.splideRef;r&&(this.splide=new on(r,e),this.bind(this.splide),this.splide.mount(n,t),this.options=Ft({},e||{}),this.slides=this.getSlides())}componentWillUnmount(){this.splide&&(this.splide.destroy(),this.splide=void 0),this.options=void 0,this.slides.length=0}componentDidUpdate(){if(!this.splide)return;const{options:e}=this.props;e&&!Ut(this.options,e)&&(this.splide.options=e,this.options=Ft({},e));const n=this.getSlides();Ei(this.slides,n)||(this.splide.refresh(),this.slides=n)}sync(e){var n;(n=this.splide)==null||n.sync(e)}go(e){var n;(n=this.splide)==null||n.go(e)}getSlides(){var e;if(this.splide){const n=(e=this.splide.Components.Elements)==null?void 0:e.list.children;return n&&Array.prototype.slice.call(n)||[]}return[]}bind(e){Sn.forEach(([n,t])=>{const r=this.props[t];typeof r=="function"&&e.on(n,(...i)=>{r(e,...i)})})}omit(e,n){return n.forEach(t=>{Object.prototype.hasOwnProperty.call(e,t)&&delete e[t]}),e}render(){const{className:e,tag:n="div",hasTrack:t=!0,children:r,...i}=this.props;return Te.createElement(n,{className:sn("splide",e),ref:this.splideRef,...this.omit(i,["options",...Sn.map(d=>d[1])])},t?Te.createElement(Ai,null,r):r)}},pi=({children:e,className:n,...t})=>Te.createElement("li",{className:sn("splide__slide",n),...t},e);/*!
 * Splide.js
 * Version  : 4.1.3
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */function wi({businesses:e,products:n,business:t,categories:r}){const[i,d]=Lt.useState({latitude:null,longtitude:null}),[a,o]=Lt.useState("");Lt.useEffect(()=>{u()},[]);const u=()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(f=>{const{latitude:h,longitude:g}=f.coords;d({latitude:h,longitude:g}),l(h,g)},s):(l(latitude,longitude),o("Geolocation is not supported by this browser."))},l=(f,h)=>{ur.post("/home",{latitude:f,longitude:h})},s=f=>{switch(l(i.latitude,i.longtitude),f.code){case f.PERMISSION_DENIED:o("User denied the request for Geolocation."),console.log(1);break;case f.POSITION_UNAVAILABLE:o("Location information is unavailable."),console.log(2);break;case f.TIMEOUT:o("The request to get user location timed out."),console.log(3);break;case f.UNKNOWN_ERROR:o("An unknown error occurred."),console.log(4);break;default:o("An error occurred."),console.log(5)}};return console.log(n),b.jsxs("div",{children:[b.jsx(lr,{}),b.jsxs("section",{className:"flex flex-col lg:flex-row lg:space-x-5 justify-center items-center bg-gray-100 p-2 lg:p-2",children:[b.jsx("div",{className:"w-full  lg:w-4/6",children:b.jsx(yi,{options:{rewind:!0,autoplay:!0},children:t&&t.map(f=>b.jsx(pi,{children:b.jsx(at,{className:"items-center w-full",href:`/business/${f.slug}`,children:b.jsxs("div",{className:"flex flex-col items-center justify-center h-full lg:flex-row hover:bg-gray-300",children:[b.jsx("img",{className:"h-96 w-full object-cover bg-white lg:w-3/6 mr-4  sm:h-90",src:`/${f.logo}`,alt:""}),b.jsxs("div",{className:"w-full justify-start lg:w-3/6 lg:flex-1 space-y-4 mt-2 sm:text-center  text-left",children:[b.jsx("h1",{className:"text-2xl lg:text-3xl font-bold text-primary hover:underline text-left",children:f.name}),b.jsxs("p",{className:"w-full max-w-xl text-md leading-relaxed text-gray-800 lg:ml-0 text-left",children:["Located at ",f.location]}),b.jsx("p",{className:"w-full max-w-xl text-md leading-relaxed text-gray-800 lg:ml-0 text-left",children:f.contacts}),b.jsx("div",{className:"block text-primary rounded-md hover:underline text-left",children:"View this business"})]})]})})}))})}),b.jsxs("div",{className:"hidden md:block w-full lg:w-2/6 text-gray-200",children:[b.jsx("h1",{className:"font-semibold text-lg text-primary",children:"RECENTLY ADDED ITEMS"}),n&&n.map(f=>b.jsx(at,{href:`/product/${f.slug}`,children:b.jsx(fr,{image:"/"+f.image,price:f.product.retail_price,title:f.product.name,time:"By "+f.company.name})}))]})]}),b.jsx("div",{className:"w-full fill",children:b.jsxs("div",{className:"mt-3 container mx-auto flex flex-wrap  max-w-full",children:[b.jsx("main",{className:"p-2 w-full md:w-4/5 flex flex-col items-center",children:r&&r.map(f=>b.jsx("div",{className:"flex w-full justify-center mb-8",children:b.jsxs("div",{className:"w-full",children:[b.jsxs("p",{className:"text-lg w-full text-center text-primary font-semibold",children:[f.name," nearby"]}),b.jsx("div",{className:"w-full mt-3 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-3",children:f.businesses&&f.businesses.map(h=>b.jsx(at,{className:"shadow-sm shadow-gray-400",href:`/business/${h.slug}`,children:b.jsxs("div",{className:"cursor-pointer w-full",children:[b.jsx("img",{src:`/${h.logo}`,className:"object-cover w-full h-64 sm:h-90",alt:""}),b.jsxs("div",{className:"p-4 border border-t-0",children:[b.jsx("div",{className:"justify-between",children:b.jsx("p",{"aria-label":"Category",title:"Visit the East",className:"inline-block mb-3 text-lg font-medium   leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700",children:h.name})}),b.jsxs("div",{className:"flex justify-start align-middle",children:[b.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:[b.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"}),b.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"})]}),b.jsx("p",{className:"ml-2 text-gray-700 text-xs mb-2 font-light",children:h.location})]}),b.jsx("div",{className:"flex justify-start align-middle",children:b.jsx("p",{className:"ml-2 text-red-700 text-xs mb-2 font-light",children:h.distance!=null?`${Intl.NumberFormat("en-US").format((h.distance/1e3).toFixed(1))} km away`:"Distance not available"})})]})]})}))}),b.jsx(at,{href:"/business/category/"+f.slug,children:b.jsxs("button",{className:"bg-primary p-3 text-white shadow-md shadow-gray-300 rounded mt-4",children:["More "+f.name+" nearby"," "]})})]})}))}),b.jsx("aside",{className:"p-2 w-full md:w-1/5 flex flex-col items-center"})]})}),b.jsx(cr,{})]})}export{wi as default};