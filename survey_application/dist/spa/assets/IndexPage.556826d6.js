import{c as m,h as g}from"./render.fd0f3a19.js";import{d as r,e as t,c as i,h,f,B as y,g as v,E as C,r as l,F as _,G as x,I as F,J as P,K as Q}from"./index.68f8a785.js";var $=m({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(a,{slots:s}){const{proxy:{$q:n}}=v(),e=r(f,t);if(e===t)return console.error("QPage needs to be a deep child of QLayout"),t;if(r(y,t)===t)return console.error("QPage needs to be child of QPageContainer"),t;const c=i(()=>{const o=(e.header.space===!0?e.header.size:0)+(e.footer.space===!0?e.footer.size:0);if(typeof a.styleFn=="function"){const d=e.isContainer.value===!0?e.containerHeight.value:n.screen.height;return a.styleFn(o,d)}return{minHeight:e.isContainer.value===!0?e.containerHeight.value-o+"px":n.screen.height===0?o!==0?`calc(100vh - ${o}px)`:"100vh":n.screen.height-o+"px"}}),p=i(()=>`q-page${a.padding===!0?" q-layout-padding":""}`);return()=>h("main",{class:p.value,style:c.value},g(s.default))}});const H=C({__name:"IndexPage",setup(a){const s=l([{id:1,content:"ct1"},{id:2,content:"ct2"},{id:3,content:"ct3"},{id:4,content:"ct4"},{id:5,content:"ct5"}]),n=l({totalCount:1200});return(e,u)=>{const c=_("example-component");return x(),F($,{class:"row items-center justify-evenly"},{default:P(()=>[Q(c,{title:"Example component",active:"",todos:s.value,meta:n.value},null,8,["todos","meta"])]),_:1})}}});export{H as default};