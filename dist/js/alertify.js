!function(){"use strict";function t(t){var e=t.getBoundingClientRect(),n=document.body.getBoundingClientRect();t.style.top=n.height/2-e.height/2+"px"}function e(t){var e=document.createElement("div");return e.innerHTML=t,e.firstChild}function n(t,e){for(var o=t.length?t:[t],i=0;i<o.length;i++){if(null!==o[i].getAttribute("data-"+e))return o[i];if(o[i].childNodes.length)return n(o[i].childNodes,e)}}function o(t,e){var n=t.getAttribute("class").split(" "),o=n.indexOf(e);o!==-1&&n.splice(o,1),t.className=n.join(" ")}function i(t,e){var n=t.getAttribute("class").split(" ");n.push(e),t.className=n.join(" ")}function a(){var i={parent:document.body,dialogWidth:"400px",dialogPersistent:!0,dialogContainerClass:"alertify",logDelay:5e3,logMaxItems:2,logPosition:"bottom left",logCloseOnClick:!1,logContainerClass:"alertify-logs",logTemplateMethod:null,dialogs:{buttons:{holder:"<nav data-alertify-btn-holder></nav>",ok:{label:"Ok",autoClose:!0,template:'<button data-alertify-btn="ok" tabindex="1"></button>'},cancel:{label:"Cancel",autoClose:!0,template:'<button data-alertify-btn="cancel" tabindex="2"></button>'},"default":{label:"Default",autoClose:!1,template:'<button data-alertify-btn tabindex="3"></button>'}},message:"<div data-alertify-msg></div>",input:'<input data-alertify-input type="text">'}},a={version:"1.0.11",parent:i.parent,dialogWidth:i.dialogWidth,dialogPersistent:i.dialogPersistent,dialogContainerClass:i.dialogContainerClass,promptValue:"",promptPlaceholder:"",logDelay:i.logDelay,logMaxItems:i.logMaxItems,logPosition:i.logPosition,logCloseOnClick:i.logCloseOnClick,logContainerClass:i.logContainerClass,logTemplateMethod:i.logTemplateMethod,dialogs:i.dialogs,build:function(t,o){var i={};if(i.container=document.createElement("div"),i.container.className=this.dialogContainerClass+" hide",i.wrapper=document.createElement("div"),i.wrapper.className="dialog",i.dialog=document.createElement("div"),i.dialog.style.width=this.dialogWidth,i.content=document.createElement("div"),i.content.className="content","dialog"===t.type?i.content.innerHTML=t.message:(i.messageWrapper=e(this.dialogs.message),i.message=n(i.messageWrapper,"alertify-msg"),i.message.innerHTML=t.message,i.content.appendChild(i.messageWrapper)),i.buttonsWrapper=e(this.dialogs.buttons.holder),i.buttonsHolder=n(i.buttonsWrapper,"alertify-btn-holder"),"prompt"===t.type){var a=e(this.dialogs.input);i.input=n(a,"alertify-input"),i.label=n(a,"alertify-input-label"),i.content.appendChild(a)}i.container.appendChild(i.wrapper),i.wrapper.appendChild(i.dialog),i.dialog.appendChild(i.content),i.dialog.appendChild(i.buttonsWrapper),i.buttonsHolder.innerHTML="",i.buttons=[];for(var l=0;l<o.length;l++){var r=n(o[l].element,"alertify-btn");r.innerHTML=o[l].label,i.buttonsHolder.appendChild(o[l].element)}return i},createButtonsDefinition:function(t){for(var n=[],o=0;o<t.buttons.length;o++){var i=this.buildButtonObject(t.buttons[o]);("dialog"===t.type||"alert"===t.type&&"ok"===i.type||["confirm","prompt"].indexOf(t.type)!==-1&&["ok","cancel"].indexOf(i.type)!==-1)&&(i.element=e(i.template),n.push(i))}return n},buildButtonObject:function(t){var e={},n=t.type||"default",o=this.dialogs.buttons,i=["ok","cancel","default"];if("undefined"!=typeof t.type&&i.indexOf(t.type)===-1)throw new Error('Wrong button type: "'+t.type+'". Valid values: "'+i.join('", "')+'"');return e.type=n,e.label="undefined"!=typeof t.label?t.label:o[n].label,e.autoClose="undefined"!=typeof t.autoClose?t.autoClose:o[n].autoClose,e.template="undefined"!=typeof t.template?t.template:o[n].template,e.click="undefined"!=typeof t.click?t.click:o[n].click,e},setCloseLogOnClick:function(t){this.logCloseOnClick=t},close:function(t,e){this.logCloseOnClick&&t.addEventListener("click",function(){s(t)}),e=e&&!isNaN(+e)?+e:this.logDelay,e<0?s(t):e>0&&setTimeout(function(){s(t)},e)},dialog:function(t,e,n){return this.setup({type:e,message:t,buttons:n})},log:function(t,e,n){if(l&&l.elements.length){var o=l.elements.length-this.logMaxItems;if(o>=0)for(var i=0,a=o+1;i<a;i++)this.close(l.elements[i],-1)}this.notify(t,e,n)},setLogContainerClass:function(t){this.logContainerClass=i.logContainerClass+" "+t},setLogPosition:function(t){var e=t.split(" ");["top","bottom"].indexOf(e[0])!==-1&&["left","right"].indexOf(e[1])!==-1&&(this.logPosition=t)},setupLogContainer:function(){var t=this.logContainerClass+" "+this.logPosition,e=l&&l.container.parentNode!==this.parent;l&&!e||(e&&s(l.container),l={},l.container=document.createElement("div"),l.container.className=t,this.parent.appendChild(l.container)),l.container.className!==t&&(l.container.className=t)},notify:function(t,e,n){this.setupLogContainer();var o=document.createElement("div");o.className=e||"default",a.logTemplateMethod?o.innerHTML=a.logTemplateMethod(t):o.innerHTML=t,"function"==typeof n&&o.addEventListener("click",n),l.elements||(l.elements=[]),l.elements.push(o),l.container.appendChild(o),setTimeout(function(){o.className+=" show"},10),this.close(o,this.logDelay)},setup:function(e){function n(t){"function"!=typeof t&&(t=function(){});for(var e=0;e<l.length;e++){var n=l[e],o=function(e){return function(n){a=e,e.click&&"function"==typeof e.click&&e.click(n,d),t({ui:d,event:n}),e.autoClose===!0&&d.closeDialog()}}(n);n.element.addEventListener("click",o)}u&&u.addEventListener("keyup",function(t){13===t.which&&i.click()})}for(var i,a,l=this.createButtonsDefinition(e),r=this.build(e,l),d={},u=r.input,c=r.label,f=0;f<l.length;f++)"ok"===l[f].type&&(i=l[f].element);u&&("string"==typeof this.promptPlaceholder&&(c?c.textContent=this.promptPlaceholder:u.placeholder=this.promptPlaceholder),"string"==typeof this.promptValue&&(u.value=this.promptValue)),d.dom=r,d.closeDialog=function(){s(r.container)},d.centerDialog=function(){t(r.wrapper)},d.setMessage=function(t){r.message.innerHTML=t},d.setContent=function(t){r.content.innerHTML=t},d.getInputValue=function(){if(r.input)return r.input.value},d.getButtonObject=function(){if(a)return{type:a.type,label:a.label,autoClose:a.autoClose,element:a.element}};var p;return"function"==typeof Promise?p=new Promise(n):n(),this.dialogPersistent===!1&&r.container.addEventListener("click",function(t){t.target!==this&&t.target!==r.wrapper||s(r.container)}),window.onresize=function(){d.centerDialog()},this.parent.appendChild(r.container),setTimeout(function(){o(r.container,"hide"),d.centerDialog(),u&&e.type&&"prompt"===e.type?(u.select(),u.focus()):i&&i.focus()},100),p},setDelay:function(t){return t=t||0,this.logDelay=isNaN(t)?i.logDelay:parseInt(t,10),this},setLogMaxItems:function(t){this.logMaxItems=parseInt(t||i.logMaxItems)},setDialogWidth:function(t){"number"==typeof t&&(t+="px"),this.dialogWidth="string"==typeof t?t:i.dialogWidth},setDialogPersistent:function(t){this.dialogPersistent=t},setDialogContainerClass:function(t){this.dialogContainerClass=i.dialogContainerClass+" "+t},theme:function(t){switch(t.toLowerCase()){case"bootstrap":this.dialogs.buttons.ok.template='<button data-alertify-btn="ok" class="ok btn btn-primary" tabindex="1"></button>',this.dialogs.buttons.cancel.template='<button data-alertify-btn="cancel" class="cancel btn btn-default" tabindex="2"></button>',this.dialogs.input="<input data-alertify-input class='form-control' type='text'>";break;case"purecss":this.dialogs.buttons.ok.template='<button data-alertify-btn="ok" class="ok pure-button" tabindex="1"></button>',this.dialogs.buttons.cancel.template='<button data-alertify-btn="cancel" class="cancel pure-button" tabindex="2"></button>';break;case"mdl":case"material-design-light":this.dialogs.buttons.ok.template='<button data-alertify-btn="ok" class="ok mdl-button mdl-js-button mdl-js-ripple-effect"  tabindex="1"></button>',this.dialogs.buttons.cancel.template='<button data-alertify-btn="cancel" class="cancel mdl-button mdl-js-button mdl-js-ripple-effect" tabindex="2"></button>',this.dialogs.input='<div class="mdl-textfield mdl-js-textfield"><input data-alertify-input class="mdl-textfield__input"><label data-alertify-input-label class="md-textfield__label"></label></div>';break;case"angular-material":this.dialogs.buttons.ok.template='"<button data-alertify-btn="ok" class="ok md-primary md-button" tabindex="1"></button>"',this.dialogs.buttons.cancel.template='<button data-alertify-btn="cancel" class="cancel md-button" tabindex="2"></button>',this.dialogs.input='<div layout="column"><md-input-container md-no-float><input data-alertify-input type="text"></md-input-container></div>';break;case"default":default:this.dialogs.buttons.ok.template=i.dialogs.buttons.ok.template,this.dialogs.buttons.cancel.template=i.dialogs.buttons.cancel.template,this.dialogs.input=i.dialogs.input}},reset:function(){this.theme("default"),this.parent=i.parent,this.dialogWidth=i.dialogWidth,this.dialogPersistent=i.dialogPersistent,this.dialogContainerClass=i.dialogContainerClass,this.promptValue="",this.promptPlaceholder="",this.logDelay=i.logDelay,this.logMaxItems=i.logMaxItems,this.logPosition=i.logPosition,this.logCloseOnClick=i.logCloseOnClick,this.logContainerClass=i.logContainerClass,this.logTemplateMethod=null},injectCSS:function(){if(!document.querySelector("#alertifyCSS")){var t=document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",e.id="alertifyCSS",e.innerHTML=".alertify-logs>*{padding:12px 24px;color:#fff;box-shadow:0 2px 5px 0 rgba(0,0,0,.2);border-radius:1px;transition:all .2s;display:block!important}.alertify-logs>*,.alertify-logs>.default{background:rgba(0,0,0,.8)}.alertify-logs>.error{background:rgba(244,67,54,.8)}.alertify-logs>.success{background:rgba(76,175,80,.9)}.alertify{position:fixed;background-color:rgba(0,0,0,.3);left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:99999}.alertify.hide{opacity:0;pointer-events:none}.alertify,.alertify.show{box-sizing:border-box;transition:all .33s cubic-bezier(.25,.8,.25,1)}.alertify,.alertify *{box-sizing:border-box}.alertify .alert,.alertify .dialog{width:100%;padding:0;margin:0 auto;position:relative;top:50%}.alertify .alert>*,.alertify .dialog>*{width:400px;max-width:95%;margin:0 auto;text-align:left;padding:18px;background:#fff;box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084)}.alertify .alert [data-alertify-msg],.alertify .dialog [data-alertify-msg]{padding-bottom:12px;text-align:left}.alertify .alert input[data-alertify-input]:not(.form-control),.alertify .dialog input[data-alertify-input]:not(.form-control){margin-bottom:12px;width:100%;font-size:100%;padding:8px}.alertify .alert input[data-alertify-input]:not(.form-control):focus,.alertify .dialog input[data-alertify-input]:not(.form-control):focus{outline-offset:-2px}.alertify .alert [data-alertify-btn-holder],.alertify .dialog [data-alertify-btn-holder]{text-align:right}.alertify .alert [data-alertify-btn-holder] [data-alertify-btn]:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button),.alertify .dialog [data-alertify-btn-holder] [data-alertify-btn]:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button){background:transparent;box-sizing:border-box;color:rgba(0,0,0,.87);position:relative;outline:0;display:inline-block;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;padding:0 6px;margin:6px 0 0 15px;line-height:36px;min-height:36px;white-space:nowrap;min-width:88px;text-align:center;text-transform:uppercase;font-size:14px;text-decoration:none;cursor:pointer;border:1px solid #dbdbdb;border-radius:2px}.alertify .alert [data-alertify-btn-holder] [data-alertify-btn]:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .alert [data-alertify-btn-holder] [data-alertify-btn]:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover,.alertify .dialog [data-alertify-btn-holder] [data-alertify-btn]:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .dialog [data-alertify-btn-holder] [data-alertify-btn]:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover{background-color:rgba(0,0,0,.05)}.alertify .alert [data-alertify-btn-holder] [data-alertify-btn]:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus,.alertify .dialog [data-alertify-btn-holder] [data-alertify-btn]:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus{border:1px solid rgba(0,0,0,.1)}.alertify .alert [data-alertify-btn-holder] [data-alertify-btn].btn,.alertify .dialog [data-alertify-btn-holder] [data-alertify-btn].btn{margin:6px 4px}.alertify-logs{position:fixed;z-index:100000}.alertify-logs.bottom,.alertify-logs:not(.top){bottom:16px}.alertify-logs.left,.alertify-logs:not(.right){left:16px}.alertify-logs.left>*,.alertify-logs:not(.right)>*{float:left;transform:translateZ(0);height:auto}.alertify-logs.left>.show,.alertify-logs:not(.right)>.show{left:0}.alertify-logs.left>*,.alertify-logs.left>.hide,.alertify-logs:not(.right)>*,.alertify-logs:not(.right)>.hide{left:-110%}.alertify-logs.right{right:16px}.alertify-logs.right>*{float:right;transform:translateZ(0)}.alertify-logs.right>.show{right:0;opacity:1}.alertify-logs.right>*,.alertify-logs.right>.hide{right:-110%;opacity:0}.alertify-logs.top{top:0}.alertify-logs>*{box-sizing:border-box;transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;clear:both;-webkit-backface-visibility:hidden;backface-visibility:hidden;perspective:1000;max-height:0;margin:0;padding:0;overflow:hidden;opacity:0;pointer-events:none}.alertify-logs>.show{margin-top:12px;opacity:1;max-height:1000px;padding:12px;pointer-events:auto}",t.insertBefore(e,t.firstChild)}},removeCSS:function(){var t=document.querySelector("#alertifyCSS");t&&t.parentNode&&t.parentNode.removeChild(t)}};return a.injectCSS(),{_$$alertify:a,parent:function(t){a.parent=t},reset:function(){return a.reset(),this},dialog:function(t,e){return a.dialog(t,"dialog",e)||this},alert:function(t,e){return e=e||{},e.type="ok",a.dialog(t,"alert",[e])||this},confirm:function(t,e,n){return e=e||{},n=n||{},e.type="ok",n.type="cancel",a.dialog(t,"confirm",[e,n])||this},prompt:function(t,e,n){return e=e||{},n=n||{},e.type="ok",n.type="cancel",a.dialog(t,"prompt",[e,n])||this},log:function(t,e,n){return a.log(t,n,e),this},success:function(t,e){return a.log(t,"success",e),this},error:function(t,e){return a.log(t,"error",e),this},theme:function(t){return a.theme(t),this},dialogWidth:function(t){return a.setDialogWidth(t),this},dialogPersistent:function(t){return a.setDialogPersistent(t),this},dialogContainerClass:function(t){return a.setDialogContainerClass(t||""),this},delay:function(t){return a.setDelay(t),this},placeholder:function(t){return a.promptPlaceholder=t,this},defaultValue:function(t){return a.promptValue=t,this},maxLogItems:function(t){return a.setLogMaxItems(t),this},closeLogOnClick:function(t){return a.setCloseLogOnClick(t),this},logPosition:function(t){return a.setLogPosition(t||""),this},logContainerClass:function(t){return a.setLogContainerClass(t||""),this},setLogTemplate:function(t){return a.logTemplateMethod=t,this},clearLogs:function(){return l&&(l.container.innerHTML=""),this},version:a.version}}var l,r=500,s=function(t){if(t){var e=function(){t&&t.parentNode&&t.parentNode.removeChild(t)};o(t,"show"),i(t,"hide"),t.addEventListener("transitionend",e),setTimeout(e,r)}};if("undefined"!=typeof module&&module&&module.exports){module.exports=function(){return new a};var d=new a;for(var u in d)module.exports[u]=d[u]}else"function"==typeof define&&define.amd?define(function(){return new a}):window.alertify=new a}();