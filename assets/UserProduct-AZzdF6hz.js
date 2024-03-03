import{_ as b,m as f,r as u,o as i,c as r,a as l,b as s,w as L,t as o,g as a,e as p,F as T}from"./index-ahOMgdsz.js";import{u as C}from"./toastStore-V2N45qjQ.js";var y={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"vuejs2024",BASE_URL:"/vite_week7_20240303/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:_,VITE_PATH:h}=y,k={data(){return{isLoading:!1,product:{},id:"",status:{addToCartLoading:""}}},methods:{...f(C,["pushMessage"]),getProduct(){this.isLoading=!0,this.$http(`${_}/api/${h}/product/${this.id}`).then(e=>{this.isLoading=!1,this.product=e.data.product}).catch(e=>{this.isLoading=!1,this.pushMessage({style:"success",title:"失敗取得單一產品",content:e.response.data.message})})},addToCart(e,c=1){const n={product_id:e.id,qty:c};this.status.addToCartLoading=e.id,this.$http.post(`${_}/api/${h}/cart`,{data:n}).then(d=>{this.isLoading=!1,this.status.addToCartLoading="",this.pushMessage({style:"success",title:"成功加入購物車",content:d.data.message}),this.$router.push("/user/cart")}).catch(d=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"加入購物車失敗",content:d.response.data.message})})}},mounted(){this.id=this.$route.params.productId,this.getProduct()}},E={class:"pt-3"},V={class:"container"},w={style:{"--bs-breadcrumb-divider":`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'
        width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z'
        fill='%236c757d'/%3E%3C/svg%3E")`},"aria-label":"breadcrumb"},x={class:"breadcrumb"},M={class:"breadcrumb-item"},R={class:"breadcrumb-item active","aria-current":"page"},P={class:"row mt-5 gx-5"},D={class:"col-md-7"},I={class:"fw-bold"},S={key:0},U={key:1},A=["src","alt"],B={class:"col-md-5"},N={key:0},F={key:1},H={class:"text-muted"},O=s("hr",null,null,-1),j={key:0,class:"spinner-border spinner-border-sm","aria-hidden":"true"};function z(e,c,n,d,t,g){const m=u("VLoading"),v=u("RouterLink");return i(),r(T,null,[l(m,{active:t.isLoading},null,8,["active"]),s("div",E,[s("div",V,[s("nav",w,[s("ol",x,[s("li",M,[l(v,{to:"/user/cart"},{default:L(()=>[p("購物車")]),_:1})]),s("li",R,o(t.product.title),1)])]),s("div",P,[s("div",D,[s("h3",I,o(t.product.title),1),t.product.content?(i(),r("div",S,"內容："+o(t.product.content),1)):a("",!0),t.product.description?(i(),r("div",U,"描述："+o(t.product.description),1)):a("",!0),s("img",{src:t.product.imageUrl,alt:t.product.title,class:"img-fluid mt-5"},null,8,A)]),s("div",B,[t.product.origin_price===t.product.price?(i(),r("div",N," 原價："+o(t.product.origin_price)+" 元 ",1)):(i(),r("div",F,[s("del",H,"原價： "+o(t.product.origin_price)+" 元",1),s("p",null,"現在只要 "+o(t.product.price)+" 元",1)])),O,s("button",{class:"btn btn-primary",onClick:c[0]||(c[0]=q=>g.addToCart(t.product)),type:"button"},[t.product.id===t.status.addToCartLoading?(i(),r("span",j)):a("",!0),p(" 加入購物車")])])])])])],64)}const K=b(k,[["render",z]]);export{K as default};