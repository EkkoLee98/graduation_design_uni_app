(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uniapp-editor/components/robin-editor/robin-editor"],{"33ab":function(t,e,o){"use strict";o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return r})),o.d(e,"a",(function(){return i}));var i={robinEditorHeader:function(){return o.e("uni_modules/uniapp-editor/components/robin-editor-header/robin-editor-header").then(o.bind(null,"f115"))},uniPopup:function(){return o.e("components/uni-popup/uni-popup").then(o.bind(null,"5087"))},robinColorPicker:function(){return o.e("uni_modules/uniapp-editor/components/robin-color-picker/robin-color-picker").then(o.bind(null,"3d23"))}},n=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"6ea2":function(t,e,o){},a291:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={props:{value:{type:String},imageUploader:{type:Function},muiltImage:{type:Boolean,default:!1},compressImage:{type:Boolean,default:!1},previewMode:{type:Boolean,default:!1},autoHideToolbar:{type:Boolean,default:!1},tools:{type:Array,default:function(){return["bold","italic","underline","strike","align-left","align-center","align-right","remove","font","color","backgroundColor","image","clear","preview"]}}},data:function(){return{show:!0,readOnly:!1,formats:{},fontColor:"#000000",bgColor:"",color:"",colorPickerName:"",showColor:!0,fontSizeRange:[10,12,14,16,18,24,32],showPreview:!1,htmlData:"",html:"",keyboardHeight:0,editorHeight:0,isIOS:!1}},watch:{value:function(t){this.html=t},html:function(t){this.previewMode&&this.previewData(this.html),this.editorCtx&&this.editorCtx.setContents({html:this.html})}},created:function(){this.html=this.value},mounted:function(){var e=this,o=t.getSystemInfoSync().platform;this.isIOS="ios"===o,this.previewMode&&this.previewData(this.html);var i=0;this.updatePosition(0),t.onKeyboardHeightChange((function(o){if(console.log(o,i),o.height!==i){var n=o.height>0?1e3*o.duration:0;i=o.height,setTimeout((function(){t.pageScrollTo({scrollTop:0,success:function(){e.updatePosition(i),e.editorCtx&&e.editorCtx.scrollIntoView()}})}),n)}}))},computed:{labelConfirm:function(){return this.showPreview?"关闭":"保存"},labelCancel:function(){return this.showPreview?"":"取消"}},methods:{updatePosition:function(e){var o=t.getSystemInfoSync(),i=o.windowHeight,n=o.windowWidth,r=(o.platform,n/750),a=0,s=(70*Math.ceil(this.tools.length/15)+1)*r,c=i-a;this.keyboardHeight=e,this.editorHeight=e>0?c-e-s:this.autoHideToolbar?c:c-s},openColor:function(t){var e=t.currentTarget.dataset.name,o=this.formats[e];this.colorPickerName=e,"backgroundColor"!=e||o||(o="#FFFFFF"),"color"!=e||o||(o="#000000"),this.color=o,this.$refs.color.open(o)},colorChanged:function(t){var e="";switch(this.colorPickerName){case"backgroundColor":"#FFFFFF"==t.color&&(t.color=""),this.bgColor=t.color,e="背景色";break;case"color":this.fontColor=t.color,e="颜色";break}this._format(this.colorPickerName,t.color,e+t.color)},readOnlyChange:function(){this.readOnly=!this.readOnly},onEditorReady:function(){var e=this;t.createSelectorQuery().in(this).select("#editor").context((function(t){e.editorCtx=t.context,e.html&&e.editorCtx.setContents({html:e.html})})).exec()},undo:function(){this.editorCtx.undo(),this.toast("撤销")},redo:function(){this.editorCtx.redo(),this.toast("重做")},format:function(t){var e=t.target.dataset,o=e.name,i=e.value,n=e.label;o&&this._format(o,i,n)},_format:function(t,e,o){this.editorCtx.format(t,e),this.toast(o)},toast:function(e){t.showToast({duration:600,icon:"none",title:e})},onStatusChange:function(t){var e=t.detail;this.formats=e},insertDivider:function(){this.editorCtx.insertDivider({success:function(){this.toast("插入分割线")}})},clear:function(){var t=this;this.editorCtx.clear({success:function(e){t.toast("清空")}})},removeFormat:function(){this.editorCtx.removeFormat(),this.toast("清除格式")},insertDate:function(){var t=new Date,e="".concat(t.getFullYear(),"/").concat(t.getMonth()+1,"/").concat(t.getDate());this.editorCtx.insertText({text:e}),this.toast("插入日期")},insertImage:function(){var e=this,o={};o.count=this.muiltImage?9:1,o.sizeType=this.compressImage?["compressed"]:["original"],t.chooseImage({success:function(o){var i=o.tempFilePaths;t.uploadFile({url:"https://lzebaba.club/renren-fast/api/upload",filePath:i[0],name:"file",header:{token:t.getStorageSync("token")},success:function(t){console.log(t.data),e.avatar=JSON.parse(t.data).url;var o=JSON.parse(t.data);e.editorCtx.insertImage({src:o.url,success:function(){console.log("insert image success")}}),console.log(e.editorCtx)}})}})},fontSize:function(t){var e=t.detail.value,o=this.fontSizeRange[e]+"px";this._format("fontSize",o,"字体大小:"+o)},cancel:function(){this.$emit("cancel")},save:function(){var t=this;this.showPreview?this.previewMode?this.cancel():this.showPreview=!1:this.editorCtx.getContents({success:function(e){t.$emit("save",e),t.$emit("input",e.html)}})},previewData:function(t){this.htmlData=t.replace(/\<img/gi,'<img style="max-width:100%;height:auto"'),this.showPreview=!0},preview:function(){var t=this;this.editorCtx.getContents({success:function(e){t.previewData(e.html)}})}}};e.default=o}).call(this,o("543d")["default"])},ae98:function(t,e,o){"use strict";o.r(e);var i=o("a291"),n=o.n(i);for(var r in i)"default"!==r&&function(t){o.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},b2ad:function(t,e,o){"use strict";var i=o("6ea2"),n=o.n(i);n.a},fac1:function(t,e,o){"use strict";o.r(e);var i=o("33ab"),n=o("ae98");for(var r in n)"default"!==r&&function(t){o.d(e,t,(function(){return n[t]}))}(r);o("b2ad");var a,s=o("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"46539e88",null,!1,i["a"],a);e["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uniapp-editor/components/robin-editor/robin-editor-create-component',
    {
        'uni_modules/uniapp-editor/components/robin-editor/robin-editor-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fac1"))
        })
    },
    [['uni_modules/uniapp-editor/components/robin-editor/robin-editor-create-component']]
]);