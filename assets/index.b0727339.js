import{d as t,a as e,s as o,o as n,c as r,b as a,t as s,u,e as i,f as d,w as c,g as l,r as f}from"./main.0c7025fb.js";import{_ as p}from"./plugin-vue_export-helper.21dcd24c.js";var m,g=new Uint8Array(16);function v(){if(!m&&!(m="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return m(g)}var y=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function b(t){return"string"==typeof t&&y.test(t)}for(var h=[],C=0;C<256;++C)h.push((C+256).toString(16).substr(1));function w(t,e,o){var n=(t=t||{}).random||(t.rng||v)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,e){o=o||0;for(var r=0;r<16;++r)e[o+r]=n[r];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=(h[t[e+0]]+h[t[e+1]]+h[t[e+2]]+h[t[e+3]]+"-"+h[t[e+4]]+h[t[e+5]]+"-"+h[t[e+6]]+h[t[e+7]]+"-"+h[t[e+8]]+h[t[e+9]]+"-"+h[t[e+10]]+h[t[e+11]]+h[t[e+12]]+h[t[e+13]]+h[t[e+14]]+h[t[e+15]]).toLowerCase();if(!b(o))throw TypeError("Stringified UUID is invalid");return o}(n)}const _=t("counter",{state:()=>({count:0,testData:null}),getters:{doubleCount:t=>2*t.count,doublePlusOne(){return this.doubleCount+1}},actions:{increment(){this.count++},async getTestData(){try{this.testData=await new Promise(((t,e)=>{setTimeout((()=>{Math.random()>.5?t(520):e("fail")}),1e3)}))}catch(t){return t}}}});const D={class:"test"},R={class:"test"},T=i("Go to Home"),V=i("Go to About");var A=p(e({__name:"index",props:{msg:{default:"default"}},setup(t){const e=w(),p=l(),m=_(),{count:g,doubleCount:v,testData:y}=o(m),{increment:b,getTestData:h}=m;setTimeout((()=>{h().then((t=>{}))}),1e3);const C=m.$onAction((({name:t,store:e,args:o,after:n,onError:r})=>{Date.now();n((t=>{})),r((t=>{}))}));return(o,l)=>{const m=f("router-link");return n(),r("div",null,[a("h1",null,s(t.msg)+" --- "+s(u(p).path),1),a("div",D,[i(s(u(g))+" --- "+s(u(v))+" ",1),a("button",{onClick:l[0]||(l[0]=(...t)=>u(b)&&u(b)(...t))},"increment"),a("button",{onClick:l[1]||(l[1]=(...t)=>u(C)&&u(C)(...t))},"unsubscribe")]),a("div",R,s(u(y)),1),a("div",null,"uuid:"+s(u(e)),1),a("p",null,[d(m,{to:"/vueApi"},{default:c((()=>[T])),_:1}),d(m,{to:"/test"},{default:c((()=>[V])),_:1})])])}}}),[["__scopeId","data-v-dff0979c"]]);export{A as default};