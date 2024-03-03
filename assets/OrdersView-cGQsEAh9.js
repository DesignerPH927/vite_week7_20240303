import{_ as b,o as d,c as o,b as e,t as s,g as D,F as p,i as f,j as M,k as y,m as w,r as _,a as u}from"./index-ahOMgdsz.js";import{u as L}from"./toastStore-V2N45qjQ.js";import{m as $,D as C}from"./DelModal-wLUx1dDX.js";import{P as V}from"./PaginationComponent-mXp0pnoa.js";const P={props:["order","orderDataUpdate"],mixins:[$],data(){return{tempOrderModal:{}}},watch:{order(){this.tempOrderModal=this.order}}},E={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},S={class:"modal-dialog modal-xl"},U={class:"modal-content"},T=e("div",{class:"modal-header bg-primary"},[e("h1",{class:"modal-title fs-5 text-white fw-bold",id:"exampleModalLabel"},"訂單細節"),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),R={class:"modal-body"},A={class:"row"},B={class:"col-md-4"},j=e("h3",{class:"fw-bold fs-3"},"用戶資料",-1),N={class:"table align-middle"},q={key:0},F=e("th",{style:{width:"100px"}},"姓名",-1),H=e("th",null,"Email",-1),z=e("th",null,"電話",-1),G=e("th",null,"地址",-1),J={class:"col-md-8"},K={class:"mb-3"},Q=e("h3",{class:"fw-bold fs-3"},"訂單細節",-1),W={class:"table align-middle"},X=e("th",{style:{width:"100px"}},"訂單編號",-1),Y=e("th",null,"下單時間",-1),Z=e("th",null,"付款時間",-1),I={key:0},ee={key:1},te=e("th",null,"付款狀態",-1),se={key:0,class:"text-success"},de={key:1,class:"text-danger"},oe=e("th",null,"總金額",-1),le={class:"mb-3"},ae=e("h3",{class:"fw-bold fs-3"},"選購商品",-1),ne={class:"table align-middle"},re={class:"text-end"},ie={class:"d-flex justify-content-end"},ce={class:"form-check"},he={for:"paid",class:"form-check-label"},_e={key:0,class:"text-success"},ue={key:1,class:"text-danger"},pe={class:"modal-footer"},me=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"取消",-1);function ge(a,l,h,O,t,c){return d(),o("div",E,[e("div",S,[e("div",U,[T,e("div",R,[e("div",A,[e("div",B,[j,e("table",N,[t.tempOrderModal.user?(d(),o("tbody",q,[e("tr",null,[F,e("td",null,s(t.tempOrderModal.user.name),1)]),e("tr",null,[H,e("td",null,s(t.tempOrderModal.user.email),1)]),e("tr",null,[z,e("td",null,s(t.tempOrderModal.user.tel),1)]),e("tr",null,[G,e("td",null,s(t.tempOrderModal.user.address),1)])])):D("",!0)])]),e("div",J,[e("div",K,[Q,e("table",W,[e("tbody",null,[e("tr",null,[X,e("td",null,s(t.tempOrderModal.id),1)]),e("tr",null,[Y,e("td",null,s(new Date(t.tempOrderModal.create_at*1e3).toLocaleDateString()),1)]),e("tr",null,[Z,e("td",null,[t.tempOrderModal.paid_date?(d(),o("span",I,s(new Date(t.tempOrderModal.paid_date*1e3).toLocaleDateString()),1)):(d(),o("span",ee," 時間不正確唷 "))])]),e("tr",null,[te,e("td",null,[t.tempOrderModal.is_paid?(d(),o("strong",se,"已付款")):(d(),o("strong",de,"未付款"))])]),e("tr",null,[oe,e("td",null,s(a.$filters.currency(t.tempOrderModal.total)),1)])])])]),e("div",le,[ae,e("table",ne,[e("tbody",null,[(d(!0),o(p,null,f(t.tempOrderModal.products,r=>(d(),o("tr",{key:r.id},[e("th",null,s(r.product.title),1),e("td",null,s(r.qty)+" / "+s(r.product.unit),1),e("td",re,s(a.$filters.currency(r.total)),1)]))),128))])]),e("div",ie,[e("div",ce,[M(e("input",{type:"checkbox",class:"form-check-input",id:"paid","onUpdate:modelValue":l[0]||(l[0]=r=>t.tempOrderModal.is_paid=r)},null,512),[[y,t.tempOrderModal.is_paid]]),e("label",he,[t.tempOrderModal.is_paid?(d(),o("span",_e,"已付款")):(d(),o("span",ue,"未付款"))])])])])])])]),e("div",pe,[me,e("button",{type:"button",class:"btn btn-primary",onClick:l[1]||(l[1]=r=>h.orderDataUpdate(t.tempOrderModal))},"修改付款狀態")])])])],512)}const fe=b(P,[["render",ge]]);var be={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"vuejs2024",BASE_URL:"/vite_week7_20240303/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:m,VITE_PATH:g}=be,Me={data(){return{isLoading:!1,remoteOrdersData:[],tempOrder:{},pages:[]}},components:{OrderModal:fe,DelModal:C,PaginationComponent:V},methods:{...w(L,["pushMessage"]),getOrdersData(a=1){this.isLoading=!0,this.$http(`${m}/api/${g}/admin/orders?page=${a}`).then(l=>{this.isLoading=!1,this.pushMessage({style:"success",title:"成功取得訂單資訊",content:l.data.message}),this.remoteOrdersData=l.data.orders,this.pages=l.data.pagination}).catch(l=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"無法取得訂單資訊",content:l.response.data.message})})},openModal(a,l){a==="check"?(this.tempOrder={...l},this.$refs.orderModal.show()):a==="delete"&&(this.tempOrder={...l},this.$refs.delModal.show())},updateOrder(a){this.isLoading=!0;const l={is_paid:a.is_paid};this.$http.put(`${m}/api/${g}/admin/order/${a.id}`,{data:l}).then(h=>{this.isLoading=!1,this.$refs.orderModal.hide(),this.pushMessage({style:"success",title:"更新付款狀態",content:h.data.message}),this.getOrdersData()}).catch(h=>{this.isLoading=!1,this.$refs.orderModal.hide(),this.pushMessage({style:"danger",title:"錯誤訊息",content:h.response.data.message})})},delOrder(){this.isLoading=!0,this.$http.delete(`${m}/api/${g}/admin/order/${this.tempOrder.id}`).then(()=>{this.isLoading=!1,this.$refs.delModal.hide(),this.getOrdersData()}).catch(a=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"錯誤訊息",content:a.response.data.message})})}},mounted(){this.getOrdersData()}},ye={class:"container-fluid"},Oe={class:"p-5"},ve={class:"card"},ke={class:"card-body px-5 py-4"},xe={class:"table align-middle"},De=e("thead",null,[e("tr",null,[e("th",{width:"250"},"購買時間"),e("th",null,"Email"),e("th",null,"購買款項"),e("th",{width:"150"},"應付金額"),e("th",{width:"150"},"是否付款"),e("th",{width:"150"},"編輯")])],-1),we={class:"form-check form-switch"},Le=["id","onUpdate:modelValue","onChange"],$e=["for"],Ce={key:0,class:"text-success"},Ve={key:1,class:"text-danger"},Pe={class:"d-flex gap-3"},Ee=["onClick"],Se=["onClick"];function Ue(a,l,h,O,t,c){const r=_("VLoading"),v=_("PaginationComponent"),k=_("OrderModal"),x=_("DelModal");return d(),o(p,null,[u(r,{active:t.isLoading},null,8,["active"]),e("div",ye,[e("div",Oe,[e("div",ve,[e("div",ke,[e("table",xe,[De,e("tbody",null,[(d(!0),o(p,null,f(t.remoteOrdersData,n=>(d(),o("tr",{key:n.id},[e("td",null,s(new Date(n.create_at*1e3).toLocaleDateString()),1),e("td",null,s(n.user.email),1),e("td",null,[e("ol",null,[(d(!0),o(p,null,f(n.products,i=>(d(),o("li",{key:i.id},s(i.product.title)+" 數量："+s(i.qty)+" "+s(i.product.unit),1))),128))])]),e("td",null,s(n.total),1),e("td",null,[e("div",we,[M(e("input",{class:"form-check-input",type:"checkbox",id:`switch${n.id}`,"onUpdate:modelValue":i=>n.is_paid=i,onChange:i=>c.updateOrder(n)},null,40,Le),[[y,n.is_paid]]),e("label",{for:`switch${n.id}`,class:"form-check-label"},[n.is_paid?(d(),o("span",Ce,"已付款")):(d(),o("span",Ve,"未付款"))],8,$e)])]),e("td",null,[e("div",Pe,[e("i",{style:{cursor:"pointer"},class:"fs-3 text-primary bi bi-calendar-check",onClick:i=>c.openModal("check",n)},null,8,Ee),e("i",{style:{cursor:"pointer"},class:"fs-3 text-danger bi bi-x-circle",onClick:i=>c.openModal("delete",n)},null,8,Se)])])]))),128))])]),u(v,{pages:t.pages,onChangePage:c.getOrdersData,"get-products":c.getOrdersData},null,8,["pages","onChangePage","get-products"])])])]),u(k,{ref:"orderModal",order:t.tempOrder,"order-data-update":c.updateOrder},null,8,["order","order-data-update"]),u(x,{ref:"delModal","temp-Product":t.tempOrder,"del-Product":c.delOrder},null,8,["temp-Product","del-Product"])])],64)}const je=b(Me,[["render",Ue]]);export{je as default};
