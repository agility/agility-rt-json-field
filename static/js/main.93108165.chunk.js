(this["webpackJsonpagility-rt-json-field"]=this["webpackJsonpagility-rt-json-field"]||[]).push([[0],{13:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var o=n(1),a=n.n(o),s=n(4),i=n.n(s),c=(n(13),n(8)),r=n(5),l=n.n(r),d=n(6),u=n.n(d),g=n(7),f=n.n(g),j=n(0);var h=function(){var e=Object(o.useState)(""),t=Object(c.a)(e,2),n=t[0],a=t[1],s=function(e){e!==n&&(console.log("Value changed",n,e),a(e),window.parent?(console.log("posting message to parent..."),window.parent.postMessage({message:e,type:"setNewValueFromCustomField"},"*")):console.log("can't post message to parent :("))};return Object(o.useEffect)((function(){var e=new l.a({autofocus:!0,placeholder:"Enter your Rich Text here",holder:"editorjs",tools:{header:u.a,list:f.a},onChange:function(){e.save().then((function(e){var t=JSON.stringify(e);s(t)}))},onReady:function(){if(console.log("READY"),n){var t=JSON.parse(n);e.render(t)}}});window.addEventListener("message",(function(e){console.log("Got message",e.data),"setInitialValueForCustomField"===e.data.type&&(console.log("GOT VALUE",e.data.message),n!==e.data.message&&a(e.data.message))}),!1)}),[]),Object(j.jsxs)("div",{className:"field-row",children:[Object(j.jsxs)("label",{children:["Content:",Object(j.jsx)("textarea",{value:n,onChange:function(e){return s(e.target.value)}})]}),Object(j.jsx)("div",{id:"editorjs"})]})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,23)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),o(e),a(e),s(e),i(e)}))};i.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(h,{})}),document.getElementById("root")),p()}},[[22,1,2]]]);
//# sourceMappingURL=main.93108165.chunk.js.map