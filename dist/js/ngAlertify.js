angular.module("ngAlertify",[]).factory("alertify",function(){"use strict";var t={exports:!0};!function(){function e(t){var e=t.getBoundingClientRect(),n=document.body.getBoundingClientRect();t.style.top=n.height/2-e.height/2+"px"}function n(t){var e=document.createElement("div");return e.innerHTML=t,e.firstChild}function o(t,e){for(var n=t.length?t:[t],i=0;i<n.length;i++){if(null!==n[i].getAttribute("data-"+e))return n[i];if(n[i].childNodes.length)return o(n[i].childNodes,e)}}function i(){var t={parent:document.body,dialogWidth:"400px",dialogPersistent:!0,dialogContainerClass:"alertify",dialogButtons:{ok:{label:"Ok",autoClose:!0,template:'<button data-alertify-btn="ok" tabindex="1"></button>'},cancel:{label:"Cancel",autoClose:!0,template:'<button data-alertify-btn="cancel" tabindex="2"></button>'},custom:{label:"Custom",autoClose:!1,template:'<button data-alertify-btn tabindex="3"></button>'}},logDelay:5e3,logMaxItems:2,logPosition:"bottom left",logCloseOnClick:!1,logContainerClass:"alertify-logs",logTemplateMethod:null,templates:{dialog:{buttonsHolder:"<nav data-alertify-btn-holder></nav>",message:"<div data-alertify-msg></div>",input:'<input data-alertify-input type="text">'},log:{message:"<div data-alertify-log-msg></div>"}}},i={version:"1.0.11",parent:t.parent,dialogWidth:t.dialogWidth,dialogPersistent:t.dialogPersistent,dialogContainerClass:t.dialogContainerClass,dialogButtons:t.dialogButtons,promptValue:"",promptPlaceholder:"",logDelay:t.logDelay,logMaxItems:t.logMaxItems,logPosition:t.logPosition,logCloseOnClick:t.logCloseOnClick,logContainerClass:t.logContainerClass,logTemplateMethod:t.logTemplateMethod,templates:t.templates,build:function(t,e){var i={};if(i.container=document.createElement("div"),i.container.className=this.dialogContainerClass+" hide",i.wrapper=document.createElement("div"),i.wrapper.className="dialog",i.dialog=document.createElement("div"),i.dialog.style.width=this.dialogWidth,i.content=document.createElement("div"),i.content.className="content","dialog"===t.type?i.content.innerHTML=t.message:(i.messageWrapper=n(this.templates.dialog.message),i.message=o(i.messageWrapper,"alertify-msg"),i.message.innerHTML=t.message,i.content.appendChild(i.messageWrapper)),i.buttonsWrapper=n(this.templates.dialog.buttonsHolder),i.buttonsHolder=o(i.buttonsWrapper,"alertify-btn-holder"),"prompt"===t.type){var a=n(this.templates.dialog.input);i.input=o(a,"alertify-input"),i.label=o(a,"alertify-input-label"),i.content.appendChild(a)}i.container.appendChild(i.wrapper),i.wrapper.appendChild(i.dialog),i.dialog.appendChild(i.content),i.dialog.appendChild(i.buttonsWrapper),i.buttonsHolder.innerHTML="",i.buttons=[];for(var l=0;l<e.length;l++){var s=o(e[l].element,"alertify-btn");s.innerHTML=e[l].label,i.buttonsHolder.appendChild(e[l].element)}return i},createButtonsDefinition:function(t){for(var e=[],o=0;o<t.buttons.length;o++){var i=this.buildButtonObject(t.buttons[o]);("dialog"===t.type||"alert"===t.type&&"ok"===i.type||["confirm","prompt"].indexOf(t.type)!==-1&&["ok","cancel"].indexOf(i.type)!==-1)&&(i.element=n(i.template),e.push(i))}return e},buildButtonObject:function(t){var e={},n=t.type||"custom",o=this.dialogButtons,i=["ok","cancel","custom"];if("undefined"!=typeof t.type&&i.indexOf(t.type)===-1)throw new Error('Wrong button type: "'+t.type+'". Valid values: "'+i.join('", "')+'"');return e.type=n,e.label="undefined"!=typeof t.label?t.label:o[n].label,e.autoClose="undefined"!=typeof t.autoClose?t.autoClose:o[n].autoClose,e.template="undefined"!=typeof t.template?t.template:o[n].template,e.click="undefined"!=typeof t.click?t.click:o[n].click,e},setCloseLogOnClick:function(t){this.logCloseOnClick=t},close:function(t,e){this.logCloseOnClick&&t.addEventListener("click",function(){r(t)}),e=e&&!isNaN(+e)?+e:this.logDelay,e<0?r(t):e>0&&setTimeout(function(){r(t)},e)},dialog:function(t,e,n){return this.setup({type:e,message:t,buttons:n})},log:function(t,e,n){if(a&&a.elements.length){var o=a.elements.length-this.logMaxItems;if(o>=0)for(var i=0,l=o+1;i<l;i++)this.close(a.elements[i],-1)}this.notify(t,e,n)},setLogContainerClass:function(e){this.logContainerClass=t.logContainerClass+" "+e},setLogPosition:function(t){var e=t.split(" ");["top","bottom"].indexOf(e[0])!==-1&&["left","right"].indexOf(e[1])!==-1&&(this.logPosition=t)},setupLogContainer:function(){var t=this.logContainerClass+" "+this.logPosition,e=a&&a.container.parentNode!==this.parent;a&&!e||(e&&r(a.container),a={},a.container=document.createElement("div"),a.container.className=t,this.parent.appendChild(a.container)),a.container.className!==t&&(a.container.className=t)},notify:function(t,e,s){this.setupLogContainer();var u={},c={};if(u.dom=c,c.wrapper=n(this.templates.log.message),c.message=o(c.wrapper,"alertify-log-msg"),l?$(c.message).addClass(e):c.message.classList.add(e),i.logTemplateMethod?c.message.innerHTML=i.logTemplateMethod(t):c.message.innerHTML=t,u.closeLog=function(){r(c.wrapper)},"function"==typeof s){var d=function(t){s(t,u)};l?$(c.wrapper).on("click",d):c.wrapper.addEventListener("click",d)}a.elements||(a.elements=[]),a.elements.push(c.wrapper),a.container.appendChild(c.wrapper),setTimeout(function(){c.wrapper.className+=" show"},10),this.close(c.wrapper,this.logDelay)},setup:function(t){function n(t){"function"!=typeof t&&(t=function(){});for(var e=0;e<a.length;e++){var n=a[e],l=function(e){return function(n){i=e,e.click&&"function"==typeof e.click&&e.click(n,u),t({ui:u,event:n}),e.autoClose===!0&&u.closeDialog()}}(n);n.element.addEventListener("click",l)}c&&c.addEventListener("keyup",function(t){13===t.which&&o.click()})}for(var o,i,a=this.createButtonsDefinition(t),s=this.build(t,a),u={},c=s.input,d=s.label,p=0;p<a.length;p++)"ok"===a[p].type&&(o=a[p].element);c&&("string"==typeof this.promptPlaceholder&&(d?d.textContent=this.promptPlaceholder:c.placeholder=this.promptPlaceholder),"string"==typeof this.promptValue&&(c.value=this.promptValue)),u.dom=s,u.closeDialog=function(){r(s.container)},u.centerDialog=function(){e(s.wrapper)},u.setMessage=function(t){s.message.innerHTML=t},u.setContent=function(t){s.content.innerHTML=t},u.getInputValue=function(){if(s.input)return s.input.value},u.getButtonObject=function(){if(i)return{type:i.type,label:i.label,autoClose:i.autoClose,element:i.element}};var g;return"function"==typeof Promise?g=new Promise(n):n(),this.dialogPersistent===!1&&s.container.addEventListener("click",function(t){t.target!==this&&t.target!==s.wrapper||r(s.container)}),window.onresize=function(){u.centerDialog()},this.parent.appendChild(s.container),setTimeout(function(){l?$(s.container).removeClass("hide"):s.container.classList.remove("hide"),u.centerDialog(),c&&t.type&&"prompt"===t.type?(c.select(),c.focus()):o&&o.focus()},100),g},setDelay:function(e){return e=e||0,this.logDelay=isNaN(e)?t.logDelay:parseInt(e,10),this},setLogMaxItems:function(e){this.logMaxItems=parseInt(e||t.logMaxItems)},setDialogWidth:function(e){"number"==typeof e&&(e+="px"),this.dialogWidth="string"==typeof e?e:t.dialogWidth},setDialogPersistent:function(t){this.dialogPersistent=t},setDialogContainerClass:function(e){this.dialogContainerClass=t.dialogContainerClass+" "+e},setTheme:function(e){if(e){if("string"==typeof e)switch(e.toLowerCase()){case"bootstrap":this.dialogButtons.ok.template='<button data-alertify-btn="ok" class="ok btn btn-primary" tabindex="1"></button>',this.dialogButtons.cancel.template='<button data-alertify-btn="cancel" class="cancel btn btn-default" tabindex="2"></button>',this.templates.dialog.input="<input data-alertify-input class='form-control' type='text'>";break;case"purecss":this.dialogButtons.ok.template='<button data-alertify-btn="ok" class="ok pure-button" tabindex="1"></button>',this.dialogButtons.cancel.template='<button data-alertify-btn="cancel" class="cancel pure-button" tabindex="2"></button>';break;case"mdl":case"material-design-light":this.dialogButtons.ok.template='<button data-alertify-btn="ok" class="ok mdl-button mdl-js-button mdl-js-ripple-effect"  tabindex="1"></button>',this.dialogButtons.cancel.template='<button data-alertify-btn="cancel" class="cancel mdl-button mdl-js-button mdl-js-ripple-effect" tabindex="2"></button>',this.templates.dialog.input='<div class="mdl-textfield mdl-js-textfield"><input data-alertify-input class="mdl-textfield__input"><label data-alertify-input-label class="md-textfield__label"></label></div>';break;case"angular-material":this.dialogButtons.ok.template='"<button data-alertify-btn="ok" class="ok md-primary md-button" tabindex="1"></button>"',this.dialogButtons.cancel.template='<button data-alertify-btn="cancel" class="cancel md-button" tabindex="2"></button>',this.templates.dialog.input='<div layout="column"><md-input-container md-no-float><input data-alertify-input type="text"></md-input-container></div>';break;case"default":default:this.dialogButtons.ok.template=t.dialogButtons.ok.template,this.dialogButtons.cancel.template=t.dialogButtons.cancel.template,this.templates.dialog.input=t.templates.dialog.input}"object"==typeof e&&(this.templates.dialog=e.dialog||this.templates.dialog,this.templates.log=e.log||this.templates.log)}},reset:function(){this.theme("default"),this.parent=t.parent,this.dialogWidth=t.dialogWidth,this.dialogPersistent=t.dialogPersistent,this.dialogContainerClass=t.dialogContainerClass,this.promptValue="",this.promptPlaceholder="",this.logDelay=t.logDelay,this.logMaxItems=t.logMaxItems,this.logPosition=t.logPosition,this.logCloseOnClick=t.logCloseOnClick,this.logContainerClass=t.logContainerClass,this.logTemplateMethod=null},injectCSS:function(){if(!document.querySelector("#alertifyCSS")){var t=document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",e.id="alertifyCSS",t.insertBefore(e,t.firstChild)}},removeCSS:function(){var t=document.querySelector("#alertifyCSS");t&&t.parentNode&&t.parentNode.removeChild(t)}};return i.injectCSS(),{_$alertify:i,parent:function(t){i.parent=t},reset:function(){return i.reset(),this},dialog:function(t,e){return i.dialog(t,"dialog",e)||this},alert:function(t,e){return e=e||{},e.type="ok",i.dialog(t,"alert",[e])||this},confirm:function(t,e,n){return e=e||{},n=n||{},e.type="ok",n.type="cancel",i.dialog(t,"confirm",[e,n])||this},prompt:function(t,e,n){return e=e||{},n=n||{},e.type="ok",n.type="cancel",i.dialog(t,"prompt",[e,n])||this},log:function(t,e){return i.log(t,"default",e),this},success:function(t,e){return i.log(t,"success",e),this},warning:function(t,e){return i.log(t,"warning",e),this},error:function(t,e){return i.log(t,"error",e),this},dialogWidth:function(t){return i.setDialogWidth(t),this},dialogPersistent:function(t){return i.setDialogPersistent(t),this},dialogContainerClass:function(t){return i.setDialogContainerClass(t||""),this},delay:function(t){return i.setDelay(t),this},placeholder:function(t){return i.promptPlaceholder=t,this},defaultValue:function(t){return i.promptValue=t,this},maxLogItems:function(t){return i.setLogMaxItems(t),this},closeLogOnClick:function(t){return i.setCloseLogOnClick(t),this},logPosition:function(t){return i.setLogPosition(t||""),this},logContainerClass:function(t){return i.setLogContainerClass(t||""),this},logMessageTemplate:function(t){return i.logTemplateMethod=t,this},theme:function(t){return i.setTheme(t),this},clearDialogs:function(){for(var e;e=i.parent.querySelector(":scope > ."+t.dialogContainerClass);)i.parent.removeChild(e);return this},clearLogs:function(){return a&&(a.container.innerHTML=""),this},version:i.version}}var a,l=!!window.jQuery,s=500,r=function(t){if(t){var e=function(){t&&t.parentNode&&t.parentNode.removeChild(t)};l?$(t).removeClass("show"):t.classList.remove("show"),l?$(t).addClass("hide"):t.classList.add("hide"),l?$(t).on("transitionend",e):t.addEventListener("transitionend",e),setTimeout(e,s)}};if("undefined"!=typeof t&&t&&t.exports){t.exports=function(){return new i};var u=new i;for(var c in u)t.exports[c]=u[c]}else"function"==typeof define&&define.amd?define(function(){return new i}):window.alertify=new i}();var e=t.exports;return new e});