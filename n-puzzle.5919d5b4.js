var H=Object.defineProperty,P=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var U=Object.getOwnPropertySymbols;var J=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var A=(e,n,t)=>n in e?H(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,x=(e,n)=>{for(var t in n||(n={}))J.call(n,t)&&A(e,t,n[t]);if(U)for(var t of U(n))K.call(n,t)&&A(e,t,n[t]);return e},h=(e,n)=>P(e,W(n));import{k as y,u as l,j as O,d as N,B as Q,e as B,C as X,D as R,o as b,c as k,a as s,E as Y,n as V,q as T,t as _,G as Z,F as G,r as F,g as ee,H as te,I as ne,m as se,f as oe,J as ie,s as le,h as ae,K as re,x as I,p as z,v as q,y as L,z as S,b as D,L as ue}from"./assets/index.c496a576.js";import{c as ce}from"./utils.0eff9dc5.js";const C=y(!0),w=y(!1);function de(e,n){return{x:e%n,y:Math.floor(e/n)}}function pe(e,n,t){let o=0;return e.filter(c=>c>0).forEach((c,u)=>{let r=u+1;for(;r<e.length;){const a=e[r];c>a&&o++,r++}}),n%2?o%2===0:o%2===t%2}function E(e,n){const{columns:t,rows:o,gaps:c}=e,u=ce(e.seed),r=[],a=[];let g=0;const m=Array.from({length:t*o}).map((d,p)=>{const v=de(p,t),i={sequence:p+1,origin:v,position:v,columns:t,gaps:c};return a.push(v),i}).map(d=>{const p=a.splice(Math.floor(u()*a.length),1)[0];return d.position=p,p.x===n.x&&p.y===n.y&&(d.invisible=!0,d.sequence=0,g=d.origin.y+p.y),r[p.y*t+p.x]=d.sequence,d});return pe(r.filter(d=>d>0),t,g)?(w.value=!1,m):E(e,n)}function fe(e,n){return[h(x({},e),{x:e.x+1}),h(x({},e),{x:e.x-1}),h(x({},e),{y:e.y+1}),h(x({},e),{y:e.y-1})].some(o=>o.x===n.x&&o.y===n.y)}function ge(e,n,t){return l(e).board.map(o=>o.position.x===n.x&&o.position.y===n.y?h(x({},o),{position:t}):o.position.x===t.x&&o.position.y===t.y?h(x({},o),{position:n}):o)}function ve(e){const{board:n}=l(e);w.value=n.every(t=>t.origin.x===t.position.x&&t.origin.y===t.position.y),w.value&&(e.value.timestamp.end=Date.now())}function me(e){const{rows:n}=l(e);let t={x:0,y:n-1};const o=O("n-puzzle-state",{timestamp:{begin:0,end:0},options:l(e),board:E(l(e),t),steps:0});return{state:o,reset:()=>{const{options:r}=l(o);t={x:0,y:r.rows-1},o.value={timestamp:{begin:0,end:0},options:r,board:E(r,t),steps:0}},move:r=>{const{begin:a}=l(o).timestamp;!fe(t,r)||(a||(o.value.timestamp.begin=Date.now()),o.value.board=ge(o,t,r),t=r,o.value.steps++,ve(o))}}}const xe={flex:"","justify-center":"","items-center":"",class:"w-$self-width h-$self-height"},he=N({props:{sequence:null,origin:{default:()=>({x:0,y:0})},position:{default:()=>({x:0,y:0})},columns:{default:0},gaps:{default:0},invisible:{type:Boolean,default:!1},reversed:{type:Boolean}},setup(e){const n=e,t=Q(),o=y(null),c=y({width:0,height:0}),u=B(()=>n.origin.x===n.position.x&&n.origin.y===n.position.y),r=B(()=>{const{origin:g,position:m,columns:d,gaps:p,reversed:v=!1}=n,{width:i,height:$}=l(c),M={x:(v?g:m).x-g.x,y:(v?g:m).y-g.y},f={x:M.x*(i+p),y:M.y*($+p)},j={x:-1*g.x*i+g.x*p,y:-1*g.y*$+g.y*p,width:d*i+(d-1)*p};return`
  --self-width: ${i}px;
  --self-height: ${$}px;
  --self-x: ${f.x}px;
  --self-y: ${f.y}px;
  --inner-width:${j.width}px;
  --inner-x:${j.x}px;
  --inner-y:${j.y}px;
  `});function a(){c.value={width:o.value.offsetWidth,height:o.value.offsetHeight}}return X(a),R([C,w],()=>a()),(g,m)=>(b(),k("div",{ref_key:"el",ref:o,relative:"",flex:"","justify-center":"","items-center":"","overflow-hidden":"",bg:"gray-500/10",class:V(["group translate-x-$self-x translate-y-$self-y hover:cursor-pointer",{"transition duration-150":!e.invisible,invisible:!l(w)&&e.invisible,"-z-1 pointer-events-none":l(w)||e.reversed||e.invisible}]),style:T(l(r))},[s("div",{absolute:"","top-0":"","left-0":"","pointer-events-none":"",transition:"","duration-100":"",class:V({"group-hover:bg-gray-500/10":!l(t).default,"group-hover:opacity-50 w-$inner-width translate-x-$inner-x translate-y-$inner-y":l(t).default,"opacity-50":e.reversed||!l(u)})},[Y(g.$slots,"default",{},()=>[s("div",xe,_(e.sequence),1)])],2)],6))}}),ye={"inline-block":""},be={flex:"~ gap-$cell-gap wrap",w:"$puzzle-width",text:"4xl dark/20 dark:white/20",bg:"gray-500/10",rounded:"","overflow-hidden":""},we=["src"],ke=["src"],_e=N({props:{state:null,src:{default:""},size:{default:100},reversed:{type:Boolean}},emits:["click"],setup(e,{emit:n}){const t=e,o=y(null),c=y(t.size),u=y({width:t.size,height:t.size,gaps:t.state.options.gaps}),r=B(()=>{const{width:m,height:d,gaps:p}=l(u),{columns:v}=t.state.options;return`
    --fetch-width: ${c.value}px;
    --puzzle-width: ${m*v+(v-1)*p}px;
    --cell-width: ${m}px;
    --cell-height: ${d}px;
    --cell-gap: ${w.value?0:p}px;
  `});function a(){const{columns:m,gaps:d}=t.state.options;c.value=le.md.value?t.size:Math.floor((o.value.offsetWidth-(m-1)*d)/m)}function g(m){const{width:d,height:p}=m.target;u.value=h(x({},l(u)),{width:d,height:p}),ie(()=>{C.value=!1})}return R(()=>t.src,()=>{a(),C.value=!0}),Z(o,a),(m,d)=>{const p=he;return b(),k("div",{relative:"","p-6":"",style:T(l(r))},[s("div",{ref_key:"el",ref:o,"text-center":"","overflow-auto":"","select-none":""},[s("div",ye,[s("div",be,[(b(!0),k(G,null,F(e.state.board,(v,i)=>(b(),ee(p,se({key:i},v,{reversed:e.reversed,w:"$cell-width",h:"$cell-height",onClick:$=>n("click",v.position)}),te({_:2},[!l(C)&&e.src?{name:"default",fn:ne(()=>[s("img",{"w-full":"","object-cover":"",src:e.src},null,8,we)])}:void 0]),1040,["reversed","onClick"]))),128))]),l(C)&&e.src?(b(),k("img",{key:0,z:"-9999",fixed:"",invisible:"","h-auto":"",src:e.src,class:"w-$fetch-width",onLoad:g},null,40,ke)):oe("",!0)])],512)],4)}}}),$e={text:"2xl black/75 dark:white/75",flex:"~ gap-4","justify-center":"","items-center":""},ze={flex:"~ gap-1","justify-center":"","items-center":""},Ce=s("i",{"i-mdi-clock-time-twelve-outline":""},null,-1),je={"text-lg":"","self-end":""},Me={flex:"~ gap-1","justify-center":"","items-center":""},Be=s("i",{"i-ic-baseline-directions-run":""},null,-1),Le=N({props:{begin:null,end:null,steps:null},setup(e){const n=e,t=ae(),o=B(()=>{const{begin:c,end:u}=n;let r=0;return c&&u&&(r=u-c),c&&!u&&(r=+t.value-c),(r/1e3).toFixed(2).split(".")});return(c,u)=>(b(),k("div",$e,[s("div",ze,[Ce,s("div",null,[s("span",null,_(l(o)[0]),1),s("span",je,"."+_(l(o)[1]),1)])]),s("div",Me,[Be,s("div",null,_(e.steps),1)])]))}}),Ne={"pb-4":""},Se=s("h2",{text:"5xl center ellipsis",leading:"2em","overflow-hidden":""}," N-Puzzle ",-1),Ve={"py-4":"",flex:"~ wrap gap-2","justify-center":""},Ee={sticky:"","bottom-20px":"","z-2":"","px-4":"",flex:"~ gap-2","justify-center":"","items-end":""},Ue={fixed:"","top-0":"","left-0":"","z-20":"","w-full":"","h-full":"",bg:"black/50 dark:black/90",flex:"~","justify-center":"","items-center":"","select-none":""},Ae={"flex-grow":"","max-w-screen-sm":"","mx-4":"","p-4":"",rounded:"",bg:"white/90 dark:white/10"},Ie=s("div",{"text-2xl":"",leading:"3em"}," Customize Settings ",-1),qe={flex:"~ gap-1 col"},De={flex:"~ gap-1 col"},Re={flex:"~ gap-1 col"},Te=L(" Image "),Ge={"py-4":"","text-center":""},Fe={"inline-flex":"",flex:"wrap gap-2"},He=["value"],Pe=["src"],We={flex:"~ gap-1 col"},Je=L(" Or image url "),Ke={"py-8":"",flex:"~ gap-4","justify-center":""},Oe=N({setup(e){const n={easy:{columns:3,rows:3},medium:{columns:4,rows:4},hard:{columns:5,rows:5}},t=["https://cdn.discordapp.com/attachments/757420273350868993/957120284085866516/LINE_ALBUM_300_220309_111.jpg","https://cdn.discordapp.com/attachments/757420273350868993/957120284434006086/LINE_ALBUM_300_220309_132.jpg","https://cdn.discordapp.com/attachments/757420273350868993/957120284706603008/LINE_ALBUM_300_220309_197.jpg","https://cdn.discordapp.com/attachments/757420273350868993/957120284996018266/LINE_ALBUM_300_220309_286.jpg"],o=()=>t[Math.floor(Math.random()*t.length)],c=me(h(x({},n.easy),{gaps:1,background:o()})),{state:u}=c,r=y(!1),a=y(h(x({},l(u).options),{background:"",url:""})),g=y(!1),m=re(g);function d(v){let i={};switch(v){case"easy":case"medium":case"hard":i=h(x(x({},l(u).options),n[v]),{background:o()});break;case"customize":i=h(x({},l(u).options),{columns:a.value.columns,rows:a.value.rows,background:a.value.url||a.value.background});break;default:i=v}C.value=!0,r.value=!1,u.value.options=i,c.reset()}function p(){a.value=h(x({background:""},l(u).options),{url:""}),r.value=!0}return(v,i)=>{const $=Le,M=_e;return b(),k("div",Ne,[Se,s("div",Ve,[s("button",{btn:"~ sky",onClick:i[0]||(i[0]=(...f)=>l(c).reset&&l(c).reset(...f))}," New Game "),s("button",{btn:"",onClick:i[1]||(i[1]=f=>d("easy"))}," Easy "),s("button",{btn:"",onClick:i[2]||(i[2]=f=>d("medium"))}," Medium "),s("button",{btn:"",onClick:i[3]||(i[3]=f=>d("hard"))}," Hard "),s("button",{btn:"",onClick:p}," Customize ")]),I($,{begin:l(u).timestamp.begin,end:l(u).timestamp.end,steps:l(u).steps},null,8,["begin","end","steps"]),I(M,{state:l(u),size:150,src:l(u).options.background,reversed:g.value,onClick:l(c).move},null,8,["state","src","reversed","onClick"]),s("div",Ee,[z(s("button",{btn:"~ solid-yellow",onClick:i[4]||(i[4]=()=>l(m)())},_(g.value?"Continue":"Check Answer"),513),[[q,!l(w)]])]),z(s("div",Ue,[s("div",Ae,[Ie,s("label",qe,[L(" Columns: "+_(a.value.columns)+" ",1),z(s("input",{"onUpdate:modelValue":i[5]||(i[5]=f=>a.value.columns=f),p:"2",bg:"gray-500/10",text:"red-200",type:"range",min:"2",max:"8"},null,512),[[S,a.value.columns,void 0,{number:!0}]])]),s("label",De,[L(" Rows: "+_(a.value.rows)+" ",1),z(s("input",{"onUpdate:modelValue":i[6]||(i[6]=f=>a.value.rows=f),p:"2",bg:"gray-500/10",text:"red-200",type:"range",min:"2",max:"8"},null,512),[[S,a.value.rows,void 0,{number:!0}]])]),s("div",Re,[Te,s("div",Ge,[s("div",Fe,[(b(),k(G,null,F(t,f=>s("label",{key:f,"p-4":"","cursor-pointer":"",rounded:"",flex:"~","items-center":"",class:V({"bg-gray-500/10":f!==a.value.background,"bg-teal-600/75":f===a.value.background})},[z(s("input",{"onUpdate:modelValue":i[7]||(i[7]=j=>a.value.background=j),hidden:"",type:"radio",value:f},null,8,He),[[ue,a.value.background]]),s("img",{"max-w-100px":"",src:f,alt:"image 1"},null,8,Pe)],2)),64))])])]),s("label",We,[Je,z(s("input",{"onUpdate:modelValue":i[8]||(i[8]=f=>a.value.url=f),type:"text",bg:"gray-500/10","p-2":"","w-full":"","dark:text-white":"",rounded:"","outline-none":""},null,512),[[S,a.value.url]])]),s("div",Ke,[s("button",{btn:"~ sky",onClick:i[9]||(i[9]=f=>d("customize"))}," Confirm "),s("button",{btn:"solid-sky",onClick:i[10]||(i[10]=f=>r.value=!1)}," Cancel ")])])],512),[[q,r.value]])])}}});typeof D=="function"&&D(Oe);export{Oe as default};
