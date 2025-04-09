import{R as S,r as Fe,j as R}from"./app-CEsKhrD2.js";import{L as Ne}from"./Layout-CeDgiHcS.js";import{r as O}from"./index-qT20AIyQ.js";var $e=Object.defineProperty,z=Object.getOwnPropertySymbols,ue=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable,ne=(e,t,r)=>t in e?$e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,G=(e,t)=>{for(var r in t||(t={}))ue.call(t,r)&&ne(e,r,t[r]);if(z)for(var r of z(t))he.call(t,r)&&ne(e,r,t[r]);return e},W=(e,t)=>{var r={};for(var s in e)ue.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(e!=null&&z)for(var s of z(e))t.indexOf(s)<0&&he.call(e,s)&&(r[s]=e[s]);return r};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var D;(e=>{const t=class w{constructor(n,o,i,c){if(this.version=n,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],n<w.MIN_VERSION||n>w.MAX_VERSION)throw new RangeError("Version value out of range");if(c<-1||c>7)throw new RangeError("Mask value out of range");this.size=n*4+17;let u=[];for(let d=0;d<this.size;d++)u.push(!1);for(let d=0;d<this.size;d++)this.modules.push(u.slice()),this.isFunction.push(u.slice());this.drawFunctionPatterns();const m=this.addEccAndInterleave(i);if(this.drawCodewords(m),c==-1){let d=1e9;for(let p=0;p<8;p++){this.applyMask(p),this.drawFormatBits(p);const g=this.getPenaltyScore();g<d&&(c=p,d=g),this.applyMask(p)}}a(0<=c&&c<=7),this.mask=c,this.applyMask(c),this.drawFormatBits(c),this.isFunction=[]}static encodeText(n,o){const i=e.QrSegment.makeSegments(n);return w.encodeSegments(i,o)}static encodeBinary(n,o){const i=e.QrSegment.makeBytes(n);return w.encodeSegments([i],o)}static encodeSegments(n,o,i=1,c=40,u=-1,m=!0){if(!(w.MIN_VERSION<=i&&i<=c&&c<=w.MAX_VERSION)||u<-1||u>7)throw new RangeError("Invalid value");let d,p;for(d=i;;d++){const E=w.getNumDataCodewords(d,o)*8,b=f.getTotalBits(n,d);if(b<=E){p=b;break}if(d>=c)throw new RangeError("Data too long")}for(const E of[w.Ecc.MEDIUM,w.Ecc.QUARTILE,w.Ecc.HIGH])m&&p<=w.getNumDataCodewords(d,E)*8&&(o=E);let g=[];for(const E of n){r(E.mode.modeBits,4,g),r(E.numChars,E.mode.numCharCountBits(d),g);for(const b of E.getData())g.push(b)}a(g.length==p);const M=w.getNumDataCodewords(d,o)*8;a(g.length<=M),r(0,Math.min(4,M-g.length),g),r(0,(8-g.length%8)%8,g),a(g.length%8==0);for(let E=236;g.length<M;E^=253)r(E,8,g);let y=[];for(;y.length*8<g.length;)y.push(0);return g.forEach((E,b)=>y[b>>>3]|=E<<7-(b&7)),new w(d,o,y,u)}getModule(n,o){return 0<=n&&n<this.size&&0<=o&&o<this.size&&this.modules[o][n]}getModules(){return this.modules}drawFunctionPatterns(){for(let i=0;i<this.size;i++)this.setFunctionModule(6,i,i%2==0),this.setFunctionModule(i,6,i%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const n=this.getAlignmentPatternPositions(),o=n.length;for(let i=0;i<o;i++)for(let c=0;c<o;c++)i==0&&c==0||i==0&&c==o-1||i==o-1&&c==0||this.drawAlignmentPattern(n[i],n[c]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(n){const o=this.errorCorrectionLevel.formatBits<<3|n;let i=o;for(let u=0;u<10;u++)i=i<<1^(i>>>9)*1335;const c=(o<<10|i)^21522;a(c>>>15==0);for(let u=0;u<=5;u++)this.setFunctionModule(8,u,s(c,u));this.setFunctionModule(8,7,s(c,6)),this.setFunctionModule(8,8,s(c,7)),this.setFunctionModule(7,8,s(c,8));for(let u=9;u<15;u++)this.setFunctionModule(14-u,8,s(c,u));for(let u=0;u<8;u++)this.setFunctionModule(this.size-1-u,8,s(c,u));for(let u=8;u<15;u++)this.setFunctionModule(8,this.size-15+u,s(c,u));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let n=this.version;for(let i=0;i<12;i++)n=n<<1^(n>>>11)*7973;const o=this.version<<12|n;a(o>>>18==0);for(let i=0;i<18;i++){const c=s(o,i),u=this.size-11+i%3,m=Math.floor(i/3);this.setFunctionModule(u,m,c),this.setFunctionModule(m,u,c)}}drawFinderPattern(n,o){for(let i=-4;i<=4;i++)for(let c=-4;c<=4;c++){const u=Math.max(Math.abs(c),Math.abs(i)),m=n+c,d=o+i;0<=m&&m<this.size&&0<=d&&d<this.size&&this.setFunctionModule(m,d,u!=2&&u!=4)}}drawAlignmentPattern(n,o){for(let i=-2;i<=2;i++)for(let c=-2;c<=2;c++)this.setFunctionModule(n+c,o+i,Math.max(Math.abs(c),Math.abs(i))!=1)}setFunctionModule(n,o,i){this.modules[o][n]=i,this.isFunction[o][n]=!0}addEccAndInterleave(n){const o=this.version,i=this.errorCorrectionLevel;if(n.length!=w.getNumDataCodewords(o,i))throw new RangeError("Invalid argument");const c=w.NUM_ERROR_CORRECTION_BLOCKS[i.ordinal][o],u=w.ECC_CODEWORDS_PER_BLOCK[i.ordinal][o],m=Math.floor(w.getNumRawDataModules(o)/8),d=c-m%c,p=Math.floor(m/c);let g=[];const M=w.reedSolomonComputeDivisor(u);for(let E=0,b=0;E<c;E++){let v=n.slice(b,b+p-u+(E<d?0:1));b+=v.length;const U=w.reedSolomonComputeRemainder(v,M);E<d&&v.push(0),g.push(v.concat(U))}let y=[];for(let E=0;E<g[0].length;E++)g.forEach((b,v)=>{(E!=p-u||v>=d)&&y.push(b[E])});return a(y.length==m),y}drawCodewords(n){if(n.length!=Math.floor(w.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let i=this.size-1;i>=1;i-=2){i==6&&(i=5);for(let c=0;c<this.size;c++)for(let u=0;u<2;u++){const m=i-u,p=(i+1&2)==0?this.size-1-c:c;!this.isFunction[p][m]&&o<n.length*8&&(this.modules[p][m]=s(n[o>>>3],7-(o&7)),o++)}}a(o==n.length*8)}applyMask(n){if(n<0||n>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let i=0;i<this.size;i++){let c;switch(n){case 0:c=(i+o)%2==0;break;case 1:c=o%2==0;break;case 2:c=i%3==0;break;case 3:c=(i+o)%3==0;break;case 4:c=(Math.floor(i/3)+Math.floor(o/2))%2==0;break;case 5:c=i*o%2+i*o%3==0;break;case 6:c=(i*o%2+i*o%3)%2==0;break;case 7:c=((i+o)%2+i*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][i]&&c&&(this.modules[o][i]=!this.modules[o][i])}}getPenaltyScore(){let n=0;for(let u=0;u<this.size;u++){let m=!1,d=0,p=[0,0,0,0,0,0,0];for(let g=0;g<this.size;g++)this.modules[u][g]==m?(d++,d==5?n+=w.PENALTY_N1:d>5&&n++):(this.finderPenaltyAddHistory(d,p),m||(n+=this.finderPenaltyCountPatterns(p)*w.PENALTY_N3),m=this.modules[u][g],d=1);n+=this.finderPenaltyTerminateAndCount(m,d,p)*w.PENALTY_N3}for(let u=0;u<this.size;u++){let m=!1,d=0,p=[0,0,0,0,0,0,0];for(let g=0;g<this.size;g++)this.modules[g][u]==m?(d++,d==5?n+=w.PENALTY_N1:d>5&&n++):(this.finderPenaltyAddHistory(d,p),m||(n+=this.finderPenaltyCountPatterns(p)*w.PENALTY_N3),m=this.modules[g][u],d=1);n+=this.finderPenaltyTerminateAndCount(m,d,p)*w.PENALTY_N3}for(let u=0;u<this.size-1;u++)for(let m=0;m<this.size-1;m++){const d=this.modules[u][m];d==this.modules[u][m+1]&&d==this.modules[u+1][m]&&d==this.modules[u+1][m+1]&&(n+=w.PENALTY_N2)}let o=0;for(const u of this.modules)o=u.reduce((m,d)=>m+(d?1:0),o);const i=this.size*this.size,c=Math.ceil(Math.abs(o*20-i*10)/i)-1;return a(0<=c&&c<=9),n+=c*w.PENALTY_N4,a(0<=n&&n<=2568888),n}getAlignmentPatternPositions(){if(this.version==1)return[];{const n=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(n*2-2))*2;let i=[6];for(let c=this.size-7;i.length<n;c-=o)i.splice(1,0,c);return i}}static getNumRawDataModules(n){if(n<w.MIN_VERSION||n>w.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*n+128)*n+64;if(n>=2){const i=Math.floor(n/7)+2;o-=(25*i-10)*i-55,n>=7&&(o-=36)}return a(208<=o&&o<=29648),o}static getNumDataCodewords(n,o){return Math.floor(w.getNumRawDataModules(n)/8)-w.ECC_CODEWORDS_PER_BLOCK[o.ordinal][n]*w.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][n]}static reedSolomonComputeDivisor(n){if(n<1||n>255)throw new RangeError("Degree out of range");let o=[];for(let c=0;c<n-1;c++)o.push(0);o.push(1);let i=1;for(let c=0;c<n;c++){for(let u=0;u<o.length;u++)o[u]=w.reedSolomonMultiply(o[u],i),u+1<o.length&&(o[u]^=o[u+1]);i=w.reedSolomonMultiply(i,2)}return o}static reedSolomonComputeRemainder(n,o){let i=o.map(c=>0);for(const c of n){const u=c^i.shift();i.push(0),o.forEach((m,d)=>i[d]^=w.reedSolomonMultiply(m,u))}return i}static reedSolomonMultiply(n,o){if(n>>>8||o>>>8)throw new RangeError("Byte out of range");let i=0;for(let c=7;c>=0;c--)i=i<<1^(i>>>7)*285,i^=(o>>>c&1)*n;return a(i>>>8==0),i}finderPenaltyCountPatterns(n){const o=n[1];a(o<=this.size*3);const i=o>0&&n[2]==o&&n[3]==o*3&&n[4]==o&&n[5]==o;return(i&&n[0]>=o*4&&n[6]>=o?1:0)+(i&&n[6]>=o*4&&n[0]>=o?1:0)}finderPenaltyTerminateAndCount(n,o,i){return n&&(this.finderPenaltyAddHistory(o,i),o=0),o+=this.size,this.finderPenaltyAddHistory(o,i),this.finderPenaltyCountPatterns(i)}finderPenaltyAddHistory(n,o){o[0]==0&&(n+=this.size),o.pop(),o.unshift(n)}};t.MIN_VERSION=1,t.MAX_VERSION=40,t.PENALTY_N1=3,t.PENALTY_N2=3,t.PENALTY_N3=40,t.PENALTY_N4=10,t.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],t.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],e.QrCode=t;function r(h,n,o){if(n<0||n>31||h>>>n)throw new RangeError("Value out of range");for(let i=n-1;i>=0;i--)o.push(h>>>i&1)}function s(h,n){return(h>>>n&1)!=0}function a(h){if(!h)throw new Error("Assertion error")}const l=class C{constructor(n,o,i){if(this.mode=n,this.numChars=o,this.bitData=i,o<0)throw new RangeError("Invalid argument");this.bitData=i.slice()}static makeBytes(n){let o=[];for(const i of n)r(i,8,o);return new C(C.Mode.BYTE,n.length,o)}static makeNumeric(n){if(!C.isNumeric(n))throw new RangeError("String contains non-numeric characters");let o=[];for(let i=0;i<n.length;){const c=Math.min(n.length-i,3);r(parseInt(n.substring(i,i+c),10),c*3+1,o),i+=c}return new C(C.Mode.NUMERIC,n.length,o)}static makeAlphanumeric(n){if(!C.isAlphanumeric(n))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],i;for(i=0;i+2<=n.length;i+=2){let c=C.ALPHANUMERIC_CHARSET.indexOf(n.charAt(i))*45;c+=C.ALPHANUMERIC_CHARSET.indexOf(n.charAt(i+1)),r(c,11,o)}return i<n.length&&r(C.ALPHANUMERIC_CHARSET.indexOf(n.charAt(i)),6,o),new C(C.Mode.ALPHANUMERIC,n.length,o)}static makeSegments(n){return n==""?[]:C.isNumeric(n)?[C.makeNumeric(n)]:C.isAlphanumeric(n)?[C.makeAlphanumeric(n)]:[C.makeBytes(C.toUtf8ByteArray(n))]}static makeEci(n){let o=[];if(n<0)throw new RangeError("ECI assignment value out of range");if(n<128)r(n,8,o);else if(n<16384)r(2,2,o),r(n,14,o);else if(n<1e6)r(6,3,o),r(n,21,o);else throw new RangeError("ECI assignment value out of range");return new C(C.Mode.ECI,0,o)}static isNumeric(n){return C.NUMERIC_REGEX.test(n)}static isAlphanumeric(n){return C.ALPHANUMERIC_REGEX.test(n)}getData(){return this.bitData.slice()}static getTotalBits(n,o){let i=0;for(const c of n){const u=c.mode.numCharCountBits(o);if(c.numChars>=1<<u)return 1/0;i+=4+u+c.bitData.length}return i}static toUtf8ByteArray(n){n=encodeURI(n);let o=[];for(let i=0;i<n.length;i++)n.charAt(i)!="%"?o.push(n.charCodeAt(i)):(o.push(parseInt(n.substring(i+1,i+3),16)),i+=2);return o}};l.NUMERIC_REGEX=/^[0-9]*$/,l.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,l.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let f=l;e.QrSegment=l})(D||(D={}));(e=>{(t=>{const r=class{constructor(a,l){this.ordinal=a,this.formatBits=l}};r.LOW=new r(0,1),r.MEDIUM=new r(1,0),r.QUARTILE=new r(2,3),r.HIGH=new r(3,2),t.Ecc=r})(e.QrCode||(e.QrCode={}))})(D||(D={}));(e=>{(t=>{const r=class{constructor(a,l){this.modeBits=a,this.numBitsCharCount=l}numCharCountBits(a){return this.numBitsCharCount[Math.floor((a+7)/17)]}};r.NUMERIC=new r(1,[10,12,14]),r.ALPHANUMERIC=new r(2,[9,11,13]),r.BYTE=new r(4,[8,16,16]),r.KANJI=new r(8,[8,10,12]),r.ECI=new r(7,[0,0,0]),t.Mode=r})(e.QrSegment||(e.QrSegment={}))})(D||(D={}));var F=D;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Ue={L:F.QrCode.Ecc.LOW,M:F.QrCode.Ecc.MEDIUM,Q:F.QrCode.Ecc.QUARTILE,H:F.QrCode.Ecc.HIGH},fe=128,de="L",me="#FFFFFF",ge="#000000",we=!1,pe=1,Be=4,ze=0,_e=.1;function Ee(e,t=0){const r=[];return e.forEach(function(s,a){let l=null;s.forEach(function(f,h){if(!f&&l!==null){r.push(`M${l+t} ${a+t}h${h-l}v1H${l+t}z`),l=null;return}if(h===s.length-1){if(!f)return;l===null?r.push(`M${h+t},${a+t} h1v1H${h+t}z`):r.push(`M${l+t},${a+t} h${h+1-l}v1H${l+t}z`);return}f&&l===null&&(l=h)})}),r.join("")}function ye(e,t){return e.slice().map((r,s)=>s<t.y||s>=t.y+t.h?r:r.map((a,l)=>l<t.x||l>=t.x+t.w?a:!1))}function ke(e,t,r,s){if(s==null)return null;const a=e.length+r*2,l=Math.floor(t*_e),f=a/t,h=(s.width||l)*f,n=(s.height||l)*f,o=s.x==null?e.length/2-h/2:s.x*f,i=s.y==null?e.length/2-n/2:s.y*f,c=s.opacity==null?1:s.opacity;let u=null;if(s.excavate){let d=Math.floor(o),p=Math.floor(i),g=Math.ceil(h+o-d),M=Math.ceil(n+i-p);u={x:d,y:p,w:g,h:M}}const m=s.crossOrigin;return{x:o,y:i,h:n,w:h,excavation:u,opacity:c,crossOrigin:m}}function He(e,t){return t!=null?Math.max(Math.floor(t),0):e?Be:ze}function Ce({value:e,level:t,minVersion:r,includeMargin:s,marginSize:a,imageSettings:l,size:f}){let h=S.useMemo(()=>{const u=F.QrSegment.makeSegments(e);return F.QrCode.encodeSegments(u,Ue[t],r)},[e,t,r]);const{cells:n,margin:o,numCells:i,calculatedImageSettings:c}=S.useMemo(()=>{let u=h.getModules();const m=He(s,a),d=u.length+m*2,p=ke(u,f,m,l);return{cells:u,margin:m,numCells:d,calculatedImageSettings:p}},[h,f,l,s,a]);return{qrcode:h,margin:o,cells:n,numCells:i,calculatedImageSettings:c}}var je=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),Ve=S.forwardRef(function(t,r){const s=t,{value:a,size:l=fe,level:f=de,bgColor:h=me,fgColor:n=ge,includeMargin:o=we,minVersion:i=pe,marginSize:c,imageSettings:u}=s,d=W(s,["value","size","level","bgColor","fgColor","includeMargin","minVersion","marginSize","imageSettings"]),{style:p}=d,g=W(d,["style"]),M=u==null?void 0:u.src,y=S.useRef(null),E=S.useRef(null),b=S.useCallback(T=>{y.current=T,typeof r=="function"?r(T):r&&(r.current=T)},[r]),[v,U]=S.useState(!1),{margin:N,cells:j,numCells:V,calculatedImageSettings:I}=Ce({value:a,level:f,minVersion:i,includeMargin:o,marginSize:c,imageSettings:u,size:l});S.useEffect(()=>{if(y.current!=null){const T=y.current,x=T.getContext("2d");if(!x)return;let Z=j;const $=E.current,J=I!=null&&$!==null&&$.complete&&$.naturalHeight!==0&&$.naturalWidth!==0;J&&I.excavation!=null&&(Z=ye(j,I.excavation));const ee=window.devicePixelRatio||1;T.height=T.width=l*ee;const te=l/V*ee;x.scale(te,te),x.fillStyle=h,x.fillRect(0,0,V,V),x.fillStyle=n,je?x.fill(new Path2D(Ee(Z,N))):j.forEach(function(Le,Te){Le.forEach(function(Oe,De){Oe&&x.fillRect(De+N,Te+N,1,1)})}),I&&(x.globalAlpha=I.opacity),J&&x.drawImage($,I.x+N,I.y+N,I.w,I.h)}}),S.useEffect(()=>{U(!1)},[M]);const xe=G({height:l,width:l},p);let q=null;return M!=null&&(q=S.createElement("img",{src:M,key:M,style:{display:"none"},onLoad:()=>{U(!0)},ref:E,crossOrigin:I==null?void 0:I.crossOrigin})),S.createElement(S.Fragment,null,S.createElement("canvas",G({style:xe,height:l,width:l,ref:b,role:"img"},g)),q)});Ve.displayName="QRCodeCanvas";var Re=S.forwardRef(function(t,r){const s=t,{value:a,size:l=fe,level:f=de,bgColor:h=me,fgColor:n=ge,includeMargin:o=we,minVersion:i=pe,title:c,marginSize:u,imageSettings:m}=s,d=W(s,["value","size","level","bgColor","fgColor","includeMargin","minVersion","title","marginSize","imageSettings"]),{margin:p,cells:g,numCells:M,calculatedImageSettings:y}=Ce({value:a,level:f,minVersion:i,includeMargin:o,marginSize:u,imageSettings:m,size:l});let E=g,b=null;m!=null&&y!=null&&(y.excavation!=null&&(E=ye(g,y.excavation)),b=S.createElement("image",{href:m.src,height:y.h,width:y.w,x:y.x+p,y:y.y+p,preserveAspectRatio:"none",opacity:y.opacity,crossOrigin:y.crossOrigin}));const v=Ee(E,p);return S.createElement("svg",G({height:l,width:l,viewBox:`0 0 ${M} ${M}`,ref:r,role:"img"},d),!!c&&S.createElement("title",null,c),S.createElement("path",{fill:h,d:`M0,0 h${M}v${M}H0z`,shapeRendering:"crispEdges"}),S.createElement("path",{fill:n,d:v,shapeRendering:"crispEdges"}),b)});Re.displayName="QRCodeSVG";function Qe(e,t){if(e.match(/^[a-z]+:\/\//i))return e;if(e.match(/^\/\//))return window.location.protocol+e;if(e.match(/^[a-z]+:/i))return e;const r=document.implementation.createHTMLDocument(),s=r.createElement("base"),a=r.createElement("a");return r.head.appendChild(s),r.body.appendChild(a),t&&(s.href=t),a.href=e,a.href}const Ge=(()=>{let e=0;const t=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(e+=1,`u${t()}${e}`)})();function L(e){const t=[];for(let r=0,s=e.length;r<s;r++)t.push(e[r]);return t}function _(e,t){const s=(e.ownerDocument.defaultView||window).getComputedStyle(e).getPropertyValue(t);return s?parseFloat(s.replace("px","")):0}function We(e){const t=_(e,"border-left-width"),r=_(e,"border-right-width");return e.clientWidth+t+r}function Ye(e){const t=_(e,"border-top-width"),r=_(e,"border-bottom-width");return e.clientHeight+t+r}function Se(e,t={}){const r=t.width||We(e),s=t.height||Ye(e);return{width:r,height:s}}function Xe(){let e,t;try{t=process}catch{}const r=t&&t.env?t.env.devicePixelRatio:null;return r&&(e=parseInt(r,10),Number.isNaN(e)&&(e=1)),e||window.devicePixelRatio||1}const A=16384;function Ke(e){(e.width>A||e.height>A)&&(e.width>A&&e.height>A?e.width>e.height?(e.height*=A/e.width,e.width=A):(e.width*=A/e.height,e.height=A):e.width>A?(e.height*=A/e.width,e.width=A):(e.width*=A/e.height,e.height=A))}function k(e){return new Promise((t,r)=>{const s=new Image;s.decode=()=>t(s),s.onload=()=>t(s),s.onerror=r,s.crossOrigin="anonymous",s.decoding="async",s.src=e})}async function qe(e){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then(t=>`data:image/svg+xml;charset=utf-8,${t}`)}async function Ze(e,t,r){const s="http://www.w3.org/2000/svg",a=document.createElementNS(s,"svg"),l=document.createElementNS(s,"foreignObject");return a.setAttribute("width",`${t}`),a.setAttribute("height",`${r}`),a.setAttribute("viewBox",`0 0 ${t} ${r}`),l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("x","0"),l.setAttribute("y","0"),l.setAttribute("externalResourcesRequired","true"),a.appendChild(l),l.appendChild(e),qe(a)}const P=(e,t)=>{if(e instanceof t)return!0;const r=Object.getPrototypeOf(e);return r===null?!1:r.constructor.name===t.name||P(r,t)};function Je(e){const t=e.getPropertyValue("content");return`${e.cssText} content: '${t.replace(/'|"/g,"")}';`}function et(e){return L(e).map(t=>{const r=e.getPropertyValue(t),s=e.getPropertyPriority(t);return`${t}: ${r}${s?" !important":""};`}).join(" ")}function tt(e,t,r){const s=`.${e}:${t}`,a=r.cssText?Je(r):et(r);return document.createTextNode(`${s}{${a}}`)}function re(e,t,r){const s=window.getComputedStyle(e,r),a=s.getPropertyValue("content");if(a===""||a==="none")return;const l=Ge();try{t.className=`${t.className} ${l}`}catch{return}const f=document.createElement("style");f.appendChild(tt(l,r,s)),t.appendChild(f)}function nt(e,t){re(e,t,":before"),re(e,t,":after")}const se="application/font-woff",ie="image/jpeg",rt={woff:se,woff2:se,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:ie,jpeg:ie,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function st(e){const t=/\.([^./]*?)$/g.exec(e);return t?t[1]:""}function X(e){const t=st(e).toLowerCase();return rt[t]||""}function it(e){return e.split(/,/)[1]}function Y(e){return e.search(/^(data:)/)!==-1}function be(e,t){return`data:${t};base64,${e}`}async function Me(e,t,r){const s=await fetch(e,t);if(s.status===404)throw new Error(`Resource "${s.url}" not found`);const a=await s.blob();return new Promise((l,f)=>{const h=new FileReader;h.onerror=f,h.onloadend=()=>{try{l(r({res:s,result:h.result}))}catch(n){f(n)}},h.readAsDataURL(a)})}const Q={};function ot(e,t,r){let s=e.replace(/\?.*/,"");return r&&(s=e),/ttf|otf|eot|woff2?/i.test(s)&&(s=s.replace(/.*\//,"")),t?`[${t}]${s}`:s}async function K(e,t,r){const s=ot(e,t,r.includeQueryParams);if(Q[s]!=null)return Q[s];r.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+new Date().getTime());let a;try{const l=await Me(e,r.fetchRequestInit,({res:f,result:h})=>(t||(t=f.headers.get("Content-Type")||""),it(h)));a=be(l,t)}catch(l){a=r.imagePlaceholder||"";let f=`Failed to fetch resource: ${e}`;l&&(f=typeof l=="string"?l:l.message),f&&console.warn(f)}return Q[s]=a,a}async function lt(e){const t=e.toDataURL();return t==="data:,"?e.cloneNode(!1):k(t)}async function at(e,t){if(e.currentSrc){const l=document.createElement("canvas"),f=l.getContext("2d");l.width=e.clientWidth,l.height=e.clientHeight,f==null||f.drawImage(e,0,0,l.width,l.height);const h=l.toDataURL();return k(h)}const r=e.poster,s=X(r),a=await K(r,s,t);return k(a)}async function ct(e){var t;try{if(!((t=e==null?void 0:e.contentDocument)===null||t===void 0)&&t.body)return await H(e.contentDocument.body,{},!0)}catch{}return e.cloneNode(!1)}async function ut(e,t){return P(e,HTMLCanvasElement)?lt(e):P(e,HTMLVideoElement)?at(e,t):P(e,HTMLIFrameElement)?ct(e):e.cloneNode(!1)}const ht=e=>e.tagName!=null&&e.tagName.toUpperCase()==="SLOT";async function ft(e,t,r){var s,a;let l=[];return ht(e)&&e.assignedNodes?l=L(e.assignedNodes()):P(e,HTMLIFrameElement)&&(!((s=e.contentDocument)===null||s===void 0)&&s.body)?l=L(e.contentDocument.body.childNodes):l=L(((a=e.shadowRoot)!==null&&a!==void 0?a:e).childNodes),l.length===0||P(e,HTMLVideoElement)||await l.reduce((f,h)=>f.then(()=>H(h,r)).then(n=>{n&&t.appendChild(n)}),Promise.resolve()),t}function dt(e,t){const r=t.style;if(!r)return;const s=window.getComputedStyle(e);s.cssText?(r.cssText=s.cssText,r.transformOrigin=s.transformOrigin):L(s).forEach(a=>{let l=s.getPropertyValue(a);a==="font-size"&&l.endsWith("px")&&(l=`${Math.floor(parseFloat(l.substring(0,l.length-2)))-.1}px`),P(e,HTMLIFrameElement)&&a==="display"&&l==="inline"&&(l="block"),a==="d"&&t.getAttribute("d")&&(l=`path(${t.getAttribute("d")})`),r.setProperty(a,l,s.getPropertyPriority(a))})}function mt(e,t){P(e,HTMLTextAreaElement)&&(t.innerHTML=e.value),P(e,HTMLInputElement)&&t.setAttribute("value",e.value)}function gt(e,t){if(P(e,HTMLSelectElement)){const r=t,s=Array.from(r.children).find(a=>e.value===a.getAttribute("value"));s&&s.setAttribute("selected","")}}function wt(e,t){return P(t,Element)&&(dt(e,t),nt(e,t),mt(e,t),gt(e,t)),t}async function pt(e,t){const r=e.querySelectorAll?e.querySelectorAll("use"):[];if(r.length===0)return e;const s={};for(let l=0;l<r.length;l++){const h=r[l].getAttribute("xlink:href");if(h){const n=e.querySelector(h),o=document.querySelector(h);!n&&o&&!s[h]&&(s[h]=await H(o,t,!0))}}const a=Object.values(s);if(a.length){const l="http://www.w3.org/1999/xhtml",f=document.createElementNS(l,"svg");f.setAttribute("xmlns",l),f.style.position="absolute",f.style.width="0",f.style.height="0",f.style.overflow="hidden",f.style.display="none";const h=document.createElementNS(l,"defs");f.appendChild(h);for(let n=0;n<a.length;n++)h.appendChild(a[n]);e.appendChild(f)}return e}async function H(e,t,r){return!r&&t.filter&&!t.filter(e)?null:Promise.resolve(e).then(s=>ut(s,t)).then(s=>ft(e,s,t)).then(s=>wt(e,s)).then(s=>pt(s,t))}const Pe=/url\((['"]?)([^'"]+?)\1\)/g,Et=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,yt=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function Ct(e){const t=e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`,"g")}function Rt(e){const t=[];return e.replace(Pe,(r,s,a)=>(t.push(a),r)),t.filter(r=>!Y(r))}async function St(e,t,r,s,a){try{const l=r?Qe(t,r):t,f=X(t);let h;if(a){const n=await a(l);h=be(n,f)}else h=await K(l,f,s);return e.replace(Ct(t),`$1${h}$3`)}catch{}return e}function bt(e,{preferredFontFormat:t}){return t?e.replace(yt,r=>{for(;;){const[s,,a]=Et.exec(r)||[];if(!a)return"";if(a===t)return`src: ${s};`}}):e}function Ae(e){return e.search(Pe)!==-1}async function Ie(e,t,r){if(!Ae(e))return e;const s=bt(e,r);return Rt(s).reduce((l,f)=>l.then(h=>St(h,f,t,r)),Promise.resolve(s))}async function B(e,t,r){var s;const a=(s=t.style)===null||s===void 0?void 0:s.getPropertyValue(e);if(a){const l=await Ie(a,null,r);return t.style.setProperty(e,l,t.style.getPropertyPriority(e)),!0}return!1}async function Mt(e,t){await B("background",e,t)||await B("background-image",e,t),await B("mask",e,t)||await B("mask-image",e,t)}async function Pt(e,t){const r=P(e,HTMLImageElement);if(!(r&&!Y(e.src))&&!(P(e,SVGImageElement)&&!Y(e.href.baseVal)))return;const s=r?e.src:e.href.baseVal,a=await K(s,X(s),t);await new Promise((l,f)=>{e.onload=l,e.onerror=f;const h=e;h.decode&&(h.decode=l),h.loading==="lazy"&&(h.loading="eager"),r?(e.srcset="",e.src=a):e.href.baseVal=a})}async function At(e,t){const s=L(e.childNodes).map(a=>ve(a,t));await Promise.all(s).then(()=>e)}async function ve(e,t){P(e,Element)&&(await Mt(e,t),await Pt(e,t),await At(e,t))}function It(e,t){const{style:r}=e;t.backgroundColor&&(r.backgroundColor=t.backgroundColor),t.width&&(r.width=`${t.width}px`),t.height&&(r.height=`${t.height}px`);const s=t.style;return s!=null&&Object.keys(s).forEach(a=>{r[a]=s[a]}),e}const oe={};async function le(e){let t=oe[e];if(t!=null)return t;const s=await(await fetch(e)).text();return t={url:e,cssText:s},oe[e]=t,t}async function ae(e,t){let r=e.cssText;const s=/url\(["']?([^"')]+)["']?\)/g,l=(r.match(/url\([^)]+\)/g)||[]).map(async f=>{let h=f.replace(s,"$1");return h.startsWith("https://")||(h=new URL(h,e.url).href),Me(h,t.fetchRequestInit,({result:n})=>(r=r.replace(f,`url(${n})`),[f,n]))});return Promise.all(l).then(()=>r)}function ce(e){if(e==null)return[];const t=[],r=/(\/\*[\s\S]*?\*\/)/gi;let s=e.replace(r,"");const a=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const n=a.exec(s);if(n===null)break;t.push(n[0])}s=s.replace(a,"");const l=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,f="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",h=new RegExp(f,"gi");for(;;){let n=l.exec(s);if(n===null){if(n=h.exec(s),n===null)break;l.lastIndex=h.lastIndex}else h.lastIndex=l.lastIndex;t.push(n[0])}return t}async function vt(e,t){const r=[],s=[];return e.forEach(a=>{if("cssRules"in a)try{L(a.cssRules||[]).forEach((l,f)=>{if(l.type===CSSRule.IMPORT_RULE){let h=f+1;const n=l.href,o=le(n).then(i=>ae(i,t)).then(i=>ce(i).forEach(c=>{try{a.insertRule(c,c.startsWith("@import")?h+=1:a.cssRules.length)}catch(u){console.error("Error inserting rule from remote css",{rule:c,error:u})}})).catch(i=>{console.error("Error loading remote css",i.toString())});s.push(o)}})}catch(l){const f=e.find(h=>h.href==null)||document.styleSheets[0];a.href!=null&&s.push(le(a.href).then(h=>ae(h,t)).then(h=>ce(h).forEach(n=>{f.insertRule(n,a.cssRules.length)})).catch(h=>{console.error("Error loading remote stylesheet",h)})),console.error("Error inlining remote css file",l)}}),Promise.all(s).then(()=>(e.forEach(a=>{if("cssRules"in a)try{L(a.cssRules||[]).forEach(l=>{r.push(l)})}catch(l){console.error(`Error while reading CSS rules from ${a.href}`,l)}}),r))}function xt(e){return e.filter(t=>t.type===CSSRule.FONT_FACE_RULE).filter(t=>Ae(t.style.getPropertyValue("src")))}async function Lt(e,t){if(e.ownerDocument==null)throw new Error("Provided element is not within a Document");const r=L(e.ownerDocument.styleSheets),s=await vt(r,t);return xt(s)}async function Tt(e,t){const r=await Lt(e,t);return(await Promise.all(r.map(a=>{const l=a.parentStyleSheet?a.parentStyleSheet.href:null;return Ie(a.cssText,l,t)}))).join(`
`)}async function Ot(e,t){const r=t.fontEmbedCSS!=null?t.fontEmbedCSS:t.skipFonts?null:await Tt(e,t);if(r){const s=document.createElement("style"),a=document.createTextNode(r);s.appendChild(a),e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s)}}async function Dt(e,t={}){const{width:r,height:s}=Se(e,t),a=await H(e,t,!0);return await Ot(a,t),await ve(a,t),It(a,t),await Ze(a,r,s)}async function Ft(e,t={}){const{width:r,height:s}=Se(e,t),a=await Dt(e,t),l=await k(a),f=document.createElement("canvas"),h=f.getContext("2d"),n=t.pixelRatio||Xe(),o=t.canvasWidth||r,i=t.canvasHeight||s;return f.width=o*n,f.height=i*n,t.skipAutoScale||Ke(f),f.style.width=`${o}`,f.style.height=`${i}`,t.backgroundColor&&(h.fillStyle=t.backgroundColor,h.fillRect(0,0,f.width,f.height)),h.drawImage(l,0,0,f.width,f.height),f}async function Nt(e,t={}){return(await Ft(e,t)).toDataURL()}function $t({company:e}){const t=location.hostname,r=Fe.useRef(null),s=async()=>{const a=await Nt(r.current),l=document.createElement("a");l.download=`${e.company.name}.png`,l.href=a,l.click()};return R.jsxs("div",{className:"font-oswald p-5",children:[R.jsx("p",{className:"w-full font-semibold text-lg",children:"Business Details"}),R.jsxs("div",{className:"grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2",children:[R.jsx("div",{children:R.jsx(O.Input,{color:"deep-orange",size:"lg",label:"Business Name",value:e.company.name})}),R.jsx("div",{children:R.jsx(O.Input,{color:"deep-orange",size:"lg",label:"Business Contacts",value:e.company.contacts})}),R.jsx("div",{children:R.jsx(O.Input,{color:"deep-orange",size:"lg",label:"Business Location",value:e.company.location})}),R.jsx("div",{children:R.jsx(O.Input,{color:"deep-orange",size:"lg",label:"Business Email",value:e.company.email})}),R.jsx("div",{children:R.jsx(O.Input,{color:"deep-orange",size:"lg",label:"Subscription Date",value:e.company.subscription_date==null?"Not yet subscribed":new Date(e.company.subscription_date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})}),R.jsx("div",{children:R.jsx(O.Input,{color:"deep-orange",size:"lg",label:"Subscription Expiry",value:e.company.subscription_expiry==null?"Not yet subscribed":new Date(e.company.subscription_expiry).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})})]}),R.jsx("p",{className:"w-full font-semibold text-lg mt-5",children:"Business Link Code"}),R.jsx("div",{className:"mt-3 ml-2",children:R.jsx(Re,{ref:r,value:"https://"+t+"/business/"+e.company.slug})}),R.jsx(O.Button,{onClick:s,type:"submit",className:"bg-primary mt-4",children:"Download Code"})]})}$t.layout=e=>R.jsx(Ne,{children:e,props:e.props.company});export{$t as default};
