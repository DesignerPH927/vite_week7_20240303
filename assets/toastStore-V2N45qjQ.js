import{s as a}from"./index-ahOMgdsz.js";const h=a("toastStore",{state:()=>({messages:[]}),actions:{toastShow(){setTimeout(()=>{this.messages.shift()},4e3)},clearToast(s){this.messages.splice(s,1)},pushMessage(s){const{style:t="success",title:e,content:o}=s;this.messages.push({style:t,title:e,content:o}),this.toastShow()}}});export{h as u};
