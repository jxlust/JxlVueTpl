import{m as e,I as a,a as s,K as t,Y as l,o as n,c,b as r,t as i,u as o,D as u,E as m,F as f}from"./main.0c7025fb.js";const v=e("99");a([]);let p=100;const g={class:"msg"},h={class:"content-wrapper"},d=["innerHTML"],F=s({__name:"index",setup(a){const s=e("我的内容"),F=e(),j=e(!1),k=e(!1),b=e();setTimeout((()=>{var e;e="1000",v.value=e,p=300;const a=[];a.push('<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657375692&t=8e5e365f4ea9592f547f6c85934ebb56" alt="">');for(let s=0;s<10;s++)a.push(`<p>内容啊的理解是否就是理解${s}</p>`);s.value=a.join("")}),2e3);const H=()=>{k.value=!k.value},_=e=>{j.value||(()=>{let e=F.value;e.clientHeight<e.scrollHeight?j.value=!0:j.value=!1})()};return t((()=>{b.value.contentWindow.onresize=_})),l((()=>{}),{flush:"post"}),(e,a)=>(n(),c(f,null,[r("div",g,i(o(v))+" ---- "+i(o(p)),1),r("div",h,[r("div",{ref_key:"htmlRef",ref:F,class:u(["content-html",{active:k.value}]),innerHTML:s.value},null,10,d),r("iframe",{title:"domChangeIframe",ref_key:"myHackIframeRef",ref:b,src:"",frameborder:"0"},null,512),j.value?(n(),c("div",{key:0,class:u(["content-mask",{none:k.value}])},[r("div",{class:"opt-area",onClick:H},i(k.value?"收起部分":"展开全部"),1)],2)):m("",!0)])],64))}});export{F as default};