var $=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},k={exports:{}};(function(y){(function(X,x,c){function v(n){var e=this,i=u();e.next=function(){var t=2091639*e.s0+e.c*23283064365386963e-26;return e.s0=e.s1,e.s1=e.s2,e.s2=t-(e.c=t|0)},e.c=1,e.s0=i(" "),e.s1=i(" "),e.s2=i(" "),e.s0-=i(n),e.s0<0&&(e.s0+=1),e.s1-=i(n),e.s1<0&&(e.s1+=1),e.s2-=i(n),e.s2<0&&(e.s2+=1),i=null}function p(n,e){return e.c=n.c,e.s0=n.s0,e.s1=n.s1,e.s2=n.s2,e}function l(n,e){var i=new v(n),t=e&&e.state,r=i.next;return r.int32=function(){return i.next()*4294967296|0},r.double=function(){return r()+(r()*2097152|0)*11102230246251565e-32},r.quick=r,t&&(typeof t=="object"&&p(t,i),r.state=function(){return p(i,{})}),r}function u(){var n=4022871197,e=function(i){i=String(i);for(var t=0;t<i.length;t++){n+=i.charCodeAt(t);var r=.02519603282416938*n;n=r>>>0,r-=n,r*=n,n=r>>>0,r-=n,n+=r*4294967296}return(n>>>0)*23283064365386963e-26};return e}x&&x.exports?x.exports=l:c&&c.amd?c(function(){return l}):this.alea=l})($,y,!1)})(k);var B={exports:{}};(function(y){(function(X,x,c){function v(u){var n=this,e="";n.x=0,n.y=0,n.z=0,n.w=0,n.next=function(){var t=n.x^n.x<<11;return n.x=n.y,n.y=n.z,n.z=n.w,n.w^=n.w>>>19^t^t>>>8},u===(u|0)?n.x=u:e+=u;for(var i=0;i<e.length+64;i++)n.x^=e.charCodeAt(i)|0,n.next()}function p(u,n){return n.x=u.x,n.y=u.y,n.z=u.z,n.w=u.w,n}function l(u,n){var e=new v(u),i=n&&n.state,t=function(){return(e.next()>>>0)/4294967296};return t.double=function(){do var r=e.next()>>>11,o=(e.next()>>>0)/4294967296,f=(r+o)/(1<<21);while(f===0);return f},t.int32=e.next,t.quick=t,i&&(typeof i=="object"&&p(i,e),t.state=function(){return p(e,{})}),t}x&&x.exports?x.exports=l:c&&c.amd?c(function(){return l}):this.xor128=l})($,y,!1)})(B);var U={exports:{}};(function(y){(function(X,x,c){function v(u){var n=this,e="";n.next=function(){var t=n.x^n.x>>>2;return n.x=n.y,n.y=n.z,n.z=n.w,n.w=n.v,(n.d=n.d+362437|0)+(n.v=n.v^n.v<<4^(t^t<<1))|0},n.x=0,n.y=0,n.z=0,n.w=0,n.v=0,u===(u|0)?n.x=u:e+=u;for(var i=0;i<e.length+64;i++)n.x^=e.charCodeAt(i)|0,i==e.length&&(n.d=n.x<<10^n.x>>>4),n.next()}function p(u,n){return n.x=u.x,n.y=u.y,n.z=u.z,n.w=u.w,n.v=u.v,n.d=u.d,n}function l(u,n){var e=new v(u),i=n&&n.state,t=function(){return(e.next()>>>0)/4294967296};return t.double=function(){do var r=e.next()>>>11,o=(e.next()>>>0)/4294967296,f=(r+o)/(1<<21);while(f===0);return f},t.int32=e.next,t.quick=t,i&&(typeof i=="object"&&p(i,e),t.state=function(){return p(e,{})}),t}x&&x.exports?x.exports=l:c&&c.amd?c(function(){return l}):this.xorwow=l})($,y,!1)})(U);var V={exports:{}};(function(y){(function(X,x,c){function v(u){var n=this;n.next=function(){var i=n.x,t=n.i,r,o;return r=i[t],r^=r>>>7,o=r^r<<24,r=i[t+1&7],o^=r^r>>>10,r=i[t+3&7],o^=r^r>>>3,r=i[t+4&7],o^=r^r<<7,r=i[t+7&7],r=r^r<<13,o^=r^r<<9,i[t]=o,n.i=t+1&7,o};function e(i,t){var r,o=[];if(t===(t|0))o[0]=t;else for(t=""+t,r=0;r<t.length;++r)o[r&7]=o[r&7]<<15^t.charCodeAt(r)+o[r+1&7]<<13;for(;o.length<8;)o.push(0);for(r=0;r<8&&o[r]===0;++r);for(r==8&&(o[7]=-1),i.x=o,i.i=0,r=256;r>0;--r)i.next()}e(n,u)}function p(u,n){return n.x=u.x.slice(),n.i=u.i,n}function l(u,n){u==null&&(u=+new Date);var e=new v(u),i=n&&n.state,t=function(){return(e.next()>>>0)/4294967296};return t.double=function(){do var r=e.next()>>>11,o=(e.next()>>>0)/4294967296,f=(r+o)/(1<<21);while(f===0);return f},t.int32=e.next,t.quick=t,i&&(i.x&&p(i,e),t.state=function(){return p(e,{})}),t}x&&x.exports?x.exports=l:c&&c.amd?c(function(){return l}):this.xorshift7=l})($,y,!1)})(V);var E={exports:{}};(function(y){(function(X,x,c){function v(u){var n=this;n.next=function(){var i=n.w,t=n.X,r=n.i,o,f;return n.w=i=i+1640531527|0,f=t[r+34&127],o=t[r=r+1&127],f^=f<<13,o^=o<<17,f^=f>>>15,o^=o>>>12,f=t[r]=f^o,n.i=r,f+(i^i>>>16)|0};function e(i,t){var r,o,f,b,q,C=[],M=128;for(t===(t|0)?(o=t,t=null):(t=t+"\0",o=0,M=Math.max(M,t.length)),f=0,b=-32;b<M;++b)t&&(o^=t.charCodeAt((b+32)%t.length)),b===0&&(q=o),o^=o<<10,o^=o>>>15,o^=o<<4,o^=o>>>13,b>=0&&(q=q+1640531527|0,r=C[b&127]^=o+q,f=r==0?f+1:0);for(f>=128&&(C[(t&&t.length||0)&127]=-1),f=127,b=4*128;b>0;--b)o=C[f+34&127],r=C[f=f+1&127],o^=o<<13,r^=r<<17,o^=o>>>15,r^=r>>>12,C[f]=o^r;i.w=q,i.X=C,i.i=f}e(n,u)}function p(u,n){return n.i=u.i,n.w=u.w,n.X=u.X.slice(),n}function l(u,n){u==null&&(u=+new Date);var e=new v(u),i=n&&n.state,t=function(){return(e.next()>>>0)/4294967296};return t.double=function(){do var r=e.next()>>>11,o=(e.next()>>>0)/4294967296,f=(r+o)/(1<<21);while(f===0);return f},t.int32=e.next,t.quick=t,i&&(i.X&&p(i,e),t.state=function(){return p(e,{})}),t}x&&x.exports?x.exports=l:c&&c.amd?c(function(){return l}):this.xor4096=l})($,y,!1)})(E);var F={exports:{}};(function(y){(function(X,x,c){function v(u){var n=this,e="";n.next=function(){var t=n.b,r=n.c,o=n.d,f=n.a;return t=t<<25^t>>>7^r,r=r-o|0,o=o<<24^o>>>8^f,f=f-t|0,n.b=t=t<<20^t>>>12^r,n.c=r=r-o|0,n.d=o<<16^r>>>16^f,n.a=f-t|0},n.a=0,n.b=0,n.c=-1640531527,n.d=1367130551,u===Math.floor(u)?(n.a=u/4294967296|0,n.b=u|0):e+=u;for(var i=0;i<e.length+20;i++)n.b^=e.charCodeAt(i)|0,n.next()}function p(u,n){return n.a=u.a,n.b=u.b,n.c=u.c,n.d=u.d,n}function l(u,n){var e=new v(u),i=n&&n.state,t=function(){return(e.next()>>>0)/4294967296};return t.double=function(){do var r=e.next()>>>11,o=(e.next()>>>0)/4294967296,f=(r+o)/(1<<21);while(f===0);return f},t.int32=e.next,t.quick=t,i&&(typeof i=="object"&&p(i,e),t.state=function(){return p(e,{})}),t}x&&x.exports?x.exports=l:c&&c.amd?c(function(){return l}):this.tychei=l})($,y,!1)})(F);var H={exports:{}};(function(y){(function(X,x,c){var v=256,p=6,l=52,u="random",n=c.pow(v,p),e=c.pow(2,l),i=e*2,t=v-1,r;function o(a,s,g){var w=[];s=s==!0?{entropy:!0}:s||{};var h=C(q(s.entropy?[a,D(x)]:a==null?M():a,3),w),d=new f(w),j=function(){for(var m=d.g(p),A=n,z=0;m<e;)m=(m+z)*v,A*=v,z=d.g(1);for(;m>=i;)m/=2,A/=2,z>>>=1;return(m+z)/A};return j.int32=function(){return d.g(4)|0},j.quick=function(){return d.g(4)/4294967296},j.double=j,C(D(d.S),x),(s.pass||g||function(m,A,z,S){return S&&(S.S&&b(S,d),m.state=function(){return b(d,{})}),z?(c[u]=m,A):m})(j,h,"global"in s?s.global:this==c,s.state)}function f(a){var s,g=a.length,w=this,h=0,d=w.i=w.j=0,j=w.S=[];for(g||(a=[g++]);h<v;)j[h]=h++;for(h=0;h<v;h++)j[h]=j[d=t&d+a[h%g]+(s=j[h])],j[d]=s;(w.g=function(m){for(var A,z=0,S=w.i,T=w.j,R=w.S;m--;)A=R[S=t&S+1],z=z*v+R[t&(R[S]=R[T=t&T+A])+(R[T]=A)];return w.i=S,w.j=T,z})(v)}function b(a,s){return s.i=a.i,s.j=a.j,s.S=a.S.slice(),s}function q(a,s){var g=[],w=typeof a,h;if(s&&w=="object")for(h in a)try{g.push(q(a[h],s-1))}catch{}return g.length?g:w=="string"?a:a+"\0"}function C(a,s){for(var g=a+"",w,h=0;h<g.length;)s[t&h]=t&(w^=s[t&h]*19)+g.charCodeAt(h++);return D(s)}function M(){try{var a;return r&&(a=r.randomBytes)?a=a(v):(a=new Uint8Array(v),(X.crypto||X.msCrypto).getRandomValues(a)),D(a)}catch{var s=X.navigator,g=s&&s.plugins;return[+new Date,X,g,X.screen,D(x)]}}function D(a){return String.fromCharCode.apply(0,a)}if(C(c.random(),x),y.exports){y.exports=o;try{r=require("crypto")}catch{}}else c["seed"+u]=o})(typeof self!="undefined"?self:$,[],Math)})(H);var I=k.exports,J=B.exports,K=U.exports,L=V.exports,N=E.exports,O=F.exports,G=H.exports;G.alea=I;G.xor128=J;G.xorwow=K;G.xorshift7=L;G.xor4096=N;G.tychei=O;var P=G;function Q(y){return P(y)}export{Q as c};