(function(e){function t(t){for(var r,i,l=t[0],u=t[1],c=t[2],s=0,m=[];s<l.length;s++)i=l[s],o[i]&&m.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(m.length)m.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,l=1;l<n.length;l++){var u=n[l];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/tornooi/dist/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var d=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"1d19":function(e,t,n){"use strict";var r=n("24dd"),o=n.n(r);o.a},"24dd":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=n("43f9"),a=n.n(o),i=(n("51de"),n("e094"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view",{attrs:{id:"content"}}),n("md-bottom-bar",{attrs:{id:"bottom-bar","md-sync-route":"","md-type":"fixed"}},[n("md-bottom-bar-item",{attrs:{to:"/","md-label":"Tornooi","md-icon":"home"}}),n("md-bottom-bar-item",{attrs:{to:"/my-team","md-label":"Mijn Ploeg","md-icon":"favorite"}}),n("md-bottom-bar-item",{attrs:{to:"/bar","md-label":"Alle Matchen","md-icon":"access_time"}})],1)],1)}),l=[],u={name:"app",components:{}},c=u,d=(n("034f"),n("2877")),s=Object(d["a"])(c,i,l,!1,null,null,null),m=s.exports,f=n("8c4f"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("over ! ")])},h=[],v=r["default"].extend({name:"overview"}),b=v,y=Object(d["a"])(b,p,h,!1,null,null,null),_=y.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(e._s(e.info))])},j=[],w=n("7338"),x=n.n(w),k=r["default"].extend({name:"my-team",data(){return{info:null}},mounted(){x.a.get("https://api.coindesk.com/v1/bpi/currentprice.json").then(e=>this.info=e)},methods:{}}),O=k,T=Object(d["a"])(O,g,j,!1,null,null,null),I=T.exports,P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"center-container"},[n("h3",[e._v("Kies je ploeg:")]),n("md-field",[n("md-select",{attrs:{name:"my-team"},model:{value:e.chosenTeamId,callback:function(t){e.chosenTeamId=t},expression:"chosenTeamId"}},e._l(e.allTeams,function(t){return n("md-option",{key:t.id,attrs:{value:t.id}},[e._v("\n                 "+e._s(t.name)+"\n            ")])}),1)],1),n("md-button",{staticClass:"md-raised md-primary",attrs:{disabled:void 0===e.chosenTeamId},on:{click:function(t){return e.okClicked()}}},[e._v("Ok")])],1)},$=[],M=r["default"].extend({name:"my-team-picker",data(){return{allTeams:[],chosenTeamId:void 0}},mounted(){x.a.get("http://tournooi.dejackies.be/api/public-tournament/all/teams",{withCredentials:!0}).then(e=>this.allTeams=e.data)},methods:{okClicked(){this.chosenTeamId&&this.$router.push({path:`/my-team/${this.chosenTeamId}`})}}}),C=M,S=(n("1d19"),Object(d["a"])(C,P,$,!1,null,null,null)),E=S.exports,J=n("ed18"),A=n.n(J);A.a.config(),r["default"].config.productionTip=!1,r["default"].use(a.a),r["default"].use(f["a"]);var K=[{path:"/",component:_},{path:"/overview",component:_},{path:"/my-team",component:E},{path:"/my-team/:id",component:I},{path:"*",redirect:"/"}],q=new f["a"]({routes:K});new r["default"]({router:q,render:function(e){return e(m)}}).$mount("#app")},"64a9":function(e,t,n){}});
//# sourceMappingURL=app.473ed2d8.js.map