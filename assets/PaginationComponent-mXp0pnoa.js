import{_ as c,o as n,c as i,b as a,n as o,d as r,F as g,i as d,t as _}from"./index-ahOMgdsz.js";const p={props:["pages","getProducts"]},u={"aria-label":"Page navigation example"},h={class:"pagination justify-content-center mb-0"},m=a("span",{"aria-hidden":"true"},"«",-1),f=[m],k=["onClick"],v=a("span",{"aria-hidden":"true"},"»",-1),b=[v];function P(l,s,e,C,x,y){return n(),i("nav",u,[a("ul",h,[a("li",{class:o(["page-item",{disabled:!e.pages.has_pre}])},[a("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:s[0]||(s[0]=r(t=>e.getProducts(e.pages.current_page-1),["prevent"]))},f)],2),(n(!0),i(g,null,d(e.pages.total_pages,t=>(n(),i("li",{class:o(["page-item",{active:t===e.pages.current_page}]),key:"page"+t},[a("a",{class:"page-link",href:"#",onClick:r(B=>l.$emit("change-page",t),["prevent"])},_(t),9,k)],2))),128)),a("li",{class:o(["page-item",{disabled:!e.pages.has_next}])},[a("a",{class:"page-link",href:"#","aria-label":"Next",onClick:s[1]||(s[1]=r(t=>e.getProducts(e.pages.current_page+1),["prevent"]))},b)],2)])])}const N=c(p,[["render",P]]);export{N as P};
