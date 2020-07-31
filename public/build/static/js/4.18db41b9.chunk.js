(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[4],{100:function(e,a){},105:function(e,a,t){"use strict";t.r(a);var n=t(20),s=t(16),r=t(104),l=t(12),i=t.n(l),c=t(21),o=t(7),m=t(8),h=t(4),u=t(9),d=t(10),g=t(0),p=t.n(g),f=t(69),v=t.n(f),b=function(e){var a=e.user,t=a.name,n=a.age,s=a.gender,r=a.avatar,l=a.country,i=e.handleCompanionChange,c=e.userMessages,o=void 0===c?[]:c;return p.a.createElement("div",{className:"row p-1 chat-user-wrapper",onClick:function(){i(e.user),document.getElementById("nav-chat-tab").click()}},p.a.createElement("div",{className:"col-12 px-0 d-flex flex-row justify-content-sm-start font-weight-bold"},p.a.createElement("img",{src:r,alt:r,className:"avatar-img ml-2"}),p.a.createElement("span",{className:"ml-2 user-name-title align-self-center"},t,p.a.createElement("img",{src:"/images/gender_icons/".concat(s,".png"),alt:s,className:"small-gender-img ml-1"})),o.find((function(e){return!e.isSeen}))?p.a.createElement("div",{className:"unseen-messages-indicator"},o.reduce((function(e,a){return a.isSeen?e:++e}),0)):null,p.a.createElement("span",{className:"ml-2 text-muted user-age-and-flag-title align-self-center"},p.a.createElement("span",{className:"user-age-title"},n," years old "),p.a.createElement("img",{src:"/images/flags/".concat(l,".svg"),alt:l,className:"small-flag-img ml-1"}))))},E={name:"",isMale:!0,isFemale:!0,minAge:1,maxAge:99},C=function(e){Object(d.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(o.a)(this,t),(n=a.call(this,e)).state=E,n.handleNameChange=n.handleNameChange.bind(Object(h.a)(n)),n.handleMalesCheckboxChange=n.handleMalesCheckboxChange.bind(Object(h.a)(n)),n.handleFemalesCheckboxChange=n.handleFemalesCheckboxChange.bind(Object(h.a)(n)),n.handleMaxAgeChange=n.handleMaxAgeChange.bind(Object(h.a)(n)),n.handleMinAgeChange=n.handleMinAgeChange.bind(Object(h.a)(n)),n.handleFilterReset=n.handleFilterReset.bind(Object(h.a)(n)),n}return Object(m.a)(t,[{key:"handleNameChange",value:function(e){var a=this,t=e.target.value;t&&!t.match(/^[a-zA-Z0-9 ]{1,15}$/)||this.setState({name:t},(function(){return a.props.handleUsersFilter(a.state)}))}},{key:"handleMalesCheckboxChange",value:function(){var e=this;this.setState({isMale:!this.state.isMale},(function(){return e.props.handleUsersFilter(e.state)}))}},{key:"handleFemalesCheckboxChange",value:function(){var e=this;this.setState({isFemale:!this.state.isFemale},(function(){return e.props.handleUsersFilter(e.state)}))}},{key:"handleMinAgeChange",value:function(e){var a=this,t=e.target.value;(!t||t<=99&&t>=1)&&this.setState({minAge:t},(function(){return a.props.handleUsersFilter(a.state)}))}},{key:"handleMaxAgeChange",value:function(e){var a=this,t=e.target.value;(!t||t<=99&&t>=1)&&this.setState({maxAge:t},(function(){return a.props.handleUsersFilter(a.state)}))}},{key:"handleFilterReset",value:function(e){var a=this;e.preventDefault(),this.setState(Object(s.a)({},E),(function(){return a.props.handleUsersFilter(a.state)}))}},{key:"render",value:function(){return p.a.createElement("form",{className:"form-inline chat-users-sort-form",onSubmit:this.handleFilterReset},p.a.createElement("div",{className:"d-flex mt-1"},p.a.createElement("label",{htmlFor:"name",className:"font-smaller"},"Name:"),p.a.createElement("input",{value:this.state.name,id:"name",type:"text",className:"form-control-sm filter-text-input ml-2",onChange:this.handleNameChange,autoComplete:"off"})),p.a.createElement("div",{className:"d-flex chat-users-filter-checkbox"},p.a.createElement("div",{className:"from-check"},p.a.createElement("label",{className:"form-check-label font-smaller"},"Males:",p.a.createElement("input",{className:"form-check-input mx-2 my-0",type:"checkbox",checked:this.state.isMale,onChange:this.handleMalesCheckboxChange}))),p.a.createElement("div",{className:"from-check females-form-check"},p.a.createElement("label",{className:"form-check-label font-smaller"},"Females:",p.a.createElement("input",{className:"form-check-input mx-2 my-0",type:"checkbox",checked:this.state.isFemale,onChange:this.handleFemalesCheckboxChange})))),p.a.createElement("div",{className:"d-flex"},p.a.createElement("div",{className:"d-flex"},p.a.createElement("label",{htmlFor:"min-age",className:"font-smaller"}," ","Min age:"," "),p.a.createElement("input",{value:this.state.minAge,id:"min-age",type:"number",className:"form-control-sm filter-number-input mx-2",onChange:this.handleMinAgeChange})),p.a.createElement("div",{className:"d-flex"},p.a.createElement("label",{htmlFor:"max-age"}," Max age: "),p.a.createElement("input",{value:this.state.maxAge,id:"max-age",type:"number",className:"form-control-sm filter-number-input mx-2",onChange:this.handleMaxAgeChange}))),p.a.createElement("button",{type:"submit",className:"btn btn-sm btn-info font-weight-bold"},"RESET"))}}]),t}(p.a.Component),N=function(e){Object(d.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(o.a)(this,t),(n=a.call(this,e)).state={name:"",isMale:!0,isFemale:!0,minAge:1,maxAge:99},n.handleUsersFilter=n.handleUsersFilter.bind(Object(h.a)(n)),n}return Object(m.a)(t,[{key:"filterUser",value:function(e){var a=this.state,t=a.name,n=a.isFemale,s=a.isMale,r=a.minAge,l=a.maxAge;return(""===t||null!==e.name.toLowerCase().match(t.toLowerCase()))&&(!("male"===e.gender&&!s)&&(!("female"===e.gender&&!n)&&!(e.age>l||e.age<r)))}},{key:"handleUsersFilter",value:function(e){this.setState(Object(s.a)({},e))}},{key:"render",value:function(){var e=this;return p.a.createElement("div",{className:"chat-users-sorting"},p.a.createElement("div",{className:"chat-users-list-wrapper"},this.props.users.filter(this.filterUser,this).map((function(a,t){var n;return p.a.createElement(b,{key:t,user:a,handleCompanionChange:e.props.handleCompanionChange,userMessages:null!==(n=e.props.messages[a.id])&&void 0!==n?n:[]})}))),p.a.createElement(C,{handleUsersFilter:this.handleUsersFilter}))}}]),t}(p.a.Component),k=t(5),y=t.n(k),x=t(103),S=t.n(x),j=function(e){Object(d.a)(t,e);var a=Object(u.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"render",value:function(){var e=this.props.message,a=e.text,t=e.time,n=e.user_id,s=e.isSeen,r=this.props,l=r.user,i=r.handleMessageSeen,c=r.index,o=l.id===n?"right":"left";return p.a.createElement(S.a,{onChange:function(e){e&&!s&&i(c)}},p.a.createElement("div",{className:"message-".concat(o)},a,p.a.createElement("div",{className:"message-time-".concat(o)},t)))}}]),t}(p.a.Component),O=function(e){Object(d.a)(t,e);var a=Object(u.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"componentDidUpdate",value:function(){var e=y()(".chat-messages-wrapper");void 0!==e&&e.length>0&&e.scrollTop(e[0].scrollHeight)}},{key:"render",value:function(){var e=this;return p.a.createElement("div",{className:"p-3 chat-messages-wrapper"},(this.props.messages||[]).map((function(a,t){return p.a.createElement(j,{user:e.props.user,handleMessageSeen:e.props.handleMessageSeen,key:t,index:t,message:a})})))}}]),t}(p.a.Component),M=function(e){Object(d.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(o.a)(this,t),(n=a.call(this,e)).state={input:"",error:""},n.handleInputChange=n.handleInputChange.bind(Object(h.a)(n)),n.handleFormSubmit=n.handleFormSubmit.bind(Object(h.a)(n)),n}return Object(m.a)(t,[{key:"handleInputChange",value:function(e){var a=e.target.value;if(!a||"string"===typeof a){if(a.length<500)return this.setState({input:a,error:""});this.setState({error:"The message must be less than ".concat(500," characters")})}}},{key:"handleFormSubmit",value:function(e){e.preventDefault();var a=this.state.input;if(""===(a="string"===typeof a?a.trim():""))return this.setState({error:"Type something"});a.length<500&&(this.props.handleMessageSend(a),this.setState({input:"",error:""}))}},{key:"render",value:function(){return p.a.createElement("form",{className:"input-group position-absolute chat-form",onSubmit:this.handleFormSubmit},p.a.createElement("input",{type:"text",className:"form-control",value:this.state.input,onChange:this.handleInputChange}),p.a.createElement("div",{className:"input-group-append"},p.a.createElement("button",{className:"btn btn-info char-form-button"},"SEND")),this.state.error?p.a.createElement("div",{className:"error-message error-message--chat-form"},this.state.error):null)}}]),t}(p.a.Component),F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.companion,t=a.name,n=a.age,s=a.gender,r=a.avatar,l=a.country;return p.a.createElement("div",{className:"row p-1 chat-user-wrapper__header chat-user-wrapper__header"},p.a.createElement("div",{className:"col-12 d-flex flex-row justify-content-sm-start font-weight-bold"},p.a.createElement("img",{src:r,alt:r,className:"avatar-img ml-2"}),p.a.createElement("span",{className:"ml-2 user-name-title align-self-center"},t,p.a.createElement("img",{src:"/images/gender_icons/".concat(s,".png"),alt:s,className:"small-gender-img ml-1"})),p.a.createElement("span",{className:"ml-2 text-muted user-age-and-flag-title align-self-center"},p.a.createElement("span",{className:"user-age-title"},n," years old"),p.a.createElement("img",{src:"/images/flags/".concat(l,".svg"),alt:l,className:"small-flag-img ml-1"}))))},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.user,t=e.companion,n=e.messages,s=e.handleMessageSeen,r=e.handleMessageSend;return p.a.createElement("div",{className:"d-flex flex-column position-relative chat-box-wrapper"},p.a.createElement(F,{companion:t}),!t.hasLeft||p.a.createElement("div",{className:"user-left-message"},"".concat(t.name," has left the chat")),void 0===!t.hasLeft||p.a.createElement(p.a.Fragment,null,p.a.createElement(O,{user:a,messages:n,handleMessageSeen:s}),p.a.createElement(M,{handleMessageSend:r})))},_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.user,t=a.name,n=a.avatar,s=a.age,r=a.gender,l=a.country;l&&(l=l.replace(/_/g," "));var i=function(){document.getElementById("nav-users-tab").click()};return p.a.createElement("div",{className:"message-welcome d-flex flex-column  align-content-center text-center"},p.a.createElement("h3",null,"Hello!!!"),p.a.createElement("div",null,p.a.createElement("img",{src:n,alt:"avatar"})),p.a.createElement("h4",{className:"font-weight-bold"},"".concat(t)),p.a.createElement("h5",null,"You're a ".concat(s," years old ").concat(r," from ").concat(l)),p.a.createElement("p",null,"Now just find someone to talk!"),p.a.createElement("button",{className:"btn btn-info btn-lg w-75 mx-auto font-weight-bold",onClick:i},"FIND"))},A=function(e){Object(d.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(o.a)(this,t),(n=a.call(this,e)).state={user:!1,companion:!1,socket:!1,users:[],messages:{}},n.handleCompanionChange=n.handleCompanionChange.bind(Object(h.a)(n)),n.handleMessageSend=n.handleMessageSend.bind(Object(h.a)(n)),n.handleMessageSeen=n.handleMessageSeen.bind(Object(h.a)(n)),n}return Object(m.a)(t,[{key:"checkIfUserWasDisconnect",value:function(){var e=Object(c.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/check-user",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 3:200!==e.sent.status&&this.props.history.push("/",{user:!1}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("Server error occured");case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(a){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=this,a=!!(void 0!==this.props.location.state)&&this.props.location.state.user;a?(this.checkIfUserWasDisconnect(a),window.onpopstate=function(){e.state.socket&&e.state.socket.disconnect(),e.props.history.push("/",{user:!1})},this.setState({user:a,socket:v()("http://localhost:5000")},(function(){var a=e.state.socket;a.emit("join",e.state.user.id),a.emit("load_connected_users",e.state.user.id),a.on("load_connected_users",(function(a){e.setState({users:[].concat(Object(r.a)(e.state.users),Object(r.a)(a))})})),a.on("new_user_connected",(function(a){e.setState({users:[].concat(Object(r.a)(e.state.users),[a])})})),a.on("user_disconnected",(function(a){var t=e.state.users.filter((function(e){return e.id!==a})),n=e.state.messages;delete n[a];var s=e.state.companion||{};s.hasLeft=!0,e.setState({users:t,messages:n,companion:s})})),a.on("message",(function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=a.companion_id,r=a.text,l={user_id:t,text:r,time:(new Date).toLocaleString("en-US",{hour:"numeric",minute:"numeric",second:"numeric",hour12:!0}),isSeen:!1},i=e.state.messages[t]||[];i.push(l),e.setState({messages:Object(s.a)({},e.state.messages,Object(n.a)({},t,i))})}))}))):this.props.history.push("/",{user:!1})}},{key:"handleCompanionChange",value:function(e){this.state.companion.id!==e.id&&this.setState({companion:e})}},{key:"handleMessageSend",value:function(e){var a={user_id:this.state.user.id,companion_id:this.state.companion.id,text:e};this.state.socket.emit("message",a),this.addMessage(e)}},{key:"addMessage",value:function(e){var a={isSeen:!1,user_id:this.state.user.id,text:e,time:(new Date).toLocaleString("en-US",{hour:"numeric",minute:"numeric",second:"numeric",hour12:!0})},t=this.state.messages[this.state.companion.id]||[];t.push(a),this.setState({messages:Object(s.a)({},this.state.messages,Object(n.a)({},this.state.companion.id,t))})}},{key:"handleMessageSeen",value:function(e){var a=this.state.messages[this.state.companion.id]||[],t=a.length;t>0&&e>=0&&e+1<=t&&(a[e].isSeen=!0,this.setState({messages:Object(s.a)({},this.state.messages,Object(n.a)({},this.state.companion.id,a))}))}},{key:"render",value:function(){var e=this;return p.a.createElement("div",{id:"chatPageWrapper"},p.a.createElement("div",{className:"dark-overlay"},p.a.createElement("div",{className:"container mt-3 w-100"},p.a.createElement("nav",null,p.a.createElement("div",{className:"nav nav-tabs",id:"nav-tab",role:"tablist"},p.a.createElement("a",{className:"nav-item nav-link",id:"nav-history-tab","data-toggle":"tab",href:"#nav-history",role:"tab","aria-controls":"nav-history","aria-selected":"true"},"History"),p.a.createElement("a",{className:"nav-item nav-link active",id:"nav-chat-tab","data-toggle":"tab",href:"#nav-chat",role:"tab","aria-controls":"nav-chat","aria-selected":"false"},"Chat"),p.a.createElement("a",{className:"nav-item nav-link",id:"nav-users-tab","data-toggle":"tab",href:"#nav-users",role:"tab","aria-controls":"nav-users","aria-selected":"false"},"Users"))),p.a.createElement("div",{className:"tab-content w-100",id:"nav-tabContent"},p.a.createElement("div",{className:"tab-pane fade  w-100",id:"nav-history",role:"tabpanel","aria-labelledby":"nav-history-tab"},p.a.createElement(N,{users:this.state.users.filter((function(a){return void 0!==e.state.messages[a.id]})),handleCompanionChange:this.handleCompanionChange,messages:this.state.messages})),p.a.createElement("div",{className:"tab-pane fade show active",id:"nav-chat",role:"tabpanel","aria-labelledby":"nav-chat-tab"},this.state.companion?p.a.createElement(w,{companion:this.state.companion,user:this.state.user,handleMessageSend:this.handleMessageSend,handleMessageSeen:this.handleMessageSeen,messages:this.state.messages[this.state.companion.id]}):p.a.createElement(_,{user:this.state.user})),p.a.createElement("div",{className:"tab-pane fade",id:"nav-users",role:"tabpanel","aria-labelledby":"nav-users-tab"},p.a.createElement(N,{users:this.state.users,handleCompanionChange:this.handleCompanionChange,messages:this.state.messages}))))))}}]),t}(p.a.Component);a.default=A}}]);
//# sourceMappingURL=4.18db41b9.chunk.js.map