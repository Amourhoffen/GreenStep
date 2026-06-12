function zf(n,e){for(var t=0;t<e.length;t++){const r=e[t];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in n)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(n,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var qI=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Wf(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var qi={exports:{}},G={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oc;function Gf(){if(Oc)return G;Oc=1;var n=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),i=Symbol.for("react.consumer"),a=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.for("react.activity"),T=Symbol.iterator;function S(w){return w===null||typeof w!="object"?null:(w=T&&w[T]||w["@@iterator"],typeof w=="function"?w:null)}var V={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,b={};function O(w,L,z){this.props=w,this.context=L,this.refs=b,this.updater=z||V}O.prototype.isReactComponent={},O.prototype.setState=function(w,L){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,L,"setState")},O.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function U(){}U.prototype=O.prototype;function B(w,L,z){this.props=w,this.context=L,this.refs=b,this.updater=z||V}var ne=B.prototype=new U;ne.constructor=B,N(ne,O.prototype),ne.isPureReactComponent=!0;var J=Array.isArray;function se(){}var E={H:null,A:null,T:null,S:null},g=Object.prototype.hasOwnProperty;function y(w,L,z){var H=z.ref;return{$$typeof:n,type:w,key:L,ref:H!==void 0?H:null,props:z}}function I(w,L){return y(w.type,L,w.props)}function v(w){return typeof w=="object"&&w!==null&&w.$$typeof===n}function R(w){var L={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(z){return L[z]})}var _=/\/+/g;function pe(w,L){return typeof w=="object"&&w!==null&&w.key!=null?R(""+w.key):L.toString(36)}function Ie(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(se,se):(w.status="pending",w.then(function(L){w.status==="pending"&&(w.status="fulfilled",w.value=L)},function(L){w.status==="pending"&&(w.status="rejected",w.reason=L)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function wt(w,L,z,H,ee){var re=typeof w;(re==="undefined"||re==="boolean")&&(w=null);var oe=!1;if(w===null)oe=!0;else switch(re){case"bigint":case"string":case"number":oe=!0;break;case"object":switch(w.$$typeof){case n:case e:oe=!0;break;case f:return oe=w._init,wt(oe(w._payload),L,z,H,ee)}}if(oe)return ee=ee(w),oe=H===""?"."+pe(w,0):H,J(ee)?(z="",oe!=null&&(z=oe.replace(_,"$&/")+"/"),wt(ee,L,z,"",function(Ii){return Ii})):ee!=null&&(v(ee)&&(ee=I(ee,z+(ee.key==null||w&&w.key===ee.key?"":(""+ee.key).replace(_,"$&/")+"/")+oe)),L.push(ee)),1;oe=0;var Fe=H===""?".":H+":";if(J(w))for(var Re=0;Re<w.length;Re++)H=w[Re],re=Fe+pe(H,Re),oe+=wt(H,L,z,re,ee);else if(Re=S(w),typeof Re=="function")for(w=Re.call(w),Re=0;!(H=w.next()).done;)H=H.value,re=Fe+pe(H,Re++),oe+=wt(H,L,z,re,ee);else if(re==="object"){if(typeof w.then=="function")return wt(Ie(w),L,z,H,ee);throw L=String(w),Error("Objects are not valid as a React child (found: "+(L==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":L)+"). If you meant to render a collection of children, use an array instead.")}return oe}function yn(w,L,z){if(w==null)return w;var H=[],ee=0;return wt(w,H,"","",function(re){return L.call(z,re,ee++)}),H}function En(w){if(w._status===-1){var L=w._result;L=L(),L.then(function(z){(w._status===0||w._status===-1)&&(w._status=1,w._result=z)},function(z){(w._status===0||w._status===-1)&&(w._status=2,w._result=z)}),w._status===-1&&(w._status=0,w._result=L)}if(w._status===1)return w._result.default;throw w._result}var Jt=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var L=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(L))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},vi={map:yn,forEach:function(w,L,z){yn(w,function(){L.apply(this,arguments)},z)},count:function(w){var L=0;return yn(w,function(){L++}),L},toArray:function(w){return yn(w,function(L){return L})||[]},only:function(w){if(!v(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return G.Activity=p,G.Children=vi,G.Component=O,G.Fragment=t,G.Profiler=s,G.PureComponent=B,G.StrictMode=r,G.Suspense=l,G.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=E,G.__COMPILER_RUNTIME={__proto__:null,c:function(w){return E.H.useMemoCache(w)}},G.cache=function(w){return function(){return w.apply(null,arguments)}},G.cacheSignal=function(){return null},G.cloneElement=function(w,L,z){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var H=N({},w.props),ee=w.key;if(L!=null)for(re in L.key!==void 0&&(ee=""+L.key),L)!g.call(L,re)||re==="key"||re==="__self"||re==="__source"||re==="ref"&&L.ref===void 0||(H[re]=L[re]);var re=arguments.length-2;if(re===1)H.children=z;else if(1<re){for(var oe=Array(re),Fe=0;Fe<re;Fe++)oe[Fe]=arguments[Fe+2];H.children=oe}return y(w.type,ee,H)},G.createContext=function(w){return w={$$typeof:a,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:i,_context:w},w},G.createElement=function(w,L,z){var H,ee={},re=null;if(L!=null)for(H in L.key!==void 0&&(re=""+L.key),L)g.call(L,H)&&H!=="key"&&H!=="__self"&&H!=="__source"&&(ee[H]=L[H]);var oe=arguments.length-2;if(oe===1)ee.children=z;else if(1<oe){for(var Fe=Array(oe),Re=0;Re<oe;Re++)Fe[Re]=arguments[Re+2];ee.children=Fe}if(w&&w.defaultProps)for(H in oe=w.defaultProps,oe)ee[H]===void 0&&(ee[H]=oe[H]);return y(w,re,ee)},G.createRef=function(){return{current:null}},G.forwardRef=function(w){return{$$typeof:c,render:w}},G.isValidElement=v,G.lazy=function(w){return{$$typeof:f,_payload:{_status:-1,_result:w},_init:En}},G.memo=function(w,L){return{$$typeof:h,type:w,compare:L===void 0?null:L}},G.startTransition=function(w){var L=E.T,z={};E.T=z;try{var H=w(),ee=E.S;ee!==null&&ee(z,H),typeof H=="object"&&H!==null&&typeof H.then=="function"&&H.then(se,Jt)}catch(re){Jt(re)}finally{L!==null&&z.types!==null&&(L.types=z.types),E.T=L}},G.unstable_useCacheRefresh=function(){return E.H.useCacheRefresh()},G.use=function(w){return E.H.use(w)},G.useActionState=function(w,L,z){return E.H.useActionState(w,L,z)},G.useCallback=function(w,L){return E.H.useCallback(w,L)},G.useContext=function(w){return E.H.useContext(w)},G.useDebugValue=function(){},G.useDeferredValue=function(w,L){return E.H.useDeferredValue(w,L)},G.useEffect=function(w,L){return E.H.useEffect(w,L)},G.useEffectEvent=function(w){return E.H.useEffectEvent(w)},G.useId=function(){return E.H.useId()},G.useImperativeHandle=function(w,L,z){return E.H.useImperativeHandle(w,L,z)},G.useInsertionEffect=function(w,L){return E.H.useInsertionEffect(w,L)},G.useLayoutEffect=function(w,L){return E.H.useLayoutEffect(w,L)},G.useMemo=function(w,L){return E.H.useMemo(w,L)},G.useOptimistic=function(w,L){return E.H.useOptimistic(w,L)},G.useReducer=function(w,L,z){return E.H.useReducer(w,L,z)},G.useRef=function(w){return E.H.useRef(w)},G.useState=function(w){return E.H.useState(w)},G.useSyncExternalStore=function(w,L,z){return E.H.useSyncExternalStore(w,L,z)},G.useTransition=function(){return E.H.useTransition()},G.version="19.2.7",G}var Lc;function vl(){return Lc||(Lc=1,qi.exports=Gf()),qi.exports}var C=vl();const pr=Wf(C),HI=zf({__proto__:null,default:pr},[C]);var Hi={exports:{}},ke={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xc;function Kf(){if(xc)return ke;xc=1;var n=vl();function e(l){var h="https://react.dev/errors/"+l;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var f=2;f<arguments.length;f++)h+="&args[]="+encodeURIComponent(arguments[f])}return"Minified React error #"+l+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function t(){}var r={d:{f:t,r:function(){throw Error(e(522))},D:t,C:t,L:t,m:t,X:t,S:t,M:t},p:0,findDOMNode:null},s=Symbol.for("react.portal");function i(l,h,f){var p=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:s,key:p==null?null:""+p,children:l,containerInfo:h,implementation:f}}var a=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(l,h){if(l==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return ke.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,ke.createPortal=function(l,h){var f=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(e(299));return i(l,h,null,f)},ke.flushSync=function(l){var h=a.T,f=r.p;try{if(a.T=null,r.p=2,l)return l()}finally{a.T=h,r.p=f,r.d.f()}},ke.preconnect=function(l,h){typeof l=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,r.d.C(l,h))},ke.prefetchDNS=function(l){typeof l=="string"&&r.d.D(l)},ke.preinit=function(l,h){if(typeof l=="string"&&h&&typeof h.as=="string"){var f=h.as,p=c(f,h.crossOrigin),T=typeof h.integrity=="string"?h.integrity:void 0,S=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;f==="style"?r.d.S(l,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:p,integrity:T,fetchPriority:S}):f==="script"&&r.d.X(l,{crossOrigin:p,integrity:T,fetchPriority:S,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},ke.preinitModule=function(l,h){if(typeof l=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var f=c(h.as,h.crossOrigin);r.d.M(l,{crossOrigin:f,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&r.d.M(l)},ke.preload=function(l,h){if(typeof l=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var f=h.as,p=c(f,h.crossOrigin);r.d.L(l,f,{crossOrigin:p,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},ke.preloadModule=function(l,h){if(typeof l=="string")if(h){var f=c(h.as,h.crossOrigin);r.d.m(l,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:f,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else r.d.m(l)},ke.requestFormReset=function(l){r.d.r(l)},ke.unstable_batchedUpdates=function(l,h){return l(h)},ke.useFormState=function(l,h,f){return a.H.useFormState(l,h,f)},ke.useFormStatus=function(){return a.H.useHostTransitionStatus()},ke.version="19.2.7",ke}var Mc;function Qf(){if(Mc)return Hi.exports;Mc=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}return n(),Hi.exports=Kf(),Hi.exports}/**
 * react-router v7.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Fc="popstate";function Uc(n){return typeof n=="object"&&n!=null&&"pathname"in n&&"search"in n&&"hash"in n&&"state"in n&&"key"in n}function Jf(n={}){function e(r,s){var h;let i=(h=s.state)==null?void 0:h.masked,{pathname:a,search:c,hash:l}=i||r.location;return oo("",{pathname:a,search:c,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default",i?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function t(r,s){return typeof s=="string"?s:Sr(s)}return Xf(e,t,null,n)}function he(n,e){if(n===!1||n===null||typeof n>"u")throw new Error(e)}function Ze(n,e){if(!n){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Yf(){return Math.random().toString(36).substring(2,10)}function Bc(n,e){return{usr:n.state,key:n.key,idx:e,masked:n.mask?{pathname:n.pathname,search:n.search,hash:n.hash}:void 0}}function oo(n,e,t=null,r,s){return{pathname:typeof n=="string"?n:n.pathname,search:"",hash:"",...typeof e=="string"?Fn(e):e,state:t,key:e&&e.key||r||Yf(),mask:s}}function Sr({pathname:n="/",search:e="",hash:t=""}){return e&&e!=="?"&&(n+=e.charAt(0)==="?"?e:"?"+e),t&&t!=="#"&&(n+=t.charAt(0)==="#"?t:"#"+t),n}function Fn(n){let e={};if(n){let t=n.indexOf("#");t>=0&&(e.hash=n.substring(t),n=n.substring(0,t));let r=n.indexOf("?");r>=0&&(e.search=n.substring(r),n=n.substring(0,r)),n&&(e.pathname=n)}return e}function Xf(n,e,t,r={}){let{window:s=document.defaultView,v5Compat:i=!1}=r,a=s.history,c="POP",l=null,h=f();h==null&&(h=0,a.replaceState({...a.state,idx:h},""));function f(){return(a.state||{idx:null}).idx}function p(){c="POP";let b=f(),O=b==null?null:b-h;h=b,l&&l({action:c,location:N.location,delta:O})}function T(b,O){c="PUSH";let U=Uc(b)?b:oo(N.location,b,O);h=f()+1;let B=Bc(U,h),ne=N.createHref(U.mask||U);try{a.pushState(B,"",ne)}catch(J){if(J instanceof DOMException&&J.name==="DataCloneError")throw J;s.location.assign(ne)}i&&l&&l({action:c,location:N.location,delta:1})}function S(b,O){c="REPLACE";let U=Uc(b)?b:oo(N.location,b,O);h=f();let B=Bc(U,h),ne=N.createHref(U.mask||U);a.replaceState(B,"",ne),i&&l&&l({action:c,location:N.location,delta:0})}function V(b){return Zf(s,b)}let N={get action(){return c},get location(){return n(s,a)},listen(b){if(l)throw new Error("A history only accepts one active listener");return s.addEventListener(Fc,p),l=b,()=>{s.removeEventListener(Fc,p),l=null}},createHref(b){return e(s,b)},createURL:V,encodeLocation(b){let O=V(b);return{pathname:O.pathname,search:O.search,hash:O.hash}},push:T,replace:S,go(b){return a.go(b)}};return N}function Zf(n,e,t=!1){let r="http://localhost";n&&(r=n.location.origin!=="null"?n.location.origin:n.location.href),he(r,"No window.location.(origin|href) available to create URL");let s=typeof e=="string"?e:Sr(e);return s=s.replace(/ $/,"%20"),!t&&s.startsWith("//")&&(s=r+s),new URL(s,r)}function Il(n,e,t="/"){return ep(n,e,t,!1)}function ep(n,e,t,r,s){let i=typeof e=="string"?Fn(e):e,a=gt(i.pathname||"/",t);if(a==null)return null;let c=tp(n),l=null,h=fp(a);for(let f=0;l==null&&f<c.length;++f)l=hp(c[f],h,r);return l}function tp(n){let e=wl(n);return np(e),e}function wl(n,e=[],t=[],r="",s=!1){let i=(a,c,l=s,h)=>{let f={relativePath:h===void 0?a.path||"":h,caseSensitive:a.caseSensitive===!0,childrenIndex:c,route:a};if(f.relativePath.startsWith("/")){if(!f.relativePath.startsWith(r)&&l)return;he(f.relativePath.startsWith(r),`Absolute route path "${f.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),f.relativePath=f.relativePath.slice(r.length)}let p=Qe([r,f.relativePath]),T=t.concat(f);a.children&&a.children.length>0&&(he(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${p}".`),wl(a.children,e,T,p,l)),!(a.path==null&&!a.index)&&e.push({path:p,score:up(p,a.index),routesMeta:T})};return n.forEach((a,c)=>{var l;if(a.path===""||!((l=a.path)!=null&&l.includes("?")))i(a,c);else for(let h of Al(a.path))i(a,c,!0,h)}),e}function Al(n){let e=n.split("/");if(e.length===0)return[];let[t,...r]=e,s=t.endsWith("?"),i=t.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let a=Al(r.join("/")),c=[];return c.push(...a.map(l=>l===""?i:[i,l].join("/"))),s&&c.push(...a),c.map(l=>n.startsWith("/")&&l===""?"/":l)}function np(n){n.sort((e,t)=>e.score!==t.score?t.score-e.score:lp(e.routesMeta.map(r=>r.childrenIndex),t.routesMeta.map(r=>r.childrenIndex)))}var rp=/^:[\w-]+$/,sp=3,ip=2,op=1,ap=10,cp=-2,$c=n=>n==="*";function up(n,e){let t=n.split("/"),r=t.length;return t.some($c)&&(r+=cp),e&&(r+=ip),t.filter(s=>!$c(s)).reduce((s,i)=>s+(rp.test(i)?sp:i===""?op:ap),r)}function lp(n,e){return n.length===e.length&&n.slice(0,-1).every((r,s)=>r===e[s])?n[n.length-1]-e[e.length-1]:0}function hp(n,e,t=!1){let{routesMeta:r}=n,s={},i="/",a=[];for(let c=0;c<r.length;++c){let l=r[c],h=c===r.length-1,f=i==="/"?e:e.slice(i.length)||"/",p=Ds({path:l.relativePath,caseSensitive:l.caseSensitive,end:h},f),T=l.route;if(!p&&h&&t&&!r[r.length-1].route.index&&(p=Ds({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},f)),!p)return null;Object.assign(s,p.params),a.push({params:s,pathname:Qe([i,p.pathname]),pathnameBase:_p(Qe([i,p.pathnameBase])),route:T}),p.pathnameBase!=="/"&&(i=Qe([i,p.pathnameBase]))}return a}function Ds(n,e){typeof n=="string"&&(n={path:n,caseSensitive:!1,end:!0});let[t,r]=dp(n.path,n.caseSensitive,n.end),s=e.match(t);if(!s)return null;let i=s[0],a=i.replace(/(.)\/+$/,"$1"),c=s.slice(1);return{params:r.reduce((h,{paramName:f,isOptional:p},T)=>{if(f==="*"){let V=c[T]||"";a=i.slice(0,i.length-V.length).replace(/(.)\/+$/,"$1")}const S=c[T];return p&&!S?h[f]=void 0:h[f]=(S||"").replace(/%2F/g,"/"),h},{}),pathname:i,pathnameBase:a,pattern:n}}function dp(n,e=!1,t=!0){Ze(n==="*"||!n.endsWith("*")||n.endsWith("/*"),`Route path "${n}" will be treated as if it were "${n.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/,"/*")}".`);let r=[],s="^"+n.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,c,l,h,f)=>{if(r.push({paramName:c,isOptional:l!=null}),l){let p=f.charAt(h+a.length);return p&&p!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return n.endsWith("*")?(r.push({paramName:"*"}),s+=n==="*"||n==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?s+="\\/*$":n!==""&&n!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),r]}function fp(n){try{return n.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Ze(!1,`The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),n}}function gt(n,e){if(e==="/")return n;if(!n.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,r=n.charAt(t);return r&&r!=="/"?null:n.slice(t)||"/"}var pp=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function mp(n,e="/"){let{pathname:t,search:r="",hash:s=""}=typeof n=="string"?Fn(n):n,i;return t?(t=Rl(t),t.startsWith("/")?i=jc(t.substring(1),"/"):i=jc(t,e)):i=e,{pathname:i,search:yp(r),hash:Ep(s)}}function jc(n,e){let t=Vs(e).split("/");return n.split("/").forEach(s=>{s===".."?t.length>1&&t.pop():s!=="."&&t.push(s)}),t.length>1?t.join("/"):"/"}function zi(n,e,t,r){return`Cannot include a '${n}' character in a manually specified \`to.${e}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${t}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function gp(n){return n.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Oo(n){let e=gp(n);return e.map((t,r)=>r===e.length-1?t.pathname:t.pathnameBase)}function ei(n,e,t,r=!1){let s;typeof n=="string"?s=Fn(n):(s={...n},he(!s.pathname||!s.pathname.includes("?"),zi("?","pathname","search",s)),he(!s.pathname||!s.pathname.includes("#"),zi("#","pathname","hash",s)),he(!s.search||!s.search.includes("#"),zi("#","search","hash",s)));let i=n===""||s.pathname==="",a=i?"/":s.pathname,c;if(a==null)c=t;else{let p=e.length-1;if(!r&&a.startsWith("..")){let T=a.split("/");for(;T[0]==="..";)T.shift(),p-=1;s.pathname=T.join("/")}c=p>=0?e[p]:"/"}let l=mp(s,c),h=a&&a!=="/"&&a.endsWith("/"),f=(i||a===".")&&t.endsWith("/");return!l.pathname.endsWith("/")&&(h||f)&&(l.pathname+="/"),l}var Rl=n=>n.replace(/\/\/+/g,"/"),Qe=n=>Rl(n.join("/")),Vs=n=>n.replace(/\/+$/,""),_p=n=>Vs(n).replace(/^\/*/,"/"),yp=n=>!n||n==="?"?"":n.startsWith("?")?n:"?"+n,Ep=n=>!n||n==="#"?"":n.startsWith("#")?n:"#"+n,Tp=class{constructor(n,e,t,r=!1){this.status=n,this.statusText=e||"",this.internal=r,t instanceof Error?(this.data=t.toString(),this.error=t):this.data=t}};function vp(n){return n!=null&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.internal=="boolean"&&"data"in n}function Ip(n){let e=n.map(t=>t.route.path).filter(Boolean);return Qe(e)||"/"}var Sl=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Pl(n,e){let t=n;if(typeof t!="string"||!pp.test(t))return{absoluteURL:void 0,isExternal:!1,to:t};let r=t,s=!1;if(Sl)try{let i=new URL(window.location.href),a=t.startsWith("//")?new URL(i.protocol+t):new URL(t),c=gt(a.pathname,e);a.origin===i.origin&&c!=null?t=c+a.search+a.hash:s=!0}catch{Ze(!1,`<Link to="${t}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:s,to:t}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Cl=["POST","PUT","PATCH","DELETE"];new Set(Cl);var wp=["GET",...Cl];new Set(wp);var Un=C.createContext(null);Un.displayName="DataRouter";var ti=C.createContext(null);ti.displayName="DataRouterState";var bl=C.createContext(!1);function Ap(){return C.useContext(bl)}var kl=C.createContext({isTransitioning:!1});kl.displayName="ViewTransition";var Rp=C.createContext(new Map);Rp.displayName="Fetchers";var Sp=C.createContext(null);Sp.displayName="Await";var je=C.createContext(null);je.displayName="Navigation";var Ur=C.createContext(null);Ur.displayName="Location";var We=C.createContext({outlet:null,matches:[],isDataRoute:!1});We.displayName="Route";var Lo=C.createContext(null);Lo.displayName="RouteError";var Dl="REACT_ROUTER_ERROR",Pp="REDIRECT",Cp="ROUTE_ERROR_RESPONSE";function bp(n){if(n.startsWith(`${Dl}:${Pp}:{`))try{let e=JSON.parse(n.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function kp(n){if(n.startsWith(`${Dl}:${Cp}:{`))try{let e=JSON.parse(n.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new Tp(e.status,e.statusText,e.data)}catch{}}function Dp(n,{relative:e}={}){he(Bn(),"useHref() may be used only in the context of a <Router> component.");let{basename:t,navigator:r}=C.useContext(je),{hash:s,pathname:i,search:a}=Br(n,{relative:e}),c=i;return t!=="/"&&(c=i==="/"?t:Qe([t,i])),r.createHref({pathname:c,search:a,hash:s})}function Bn(){return C.useContext(Ur)!=null}function lt(){return he(Bn(),"useLocation() may be used only in the context of a <Router> component."),C.useContext(Ur).location}var Vl="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Nl(n){C.useContext(je).static||C.useLayoutEffect(n)}function Ol(){let{isDataRoute:n}=C.useContext(We);return n?Wp():Vp()}function Vp(){he(Bn(),"useNavigate() may be used only in the context of a <Router> component.");let n=C.useContext(Un),{basename:e,navigator:t}=C.useContext(je),{matches:r}=C.useContext(We),{pathname:s}=lt(),i=JSON.stringify(Oo(r)),a=C.useRef(!1);return Nl(()=>{a.current=!0}),C.useCallback((l,h={})=>{if(Ze(a.current,Vl),!a.current)return;if(typeof l=="number"){t.go(l);return}let f=ei(l,JSON.parse(i),s,h.relative==="path");n==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:Qe([e,f.pathname])),(h.replace?t.replace:t.push)(f,h.state,h)},[e,t,i,s,n])}var Np=C.createContext(null);function Op(n){let e=C.useContext(We).outlet;return C.useMemo(()=>e&&C.createElement(Np.Provider,{value:n},e),[e,n])}function zI(){let{matches:n}=C.useContext(We),e=n[n.length-1];return(e==null?void 0:e.params)??{}}function Br(n,{relative:e}={}){let{matches:t}=C.useContext(We),{pathname:r}=lt(),s=JSON.stringify(Oo(t));return C.useMemo(()=>ei(n,JSON.parse(s),r,e==="path"),[n,s,r,e])}function Lp(n,e){return Ll(n,e)}function Ll(n,e,t){var b;he(Bn(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=C.useContext(je),{matches:s}=C.useContext(We),i=s[s.length-1],a=i?i.params:{},c=i?i.pathname:"/",l=i?i.pathnameBase:"/",h=i&&i.route;{let O=h&&h.path||"";Ml(c,!h||O.endsWith("*")||O.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${O}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${O}"> to <Route path="${O==="/"?"*":`${O}/*`}">.`)}let f=lt(),p;if(e){let O=typeof e=="string"?Fn(e):e;he(l==="/"||((b=O.pathname)==null?void 0:b.startsWith(l)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${O.pathname}" was given in the \`location\` prop.`),p=O}else p=f;let T=p.pathname||"/",S=T;if(l!=="/"){let O=l.replace(/^\//,"").split("/");S="/"+T.replace(/^\//,"").split("/").slice(O.length).join("/")}let V=t&&t.state.matches.length?t.state.matches.map(O=>Object.assign(O,{route:t.manifest[O.route.id]||O.route})):Il(n,{pathname:S});Ze(h||V!=null,`No routes matched location "${p.pathname}${p.search}${p.hash}" `),Ze(V==null||V[V.length-1].route.element!==void 0||V[V.length-1].route.Component!==void 0||V[V.length-1].route.lazy!==void 0,`Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let N=Bp(V&&V.map(O=>Object.assign({},O,{params:Object.assign({},a,O.params),pathname:Qe([l,r.encodeLocation?r.encodeLocation(O.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:O.pathname]),pathnameBase:O.pathnameBase==="/"?l:Qe([l,r.encodeLocation?r.encodeLocation(O.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:O.pathnameBase])})),s,t);return e&&N?C.createElement(Ur.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...p},navigationType:"POP"}},N):N}function xp(){let n=zp(),e=vp(n)?`${n.status} ${n.statusText}`:n instanceof Error?n.message:JSON.stringify(n),t=n instanceof Error?n.stack:null,r="rgba(200,200,200, 0.5)",s={padding:"0.5rem",backgroundColor:r},i={padding:"2px 4px",backgroundColor:r},a=null;return console.error("Error handled by React Router default ErrorBoundary:",n),a=C.createElement(C.Fragment,null,C.createElement("p",null,"💿 Hey developer 👋"),C.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",C.createElement("code",{style:i},"ErrorBoundary")," or"," ",C.createElement("code",{style:i},"errorElement")," prop on your route.")),C.createElement(C.Fragment,null,C.createElement("h2",null,"Unexpected Application Error!"),C.createElement("h3",{style:{fontStyle:"italic"}},e),t?C.createElement("pre",{style:s},t):null,a)}var Mp=C.createElement(xp,null),xl=class extends C.Component{constructor(n){super(n),this.state={location:n.location,revalidation:n.revalidation,error:n.error}}static getDerivedStateFromError(n){return{error:n}}static getDerivedStateFromProps(n,e){return e.location!==n.location||e.revalidation!=="idle"&&n.revalidation==="idle"?{error:n.error,location:n.location,revalidation:n.revalidation}:{error:n.error!==void 0?n.error:e.error,location:e.location,revalidation:n.revalidation||e.revalidation}}componentDidCatch(n,e){this.props.onError?this.props.onError(n,e):console.error("React Router caught the following error during render",n)}render(){let n=this.state.error;if(this.context&&typeof n=="object"&&n&&"digest"in n&&typeof n.digest=="string"){const t=kp(n.digest);t&&(n=t)}let e=n!==void 0?C.createElement(We.Provider,{value:this.props.routeContext},C.createElement(Lo.Provider,{value:n,children:this.props.component})):this.props.children;return this.context?C.createElement(Fp,{error:n},e):e}};xl.contextType=bl;var Wi=new WeakMap;function Fp({children:n,error:e}){let{basename:t}=C.useContext(je);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let r=bp(e.digest);if(r){let s=Wi.get(e);if(s)throw s;let i=Pl(r.location,t);if(Sl&&!Wi.get(e))if(i.isExternal||r.reloadDocument)window.location.href=i.absoluteURL||i.to;else{const a=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:r.replace}));throw Wi.set(e,a),a}return C.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return n}function Up({routeContext:n,match:e,children:t}){let r=C.useContext(Un);return r&&r.static&&r.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=e.route.id),C.createElement(We.Provider,{value:n},t)}function Bp(n,e=[],t){let r=t==null?void 0:t.state;if(n==null){if(!r)return null;if(r.errors)n=r.matches;else if(e.length===0&&!r.initialized&&r.matches.length>0)n=r.matches;else return null}let s=n,i=r==null?void 0:r.errors;if(i!=null){let f=s.findIndex(p=>p.route.id&&(i==null?void 0:i[p.route.id])!==void 0);he(f>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),s=s.slice(0,Math.min(s.length,f+1))}let a=!1,c=-1;if(t&&r){a=r.renderFallback;for(let f=0;f<s.length;f++){let p=s[f];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(c=f),p.route.id){let{loaderData:T,errors:S}=r,V=p.route.loader&&!T.hasOwnProperty(p.route.id)&&(!S||S[p.route.id]===void 0);if(p.route.lazy||V){t.isStatic&&(a=!0),c>=0?s=s.slice(0,c+1):s=[s[0]];break}}}}let l=t==null?void 0:t.onError,h=r&&l?(f,p)=>{var T,S;l(f,{location:r.location,params:((S=(T=r.matches)==null?void 0:T[0])==null?void 0:S.params)??{},pattern:Ip(r.matches),errorInfo:p})}:void 0;return s.reduceRight((f,p,T)=>{let S,V=!1,N=null,b=null;r&&(S=i&&p.route.id?i[p.route.id]:void 0,N=p.route.errorElement||Mp,a&&(c<0&&T===0?(Ml("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),V=!0,b=null):c===T&&(V=!0,b=p.route.hydrateFallbackElement||null)));let O=e.concat(s.slice(0,T+1)),U=()=>{let B;return S?B=N:V?B=b:p.route.Component?B=C.createElement(p.route.Component,null):p.route.element?B=p.route.element:B=f,C.createElement(Up,{match:p,routeContext:{outlet:f,matches:O,isDataRoute:r!=null},children:B})};return r&&(p.route.ErrorBoundary||p.route.errorElement||T===0)?C.createElement(xl,{location:r.location,revalidation:r.revalidation,component:N,error:S,children:U(),routeContext:{outlet:null,matches:O,isDataRoute:!0},onError:h}):U()},null)}function xo(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function $p(n){let e=C.useContext(Un);return he(e,xo(n)),e}function jp(n){let e=C.useContext(ti);return he(e,xo(n)),e}function qp(n){let e=C.useContext(We);return he(e,xo(n)),e}function Mo(n){let e=qp(n),t=e.matches[e.matches.length-1];return he(t.route.id,`${n} can only be used on routes that contain a unique "id"`),t.route.id}function Hp(){return Mo("useRouteId")}function zp(){var r;let n=C.useContext(Lo),e=jp("useRouteError"),t=Mo("useRouteError");return n!==void 0?n:(r=e.errors)==null?void 0:r[t]}function Wp(){let{router:n}=$p("useNavigate"),e=Mo("useNavigate"),t=C.useRef(!1);return Nl(()=>{t.current=!0}),C.useCallback(async(s,i={})=>{Ze(t.current,Vl),t.current&&(typeof s=="number"?await n.navigate(s):await n.navigate(s,{fromRouteId:e,...i}))},[n,e])}var qc={};function Ml(n,e,t){!e&&!qc[n]&&(qc[n]=!0,Ze(!1,t))}C.memo(Gp);function Gp({routes:n,manifest:e,future:t,state:r,isStatic:s,onError:i}){return Ll(n,void 0,{manifest:e,state:r,isStatic:s,onError:i})}function WI({to:n,replace:e,state:t,relative:r}){he(Bn(),"<Navigate> may be used only in the context of a <Router> component.");let{static:s}=C.useContext(je);Ze(!s,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:i}=C.useContext(We),{pathname:a}=lt(),c=Ol(),l=ei(n,Oo(i),a,r==="path"),h=JSON.stringify(l);return C.useEffect(()=>{c(JSON.parse(h),{replace:e,state:t,relative:r})},[c,h,r,e,t]),null}function GI(n){return Op(n.context)}function Kp(n){he(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Qp({basename:n="/",children:e=null,location:t,navigationType:r="POP",navigator:s,static:i=!1,useTransitions:a}){he(!Bn(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let c=n.replace(/^\/*/,"/"),l=C.useMemo(()=>({basename:c,navigator:s,static:i,useTransitions:a,future:{}}),[c,s,i,a]);typeof t=="string"&&(t=Fn(t));let{pathname:h="/",search:f="",hash:p="",state:T=null,key:S="default",mask:V}=t,N=C.useMemo(()=>{let b=gt(h,c);return b==null?null:{location:{pathname:b,search:f,hash:p,state:T,key:S,mask:V},navigationType:r}},[c,h,f,p,T,S,r,V]);return Ze(N!=null,`<Router basename="${c}"> is not able to match the URL "${h}${f}${p}" because it does not start with the basename, so the <Router> won't render anything.`),N==null?null:C.createElement(je.Provider,{value:l},C.createElement(Ur.Provider,{children:e,value:N}))}function KI({children:n,location:e}){return Lp(ao(n),e)}function ao(n,e=[]){let t=[];return C.Children.forEach(n,(r,s)=>{if(!C.isValidElement(r))return;let i=[...e,s];if(r.type===C.Fragment){t.push.apply(t,ao(r.props.children,i));return}he(r.type===Kp,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),he(!r.props.index||!r.props.children,"An index route cannot have child routes.");let a={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=ao(r.props.children,i)),t.push(a)}),t}var Es="get",Ts="application/x-www-form-urlencoded";function ni(n){return typeof HTMLElement<"u"&&n instanceof HTMLElement}function Jp(n){return ni(n)&&n.tagName.toLowerCase()==="button"}function Yp(n){return ni(n)&&n.tagName.toLowerCase()==="form"}function Xp(n){return ni(n)&&n.tagName.toLowerCase()==="input"}function Zp(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}function em(n,e){return n.button===0&&(!e||e==="_self")&&!Zp(n)}var ds=null;function tm(){if(ds===null)try{new FormData(document.createElement("form"),0),ds=!1}catch{ds=!0}return ds}var nm=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Gi(n){return n!=null&&!nm.has(n)?(Ze(!1,`"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ts}"`),null):n}function rm(n,e){let t,r,s,i,a;if(Yp(n)){let c=n.getAttribute("action");r=c?gt(c,e):null,t=n.getAttribute("method")||Es,s=Gi(n.getAttribute("enctype"))||Ts,i=new FormData(n)}else if(Jp(n)||Xp(n)&&(n.type==="submit"||n.type==="image")){let c=n.form;if(c==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=n.getAttribute("formaction")||c.getAttribute("action");if(r=l?gt(l,e):null,t=n.getAttribute("formmethod")||c.getAttribute("method")||Es,s=Gi(n.getAttribute("formenctype"))||Gi(c.getAttribute("enctype"))||Ts,i=new FormData(c,n),!tm()){let{name:h,type:f,value:p}=n;if(f==="image"){let T=h?`${h}.`:"";i.append(`${T}x`,"0"),i.append(`${T}y`,"0")}else h&&i.append(h,p)}}else{if(ni(n))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');t=Es,r=null,s=Ts,a=n}return i&&s==="text/plain"&&(a=i,i=void 0),{action:r,method:t.toLowerCase(),encType:s,formData:i,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Fo(n,e){if(n===!1||n===null||typeof n>"u")throw new Error(e)}function Fl(n,e,t,r){let s=typeof n=="string"?new URL(n,typeof window>"u"?"server://singlefetch/":window.location.origin):n;return t?s.pathname.endsWith("/")?s.pathname=`${s.pathname}_.${r}`:s.pathname=`${s.pathname}.${r}`:s.pathname==="/"?s.pathname=`_root.${r}`:e&&gt(s.pathname,e)==="/"?s.pathname=`${Vs(e)}/_root.${r}`:s.pathname=`${Vs(s.pathname)}.${r}`,s}async function sm(n,e){if(n.id in e)return e[n.id];try{let t=await import(n.module);return e[n.id]=t,t}catch(t){return console.error(`Error loading route module \`${n.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function im(n){return n==null?!1:n.href==null?n.rel==="preload"&&typeof n.imageSrcSet=="string"&&typeof n.imageSizes=="string":typeof n.rel=="string"&&typeof n.href=="string"}async function om(n,e,t){let r=await Promise.all(n.map(async s=>{let i=e.routes[s.route.id];if(i){let a=await sm(i,t);return a.links?a.links():[]}return[]}));return lm(r.flat(1).filter(im).filter(s=>s.rel==="stylesheet"||s.rel==="preload").map(s=>s.rel==="stylesheet"?{...s,rel:"prefetch",as:"style"}:{...s,rel:"prefetch"}))}function Hc(n,e,t,r,s,i){let a=(l,h)=>t[h]?l.route.id!==t[h].route.id:!0,c=(l,h)=>{var f;return t[h].pathname!==l.pathname||((f=t[h].route.path)==null?void 0:f.endsWith("*"))&&t[h].params["*"]!==l.params["*"]};return i==="assets"?e.filter((l,h)=>a(l,h)||c(l,h)):i==="data"?e.filter((l,h)=>{var p;let f=r.routes[l.route.id];if(!f||!f.hasLoader)return!1;if(a(l,h)||c(l,h))return!0;if(l.route.shouldRevalidate){let T=l.route.shouldRevalidate({currentUrl:new URL(s.pathname+s.search+s.hash,window.origin),currentParams:((p=t[0])==null?void 0:p.params)||{},nextUrl:new URL(n,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof T=="boolean")return T}return!0}):[]}function am(n,e,{includeHydrateFallback:t}={}){return cm(n.map(r=>{let s=e.routes[r.route.id];if(!s)return[];let i=[s.module];return s.clientActionModule&&(i=i.concat(s.clientActionModule)),s.clientLoaderModule&&(i=i.concat(s.clientLoaderModule)),t&&s.hydrateFallbackModule&&(i=i.concat(s.hydrateFallbackModule)),s.imports&&(i=i.concat(s.imports)),i}).flat(1))}function cm(n){return[...new Set(n)]}function um(n){let e={},t=Object.keys(n).sort();for(let r of t)e[r]=n[r];return e}function lm(n,e){let t=new Set;return new Set(e),n.reduce((r,s)=>{let i=JSON.stringify(um(s));return t.has(i)||(t.add(i),r.push({key:i,link:s})),r},[])}function Uo(){let n=C.useContext(Un);return Fo(n,"You must render this element inside a <DataRouterContext.Provider> element"),n}function hm(){let n=C.useContext(ti);return Fo(n,"You must render this element inside a <DataRouterStateContext.Provider> element"),n}var Bo=C.createContext(void 0);Bo.displayName="FrameworkContext";function $o(){let n=C.useContext(Bo);return Fo(n,"You must render this element inside a <HydratedRouter> element"),n}function dm(n,e){let t=C.useContext(Bo),[r,s]=C.useState(!1),[i,a]=C.useState(!1),{onFocus:c,onBlur:l,onMouseEnter:h,onMouseLeave:f,onTouchStart:p}=e,T=C.useRef(null);C.useEffect(()=>{if(n==="render"&&a(!0),n==="viewport"){let N=O=>{O.forEach(U=>{a(U.isIntersecting)})},b=new IntersectionObserver(N,{threshold:.5});return T.current&&b.observe(T.current),()=>{b.disconnect()}}},[n]),C.useEffect(()=>{if(r){let N=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(N)}}},[r]);let S=()=>{s(!0)},V=()=>{s(!1),a(!1)};return t?n!=="intent"?[i,T,{}]:[i,T,{onFocus:hr(c,S),onBlur:hr(l,V),onMouseEnter:hr(h,S),onMouseLeave:hr(f,V),onTouchStart:hr(p,S)}]:[!1,T,{}]}function hr(n,e){return t=>{n&&n(t),t.defaultPrevented||e(t)}}function fm({page:n,...e}){let t=Ap(),{router:r}=Uo(),s=C.useMemo(()=>Il(r.routes,n,r.basename),[r.routes,n,r.basename]);return s?t?C.createElement(mm,{page:n,matches:s,...e}):C.createElement(gm,{page:n,matches:s,...e}):null}function pm(n){let{manifest:e,routeModules:t}=$o(),[r,s]=C.useState([]);return C.useEffect(()=>{let i=!1;return om(n,e,t).then(a=>{i||s(a)}),()=>{i=!0}},[n,e,t]),r}function mm({page:n,matches:e,...t}){let r=lt(),{future:s}=$o(),{basename:i}=Uo(),a=C.useMemo(()=>{if(n===r.pathname+r.search+r.hash)return[];let c=Fl(n,i,s.v8_trailingSlashAwareDataRequests,"rsc"),l=!1,h=[];for(let f of e)typeof f.route.shouldRevalidate=="function"?l=!0:h.push(f.route.id);return l&&h.length>0&&c.searchParams.set("_routes",h.join(",")),[c.pathname+c.search]},[i,s.v8_trailingSlashAwareDataRequests,n,r,e]);return C.createElement(C.Fragment,null,a.map(c=>C.createElement("link",{key:c,rel:"prefetch",as:"fetch",href:c,...t})))}function gm({page:n,matches:e,...t}){let r=lt(),{future:s,manifest:i,routeModules:a}=$o(),{basename:c}=Uo(),{loaderData:l,matches:h}=hm(),f=C.useMemo(()=>Hc(n,e,h,i,r,"data"),[n,e,h,i,r]),p=C.useMemo(()=>Hc(n,e,h,i,r,"assets"),[n,e,h,i,r]),T=C.useMemo(()=>{if(n===r.pathname+r.search+r.hash)return[];let N=new Set,b=!1;if(e.forEach(U=>{var ne;let B=i.routes[U.route.id];!B||!B.hasLoader||(!f.some(J=>J.route.id===U.route.id)&&U.route.id in l&&((ne=a[U.route.id])!=null&&ne.shouldRevalidate)||B.hasClientLoader?b=!0:N.add(U.route.id))}),N.size===0)return[];let O=Fl(n,c,s.v8_trailingSlashAwareDataRequests,"data");return b&&N.size>0&&O.searchParams.set("_routes",e.filter(U=>N.has(U.route.id)).map(U=>U.route.id).join(",")),[O.pathname+O.search]},[c,s.v8_trailingSlashAwareDataRequests,l,r,i,f,e,n,a]),S=C.useMemo(()=>am(p,i),[p,i]),V=pm(p);return C.createElement(C.Fragment,null,T.map(N=>C.createElement("link",{key:N,rel:"prefetch",as:"fetch",href:N,...t})),S.map(N=>C.createElement("link",{key:N,rel:"modulepreload",href:N,...t})),V.map(({key:N,link:b})=>C.createElement("link",{key:N,nonce:t.nonce,...b,crossOrigin:b.crossOrigin??t.crossOrigin})))}function _m(...n){return e=>{n.forEach(t=>{typeof t=="function"?t(e):t!=null&&(t.current=e)})}}var ym=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{ym&&(window.__reactRouterVersion="7.17.0")}catch{}function QI({basename:n,children:e,useTransitions:t,window:r}){let s=C.useRef();s.current==null&&(s.current=Jf({window:r,v5Compat:!0}));let i=s.current,[a,c]=C.useState({action:i.action,location:i.location}),l=C.useCallback(h=>{t===!1?c(h):C.startTransition(()=>c(h))},[t]);return C.useLayoutEffect(()=>i.listen(l),[i,l]),C.createElement(Qp,{basename:n,children:e,location:a.location,navigationType:a.action,navigator:i,useTransitions:t})}var Ul=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Bl=C.forwardRef(function({onClick:e,discover:t="render",prefetch:r="none",relative:s,reloadDocument:i,replace:a,mask:c,state:l,target:h,to:f,preventScrollReset:p,viewTransition:T,defaultShouldRevalidate:S,...V},N){let{basename:b,navigator:O,useTransitions:U}=C.useContext(je),B=typeof f=="string"&&Ul.test(f),ne=Pl(f,b);f=ne.to;let J=Dp(f,{relative:s}),se=lt(),E=null;if(c){let Ie=ei(c,[],se.mask?se.mask.pathname:"/",!0);b!=="/"&&(Ie.pathname=Ie.pathname==="/"?b:Qe([b,Ie.pathname])),E=O.createHref(Ie)}let[g,y,I]=dm(r,V),v=Im(f,{replace:a,mask:c,state:l,target:h,preventScrollReset:p,relative:s,viewTransition:T,defaultShouldRevalidate:S,useTransitions:U});function R(Ie){e&&e(Ie),Ie.defaultPrevented||v(Ie)}let _=!(ne.isExternal||i),pe=C.createElement("a",{...V,...I,href:(_?E:void 0)||ne.absoluteURL||J,onClick:_?R:e,ref:_m(N,y),target:h,"data-discover":!B&&t==="render"?"true":void 0});return g&&!B?C.createElement(C.Fragment,null,pe,C.createElement(fm,{page:J})):pe});Bl.displayName="Link";var Em=C.forwardRef(function({"aria-current":e="page",caseSensitive:t=!1,className:r="",end:s=!1,style:i,to:a,viewTransition:c,children:l,...h},f){let p=Br(a,{relative:h.relative}),T=lt(),S=C.useContext(ti),{navigator:V,basename:N}=C.useContext(je),b=S!=null&&Pm(p)&&c===!0,O=V.encodeLocation?V.encodeLocation(p).pathname:p.pathname,U=T.pathname,B=S&&S.navigation&&S.navigation.location?S.navigation.location.pathname:null;t||(U=U.toLowerCase(),B=B?B.toLowerCase():null,O=O.toLowerCase()),B&&N&&(B=gt(B,N)||B);const ne=O!=="/"&&O.endsWith("/")?O.length-1:O.length;let J=U===O||!s&&U.startsWith(O)&&U.charAt(ne)==="/",se=B!=null&&(B===O||!s&&B.startsWith(O)&&B.charAt(O.length)==="/"),E={isActive:J,isPending:se,isTransitioning:b},g=J?e:void 0,y;typeof r=="function"?y=r(E):y=[r,J?"active":null,se?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let I=typeof i=="function"?i(E):i;return C.createElement(Bl,{...h,"aria-current":g,className:y,ref:f,style:I,to:a,viewTransition:c},typeof l=="function"?l(E):l)});Em.displayName="NavLink";var Tm=C.forwardRef(({discover:n="render",fetcherKey:e,navigate:t,reloadDocument:r,replace:s,state:i,method:a=Es,action:c,onSubmit:l,relative:h,preventScrollReset:f,viewTransition:p,defaultShouldRevalidate:T,...S},V)=>{let{useTransitions:N}=C.useContext(je),b=Rm(),O=Sm(c,{relative:h}),U=a.toLowerCase()==="get"?"get":"post",B=typeof c=="string"&&Ul.test(c),ne=J=>{if(l&&l(J),J.defaultPrevented)return;J.preventDefault();let se=J.nativeEvent.submitter,E=(se==null?void 0:se.getAttribute("formmethod"))||a,g=()=>b(se||J.currentTarget,{fetcherKey:e,method:E,navigate:t,replace:s,state:i,relative:h,preventScrollReset:f,viewTransition:p,defaultShouldRevalidate:T});N&&t!==!1?C.startTransition(()=>g()):g()};return C.createElement("form",{ref:V,method:U,action:O,onSubmit:r?l:ne,...S,"data-discover":!B&&n==="render"?"true":void 0})});Tm.displayName="Form";function vm(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function $l(n){let e=C.useContext(Un);return he(e,vm(n)),e}function Im(n,{target:e,replace:t,mask:r,state:s,preventScrollReset:i,relative:a,viewTransition:c,defaultShouldRevalidate:l,useTransitions:h}={}){let f=Ol(),p=lt(),T=Br(n,{relative:a});return C.useCallback(S=>{if(em(S,e)){S.preventDefault();let V=t!==void 0?t:Sr(p)===Sr(T),N=()=>f(n,{replace:V,mask:r,state:s,preventScrollReset:i,relative:a,viewTransition:c,defaultShouldRevalidate:l});h?C.startTransition(()=>N()):N()}},[p,f,T,t,r,s,e,n,i,a,c,l,h])}var wm=0,Am=()=>`__${String(++wm)}__`;function Rm(){let{router:n}=$l("useSubmit"),{basename:e}=C.useContext(je),t=Hp(),r=n.fetch,s=n.navigate;return C.useCallback(async(i,a={})=>{let{action:c,method:l,encType:h,formData:f,body:p}=rm(i,e);if(a.navigate===!1){let T=a.fetcherKey||Am();await r(T,t,a.action||c,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:f,body:p,formMethod:a.method||l,formEncType:a.encType||h,flushSync:a.flushSync})}else await s(a.action||c,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:f,body:p,formMethod:a.method||l,formEncType:a.encType||h,replace:a.replace,state:a.state,fromRouteId:t,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,s,e,t])}function Sm(n,{relative:e}={}){let{basename:t}=C.useContext(je),r=C.useContext(We);he(r,"useFormAction must be used inside a RouteContext");let[s]=r.matches.slice(-1),i={...Br(n||".",{relative:e})},a=lt();if(n==null){i.search=a.search;let c=new URLSearchParams(i.search),l=c.getAll("index");if(l.some(f=>f==="")){c.delete("index"),l.filter(p=>p).forEach(p=>c.append("index",p));let f=c.toString();i.search=f?`?${f}`:""}}return(!n||n===".")&&s.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),t!=="/"&&(i.pathname=i.pathname==="/"?t:Qe([t,i.pathname])),Sr(i)}function Pm(n,{relative:e}={}){let t=C.useContext(kl);he(t!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=$l("useViewTransitionState"),s=Br(n,{relative:e});if(!t.isTransitioning)return!1;let i=gt(t.currentLocation.pathname,r)||t.currentLocation.pathname,a=gt(t.nextLocation.pathname,r)||t.nextLocation.pathname;return Ds(s.pathname,a)!=null||Ds(s.pathname,i)!=null}var JI=Qf();const zc=n=>{let e;const t=new Set,r=(h,f)=>{const p=typeof h=="function"?h(e):h;if(!Object.is(p,e)){const T=e;e=f??(typeof p!="object"||p===null)?p:Object.assign({},e,p),t.forEach(S=>S(e,T))}},s=()=>e,c={setState:r,getState:s,getInitialState:()=>l,subscribe:h=>(t.add(h),()=>t.delete(h))},l=e=n(r,s,c);return c},Cm=(n=>n?zc(n):zc),bm=n=>n;function km(n,e=bm){const t=pr.useSyncExternalStore(n.subscribe,pr.useCallback(()=>e(n.getState()),[n,e]),pr.useCallback(()=>e(n.getInitialState()),[n,e]));return pr.useDebugValue(t),t}const Wc=n=>{const e=Cm(n),t=r=>km(e,r);return Object.assign(t,e),t},YI=(n=>n?Wc(n):Wc),Dm=()=>{};var Gc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Vm=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},ql={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let T=(c&15)<<2|h>>6,S=h&63;l||(S=64,a||(T=64)),r.push(t[f],t[p],t[T],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(jl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Vm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new Nm;const T=i<<2|c>>4;if(r.push(T),h!==64){const S=c<<4&240|h>>2;if(r.push(S),p!==64){const V=h<<6&192|p;r.push(V)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Nm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Om=function(n){const e=jl(n);return ql.encodeByteArray(e,!0)},Ns=function(n){return Om(n).replace(/\./g,"")},Hl=function(n){try{return ql.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xm=()=>Lm().__FIREBASE_DEFAULTS__,Mm=()=>{if(typeof process>"u"||typeof Gc>"u")return;const n=Gc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Fm=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Hl(n[1]);return e&&JSON.parse(e)},ri=()=>{try{return Dm()||xm()||Mm()||Fm()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},zl=n=>{var e,t;return(t=(e=ri())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Um=n=>{const e=zl(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Wl=()=>{var n;return(n=ri())==null?void 0:n.config},Gl=n=>{var e;return(e=ri())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ns(JSON.stringify(t)),Ns(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function jm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Oe())}function qm(){var e;const n=(e=ri())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Hm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function zm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Wm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Gm(){const n=Oe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Km(){return!qm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Qm(){try{return typeof indexedDB=="object"}catch{return!1}}function Jm(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ym="FirebaseError";class It extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Ym,Object.setPrototypeOf(this,It.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$r.prototype.create)}}class $r{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Xm(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new It(s,c,r)}}function Xm(n,e){return n.replace(Zm,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Zm=/\{\$([^}]+)}/g;function eg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function an(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Kc(i)&&Kc(a)){if(!an(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Kc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function mr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function gr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function tg(n,e){const t=new ng(n,e);return t.subscribe.bind(t)}class ng{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");rg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ki),s.error===void 0&&(s.error=Ki),s.complete===void 0&&(s.complete=Ki);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function rg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ki(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Kl(n){return(await fetch(n,{credentials:"include"})).ok}class cn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Bm;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(og(e))try{this.getOrInitializeService({instanceIdentifier:nn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=nn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=nn){return this.instances.has(e)}getOptions(e=nn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ig(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=nn){return this.component?this.component.multipleInstances?e:nn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ig(n){return n===nn?void 0:n}function og(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new sg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Z||(Z={}));const cg={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},ug=Z.INFO,lg={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},hg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=lg[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class jo{constructor(e){this.name=e,this._logLevel=ug,this._logHandler=hg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?cg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...e),this._logHandler(this,Z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...e),this._logHandler(this,Z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...e),this._logHandler(this,Z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...e),this._logHandler(this,Z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...e),this._logHandler(this,Z.ERROR,...e)}}const dg=(n,e)=>e.some(t=>n instanceof t);let Qc,Jc;function fg(){return Qc||(Qc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function pg(){return Jc||(Jc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ql=new WeakMap,co=new WeakMap,Jl=new WeakMap,Qi=new WeakMap,qo=new WeakMap;function mg(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Lt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Ql.set(t,n)}).catch(()=>{}),qo.set(e,n),e}function gg(n){if(co.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});co.set(n,e)}let uo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return co.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Jl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Lt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function _g(n){uo=n(uo)}function yg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ji(this),e,...t);return Jl.set(r,e.sort?e.sort():[e]),Lt(r)}:pg().includes(n)?function(...e){return n.apply(Ji(this),e),Lt(Ql.get(this))}:function(...e){return Lt(n.apply(Ji(this),e))}}function Eg(n){return typeof n=="function"?yg(n):(n instanceof IDBTransaction&&gg(n),dg(n,fg())?new Proxy(n,uo):n)}function Lt(n){if(n instanceof IDBRequest)return mg(n);if(Qi.has(n))return Qi.get(n);const e=Eg(n);return e!==n&&(Qi.set(n,e),qo.set(e,n)),e}const Ji=n=>qo.get(n);function Tg(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=Lt(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Lt(a.result),l.oldVersion,l.newVersion,Lt(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const vg=["get","getKey","getAll","getAllKeys","count"],Ig=["put","add","delete","clear"],Yi=new Map;function Yc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Yi.get(e))return Yi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Ig.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||vg.includes(t)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return Yi.set(e,i),i}_g(n=>({...n,get:(e,t,r)=>Yc(e,t)||n.get(e,t,r),has:(e,t)=>!!Yc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ag(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Ag(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const lo="@firebase/app",Xc="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=new jo("@firebase/app"),Rg="@firebase/app-compat",Sg="@firebase/analytics-compat",Pg="@firebase/analytics",Cg="@firebase/app-check-compat",bg="@firebase/app-check",kg="@firebase/auth",Dg="@firebase/auth-compat",Vg="@firebase/database",Ng="@firebase/data-connect",Og="@firebase/database-compat",Lg="@firebase/functions",xg="@firebase/functions-compat",Mg="@firebase/installations",Fg="@firebase/installations-compat",Ug="@firebase/messaging",Bg="@firebase/messaging-compat",$g="@firebase/performance",jg="@firebase/performance-compat",qg="@firebase/remote-config",Hg="@firebase/remote-config-compat",zg="@firebase/storage",Wg="@firebase/storage-compat",Gg="@firebase/firestore",Kg="@firebase/ai",Qg="@firebase/firestore-compat",Jg="firebase",Yg="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho="[DEFAULT]",Xg={[lo]:"fire-core",[Rg]:"fire-core-compat",[Pg]:"fire-analytics",[Sg]:"fire-analytics-compat",[bg]:"fire-app-check",[Cg]:"fire-app-check-compat",[kg]:"fire-auth",[Dg]:"fire-auth-compat",[Vg]:"fire-rtdb",[Ng]:"fire-data-connect",[Og]:"fire-rtdb-compat",[Lg]:"fire-fn",[xg]:"fire-fn-compat",[Mg]:"fire-iid",[Fg]:"fire-iid-compat",[Ug]:"fire-fcm",[Bg]:"fire-fcm-compat",[$g]:"fire-perf",[jg]:"fire-perf-compat",[qg]:"fire-rc",[Hg]:"fire-rc-compat",[zg]:"fire-gcs",[Wg]:"fire-gcs-compat",[Gg]:"fire-fst",[Qg]:"fire-fst-compat",[Kg]:"fire-vertex","fire-js":"fire-js",[Jg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os=new Map,Zg=new Map,fo=new Map;function Zc(n,e){try{n.container.addComponent(e)}catch(t){_t.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Nn(n){const e=n.name;if(fo.has(e))return _t.debug(`There were multiple attempts to register component ${e}.`),!1;fo.set(e,n);for(const t of Os.values())Zc(t,n);for(const t of Zg.values())Zc(t,n);return!0}function Ho(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function $e(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},xt=new $r("app","Firebase",e_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new cn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=Yg;function n_(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ho,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw xt.create("bad-app-name",{appName:String(s)});if(t||(t=Wl()),!t)throw xt.create("no-options");const i=Os.get(s);if(i){if(an(t,i.options)&&an(r,i.config))return i;throw xt.create("duplicate-app",{appName:s})}const a=new ag(s);for(const l of fo.values())a.addComponent(l);const c=new t_(t,r,a);return Os.set(s,c),c}function Yl(n=ho){const e=Os.get(n);if(!e&&n===ho&&Wl())return n_();if(!e)throw xt.create("no-app",{appName:n});return e}function Mt(n,e,t){let r=Xg[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_t.warn(a.join(" "));return}Nn(new cn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_="firebase-heartbeat-database",s_=1,Pr="firebase-heartbeat-store";let Xi=null;function Xl(){return Xi||(Xi=Tg(r_,s_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Pr)}catch(t){console.warn(t)}}}}).catch(n=>{throw xt.create("idb-open",{originalErrorMessage:n.message})})),Xi}async function i_(n){try{const t=(await Xl()).transaction(Pr),r=await t.objectStore(Pr).get(Zl(n));return await t.done,r}catch(e){if(e instanceof It)_t.warn(e.message);else{const t=xt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});_t.warn(t.message)}}}async function eu(n,e){try{const r=(await Xl()).transaction(Pr,"readwrite");await r.objectStore(Pr).put(e,Zl(n)),await r.done}catch(t){if(t instanceof It)_t.warn(t.message);else{const r=xt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});_t.warn(r.message)}}}function Zl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o_=1024,a_=30;class c_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new l_(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=tu();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>a_){const a=h_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){_t.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=tu(),{heartbeatsToSend:r,unsentEntries:s}=u_(this._heartbeatsCache.heartbeats),i=Ns(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return _t.warn(t),""}}}function tu(){return new Date().toISOString().substring(0,10)}function u_(n,e=o_){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),nu(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),nu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class l_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Qm()?Jm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await i_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return eu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return eu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function nu(n){return Ns(JSON.stringify({version:2,heartbeats:n})).length}function h_(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d_(n){Nn(new cn("platform-logger",e=>new wg(e),"PRIVATE")),Nn(new cn("heartbeat",e=>new c_(e),"PRIVATE")),Mt(lo,Xc,n),Mt(lo,Xc,"esm2020"),Mt("fire-js","")}d_("");var ru=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ft,eh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,g){function y(){}y.prototype=g.prototype,E.F=g.prototype,E.prototype=new y,E.prototype.constructor=E,E.D=function(I,v,R){for(var _=Array(arguments.length-2),pe=2;pe<arguments.length;pe++)_[pe-2]=arguments[pe];return g.prototype[v].apply(I,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,g,y){y||(y=0);const I=Array(16);if(typeof g=="string")for(var v=0;v<16;++v)I[v]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(v=0;v<16;++v)I[v]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=E.g[0],y=E.g[1],v=E.g[2];let R=E.g[3],_;_=g+(R^y&(v^R))+I[0]+3614090360&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(v^g&(y^v))+I[1]+3905402710&4294967295,R=g+(_<<12&4294967295|_>>>20),_=v+(y^R&(g^y))+I[2]+606105819&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(g^v&(R^g))+I[3]+3250441966&4294967295,y=v+(_<<22&4294967295|_>>>10),_=g+(R^y&(v^R))+I[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(v^g&(y^v))+I[5]+1200080426&4294967295,R=g+(_<<12&4294967295|_>>>20),_=v+(y^R&(g^y))+I[6]+2821735955&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(g^v&(R^g))+I[7]+4249261313&4294967295,y=v+(_<<22&4294967295|_>>>10),_=g+(R^y&(v^R))+I[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(v^g&(y^v))+I[9]+2336552879&4294967295,R=g+(_<<12&4294967295|_>>>20),_=v+(y^R&(g^y))+I[10]+4294925233&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(g^v&(R^g))+I[11]+2304563134&4294967295,y=v+(_<<22&4294967295|_>>>10),_=g+(R^y&(v^R))+I[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(v^g&(y^v))+I[13]+4254626195&4294967295,R=g+(_<<12&4294967295|_>>>20),_=v+(y^R&(g^y))+I[14]+2792965006&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(g^v&(R^g))+I[15]+1236535329&4294967295,y=v+(_<<22&4294967295|_>>>10),_=g+(v^R&(y^v))+I[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(g^y))+I[6]+3225465664&4294967295,R=g+(_<<9&4294967295|_>>>23),_=v+(g^y&(R^g))+I[11]+643717713&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(v^R))+I[0]+3921069994&4294967295,y=v+(_<<20&4294967295|_>>>12),_=g+(v^R&(y^v))+I[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(g^y))+I[10]+38016083&4294967295,R=g+(_<<9&4294967295|_>>>23),_=v+(g^y&(R^g))+I[15]+3634488961&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(v^R))+I[4]+3889429448&4294967295,y=v+(_<<20&4294967295|_>>>12),_=g+(v^R&(y^v))+I[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(g^y))+I[14]+3275163606&4294967295,R=g+(_<<9&4294967295|_>>>23),_=v+(g^y&(R^g))+I[3]+4107603335&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(v^R))+I[8]+1163531501&4294967295,y=v+(_<<20&4294967295|_>>>12),_=g+(v^R&(y^v))+I[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(g^y))+I[2]+4243563512&4294967295,R=g+(_<<9&4294967295|_>>>23),_=v+(g^y&(R^g))+I[7]+1735328473&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(v^R))+I[12]+2368359562&4294967295,y=v+(_<<20&4294967295|_>>>12),_=g+(y^v^R)+I[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^v)+I[8]+2272392833&4294967295,R=g+(_<<11&4294967295|_>>>21),_=v+(R^g^y)+I[11]+1839030562&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^g)+I[14]+4259657740&4294967295,y=v+(_<<23&4294967295|_>>>9),_=g+(y^v^R)+I[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^v)+I[4]+1272893353&4294967295,R=g+(_<<11&4294967295|_>>>21),_=v+(R^g^y)+I[7]+4139469664&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^g)+I[10]+3200236656&4294967295,y=v+(_<<23&4294967295|_>>>9),_=g+(y^v^R)+I[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^v)+I[0]+3936430074&4294967295,R=g+(_<<11&4294967295|_>>>21),_=v+(R^g^y)+I[3]+3572445317&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^g)+I[6]+76029189&4294967295,y=v+(_<<23&4294967295|_>>>9),_=g+(y^v^R)+I[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^v)+I[12]+3873151461&4294967295,R=g+(_<<11&4294967295|_>>>21),_=v+(R^g^y)+I[15]+530742520&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^g)+I[2]+3299628645&4294967295,y=v+(_<<23&4294967295|_>>>9),_=g+(v^(y|~R))+I[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~v))+I[7]+1126891415&4294967295,R=g+(_<<10&4294967295|_>>>22),_=v+(g^(R|~y))+I[14]+2878612391&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~g))+I[5]+4237533241&4294967295,y=v+(_<<21&4294967295|_>>>11),_=g+(v^(y|~R))+I[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~v))+I[3]+2399980690&4294967295,R=g+(_<<10&4294967295|_>>>22),_=v+(g^(R|~y))+I[10]+4293915773&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~g))+I[1]+2240044497&4294967295,y=v+(_<<21&4294967295|_>>>11),_=g+(v^(y|~R))+I[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~v))+I[15]+4264355552&4294967295,R=g+(_<<10&4294967295|_>>>22),_=v+(g^(R|~y))+I[6]+2734768916&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~g))+I[13]+1309151649&4294967295,y=v+(_<<21&4294967295|_>>>11),_=g+(v^(y|~R))+I[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~v))+I[11]+3174756917&4294967295,R=g+(_<<10&4294967295|_>>>22),_=v+(g^(R|~y))+I[2]+718787259&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~g))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(v+(_<<21&4294967295|_>>>11))&4294967295,E.g[2]=E.g[2]+v&4294967295,E.g[3]=E.g[3]+R&4294967295}r.prototype.v=function(E,g){g===void 0&&(g=E.length);const y=g-this.blockSize,I=this.C;let v=this.h,R=0;for(;R<g;){if(v==0)for(;R<=y;)s(this,E,R),R+=this.blockSize;if(typeof E=="string"){for(;R<g;)if(I[v++]=E.charCodeAt(R++),v==this.blockSize){s(this,I),v=0;break}}else for(;R<g;)if(I[v++]=E[R++],v==this.blockSize){s(this,I),v=0;break}}this.h=v,this.o+=g},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;g=this.o*8;for(var y=E.length-8;y<E.length;++y)E[y]=g&255,g/=256;for(this.v(E),E=Array(16),g=0,y=0;y<4;++y)for(let I=0;I<32;I+=8)E[g++]=this.g[y]>>>I&255;return E};function i(E,g){var y=c;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=g(E)}function a(E,g){this.h=g;const y=[];let I=!0;for(let v=E.length-1;v>=0;v--){const R=E[v]|0;I&&R==g||(y[v]=R,I=!1)}this.g=y}var c={};function l(E){return-128<=E&&E<128?i(E,function(g){return new a([g|0],g<0?-1:0)}):new a([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return p;if(E<0)return b(h(-E));const g=[];let y=1;for(let I=0;E>=y;I++)g[I]=E/y|0,y*=4294967296;return new a(g,0)}function f(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return b(f(E.substring(1),g));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(g,8));let I=p;for(let R=0;R<E.length;R+=8){var v=Math.min(8,E.length-R);const _=parseInt(E.substring(R,R+v),g);v<8?(v=h(Math.pow(g,v)),I=I.j(v).add(h(_))):(I=I.j(y),I=I.add(h(_)))}return I}var p=l(0),T=l(1),S=l(16777216);n=a.prototype,n.m=function(){if(N(this))return-b(this).m();let E=0,g=1;for(let y=0;y<this.g.length;y++){const I=this.i(y);E+=(I>=0?I:4294967296+I)*g,g*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(V(this))return"0";if(N(this))return"-"+b(this).toString(E);const g=h(Math.pow(E,6));var y=this;let I="";for(;;){const v=ne(y,g).g;y=O(y,v.j(g));let R=((y.g.length>0?y.g[0]:y.h)>>>0).toString(E);if(y=v,V(y))return R+I;for(;R.length<6;)R="0"+R;I=R+I}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function V(E){if(E.h!=0)return!1;for(let g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function N(E){return E.h==-1}n.l=function(E){return E=O(this,E),N(E)?-1:V(E)?0:1};function b(E){const g=E.g.length,y=[];for(let I=0;I<g;I++)y[I]=~E.g[I];return new a(y,~E.h).add(T)}n.abs=function(){return N(this)?b(this):this},n.add=function(E){const g=Math.max(this.g.length,E.g.length),y=[];let I=0;for(let v=0;v<=g;v++){let R=I+(this.i(v)&65535)+(E.i(v)&65535),_=(R>>>16)+(this.i(v)>>>16)+(E.i(v)>>>16);I=_>>>16,R&=65535,_&=65535,y[v]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function O(E,g){return E.add(b(g))}n.j=function(E){if(V(this)||V(E))return p;if(N(this))return N(E)?b(this).j(b(E)):b(b(this).j(E));if(N(E))return b(this.j(b(E)));if(this.l(S)<0&&E.l(S)<0)return h(this.m()*E.m());const g=this.g.length+E.g.length,y=[];for(var I=0;I<2*g;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(let v=0;v<E.g.length;v++){const R=this.i(I)>>>16,_=this.i(I)&65535,pe=E.i(v)>>>16,Ie=E.i(v)&65535;y[2*I+2*v]+=_*Ie,U(y,2*I+2*v),y[2*I+2*v+1]+=R*Ie,U(y,2*I+2*v+1),y[2*I+2*v+1]+=_*pe,U(y,2*I+2*v+1),y[2*I+2*v+2]+=R*pe,U(y,2*I+2*v+2)}for(E=0;E<g;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=g;E<2*g;E++)y[E]=0;return new a(y,0)};function U(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function B(E,g){this.g=E,this.h=g}function ne(E,g){if(V(g))throw Error("division by zero");if(V(E))return new B(p,p);if(N(E))return g=ne(b(E),g),new B(b(g.g),b(g.h));if(N(g))return g=ne(E,b(g)),new B(b(g.g),g.h);if(E.g.length>30){if(N(E)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var y=T,I=g;I.l(E)<=0;)y=J(y),I=J(I);var v=se(y,1),R=se(I,1);for(I=se(I,2),y=se(y,2);!V(I);){var _=R.add(I);_.l(E)<=0&&(v=v.add(y),R=_),I=se(I,1),y=se(y,1)}return g=O(E,v.j(g)),new B(v,g)}for(v=p;E.l(g)>=0;){for(y=Math.max(1,Math.floor(E.m()/g.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),R=h(y),_=R.j(g);N(_)||_.l(E)>0;)y-=I,R=h(y),_=R.j(g);V(R)&&(R=T),v=v.add(R),E=O(E,_)}return new B(v,E)}n.B=function(E){return ne(this,E).h},n.and=function(E){const g=Math.max(this.g.length,E.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)&E.i(I);return new a(y,this.h&E.h)},n.or=function(E){const g=Math.max(this.g.length,E.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)|E.i(I);return new a(y,this.h|E.h)},n.xor=function(E){const g=Math.max(this.g.length,E.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)^E.i(I);return new a(y,this.h^E.h)};function J(E){const g=E.g.length+1,y=[];for(let I=0;I<g;I++)y[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(y,E.h)}function se(E,g){const y=g>>5;g%=32;const I=E.g.length-y,v=[];for(let R=0;R<I;R++)v[R]=g>0?E.i(R+y)>>>g|E.i(R+y+1)<<32-g:E.i(R+y);return new a(v,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,eh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Ft=a}).apply(typeof ru<"u"?ru:typeof self<"u"?self:typeof window<"u"?window:{});var fs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var th,_r,nh,vs,po,rh,sh,ih;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof fs=="object"&&fs];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var A=o[m];if(!(A in d))break e;d=d[A]}o=o[o.length-1],m=d[o],u=u(m),u!=m&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(u){var d=[],m;for(m in u)Object.prototype.hasOwnProperty.call(u,m)&&d.push([m,u[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function l(o,u,d){return o.call.apply(o.bind,arguments)}function h(o,u,d){return h=l,h.apply(null,arguments)}function f(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function p(o,u){function d(){}d.prototype=u.prototype,o.Z=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(m,A,P){for(var x=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)x[Q-2]=arguments[Q];return u.prototype[A].apply(m,x)}}var T=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function S(o){const u=o.length;if(u>0){const d=Array(u);for(let m=0;m<u;m++)d[m]=o[m];return d}return[]}function V(o,u){for(let m=1;m<arguments.length;m++){const A=arguments[m];var d=typeof A;if(d=d!="object"?d:A?Array.isArray(A)?"array":d:"null",d=="array"||d=="object"&&typeof A.length=="number"){d=o.length||0;const P=A.length||0;o.length=d+P;for(let x=0;x<P;x++)o[d+x]=A[x]}else o.push(A)}}class N{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function b(o){a.setTimeout(()=>{throw o},0)}function O(){var o=E;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class U{constructor(){this.h=this.g=null}add(u,d){const m=B.get();m.set(u,d),this.h?this.h.next=m:this.g=m,this.h=m}}var B=new N(()=>new ne,o=>o.reset());class ne{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let J,se=!1,E=new U,g=()=>{const o=Promise.resolve(void 0);J=()=>{o.then(y)}};function y(){for(var o;o=O();){try{o.h.call(o.g)}catch(d){b(d)}var u=B;u.j(o),u.h<100&&(u.h++,o.next=u.g,u.g=o)}se=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var R=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,u),a.removeEventListener("test",d,u)}catch{}return o})();function _(o){return/^[\s\xa0]*$/.test(o)}function pe(o,u){v.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,u)}p(pe,v),pe.prototype.init=function(o,u){const d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget,u||(d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement)),this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&pe.Z.h.call(this)},pe.prototype.h=function(){pe.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ie="closure_listenable_"+(Math.random()*1e6|0),wt=0;function yn(o,u,d,m,A){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!m,this.ha=A,this.key=++wt,this.da=this.fa=!1}function En(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Jt(o,u,d){for(const m in o)u.call(d,o[m],m,o)}function vi(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function w(o){const u={};for(const d in o)u[d]=o[d];return u}const L="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function z(o,u){let d,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(d in m)o[d]=m[d];for(let P=0;P<L.length;P++)d=L[P],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function H(o){this.src=o,this.g={},this.h=0}H.prototype.add=function(o,u,d,m,A){const P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);const x=re(o,u,m,A);return x>-1?(u=o[x],d||(u.fa=!1)):(u=new yn(u,this.src,P,!!m,A),u.fa=d,o.push(u)),u};function ee(o,u){const d=u.type;if(d in o.g){var m=o.g[d],A=Array.prototype.indexOf.call(m,u,void 0),P;(P=A>=0)&&Array.prototype.splice.call(m,A,1),P&&(En(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function re(o,u,d,m){for(let A=0;A<o.length;++A){const P=o[A];if(!P.da&&P.listener==u&&P.capture==!!d&&P.ha==m)return A}return-1}var oe="closure_lm_"+(Math.random()*1e6|0),Fe={};function Re(o,u,d,m,A){if(Array.isArray(u)){for(let P=0;P<u.length;P++)Re(o,u[P],d,m,A);return null}return d=Ua(d),o&&o[Ie]?o.J(u,d,c(m)?!!m.capture:!1,A):Ii(o,u,d,!1,m,A)}function Ii(o,u,d,m,A,P){if(!u)throw Error("Invalid event type");const x=c(A)?!!A.capture:!!A;let Q=Ai(o);if(Q||(o[oe]=Q=new H(o)),d=Q.add(u,d,m,x,P),d.proxy)return d;if(m=_f(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)R||(A=x),A===void 0&&(A=!1),o.addEventListener(u.toString(),m,A);else if(o.attachEvent)o.attachEvent(Fa(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function _f(){function o(d){return u.call(o.src,o.listener,d)}const u=yf;return o}function Ma(o,u,d,m,A){if(Array.isArray(u))for(var P=0;P<u.length;P++)Ma(o,u[P],d,m,A);else m=c(m)?!!m.capture:!!m,d=Ua(d),o&&o[Ie]?(o=o.i,P=String(u).toString(),P in o.g&&(u=o.g[P],d=re(u,d,m,A),d>-1&&(En(u[d]),Array.prototype.splice.call(u,d,1),u.length==0&&(delete o.g[P],o.h--)))):o&&(o=Ai(o))&&(u=o.g[u.toString()],o=-1,u&&(o=re(u,d,m,A)),(d=o>-1?u[o]:null)&&wi(d))}function wi(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Ie])ee(u.i,o);else{var d=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(d,m,o.capture):u.detachEvent?u.detachEvent(Fa(d),m):u.addListener&&u.removeListener&&u.removeListener(m),(d=Ai(u))?(ee(d,o),d.h==0&&(d.src=null,u[oe]=null)):En(o)}}}function Fa(o){return o in Fe?Fe[o]:Fe[o]="on"+o}function yf(o,u){if(o.da)o=!0;else{u=new pe(u,this);const d=o.listener,m=o.ha||o.src;o.fa&&wi(o),o=d.call(m,u)}return o}function Ai(o){return o=o[oe],o instanceof H?o:null}var Ri="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ua(o){return typeof o=="function"?o:(o[Ri]||(o[Ri]=function(u){return o.handleEvent(u)}),o[Ri])}function be(){I.call(this),this.i=new H(this),this.M=this,this.G=null}p(be,I),be.prototype[Ie]=!0,be.prototype.removeEventListener=function(o,u,d,m){Ma(this,o,u,d,m)};function Le(o,u){var d,m=o.G;if(m)for(d=[];m;m=m.G)d.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new v(u,o);else if(u instanceof v)u.target=u.target||o;else{var A=u;u=new v(m,o),z(u,A)}A=!0;let P,x;if(d)for(x=d.length-1;x>=0;x--)P=u.g=d[x],A=es(P,m,!0,u)&&A;if(P=u.g=o,A=es(P,m,!0,u)&&A,A=es(P,m,!1,u)&&A,d)for(x=0;x<d.length;x++)P=u.g=d[x],A=es(P,m,!1,u)&&A}be.prototype.N=function(){if(be.Z.N.call(this),this.i){var o=this.i;for(const u in o.g){const d=o.g[u];for(let m=0;m<d.length;m++)En(d[m]);delete o.g[u],o.h--}}this.G=null},be.prototype.J=function(o,u,d,m){return this.i.add(String(o),u,!1,d,m)},be.prototype.K=function(o,u,d,m){return this.i.add(String(o),u,!0,d,m)};function es(o,u,d,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();let A=!0;for(let P=0;P<u.length;++P){const x=u[P];if(x&&!x.da&&x.capture==d){const Q=x.listener,Te=x.ha||x.src;x.fa&&ee(o.i,x),A=Q.call(Te,m)!==!1&&A}}return A&&!m.defaultPrevented}function Ef(o,u){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(o,u||0)}function Ba(o){o.g=Ef(()=>{o.g=null,o.i&&(o.i=!1,Ba(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Tf extends I{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Ba(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Qn(o){I.call(this),this.h=o,this.g={}}p(Qn,I);var $a=[];function ja(o){Jt(o.g,function(u,d){this.g.hasOwnProperty(d)&&wi(u)},o),o.g={}}Qn.prototype.N=function(){Qn.Z.N.call(this),ja(this)},Qn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Si=a.JSON.stringify,vf=a.JSON.parse,If=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function qa(){}function Ha(){}var Jn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Pi(){v.call(this,"d")}p(Pi,v);function Ci(){v.call(this,"c")}p(Ci,v);var Yt={},za=null;function ts(){return za=za||new be}Yt.Ia="serverreachability";function Wa(o){v.call(this,Yt.Ia,o)}p(Wa,v);function Yn(o){const u=ts();Le(u,new Wa(u))}Yt.STAT_EVENT="statevent";function Ga(o,u){v.call(this,Yt.STAT_EVENT,o),this.stat=u}p(Ga,v);function xe(o){const u=ts();Le(u,new Ga(u,o))}Yt.Ja="timingevent";function Ka(o,u){v.call(this,Yt.Ja,o),this.size=u}p(Ka,v);function Xn(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},u)}function Zn(){this.g=!0}Zn.prototype.ua=function(){this.g=!1};function wf(o,u,d,m,A,P){o.info(function(){if(o.g)if(P){var x="",Q=P.split("&");for(let ae=0;ae<Q.length;ae++){var Te=Q[ae].split("=");if(Te.length>1){const we=Te[0];Te=Te[1];const nt=we.split("_");x=nt.length>=2&&nt[1]=="type"?x+(we+"="+Te+"&"):x+(we+"=redacted&")}}}else x=null;else x=P;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+u+`
`+d+`
`+x})}function Af(o,u,d,m,A,P,x){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+u+`
`+d+`
`+P+" "+x})}function Tn(o,u,d,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Sf(o,d)+(m?" "+m:"")})}function Rf(o,u){o.info(function(){return"TIMEOUT: "+u})}Zn.prototype.info=function(){};function Sf(o,u){if(!o.g)return u;if(!u)return null;try{const P=JSON.parse(u);if(P){for(o=0;o<P.length;o++)if(Array.isArray(P[o])){var d=P[o];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var A=m[0];if(A!="noop"&&A!="stop"&&A!="close")for(let x=1;x<m.length;x++)m[x]=""}}}}return Si(P)}catch{return u}}var ns={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Qa={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ja;function bi(){}p(bi,qa),bi.prototype.g=function(){return new XMLHttpRequest},Ja=new bi;function er(o){return encodeURIComponent(String(o))}function Pf(o){var u=1;o=o.split(":");const d=[];for(;u>0&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function At(o,u,d,m){this.j=o,this.i=u,this.l=d,this.S=m||1,this.V=new Qn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ya}function Ya(){this.i=null,this.g="",this.h=!1}var Xa={},ki={};function Di(o,u,d){o.M=1,o.A=ss(tt(u)),o.u=d,o.R=!0,Za(o,null)}function Za(o,u){o.F=Date.now(),rs(o),o.B=tt(o.A);var d=o.B,m=o.S;Array.isArray(m)||(m=[String(m)]),dc(d.i,"t",m),o.C=0,d=o.j.L,o.h=new Ya,o.g=kc(o.j,d?u:null,!o.u),o.P>0&&(o.O=new Tf(h(o.Y,o,o.g),o.P)),u=o.V,d=o.g,m=o.ba;var A="readystatechange";Array.isArray(A)||(A&&($a[0]=A.toString()),A=$a);for(let P=0;P<A.length;P++){const x=Re(d,A[P],m||u.handleEvent,!1,u.h||u);if(!x)break;u.g[x.key]=x}u=o.J?w(o.J):{},o.u?(o.v||(o.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,u)):(o.v="GET",o.g.ea(o.B,o.v,null,u)),Yn(),wf(o.i,o.v,o.B,o.l,o.S,o.u)}At.prototype.ba=function(o){o=o.target;const u=this.O;u&&Pt(o)==3?u.j():this.Y(o)},At.prototype.Y=function(o){try{if(o==this.g)e:{const Q=Pt(this.g),Te=this.g.ya(),ae=this.g.ca();if(!(Q<3)&&(Q!=3||this.g&&(this.h.h||this.g.la()||Ec(this.g)))){this.K||Q!=4||Te==7||(Te==8||ae<=0?Yn(3):Yn(2)),Vi(this);var u=this.g.ca();this.X=u;var d=Cf(this);if(this.o=u==200,Af(this.i,this.v,this.B,this.l,this.S,Q,u),this.o){if(this.U&&!this.L){t:{if(this.g){var m,A=this.g;if((m=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(m)){var P=m;break t}}P=null}if(o=P)Tn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ni(this,o);else{this.o=!1,this.m=3,xe(12),Xt(this),tr(this);break e}}if(this.R){o=!0;let we;for(;!this.K&&this.C<d.length;)if(we=bf(this,d),we==ki){Q==4&&(this.m=4,xe(14),o=!1),Tn(this.i,this.l,null,"[Incomplete Response]");break}else if(we==Xa){this.m=4,xe(15),Tn(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else Tn(this.i,this.l,we,null),Ni(this,we);if(ec(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||d.length!=0||this.h.h||(this.m=1,xe(16),o=!1),this.o=this.o&&o,!o)Tn(this.i,this.l,d,"[Invalid Chunked Response]"),Xt(this),tr(this);else if(d.length>0&&!this.W){this.W=!0;var x=this.j;x.g==this&&x.aa&&!x.P&&(x.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),$i(x),x.P=!0,xe(11))}}else Tn(this.i,this.l,d,null),Ni(this,d);Q==4&&Xt(this),this.o&&!this.K&&(Q==4?Sc(this.j,this):(this.o=!1,rs(this)))}else qf(this.g),u==400&&d.indexOf("Unknown SID")>0?(this.m=3,xe(12)):(this.m=0,xe(13)),Xt(this),tr(this)}}}catch{}finally{}};function Cf(o){if(!ec(o))return o.g.la();const u=Ec(o.g);if(u==="")return"";let d="";const m=u.length,A=Pt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Xt(o),tr(o),"";o.h.i=new a.TextDecoder}for(let P=0;P<m;P++)o.h.h=!0,d+=o.h.i.decode(u[P],{stream:!(A&&P==m-1)});return u.length=0,o.h.g+=d,o.C=0,o.h.g}function ec(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function bf(o,u){var d=o.C,m=u.indexOf(`
`,d);return m==-1?ki:(d=Number(u.substring(d,m)),isNaN(d)?Xa:(m+=1,m+d>u.length?ki:(u=u.slice(m,m+d),o.C=m+d,u)))}At.prototype.cancel=function(){this.K=!0,Xt(this)};function rs(o){o.T=Date.now()+o.H,tc(o,o.H)}function tc(o,u){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Xn(h(o.aa,o),u)}function Vi(o){o.D&&(a.clearTimeout(o.D),o.D=null)}At.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Rf(this.i,this.B),this.M!=2&&(Yn(),xe(17)),Xt(this),this.m=2,tr(this)):tc(this,this.T-o)};function tr(o){o.j.I==0||o.K||Sc(o.j,o)}function Xt(o){Vi(o);var u=o.O;u&&typeof u.dispose=="function"&&u.dispose(),o.O=null,ja(o.V),o.g&&(u=o.g,o.g=null,u.abort(),u.dispose())}function Ni(o,u){try{var d=o.j;if(d.I!=0&&(d.g==o||Oi(d.h,o))){if(!o.L&&Oi(d.h,o)&&d.I==3){try{var m=d.Ba.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)us(d),as(d);else break e;Bi(d),xe(18)}}else d.xa=A[1],0<d.xa-d.K&&A[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Xn(h(d.Va,d),6e3));sc(d.h)<=1&&d.ta&&(d.ta=void 0)}else en(d,11)}else if((o.L||d.g==o)&&us(d),!_(u))for(A=d.Ba.g.parse(u),u=0;u<A.length;u++){let ae=A[u];const we=ae[0];if(!(we<=d.K))if(d.K=we,ae=ae[1],d.I==2)if(ae[0]=="c"){d.M=ae[1],d.ba=ae[2];const nt=ae[3];nt!=null&&(d.ka=nt,d.j.info("VER="+d.ka));const tn=ae[4];tn!=null&&(d.za=tn,d.j.info("SVER="+d.za));const Ct=ae[5];Ct!=null&&typeof Ct=="number"&&Ct>0&&(m=1.5*Ct,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const bt=o.g;if(bt){const hs=bt.g?bt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(hs){var P=m.h;P.g||hs.indexOf("spdy")==-1&&hs.indexOf("quic")==-1&&hs.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Li(P,P.h),P.h=null))}if(m.G){const ji=bt.g?bt.g.getResponseHeader("X-HTTP-Session-Id"):null;ji&&(m.wa=ji,ue(m.J,m.G,ji))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var x=o;if(m.na=bc(m,m.L?m.ba:null,m.W),x.L){ic(m.h,x);var Q=x,Te=m.O;Te&&(Q.H=Te),Q.D&&(Vi(Q),rs(Q)),m.g=x}else Ac(m);d.i.length>0&&cs(d)}else ae[0]!="stop"&&ae[0]!="close"||en(d,7);else d.I==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?en(d,7):Ui(d):ae[0]!="noop"&&d.l&&d.l.qa(ae),d.A=0)}}Yn(4)}catch{}}var kf=class{constructor(o,u){this.g=o,this.map=u}};function nc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function rc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function sc(o){return o.h?1:o.g?o.g.size:0}function Oi(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Li(o,u){o.g?o.g.add(u):o.h=u}function ic(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}nc.prototype.cancel=function(){if(this.i=oc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function oc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.G);return u}return S(o.i)}var ac=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Df(o,u){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const m=o[d].indexOf("=");let A,P=null;m>=0?(A=o[d].substring(0,m),P=o[d].substring(m+1)):A=o[d],u(A,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Rt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;o instanceof Rt?(this.l=o.l,nr(this,o.j),this.o=o.o,this.g=o.g,rr(this,o.u),this.h=o.h,xi(this,fc(o.i)),this.m=o.m):o&&(u=String(o).match(ac))?(this.l=!1,nr(this,u[1]||"",!0),this.o=sr(u[2]||""),this.g=sr(u[3]||"",!0),rr(this,u[4]),this.h=sr(u[5]||"",!0),xi(this,u[6]||"",!0),this.m=sr(u[7]||"")):(this.l=!1,this.i=new or(null,this.l))}Rt.prototype.toString=function(){const o=[];var u=this.j;u&&o.push(ir(u,cc,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(ir(u,cc,!0),"@"),o.push(er(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(ir(d,d.charAt(0)=="/"?Of:Nf,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",ir(d,xf)),o.join("")},Rt.prototype.resolve=function(o){const u=tt(this);let d=!!o.j;d?nr(u,o.j):d=!!o.o,d?u.o=o.o:d=!!o.g,d?u.g=o.g:d=o.u!=null;var m=o.h;if(d)rr(u,o.u);else if(d=!!o.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var A=u.h.lastIndexOf("/");A!=-1&&(m=u.h.slice(0,A+1)+m)}if(A=m,A==".."||A==".")m="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){m=A.lastIndexOf("/",0)==0,A=A.split("/");const P=[];for(let x=0;x<A.length;){const Q=A[x++];Q=="."?m&&x==A.length&&P.push(""):Q==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),m&&x==A.length&&P.push("")):(P.push(Q),m=!0)}m=P.join("/")}else m=A}return d?u.h=m:d=o.i.toString()!=="",d?xi(u,fc(o.i)):d=!!o.m,d&&(u.m=o.m),u};function tt(o){return new Rt(o)}function nr(o,u,d){o.j=d?sr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function rr(o,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);o.u=u}else o.u=null}function xi(o,u,d){u instanceof or?(o.i=u,Mf(o.i,o.l)):(d||(u=ir(u,Lf)),o.i=new or(u,o.l))}function ue(o,u,d){o.i.set(u,d)}function ss(o){return ue(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function sr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ir(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Vf),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Vf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var cc=/[#\/\?@]/g,Nf=/[#\?:]/g,Of=/[#\?]/g,Lf=/[#\?@]/g,xf=/#/g;function or(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Zt(o){o.g||(o.g=new Map,o.h=0,o.i&&Df(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=or.prototype,n.add=function(o,u){Zt(this),this.i=null,o=vn(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function uc(o,u){Zt(o),u=vn(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function lc(o,u){return Zt(o),u=vn(o,u),o.g.has(u)}n.forEach=function(o,u){Zt(this),this.g.forEach(function(d,m){d.forEach(function(A){o.call(u,A,m,this)},this)},this)};function hc(o,u){Zt(o);let d=[];if(typeof u=="string")lc(o,u)&&(d=d.concat(o.g.get(vn(o,u))));else for(o=Array.from(o.g.values()),u=0;u<o.length;u++)d=d.concat(o[u]);return d}n.set=function(o,u){return Zt(this),this.i=null,o=vn(this,o),lc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=hc(this,o),o.length>0?String(o[0]):u):u};function dc(o,u,d){uc(o,u),d.length>0&&(o.i=null,o.g.set(vn(o,u),S(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(let m=0;m<u.length;m++){var d=u[m];const A=er(d);d=hc(this,d);for(let P=0;P<d.length;P++){let x=A;d[P]!==""&&(x+="="+er(d[P])),o.push(x)}}return this.i=o.join("&")};function fc(o){const u=new or;return u.i=o.i,o.g&&(u.g=new Map(o.g),u.h=o.h),u}function vn(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Mf(o,u){u&&!o.j&&(Zt(o),o.i=null,o.g.forEach(function(d,m){const A=m.toLowerCase();m!=A&&(uc(this,m),dc(this,A,d))},o)),o.j=u}function Ff(o,u){const d=new Zn;if(a.Image){const m=new Image;m.onload=f(St,d,"TestLoadImage: loaded",!0,u,m),m.onerror=f(St,d,"TestLoadImage: error",!1,u,m),m.onabort=f(St,d,"TestLoadImage: abort",!1,u,m),m.ontimeout=f(St,d,"TestLoadImage: timeout",!1,u,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function Uf(o,u){const d=new Zn,m=new AbortController,A=setTimeout(()=>{m.abort(),St(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(P=>{clearTimeout(A),P.ok?St(d,"TestPingServer: ok",!0,u):St(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(A),St(d,"TestPingServer: error",!1,u)})}function St(o,u,d,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(d)}catch{}}function Bf(){this.g=new If}function Mi(o){this.i=o.Sb||null,this.h=o.ab||!1}p(Mi,qa),Mi.prototype.g=function(){return new is(this.i,this.h)};function is(o,u){be.call(this),this.H=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(is,be),n=is.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=u,this.readyState=1,cr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(u.body=o),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ar(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,cr(this)),this.g&&(this.readyState=3,cr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;pc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function pc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?ar(this):cr(this),this.readyState==3&&pc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,ar(this))},n.Na=function(o){this.g&&(this.response=o,ar(this))},n.ga=function(){this.g&&ar(this)};function ar(o){o.readyState=4,o.l=null,o.j=null,o.B=null,cr(o)}n.setRequestHeader=function(o,u){this.A.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function cr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(is.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function mc(o){let u="";return Jt(o,function(d,m){u+=m,u+=":",u+=d,u+=`\r
`}),u}function Fi(o,u,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=mc(d),typeof o=="string"?d!=null&&er(d):ue(o,u,d))}function fe(o){be.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(fe,be);var $f=/^https?$/i,jf=["POST","PUT"];n=fe.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,u,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ja.g(),this.g.onreadystatechange=T(h(this.Ca,this));try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(P){gc(this,P);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)d.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const P of m.keys())d.set(P,m.get(P));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(jf,u,void 0)>=0)||m||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,x]of d)this.g.setRequestHeader(P,x);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(P){gc(this,P)}};function gc(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.o=5,_c(o),os(o)}function _c(o){o.A||(o.A=!0,Le(o,"complete"),Le(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Le(this,"complete"),Le(this,"abort"),os(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),os(this,!0)),fe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?yc(this):this.Xa())},n.Xa=function(){yc(this)};function yc(o){if(o.h&&typeof i<"u"){if(o.v&&Pt(o)==4)setTimeout(o.Ca.bind(o),0);else if(Le(o,"readystatechange"),Pt(o)==4){o.h=!1;try{const P=o.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var m;if(m=P===0){let x=String(o.D).match(ac)[1]||null;!x&&a.self&&a.self.location&&(x=a.self.location.protocol.slice(0,-1)),m=!$f.test(x?x.toLowerCase():"")}d=m}if(d)Le(o,"complete"),Le(o,"success");else{o.o=6;try{var A=Pt(o)>2?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.ca()+"]",_c(o)}}finally{os(o)}}}}function os(o,u){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,u||Le(o,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Pt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Pt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),vf(u)}};function Ec(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function qf(o){const u={};o=(o.g&&Pt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(_(o[m]))continue;var d=Pf(o[m]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=u[A]||[];u[A]=P,P.push(d)}vi(u,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ur(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Tc(o){this.za=0,this.i=[],this.j=new Zn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ur("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ur("baseRetryDelayMs",5e3,o),this.Za=ur("retryDelaySeedMs",1e4,o),this.Ta=ur("forwardChannelMaxRetries",2,o),this.va=ur("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new nc(o&&o.concurrentRequestLimit),this.Ba=new Bf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Tc.prototype,n.ka=8,n.I=1,n.connect=function(o,u,d,m){xe(0),this.W=o,this.H=u||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=bc(this,null,this.W),cs(this)};function Ui(o){if(vc(o),o.I==3){var u=o.V++,d=tt(o.J);if(ue(d,"SID",o.M),ue(d,"RID",u),ue(d,"TYPE","terminate"),lr(o,d),u=new At(o,o.j,u),u.M=2,u.A=ss(tt(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=u.A,d=!0),d||(u.g=kc(u.j,null),u.g.ea(u.A)),u.F=Date.now(),rs(u)}Cc(o)}function as(o){o.g&&($i(o),o.g.cancel(),o.g=null)}function vc(o){as(o),o.v&&(a.clearTimeout(o.v),o.v=null),us(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function cs(o){if(!rc(o.h)&&!o.m){o.m=!0;var u=o.Ea;J||g(),se||(J(),se=!0),E.add(u,o),o.D=0}}function Hf(o,u){return sc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=u.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Xn(h(o.Ea,o,u),Pc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new At(this,this.j,o);let P=this.o;if(this.U&&(P?(P=w(P),z(P,this.U)):P=this.U),this.u!==null||this.R||(A.J=P,P=null),this.S)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,u>4096){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=wc(this,A,u),d=tt(this.J),ue(d,"RID",o),ue(d,"CVER",22),this.G&&ue(d,"X-HTTP-Session-Id",this.G),lr(this,d),P&&(this.R?u="headers="+er(mc(P))+"&"+u:this.u&&Fi(d,this.u,P)),Li(this.h,A),this.Ra&&ue(d,"TYPE","init"),this.S?(ue(d,"$req",u),ue(d,"SID","null"),A.U=!0,Di(A,d,null)):Di(A,d,u),this.I=2}}else this.I==3&&(o?Ic(this,o):this.i.length==0||rc(this.h)||Ic(this))};function Ic(o,u){var d;u?d=u.l:d=o.V++;const m=tt(o.J);ue(m,"SID",o.M),ue(m,"RID",d),ue(m,"AID",o.K),lr(o,m),o.u&&o.o&&Fi(m,o.u,o.o),d=new At(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),u&&(o.i=u.G.concat(o.i)),u=wc(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Li(o.h,d),Di(d,m,u)}function lr(o,u){o.H&&Jt(o.H,function(d,m){ue(u,m,d)}),o.l&&Jt({},function(d,m){ue(u,m,d)})}function wc(o,u,d){d=Math.min(o.i.length,d);const m=o.l?h(o.l.Ka,o.l,o):null;e:{var A=o.i;let Q=-1;for(;;){const Te=["count="+d];Q==-1?d>0?(Q=A[0].g,Te.push("ofs="+Q)):Q=0:Te.push("ofs="+Q);let ae=!0;for(let we=0;we<d;we++){var P=A[we].g;const nt=A[we].map;if(P-=Q,P<0)Q=Math.max(0,A[we].g-100),ae=!1;else try{P="req"+P+"_"||"";try{var x=nt instanceof Map?nt:Object.entries(nt);for(const[tn,Ct]of x){let bt=Ct;c(Ct)&&(bt=Si(Ct)),Te.push(P+tn+"="+encodeURIComponent(bt))}}catch(tn){throw Te.push(P+"type="+encodeURIComponent("_badmap")),tn}}catch{m&&m(nt)}}if(ae){x=Te.join("&");break e}}x=void 0}return o=o.i.splice(0,d),u.G=o,x}function Ac(o){if(!o.g&&!o.v){o.Y=1;var u=o.Da;J||g(),se||(J(),se=!0),E.add(u,o),o.A=0}}function Bi(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Xn(h(o.Da,o),Pc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Rc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Xn(h(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,xe(10),as(this),Rc(this))};function $i(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Rc(o){o.g=new At(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var u=tt(o.na);ue(u,"RID","rpc"),ue(u,"SID",o.M),ue(u,"AID",o.K),ue(u,"CI",o.F?"0":"1"),!o.F&&o.ia&&ue(u,"TO",o.ia),ue(u,"TYPE","xmlhttp"),lr(o,u),o.u&&o.o&&Fi(u,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=ss(tt(u)),d.u=null,d.R=!0,Za(d,o)}n.Va=function(){this.C!=null&&(this.C=null,as(this),Bi(this),xe(19))};function us(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Sc(o,u){var d=null;if(o.g==u){us(o),$i(o),o.g=null;var m=2}else if(Oi(o.h,u))d=u.G,ic(o.h,u),m=1;else return;if(o.I!=0){if(u.o)if(m==1){d=u.u?u.u.length:0,u=Date.now()-u.F;var A=o.D;m=ts(),Le(m,new Ka(m,d)),cs(o)}else Ac(o);else if(A=u.m,A==3||A==0&&u.X>0||!(m==1&&Hf(o,u)||m==2&&Bi(o)))switch(d&&d.length>0&&(u=o.h,u.i=u.i.concat(d)),A){case 1:en(o,5);break;case 4:en(o,10);break;case 3:en(o,6);break;default:en(o,2)}}}function Pc(o,u){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*u}function en(o,u){if(o.j.info("Error code "+u),u==2){var d=h(o.bb,o),m=o.Ua;const A=!m;m=new Rt(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||nr(m,"https"),ss(m),A?Ff(m.toString(),d):Uf(m.toString(),d)}else xe(2);o.I=0,o.l&&o.l.pa(u),Cc(o),vc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),xe(2)):(this.j.info("Failed to ping google.com"),xe(1))};function Cc(o){if(o.I=0,o.ja=[],o.l){const u=oc(o.h);(u.length!=0||o.i.length!=0)&&(V(o.ja,u),V(o.ja,o.i),o.h.i.length=0,S(o.i),o.i.length=0),o.l.oa()}}function bc(o,u,d){var m=d instanceof Rt?tt(d):new Rt(d);if(m.g!="")u&&(m.g=u+"."+m.g),rr(m,m.u);else{var A=a.location;m=A.protocol,u=u?u+"."+A.hostname:A.hostname,A=+A.port;const P=new Rt(null);m&&nr(P,m),u&&(P.g=u),A&&rr(P,A),d&&(P.h=d),m=P}return d=o.G,u=o.wa,d&&u&&ue(m,d,u),ue(m,"VER",o.ka),lr(o,m),m}function kc(o,u,d){if(u&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Aa&&!o.ma?new fe(new Mi({ab:d})):new fe(o.ma),u.Fa(o.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Dc(){}n=Dc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function ls(){}ls.prototype.g=function(o,u){return new Be(o,u)};function Be(o,u){be.call(this),this.g=new Tc(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(o?o["X-WebChannel-Client-Profile"]=u.sa:o={"X-WebChannel-Client-Profile":u.sa}),this.g.U=o,(o=u&&u.Qb)&&!_(o)&&(this.g.u=o),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!_(u)&&(this.g.G=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new In(this)}p(Be,be),Be.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Be.prototype.close=function(){Ui(this.g)},Be.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=Si(o),o=d);u.i.push(new kf(u.Ya++,o)),u.I==3&&cs(u)},Be.prototype.N=function(){this.g.l=null,delete this.j,Ui(this.g),delete this.g,Be.Z.N.call(this)};function Vc(o){Pi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}p(Vc,Pi);function Nc(){Ci.call(this),this.status=1}p(Nc,Ci);function In(o){this.g=o}p(In,Dc),In.prototype.ra=function(){Le(this.g,"a")},In.prototype.qa=function(o){Le(this.g,new Vc(o))},In.prototype.pa=function(o){Le(this.g,new Nc)},In.prototype.oa=function(){Le(this.g,"b")},ls.prototype.createWebChannel=ls.prototype.g,Be.prototype.send=Be.prototype.o,Be.prototype.open=Be.prototype.m,Be.prototype.close=Be.prototype.close,ih=function(){return new ls},sh=function(){return ts()},rh=Yt,po={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ns.NO_ERROR=0,ns.TIMEOUT=8,ns.HTTP_ERROR=6,vs=ns,Qa.COMPLETE="complete",nh=Qa,Ha.EventType=Jn,Jn.OPEN="a",Jn.CLOSE="b",Jn.ERROR="c",Jn.MESSAGE="d",be.prototype.listen=be.prototype.J,_r=Ha,fe.prototype.listenOnce=fe.prototype.K,fe.prototype.getLastError=fe.prototype.Ha,fe.prototype.getLastErrorCode=fe.prototype.ya,fe.prototype.getStatus=fe.prototype.ca,fe.prototype.getResponseJson=fe.prototype.La,fe.prototype.getResponseText=fe.prototype.la,fe.prototype.send=fe.prototype.ea,fe.prototype.setWithCredentials=fe.prototype.Fa,th=fe}).apply(typeof fs<"u"?fs:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ve.UNAUTHENTICATED=new Ve(null),Ve.GOOGLE_CREDENTIALS=new Ve("google-credentials-uid"),Ve.FIRST_PARTY=new Ve("first-party-uid"),Ve.MOCK_USER=new Ve("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jn="12.14.0";function f_(n){jn=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=new jo("@firebase/firestore");function wn(){return un.logLevel}function M(n,...e){if(un.logLevel<=Z.DEBUG){const t=e.map(zo);un.debug(`Firestore (${jn}): ${n}`,...t)}}function yt(n,...e){if(un.logLevel<=Z.ERROR){const t=e.map(zo);un.error(`Firestore (${jn}): ${n}`,...t)}}function ln(n,...e){if(un.logLevel<=Z.WARN){const t=e.map(zo);un.warn(`Firestore (${jn}): ${n}`,...t)}}function zo(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,oh(n,r,t)}function oh(n,e,t){let r=`FIRESTORE (${jn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw yt(r),new Error(r)}function ie(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||oh(e,s,r)}function K(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class F extends It{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class p_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ve.UNAUTHENTICATED)))}shutdown(){}}class m_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class g_{constructor(e){this.t=e,this.currentUser=Ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ie(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new pt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new pt,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new pt)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ie(typeof r.accessToken=="string",31837,{l:r}),new ah(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ie(e===null||typeof e=="string",2055,{h:e}),new Ve(e)}}class __{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ve.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class y_{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new __(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ve.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class su{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class E_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,$e(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ie(this.o===void 0,3512);const r=i=>{i.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,M("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new su(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(ie(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new su(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=T_(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function Y(n,e){return n<e?-1:n>e?1:0}function mo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Zi(s)===Zi(i)?Y(s,i):Zi(s)?1:-1}return Y(n.length,e.length)}const v_=55296,I_=57343;function Zi(n){const e=n.charCodeAt(0);return e>=v_&&e<=I_}function On(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iu="__name__";class rt{constructor(e,t,r){t===void 0?t=0:t>e.length&&q(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&q(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return rt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof rt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=rt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return Y(e.length,t.length)}static compareSegments(e,t){const r=rt.isNumericId(e),s=rt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?rt.extractNumericId(e).compare(rt.extractNumericId(t)):mo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ft.fromString(e.substring(4,e.length-2))}}class ce extends rt{construct(e,t,r){return new ce(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new F(k.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new ce(t)}static emptyPath(){return new ce([])}}const w_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Pe extends rt{construct(e,t,r){return new Pe(e,t,r)}static isValidIdentifier(e){return w_.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Pe.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===iu}static keyField(){return new Pe([iu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new F(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new F(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new F(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new F(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Pe(t)}static emptyPath(){return new Pe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(ce.fromString(e))}static fromName(e){return new $(ce.fromString(e).popFirst(5))}static empty(){return new $(ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ce.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new ce(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ch(n,e,t){if(!t)throw new F(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function A_(n,e,t,r){if(e===!0&&r===!0)throw new F(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ou(n){if(!$.isDocumentKey(n))throw new F(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function au(n){if($.isDocumentKey(n))throw new F(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function uh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function si(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":q(12329,{type:typeof n})}function Et(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new F(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=si(n);throw new F(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(n,e){const t={typeString:n};return e&&(t.value=e),t}function Hr(n,e){if(!uh(n))throw new F(k.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new F(k.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu=-62135596800,uu=1e6;class le{static now(){return le.fromMillis(Date.now())}static fromDate(e){return le.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*uu);return new le(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new F(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new F(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<cu)throw new F(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/uu}_compareTo(e){return this.seconds===e.seconds?Y(this.nanoseconds,e.nanoseconds):Y(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:le._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Hr(e,le._jsonSchema))return new le(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-cu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}le._jsonSchemaVersion="firestore/timestamp/1.0",le._jsonSchema={type:ye("string",le._jsonSchemaVersion),seconds:ye("number"),nanoseconds:ye("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{static fromTimestamp(e){return new W(e)}static min(){return new W(new le(0,0))}static max(){return new W(new le(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr=-1;function R_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=W.fromTimestamp(r===1e9?new le(t+1,0):new le(t,r));return new Bt(s,$.empty(),e)}function S_(n){return new Bt(n.readTime,n.key,Cr)}class Bt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Bt(W.min(),$.empty(),Cr)}static max(){return new Bt(W.max(),$.empty(),Cr)}}function P_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:Y(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class b_{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qn(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==C_)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&q(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):D.reject(t)}static resolve(e){return new D(((t,r)=>{t(e)}))}static reject(e){return new D(((t,r)=>{r(e)}))}static waitFor(e){return new D(((t,r)=>{let s=0,i=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&t()}),(l=>r(l)))})),a=!0,i===s&&t()}))}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next((s=>s?D.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new D(((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next((f=>{a[h]=f,++c,c===i&&r(a)}),(f=>s(f)))}}))}static doWhile(e,t){return new D(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function k_(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Hn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ii.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go=-1;function oi(n){return n==null}function Ls(n){return n===0&&1/n==-1/0}function D_(n){return typeof n=="number"&&Number.isInteger(n)&&!Ls(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh="";function V_(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=lu(e)),e=N_(n.get(t),e);return lu(e)}function N_(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case lh:t+="";break;default:t+=i}}return t}function lu(n){return n+lh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function fn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function hh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,t){this.comparator=e,this.root=t||Se.EMPTY}insert(e,t){return new de(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Se.BLACK,null,null))}remove(e){return new de(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Se.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ps(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ps(this.root,e,this.comparator,!1)}getReverseIterator(){return new ps(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ps(this.root,e,this.comparator,!0)}}class ps{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Se{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Se.RED,this.left=s??Se.EMPTY,this.right=i??Se.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Se(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Se.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Se.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw q(43730,{key:this.key,value:this.value});if(this.right.isRed())throw q(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw q(27949);return e+(this.isRed()?0:1)}}Se.EMPTY=null,Se.RED=!0,Se.BLACK=!1;Se.EMPTY=new class{constructor(){this.size=0}get key(){throw q(57766)}get value(){throw q(16141)}get color(){throw q(16727)}get left(){throw q(29726)}get right(){throw q(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Se(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.comparator=e,this.data=new de(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new du(this.data.getIterator())}getIteratorFrom(e){return new du(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ve)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ve(this.comparator);return t.data=e,t}}class du{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.fields=e,e.sort(Pe.comparator)}static empty(){return new Ge([])}unionWith(e){let t=new ve(Pe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ge(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return On(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new dh("Invalid base64 string: "+i):i}})(e);return new Ce(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new Ce(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Y(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ce.EMPTY_BYTE_STRING=new Ce("");const O_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function $t(n){if(ie(!!n,39018),typeof n=="string"){let e=0;const t=O_.exec(n);if(ie(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:me(n.seconds),nanos:me(n.nanos)}}function me(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function jt(n){return typeof n=="string"?Ce.fromBase64String(n):Ce.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh="server_timestamp",ph="__type__",mh="__previous_value__",gh="__local_write_time__";function Ko(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[ph])==null?void 0:r.stringValue)===fh}function ai(n){const e=n.mapValue.fields[mh];return Ko(e)?ai(e):e}function br(n){const e=$t(n.mapValue.fields[gh].timestampValue);return new le(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L_{constructor(e,t,r,s,i,a,c,l,h,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=p}}const xs="(default)";class kr{constructor(e,t){this.projectId=e,this.database=t||xs}static empty(){return new kr("","")}get isDefaultDatabase(){return this.database===xs}isEqual(e){return e instanceof kr&&e.projectId===this.projectId&&e.database===this.database}}function x_(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new F(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new kr(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="__type__",M_="__max__",ms={mapValue:{}},yh="__vector__",Ms="value";function qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ko(n)?4:U_(n)?9007199254740991:F_(n)?10:11:q(28295,{value:n})}function ct(n,e){if(n===e)return!0;const t=qt(n);if(t!==qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return br(n).isEqual(br(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=$t(s.timestampValue),c=$t(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return jt(s.bytesValue).isEqual(jt(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return me(s.geoPointValue.latitude)===me(i.geoPointValue.latitude)&&me(s.geoPointValue.longitude)===me(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return me(s.integerValue)===me(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=me(s.doubleValue),c=me(i.doubleValue);return a===c?Ls(a)===Ls(c):isNaN(a)&&isNaN(c)}return!1})(n,e);case 9:return On(n.arrayValue.values||[],e.arrayValue.values||[],ct);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(hu(a)!==hu(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!ct(a[l],c[l])))return!1;return!0})(n,e);default:return q(52216,{left:n})}}function Dr(n,e){return(n.values||[]).find((t=>ct(t,e)))!==void 0}function Ln(n,e){if(n===e)return 0;const t=qt(n),r=qt(e);if(t!==r)return Y(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Y(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const c=me(i.integerValue||i.doubleValue),l=me(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(n,e);case 3:return fu(n.timestampValue,e.timestampValue);case 4:return fu(br(n),br(e));case 5:return mo(n.stringValue,e.stringValue);case 6:return(function(i,a){const c=jt(i),l=jt(a);return c.compareTo(l)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=Y(c[h],l[h]);if(f!==0)return f}return Y(c.length,l.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const c=Y(me(i.latitude),me(a.latitude));return c!==0?c:Y(me(i.longitude),me(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return pu(n.arrayValue,e.arrayValue);case 10:return(function(i,a){var T,S,V,N;const c=i.fields||{},l=a.fields||{},h=(T=c[Ms])==null?void 0:T.arrayValue,f=(S=l[Ms])==null?void 0:S.arrayValue,p=Y(((V=h==null?void 0:h.values)==null?void 0:V.length)||0,((N=f==null?void 0:f.values)==null?void 0:N.length)||0);return p!==0?p:pu(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===ms.mapValue&&a===ms.mapValue)return 0;if(i===ms.mapValue)return 1;if(a===ms.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const T=mo(l[p],f[p]);if(T!==0)return T;const S=Ln(c[l[p]],h[f[p]]);if(S!==0)return S}return Y(l.length,f.length)})(n.mapValue,e.mapValue);default:throw q(23264,{he:t})}}function fu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Y(n,e);const t=$t(n),r=$t(e),s=Y(t.seconds,r.seconds);return s!==0?s:Y(t.nanos,r.nanos)}function pu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Ln(t[s],r[s]);if(i)return i}return Y(t.length,r.length)}function xn(n){return go(n)}function go(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=$t(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return jt(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return $.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=go(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${go(t.fields[a])}`;return s+"}"})(n.mapValue):q(61005,{value:n})}function Is(n){switch(qt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ai(n);return e?16+Is(e):16;case 5:return 2*n.stringValue.length;case 6:return jt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Is(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return fn(r.fields,((i,a)=>{s+=i.length+Is(a)})),s})(n.mapValue);default:throw q(13486,{value:n})}}function mu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Vr(n){return!!n&&"integerValue"in n}function Eh(n){return Vr(n)||(function(t){return!!t&&"doubleValue"in t})(n)}function Qo(n){return!!n&&"arrayValue"in n}function gu(n){return!!n&&"nullValue"in n}function _u(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ws(n){return!!n&&"mapValue"in n}function F_(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[_h])==null?void 0:r.stringValue)===yh}function vr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return fn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=vr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=vr(n.arrayValue.values[t]);return e}return{...n}}function U_(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===M_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this.value=e}static empty(){return new qe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ws(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=vr(t)}setAll(e){let t=Pe.emptyPath(),r={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=vr(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ws(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ws(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){fn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new qe(vr(this.value))}}function Th(n){const e=[];return fn(n.fields,((t,r)=>{const s=new Pe([t]);if(ws(r)){const i=Th(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new Ge(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ne(e,0,W.min(),W.min(),W.min(),qe.empty(),0)}static newFoundDocument(e,t,r,s){return new Ne(e,1,t,W.min(),r,s,0)}static newNoDocument(e,t){return new Ne(e,2,t,W.min(),W.min(),qe.empty(),0)}static newUnknownDocument(e,t){return new Ne(e,3,t,W.min(),W.min(),qe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=qe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=qe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ne&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ne(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e,t){this.position=e,this.inclusive=t}}function yu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=$.comparator($.fromName(a.referenceValue),t.key):r=Ln(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Eu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ct(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,t="asc"){this.field=e,this.dir=t}}function B_(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{}class _e extends vh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new j_(e,t,r):t==="array-contains"?new z_(e,r):t==="in"?new W_(e,r):t==="not-in"?new G_(e,r):t==="array-contains-any"?new K_(e,r):new _e(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new q_(e,r):new H_(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Ln(t,this.value)):t!==null&&qt(this.value)===qt(t)&&this.matchesComparison(Ln(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return q(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class et extends vh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new et(e,t)}matches(e){return Ih(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ih(n){return n.op==="and"}function wh(n){return $_(n)&&Ih(n)}function $_(n){for(const e of n.filters)if(e instanceof et)return!1;return!0}function _o(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+xn(n.value);if(wh(n))return n.filters.map((e=>_o(e))).join(",");{const e=n.filters.map((t=>_o(t))).join(",");return`${n.op}(${e})`}}function Ah(n,e){return n instanceof _e?(function(r,s){return s instanceof _e&&r.op===s.op&&r.field.isEqual(s.field)&&ct(r.value,s.value)})(n,e):n instanceof et?(function(r,s){return s instanceof et&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,c)=>i&&Ah(a,s.filters[c])),!0):!1})(n,e):void q(19439)}function Rh(n){return n instanceof _e?(function(t){return`${t.field.canonicalString()} ${t.op} ${xn(t.value)}`})(n):n instanceof et?(function(t){return t.op.toString()+" {"+t.getFilters().map(Rh).join(" ,")+"}"})(n):"Filter"}class j_ extends _e{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class q_ extends _e{constructor(e,t){super(e,"in",t),this.keys=Sh("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class H_ extends _e{constructor(e,t){super(e,"not-in",t),this.keys=Sh("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Sh(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>$.fromName(r.referenceValue)))}class z_ extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Qo(t)&&Dr(t.arrayValue,this.value)}}class W_ extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Dr(this.value.arrayValue,t)}}class G_ extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(Dr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Dr(this.value.arrayValue,t)}}class K_ extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Qo(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Dr(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function Tu(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Q_(n,e,t,r,s,i,a)}function Jo(n){const e=K(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>_o(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),oi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>xn(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>xn(r))).join(",")),e.Te=t}return e.Te}function Yo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!B_(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ah(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Eu(n.startAt,e.startAt)&&Eu(n.endAt,e.endAt)}function yo(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function J_(n,e,t,r,s,i,a,c){return new zn(n,e,t,r,s,i,a,c)}function Xo(n){return new zn(n)}function vu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Y_(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Ph(n){return n.collectionGroup!==null}function Ir(n){const e=K(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ve(Pe.comparator);return a.filters.forEach((l=>{l.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Nr(i,r))})),t.has(Pe.keyField().canonicalString())||e.Ie.push(new Nr(Pe.keyField(),r))}return e.Ie}function st(n){const e=K(n);return e.Ee||(e.Ee=X_(e,Ir(n))),e.Ee}function X_(n,e){if(n.limitType==="F")return Tu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Nr(s.field,i)}));const t=n.endAt?new Fs(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Fs(n.startAt.position,n.startAt.inclusive):null;return Tu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Eo(n,e){const t=n.filters.concat([e]);return new zn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Z_(n,e){const t=n.explicitOrderBy.concat([e]);return new zn(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function To(n,e,t){return new zn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ci(n,e){return Yo(st(n),st(e))&&n.limitType===e.limitType}function Ch(n){return`${Jo(st(n))}|lt:${n.limitType}`}function An(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Rh(s))).join(", ")}]`),oi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>xn(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>xn(s))).join(",")),`Target(${r})`})(st(n))}; limitType=${n.limitType})`}function ui(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):$.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of Ir(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,c,l){const h=yu(a,c,l);return a.inclusive?h<=0:h<0})(r.startAt,Ir(r),s)||r.endAt&&!(function(a,c,l){const h=yu(a,c,l);return a.inclusive?h>=0:h>0})(r.endAt,Ir(r),s))})(n,e)}function ey(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function bh(n){return(e,t)=>{let r=!1;for(const s of Ir(n)){const i=ty(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function ty(n,e,t){const r=n.field.isKeyField()?$.comparator(e.key,t.key):(function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?Ln(l,h):q(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return q(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){fn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return hh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny=new de($.comparator);function Tt(){return ny}const kh=new de($.comparator);function yr(...n){let e=kh;for(const t of n)e=e.insert(t.key,t);return e}function Dh(n){let e=kh;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function rn(){return wr()}function Vh(){return wr()}function wr(){return new pn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const ry=new de($.comparator),sy=new ve($.comparator);function X(...n){let e=sy;for(const t of n)e=e.add(t);return e}const iy=new ve(Y);function oy(){return iy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ls(e)?"-0":e}}function Zo(n){return{integerValue:""+n}}function ay(n,e){return D_(e)?Zo(e):li(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(){this._=void 0}}function cy(n,e,t){return n instanceof Us?(function(s,i){const a={fields:{[ph]:{stringValue:fh},[gh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ko(i)&&(i=ai(i)),i&&(a.fields[mh]=i),{mapValue:a}})(t,e):n instanceof Or?Oh(n,e):n instanceof Lr?Lh(n,e):n instanceof xr?(function(s,i){const a=Nh(s,i),c=js(a)+js(s.Ae);return Vr(a)&&Vr(s.Ae)?Zo(c):li(s.serializer,c)})(n,e):n instanceof Bs?(function(s,i){return Iu(s,i,Math.min)})(n,e):n instanceof $s?(function(s,i){return Iu(s,i,Math.max)})(n,e):void 0}function uy(n,e,t){return n instanceof Or?Oh(n,e):n instanceof Lr?Lh(n,e):t}function Nh(n,e){return n instanceof xr?Eh(e)?e:{integerValue:0}:null}class Us extends hi{}class Or extends hi{constructor(e){super(),this.elements=e}}function Oh(n,e){const t=xh(e);for(const r of n.elements)t.some((s=>ct(s,r)))||t.push(r);return{arrayValue:{values:t}}}class Lr extends hi{constructor(e){super(),this.elements=e}}function Lh(n,e){let t=xh(e);for(const r of n.elements)t=t.filter((s=>!ct(s,r)));return{arrayValue:{values:t}}}class ea extends hi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}class xr extends ea{}class Bs extends ea{}class $s extends ea{}function Iu(n,e,t){if(!Eh(e))return n.Ae;const r=t(js(e),js(n.Ae));return Vr(e)&&Vr(n.Ae)?Zo(r):li(n.serializer,r)}function js(n){return me(n.integerValue||n.doubleValue)}function xh(n){return Qo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function ly(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Or&&s instanceof Or||r instanceof Lr&&s instanceof Lr?On(r.elements,s.elements,ct):r instanceof xr&&s instanceof xr||r instanceof Bs&&s instanceof Bs||r instanceof $s&&s instanceof $s?ct(r.Ae,s.Ae):r instanceof Us&&s instanceof Us})(n.transform,e.transform)}class hy{constructor(e,t){this.version=e,this.transformResults=t}}class Je{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Je}static exists(e){return new Je(void 0,e)}static updateTime(e){return new Je(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function As(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class di{}function Mh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ta(n.key,Je.none()):new zr(n.key,n.data,Je.none());{const t=n.data,r=qe.empty();let s=new ve(Pe.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new mn(n.key,r,new Ge(s.toArray()),Je.none())}}function dy(n,e,t){n instanceof zr?(function(s,i,a){const c=s.value.clone(),l=Au(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof mn?(function(s,i,a){if(!As(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Au(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Fh(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function Ar(n,e,t,r){return n instanceof zr?(function(i,a,c,l){if(!As(i.precondition,a))return c;const h=i.value.clone(),f=Ru(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof mn?(function(i,a,c,l){if(!As(i.precondition,a))return c;const h=Ru(i.fieldTransforms,l,a),f=a.data;return f.setAll(Fh(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,a,c){return As(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function fy(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Nh(r.transform,s||null);i!=null&&(t===null&&(t=qe.empty()),t.set(r.field,i))}return t||null}function wu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&On(r,s,((i,a)=>ly(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class zr extends di{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class mn extends di{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Fh(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Au(n,e,t){const r=new Map;ie(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,uy(a,c,t[s]))}return r}function Ru(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,cy(i,a,e))}return r}class ta extends di{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class py extends di{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&dy(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ar(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ar(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Vh();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const l=Mh(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(W.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),X())}isEqual(e){return this.batchId===e.batchId&&On(this.mutations,e.mutations,((t,r)=>wu(t,r)))&&On(this.baseMutations,e.baseMutations,((t,r)=>wu(t,r)))}}class na{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ie(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return ry})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new na(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _y{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge,te;function yy(n){switch(n){case k.OK:return q(64938);case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0;default:return q(15467,{code:n})}}function Uh(n){if(n===void 0)return yt("GRPC error has no .code"),k.UNKNOWN;switch(n){case ge.OK:return k.OK;case ge.CANCELLED:return k.CANCELLED;case ge.UNKNOWN:return k.UNKNOWN;case ge.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case ge.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case ge.INTERNAL:return k.INTERNAL;case ge.UNAVAILABLE:return k.UNAVAILABLE;case ge.UNAUTHENTICATED:return k.UNAUTHENTICATED;case ge.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case ge.NOT_FOUND:return k.NOT_FOUND;case ge.ALREADY_EXISTS:return k.ALREADY_EXISTS;case ge.PERMISSION_DENIED:return k.PERMISSION_DENIED;case ge.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case ge.ABORTED:return k.ABORTED;case ge.OUT_OF_RANGE:return k.OUT_OF_RANGE;case ge.UNIMPLEMENTED:return k.UNIMPLEMENTED;case ge.DATA_LOSS:return k.DATA_LOSS;default:return q(39323,{code:n})}}(te=ge||(ge={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ey(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ty=new Ft([4294967295,4294967295],0);function Su(n){const e=Ey().encode(n),t=new eh;return t.update(e),new Uint8Array(t.digest())}function Pu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ft([t,r],0),new Ft([s,i],0)]}class ra{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Er(`Invalid padding: ${t}`);if(r<0)throw new Er(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Er(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Er(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Ft.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Ft.fromNumber(r)));return s.compare(Ty)===1&&(s=new Ft([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Su(e),[r,s]=Pu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new ra(i,s,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=Su(e),[r,s]=Pu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Er extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Gr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Wr(W.min(),s,new de(Y),Tt(),X())}}class Gr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Gr(r,t,X(),X(),X())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Bh{constructor(e,t){this.targetId=e,this.Ce=t}}class $h{constructor(e,t,r=Ce.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Cu{constructor(e){this.targetId=e,this.ve=0,this.Fe=bu(),this.Me=Ce.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=X(),t=X(),r=X();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:q(38017,{changeType:i})}})),new Gr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=bu()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,ie(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const dr="WatchChangeAggregator";class vy{constructor(e){this.Ge=e,this.ze=new Map,this.je=Tt(),this.Je=gs(),this.He=gs(),this.Ze=new de(Y)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.ze.get(t);if(r)switch(e.state){case 0:this.nt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Le(e.resumeToken));break;default:q(56790,{state:e.state})}else M(dr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.nt(s)&&t(s)}))}it(e){const t=e.targetId,r=e.Ce.count,s=this.st(t);if(s){const i=s.target;if(yo(i))if(r===0){const a=new $(i.path);this.et(t,a,Ne.newNoDocument(a,W.min()))}else ie(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const c=this._t(e),l=c?this.ut(c,e,a):1;if(l!==0){this.rt(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}_t(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=jt(r).toUint8Array()}catch(l){if(l instanceof dh)return ln("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new ra(a,s,i)}catch(l){return ln(l instanceof Er?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ut(e,t,r){return t.Ce.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Pt(e){const t=new Map;this.ze.forEach(((i,a)=>{const c=this.st(a);if(c){if(i.current&&yo(c.target)){const l=new $(c.target.path);this.Tt(l).has(a)||this.It(a,l)||this.et(a,l,Ne.newNoDocument(l,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=X();this.He.forEach(((i,a)=>{let c=!0;a.forEachWhile((l=>{const h=this.st(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new Wr(e,t,this.Ze,this.je,r);return this.je=Tt(),this.Je=gs(),this.He=gs(),this.Ze=new de(Y),s}Ye(e,t){const r=this.ze.get(e);if(!r||!this.nt(e))return void M(dr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.It(e,t.key)?2:0;r.Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Tt(t.key).add(e)),this.He=this.He.insert(t.key,this.Et(t.key).add(e))}et(e,t,r){const s=this.ze.get(e);s&&this.nt(e)?(this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Et(t).delete(e)),this.He=this.He.insert(t,this.Et(t).add(e)),r&&(this.je=this.je.insert(t,r))):M(dr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ze.delete(e)}ot(e){const t=this.ze.get(e);if(!t)return 0;const r=t.ke();return this.Ge.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}$e(e){let t=this.ze.get(e);t||(M(dr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Cu(e),this.ze.set(e,t)),t.$e()}Et(e){let t=this.He.get(e);return t||(t=new ve(Y),this.He=this.He.insert(e,t)),t}Tt(e){let t=this.Je.get(e);return t||(t=new ve(Y),this.Je=this.Je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||M(dr,"Detected inactive target",e),t}st(e){const t=this.ze.get(e);return t===void 0||t.Ne?null:this.Ge.Rt(e)}rt(e){this.ze.set(e,new Cu(e)),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function gs(){return new de($.comparator)}function bu(){return new de($.comparator)}const Iy={asc:"ASCENDING",desc:"DESCENDING"},wy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ay={and:"AND",or:"OR"};class Ry{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function vo(n,e){return n.useProto3Json||oi(e)?e:{value:e}}function qs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function jh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Sy(n,e){return qs(n,e.toTimestamp())}function it(n){return ie(!!n,49232),W.fromTimestamp((function(t){const r=$t(t);return new le(r.seconds,r.nanos)})(n))}function sa(n,e){return Io(n,e).canonicalString()}function Io(n,e){const t=(function(s){return new ce(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function qh(n){const e=ce.fromString(n);return ie(Kh(e),10190,{key:e.toString()}),e}function wo(n,e){return sa(n.databaseId,e.path)}function eo(n,e){const t=qh(e);if(t.get(1)!==n.databaseId.projectId)throw new F(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new F(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(zh(t))}function Hh(n,e){return sa(n.databaseId,e)}function Py(n){const e=qh(n);return e.length===4?ce.emptyPath():zh(e)}function Ao(n){return new ce(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function zh(n){return ie(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function ku(n,e,t){return{name:wo(n,e),fields:t.value.mapValue.fields}}function Cy(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:q(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(ie(f===void 0||typeof f=="string",58123),Ce.fromBase64String(f||"")):(ie(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ce.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(h){const f=h.code===void 0?k.UNKNOWN:Uh(h.code);return new F(f,h.message||"")})(a);t=new $h(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=eo(n,r.document.name),i=it(r.document.updateTime),a=r.document.createTime?it(r.document.createTime):W.min(),c=new qe({mapValue:{fields:r.document.fields}}),l=Ne.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new Rs(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=eo(n,r.document),i=r.readTime?it(r.readTime):W.min(),a=Ne.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Rs([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=eo(n,r.document),i=r.removedTargetIds||[];t=new Rs([],i,s,null)}else{if(!("filter"in e))return q(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new _y(s,i),c=r.targetId;t=new Bh(c,a)}}return t}function by(n,e){let t;if(e instanceof zr)t={update:ku(n,e.key,e.value)};else if(e instanceof ta)t={delete:wo(n,e.key)};else if(e instanceof mn)t={update:ku(n,e.key,e.data),updateMask:Fy(e.fieldMask)};else{if(!(e instanceof py))return q(16599,{Vt:e.type});t={verify:wo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const c=a.transform;if(c instanceof Us)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Or)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Lr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof xr)return{fieldPath:a.field.canonicalString(),increment:c.Ae};if(c instanceof Bs)return{fieldPath:a.field.canonicalString(),minimum:c.Ae};if(c instanceof $s)return{fieldPath:a.field.canonicalString(),maximum:c.Ae};throw q(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Sy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:q(27497)})(n,e.precondition)),t}function ky(n,e){return n&&n.length>0?(ie(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?it(s.updateTime):it(i);return a.isEqual(W.min())&&(a=it(i)),new hy(a,s.transformResults||[])})(t,e)))):[]}function Dy(n,e){return{documents:[Hh(n,e.path)]}}function Vy(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Hh(n,s);const i=(function(h){if(h.length!==0)return Gh(et.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(T){return{field:Rn(T.field),direction:Ly(T.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=vo(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{dt:t,parent:s}}function Ny(n){let e=Py(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ie(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const T=Wh(p);return T instanceof et&&wh(T)?T.getFilters():[T]})(t.where));let a=[];t.orderBy&&(a=(function(p){return p.map((T=>(function(V){return new Nr(Sn(V.field),(function(b){switch(b){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(V.direction))})(T)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let T;return T=typeof p=="object"?p.value:p,oi(T)?null:T})(t.limit));let l=null;t.startAt&&(l=(function(p){const T=!!p.before,S=p.values||[];return new Fs(S,T)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const T=!p.before,S=p.values||[];return new Fs(S,T)})(t.endAt)),J_(e,s,a,i,c,"F",l,h)}function Oy(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return q(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Wh(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Sn(t.unaryFilter.field);return _e.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Sn(t.unaryFilter.field);return _e.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Sn(t.unaryFilter.field);return _e.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Sn(t.unaryFilter.field);return _e.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return q(61313);default:return q(60726)}})(n):n.fieldFilter!==void 0?(function(t){return _e.create(Sn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return q(58110);default:return q(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return et.create(t.compositeFilter.filters.map((r=>Wh(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return q(1026)}})(t.compositeFilter.op))})(n):q(30097,{filter:n})}function Ly(n){return Iy[n]}function xy(n){return wy[n]}function My(n){return Ay[n]}function Rn(n){return{fieldPath:n.canonicalString()}}function Sn(n){return Pe.fromServerFormat(n.fieldPath)}function Gh(n){return n instanceof _e?(function(t){if(t.op==="=="){if(_u(t.value))return{unaryFilter:{field:Rn(t.field),op:"IS_NAN"}};if(gu(t.value))return{unaryFilter:{field:Rn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(_u(t.value))return{unaryFilter:{field:Rn(t.field),op:"IS_NOT_NAN"}};if(gu(t.value))return{unaryFilter:{field:Rn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Rn(t.field),op:xy(t.op),value:t.value}}})(n):n instanceof et?(function(t){const r=t.getFilters().map((s=>Gh(s)));return r.length===1?r[0]:{compositeFilter:{op:My(t.op),filters:r}}})(n):q(54877,{filter:n})}function Fy(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Kh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Qh(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,t,r,s,i=W.min(),a=W.min(),c=Ce.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new ht(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ht(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uy{constructor(e){this.gt=e}}function By(n){const e=Ny({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?To(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(){this.Sn=new jy}addToCollectionParentIndex(e,t){return this.Sn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(Bt.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(Bt.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class jy{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ve(ce.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ve(ce.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Jh=41943040;class Ue{static withCacheSize(e){return new Ue(e,Ue.DEFAULT_COLLECTION_PERCENTILE,Ue.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ue.DEFAULT_COLLECTION_PERCENTILE=10,Ue.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ue.DEFAULT=new Ue(Jh,Ue.DEFAULT_COLLECTION_PERCENTILE,Ue.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ue.DISABLED=new Ue(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e){this.ir=e}next(){return this.ir+=2,this.ir}static sr(){return new Ht(0)}static _r(){return new Ht(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu="LruGarbageCollector",qy=1048576;function Nu([n,e],[t,r]){const s=Y(n,t);return s===0?Y(e,r):s}class Hy{constructor(e){this.hr=e,this.buffer=new ve(Nu),this.Pr=0}Tr(){return++this.Pr}Ir(e){const t=[e,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Nu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class zy{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(e){M(Vu,`Garbage collection scheduled in ${e}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Hn(t)?M(Vu,"Ignoring IndexedDB error during garbage collection: ",t):await qn(t)}await this.Rr(3e5)}))}}class Wy{constructor(e,t){this.Ar=e,this.params=t}calculateTargetCount(e,t){return this.Ar.Vr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return D.resolve(ii.ce);const r=new Hy(t);return this.Ar.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Ar.dr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Ar.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ar.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(M("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(Du)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Du):this.mr(e,t)))}getCacheSize(e){return this.Ar.getCacheSize(e)}mr(e,t){let r,s,i,a,c,l,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(h=Date.now(),wn()<=Z.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function Gy(n,e){return new Wy(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky{constructor(){this.changes=new pn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ne.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jy{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Ar(r.mutation,s,Ge.empty(),le.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,X()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=X()){const s=rn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=yr();return i.forEach(((c,l)=>{a=a.insert(c,l.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=rn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,X())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,s){let i=Tt();const a=wr(),c=(function(){return wr()})();return t.forEach(((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof mn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Ar(f.mutation,h,f.mutation.getFieldMask(),le.now())):a.set(h.key,Ge.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((h,f)=>a.set(h,f))),t.forEach(((h,f)=>c.set(h,new Qy(f,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=wr();let s=new de(((a,c)=>a-c)),i=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((l=>{const h=t.get(l);if(h===null)return;let f=r.get(l)||Ge.empty();f=c.applyToLocalView(h,f),r.set(l,f);const p=(s.get(c.batchId)||X()).add(l);s=s.insert(c.batchId,p)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,p=Vh();f.forEach((T=>{if(!i.has(T)){const S=Mh(t.get(T),r.get(T));S!==null&&p.set(T,S),i=i.add(T)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return D.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return Y_(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ph(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(rn());let c=Cr,l=i;return a.next((h=>D.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?D.resolve():this.remoteDocumentCache.getEntry(e,f).next((T=>{l=l.insert(f,T)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,l,h,X()))).next((f=>({batchId:c,changes:Dh(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next((r=>{let s=yr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=yr();return this.indexManager.getCollectionParents(e,i).next((c=>D.forEach(c,(l=>{const h=(function(p,T){return new zn(T,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((p,T)=>{a=a.insert(p,T)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((l,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Ne.newInvalidDocument(f)))}));let c=yr();return a.forEach(((l,h)=>{const f=i.get(l);f!==void 0&&Ar(f.mutation,h,Ge.empty(),le.now()),ui(t,h)&&(c=c.insert(l,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e){this.serializer=e,this.Or=new Map,this.Nr=new Map}getBundleMetadata(e,t){return D.resolve(this.Or.get(t))}saveBundleMetadata(e,t){return this.Or.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:it(s.createTime)}})(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Nr.get(t))}saveNamedQuery(e,t){return this.Nr.set(t.name,(function(s){return{name:s.name,query:By(s.bundledQuery),readTime:it(s.readTime)}})(t)),D.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(){this.overlays=new de($.comparator),this.Br=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=rn();return D.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.wt(e,t,i)})),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Br.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Br.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=rn(),i=t.length+1,a=new $(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new de(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=rn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=rn(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return D.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(r.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new gy(t,r));let i=this.Br.get(t);i===void 0&&(i=X(),this.Br.set(t,i)),this.Br.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(){this.sessionToken=Ce.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(){this.Lr=new ve(Ae.kr),this.qr=new ve(Ae.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(e,t){const r=new Ae(e,t);this.Lr=this.Lr.add(r),this.qr=this.qr.add(r)}Ur(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.$r(new Ae(e,t))}Wr(e,t){e.forEach((r=>this.removeReference(r,t)))}Qr(e){const t=new $(new ce([])),r=new Ae(t,e),s=new Ae(t,e+1),i=[];return this.qr.forEachInRange([r,s],(a=>{this.$r(a),i.push(a.key)})),i}Gr(){this.Lr.forEach((e=>this.$r(e)))}$r(e){this.Lr=this.Lr.delete(e),this.qr=this.qr.delete(e)}zr(e){const t=new $(new ce([])),r=new Ae(t,e),s=new Ae(t,e+1);let i=X();return this.qr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new Ae(e,0),r=this.Lr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ae{constructor(e,t){this.key=e,this.jr=t}static kr(e,t){return $.comparator(e.key,t.key)||Y(e.jr,t.jr)}static Kr(e,t){return Y(e.jr,t.jr)||$.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Xn=1,this.Jr=new ve(Ae.kr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new my(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Jr=this.Jr.add(new Ae(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(a)}lookupMutationBatch(e,t){return D.resolve(this.Hr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Zr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?Go:this.Xn-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ae(t,0),s=new Ae(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([r,s],(a=>{const c=this.Hr(a.jr);i.push(c)})),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ve(Y);return t.forEach((s=>{const i=new Ae(s,0),a=new Ae(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],(c=>{r=r.add(c.jr)}))})),D.resolve(this.Xr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;$.isDocumentKey(i)||(i=i.child(""));const a=new Ae(new $(i),0);let c=new ve(Y);return this.Jr.forEachWhile((l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.jr)),!0)}),a),D.resolve(this.Xr(c))}Xr(e){const t=[];return e.forEach((r=>{const s=this.Hr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){ie(this.Yr(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return D.forEach(t.mutations,(s=>{const i=new Ae(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Jr=r}))}tr(e){}containsKey(e,t){const r=new Ae(t,0),s=this.Jr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Yr(e,t){return this.Zr(e)}Zr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Hr(e){const t=this.Zr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e){this.ei=e,this.docs=(function(){return new de($.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ei(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Ne.newInvalidDocument(t))}getEntries(e,t){let r=Tt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ne.newInvalidDocument(s))})),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Tt();const a=t.path,c=new $(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||P_(S_(f),r)<=0||(s.has(f.key)||ui(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){q(9500)}ti(e,t){return D.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new nE(this)}getSize(e){return D.resolve(this.size)}}class nE extends Ky{constructor(e){super(),this.Fr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Fr.addEntry(e,s)):this.Fr.removeEntry(r)})),D.waitFor(t)}getFromCache(e,t){return this.Fr.getEntry(e,t)}getAllFromCache(e,t){return this.Fr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e){this.persistence=e,this.ni=new pn((t=>Jo(t)),Yo),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.ri=0,this.ii=new ia,this.targetCount=0,this.si=Ht.sr()}forEachTarget(e,t){return this.ni.forEach(((r,s)=>t(s))),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.ri)}allocateTargetId(e){return this.highestTargetId=this.si.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ri&&(this.ri=t),D.resolve()}cr(e){this.ni.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.si=new Ht(t),this.highestTargetId=t),e.sequenceNumber>this.ri&&(this.ri=e.sequenceNumber)}addTargetData(e,t){return this.cr(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.cr(t),D.resolve()}removeTargetData(e,t){return this.ni.delete(t.target),this.ii.Qr(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ni.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ni.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),D.waitFor(i).next((()=>s))}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.ni.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.ii.Ur(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.ii.Wr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ii.Qr(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ii.zr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.ii.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(e,t){this.oi={},this.overlays={},this._i=new ii(0),this.ai=!1,this.ai=!0,this.ui=new Zy,this.referenceDelegate=e(this),this.ci=new rE(this),this.indexManager=new $y,this.remoteDocumentCache=(function(s){return new tE(s)})((r=>this.referenceDelegate.li(r))),this.serializer=new Uy(t),this.hi=new Yy(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Xy,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.oi[e.toKey()];return r||(r=new eE(t,this.referenceDelegate),this.oi[e.toKey()]=r),r}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);const s=new sE(this._i.next());return this.referenceDelegate.Pi(),r(s).next((i=>this.referenceDelegate.Ti(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return D.or(Object.values(this.oi).map((r=>()=>r.containsKey(e,t))))}}class sE extends b_{constructor(e){super(),this.currentSequenceNumber=e}}class oa{constructor(e){this.persistence=e,this.Ei=new ia,this.Ri=null}static Ai(e){return new oa(e)}get Vi(){if(this.Ri)return this.Ri;throw q(60996)}addReference(e,t,r){return this.Ei.addReference(r,t),this.Vi.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.Ei.removeReference(r,t),this.Vi.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.Vi.add(t.toString()),D.resolve()}removeTarget(e,t){this.Ei.Qr(t.targetId).forEach((s=>this.Vi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Vi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Pi(){this.Ri=new Set}Ti(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.Vi,(r=>{const s=$.fromPath(r);return this.di(e,s).next((i=>{i||t.removeEntry(s,W.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.di(e,t).next((r=>{r?this.Vi.delete(t.toString()):this.Vi.add(t.toString())}))}li(e){return 0}di(e,t){return D.or([()=>D.resolve(this.Ei.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Hs{constructor(e,t){this.persistence=e,this.mi=new pn((r=>V_(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Gy(this,t)}static Ai(e,t){return new Hs(e,t)}Pi(){}Ti(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Vr(e){const t=this.gr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}gr(e){let t=0;return this.dr(e,(r=>{t++})).next((()=>t))}dr(e,t){return D.forEach(this.mi,((r,s)=>this.yr(e,r,s).next((i=>i?D.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(e,(a=>this.yr(e,a,t).next((c=>{c||(r++,i.removeEntry(a,W.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.mi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.mi.set(t,e.currentSequenceNumber),D.resolve()}li(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Is(e.data.value)),t}yr(e,t,r){return D.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.mi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ps=r,this.Ts=s}static Is(e,t){let r=X(),s=X();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new aa(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=(function(){return Km()?8:k_(Oe())>0?6:4})()}initialize(e,t){this.ds=e,this.indexManager=t,this.Es=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.fs(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.gs(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new iE;return this.ps(e,t,a).next((c=>{if(i.result=c,this.Rs)return this.ys(e,t,a,c.size)}))})).next((()=>i.result))}ys(e,t,r,s){return r.documentReadCount<this.As?(wn()<=Z.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",An(t),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),D.resolve()):(wn()<=Z.DEBUG&&M("QueryEngine","Query:",An(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Vs*s?(wn()<=Z.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",An(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,st(t))):D.resolve())}fs(e,t){if(vu(t))return D.resolve(null);let r=st(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=To(t,null,"F"),r=st(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=X(...i);return this.ds.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,r).next((l=>{const h=this.ws(t,c);return this.Ss(t,h,a,l.readTime)?this.fs(e,To(t,null,"F")):this.bs(e,h,t,l)}))))})))))}gs(e,t,r,s){return vu(t)||s.isEqual(W.min())?D.resolve(null):this.ds.getDocuments(e,r).next((i=>{const a=this.ws(t,i);return this.Ss(t,a,r,s)?D.resolve(null):(wn()<=Z.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),An(t)),this.bs(e,a,t,R_(s,Cr)).next((c=>c)))}))}ws(e,t){let r=new ve(bh(e));return t.forEach(((s,i)=>{ui(e,i)&&(r=r.add(i))})),r}Ss(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(e,t,r){return wn()<=Z.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",An(t)),this.ds.getDocumentsMatchingQuery(e,t,Bt.min(),r)}bs(e,t,r,s){return this.ds.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ca="LocalStore",aE=3e8;class cE{constructor(e,t,r,s){this.persistence=e,this.Ds=t,this.serializer=s,this.Cs=new de(Y),this.vs=new pn((i=>Jo(i)),Yo),this.Fs=new Map,this.Ms=e.getRemoteDocumentCache(),this.ci=e.getTargetCache(),this.hi=e.getBundleCache(),this.xs(r)}xs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Jy(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Cs)))}}function uE(n,e,t,r){return new cE(n,e,t,r)}async function Xh(n,e){const t=K(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.xs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],c=[];let l=X();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(r,l).next((h=>({Os:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function lE(n,e){const t=K(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Ms.newChangeBuffer({trackRemovals:!0});return(function(c,l,h,f){const p=h.batch,T=p.keys();let S=D.resolve();return T.forEach((V=>{S=S.next((()=>f.getEntry(l,V))).next((N=>{const b=h.docVersions.get(V);ie(b!==null,48541),N.version.compareTo(b)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))}))})),S.next((()=>c.mutationQueue.removeMutationBatch(l,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let l=X();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Zh(n){const e=K(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.ci.getLastRemoteSnapshotVersion(t)))}function hE(n,e){const t=K(n),r=e.snapshotVersion;let s=t.Cs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Ms.newChangeBuffer({trackRemovals:!0});s=t.Cs;const c=[];e.targetChanges.forEach(((f,p)=>{const T=s.get(p);if(!T)return;c.push(t.ci.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.ci.addMatchingKeys(i,f.addedDocuments,p))));let S=T.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?S=S.withResumeToken(Ce.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),s=s.insert(p,S),(function(N,b,O){return N.resumeToken.approximateByteSize()===0||b.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=aE?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0})(T,S,f)&&c.push(t.ci.updateTargetData(i,S))}));let l=Tt(),h=X();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(dE(i,a,e.documentUpdates).next((f=>{l=f.Ns,h=f.Bs}))),!r.isEqual(W.min())){const f=t.ci.getLastRemoteSnapshotVersion(i).next((p=>t.ci.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return D.waitFor(c).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,l,h))).next((()=>l))})).then((i=>(t.Cs=s,i)))}function dE(n,e,t){let r=X(),s=X();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=Tt();return t.forEach(((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(W.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):M(ca,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)})),{Ns:a,Bs:s}}))}function fE(n,e){const t=K(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Go),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function pE(n,e){const t=K(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.ci.getTargetData(r,e).next((i=>i?(s=i,D.resolve(s)):t.ci.allocateTargetId(r).next((a=>(s=new ht(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.ci.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Cs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Cs=t.Cs.insert(r.targetId,r),t.vs.set(e,r.targetId)),r}))}async function Ro(n,e,t){const r=K(n),s=r.Cs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Hn(a))throw a;M(ca,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Cs=r.Cs.remove(e),r.vs.delete(s.target)}function Ou(n,e,t){const r=K(n);let s=W.min(),i=X();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(l,h,f){const p=K(l),T=p.vs.get(f);return T!==void 0?D.resolve(p.Cs.get(T)):p.ci.getTargetData(h,f)})(r,a,st(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(a,c.targetId).next((l=>{i=l}))})).next((()=>r.Ds.getDocumentsMatchingQuery(a,e,t?s:W.min(),t?i:X()))).next((c=>(mE(r,ey(e),c),{documents:c,Ls:i})))))}function mE(n,e,t){let r=n.Fs.get(e)||W.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Fs.set(e,r)}class Lu{constructor(){this.activeTargetIds=oy()}Ws(e){this.activeTargetIds=this.activeTargetIds.add(e)}Qs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}$s(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class gE{constructor(){this.Co=new Lu,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Co.Ws(e),this.vo[e]||"not-current"}updateQueryState(e,t,r){this.vo[e]=t}removeLocalQueryTarget(e){this.Co.Qs(e)}isLocalQueryTarget(e){return this.Co.activeTargetIds.has(e)}clearQueryState(e){delete this.vo[e]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(e){return this.Co.activeTargetIds.has(e)}start(){return this.Co=new Lu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _E{Fo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu="ConnectivityMonitor";class Mu{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(e){this.Bo.push(e)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){M(xu,"Network connectivity changed: AVAILABLE");for(const e of this.Bo)e(0)}No(){M(xu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Bo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _s=null;function So(){return _s===null?_s=(function(){return 268435456+Math.round(2147483648*Math.random())})():_s++,"0x"+_s.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to="RestConnection",yE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class EE{get ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Uo=this.databaseId.database===xs?`project_id=${r}`:`project_id=${r}&database_id=${s}`}$o(e,t,r,s,i){const a=So(),c=this.Wo(e,t.toUriEncodedString());M(to,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(l,s,i);const{host:h}=new URL(c),f=qr(h);return this.Go(e,c,l,r,f).then((p=>(M(to,`Received RPC '${e}' ${a}: `,p),p)),(p=>{throw ln(to,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",r),p}))}zo(e,t,r,s,i,a){return this.$o(e,t,r,s,i)}Qo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+jn})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Wo(e,t){const r=yE[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e){this.jo=e.jo,this.Jo=e.Jo}Ho(e){this.Zo=e}Xo(e){this.Yo=e}e_(e){this.t_=e}onMessage(e){this.n_=e}close(){this.Jo()}send(e){this.jo(e)}r_(){this.Zo()}i_(){this.Yo()}s_(e){this.t_(e)}o_(e){this.n_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="WebChannelConnection",fr=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Pn extends EE{constructor(e){super(e),this.__=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static a_(){if(!Pn.u_){const e=sh();fr(e,rh.STAT_EVENT,(t=>{t.stat===po.PROXY?M(De,"STAT_EVENT: detected buffering proxy"):t.stat===po.NOPROXY&&M(De,"STAT_EVENT: detected no buffering proxy")})),Pn.u_=!0}}Go(e,t,r,s,i){const a=So();return new Promise(((c,l)=>{const h=new th;h.setWithCredentials(!0),h.listenOnce(nh.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case vs.NO_ERROR:const p=h.getResponseJson();M(De,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case vs.TIMEOUT:M(De,`RPC '${e}' ${a} timed out`),l(new F(k.DEADLINE_EXCEEDED,"Request time out"));break;case vs.HTTP_ERROR:const T=h.getStatus();if(M(De,`RPC '${e}' ${a} failed with status:`,T,"response text:",h.getResponseText()),T>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const V=S==null?void 0:S.error;if(V&&V.status&&V.message){const N=(function(O){const U=O.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(U)>=0?U:k.UNKNOWN})(V.status);l(new F(N,V.message))}else l(new F(k.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new F(k.UNAVAILABLE,"Connection failed."));break;default:q(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{M(De,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(s);M(De,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)}))}P_(e,t,r){const s=So(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Qo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=i.join("");M(De,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=a.createWebChannel(h,c);this.T_(f);let p=!1,T=!1;const S=new TE({jo:V=>{T?M(De,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(p||(M(De,`Opening RPC '${e}' stream ${s} transport.`),f.open(),p=!0),M(De,`RPC '${e}' stream ${s} sending:`,V),f.send(V))},Jo:()=>f.close()});return fr(f,_r.EventType.OPEN,(()=>{T||(M(De,`RPC '${e}' stream ${s} transport opened.`),S.r_())})),fr(f,_r.EventType.CLOSE,(()=>{T||(T=!0,M(De,`RPC '${e}' stream ${s} transport closed`),S.s_(),this.I_(f))})),fr(f,_r.EventType.ERROR,(V=>{T||(T=!0,ln(De,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),S.s_(new F(k.UNAVAILABLE,"The operation could not be completed")))})),fr(f,_r.EventType.MESSAGE,(V=>{var N;if(!T){const b=V.data[0];ie(!!b,16349);const O=b,U=(O==null?void 0:O.error)||((N=O[0])==null?void 0:N.error);if(U){M(De,`RPC '${e}' stream ${s} received error:`,U);const B=U.status;let ne=(function(E){const g=ge[E];if(g!==void 0)return Uh(g)})(B),J=U.message;B==="NOT_FOUND"&&J.includes("database")&&J.includes("does not exist")&&J.includes(this.databaseId.database)&&ln(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ne===void 0&&(ne=k.INTERNAL,J="Unknown error status: "+B+" with message "+U.message),T=!0,S.s_(new F(ne,J)),f.close()}else M(De,`RPC '${e}' stream ${s} received:`,b),S.o_(b)}})),Pn.a_(),setTimeout((()=>{S.i_()}),0),S}terminate(){this.__.forEach((e=>e.close())),this.__=[]}T_(e){this.__.push(e)}I_(e){this.__=this.__.filter((t=>t===e))}Qo(e,t,r){super.Qo(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ih()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vE(n){return new Pn(n)}function no(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fi(n){return new Ry(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Pn.u_=!1;class ed{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Di=e,this.timerId=t,this.E_=r,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const t=Math.floor(this.V_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&M("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu="PersistentStream";class td{constructor(e,t,r,s,i,a,c,l){this.Di=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new ed(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(e,t){this.q_(),this.K_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(yt(t.toString()),yt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.e_(t)}U_(){}auth(){this.state=1;const e=this.W_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===t&&this.Q_(r,s)}),(r=>{e((()=>{const s=new F(k.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}Q_(e,t){const r=this.W_(this.b_);this.stream=this.z_(e,t),this.stream.Ho((()=>{r((()=>this.listener.Ho()))})),this.stream.Xo((()=>{r((()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.Xo())))})),this.stream.e_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.v_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return M(Fu,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Di.enqueueAndForget((()=>this.b_===e?t():(M(Fu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class IE extends td{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=Cy(this.serializer,e),r=(function(i){if(!("targetChange"in i))return W.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?W.min():a.readTime?it(a.readTime):W.min()})(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Ao(this.serializer),t.addTarget=(function(i,a){let c;const l=a.target;if(c=yo(l)?{documents:Dy(i,l)}:{query:Vy(i,l).dt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=jh(i,a.resumeToken);const h=vo(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(W.min())>0){c.readTime=qs(i,a.snapshotVersion.toTimestamp());const h=vo(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=Oy(this.serializer,e);r&&(t.labels=r),this.k_(t)}Z_(e){const t={};t.database=Ao(this.serializer),t.removeTarget=e,this.k_(t)}}class wE extends td{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return ie(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ie(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){ie(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=ky(e.writeResults,e.commitTime),r=it(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=Ao(this.serializer),this.k_(e)}Y_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>by(this.serializer,r)))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{}class RE extends AE{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new F(k.FAILED_PRECONDITION,"The client has already been terminated.")}$o(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.$o(e,Io(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new F(k.UNKNOWN,i.toString())}))}zo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.zo(e,Io(t,r),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new F(k.UNKNOWN,a.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}function SE(n,e,t,r){return new RE(n,e,t,r)}class PE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(yt(t),this._a=!1):M("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="RemoteStore";class CE{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new Ht(1e3),this.Aa=new Ht(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo((a=>{r.enqueueAndForget((async()=>{gn(this)&&(M(ut,"Restarting streams for network reachability change."),await(async function(l){const h=K(l);h.Va.add(4),await Kr(h),h.fa.set("Unknown"),h.Va.delete(4),await pi(h)})(this))}))})),this.fa=new PE(r,s)}}async function pi(n){if(gn(n))for(const e of n.da)await e(!0)}async function Kr(n){for(const e of n.da)await e(!1)}function Po(n,e){return n.Ia.get(e)||void 0}function nd(n,e){const t=K(n),r=Po(t,e.targetId);if(r!==void 0&&t.Ta.has(r))return;const s=(function(c,l){const h=Po(c,l);h!==void 0&&c.Ea.delete(h);const f=(function(T,S){return S%2!=0?T.Aa.next():T.Ra.next()})(c,l);return c.Ia.set(l,f),c.Ea.set(f,l),f})(t,e.targetId);M(ut,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new ht(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ta.set(s,i),da(t)?ha(t):Wn(t).x_()&&la(t,i)}function ua(n,e){const t=K(n),r=Wn(t),s=Po(t,e);M(ut,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ta.delete(s),t.Ia.delete(e),t.Ea.delete(s),r.x_()&&rd(t,s),t.Ta.size===0&&(r.x_()?r.B_():gn(t)&&t.fa.set("Unknown"))}function la(n,e){if(n.ga.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(W.min())>0){const t=n.Ea.get(e.targetId);if(t===void 0)return void M(ut,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}Wn(n).H_(e)}function rd(n,e){n.ga.$e(e),Wn(n).Z_(e)}function ha(n){n.ga=new vy({getRemoteKeysForTarget:e=>{const t=n.Ea.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):X()},Rt:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),Wn(n).start(),n.fa.aa()}function da(n){return gn(n)&&!Wn(n).M_()&&n.Ta.size>0}function gn(n){return K(n).Va.size===0}function sd(n){n.ga=void 0}async function bE(n){n.fa.set("Online")}async function kE(n){n.Ta.forEach(((e,t)=>{la(n,e)}))}async function DE(n,e){sd(n),da(n)?(n.fa.la(e),ha(n)):n.fa.set("Unknown")}async function VE(n,e,t){if(n.fa.set("Online"),e instanceof $h&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s.Ta.has(c)){const l=s.Ea.get(c);l!==void 0&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Ea.delete(c)),s.Ta.delete(c)}s.ga.removeTarget(c)}})(n,e)}catch(r){M(ut,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await zs(n,r)}else if(e instanceof Rs?n.ga.Xe(e):e instanceof Bh?n.ga.it(e):n.ga.tt(e),!t.isEqual(W.min()))try{const r=await Zh(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const c=i.ga.Pt(a);c.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const p=i.Ta.get(f);p&&i.Ta.set(f,p.withResumeToken(h.resumeToken,a))}})),c.targetMismatches.forEach(((h,f)=>{const p=i.Ta.get(h);if(!p)return;i.Ta.set(h,p.withResumeToken(Ce.EMPTY_BYTE_STRING,p.snapshotVersion)),rd(i,h);const T=new ht(p.target,h,f,p.sequenceNumber);la(i,T)}));const l=(function(f,p){const T=new Map;p.targetChanges.forEach(((V,N)=>{const b=f.Ea.get(N);b!==void 0&&T.set(b,V)}));let S=new de(Y);return p.targetMismatches.forEach(((V,N)=>{const b=f.Ea.get(V);b!==void 0&&(S=S.insert(b,N))})),new Wr(p.snapshotVersion,T,S,p.documentUpdates,p.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(r){M(ut,"Failed to raise snapshot:",r),await zs(n,r)}}async function zs(n,e,t){if(!Hn(e))throw e;n.Va.add(1),await Kr(n),n.fa.set("Offline"),t||(t=()=>Zh(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{M(ut,"Retrying IndexedDB access"),await t(),n.Va.delete(1),await pi(n)}))}function id(n,e){return e().catch((t=>zs(n,t,e)))}async function mi(n){const e=K(n),t=zt(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Go;for(;NE(e);)try{const s=await fE(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,OE(e,s)}catch(s){await zs(e,s)}od(e)&&ad(e)}function NE(n){return gn(n)&&n.Pa.length<10}function OE(n,e){n.Pa.push(e);const t=zt(n);t.x_()&&t.X_&&t.Y_(e.mutations)}function od(n){return gn(n)&&!zt(n).M_()&&n.Pa.length>0}function ad(n){zt(n).start()}async function LE(n){zt(n).na()}async function xE(n){const e=zt(n);for(const t of n.Pa)e.Y_(t.mutations)}async function ME(n,e,t){const r=n.Pa.shift(),s=na.from(r,e,t);await id(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await mi(n)}async function FE(n,e){e&&zt(n).X_&&await(async function(r,s){if((function(a){return yy(a)&&a!==k.ABORTED})(s.code)){const i=r.Pa.shift();zt(r).N_(),await id(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await mi(r)}})(n,e),od(n)&&ad(n)}async function Uu(n,e){const t=K(n);t.asyncQueue.verifyOperationInProgress(),M(ut,"RemoteStore received new credentials");const r=gn(t);t.Va.add(3),await Kr(t),r&&t.fa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Va.delete(3),await pi(t)}async function UE(n,e){const t=K(n);e?(t.Va.delete(2),await pi(t)):e||(t.Va.add(2),await Kr(t),t.fa.set("Unknown"))}function Wn(n){return n.pa||(n.pa=(function(t,r,s){const i=K(t);return i.ia(),new IE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:bE.bind(null,n),Xo:kE.bind(null,n),e_:DE.bind(null,n),J_:VE.bind(null,n)}),n.da.push((async e=>{e?(n.pa.N_(),da(n)?ha(n):n.fa.set("Unknown")):(await n.pa.stop(),sd(n))}))),n.pa}function zt(n){return n.ya||(n.ya=(function(t,r,s){const i=K(t);return i.ia(),new wE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:()=>Promise.resolve(),Xo:LE.bind(null,n),e_:FE.bind(null,n),ea:xE.bind(null,n),ta:ME.bind(null,n)}),n.da.push((async e=>{e?(n.ya.N_(),await mi(n)):(await n.ya.stop(),n.Pa.length>0&&(M(ut,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))}))),n.ya}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new pt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new fa(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function pa(n,e){if(yt("AsyncQueue",`${e}: ${n}`),Hn(n))return new F(k.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{static emptySet(e){return new Cn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||$.comparator(t.key,r.key):(t,r)=>$.comparator(t.key,r.key),this.keyedMap=yr(),this.sortedSet=new de(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Cn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Cn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(){this.wa=new de($.comparator)}track(e){const t=e.doc.key,r=this.wa.get(t);r?e.type!==0&&r.type===3?this.wa=this.wa.insert(t,e):e.type===3&&r.type!==1?this.wa=this.wa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.wa=this.wa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.wa=this.wa.remove(t):e.type===1&&r.type===2?this.wa=this.wa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):q(63341,{At:e,Sa:r}):this.wa=this.wa.insert(t,e)}ba(){const e=[];return this.wa.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Mn{constructor(e,t,r,s,i,a,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new Mn(e,t,Cn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ci(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some((e=>e.Fa()))}}class $E{constructor(){this.queries=$u(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(t,r){const s=K(t),i=s.queries;s.queries=$u(),i.forEach(((a,c)=>{for(const l of c.Ca)l.onError(r)}))})(this,new F(k.ABORTED,"Firestore shutting down"))}}function $u(){return new pn((n=>Ch(n)),ci)}async function cd(n,e){const t=K(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.va()&&e.Fa()&&(r=2):(i=new BE,r=e.Fa()?0:1);try{switch(r){case 0:i.Da=await t.onListen(s,!0);break;case 1:i.Da=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=pa(a,`Initialization of query '${An(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Ca.push(e),e.xa(t.onlineState),i.Da&&e.Oa(i.Da)&&ma(t)}async function ud(n,e){const t=K(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Ca.indexOf(e);a>=0&&(i.Ca.splice(a,1),i.Ca.length===0?s=e.Fa()?0:1:!i.va()&&e.Fa()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function jE(n,e){const t=K(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Ca)c.Oa(s)&&(r=!0);a.Da=s}}r&&ma(t)}function qE(n,e,t){const r=K(n),s=r.queries.get(e);if(s)for(const i of s.Ca)i.onError(t);r.queries.delete(e)}function ma(n){n.Ma.forEach((e=>{e.next()}))}var Co,ju;(ju=Co||(Co={})).Na="default",ju.Cache="cache";class ld{constructor(e,t,r){this.query=e,this.Ba=t,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=r||{}}Oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Mn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.La?this.qa(e)&&(this.Ba.next(e),t=!0):this.Ka(e,this.onlineState)&&(this.Ua(e),t=!0),this.ka=e,t}onError(e){this.Ba.error(e)}xa(e){this.onlineState=e;let t=!1;return this.ka&&!this.La&&this.Ka(this.ka,e)&&(this.Ua(this.ka),t=!0),t}Ka(e,t){if(!e.fromCache||!this.Fa())return!0;const r=t!=="Offline";return(!this.options.$a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const t=this.ka&&this.ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Ua(e){e=Mn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.La=!0,this.Ba.next(e)}Fa(){return this.options.source!==Co.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e){this.key=e}}class dd{constructor(e){this.key=e}}class HE{constructor(e,t){this.query=e,this.eu=t,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=X(),this.mutatedKeys=X(),this.ru=bh(e),this.iu=new Cn(this.ru)}get su(){return this.eu}ou(e,t){const r=t?t._u:new Bu,s=t?t.iu:this.iu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,p)=>{const T=s.get(f),S=ui(this.query,p)?p:null,V=!!T&&this.mutatedKeys.has(T.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let b=!1;T&&S?T.data.isEqual(S.data)?V!==N&&(r.track({type:3,doc:S}),b=!0):this.au(T,S)||(r.track({type:2,doc:S}),b=!0,(l&&this.ru(S,l)>0||h&&this.ru(S,h)<0)&&(c=!0)):!T&&S?(r.track({type:0,doc:S}),b=!0):T&&!S&&(r.track({type:1,doc:T}),b=!0,(l||h)&&(c=!0)),b&&(S?(a=a.add(S),i=N?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{iu:a,_u:r,Ss:c,mutatedKeys:i}}au(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.iu;this.iu=e.iu,this.mutatedKeys=e.mutatedKeys;const a=e._u.ba();a.sort(((f,p)=>(function(S,V){const N=b=>{switch(b){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return q(20277,{At:b})}};return N(S)-N(V)})(f.type,p.type)||this.ru(f.doc,p.doc))),this.uu(r),s=s??!1;const c=t&&!s?this.cu():[],l=this.nu.size===0&&this.current&&!s?1:0,h=l!==this.tu;return this.tu=l,a.length!==0||h?{snapshot:new Mn(this.query,e.iu,i,a,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),lu:c}:{lu:c}}xa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new Bu,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(e){return!this.eu.has(e)&&!!this.iu.has(e)&&!this.iu.get(e).hasLocalMutations}uu(e){e&&(e.addedDocuments.forEach((t=>this.eu=this.eu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.eu=this.eu.delete(t))),this.current=e.current)}cu(){if(!this.current)return[];const e=this.nu;this.nu=X(),this.iu.forEach((r=>{this.hu(r.key)&&(this.nu=this.nu.add(r.key))}));const t=[];return e.forEach((r=>{this.nu.has(r)||t.push(new dd(r))})),this.nu.forEach((r=>{e.has(r)||t.push(new hd(r))})),t}Pu(e){this.eu=e.Ls,this.nu=X();const t=this.ou(e.documents);return this.applyChanges(t,!0)}Tu(){return Mn.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const ga="SyncEngine";class zE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class WE{constructor(e){this.key=e,this.Iu=!1}}class GE{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new pn((c=>Ch(c)),ci),this.Au=new Map,this.Vu=new Set,this.du=new de($.comparator),this.mu=new Map,this.fu=new ia,this.gu={},this.pu=new Map,this.yu=Ht._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function KE(n,e,t=!0){const r=yd(n);let s;const i=r.Ru.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await fd(r,e,t,!0),s}async function QE(n,e){const t=yd(n);await fd(t,e,!0,!1)}async function fd(n,e,t,r){const s=await pE(n.localStore,st(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await JE(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&nd(n.remoteStore,s),c}async function JE(n,e,t,r,s){n.Su=(p,T,S)=>(async function(N,b,O,U){let B=b.view.ou(O);B.Ss&&(B=await Ou(N.localStore,b.query,!1).then((({documents:E})=>b.view.ou(E,B))));const ne=U&&U.targetChanges.get(b.targetId),J=U&&U.targetMismatches.get(b.targetId)!=null,se=b.view.applyChanges(B,N.isPrimaryClient,ne,J);return Hu(N,b.targetId,se.lu),se.snapshot})(n,p,T,S);const i=await Ou(n.localStore,e,!0),a=new HE(e,i.Ls),c=a.ou(i.documents),l=Gr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,l);Hu(n,t,h.lu);const f=new zE(e,t,a);return n.Ru.set(e,f),n.Au.has(t)?n.Au.get(t).push(e):n.Au.set(t,[e]),h.snapshot}async function YE(n,e,t){const r=K(n),s=r.Ru.get(e),i=r.Au.get(s.targetId);if(i.length>1)return r.Au.set(s.targetId,i.filter((a=>!ci(a,e)))),void r.Ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Ro(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ua(r.remoteStore,s.targetId),bo(r,s.targetId)})).catch(qn)):(bo(r,s.targetId),await Ro(r.localStore,s.targetId,!0))}async function XE(n,e){const t=K(n),r=t.Ru.get(e),s=t.Au.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ua(t.remoteStore,r.targetId))}async function ZE(n,e,t){const r=oT(n);try{const s=await(function(a,c){const l=K(a),h=le.now(),f=c.reduce(((S,V)=>S.add(V.key)),X());let p,T;return l.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let V=Tt(),N=X();return l.Ms.getEntries(S,f).next((b=>{V=b,V.forEach(((O,U)=>{U.isValidDocument()||(N=N.add(O))}))})).next((()=>l.localDocuments.getOverlayedDocuments(S,V))).next((b=>{p=b;const O=[];for(const U of c){const B=fy(U,p.get(U.key).overlayedDocument);B!=null&&O.push(new mn(U.key,B,Th(B.value.mapValue),Je.exists(!0)))}return l.mutationQueue.addMutationBatch(S,h,O,c)})).next((b=>{T=b;const O=b.applyToLocalDocumentSet(p,N);return l.documentOverlayCache.saveOverlays(S,b.batchId,O)}))})).then((()=>({batchId:T.batchId,changes:Dh(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,l){let h=a.gu[a.currentUser.toKey()];h||(h=new de(Y)),h=h.insert(c,l),a.gu[a.currentUser.toKey()]=h})(r,s.batchId,t),await Qr(r,s.changes),await mi(r.remoteStore)}catch(s){const i=pa(s,"Failed to persist write");t.reject(i)}}async function pd(n,e){const t=K(n);try{const r=await hE(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.mu.get(i);a&&(ie(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?ie(a.Iu,14607):s.removedDocuments.size>0&&(ie(a.Iu,42227),a.Iu=!1))})),await Qr(t,r,e)}catch(r){await qn(r)}}function qu(n,e,t){const r=K(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Ru.forEach(((i,a)=>{const c=a.view.xa(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const l=K(a);l.onlineState=c;let h=!1;l.queries.forEach(((f,p)=>{for(const T of p.Ca)T.xa(c)&&(h=!0)})),h&&ma(l)})(r.eventManager,e),s.length&&r.Eu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function eT(n,e,t){const r=K(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.mu.get(e),i=s&&s.key;if(i){let a=new de($.comparator);a=a.insert(i,Ne.newNoDocument(i,W.min()));const c=X().add(i),l=new Wr(W.min(),new Map,new de(Y),a,c);await pd(r,l),r.du=r.du.remove(i),r.mu.delete(e),_a(r)}else await Ro(r.localStore,e,!1).then((()=>bo(r,e,t))).catch(qn)}async function tT(n,e){const t=K(n),r=e.batch.batchId;try{const s=await lE(t.localStore,e);gd(t,r,null),md(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Qr(t,s)}catch(s){await qn(s)}}async function nT(n,e,t){const r=K(n);try{const s=await(function(a,c){const l=K(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next((p=>(ie(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(h,p)))).next((()=>l.mutationQueue.performConsistencyCheck(h))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>l.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);gd(r,e,t),md(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Qr(r,s)}catch(s){await qn(s)}}function md(n,e){(n.pu.get(e)||[]).forEach((t=>{t.resolve()})),n.pu.delete(e)}function gd(n,e,t){const r=K(n);let s=r.gu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.gu[r.currentUser.toKey()]=s}}function bo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Au.get(e))n.Ru.delete(r),t&&n.Eu.bu(r,t);n.Au.delete(e),n.isPrimaryClient&&n.fu.Qr(e).forEach((r=>{n.fu.containsKey(r)||_d(n,r)}))}function _d(n,e){n.Vu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(ua(n.remoteStore,t),n.du=n.du.remove(e),n.mu.delete(t),_a(n))}function Hu(n,e,t){for(const r of t)r instanceof hd?(n.fu.addReference(r.key,e),rT(n,r)):r instanceof dd?(M(ga,"Document no longer in limbo: "+r.key),n.fu.removeReference(r.key,e),n.fu.containsKey(r.key)||_d(n,r.key)):q(19791,{Du:r})}function rT(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Vu.has(r)||(M(ga,"New document in limbo: "+t),n.Vu.add(r),_a(n))}function _a(n){for(;n.Vu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Vu.values().next().value;n.Vu.delete(e);const t=new $(ce.fromString(e)),r=n.yu.next();n.mu.set(r,new WE(t)),n.du=n.du.insert(t,r),nd(n.remoteStore,new ht(st(Xo(t.path)),r,"TargetPurposeLimboResolution",ii.ce))}}async function Qr(n,e,t){const r=K(n),s=[],i=[],a=[];r.Ru.isEmpty()||(r.Ru.forEach(((c,l)=>{a.push(r.Su(l,e,t).then((h=>{var f;if((h||t)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(h){s.push(h);const p=aa.Is(l.targetId,h);i.push(p)}})))})),await Promise.all(a),r.Eu.J_(s),await(async function(l,h){const f=K(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>D.forEach(h,(T=>D.forEach(T.Ps,(S=>f.persistence.referenceDelegate.addReference(p,T.targetId,S))).next((()=>D.forEach(T.Ts,(S=>f.persistence.referenceDelegate.removeReference(p,T.targetId,S)))))))))}catch(p){if(!Hn(p))throw p;M(ca,"Failed to update sequence numbers: "+p)}for(const p of h){const T=p.targetId;if(!p.fromCache){const S=f.Cs.get(T),V=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(V);f.Cs=f.Cs.insert(T,N)}}})(r.localStore,i))}async function sT(n,e){const t=K(n);if(!t.currentUser.isEqual(e)){M(ga,"User change. New user:",e.toKey());const r=await Xh(t.localStore,e);t.currentUser=e,(function(i,a){i.pu.forEach((c=>{c.forEach((l=>{l.reject(new F(k.CANCELLED,a))}))})),i.pu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Qr(t,r.Os)}}function iT(n,e){const t=K(n),r=t.mu.get(e);if(r&&r.Iu)return X().add(r.key);{let s=X();const i=t.Au.get(e);if(!i)return s;for(const a of i){const c=t.Ru.get(a);s=s.unionWith(c.view.su)}return s}}function yd(n){const e=K(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=pd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=iT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=eT.bind(null,e),e.Eu.J_=jE.bind(null,e.eventManager),e.Eu.bu=qE.bind(null,e.eventManager),e}function oT(n){const e=K(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=tT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=nT.bind(null,e),e}class Ws{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=fi(e.databaseInfo.databaseId),this.sharedClientState=this.Fu(e),this.persistence=this.Mu(e),await this.persistence.start(),this.localStore=this.xu(e),this.gcScheduler=this.Ou(e,this.localStore),this.indexBackfillerScheduler=this.Nu(e,this.localStore)}Ou(e,t){return null}Nu(e,t){return null}xu(e){return uE(this.persistence,new oE,e.initialUser,this.serializer)}Mu(e){return new Yh(oa.Ai,this.serializer)}Fu(e){return new gE}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ws.provider={build:()=>new Ws};class aT extends Ws{constructor(e){super(),this.cacheSizeBytes=e}Ou(e,t){ie(this.persistence.referenceDelegate instanceof Hs,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new zy(r,e.asyncQueue,t)}Mu(e){const t=this.cacheSizeBytes!==void 0?Ue.withCacheSize(this.cacheSizeBytes):Ue.DEFAULT;return new Yh((r=>Hs.Ai(r,t)),this.serializer)}}class ko{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>qu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=sT.bind(null,this.syncEngine),await UE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new $E})()}createDatastore(e){const t=fi(e.databaseInfo.databaseId),r=vE(e.databaseInfo);return SE(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,c){return new CE(r,s,i,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>qu(this.syncEngine,t,0)),(function(){return Mu.v()?new Mu:new _E})())}createSyncEngine(e,t){return(function(s,i,a,c,l,h,f){const p=new GE(s,i,a,c,l,h);return f&&(p.wu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=K(s);M(ut,"RemoteStore shutting down."),i.Va.add(5),await Kr(i),i.ma.shutdown(),i.fa.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}ko.provider={build:()=>new ko};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Lu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Lu(this.observer.error,e):yt("Uncaught Error in snapshot listener:",e.toString()))}ku(){this.muted=!0}Lu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt="FirestoreClient";class cT{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ve.UNAUTHENTICATED,this.clientId=Wo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{M(Wt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(M(Wt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new pt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=pa(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function ro(n,e){n.asyncQueue.verifyOperationInProgress(),M(Wt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Xh(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function zu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await uT(n);M(Wt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Uu(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Uu(e.remoteStore,s))),n._onlineComponents=e}async function uT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M(Wt,"Using user provided OfflineComponentProvider");try{await ro(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;ln("Error using user provided cache. Falling back to memory cache: "+t),await ro(n,new Ws)}}else M(Wt,"Using default OfflineComponentProvider"),await ro(n,new aT(void 0));return n._offlineComponents}async function Td(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M(Wt,"Using user provided OnlineComponentProvider"),await zu(n,n._uninitializedComponentsProvider._online)):(M(Wt,"Using default OnlineComponentProvider"),await zu(n,new ko))),n._onlineComponents}function lT(n){return Td(n).then((e=>e.syncEngine))}async function vd(n){const e=await Td(n),t=e.eventManager;return t.onListen=KE.bind(null,e.syncEngine),t.onUnlisten=YE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=QE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=XE.bind(null,e.syncEngine),t}function hT(n,e,t={}){const r=new pt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,l,h){const f=new Ed({next:T=>{f.ku(),a.enqueueAndForget((()=>ud(i,p)));const S=T.docs.has(c);!S&&T.fromCache?h.reject(new F(k.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&T.fromCache&&l&&l.source==="server"?h.reject(new F(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(T)},error:T=>h.reject(T)}),p=new ld(Xo(c.path),f,{includeMetadataChanges:!0,$a:!0});return cd(i,p)})(await vd(n),n.asyncQueue,e,t,r))),r.promise}function dT(n,e,t={}){const r=new pt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,l,h){const f=new Ed({next:T=>{f.ku(),a.enqueueAndForget((()=>ud(i,p))),T.fromCache&&l.source==="server"?h.reject(new F(k.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(T)},error:T=>h.reject(T)}),p=new ld(c,f,{includeMetadataChanges:!0,$a:!0});return cd(i,p)})(await vd(n),n.asyncQueue,e,t,r))),r.promise}function fT(n,e){const t=new pt;return n.asyncQueue.enqueueAndForget((async()=>ZE(await lT(n),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT="ComponentProvider",Wu=new Map;function mT(n,e,t,r,s){return new L_(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Id(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="firestore.googleapis.com",Gu=!0;class Ku{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new F(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=wd,this.ssl=Gu}else this.host=e.host,this.ssl=e.ssl??Gu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Jh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<qy)throw new F(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}A_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Id(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new F(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new F(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new F(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class gi{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ku({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ku(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new p_;switch(r.type){case"firstParty":return new y_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new F(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Wu.get(t);r&&(M(pT,"Removing Datastore"),Wu.delete(t),r.terminate())})(this),Promise.resolve()}}function gT(n,e,t,r={}){var h;n=Et(n,gi);const s=qr(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&Kl(`https://${c}`),i.host!==wd&&i.host!==c&&ln("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:r};if(!an(l,a)&&(n._setSettings(l),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Ve.MOCK_USER;else{f=$m(r.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new F(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Ve(T)}n._authCredentials=new m_(new ah(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new _n(this.firestore,e,this._query)}}class Ee{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ut(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ee(this.firestore,e,this._key)}toJSON(){return{type:Ee._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Hr(t,Ee._jsonSchema))return new Ee(e,r||null,new $(ce.fromString(t.referencePath)))}}Ee._jsonSchemaVersion="firestore/documentReference/1.0",Ee._jsonSchema={type:ye("string",Ee._jsonSchemaVersion),referencePath:ye("string")};class Ut extends _n{constructor(e,t,r){super(e,t,Xo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ee(this.firestore,null,new $(e))}withConverter(e){return new Ut(this.firestore,e,this._path)}}function ZI(n,e,...t){if(n=Me(n),ch("collection","path",e),n instanceof gi){const r=ce.fromString(e,...t);return au(r),new Ut(n,null,r)}{if(!(n instanceof Ee||n instanceof Ut))throw new F(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ce.fromString(e,...t));return au(r),new Ut(n.firestore,null,r)}}function _T(n,e,...t){if(n=Me(n),arguments.length===1&&(e=Wo.newId()),ch("doc","path",e),n instanceof gi){const r=ce.fromString(e,...t);return ou(r),new Ee(n,null,new $(r))}{if(!(n instanceof Ee||n instanceof Ut))throw new F(k.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ce.fromString(e,...t));return ou(r),new Ee(n.firestore,n instanceof Ut?n.converter:null,new $(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu="AsyncQueue";class Ju{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new ed(this,"async_queue_retry"),this.cc=()=>{const r=no();r&&M(Qu,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this.lc=e;const t=no();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const t=no();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise((()=>{}));const t=new pt;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.nc.push(e),this.Tc())))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!Hn(e))throw e;M(Qu,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(e){const t=this.lc.then((()=>(this._c=!0,e().catch((r=>{throw this.oc=r,this._c=!1,yt("INTERNAL UNHANDLED ERROR: ",Yu(r)),r})).then((r=>(this._c=!1,r))))));return this.lc=t,t}enqueueAfterDelay(e,t,r){this.hc(),this.uc.indexOf(e)>-1&&(t=0);const s=fa.createAndSchedule(this,e,t,r,(i=>this.Ic(i)));return this.sc.push(s),s}hc(){this.oc&&q(47125,{Ec:Yu(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const t of this.sc)if(t.timerId===e)return!0;return!1}Vc(e){return this.Rc().then((()=>{this.sc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.sc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Rc()}))}dc(e){this.uc.push(e)}Ic(e){const t=this.sc.indexOf(e);this.sc.splice(t,1)}}function Yu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Gn extends gi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Ju,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ju(e),this._firestoreClient=void 0,await e}}}function ew(n,e){const t=typeof n=="object"?n:Yl(),r=typeof n=="string"?n:xs,s=Ho(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Um("firestore");i&&gT(s,...i)}return s}function ya(n){if(n._terminated)throw new F(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||yT(n),n._firestoreClient}function yT(n){var r,s,i,a;const e=n._freezeSettings(),t=mT(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new cT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(l){const h=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(h),_online:h}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this._byteString=e}static fromBase64String(e){try{return new He(Ce.fromBase64String(e))}catch(t){throw new F(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new He(Ce.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:He._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Hr(e,He._jsonSchema))return He.fromBase64String(e.bytes)}}He._jsonSchemaVersion="firestore/bytes/1.0",He._jsonSchema={type:ye("string",He._jsonSchemaVersion),bytes:ye("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new F(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new F(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new F(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Y(this._lat,e._lat)||Y(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ot._jsonSchemaVersion}}static fromJSON(e){if(Hr(e,ot._jsonSchema))return new ot(e.latitude,e.longitude)}}ot._jsonSchemaVersion="firestore/geoPoint/1.0",ot._jsonSchema={type:ye("string",ot._jsonSchemaVersion),latitude:ye("number"),longitude:ye("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Ye._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Hr(e,Ye._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Ye(e.vectorValues);throw new F(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ye._jsonSchemaVersion="firestore/vectorValue/1.0",Ye._jsonSchema={type:ye("string",Ye._jsonSchemaVersion),vectorValues:ye("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ET=/^__.*__$/;class TT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new mn(e,this.data,this.fieldMask,t,this.fieldTransforms):new zr(e,this.data,t,this.fieldTransforms)}}function Sd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw q(40011,{dataSource:n})}}class Ea{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Ea({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.yc(e),r}wc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(),r}Sc(e){return this.i({path:void 0,arrayElement:!0})}bc(e){return Gs(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}mc(){if(this.path)for(let e=0;e<this.path.length;e++)this.yc(this.path.get(e))}yc(e){if(e.length===0)throw this.bc("Document fields must not be empty");if(Sd(this.dataSource)&&ET.test(e))throw this.bc('Document fields cannot begin and end with "__"')}}class vT{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||fi(e)}V(e,t,r,s=!1){return new Ea({dataSource:e,methodName:t,targetDoc:r,path:Pe.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ta(n){const e=n._freezeSettings(),t=fi(n._databaseId);return new vT(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Pd(n,e,t,r,s,i={}){const a=n.V(i.merge||i.mergeFields?2:0,e,t,s);kd("Data must be an object, but it was:",a,r);const c=Cd(r,a);let l,h;if(i.merge)l=new Ge(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const T=_i(e,p,t);if(!a.contains(T))throw new F(k.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);RT(f,T)||f.push(T)}l=new Ge(f),h=a.fieldTransforms.filter((p=>l.covers(p.field)))}else l=null,h=a.fieldTransforms;return new TT(new qe(c),l,h)}function IT(n,e,t,r=!1){return va(t,n.V(r?4:3,e))}function va(n,e){if(bd(n=Me(n)))return kd("Unsupported field value:",e,n),Cd(n,e);if(n instanceof Rd)return(function(r,s){if(!Sd(s.dataSource))throw s.bc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.bc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.bc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const c of r){let l=va(c,s.Sc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=Me(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ay(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=le.fromDate(r);return{timestampValue:qs(s.serializer,i)}}if(r instanceof le){const i=new le(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:qs(s.serializer,i)}}if(r instanceof ot)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof He)return{bytesValue:jh(s.serializer,r._byteString)};if(r instanceof Ee){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.bc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:sa(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ye)return(function(a,c){const l=a instanceof Ye?a.toArray():a;return{mapValue:{fields:{[_h]:{stringValue:yh},[Ms]:{arrayValue:{values:l.map((f=>{if(typeof f!="number")throw c.bc("VectorValues must only contain numeric values.");return li(c.serializer,f)}))}}}}}})(r,s);if(Qh(r))return r._toProto(s.serializer);throw s.bc(`Unsupported field value: ${si(r)}`)})(n,e)}function Cd(n,e){const t={};return hh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):fn(n,((r,s)=>{const i=va(s,e.gc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function bd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof le||n instanceof ot||n instanceof He||n instanceof Ee||n instanceof Rd||n instanceof Ye||Qh(n))}function kd(n,e,t){if(!bd(t)||!uh(t)){const r=si(t);throw r==="an object"?e.bc(n+" a custom object"):e.bc(n+" "+r)}}function _i(n,e,t){if((e=Me(e))instanceof Ad)return e._internalPath;if(typeof e=="string")return AT(n,e);throw Gs("Field path arguments must be of type string or ",n,!1,void 0,t)}const wT=new RegExp("[~\\*/\\[\\]]");function AT(n,e,t){if(e.search(wT)>=0)throw Gs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ad(...e.split("."))._internalPath}catch{throw Gs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Gs(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new F(k.INVALID_ARGUMENT,c+n+l)}function RT(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{convertValue(e,t="none"){switch(qt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return me(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(jt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw q(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return fn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Ms].arrayValue)==null?void 0:s.values)==null?void 0:i.map((a=>me(a.doubleValue)));return new Ye(t)}convertGeoPoint(e){return new ot(me(e.latitude),me(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ai(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(br(e));default:return null}}convertTimestamp(e){const t=$t(e);return new le(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ce.fromString(e);ie(Kh(r),9688,{name:e});const s=new kr(r.get(1),r.get(3)),i=new $(r.popFirst(5));return s.isEqual(t)||yt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd extends ST{constructor(e){super(),this.firestore=e}convertBytes(e){return new He(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ee(this.firestore,null,t)}}const Xu="@firebase/firestore",Zu="4.15.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ee(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new PT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(_i("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class PT extends Vd{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CT(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new F(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ia{}class Nd extends Ia{}function tw(n,e,...t){let r=[];e instanceof Ia&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((l=>l instanceof Aa)).length,c=i.filter((l=>l instanceof wa)).length;if(a>1||a>0&&c>0)throw new F(k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class wa extends Nd{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new wa(e,t,r)}_apply(e){const t=this._parse(e);return Od(e._query,t),new _n(e.firestore,e.converter,Eo(e._query,t))}_parse(e){const t=Ta(e.firestore);return(function(i,a,c,l,h,f,p){let T;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new F(k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){tl(p,f);const V=[];for(const N of p)V.push(el(l,i,N));T={arrayValue:{values:V}}}else T=el(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||tl(p,f),T=IT(c,a,p,f==="in"||f==="not-in");return _e.create(h,f,T)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Aa extends Ia{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Aa(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:et.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)Od(a,l),a=Eo(a,l)})(e._query,t),new _n(e.firestore,e.converter,Eo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ra extends Nd{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ra(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new F(k.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new F(k.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Nr(i,a)})(e._query,this._field,this._direction);return new _n(e.firestore,e.converter,Z_(e._query,t))}}function nw(n,e="asc"){const t=e,r=_i("orderBy",n);return Ra._create(r,t)}function el(n,e,t){if(typeof(t=Me(t))=="string"){if(t==="")throw new F(k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ph(e)&&t.indexOf("/")!==-1)throw new F(k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ce.fromString(t));if(!$.isDocumentKey(r))throw new F(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return mu(n,new $(r))}if(t instanceof Ee)return mu(n,t._key);throw new F(k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${si(t)}.`)}function tl(n,e){if(!Array.isArray(n)||n.length===0)throw new F(k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Od(n,e){const t=(function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new F(k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new F(k.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Ld(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Tr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class on extends Vd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ss(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(_i("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=on._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}on._jsonSchemaVersion="firestore/documentSnapshot/1.0",on._jsonSchema={type:ye("string",on._jsonSchemaVersion),bundleSource:ye("string","DocumentSnapshot"),bundleName:ye("string"),bundle:ye("string")};class Ss extends on{data(e={}){return super.data(e)}}class bn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Tr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Ss(this._firestore,this._userDataWriter,r.key,r,new Tr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new F(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const l=new Ss(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Tr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new Ss(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Tr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:bT(c.type),doc:l,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=bn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Wo.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function bT(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return q(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */bn._jsonSchemaVersion="firestore/querySnapshot/1.0",bn._jsonSchema={type:ye("string",bn._jsonSchemaVersion),bundleSource:ye("string","QuerySnapshot"),bundleName:ye("string"),bundle:ye("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rw(n){n=Et(n,Ee);const e=Et(n.firestore,Gn),t=ya(e);return hT(t,n._key).then((r=>kT(e,n,r)))}function sw(n){n=Et(n,_n);const e=Et(n.firestore,Gn),t=ya(e),r=new Dd(e);return CT(n._query),dT(t,n._query).then((s=>new bn(e,r,n,s)))}function iw(n,e,t){n=Et(n,Ee);const r=Et(n.firestore,Gn),s=Ld(n.converter,e,t),i=Ta(r);return Sa(r,[Pd(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Je.none())])}function ow(n){return Sa(Et(n.firestore,Gn),[new ta(n._key,Je.none())])}function aw(n,e){const t=Et(n.firestore,Gn),r=_T(n),s=Ld(n.converter,e),i=Ta(n.firestore);return Sa(t,[Pd(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Je.exists(!1))]).then((()=>r))}function Sa(n,e){const t=ya(n);return fT(t,e)}function kT(n,e,t){const r=t.docs.get(e._key),s=new Dd(n);return new on(n,s,e._key,r,new Tr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){f_($n),Nn(new cn("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new Gn(new g_(r.getProvider("auth-internal")),new E_(a,r.getProvider("app-check-internal")),x_(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Mt(Xu,Zu,e),Mt(Xu,Zu,"esm2020")})();var DT="firebase",VT="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mt(DT,VT,"app");function xd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const NT=xd,Md=new $r("auth","Firebase",xd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks=new jo("@firebase/auth");function OT(n,...e){Ks.logLevel<=Z.WARN&&Ks.warn(`Auth (${$n}): ${n}`,...e)}function Ps(n,...e){Ks.logLevel<=Z.ERROR&&Ks.error(`Auth (${$n}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(n,...e){throw Ca(n,...e)}function Xe(n,...e){return Ca(n,...e)}function Pa(n,e,t){const r={...NT(),[e]:t};return new $r("auth","Firebase",r).create(e,{appName:n.name})}function mt(n){return Pa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function LT(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&ze(n,"argument-error"),Pa(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ca(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Md.create(n,...e)}function j(n,e,...t){if(!n)throw Ca(e,...t)}function dt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ps(e),new Error(e)}function vt(n,e){n||dt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Do(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function xT(){return nl()==="http:"||nl()==="https:"}function nl(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(xT()||zm()||"connection"in navigator)?navigator.onLine:!0}function FT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e,t){this.shortDelay=e,this.longDelay=t,vt(t>e,"Short delay should be less than long delay!"),this.isMobile=jm()||Wm()}get(){return MT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(n,e){vt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;dt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;dt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;dt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],$T=new Jr(3e4,6e4);function Gt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Kt(n,e,t,r,s={}){return Ud(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=jr({key:n.config.apiKey,...a}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:l,...i};return Hm()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&qr(n.emulatorConfig.host)&&(h.credentials="include"),Fd.fetch()(await Bd(n,n.config.apiHost,t,c),h)})}async function Ud(n,e,t){n._canInitEmulator=!1;const r={...UT,...e};try{const s=new qT(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ys(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ys(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw ys(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw ys(n,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Pa(n,f,h);ze(n,f)}}catch(s){if(s instanceof It)throw s;ze(n,"network-request-failed",{message:String(s)})}}async function Yr(n,e,t,r,s={}){const i=await Kt(n,e,t,r,s);return"mfaPendingCredential"in i&&ze(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Bd(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?ba(n.config,s):`${n.config.apiScheme}://${s}`;return BT.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function jT(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class qT{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Xe(this.auth,"network-request-failed")),$T.get())})}}function ys(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Xe(n,e,r);return s.customData._tokenResponse=t,s}function rl(n){return n!==void 0&&n.enterprise!==void 0}class HT{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return jT(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function zT(n,e){return Kt(n,"GET","/v2/recaptchaConfig",Gt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WT(n,e){return Kt(n,"POST","/v1/accounts:delete",e)}async function Qs(n,e){return Kt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function GT(n,e=!1){const t=Me(n),r=await t.getIdToken(e),s=ka(r);j(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Rr(so(s.auth_time)),issuedAtTime:Rr(so(s.iat)),expirationTime:Rr(so(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function so(n){return Number(n)*1e3}function ka(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ps("JWT malformed, contained fewer than 3 sections"),null;try{const s=Hl(t);return s?JSON.parse(s):(Ps("Failed to decode base64 JWT payload"),null)}catch(s){return Ps("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function sl(n){const e=ka(n);return j(e,"internal-error"),j(typeof e.exp<"u","internal-error"),j(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof It&&KT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function KT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Rr(this.lastLoginAt),this.creationTime=Rr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Js(n){var p;const e=n.auth,t=await n.getIdToken(),r=await Mr(n,Qs(e,{idToken:t}));j(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?$d(s.providerUserInfo):[],a=YT(n.providerData,i),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Vo(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function JT(n){const e=Me(n);await Js(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function YT(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function $d(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XT(n,e){const t=await Ud(n,{},async()=>{const r=jr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Bd(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&qr(n.emulatorConfig.host)&&(l.credentials="include"),Fd.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function ZT(n,e){return Kt(n,"POST","/v2/accounts:revokeToken",Gt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){j(e.idToken,"internal-error"),j(typeof e.idToken<"u","internal-error"),j(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):sl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){j(e.length!==0,"internal-error");const t=sl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await XT(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new kn;return r&&(j(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(j(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new kn,this.toJSON())}_performRefresh(){return dt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(n,e){j(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ke{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new QT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Vo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Mr(this,this.stsTokenManager.getToken(this.auth,e));return j(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return GT(this,e)}reload(){return JT(this)}_assign(e){this!==e&&(j(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ke({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Js(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if($e(this.auth.app))return Promise.reject(mt(this.auth));const e=await this.getIdToken();return await Mr(this,WT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:T,isAnonymous:S,providerData:V,stsTokenManager:N}=t;j(p&&N,e,"internal-error");const b=kn.fromJSON(this.name,N);j(typeof p=="string",e,"internal-error"),kt(r,e.name),kt(s,e.name),j(typeof T=="boolean",e,"internal-error"),j(typeof S=="boolean",e,"internal-error"),kt(i,e.name),kt(a,e.name),kt(c,e.name),kt(l,e.name),kt(h,e.name),kt(f,e.name);const O=new Ke({uid:p,auth:e,email:s,emailVerified:T,displayName:r,isAnonymous:S,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:b,createdAt:h,lastLoginAt:f});return V&&Array.isArray(V)&&(O.providerData=V.map(U=>({...U}))),l&&(O._redirectEventId=l),O}static async _fromIdTokenResponse(e,t,r=!1){const s=new kn;s.updateFromServerResponse(t);const i=new Ke({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Js(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?$d(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new kn;c.updateFromIdToken(r);const l=new Ke({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Vo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il=new Map;function ft(n){vt(n instanceof Function,"Expected a class definition");let e=il.get(n);return e?(vt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,il.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}jd.type="NONE";const ol=jd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(n,e,t){return`firebase:${n}:${e}:${t}`}class Dn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Cs(this.userKey,s.apiKey,i),this.fullPersistenceKey=Cs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Qs(this.auth,{idToken:e}).catch(()=>{});return t?Ke._fromGetAccountInfoResponse(this.auth,t,e):null}return Ke._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Dn(ft(ol),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||ft(ol);const a=Cs(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const T=await Qs(e,{idToken:f}).catch(()=>{});if(!T)break;p=await Ke._fromGetAccountInfoResponse(e,T,f)}else p=Ke._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Dn(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Dn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function al(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Wd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(qd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Kd(e))return"Blackberry";if(Qd(e))return"Webos";if(Hd(e))return"Safari";if((e.includes("chrome/")||zd(e))&&!e.includes("edge/"))return"Chrome";if(Gd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function qd(n=Oe()){return/firefox\//i.test(n)}function Hd(n=Oe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function zd(n=Oe()){return/crios\//i.test(n)}function Wd(n=Oe()){return/iemobile/i.test(n)}function Gd(n=Oe()){return/android/i.test(n)}function Kd(n=Oe()){return/blackberry/i.test(n)}function Qd(n=Oe()){return/webos/i.test(n)}function Da(n=Oe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ev(n=Oe()){var e;return Da(n)&&!!((e=window.navigator)!=null&&e.standalone)}function tv(){return Gm()&&document.documentMode===10}function Jd(n=Oe()){return Da(n)||Gd(n)||Qd(n)||Kd(n)||/windows phone/i.test(n)||Wd(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yd(n,e=[]){let t;switch(n){case"Browser":t=al(Oe());break;case"Worker":t=`${al(Oe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${$n}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rv(n,e={}){return Kt(n,"GET","/v2/passwordPolicy",Gt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sv=6;class iv{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??sv,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new cl(this),this.idTokenSubscription=new cl(this),this.beforeStateQueue=new nv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Md,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ft(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Dn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Qs(this,{idToken:e}),r=await Ke._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if($e(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(r=l.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Js(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=FT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if($e(this.app))return Promise.reject(mt(this));const t=e?Me(e):null;return t&&j(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&j(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return $e(this.app)?Promise.reject(mt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return $e(this.app)?Promise.reject(mt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ft(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await rv(this),t=new iv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new $r("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await ZT(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ft(e)||this._popupRedirectResolver;j(t,this,"argument-error"),this.redirectPersistenceManager=await Dn.create(this,[ft(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Yd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if($e(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&OT(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Qt(n){return Me(n)}class cl{constructor(e){this.auth=e,this.observer=null,this.addObserver=tg(t=>this.observer=t)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function av(n){yi=n}function Xd(n){return yi.loadJS(n)}function cv(){return yi.recaptchaEnterpriseScript}function uv(){return yi.gapiScript}function lv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class hv{constructor(){this.enterprise=new dv}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class dv{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const fv="recaptcha-enterprise",Zd="NO_RECAPTCHA";class pv{constructor(e){this.type=fv,this.auth=Qt(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{zT(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new HT(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,a,c){const l=window.grecaptcha;rl(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(Zd)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new hv().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&rl(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=cv();l.length!==0&&(l+=c),Xd(l).then(()=>{s(c,i,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}async function ul(n,e,t,r=!1,s=!1){const i=new pv(n);let a;if(s)a=Zd;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function No(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await ul(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await ul(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mv(n,e){const t=Ho(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(an(i,e??{}))return s;ze(s,"already-initialized")}return t.initialize({options:e})}function gv(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ft);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function _v(n,e,t){const r=Qt(n);j(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=ef(e),{host:a,port:c}=yv(e),l=c===null?"":`:${c}`,h={url:`${i}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){j(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),j(an(h,r.config.emulator)&&an(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,qr(a)?Kl(`${i}//${a}${l}`):Ev()}function ef(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function yv(n){const e=ef(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:ll(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:ll(a)}}}function ll(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ev(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return dt("not implemented")}_getIdTokenResponse(e){return dt("not implemented")}_linkToIdToken(e,t){return dt("not implemented")}_getReauthenticationResolver(e){return dt("not implemented")}}async function Tv(n,e){return Kt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vv(n,e){return Yr(n,"POST","/v1/accounts:signInWithPassword",Gt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iv(n,e){return Yr(n,"POST","/v1/accounts:signInWithEmailLink",Gt(n,e))}async function wv(n,e){return Yr(n,"POST","/v1/accounts:signInWithEmailLink",Gt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr extends Va{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Fr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Fr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return No(e,t,"signInWithPassword",vv);case"emailLink":return Iv(e,{email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return No(e,r,"signUpPassword",Tv);case"emailLink":return wv(e,{idToken:t,email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vn(n,e){return Yr(n,"POST","/v1/accounts:signInWithIdp",Gt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Av="http://localhost";class hn extends Va{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new hn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ze("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new hn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Vn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Vn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vn(e,t)}buildRequest(){const e={requestUri:Av,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=jr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rv(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Sv(n){const e=mr(gr(n)).link,t=e?mr(gr(e)).deep_link_id:null,r=mr(gr(n)).deep_link_id;return(r?mr(gr(r)).link:null)||r||t||e||n}class Na{constructor(e){const t=mr(gr(e)),r=t.apiKey??null,s=t.oobCode??null,i=Rv(t.mode??null);j(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Sv(e);try{return new Na(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(){this.providerId=Kn.PROVIDER_ID}static credential(e,t){return Fr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Na.parseLink(t);return j(r,"argument-error"),Fr._fromEmailAndCode(e,r.code,r.tenantId)}}Kn.PROVIDER_ID="password";Kn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Kn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr extends Oa{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends Xr{constructor(){super("facebook.com")}static credential(e){return hn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dt.credential(e.oauthAccessToken)}catch{return null}}}Dt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Dt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends Xr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return hn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Vt.credential(t,r)}catch{return null}}}Vt.GOOGLE_SIGN_IN_METHOD="google.com";Vt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt extends Xr{constructor(){super("github.com")}static credential(e){return hn._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Nt.credential(e.oauthAccessToken)}catch{return null}}}Nt.GITHUB_SIGN_IN_METHOD="github.com";Nt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends Xr{constructor(){super("twitter.com")}static credential(e,t){return hn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ot.credential(t,r)}catch{return null}}}Ot.TWITTER_SIGN_IN_METHOD="twitter.com";Ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pv(n,e){return Yr(n,"POST","/v1/accounts:signUp",Gt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Ke._fromIdTokenResponse(e,r,s),a=hl(r);return new dn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=hl(r);return new dn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function hl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys extends It{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ys.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Ys(e,t,r,s)}}function tf(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ys._fromErrorAndOperation(n,i,e,r):i})}async function Cv(n,e,t=!1){const r=await Mr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return dn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bv(n,e,t=!1){const{auth:r}=n;if($e(r.app))return Promise.reject(mt(r));const s="reauthenticate";try{const i=await Mr(n,tf(r,s,e,n),t);j(i.idToken,r,"internal-error");const a=ka(i.idToken);j(a,r,"internal-error");const{sub:c}=a;return j(n.uid===c,r,"user-mismatch"),dn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ze(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nf(n,e,t=!1){if($e(n.app))return Promise.reject(mt(n));const r="signIn",s=await tf(n,r,e),i=await dn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function kv(n,e){return nf(Qt(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rf(n){const e=Qt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function cw(n,e,t){if($e(n.app))return Promise.reject(mt(n));const r=Qt(n),a=await No(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Pv).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&rf(n),l}),c=await dn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function uw(n,e,t){return $e(n.app)?Promise.reject(mt(n)):kv(Me(n),Kn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&rf(n),r})}function Dv(n,e,t,r){return Me(n).onIdTokenChanged(e,t,r)}function Vv(n,e,t){return Me(n).beforeAuthStateChanged(e,t)}function lw(n,e,t,r){return Me(n).onAuthStateChanged(e,t,r)}function hw(n){return Me(n).signOut()}const Xs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Xs,"1"),this.storage.removeItem(Xs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nv=1e3,Ov=10;class of extends sf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Jd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);tv()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ov):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Nv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}of.type="LOCAL";const Lv=of;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af extends sf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}af.type="SESSION";const cf=af;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ei(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),l=await xv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ei.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function La(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const h=La("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const T=p;if(T.data.eventId===h)switch(T.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(T.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(){return window}function Fv(n){at().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(){return typeof at().WorkerGlobalScope<"u"&&typeof at().importScripts=="function"}async function Uv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Bv(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function $v(){return uf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf="firebaseLocalStorageDb",jv=1,Zs="firebaseLocalStorage",hf="fbase_key";class Zr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ti(n,e){return n.transaction([Zs],e?"readwrite":"readonly").objectStore(Zs)}function qv(){const n=indexedDB.deleteDatabase(lf);return new Zr(n).toPromise()}function df(){const n=indexedDB.open(lf,jv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Zs,{keyPath:hf})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Zs)?e(r):(r.close(),await qv(),e(await df()))})})}async function dl(n,e,t){const r=Ti(n,!0).put({[hf]:e,value:t});return new Zr(r).toPromise()}async function Hv(n,e){const t=Ti(n,!1).get(e),r=await new Zr(t).toPromise();return r===void 0?null:r.value}function fl(n,e){const t=Ti(n,!0).delete(e);return new Zr(t).toPromise()}const zv=800,Wv=3;class ff{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=df(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Wv)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return uf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ei._getInstance($v()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Uv(),!this.activeServiceWorker)return;this.sender=new Mv(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Bv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await dl(e,Xs,"1"),await fl(e,Xs)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>dl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Hv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>fl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ti(s,!1).getAll();return new Zr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),zv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ff.type="LOCAL";const Gv=ff;new Jr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(n,e){return e?ft(e):(j(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa extends Va{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Kv(n){return nf(n.auth,new xa(n),n.bypassAuthState)}function Qv(n){const{auth:e,user:t}=n;return j(t,e,"internal-error"),bv(t,new xa(n),n.bypassAuthState)}async function Jv(n){const{auth:e,user:t}=n;return j(t,e,"internal-error"),Cv(t,new xa(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Kv;case"linkViaPopup":case"linkViaRedirect":return Jv;case"reauthViaPopup":case"reauthViaRedirect":return Qv;default:ze(this.auth,"internal-error")}}resolve(e){vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yv=new Jr(2e3,1e4);async function dw(n,e,t){if($e(n.app))return Promise.reject(Xe(n,"operation-not-supported-in-this-environment"));const r=Qt(n);LT(n,e,Oa);const s=pf(r,t);return new sn(r,"signInViaPopup",e,s).executeNotNull()}class sn extends mf{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,sn.currentPopupAction&&sn.currentPopupAction.cancel(),sn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return j(e,this.auth,"internal-error"),e}async onExecution(){vt(this.filter.length===1,"Popup operations only handle one event");const e=La();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Xe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Xe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,sn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Xe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Yv.get())};e()}}sn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv="pendingRedirect",bs=new Map;class Zv extends mf{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=bs.get(this.auth._key());if(!e){try{const r=await eI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}bs.set(this.auth._key(),e)}return this.bypassAuthState||bs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function eI(n,e){const t=rI(e),r=nI(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function tI(n,e){bs.set(n._key(),e)}function nI(n){return ft(n._redirectPersistence)}function rI(n){return Cs(Xv,n.config.apiKey,n.name)}async function sI(n,e,t=!1){if($e(n.app))return Promise.reject(mt(n));const r=Qt(n),s=pf(r,e),a=await new Zv(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iI=600*1e3;class oI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!aI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!gf(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Xe(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=iI&&this.cachedEventUids.clear(),this.cachedEventUids.has(pl(e))}saveEventToCache(e){this.cachedEventUids.add(pl(e)),this.lastProcessedEventTime=Date.now()}}function pl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function gf({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function aI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return gf(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cI(n,e={}){return Kt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,lI=/^https?/;async function hI(n){if(n.config.emulator)return;const{authorizedDomains:e}=await cI(n);for(const t of e)try{if(dI(t))return}catch{}ze(n,"unauthorized-domain")}function dI(n){const e=Do(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!lI.test(t))return!1;if(uI.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fI=new Jr(3e4,6e4);function ml(){const n=at().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function pI(n){return new Promise((e,t)=>{var s,i,a;function r(){ml(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ml(),t(Xe(n,"network-request-failed"))},timeout:fI.get()})}if((i=(s=at().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=at().gapi)!=null&&a.load)r();else{const c=lv("iframefcb");return at()[c]=()=>{gapi.load?r():t(Xe(n,"network-request-failed"))},Xd(`${uv()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw ks=null,e})}let ks=null;function mI(n){return ks=ks||pI(n),ks}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gI=new Jr(5e3,15e3),_I="__/auth/iframe",yI="emulator/auth/iframe",EI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},TI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function vI(n){const e=n.config;j(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ba(e,yI):`https://${n.config.authDomain}/${_I}`,r={apiKey:e.apiKey,appName:n.name,v:$n},s=TI.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${jr(r).slice(1)}`}async function II(n){const e=await mI(n),t=at().gapi;return j(t,n,"internal-error"),e.open({where:document.body,url:vI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:EI,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Xe(n,"network-request-failed"),c=at().setTimeout(()=>{i(a)},gI.get());function l(){at().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},AI=500,RI=600,SI="_blank",PI="http://localhost";class gl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function CI(n,e,t,r=AI,s=RI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...wI,width:r.toString(),height:s.toString(),top:i,left:a},h=Oe().toLowerCase();t&&(c=zd(h)?SI:t),qd(h)&&(e=e||PI,l.scrollbars="yes");const f=Object.entries(l).reduce((T,[S,V])=>`${T}${S}=${V},`,"");if(ev(h)&&c!=="_self")return bI(e||"",c),new gl(null);const p=window.open(e||"",c,f);j(p,n,"popup-blocked");try{p.focus()}catch{}return new gl(p)}function bI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kI="__/auth/handler",DI="emulator/auth/handler",VI=encodeURIComponent("fac");async function _l(n,e,t,r,s,i){j(n.config.authDomain,n,"auth-domain-config-required"),j(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:$n,eventId:s};if(e instanceof Oa){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",eg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Xr){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),h=l?`#${VI}=${encodeURIComponent(l)}`:"";return`${NI(n)}?${jr(c).slice(1)}${h}`}function NI({config:n}){return n.emulator?ba(n,DI):`https://${n.authDomain}/${kI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io="webStorageSupport";class OI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cf,this._completeRedirectFn=sI,this._overrideRedirectResult=tI}async _openPopup(e,t,r,s){var a;vt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await _l(e,t,r,Do(),s);return CI(e,i,La())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await _l(e,t,r,Do(),s);return Fv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(vt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await II(e),r=new oI(e);return t.register("authEvent",s=>(j(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(io,{type:io},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[io];i!==void 0&&t(!!i),ze(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Jd()||Hd()||Da()}}const LI=OI;var yl="@firebase/auth",El="1.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function FI(n){Nn(new cn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;j(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Yd(n)},h=new ov(r,s,i,l);return gv(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Nn(new cn("auth-internal",e=>{const t=Qt(e.getProvider("auth").getImmediate());return(r=>new xI(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Mt(yl,El,MI(n)),Mt(yl,El,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UI=300,BI=Gl("authIdTokenMaxAge")||UI;let Tl=null;const $I=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>BI)return;const s=t==null?void 0:t.token;Tl!==s&&(Tl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function fw(n=Yl()){const e=Ho(n,"auth");if(e.isInitialized())return e.getImmediate();const t=mv(n,{popupRedirectResolver:LI,persistence:[Gv,Lv,cf]}),r=Gl("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=$I(i.toString());Vv(t,a,()=>a(t.currentUser)),Dv(t,c=>a(c))}}const s=zl("auth");return s&&_v(t,`http://${s}`),t}function jI(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}av({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Xe("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",jI().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});FI("Browser");export{nw as A,YI as B,cn as C,lw as D,QI as E,It as F,Vt as G,KI as H,Kp as I,pr as J,lt as K,Em as L,hw as M,WI as N,GI as O,Bl as P,zI as Q,HI as R,$n as S,Ol as T,dw as U,uw as V,cw as W,Nn as _,vl as a,JI as b,qI as c,Qf as d,Mt as e,$e as f,Wf as g,Me as h,Ho as i,Um as j,Yl as k,qr as l,$m as m,n_ as n,fw as o,Kl as p,ew as q,C as r,_T as s,rw as t,iw as u,sw as v,ZI as w,ow as x,aw as y,tw as z};
