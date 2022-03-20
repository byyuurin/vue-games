var V=Object.defineProperty,z=Object.defineProperties;var H=Object.getOwnPropertyDescriptors;var D=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var F=(t,e,n)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,w=(t,e)=>{for(var n in e||(e={}))L.call(e,n)&&F(t,n,e[n]);if(D)for(var n of D(e))q.call(e,n)&&F(t,n,e[n]);return t},j=(t,e)=>z(t,H(e));import{d as U,e as C,o as g,c as m,F as k,t as p,u as d,i as I,f as G,n as P,g as J,h as K,r as O,j as Q,a as c,k as A,b as N,l as R,m as T,w as W}from"./assets/index.0129481d.js";const X=["disabled"],Y={key:0,"i-mdi-flag":"","text-red-500":""},Z={key:1,"i-mdi-mine":""},ee={key:2},te={key:0,text:"gray-500/50","i-mdi-mine":""},ne={key:1,text:"gray-500/50","i-mdi-flag":"","text-red-500":""},se={key:2,text:"gray-500/50"},ae=U({props:{counts:{default:0},dangered:{type:Boolean},flagged:{type:Boolean},viewed:{type:Boolean},disabled:{type:Boolean}},setup(t){const e=t,n=C(()=>{const i=[],l=["text-transparent","text-indigo-600","text-blue-600","text-teal-600","text-green-600","text-yellow-600","text-amber-600","text-orange-600","text-red-600"];return e.viewed?e.dangered?i.push("bg-red-500/50"):i.push(l[e.counts]):(i.push("bg-gray-500"),e.flagged||i.push("hover:bg-opacity-20 active:bg-opacity-25")),i});return(i,l)=>(g(),m("button",{m:"1px",border:"0.5 gray-400/10","bg-opacity-10":"","inline-block":"","min-w-10":"","min-h-10":"","rounded-sm":"",flex:"","justify-center":"","items-center":"","text-xl":"","font-bold":"","select-none":"","disabled:pointer-events-none":"",disabled:t.disabled,class:P(d(n))},[t.viewed||t.flagged?(g(),m(k,{key:0},[t.flagged?(g(),m("i",Y)):t.dangered?(g(),m("i",Z)):(g(),m("span",ee,p(t.counts),1))],64)):d(I)?(g(),m(k,{key:1},[t.dangered?(g(),m("i",te)):t.flagged?(g(),m("i",ne)):(g(),m("span",se,p(t.counts),1))],64)):G("",!0)],10,X))}});function $(t,e,n){const{x:i,y:l}=e,f=t.value.board[l][i];t.value.board[l][i]=w(w({},f),n)}function B(t,e){const{width:n,height:i}=d(e);return[[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]].map(([f,h])=>({x:t.x+f,y:t.y+h})).filter(({x:f,y:h})=>f>=0&&f<n&&h>=0&&h<i)}function M(t,e,n){e.viewed||(!e.dangered&&!e.flagged&&$(t,e.position,{viewed:!0}),e.counts===0&&B(e.position,n).forEach(i=>{const l=t.value.board[i.y][i.x];M(t,l,n)}))}function S(t){const{width:e,height:n}=d(t);return Array.from({length:n}).map((i,l)=>Array.from({length:e}).map((f,h)=>({position:{x:h,y:l},counts:0})))}function oe(t,e,n){const{width:i,height:l,mines:f,friendly:h=!1}=d(e),x=[],_=()=>x.splice(Math.floor(Math.random()*x.length),1)[0],y=s=>B(n,e).concat(n).filter(({x:r,y:u})=>s.x===r&&s.y===u).length>0,o=s=>{B(s,e).forEach(r=>{const{counts:u}=t.value.board[r.y][r.x];$(t,r,{counts:u+1})})};for(let s=0;s<l;s++)for(let r=0;r<i;r++)h&&y({x:r,y:s})||x.push({x:r,y:s});let a=0;for(;a<f;){const s=_();$(t,s,{dangered:!0}),o(s),a++}}function ie(t){const e=J("minesweeper-state",{timestamp:{begin:0,end:0},status:null,board:S(t)}),n=C(()=>{const{width:o,height:a}=d(t),{timestamp:s}=d(e);let r=o*a,u=0,v=0;return e.value.board.forEach(E=>E.forEach(b=>{if(u+=b.flagged?1:0,b.viewed||b.dangered&&b.flagged)return r--;if(b.dangered)return v++})),{started:s.begin>0,flags:u,dangers:v,unknowns:r,unusedFlags:d(t).mines-u}}),i=o=>d(e).board[o.y][o.x],l=()=>{e.value.board=S(t),n.value.started&&(e.value.status=null,e.value.timestamp={begin:0,end:0})},f=o=>{e.value.status=o,e.value.board.forEach(a=>a.forEach(s=>{s.viewed=s.viewed||s.dangered,s.disabled=!0})),e.value.timestamp.end=Date.now()},h=()=>{const{started:o,dangers:a,unknowns:s}=d(n);if(!!o&&(a===0||a===s))return f("win")};return{state:e,dashboard:n,reset:l,uncover:o=>{n.value.started||(oe(e,t,o),e.value.timestamp.begin=Date.now());const a=i(o);if(!e.value.status&&!a.flagged){if(a.dangered)return f("lose");M(e,a,t),h()}},autoUncover:o=>{const a=i(o);if(e.value.status||!a.viewed)return;const s=B(a.position,t).map(u=>i(u));let r=0;s.forEach(u=>{u.dangered&&!u.flagged&&r++}),r===0&&s.forEach(u=>M(e,u,t)),h()},mark:o=>{const{mines:a}=d(t),s=i(o);e.value.status||s.viewed||n.value.flags>=a&&!s.flagged||($(e,o,{flagged:!s.flagged}),h())}}}const re={"py-8":""},de=c("h2",{text:"5xl center ellipsis","mb-6":"","overflow-hidden":""}," Minesweeper ",-1),le={flex:"~ wrap gap-2","justify-center":""},ue=["disabled"],ce={"text-center":""},fe={"p-6":"","text-2xl":"",flex:"~ gap-4","justify-center":"","items-center":""},ge={flex:"~ gap-1","justify-center":"","items-center":""},he=c("i",{"i-mdi-clock-time-twelve-outline":""},null,-1),me={flex:"~ gap-1","justify-center":"","items-center":""},ve=c("i",{"i-mdi-mine":""},null,-1),be={relative:"","inline-block":"","max-w-full":"","overflow-auto":""},ye={key:0,absolute:"","top-0":"","left-0":"","right-0":"","bottom-0":"",flex:"","justify-center":"","items-center":"",bg:"gray-50/50 dark:dark-50/50"},xe=U({setup(t){const e=C(()=>{const o={easy:{width:8,height:8,mines:10},medium:{width:16,height:16,mines:40},hard:{width:30,height:16,mines:99}};return K.xl.value||(o.hard.width=16,o.hard.height=30),o}),n=O(j(w({},d(e).easy),{friendly:!0})),i=ie(n),{state:l,dashboard:f}=i,h=Q(),x=C(()=>{const{begin:o,end:a}=l.value.timestamp;let s=0;return o&&a&&(s=a-o),o&&!a&&(s=+h.value-o),(s/1e3).toFixed(1)});function _(o){const{counts:a,dangered:s,flagged:r,viewed:u,disabled:v}=o;return{counts:a,dangered:s,flagged:r,viewed:u,disabled:v}}function y(o){const{friendly:a}=d(n.value);switch(o){case"easy":case"medium":case"hard":n.value=j(w({},d(e)[o]),{friendly:a});break;default:n.value=o}i.reset()}return(o,a)=>{const s=ae;return g(),m(k,null,[c("div",re,[de,c("div",le,[c("button",{btn:"~ sky",disabled:!d(f).started,onClick:a[0]||(a[0]=r=>y(n.value))}," New Game ",8,ue),c("button",{btn:"",onClick:a[1]||(a[1]=r=>y("easy"))}," Easy "),c("button",{btn:"",onClick:a[2]||(a[2]=r=>y("medium"))}," Medium "),c("button",{btn:"",onClick:a[3]||(a[3]=r=>y("hard"))}," Hard ")])]),c("div",ce,[c("div",fe,[c("div",ge,[he,c("span",null,p(d(x)),1)]),c("div",me,[ve,c("span",null,p(d(f).unusedFlags),1)])]),c("div",be,[(g(!0),m(k,null,A(d(l).board,(r,u)=>(g(),m("div",{key:u,flex:"~ gap-0","justify-center":""},[(g(!0),m(k,null,A(r,(v,E)=>(g(),R(s,T({key:E},_(v),{onClick:b=>d(i).uncover(v.position),onDblclick:b=>d(i).autoUncover(v.position),onContextmenu:W(b=>d(i).mark(v.position),["prevent"])}),null,16,["onClick","onDblclick","onContextmenu"]))),128))]))),128)),d(l).status?(g(),m("div",ye,[c("span",{text:"8xl shadow","select-none":"",class:P({"text-white/10 dark:text-white/20":d(l).status==="lose","text-orange-400/50 dark:text-orange-400/50":d(l).status==="win"})},p(d(l).status.toUpperCase()),3)])):G("",!0)])])],64)}}});typeof N=="function"&&N(xe);export{xe as default};
