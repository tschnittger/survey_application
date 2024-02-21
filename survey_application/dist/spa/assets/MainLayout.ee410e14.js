import{v as ht,c as Ve,g as pt,a as yt,Q as gt}from"./QBtn.b4750fe5.js";import{c as M,h as Z,a as wt,b as bt,d as _e,e as qt}from"./render.fd0f3a19.js";import{c as m,h as L,r as x,i as Ue,o as U,a as F,n as xe,b as I,g as O,l as P,d as ze,e as _,w as q,f as ae,H as Me,j as $,s as Ie,k as Ct,m as Tt,P as St,p as Lt,q as oe,t as he,u as Oe,v as pe,x as Se,y as ye,z as xt,A as je,B as zt,C as ne,D as Et,E as kt,F as Bt,G as $t,I as Pt,J as Y,K as A,L as Vt,M as _t,N as Mt}from"./index.68f8a785.js";var Ot=M({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:o}){const n=m(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>L("div",{class:n.value},Z(o.default))}}),Ht=M({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:o}){const n=m(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>L("div",{class:n.value,role:"toolbar"},Z(o.default))}});function Dt(){const e=x(!Ue.value);return e.value===!1&&U(()=>{e.value=!0}),e}const Ke=typeof ResizeObserver!="undefined",He=Ke===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var Le=M({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:o}){let n=null,l,t={width:-1,height:-1};function i(c){c===!0||e.debounce===0||e.debounce==="0"?s():n===null&&(n=setTimeout(s,e.debounce))}function s(){if(n!==null&&(clearTimeout(n),n=null),l){const{offsetWidth:c,offsetHeight:d}=l;(c!==t.width||d!==t.height)&&(t={width:c,height:d},o("resize",t))}}const{proxy:f}=O();if(f.trigger=i,Ke===!0){let c;const d=a=>{l=f.$el.parentNode,l?(c=new ResizeObserver(i),c.observe(l),s()):a!==!0&&I(()=>{d(!0)})};return U(()=>{d()}),F(()=>{n!==null&&clearTimeout(n),c!==void 0&&(c.disconnect!==void 0?c.disconnect():l&&c.unobserve(l))}),xe}else{let a=function(){n!==null&&(clearTimeout(n),n=null),d!==void 0&&(d.removeEventListener!==void 0&&d.removeEventListener("resize",i,P.passive),d=void 0)},b=function(){a(),l&&l.contentDocument&&(d=l.contentDocument.defaultView,d.addEventListener("resize",i,P.passive),s())};const c=Dt();let d;return U(()=>{I(()=>{l=f.$el,l&&b()})}),F(a),()=>{if(c.value===!0)return L("object",{style:He.style,tabindex:-1,type:"text/html",data:He.url,"aria-hidden":"true",onLoad:b})}}}}),At=M({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:o,emit:n}){const{proxy:{$q:l}}=O(),t=ze(ae,_);if(t===_)return console.error("QHeader needs to be child of QLayout"),_;const i=x(parseInt(e.heightHint,10)),s=x(!0),f=m(()=>e.reveal===!0||t.view.value.indexOf("H")>-1||l.platform.is.ios&&t.isContainer.value===!0),c=m(()=>{if(e.modelValue!==!0)return 0;if(f.value===!0)return s.value===!0?i.value:0;const u=i.value-t.scroll.value.position;return u>0?u:0}),d=m(()=>e.modelValue!==!0||f.value===!0&&s.value!==!0),a=m(()=>e.modelValue===!0&&d.value===!0&&e.reveal===!0),b=m(()=>"q-header q-layout__section--marginal "+(f.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(d.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),w=m(()=>{const u=t.rows.value.top,C={};return u[0]==="l"&&t.left.space===!0&&(C[l.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),u[2]==="r"&&t.right.space===!0&&(C[l.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),C});function v(u,C){t.update("header",u,C)}function h(u,C){u.value!==C&&(u.value=C)}function z({height:u}){h(i,u),v("size",u)}function T(u){a.value===!0&&h(s,!0),n("focusin",u)}q(()=>e.modelValue,u=>{v("space",u),h(s,!0),t.animate()}),q(c,u=>{v("offset",u)}),q(()=>e.reveal,u=>{u===!1&&h(s,e.modelValue)}),q(s,u=>{t.animate(),n("reveal",u)}),q(t.scroll,u=>{e.reveal===!0&&h(s,u.direction==="up"||u.position<=e.revealOffset||u.position-u.inflectionPoint<100)});const g={};return t.instances.header=g,e.modelValue===!0&&v("size",i.value),v("space",e.modelValue),v("offset",c.value),F(()=>{t.instances.header===g&&(t.instances.header=void 0,v("size",0),v("offset",0),v("space",!1))}),()=>{const u=wt(o.default,[]);return e.elevated===!0&&u.push(L("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),u.push(L(Le,{debounce:0,onResize:z})),L("header",{class:b.value,style:w.value,onFocusin:T},u)}}});const Ge={dark:{type:Boolean,default:null}};function Je(e,o){return m(()=>e.dark===null?o.dark.isActive:e.dark)}var Wt=M({name:"QList",props:{...Ge,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:o}){const n=O(),l=Je(e,n.proxy.$q),t=m(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(l.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>L(e.tag,{class:t.value},Z(o.default))}});function Qt(e,o,n){let l;function t(){l!==void 0&&(Me.remove(l),l=void 0)}return F(()=>{e.value===!0&&t()}),{removeFromHistory:t,addToHistory(){l={condition:()=>n.value===!0,handler:o},Me.add(l)}}}const Rt={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},Ft=["beforeShow","show","beforeHide","hide"];function Nt({showing:e,canShow:o,hideOnRouteChange:n,handleShow:l,handleHide:t,processOnMount:i}){const s=O(),{props:f,emit:c,proxy:d}=s;let a;function b(u){e.value===!0?h(u):w(u)}function w(u){if(f.disable===!0||u!==void 0&&u.qAnchorHandled===!0||o!==void 0&&o(u)!==!0)return;const C=f["onUpdate:modelValue"]!==void 0;C===!0&&(c("update:modelValue",!0),a=u,I(()=>{a===u&&(a=void 0)})),(f.modelValue===null||C===!1)&&v(u)}function v(u){e.value!==!0&&(e.value=!0,c("beforeShow",u),l!==void 0?l(u):c("show",u))}function h(u){if(f.disable===!0)return;const C=f["onUpdate:modelValue"]!==void 0;C===!0&&(c("update:modelValue",!1),a=u,I(()=>{a===u&&(a=void 0)})),(f.modelValue===null||C===!1)&&z(u)}function z(u){e.value!==!1&&(e.value=!1,c("beforeHide",u),t!==void 0?t(u):c("hide",u))}function T(u){f.disable===!0&&u===!0?f["onUpdate:modelValue"]!==void 0&&c("update:modelValue",!1):u===!0!==e.value&&(u===!0?v:z)(a)}q(()=>f.modelValue,T),n!==void 0&&ht(s)===!0&&q(()=>d.$route.fullPath,()=>{n.value===!0&&e.value===!0&&h()}),i===!0&&U(()=>{T(f.modelValue)});const g={show:w,hide:h,toggle:b};return Object.assign(d,g),g}const Xt=[null,document,document.body,document.scrollingElement,document.documentElement];function Yt(e,o){let n=pt(o);if(n===void 0){if(e==null)return window;n=e.closest(".scroll,.scroll-y,.overflow-auto")}return Xt.includes(n)?window:n}function Ze(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function et(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let ie;function ge(){if(ie!==void 0)return ie;const e=document.createElement("p"),o=document.createElement("div");Ve(e,{width:"100%",height:"200px"}),Ve(o,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),o.appendChild(e),document.body.appendChild(o);const n=e.offsetWidth;o.style.overflow="scroll";let l=e.offsetWidth;return n===l&&(l=o.clientWidth),o.remove(),ie=n-l,ie}function Ut(e,o=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:o?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}let G=0,we,be,J,qe=!1,De,Ae,We,R=null;function It(e){jt(e)&&Ie(e)}function jt(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const o=Ct(e),n=e.shiftKey&&!e.deltaX,l=!n&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),t=n||l?e.deltaY:e.deltaX;for(let i=0;i<o.length;i++){const s=o[i];if(Ut(s,l))return l?t<0&&s.scrollTop===0?!0:t>0&&s.scrollTop+s.clientHeight===s.scrollHeight:t<0&&s.scrollLeft===0?!0:t>0&&s.scrollLeft+s.clientWidth===s.scrollWidth}return!0}function Qe(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function le(e){qe!==!0&&(qe=!0,requestAnimationFrame(()=>{qe=!1;const{height:o}=e.target,{clientHeight:n,scrollTop:l}=document.scrollingElement;(J===void 0||o!==window.innerHeight)&&(J=n-o,document.scrollingElement.scrollTop=l),l>J&&(document.scrollingElement.scrollTop-=Math.ceil((l-J)/8))}))}function Re(e){const o=document.body,n=window.visualViewport!==void 0;if(e==="add"){const{overflowY:l,overflowX:t}=window.getComputedStyle(o);we=et(window),be=Ze(window),De=o.style.left,Ae=o.style.top,We=window.location.href,o.style.left=`-${we}px`,o.style.top=`-${be}px`,t!=="hidden"&&(t==="scroll"||o.scrollWidth>window.innerWidth)&&o.classList.add("q-body--force-scrollbar-x"),l!=="hidden"&&(l==="scroll"||o.scrollHeight>window.innerHeight)&&o.classList.add("q-body--force-scrollbar-y"),o.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,$.is.ios===!0&&(n===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",le,P.passiveCapture),window.visualViewport.addEventListener("scroll",le,P.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",Qe,P.passiveCapture))}$.is.desktop===!0&&$.is.mac===!0&&window[`${e}EventListener`]("wheel",It,P.notPassive),e==="remove"&&($.is.ios===!0&&(n===!0?(window.visualViewport.removeEventListener("resize",le,P.passiveCapture),window.visualViewport.removeEventListener("scroll",le,P.passiveCapture)):window.removeEventListener("scroll",Qe,P.passiveCapture)),o.classList.remove("q-body--prevent-scroll"),o.classList.remove("q-body--force-scrollbar-x"),o.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,o.style.left=De,o.style.top=Ae,window.location.href===We&&window.scrollTo(we,be),J=void 0)}function Kt(e){let o="add";if(e===!0){if(G++,R!==null){clearTimeout(R),R=null;return}if(G>1)return}else{if(G===0||(G--,G>0))return;if(o="remove",$.is.ios===!0&&$.is.nativeMobile===!0){R!==null&&clearTimeout(R),R=setTimeout(()=>{Re(o),R=null},100);return}}Re(o)}function Gt(){let e;return{preventBodyScroll(o){o!==e&&(e!==void 0||o===!0)&&(e=o,Kt(o))}}}function Jt(){let e=null;const o=O();function n(){e!==null&&(clearTimeout(e),e=null)}return Tt(n),F(n),{removeTimeout:n,registerTimeout(l,t){n(),yt(o)===!1&&(e=setTimeout(l,t))}}}const Ee={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},Zt=Object.keys(Ee);Ee.all=!0;function Fe(e){const o={};for(const n of Zt)e[n]===!0&&(o[n]=!0);return Object.keys(o).length===0?Ee:(o.horizontal===!0?o.left=o.right=!0:o.left===!0&&o.right===!0&&(o.horizontal=!0),o.vertical===!0?o.up=o.down=!0:o.up===!0&&o.down===!0&&(o.vertical=!0),o.horizontal===!0&&o.vertical===!0&&(o.all=!0),o)}const eo=["INPUT","TEXTAREA"];function Ne(e,o){return o.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof o.handler=="function"&&eo.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(o.uid)===-1)}function to(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),St.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Ce(e,o,n){const l=Se(e);let t,i=l.left-o.event.x,s=l.top-o.event.y,f=Math.abs(i),c=Math.abs(s);const d=o.direction;d.horizontal===!0&&d.vertical!==!0?t=i<0?"left":"right":d.horizontal!==!0&&d.vertical===!0?t=s<0?"up":"down":d.up===!0&&s<0?(t="up",f>c&&(d.left===!0&&i<0?t="left":d.right===!0&&i>0&&(t="right"))):d.down===!0&&s>0?(t="down",f>c&&(d.left===!0&&i<0?t="left":d.right===!0&&i>0&&(t="right"))):d.left===!0&&i<0?(t="left",f<c&&(d.up===!0&&s<0?t="up":d.down===!0&&s>0&&(t="down"))):d.right===!0&&i>0&&(t="right",f<c&&(d.up===!0&&s<0?t="up":d.down===!0&&s>0&&(t="down")));let a=!1;if(t===void 0&&n===!1){if(o.event.isFirst===!0||o.event.lastDir===void 0)return{};t=o.event.lastDir,a=!0,t==="left"||t==="right"?(l.left-=i,f=0,i=0):(l.top-=s,c=0,s=0)}return{synthetic:a,payload:{evt:e,touch:o.event.mouse!==!0,mouse:o.event.mouse===!0,position:l,direction:t,isFirst:o.event.isFirst,isFinal:n===!0,duration:Date.now()-o.event.time,distance:{x:f,y:c},offset:{x:i,y:s},delta:{x:l.left-o.event.lastX,y:l.top-o.event.lastY}}}}let oo=0;var Te=bt({name:"touch-pan",beforeMount(e,{value:o,modifiers:n}){if(n.mouse!==!0&&$.has.touch!==!0)return;function l(i,s){n.mouse===!0&&s===!0?Ie(i):(n.stop===!0&&pe(i),n.prevent===!0&&Oe(i))}const t={uid:"qvtp_"+oo++,handler:o,modifiers:n,direction:Fe(n),noop:xe,mouseStart(i){Ne(i,t)&&Lt(i)&&(oe(t,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),t.start(i,!0))},touchStart(i){if(Ne(i,t)){const s=i.target;oe(t,"temp",[[s,"touchmove","move","notPassiveCapture"],[s,"touchcancel","end","passiveCapture"],[s,"touchend","end","passiveCapture"]]),t.start(i)}},start(i,s){if($.is.firefox===!0&&he(e,!0),t.lastEvt=i,s===!0||n.stop===!0){if(t.direction.all!==!0&&(s!==!0||t.modifiers.mouseAllDir!==!0&&t.modifiers.mousealldir!==!0)){const d=i.type.indexOf("mouse")>-1?new MouseEvent(i.type,i):new TouchEvent(i.type,i);i.defaultPrevented===!0&&Oe(d),i.cancelBubble===!0&&pe(d),Object.assign(d,{qKeyEvent:i.qKeyEvent,qClickOutside:i.qClickOutside,qAnchorHandled:i.qAnchorHandled,qClonedBy:i.qClonedBy===void 0?[t.uid]:i.qClonedBy.concat(t.uid)}),t.initialEvent={target:i.target,event:d}}pe(i)}const{left:f,top:c}=Se(i);t.event={x:f,y:c,time:Date.now(),mouse:s===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:f,lastY:c}},move(i){if(t.event===void 0)return;const s=Se(i),f=s.left-t.event.x,c=s.top-t.event.y;if(f===0&&c===0)return;t.lastEvt=i;const d=t.event.mouse===!0,a=()=>{l(i,d);let v;n.preserveCursor!==!0&&n.preservecursor!==!0&&(v=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),d===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),to(),t.styleCleanup=h=>{if(t.styleCleanup=void 0,v!==void 0&&(document.documentElement.style.cursor=v),document.body.classList.remove("non-selectable"),d===!0){const z=()=>{document.body.classList.remove("no-pointer-events--children")};h!==void 0?setTimeout(()=>{z(),h()},50):z()}else h!==void 0&&h()}};if(t.event.detected===!0){t.event.isFirst!==!0&&l(i,t.event.mouse);const{payload:v,synthetic:h}=Ce(i,t,!1);v!==void 0&&(t.handler(v)===!1?t.end(i):(t.styleCleanup===void 0&&t.event.isFirst===!0&&a(),t.event.lastX=v.position.left,t.event.lastY=v.position.top,t.event.lastDir=h===!0?void 0:v.direction,t.event.isFirst=!1));return}if(t.direction.all===!0||d===!0&&(t.modifiers.mouseAllDir===!0||t.modifiers.mousealldir===!0)){a(),t.event.detected=!0,t.move(i);return}const b=Math.abs(f),w=Math.abs(c);b!==w&&(t.direction.horizontal===!0&&b>w||t.direction.vertical===!0&&b<w||t.direction.up===!0&&b<w&&c<0||t.direction.down===!0&&b<w&&c>0||t.direction.left===!0&&b>w&&f<0||t.direction.right===!0&&b>w&&f>0?(t.event.detected=!0,t.move(i)):t.end(i,!0))},end(i,s){if(t.event!==void 0){if(ye(t,"temp"),$.is.firefox===!0&&he(e,!1),s===!0)t.styleCleanup!==void 0&&t.styleCleanup(),t.event.detected!==!0&&t.initialEvent!==void 0&&t.initialEvent.target.dispatchEvent(t.initialEvent.event);else if(t.event.detected===!0){t.event.isFirst===!0&&t.handler(Ce(i===void 0?t.lastEvt:i,t).payload);const{payload:f}=Ce(i===void 0?t.lastEvt:i,t,!0),c=()=>{t.handler(f)};t.styleCleanup!==void 0?t.styleCleanup(c):c()}t.event=void 0,t.initialEvent=void 0,t.lastEvt=void 0}}};if(e.__qtouchpan=t,n.mouse===!0){const i=n.mouseCapture===!0||n.mousecapture===!0?"Capture":"";oe(t,"main",[[e,"mousedown","mouseStart",`passive${i}`]])}$.has.touch===!0&&oe(t,"main",[[e,"touchstart","touchStart",`passive${n.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,o){const n=e.__qtouchpan;n!==void 0&&(o.oldValue!==o.value&&(typeof value!="function"&&n.end(),n.handler=o.value),n.direction=Fe(o.modifiers))},beforeUnmount(e){const o=e.__qtouchpan;o!==void 0&&(o.event!==void 0&&o.end(),ye(o,"main"),ye(o,"temp"),$.is.firefox===!0&&he(e,!1),o.styleCleanup!==void 0&&o.styleCleanup(),delete e.__qtouchpan)}});function re(e,o,n){return n<=o?o:Math.min(n,Math.max(o,e))}const Xe=150;var no=M({name:"QDrawer",inheritAttrs:!1,props:{...Rt,...Ge,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...Ft,"onLayout","miniState"],setup(e,{slots:o,emit:n,attrs:l}){const t=O(),{proxy:{$q:i}}=t,s=Je(e,i),{preventBodyScroll:f}=Gt(),{registerTimeout:c,removeTimeout:d}=Jt(),a=ze(ae,_);if(a===_)return console.error("QDrawer needs to be child of QLayout"),_;let b,w=null,v;const h=x(e.behavior==="mobile"||e.behavior!=="desktop"&&a.totalWidth.value<=e.breakpoint),z=m(()=>e.mini===!0&&h.value!==!0),T=m(()=>z.value===!0?e.miniWidth:e.width),g=x(e.showIfAbove===!0&&h.value===!1?!0:e.modelValue===!0),u=m(()=>e.persistent!==!0&&(h.value===!0||tt.value===!0));function C(r,p){if(W(),r!==!1&&a.animate(),B(0),h.value===!0){const E=a.instances[ee.value];E!==void 0&&E.belowBreakpoint===!0&&E.hide(!1),H(1),a.isContainer.value!==!0&&f(!0)}else H(0),r!==!1&&fe(!1);c(()=>{r!==!1&&fe(!0),p!==!0&&n("show",r)},Xe)}function y(r,p){j(),r!==!1&&a.animate(),H(0),B(N.value*T.value),ve(),p!==!0?c(()=>{n("hide",r)},Xe):d()}const{show:S,hide:k}=Nt({showing:g,hideOnRouteChange:u,handleShow:C,handleHide:y}),{addToHistory:W,removeFromHistory:j}=Qt(g,k,u),Q={belowBreakpoint:h,hide:k},V=m(()=>e.side==="right"),N=m(()=>(i.lang.rtl===!0?-1:1)*(V.value===!0?1:-1)),ke=x(0),X=x(!1),ue=x(!1),Be=x(T.value*N.value),ee=m(()=>V.value===!0?"left":"right"),se=m(()=>g.value===!0&&h.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:T.value:0),de=m(()=>e.overlay===!0||e.miniToOverlay===!0||a.view.value.indexOf(V.value?"R":"L")>-1||i.platform.is.ios===!0&&a.isContainer.value===!0),K=m(()=>e.overlay===!1&&g.value===!0&&h.value===!1),tt=m(()=>e.overlay===!0&&g.value===!0&&h.value===!1),ot=m(()=>"fullscreen q-drawer__backdrop"+(g.value===!1&&X.value===!1?" hidden":"")),nt=m(()=>({backgroundColor:`rgba(0,0,0,${ke.value*.4})`})),$e=m(()=>V.value===!0?a.rows.value.top[2]==="r":a.rows.value.top[0]==="l"),it=m(()=>V.value===!0?a.rows.value.bottom[2]==="r":a.rows.value.bottom[0]==="l"),lt=m(()=>{const r={};return a.header.space===!0&&$e.value===!1&&(de.value===!0?r.top=`${a.header.offset}px`:a.header.space===!0&&(r.top=`${a.header.size}px`)),a.footer.space===!0&&it.value===!1&&(de.value===!0?r.bottom=`${a.footer.offset}px`:a.footer.space===!0&&(r.bottom=`${a.footer.size}px`)),r}),rt=m(()=>{const r={width:`${T.value}px`,transform:`translateX(${Be.value}px)`};return h.value===!0?r:Object.assign(r,lt.value)}),at=m(()=>"q-drawer__content fit "+(a.isContainer.value!==!0?"scroll":"overflow-auto")),ut=m(()=>`q-drawer q-drawer--${e.side}`+(ue.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(s.value===!0?" q-drawer--dark q-dark":"")+(X.value===!0?" no-transition":g.value===!0?"":" q-layout--prevent-focus")+(h.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${z.value===!0?"mini":"standard"}`+(de.value===!0||K.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+($e.value===!0?" q-drawer--top-padding":""))),st=m(()=>{const r=i.lang.rtl===!0?e.side:ee.value;return[[Te,vt,void 0,{[r]:!0,mouse:!0}]]}),dt=m(()=>{const r=i.lang.rtl===!0?ee.value:e.side;return[[Te,Pe,void 0,{[r]:!0,mouse:!0}]]}),ct=m(()=>{const r=i.lang.rtl===!0?ee.value:e.side;return[[Te,Pe,void 0,{[r]:!0,mouse:!0,mouseAllDir:!0}]]});function ce(){mt(h,e.behavior==="mobile"||e.behavior!=="desktop"&&a.totalWidth.value<=e.breakpoint)}q(h,r=>{r===!0?(b=g.value,g.value===!0&&k(!1)):e.overlay===!1&&e.behavior!=="mobile"&&b!==!1&&(g.value===!0?(B(0),H(0),ve()):S(!1))}),q(()=>e.side,(r,p)=>{a.instances[p]===Q&&(a.instances[p]=void 0,a[p].space=!1,a[p].offset=0),a.instances[r]=Q,a[r].size=T.value,a[r].space=K.value,a[r].offset=se.value}),q(a.totalWidth,()=>{(a.isContainer.value===!0||document.qScrollPrevented!==!0)&&ce()}),q(()=>e.behavior+e.breakpoint,ce),q(a.isContainer,r=>{g.value===!0&&f(r!==!0),r===!0&&ce()}),q(a.scrollbarWidth,()=>{B(g.value===!0?0:void 0)}),q(se,r=>{D("offset",r)}),q(K,r=>{n("onLayout",r),D("space",r)}),q(V,()=>{B()}),q(T,r=>{B(),me(e.miniToOverlay,r)}),q(()=>e.miniToOverlay,r=>{me(r,T.value)}),q(()=>i.lang.rtl,()=>{B()}),q(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(ft(),a.animate())}),q(z,r=>{n("miniState",r)});function B(r){r===void 0?I(()=>{r=g.value===!0?0:T.value,B(N.value*r)}):(a.isContainer.value===!0&&V.value===!0&&(h.value===!0||Math.abs(r)===T.value)&&(r+=N.value*a.scrollbarWidth.value),Be.value=r)}function H(r){ke.value=r}function fe(r){const p=r===!0?"remove":a.isContainer.value!==!0?"add":"";p!==""&&document.body.classList[p]("q-body--drawer-toggle")}function ft(){w!==null&&clearTimeout(w),t.proxy&&t.proxy.$el&&t.proxy.$el.classList.add("q-drawer--mini-animate"),ue.value=!0,w=setTimeout(()=>{w=null,ue.value=!1,t&&t.proxy&&t.proxy.$el&&t.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function vt(r){if(g.value!==!1)return;const p=T.value,E=re(r.distance.x,0,p);if(r.isFinal===!0){E>=Math.min(75,p)===!0?S():(a.animate(),H(0),B(N.value*p)),X.value=!1;return}B((i.lang.rtl===!0?V.value!==!0:V.value)?Math.max(p-E,0):Math.min(0,E-p)),H(re(E/p,0,1)),r.isFirst===!0&&(X.value=!0)}function Pe(r){if(g.value!==!0)return;const p=T.value,E=r.direction===e.side,te=(i.lang.rtl===!0?E!==!0:E)?re(r.distance.x,0,p):0;if(r.isFinal===!0){Math.abs(te)<Math.min(75,p)===!0?(a.animate(),H(1),B(0)):k(),X.value=!1;return}B(N.value*te),H(re(1-te/p,0,1)),r.isFirst===!0&&(X.value=!0)}function ve(){f(!1),fe(!0)}function D(r,p){a.update(e.side,r,p)}function mt(r,p){r.value!==p&&(r.value=p)}function me(r,p){D("size",r===!0?e.miniWidth:p)}return a.instances[e.side]=Q,me(e.miniToOverlay,T.value),D("space",K.value),D("offset",se.value),e.showIfAbove===!0&&e.modelValue!==!0&&g.value===!0&&e["onUpdate:modelValue"]!==void 0&&n("update:modelValue",!0),U(()=>{n("onLayout",K.value),n("miniState",z.value),b=e.showIfAbove===!0;const r=()=>{(g.value===!0?C:y)(!1,!0)};if(a.totalWidth.value!==0){I(r);return}v=q(a.totalWidth,()=>{v(),v=void 0,g.value===!1&&e.showIfAbove===!0&&h.value===!1?S(!1):r()})}),F(()=>{v!==void 0&&v(),w!==null&&(clearTimeout(w),w=null),g.value===!0&&ve(),a.instances[e.side]===Q&&(a.instances[e.side]=void 0,D("size",0),D("offset",0),D("space",!1))}),()=>{const r=[];h.value===!0&&(e.noSwipeOpen===!1&&r.push(xt(L("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),st.value)),r.push(_e("div",{ref:"backdrop",class:ot.value,style:nt.value,"aria-hidden":"true",onClick:k},void 0,"backdrop",e.noSwipeBackdrop!==!0&&g.value===!0,()=>ct.value)));const p=z.value===!0&&o.mini!==void 0,E=[L("div",{...l,key:""+p,class:[at.value,l.class]},p===!0?o.mini():Z(o.default))];return e.elevated===!0&&g.value===!0&&E.push(L("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),r.push(_e("aside",{ref:"content",class:ut.value,style:rt.value},E,"contentclose",e.noSwipeClose!==!0&&h.value===!0,()=>dt.value)),L("div",{class:"q-drawer-container"},r)}}}),io=M({name:"QPageContainer",setup(e,{slots:o}){const{proxy:{$q:n}}=O(),l=ze(ae,_);if(l===_)return console.error("QPageContainer needs to be child of QLayout"),_;je(zt,!0);const t=m(()=>{const i={};return l.header.space===!0&&(i.paddingTop=`${l.header.size}px`),l.right.space===!0&&(i[`padding${n.lang.rtl===!0?"Left":"Right"}`]=`${l.right.size}px`),l.footer.space===!0&&(i.paddingBottom=`${l.footer.size}px`),l.left.space===!0&&(i[`padding${n.lang.rtl===!0?"Right":"Left"}`]=`${l.left.size}px`),i});return()=>L("div",{class:"q-page-container",style:t.value},Z(o.default))}});const{passive:Ye}=P,lo=["both","horizontal","vertical"];var ro=M({name:"QScrollObserver",props:{axis:{type:String,validator:e=>lo.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:o}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let l=null,t,i;q(()=>e.scrollTarget,()=>{c(),f()});function s(){l!==null&&l();const b=Math.max(0,Ze(t)),w=et(t),v={top:b-n.position.top,left:w-n.position.left};if(e.axis==="vertical"&&v.top===0||e.axis==="horizontal"&&v.left===0)return;const h=Math.abs(v.top)>=Math.abs(v.left)?v.top<0?"up":"down":v.left<0?"left":"right";n.position={top:b,left:w},n.directionChanged=n.direction!==h,n.delta=v,n.directionChanged===!0&&(n.direction=h,n.inflectionPoint=n.position),o("scroll",{...n})}function f(){t=Yt(i,e.scrollTarget),t.addEventListener("scroll",d,Ye),d(!0)}function c(){t!==void 0&&(t.removeEventListener("scroll",d,Ye),t=void 0)}function d(b){if(b===!0||e.debounce===0||e.debounce==="0")s();else if(l===null){const[w,v]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];l=()=>{v(w),l=null}}}const{proxy:a}=O();return q(()=>a.$q.lang.rtl,s),U(()=>{i=a.$el.parentNode,f()}),F(()=>{l!==null&&l(),c()}),Object.assign(a,{trigger:d,getPosition:()=>n}),xe}}),ao=M({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:o,emit:n}){const{proxy:{$q:l}}=O(),t=x(null),i=x(l.screen.height),s=x(e.container===!0?0:l.screen.width),f=x({position:0,direction:"down",inflectionPoint:0}),c=x(0),d=x(Ue.value===!0?0:ge()),a=m(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),b=m(()=>e.container===!1?{minHeight:l.screen.height+"px"}:null),w=m(()=>d.value!==0?{[l.lang.rtl===!0?"left":"right"]:`${d.value}px`}:null),v=m(()=>d.value!==0?{[l.lang.rtl===!0?"right":"left"]:0,[l.lang.rtl===!0?"left":"right"]:`-${d.value}px`,width:`calc(100% + ${d.value}px)`}:null);function h(y){if(e.container===!0||document.qScrollPrevented!==!0){const S={position:y.position.top,direction:y.direction,directionChanged:y.directionChanged,inflectionPoint:y.inflectionPoint.top,delta:y.delta.top};f.value=S,e.onScroll!==void 0&&n("scroll",S)}}function z(y){const{height:S,width:k}=y;let W=!1;i.value!==S&&(W=!0,i.value=S,e.onScrollHeight!==void 0&&n("scrollHeight",S),g()),s.value!==k&&(W=!0,s.value=k),W===!0&&e.onResize!==void 0&&n("resize",y)}function T({height:y}){c.value!==y&&(c.value=y,g())}function g(){if(e.container===!0){const y=i.value>c.value?ge():0;d.value!==y&&(d.value=y)}}let u=null;const C={instances:{},view:m(()=>e.view),isContainer:m(()=>e.container),rootRef:t,height:i,containerHeight:c,scrollbarWidth:d,totalWidth:m(()=>s.value+d.value),rows:m(()=>{const y=e.view.toLowerCase().split(" ");return{top:y[0].split(""),middle:y[1].split(""),bottom:y[2].split("")}}),header:ne({size:0,offset:0,space:!1}),right:ne({size:300,offset:0,space:!1}),footer:ne({size:0,offset:0,space:!1}),left:ne({size:300,offset:0,space:!1}),scroll:f,animate(){u!==null?clearTimeout(u):document.body.classList.add("q-body--layout-animate"),u=setTimeout(()=>{u=null,document.body.classList.remove("q-body--layout-animate")},155)},update(y,S,k){C[y][S]=k}};if(je(ae,C),ge()>0){let k=function(){y=null,S.classList.remove("hide-scrollbar")},W=function(){if(y===null){if(S.scrollHeight>l.screen.height)return;S.classList.add("hide-scrollbar")}else clearTimeout(y);y=setTimeout(k,300)},j=function(Q){y!==null&&Q==="remove"&&(clearTimeout(y),k()),window[`${Q}EventListener`]("resize",W)},y=null;const S=document.body;q(()=>e.container!==!0?"add":"remove",j),e.container!==!0&&j("add"),Et(()=>{j("remove")})}return()=>{const y=qt(o.default,[L(ro,{onScroll:h}),L(Le,{onResize:z})]),S=L("div",{class:a.value,style:b.value,ref:e.container===!0?void 0:t,tabindex:-1},y);return e.container===!0?L("div",{class:"q-layout-container overflow-hidden",ref:t},[L(Le,{onResize:T}),L("div",{class:"absolute-full",style:w.value},[L("div",{class:"scroll",style:v.value},[S])])]):S}}});const vo=kt({__name:"MainLayout",setup(e){const o=x(!1);function n(){o.value=!o.value}return(l,t)=>{const i=Bt("router-view");return $t(),Pt(ao,{view:"lHh Lpr lFf"},{default:Y(()=>[A(At,{elevated:""},{default:Y(()=>[A(Ht,null,{default:Y(()=>[A(gt,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:n}),A(Ot,null,{default:Y(()=>[Vt(" Quasar App ")]),_:1}),_t("div",null,"Quasar v"+Mt(l.$q.version),1)]),_:1})]),_:1}),A(no,{modelValue:o.value,"onUpdate:modelValue":t[0]||(t[0]=s=>o.value=s),"show-if-above":"",bordered:""},{default:Y(()=>[A(Wt)]),_:1},8,["modelValue"]),A(io,null,{default:Y(()=>[A(i)]),_:1})]),_:1})}}});export{vo as default};