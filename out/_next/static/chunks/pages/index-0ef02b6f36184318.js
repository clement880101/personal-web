(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(2679)}])},2679:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return E}});var o=t(5893),i=t(9226),n=t(3366),a=t(7462),s=t(7294),c=t(6010),l=t(4780),d=t(917),u=t(8216),m=t(3616),f=t(1496),h=t(1588),p=t(4867);function v(e){return(0,p.Z)("MuiCircularProgress",e)}(0,h.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);let g=["className","color","disableShrink","size","style","thickness","value","variant"],x=e=>e,k,b,y,Z,w=(0,d.F4)(k||(k=x`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),P=(0,d.F4)(b||(b=x`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),j=e=>{let{classes:r,variant:t,color:o,disableShrink:i}=e,n={root:["root",t,`color${(0,u.Z)(o)}`],svg:["svg"],circle:["circle",`circle${(0,u.Z)(t)}`,i&&"circleDisableShrink"]};return(0,l.Z)(n,v,r)},_=(0,f.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.root,r[t.variant],r[`color${(0,u.Z)(t.color)}`]]}})(({ownerState:e,theme:r})=>(0,a.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:r.transitions.create("transform")},"inherit"!==e.color&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>"indeterminate"===e.variant&&(0,d.iv)(y||(y=x`
      animation: ${0} 1.4s linear infinite;
    `),w)),C=(0,f.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),S=(0,f.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.circle,r[`circle${(0,u.Z)(t.variant)}`],t.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>(0,a.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,d.iv)(Z||(Z=x`
      animation: ${0} 1.4s ease-in-out infinite;
    `),P)),N=s.forwardRef(function(e,r){let t=(0,m.Z)({props:e,name:"MuiCircularProgress"}),{className:i,color:s="primary",disableShrink:l=!1,size:d=40,style:u,thickness:f=3.6,value:h=0,variant:p="indeterminate"}=t,v=(0,n.Z)(t,g),x=(0,a.Z)({},t,{color:s,disableShrink:l,size:d,thickness:f,value:h,variant:p}),k=j(x),b={},y={},Z={};if("determinate"===p){let e=2*Math.PI*((44-f)/2);b.strokeDasharray=e.toFixed(3),Z["aria-valuenow"]=Math.round(h),b.strokeDashoffset=`${((100-h)/100*e).toFixed(3)}px`,y.transform="rotate(-90deg)"}return(0,o.jsx)(_,(0,a.Z)({className:(0,c.Z)(k.root,i),style:(0,a.Z)({width:d,height:d},y,u),ownerState:x,ref:r,role:"progressbar"},Z,v,{children:(0,o.jsx)(C,{className:k.svg,ownerState:x,viewBox:"22 22 44 44",children:(0,o.jsx)(S,{className:k.circle,style:b,ownerState:x,cx:44,cy:44,r:(44-f)/2,fill:"none",strokeWidth:f})})}))});var D=t(9008),M=t.n(D),$=t(1163);function E(){var e=(0,$.useRouter)();return(0,s.useEffect)(function(){e.push("/home")},[]),(0,o.jsxs)(i.Z,{sx:{height:"100vh",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[(0,o.jsxs)(M(),{children:[(0,o.jsx)("meta",{property:"og:type",content:"website"}),(0,o.jsx)("meta",{property:"og:title",content:"home|clementc.dev"}),(0,o.jsx)("meta",{property:"og:description",content:"portfolio and blog by clement"}),(0,o.jsx)("meta",{property:"og:image",content:"https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/thumbnail%2Fpersonalweb.PNG?alt=media&token=dece4229-f941-4f15-b24e-eb7d6abe1c98"}),(0,o.jsx)("meta",{property:"og:url",content:"https://clementc.dev/home"}),(0,o.jsx)("title",{children:"home|clementc.dev"})]}),(0,o.jsx)(N,{})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);