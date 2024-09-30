import{R as C,r as B,j as b}from"./app-BBasbjv1.js";import{L as fe}from"./Layout-B0ltOled.js";import{r as S}from"./index-Ve6Pk4NC.js";var me=Object.defineProperty,k=Object.getOwnPropertySymbols,Z=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable,K=(s,c,r)=>c in s?me(s,c,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[c]=r,Q=(s,c)=>{for(var r in c||(c={}))Z.call(c,r)&&K(s,r,c[r]);if(k)for(var r of k(c))J.call(c,r)&&K(s,r,c[r]);return s},H=(s,c)=>{var r={};for(var l in s)Z.call(s,l)&&c.indexOf(l)<0&&(r[l]=s[l]);if(s!=null&&k)for(var l of k(s))c.indexOf(l)<0&&J.call(s,l)&&(r[l]=s[l]);return r};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var O;(s=>{const c=class p{constructor(t,e,n,o){if(this.version=t,this.errorCorrectionLevel=e,this.modules=[],this.isFunction=[],t<p.MIN_VERSION||t>p.MAX_VERSION)throw new RangeError("Version value out of range");if(o<-1||o>7)throw new RangeError("Mask value out of range");this.size=t*4+17;let i=[];for(let h=0;h<this.size;h++)i.push(!1);for(let h=0;h<this.size;h++)this.modules.push(i.slice()),this.isFunction.push(i.slice());this.drawFunctionPatterns();const d=this.addEccAndInterleave(n);if(this.drawCodewords(d),o==-1){let h=1e9;for(let g=0;g<8;g++){this.applyMask(g),this.drawFormatBits(g);const f=this.getPenaltyScore();f<h&&(o=g,h=f),this.applyMask(g)}}u(0<=o&&o<=7),this.mask=o,this.applyMask(o),this.drawFormatBits(o),this.isFunction=[]}static encodeText(t,e){const n=s.QrSegment.makeSegments(t);return p.encodeSegments(n,e)}static encodeBinary(t,e){const n=s.QrSegment.makeBytes(t);return p.encodeSegments([n],e)}static encodeSegments(t,e,n=1,o=40,i=-1,d=!0){if(!(p.MIN_VERSION<=n&&n<=o&&o<=p.MAX_VERSION)||i<-1||i>7)throw new RangeError("Invalid value");let h,g;for(h=n;;h++){const w=p.getNumDataCodewords(h,e)*8,M=E.getTotalBits(t,h);if(M<=w){g=M;break}if(h>=o)throw new RangeError("Data too long")}for(const w of[p.Ecc.MEDIUM,p.Ecc.QUARTILE,p.Ecc.HIGH])d&&g<=p.getNumDataCodewords(h,w)*8&&(e=w);let f=[];for(const w of t){r(w.mode.modeBits,4,f),r(w.numChars,w.mode.numCharCountBits(h),f);for(const M of w.getData())f.push(M)}u(f.length==g);const R=p.getNumDataCodewords(h,e)*8;u(f.length<=R),r(0,Math.min(4,R-f.length),f),r(0,(8-f.length%8)%8,f),u(f.length%8==0);for(let w=236;f.length<R;w^=253)r(w,8,f);let y=[];for(;y.length*8<f.length;)y.push(0);return f.forEach((w,M)=>y[M>>>3]|=w<<7-(M&7)),new p(h,e,y,i)}getModule(t,e){return 0<=t&&t<this.size&&0<=e&&e<this.size&&this.modules[e][t]}getModules(){return this.modules}drawFunctionPatterns(){for(let n=0;n<this.size;n++)this.setFunctionModule(6,n,n%2==0),this.setFunctionModule(n,6,n%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const t=this.getAlignmentPatternPositions(),e=t.length;for(let n=0;n<e;n++)for(let o=0;o<e;o++)n==0&&o==0||n==0&&o==e-1||n==e-1&&o==0||this.drawAlignmentPattern(t[n],t[o]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(t){const e=this.errorCorrectionLevel.formatBits<<3|t;let n=e;for(let i=0;i<10;i++)n=n<<1^(n>>>9)*1335;const o=(e<<10|n)^21522;u(o>>>15==0);for(let i=0;i<=5;i++)this.setFunctionModule(8,i,l(o,i));this.setFunctionModule(8,7,l(o,6)),this.setFunctionModule(8,8,l(o,7)),this.setFunctionModule(7,8,l(o,8));for(let i=9;i<15;i++)this.setFunctionModule(14-i,8,l(o,i));for(let i=0;i<8;i++)this.setFunctionModule(this.size-1-i,8,l(o,i));for(let i=8;i<15;i++)this.setFunctionModule(8,this.size-15+i,l(o,i));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let t=this.version;for(let n=0;n<12;n++)t=t<<1^(t>>>11)*7973;const e=this.version<<12|t;u(e>>>18==0);for(let n=0;n<18;n++){const o=l(e,n),i=this.size-11+n%3,d=Math.floor(n/3);this.setFunctionModule(i,d,o),this.setFunctionModule(d,i,o)}}drawFinderPattern(t,e){for(let n=-4;n<=4;n++)for(let o=-4;o<=4;o++){const i=Math.max(Math.abs(o),Math.abs(n)),d=t+o,h=e+n;0<=d&&d<this.size&&0<=h&&h<this.size&&this.setFunctionModule(d,h,i!=2&&i!=4)}}drawAlignmentPattern(t,e){for(let n=-2;n<=2;n++)for(let o=-2;o<=2;o++)this.setFunctionModule(t+o,e+n,Math.max(Math.abs(o),Math.abs(n))!=1)}setFunctionModule(t,e,n){this.modules[e][t]=n,this.isFunction[e][t]=!0}addEccAndInterleave(t){const e=this.version,n=this.errorCorrectionLevel;if(t.length!=p.getNumDataCodewords(e,n))throw new RangeError("Invalid argument");const o=p.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][e],i=p.ECC_CODEWORDS_PER_BLOCK[n.ordinal][e],d=Math.floor(p.getNumRawDataModules(e)/8),h=o-d%o,g=Math.floor(d/o);let f=[];const R=p.reedSolomonComputeDivisor(i);for(let w=0,M=0;w<o;w++){let A=t.slice(M,M+g-i+(w<h?0:1));M+=A.length;const z=p.reedSolomonComputeRemainder(A,R);w<h&&A.push(0),f.push(A.concat(z))}let y=[];for(let w=0;w<f[0].length;w++)f.forEach((M,A)=>{(w!=g-i||A>=h)&&y.push(M[w])});return u(y.length==d),y}drawCodewords(t){if(t.length!=Math.floor(p.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let e=0;for(let n=this.size-1;n>=1;n-=2){n==6&&(n=5);for(let o=0;o<this.size;o++)for(let i=0;i<2;i++){const d=n-i,g=(n+1&2)==0?this.size-1-o:o;!this.isFunction[g][d]&&e<t.length*8&&(this.modules[g][d]=l(t[e>>>3],7-(e&7)),e++)}}u(e==t.length*8)}applyMask(t){if(t<0||t>7)throw new RangeError("Mask value out of range");for(let e=0;e<this.size;e++)for(let n=0;n<this.size;n++){let o;switch(t){case 0:o=(n+e)%2==0;break;case 1:o=e%2==0;break;case 2:o=n%3==0;break;case 3:o=(n+e)%3==0;break;case 4:o=(Math.floor(n/3)+Math.floor(e/2))%2==0;break;case 5:o=n*e%2+n*e%3==0;break;case 6:o=(n*e%2+n*e%3)%2==0;break;case 7:o=((n+e)%2+n*e%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[e][n]&&o&&(this.modules[e][n]=!this.modules[e][n])}}getPenaltyScore(){let t=0;for(let i=0;i<this.size;i++){let d=!1,h=0,g=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[i][f]==d?(h++,h==5?t+=p.PENALTY_N1:h>5&&t++):(this.finderPenaltyAddHistory(h,g),d||(t+=this.finderPenaltyCountPatterns(g)*p.PENALTY_N3),d=this.modules[i][f],h=1);t+=this.finderPenaltyTerminateAndCount(d,h,g)*p.PENALTY_N3}for(let i=0;i<this.size;i++){let d=!1,h=0,g=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[f][i]==d?(h++,h==5?t+=p.PENALTY_N1:h>5&&t++):(this.finderPenaltyAddHistory(h,g),d||(t+=this.finderPenaltyCountPatterns(g)*p.PENALTY_N3),d=this.modules[f][i],h=1);t+=this.finderPenaltyTerminateAndCount(d,h,g)*p.PENALTY_N3}for(let i=0;i<this.size-1;i++)for(let d=0;d<this.size-1;d++){const h=this.modules[i][d];h==this.modules[i][d+1]&&h==this.modules[i+1][d]&&h==this.modules[i+1][d+1]&&(t+=p.PENALTY_N2)}let e=0;for(const i of this.modules)e=i.reduce((d,h)=>d+(h?1:0),e);const n=this.size*this.size,o=Math.ceil(Math.abs(e*20-n*10)/n)-1;return u(0<=o&&o<=9),t+=o*p.PENALTY_N4,u(0<=t&&t<=2568888),t}getAlignmentPatternPositions(){if(this.version==1)return[];{const t=Math.floor(this.version/7)+2,e=this.version==32?26:Math.ceil((this.version*4+4)/(t*2-2))*2;let n=[6];for(let o=this.size-7;n.length<t;o-=e)n.splice(1,0,o);return n}}static getNumRawDataModules(t){if(t<p.MIN_VERSION||t>p.MAX_VERSION)throw new RangeError("Version number out of range");let e=(16*t+128)*t+64;if(t>=2){const n=Math.floor(t/7)+2;e-=(25*n-10)*n-55,t>=7&&(e-=36)}return u(208<=e&&e<=29648),e}static getNumDataCodewords(t,e){return Math.floor(p.getNumRawDataModules(t)/8)-p.ECC_CODEWORDS_PER_BLOCK[e.ordinal][t]*p.NUM_ERROR_CORRECTION_BLOCKS[e.ordinal][t]}static reedSolomonComputeDivisor(t){if(t<1||t>255)throw new RangeError("Degree out of range");let e=[];for(let o=0;o<t-1;o++)e.push(0);e.push(1);let n=1;for(let o=0;o<t;o++){for(let i=0;i<e.length;i++)e[i]=p.reedSolomonMultiply(e[i],n),i+1<e.length&&(e[i]^=e[i+1]);n=p.reedSolomonMultiply(n,2)}return e}static reedSolomonComputeRemainder(t,e){let n=e.map(o=>0);for(const o of t){const i=o^n.shift();n.push(0),e.forEach((d,h)=>n[h]^=p.reedSolomonMultiply(d,i))}return n}static reedSolomonMultiply(t,e){if(t>>>8||e>>>8)throw new RangeError("Byte out of range");let n=0;for(let o=7;o>=0;o--)n=n<<1^(n>>>7)*285,n^=(e>>>o&1)*t;return u(n>>>8==0),n}finderPenaltyCountPatterns(t){const e=t[1];u(e<=this.size*3);const n=e>0&&t[2]==e&&t[3]==e*3&&t[4]==e&&t[5]==e;return(n&&t[0]>=e*4&&t[6]>=e?1:0)+(n&&t[6]>=e*4&&t[0]>=e?1:0)}finderPenaltyTerminateAndCount(t,e,n){return t&&(this.finderPenaltyAddHistory(e,n),e=0),e+=this.size,this.finderPenaltyAddHistory(e,n),this.finderPenaltyCountPatterns(n)}finderPenaltyAddHistory(t,e){e[0]==0&&(t+=this.size),e.pop(),e.unshift(t)}};c.MIN_VERSION=1,c.MAX_VERSION=40,c.PENALTY_N1=3,c.PENALTY_N2=3,c.PENALTY_N3=40,c.PENALTY_N4=10,c.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],c.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],s.QrCode=c;function r(m,t,e){if(t<0||t>31||m>>>t)throw new RangeError("Value out of range");for(let n=t-1;n>=0;n--)e.push(m>>>n&1)}function l(m,t){return(m>>>t&1)!=0}function u(m){if(!m)throw new Error("Assertion error")}const a=class v{constructor(t,e,n){if(this.mode=t,this.numChars=e,this.bitData=n,e<0)throw new RangeError("Invalid argument");this.bitData=n.slice()}static makeBytes(t){let e=[];for(const n of t)r(n,8,e);return new v(v.Mode.BYTE,t.length,e)}static makeNumeric(t){if(!v.isNumeric(t))throw new RangeError("String contains non-numeric characters");let e=[];for(let n=0;n<t.length;){const o=Math.min(t.length-n,3);r(parseInt(t.substring(n,n+o),10),o*3+1,e),n+=o}return new v(v.Mode.NUMERIC,t.length,e)}static makeAlphanumeric(t){if(!v.isAlphanumeric(t))throw new RangeError("String contains unencodable characters in alphanumeric mode");let e=[],n;for(n=0;n+2<=t.length;n+=2){let o=v.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n))*45;o+=v.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n+1)),r(o,11,e)}return n<t.length&&r(v.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n)),6,e),new v(v.Mode.ALPHANUMERIC,t.length,e)}static makeSegments(t){return t==""?[]:v.isNumeric(t)?[v.makeNumeric(t)]:v.isAlphanumeric(t)?[v.makeAlphanumeric(t)]:[v.makeBytes(v.toUtf8ByteArray(t))]}static makeEci(t){let e=[];if(t<0)throw new RangeError("ECI assignment value out of range");if(t<128)r(t,8,e);else if(t<16384)r(2,2,e),r(t,14,e);else if(t<1e6)r(6,3,e),r(t,21,e);else throw new RangeError("ECI assignment value out of range");return new v(v.Mode.ECI,0,e)}static isNumeric(t){return v.NUMERIC_REGEX.test(t)}static isAlphanumeric(t){return v.ALPHANUMERIC_REGEX.test(t)}getData(){return this.bitData.slice()}static getTotalBits(t,e){let n=0;for(const o of t){const i=o.mode.numCharCountBits(e);if(o.numChars>=1<<i)return 1/0;n+=4+i+o.bitData.length}return n}static toUtf8ByteArray(t){t=encodeURI(t);let e=[];for(let n=0;n<t.length;n++)t.charAt(n)!="%"?e.push(t.charCodeAt(n)):(e.push(parseInt(t.substring(n+1,n+3),16)),n+=2);return e}};a.NUMERIC_REGEX=/^[0-9]*$/,a.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,a.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let E=a;s.QrSegment=a})(O||(O={}));(s=>{(c=>{const r=class{constructor(u,a){this.ordinal=u,this.formatBits=a}};r.LOW=new r(0,1),r.MEDIUM=new r(1,0),r.QUARTILE=new r(2,3),r.HIGH=new r(3,2),c.Ecc=r})(s.QrCode||(s.QrCode={}))})(O||(O={}));(s=>{(c=>{const r=class{constructor(u,a){this.modeBits=u,this.numBitsCharCount=a}numCharCountBits(u){return this.numBitsCharCount[Math.floor((u+7)/17)]}};r.NUMERIC=new r(1,[10,12,14]),r.ALPHANUMERIC=new r(2,[9,11,13]),r.BYTE=new r(4,[8,16,16]),r.KANJI=new r(8,[8,10,12]),r.ECI=new r(7,[0,0,0]),c.Mode=r})(s.QrSegment||(s.QrSegment={}))})(O||(O={}));var L=O;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var pe={L:L.QrCode.Ecc.LOW,M:L.QrCode.Ecc.MEDIUM,Q:L.QrCode.Ecc.QUARTILE,H:L.QrCode.Ecc.HIGH},q=128,W="L",ee="#FFFFFF",te="#000000",ne=!1,re=1,ge=4,Ee=0,we=.1;function oe(s,c=0){const r=[];return s.forEach(function(l,u){let a=null;l.forEach(function(E,m){if(!E&&a!==null){r.push(`M${a+c} ${u+c}h${m-a}v1H${a+c}z`),a=null;return}if(m===l.length-1){if(!E)return;a===null?r.push(`M${m+c},${u+c} h1v1H${m+c}z`):r.push(`M${a+c},${u+c} h${m+1-a}v1H${a+c}z`);return}E&&a===null&&(a=m)})}),r.join("")}function se(s,c){return s.slice().map((r,l)=>l<c.y||l>=c.y+c.h?r:r.map((u,a)=>a<c.x||a>=c.x+c.w?u:!1))}function ye(s,c,r,l){if(l==null)return null;const u=s.length+r*2,a=Math.floor(c*we),E=u/c,m=(l.width||a)*E,t=(l.height||a)*E,e=l.x==null?s.length/2-m/2:l.x*E,n=l.y==null?s.length/2-t/2:l.y*E,o=l.opacity==null?1:l.opacity;let i=null;if(l.excavate){let h=Math.floor(e),g=Math.floor(n),f=Math.ceil(m+e-h),R=Math.ceil(t+n-g);i={x:h,y:g,w:f,h:R}}const d=l.crossOrigin;return{x:e,y:n,h:t,w:m,excavation:i,opacity:o,crossOrigin:d}}function ve(s,c){return c!=null?Math.max(Math.floor(c),0):s?ge:Ee}function ie({value:s,level:c,minVersion:r,includeMargin:l,marginSize:u,imageSettings:a,size:E}){let m=C.useMemo(()=>{const i=L.QrSegment.makeSegments(s);return L.QrCode.encodeSegments(i,pe[c],r)},[s,c,r]);const{cells:t,margin:e,numCells:n,calculatedImageSettings:o}=C.useMemo(()=>{let i=m.getModules();const d=ve(l,u),h=i.length+d*2,g=ye(i,E,d,a);return{cells:i,margin:d,numCells:h,calculatedImageSettings:g}},[m,E,a,l,u]);return{qrcode:m,margin:e,cells:t,numCells:n,calculatedImageSettings:o}}var be=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),Ce=C.forwardRef(function(c,r){const l=c,{value:u,size:a=q,level:E=W,bgColor:m=ee,fgColor:t=te,includeMargin:e=ne,minVersion:n=re,marginSize:o,imageSettings:i}=l,h=H(l,["value","size","level","bgColor","fgColor","includeMargin","minVersion","marginSize","imageSettings"]),{style:g}=h,f=H(h,["style"]),R=i==null?void 0:i.src,y=C.useRef(null),w=C.useRef(null),M=C.useCallback(I=>{y.current=I,typeof r=="function"?r(I):r&&(r.current=I)},[r]),[A,z]=C.useState(!1),{margin:x,cells:T,numCells:_,calculatedImageSettings:N}=ie({value:u,level:E,minVersion:n,includeMargin:e,marginSize:o,imageSettings:i,size:a});C.useEffect(()=>{if(y.current!=null){const I=y.current,P=I.getContext("2d");if(!P)return;let $=T;const F=w.current,Y=N!=null&&F!==null&&F.complete&&F.naturalHeight!==0&&F.naturalWidth!==0;Y&&N.excavation!=null&&($=se(T,N.excavation));const V=window.devicePixelRatio||1;I.height=I.width=a*V;const X=a/_*V;P.scale(X,X),P.fillStyle=m,P.fillRect(0,0,_,_),P.fillStyle=t,be?P.fill(new Path2D(oe($,x))):T.forEach(function(ce,ue){ce.forEach(function(he,de){he&&P.fillRect(de+x,ue+x,1,1)})}),N&&(P.globalAlpha=N.opacity),Y&&P.drawImage(F,N.x+x,N.y+x,N.w,N.h)}}),C.useEffect(()=>{z(!1)},[R]);const ae=Q({height:a,width:a},g);let G=null;return R!=null&&(G=C.createElement("img",{src:R,key:R,style:{display:"none"},onLoad:()=>{z(!0)},ref:w,crossOrigin:N==null?void 0:N.crossOrigin})),C.createElement(C.Fragment,null,C.createElement("canvas",Q({style:ae,height:a,width:a,ref:M,role:"img"},f)),G)});Ce.displayName="QRCodeCanvas";var le=C.forwardRef(function(c,r){const l=c,{value:u,size:a=q,level:E=W,bgColor:m=ee,fgColor:t=te,includeMargin:e=ne,minVersion:n=re,title:o,marginSize:i,imageSettings:d}=l,h=H(l,["value","size","level","bgColor","fgColor","includeMargin","minVersion","title","marginSize","imageSettings"]),{margin:g,cells:f,numCells:R,calculatedImageSettings:y}=ie({value:u,level:E,minVersion:n,includeMargin:e,marginSize:i,imageSettings:d,size:a});let w=f,M=null;d!=null&&y!=null&&(y.excavation!=null&&(w=se(f,y.excavation)),M=C.createElement("image",{href:d.src,height:y.h,width:y.w,x:y.x+g,y:y.y+g,preserveAspectRatio:"none",opacity:y.opacity,crossOrigin:y.crossOrigin}));const A=oe(w,g);return C.createElement("svg",Q({height:a,width:a,viewBox:`0 0 ${R} ${R}`,ref:r,role:"img"},h),!!o&&C.createElement("title",null,o),C.createElement("path",{fill:m,d:`M0,0 h${R}v${R}H0z`,shapeRendering:"crispEdges"}),C.createElement("path",{fill:t,d:A,shapeRendering:"crispEdges"}),M)});le.displayName="QRCodeSVG";/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var D=function(){return D=Object.assign||function(c){for(var r,l=1,u=arguments.length;l<u;l++){r=arguments[l];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(c[a]=r[a])}return c},D.apply(this,arguments)};function Me(s,c){var r={};for(var l in s)Object.prototype.hasOwnProperty.call(s,l)&&c.indexOf(l)<0&&(r[l]=s[l]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,l=Object.getOwnPropertySymbols(s);u<l.length;u++)c.indexOf(l[u])<0&&Object.prototype.propertyIsEnumerable.call(s,l[u])&&(r[l[u]]=s[l[u]]);return r}function Re(s,c,r,l){function u(a){return a instanceof r?a:new r(function(E){E(a)})}return new(r||(r=Promise))(function(a,E){function m(n){try{e(l.next(n))}catch(o){E(o)}}function t(n){try{e(l.throw(n))}catch(o){E(o)}}function e(n){n.done?a(n.value):u(n.value).then(m,t)}e((l=l.apply(s,c||[])).next())})}function Ne(s,c){var r={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},l,u,a,E;return E={next:m(0),throw:m(1),return:m(2)},typeof Symbol=="function"&&(E[Symbol.iterator]=function(){return this}),E;function m(e){return function(n){return t([e,n])}}function t(e){if(l)throw new TypeError("Generator is already executing.");for(;r;)try{if(l=1,u&&(a=e[0]&2?u.return:e[0]?u.throw||((a=u.return)&&a.call(u),0):u.next)&&!(a=a.call(u,e[1])).done)return a;switch(u=0,a&&(e=[e[0]&2,a.value]),e[0]){case 0:case 1:a=e;break;case 4:return r.label++,{value:e[1],done:!1};case 5:r.label++,u=e[1],e=[0];continue;case 7:e=r.ops.pop(),r.trys.pop();continue;default:if(a=r.trys,!(a=a.length>0&&a[a.length-1])&&(e[0]===6||e[0]===2)){r=0;continue}if(e[0]===3&&(!a||e[1]>a[0]&&e[1]<a[3])){r.label=e[1];break}if(e[0]===6&&r.label<a[1]){r.label=a[1],a=e;break}if(a&&r.label<a[2]){r.label=a[2],r.ops.push(e);break}a[2]&&r.ops.pop(),r.trys.pop();continue}e=c.call(s,r)}catch(n){e=[6,n],u=0}finally{l=a=0}if(e[0]&5)throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}}var U={},j="https://checkout.flutterwave.com/v3.js";function Ae(){var s=B.useState({loaded:!1,error:!1}),c=s[0],r=s[1];return B.useEffect(function(){if(U.hasOwnProperty(j))r({loaded:!0,error:!1});else{U.src=j;var l=document.createElement("script");l.src=j,l.async=!0;var u=function(){r({loaded:!0,error:!1})},a=function(){delete U.src,r({loaded:!0,error:!0})};return l.addEventListener("load",u),l.addEventListener("complete",u),l.addEventListener("error",a),document.body.appendChild(l),function(){l.removeEventListener("load",u),l.removeEventListener("error",a)}}},[]),[c.loaded,c.error]}function Pe(s){var c=Ae(),r=c[0],l=c[1];B.useEffect(function(){if(l)throw new Error("Unable to load flutterwave payment modal")},[l]);function u(a){var E=this,m,t,e=a.callback,n=a.onClose;if(l)throw new Error("Unable to load flutterwave payment modal");if(r){var o=D(D({},s),{amount:(m=s.amount)!==null&&m!==void 0?m:0,callback:function(i){return Re(E,void 0,void 0,function(){var d;return Ne(this,function(h){switch(h.label){case 0:return i.status!=="successful"?[3,2]:(e(i),[4,fetch("https://cors-anywhere.herokuapp.com/https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({publicKey:s.public_key,language:"Flutterwave-React-v3",version:"1.0.7",title:(s==null?void 0:s.payment_options.split(",").length)>1?"Initiate-Charge-Multiple":"Initiate-Charge-"+(s==null?void 0:s.payment_options),message:"15s"})})]);case 1:return h.sent(),[3,4];case 2:return e(i),[4,fetch("https://cors-anywhere.herokuapp.com/https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({publicKey:(d=s.public_key)!==null&&d!==void 0?d:"",language:"Flutterwave-React-v3",version:"1.0.7",title:(s==null?void 0:s.payment_options.split(",").length)>1?"Initiate-Charge-Multiple-error":"Initiate-Charge-"+(s==null?void 0:s.payment_options)+"-error",message:"15s"})})];case 3:h.sent(),h.label=4;case 4:return[2]}})})},onclose:n,payment_options:(t=s==null?void 0:s.payment_options)!==null&&t!==void 0?t:"card, ussd, mobilemoney"});return window.FlutterwaveCheckout&&window.FlutterwaveCheckout(o)}}return u}var Ie=function(s){var c=s.text,r=s.className,l=s.children,u=s.callback,a=s.onClose,E=s.disabled,m=Me(s,["text","className","children","callback","onClose","disabled"]),t=Pe(m);return B.createElement("button",{disabled:E,className:r,onClick:function(){return t({callback:u,onClose:a})}},c||l)};function Se(){document.getElementsByName("checkout").forEach(function(s){s.setAttribute("style","position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;"),s.setAttribute("id","flwpugpaidid"),s.setAttribute("src","https://checkout.flutterwave.com/?"),document.body.style.overflow=""})}function Oe({company:s}){const c=location.hostname,l={...{public_key:"FLWPUBK_TEST-dcc65cf1c7e549240c7a97b4a913307c-X",tx_ref:Date.now(),amount:38500,currency:"UGX",payment_options:"card,mobilemoney",customer:{email:"pokos333@gmail.com",phone_number:"0765974111",name:"john doe"},customizations:{title:"Shopkeeper360",description:"Subscription",logo:"https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg"}},text:"Pay subscription",callback:u=>{console.log(u),Se()},onClose:()=>{}};return b.jsxs("div",{className:"font-oswald p-5",children:[b.jsx("p",{className:"w-full font-semibold text-lg",children:"Business Details"}),b.jsxs("div",{className:"grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2",children:[b.jsx("div",{children:b.jsx(S.Input,{color:"deep-orange",size:"lg",label:"Business Name",value:s.company.name})}),b.jsx("div",{children:b.jsx(S.Input,{color:"deep-orange",size:"lg",label:"Business Contacts",value:s.company.contacts})}),b.jsx("div",{children:b.jsx(S.Input,{color:"deep-orange",size:"lg",label:"Business Location",value:s.company.location})}),b.jsx("div",{children:b.jsx(S.Input,{color:"deep-orange",size:"lg",label:"Business Email",value:s.company.email})}),b.jsx("div",{children:b.jsx(S.Input,{color:"deep-orange",size:"lg",label:"Subscription Date",value:s.company.subscription_date==null?"Not yet subscribed":new Date(s.company.subscription_date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})}),b.jsx("div",{children:b.jsx(S.Input,{color:"deep-orange",size:"lg",label:"Subscription Expiry",value:s.company.subscription_expiry==null?"Not yet subscribed":new Date(s.company.subscription_expiry).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})}),b.jsx(Ie,{...l,className:"rounded-md bg-primary text-white px-5 py-2"})]}),b.jsx("p",{className:"w-full font-semibold text-lg mt-5",children:"Business Link Code"}),b.jsx("div",{className:"mt-3 ml-2",children:b.jsx(le,{value:"https://"+c+"/business/"+s.company.slug})}),b.jsx(S.Button,{type:"submit",className:"bg-primary mt-4",children:"Download Code"})]})}Oe.layout=s=>b.jsx(fe,{children:s,props:s.props.company});export{Oe as default};