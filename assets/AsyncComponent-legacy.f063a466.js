System.register(["./main-legacy.1b00cd26.js"],(function(e){"use strict";var t,s,n,c,a,i,u,o;return{setters:[function(e){t=e.a,s=e.an,n=e.I,c=e.o,a=e.c,i=e.F,u=e.S,o=e.t}],execute:function(){const r={class:"async-test"};e("default",t({__name:"AsyncComponent",async setup(e){let t,m;const l=([t,m]=s((()=>new Promise((e=>{setTimeout((()=>{e([1,2,3,4,6,7,8,19,22,199])}),3e3)})))),t=await t,m(),t),y=n(l);return setTimeout((()=>{y.push(9999)}),1e3),(e,t)=>(c(),a("div",r,[(c(!0),a(i,null,u(y,(e=>(c(),a("div",{class:"async-item",key:e}," 异步数据-"+o(e),1)))),128))]))}}))}}}));
