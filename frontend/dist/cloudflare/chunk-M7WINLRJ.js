import{a as qe}from"./chunk-U7EDWSKJ.js";import{a as We}from"./chunk-QMZT3M6C.js";import{a as _e,b as be,c as et}from"./chunk-LRWNYGEI.js";import{a as He,c as Qe,d as fe,e as Xe,h as Ze,l as Ye,m as Je}from"./chunk-R5DFYNUF.js";import{b as me,g as $e,h as R,i as je,j as ge,k as he,m as Ge,n as Ke}from"./chunk-7DM3ZGEL.js";import{aa as Le,b as ke,c as Fe,d as Re,e as Oe,g as ze,ga as Ue,ha as ce,ka as de,n as Ae}from"./chunk-3EQKZQZT.js";import"./chunk-P7WS3FUN.js";import{$a as m,Ab as E,Bb as w,Cb as Ve,Db as Pe,Ea as W,Eb as Q,Fb as X,Gb as Z,Hb as le,Ia as A,Ib as Ne,Ja as re,Ka as L,M as ve,Ma as oe,N as ee,Na as B,O as te,Oa as v,Q as ne,Rb as G,S as M,Ua as P,Ub as b,Va as ae,Wa as se,X as c,Xa as Me,Y as d,Ya as Te,Z as V,Za as Be,Zb as y,_ as Ie,_a as u,_b as pe,a as Y,ab as g,b as J,bb as D,ca as z,eb as ue,fb as U,gb as $,ha as ie,ia as ye,ib as N,la as T,mb as C,nb as l,qb as De,rb as Ee,sb as j,tb as q,va as we,wb as H,xa as p,yb as Se}from"./chunk-JV4TYVHK.js";var tt=`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`;var bt=`
    ${tt}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`,xt={root:({instance:i})=>["p-textarea p-component",{"p-filled":i.$filled(),"p-textarea-resizable ":i.autoResize,"p-variant-filled":i.$variant()==="filled","p-textarea-fluid":i.hasFluid,"p-inputfield-sm p-textarea-sm":i.pSize==="small","p-textarea-lg p-inputfield-lg":i.pSize==="large","p-invalid":i.invalid()}]},nt=(()=>{class i extends de{name="textarea";style=bt;classes=xt;static \u0275fac=(()=>{let e;return function(t){return(e||(e=T(i)))(t||i)}})();static \u0275prov=ee({token:i,factory:i.\u0275fac})}return i})();var it=new ne("TEXTAREA_INSTANCE"),rt=(()=>{class i extends _e{componentName="Textarea";bindDirectiveInstance=M(R,{self:!0});$pcTextarea=M(it,{optional:!0,skipSelf:!0})??void 0;pTextareaPT=b();pTextareaUnstyled=b();autoResize;pSize;variant=b();fluid=b(void 0,{transform:y});invalid=b(void 0,{transform:y});$variant=G(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onResize=new z;ngControlSubscription;_componentStyle=M(nt);ngControl=M(fe,{optional:!0,self:!0});pcFluid=M(ge,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}constructor(){super(),ye(()=>{let e=this.pTextareaPT();e&&this.directivePT.set(e)}),ye(()=>{this.pTextareaUnstyled()&&this.directiveUnstyled.set(this.pTextareaUnstyled())})}onInit(){this.ngControl&&(this.ngControlSubscription=this.ngControl.valueChanges.subscribe(()=>{this.updateState()}))}onAfterViewInit(){this.autoResize&&this.resize(),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.autoResize&&this.resize(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(e){this.writeModelValue(e.target?.value),this.updateState()}resize(e){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(e||{})}updateState(){this.autoResize&&this.resize()}onDestroy(){this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(n){return new(n||i)};static \u0275dir=L({type:i,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostVars:2,hostBindings:function(n,t){n&1&&C("input",function(o){return t.onInput(o)}),n&2&&E(t.cx("root"))},inputs:{pTextareaPT:[1,"pTextareaPT"],pTextareaUnstyled:[1,"pTextareaUnstyled"],autoResize:[2,"autoResize","autoResize",y],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},outputs:{onResize:"onResize"},features:[le([nt,{provide:it,useExisting:i},{provide:me,useExisting:i}]),oe([R]),B]})}return i})(),ot=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=re({type:i});static \u0275inj=te({})}return i})();var at=(()=>{class i extends _e{required=b(void 0,{transform:y});invalid=b(void 0,{transform:y});disabled=b(void 0,{transform:y});name=b();_disabled=ie(!1);$disabled=G(()=>this.disabled()||this._disabled());onModelChange=()=>{};onModelTouched=()=>{};writeDisabledState(e){this._disabled.set(e)}writeControlValue(e,n){}writeValue(e){this.writeControlValue(e,this.writeModelValue.bind(this))}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){this.writeDisabledState(e),this.cd.markForCheck()}static \u0275fac=(()=>{let e;return function(t){return(e||(e=T(i)))(t||i)}})();static \u0275dir=L({type:i,inputs:{required:[1,"required"],invalid:[1,"invalid"],disabled:[1,"disabled"],name:[1,"name"]},features:[B]})}return i})();var st=(()=>{class i extends at{pcFluid=M(ge,{optional:!0,host:!0,skipSelf:!0});fluid=b(void 0,{transform:y});variant=b();size=b();inputSize=b();pattern=b();min=b();max=b();step=b();minlength=b();maxlength=b();$variant=G(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());get hasFluid(){return this.fluid()??!!this.pcFluid}static \u0275fac=(()=>{let e;return function(t){return(e||(e=T(i)))(t||i)}})();static \u0275dir=L({type:i,inputs:{fluid:[1,"fluid"],variant:[1,"variant"],size:[1,"size"],inputSize:[1,"inputSize"],pattern:[1,"pattern"],min:[1,"min"],max:[1,"max"],step:[1,"step"],minlength:[1,"minlength"],maxlength:[1,"maxlength"]},features:[B]})}return i})();var Ct=["data-p-icon","angle-down"],ut=(()=>{class i extends he{static \u0275fac=(()=>{let e;return function(t){return(e||(e=T(i)))(t||i)}})();static \u0275cmp=A({type:i,selectors:[["","data-p-icon","angle-down"]],features:[B],attrs:Ct,decls:1,vars:0,consts:[["d","M3.58659 4.5007C3.68513 4.50023 3.78277 4.51945 3.87379 4.55723C3.9648 4.59501 4.04735 4.65058 4.11659 4.7207L7.11659 7.7207L10.1166 4.7207C10.2619 4.65055 10.4259 4.62911 10.5843 4.65956C10.7427 4.69002 10.8871 4.77074 10.996 4.88976C11.1049 5.00877 11.1726 5.15973 11.1889 5.32022C11.2052 5.48072 11.1693 5.6422 11.0866 5.7807L7.58659 9.2807C7.44597 9.42115 7.25534 9.50004 7.05659 9.50004C6.85784 9.50004 6.66722 9.42115 6.52659 9.2807L3.02659 5.7807C2.88614 5.64007 2.80725 5.44945 2.80725 5.2507C2.80725 5.05195 2.88614 4.86132 3.02659 4.7207C3.09932 4.64685 3.18675 4.58911 3.28322 4.55121C3.37969 4.51331 3.48305 4.4961 3.58659 4.5007Z","fill","currentColor"]],template:function(n,t){n&1&&(V(),ue(0,"path",0))},encapsulation:2})}return i})();var vt=["data-p-icon","angle-up"],lt=(()=>{class i extends he{static \u0275fac=(()=>{let e;return function(t){return(e||(e=T(i)))(t||i)}})();static \u0275cmp=A({type:i,selectors:[["","data-p-icon","angle-up"]],features:[B],attrs:vt,decls:1,vars:0,consts:[["d","M10.4134 9.49931C10.3148 9.49977 10.2172 9.48055 10.1262 9.44278C10.0352 9.405 9.95263 9.34942 9.88338 9.27931L6.88338 6.27931L3.88338 9.27931C3.73811 9.34946 3.57409 9.3709 3.41567 9.34044C3.25724 9.30999 3.11286 9.22926 3.00395 9.11025C2.89504 8.99124 2.82741 8.84028 2.8111 8.67978C2.79478 8.51928 2.83065 8.35781 2.91338 8.21931L6.41338 4.71931C6.55401 4.57886 6.74463 4.49997 6.94338 4.49997C7.14213 4.49997 7.33276 4.57886 7.47338 4.71931L10.9734 8.21931C11.1138 8.35994 11.1927 8.55056 11.1927 8.74931C11.1927 8.94806 11.1138 9.13868 10.9734 9.27931C10.9007 9.35315 10.8132 9.41089 10.7168 9.44879C10.6203 9.48669 10.5169 9.5039 10.4134 9.49931Z","fill","currentColor"]],template:function(n,t){n&1&&(V(),ue(0,"path",0))},encapsulation:2})}return i})();var pt=`
    .p-inputnumber {
        display: inline-flex;
        position: relative;
    }

    .p-inputnumber-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        cursor: pointer;
        background: dt('inputnumber.button.background');
        color: dt('inputnumber.button.color');
        width: dt('inputnumber.button.width');
        transition:
            background dt('inputnumber.transition.duration'),
            color dt('inputnumber.transition.duration'),
            border-color dt('inputnumber.transition.duration'),
            outline-color dt('inputnumber.transition.duration');
    }

    .p-inputnumber-button:disabled {
        cursor: auto;
    }

    .p-inputnumber-button:not(:disabled):hover {
        background: dt('inputnumber.button.hover.background');
        color: dt('inputnumber.button.hover.color');
    }

    .p-inputnumber-button:not(:disabled):active {
        background: dt('inputnumber.button.active.background');
        color: dt('inputnumber.button.active.color');
    }

    .p-inputnumber-stacked .p-inputnumber-button {
        position: relative;
        flex: 1 1 auto;
        border: 0 none;
    }

    .p-inputnumber-stacked .p-inputnumber-button-group {
        display: flex;
        flex-direction: column;
        position: absolute;
        inset-block-start: 1px;
        inset-inline-end: 1px;
        height: calc(100% - 2px);
        z-index: 1;
    }

    .p-inputnumber-stacked .p-inputnumber-increment-button {
        padding: 0;
        border-start-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);
    }

    .p-inputnumber-stacked .p-inputnumber-decrement-button {
        padding: 0;
        border-end-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);
    }

    .p-inputnumber-stacked .p-inputnumber-input {
        padding-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }

    .p-inputnumber-horizontal .p-inputnumber-button {
        border: 1px solid dt('inputnumber.button.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-button:hover {
        border-color: dt('inputnumber.button.hover.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-button:active {
        border-color: dt('inputnumber.button.active.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-increment-button {
        order: 3;
        border-start-end-radius: dt('inputnumber.button.border.radius');
        border-end-end-radius: dt('inputnumber.button.border.radius');
        border-inline-start: 0 none;
    }

    .p-inputnumber-horizontal .p-inputnumber-input {
        order: 2;
        border-radius: 0;
    }

    .p-inputnumber-horizontal .p-inputnumber-decrement-button {
        order: 1;
        border-start-start-radius: dt('inputnumber.button.border.radius');
        border-end-start-radius: dt('inputnumber.button.border.radius');
        border-inline-end: 0 none;
    }

    .p-floatlabel:has(.p-inputnumber-horizontal) label {
        margin-inline-start: dt('inputnumber.button.width');
    }

    .p-inputnumber-vertical {
        flex-direction: column;
    }

    .p-inputnumber-vertical .p-inputnumber-button {
        border: 1px solid dt('inputnumber.button.border.color');
        padding: dt('inputnumber.button.vertical.padding');
    }

    .p-inputnumber-vertical .p-inputnumber-button:hover {
        border-color: dt('inputnumber.button.hover.border.color');
    }

    .p-inputnumber-vertical .p-inputnumber-button:active {
        border-color: dt('inputnumber.button.active.border.color');
    }

    .p-inputnumber-vertical .p-inputnumber-increment-button {
        order: 1;
        border-start-start-radius: dt('inputnumber.button.border.radius');
        border-start-end-radius: dt('inputnumber.button.border.radius');
        width: 100%;
        border-block-end: 0 none;
    }

    .p-inputnumber-vertical .p-inputnumber-input {
        order: 2;
        border-radius: 0;
        text-align: center;
    }

    .p-inputnumber-vertical .p-inputnumber-decrement-button {
        order: 3;
        border-end-start-radius: dt('inputnumber.button.border.radius');
        border-end-end-radius: dt('inputnumber.button.border.radius');
        width: 100%;
        border-block-start: 0 none;
    }

    .p-inputnumber-input {
        flex: 1 1 auto;
    }

    .p-inputnumber-fluid {
        width: 100%;
    }

    .p-inputnumber-fluid .p-inputnumber-input {
        width: 1%;
    }

    .p-inputnumber-fluid.p-inputnumber-vertical .p-inputnumber-input {
        width: 100%;
    }

    .p-inputnumber:has(.p-inputtext-sm) .p-inputnumber-button .p-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-inputnumber:has(.p-inputtext-lg) .p-inputnumber-button .p-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-inputnumber-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    .p-inputnumber:has(.p-inputnumber-clear-icon) .p-inputnumber-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputnumber-stacked .p-inputnumber-clear-icon {
        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }

    .p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input {
        padding-inline-end: calc(dt('inputnumber.button.width') + (dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputnumber-horizontal .p-inputnumber-clear-icon {
        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }
`;var It=["clearicon"],wt=["incrementbuttonicon"],Mt=["decrementbuttonicon"],Tt=["input"];function Bt(i,s){if(i&1){let e=N();V(),m(0,"svg",7),C("click",function(){c(e);let t=l(2);return d(t.clear())}),g()}if(i&2){let e=l(2);E(e.cx("clearIcon")),u("pBind",e.ptm("clearIcon"))}}function Dt(i,s){}function Et(i,s){i&1&&v(0,Dt,0,0,"ng-template")}function St(i,s){if(i&1){let e=N();m(0,"span",8),C("click",function(){c(e);let t=l(2);return d(t.clear())}),v(1,Et,1,0,null,9),g()}if(i&2){let e=l(2);E(e.cx("clearIcon")),u("pBind",e.ptm("clearIcon")),p(),u("ngTemplateOutlet",e.clearIconTemplate||e._clearIconTemplate)}}function Vt(i,s){if(i&1&&(U(0),v(1,Bt,1,3,"svg",5)(2,St,2,4,"span",6),$()),i&2){let e=l();p(),u("ngIf",!e.clearIconTemplate&&!e._clearIconTemplate),p(),u("ngIf",e.clearIconTemplate||e._clearIconTemplate)}}function Pt(i,s){if(i&1&&D(0,"span",13),i&2){let e=l(2);u("pBind",e.ptm("incrementButtonIcon"))("ngClass",e.incrementButtonIcon)}}function Nt(i,s){if(i&1&&(V(),D(0,"svg",15)),i&2){let e=l(3);u("pBind",e.ptm("incrementButtonIcon"))}}function kt(i,s){}function Ft(i,s){i&1&&v(0,kt,0,0,"ng-template")}function Rt(i,s){if(i&1&&(U(0),v(1,Nt,1,1,"svg",14)(2,Ft,1,0,null,9),$()),i&2){let e=l(2);p(),u("ngIf",!e.incrementButtonIconTemplate&&!e._incrementButtonIconTemplate),p(),u("ngTemplateOutlet",e.incrementButtonIconTemplate||e._incrementButtonIconTemplate)}}function Ot(i,s){if(i&1&&D(0,"span",13),i&2){let e=l(2);u("pBind",e.ptm("decrementButtonIcon"))("ngClass",e.decrementButtonIcon)}}function zt(i,s){if(i&1&&(V(),D(0,"svg",17)),i&2){let e=l(3);u("pBind",e.ptm("decrementButtonIcon"))}}function At(i,s){}function Lt(i,s){i&1&&v(0,At,0,0,"ng-template")}function Ut(i,s){if(i&1&&(U(0),v(1,zt,1,1,"svg",16)(2,Lt,1,0,null,9),$()),i&2){let e=l(2);p(),u("ngIf",!e.decrementButtonIconTemplate&&!e._decrementButtonIconTemplate),p(),u("ngTemplateOutlet",e.decrementButtonIconTemplate||e._decrementButtonIconTemplate)}}function $t(i,s){if(i&1){let e=N();m(0,"span",10)(1,"button",11),C("mousedown",function(t){c(e);let r=l();return d(r.onUpButtonMouseDown(t))})("mouseup",function(){c(e);let t=l();return d(t.onUpButtonMouseUp())})("mouseleave",function(){c(e);let t=l();return d(t.onUpButtonMouseLeave())})("keydown",function(t){c(e);let r=l();return d(r.onUpButtonKeyDown(t))})("keyup",function(){c(e);let t=l();return d(t.onUpButtonKeyUp())}),v(2,Pt,1,2,"span",12)(3,Rt,3,2,"ng-container",2),g(),m(4,"button",11),C("mousedown",function(t){c(e);let r=l();return d(r.onDownButtonMouseDown(t))})("mouseup",function(){c(e);let t=l();return d(t.onDownButtonMouseUp())})("mouseleave",function(){c(e);let t=l();return d(t.onDownButtonMouseLeave())})("keydown",function(t){c(e);let r=l();return d(r.onDownButtonKeyDown(t))})("keyup",function(){c(e);let t=l();return d(t.onDownButtonKeyUp())}),v(5,Ot,1,2,"span",12)(6,Ut,3,2,"ng-container",2),g()()}if(i&2){let e=l();E(e.cx("buttonGroup")),u("pBind",e.ptm("buttonGroup")),P("data-p",e.dataP),p(),E(e.cn(e.cx("incrementButton"),e.incrementButtonClass)),u("pBind",e.ptm("incrementButton")),P("disabled",e.$disabled()?"":void 0)("aria-hidden",!0)("data-p",e.dataP),p(),u("ngIf",e.incrementButtonIcon),p(),u("ngIf",!e.incrementButtonIcon),p(),E(e.cn(e.cx("decrementButton"),e.decrementButtonClass)),u("pBind",e.ptm("decrementButton")),P("disabled",e.$disabled()?"":void 0)("aria-hidden",!0)("data-p",e.dataP),p(),u("ngIf",e.decrementButtonIcon),p(),u("ngIf",!e.decrementButtonIcon)}}function jt(i,s){if(i&1&&D(0,"span",13),i&2){let e=l(2);u("pBind",e.ptm("incrementButtonIcon"))("ngClass",e.incrementButtonIcon)}}function qt(i,s){if(i&1&&(V(),D(0,"svg",15)),i&2){let e=l(3);u("pBind",e.ptm("incrementButtonIcon"))}}function Gt(i,s){}function Kt(i,s){i&1&&v(0,Gt,0,0,"ng-template")}function Wt(i,s){if(i&1&&(U(0),v(1,qt,1,1,"svg",14)(2,Kt,1,0,null,9),$()),i&2){let e=l(2);p(),u("ngIf",!e.incrementButtonIconTemplate&&!e._incrementButtonIconTemplate),p(),u("ngTemplateOutlet",e.incrementButtonIconTemplate||e._incrementButtonIconTemplate)}}function Ht(i,s){if(i&1){let e=N();m(0,"button",11),C("mousedown",function(t){c(e);let r=l();return d(r.onUpButtonMouseDown(t))})("mouseup",function(){c(e);let t=l();return d(t.onUpButtonMouseUp())})("mouseleave",function(){c(e);let t=l();return d(t.onUpButtonMouseLeave())})("keydown",function(t){c(e);let r=l();return d(r.onUpButtonKeyDown(t))})("keyup",function(){c(e);let t=l();return d(t.onUpButtonKeyUp())}),v(1,jt,1,2,"span",12)(2,Wt,3,2,"ng-container",2),g()}if(i&2){let e=l();E(e.cn(e.cx("incrementButton"),e.incrementButtonClass)),u("pBind",e.ptm("incrementButton")),P("disabled",e.$disabled()?"":void 0)("aria-hidden",!0)("data-p",e.dataP),p(),u("ngIf",e.incrementButtonIcon),p(),u("ngIf",!e.incrementButtonIcon)}}function Qt(i,s){if(i&1&&D(0,"span",13),i&2){let e=l(2);u("pBind",e.ptm("decrementButtonIcon"))("ngClass",e.decrementButtonIcon)}}function Xt(i,s){if(i&1&&(V(),D(0,"svg",17)),i&2){let e=l(3);u("pBind",e.ptm("decrementButtonIcon"))}}function Zt(i,s){}function Yt(i,s){i&1&&v(0,Zt,0,0,"ng-template")}function Jt(i,s){if(i&1&&(U(0),v(1,Xt,1,1,"svg",16)(2,Yt,1,0,null,9),$()),i&2){let e=l(2);p(),u("ngIf",!e.decrementButtonIconTemplate&&!e._decrementButtonIconTemplate),p(),u("ngTemplateOutlet",e.decrementButtonIconTemplate||e._decrementButtonIconTemplate)}}function en(i,s){if(i&1){let e=N();m(0,"button",11),C("mousedown",function(t){c(e);let r=l();return d(r.onDownButtonMouseDown(t))})("mouseup",function(){c(e);let t=l();return d(t.onDownButtonMouseUp())})("mouseleave",function(){c(e);let t=l();return d(t.onDownButtonMouseLeave())})("keydown",function(t){c(e);let r=l();return d(r.onDownButtonKeyDown(t))})("keyup",function(){c(e);let t=l();return d(t.onDownButtonKeyUp())}),v(1,Qt,1,2,"span",12)(2,Jt,3,2,"ng-container",2),g()}if(i&2){let e=l();E(e.cn(e.cx("decrementButton"),e.decrementButtonClass)),u("pBind",e.ptm("decrementButton")),P("disabled",e.$disabled()?"":void 0)("aria-hidden",!0)("data-p",e.dataP),p(),u("ngIf",e.decrementButtonIcon),p(),u("ngIf",!e.decrementButtonIcon)}}var tn=`
    ${pt}

    /* For PrimeNG */
    p-inputNumber.ng-invalid.ng-dirty > .p-inputtext,
    p-input-number.ng-invalid.ng-dirty > .p-inputtext,
    p-inputnumber.ng-invalid.ng-dirty > .p-inputtext {
        border-color: dt('inputtext.invalid.border.color');
    }

    p-inputNumber.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-input-number.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-inputnumber.ng-invalid.ng-dirty > .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
    }

    p-inputNumber.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-input-number.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-inputnumber.ng-invalid.ng-dirty > .p-inputtext::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`,nn={root:({instance:i})=>["p-inputnumber p-component p-inputwrapper",{"p-inputwrapper-filled":i.$filled()||i.allowEmpty===!1,"p-inputwrapper-focus":i.focused,"p-inputnumber-stacked":i.showButtons&&i.buttonLayout==="stacked","p-inputnumber-horizontal":i.showButtons&&i.buttonLayout==="horizontal","p-inputnumber-vertical":i.showButtons&&i.buttonLayout==="vertical","p-inputnumber-fluid":i.hasFluid,"p-invalid":i.invalid()}],pcInputText:"p-inputnumber-input",buttonGroup:"p-inputnumber-button-group",incrementButton:({instance:i})=>["p-inputnumber-button p-inputnumber-increment-button",{"p-disabled":i.showButtons&&i.max()!=null&&i.maxlength()}],decrementButton:({instance:i})=>["p-inputnumber-button p-inputnumber-decrement-button",{"p-disabled":i.showButtons&&i.min()!=null&&i.minlength()}],clearIcon:"p-inputnumber-clear-icon"},ct=(()=>{class i extends de{name="inputnumber";style=tn;classes=nn;static \u0275fac=(()=>{let e;return function(t){return(e||(e=T(i)))(t||i)}})();static \u0275prov=ee({token:i,factory:i.\u0275fac})}return i})();var dt=new ne("INPUTNUMBER_INSTANCE"),rn={provide:He,useExisting:ve(()=>xe),multi:!0},xe=(()=>{class i extends st{injector;componentName="InputNumber";$pcInputNumber=M(dt,{optional:!0,skipSelf:!0})??void 0;_componentStyle=M(ct);bindDirectiveInstance=M(R,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}showButtons=!1;format=!0;buttonLayout="stacked";inputId;styleClass;placeholder;tabindex;title;ariaLabelledBy;ariaDescribedBy;ariaLabel;ariaRequired;autocomplete;incrementButtonClass;decrementButtonClass;incrementButtonIcon;decrementButtonIcon;readonly;allowEmpty=!0;locale;localeMatcher;mode="decimal";currency;currencyDisplay;useGrouping=!0;minFractionDigits;maxFractionDigits;prefix;suffix;inputStyle;inputStyleClass;showClear=!1;autofocus;onInput=new z;onFocus=new z;onBlur=new z;onKeyDown=new z;onClear=new z;clearIconTemplate;incrementButtonIconTemplate;decrementButtonIconTemplate;templates;input;_clearIconTemplate;_incrementButtonIconTemplate;_decrementButtonIconTemplate;value;focused;initialized;groupChar="";prefixChar="";suffixChar="";isSpecialChar;timer;lastValue;_numeral;numberFormat;_decimal;_decimalChar="";_group;_minusSign;_currency;_prefix;_suffix;_index;ngControl=null;constructor(e){super(),this.injector=e}onChanges(e){["locale","localeMatcher","mode","currency","currencyDisplay","useGrouping","minFractionDigits","maxFractionDigits","prefix","suffix"].some(t=>!!e[t])&&this.updateConstructParser()}onInit(){this.ngControl=this.injector.get(fe,null,{optional:!0}),this.constructParser(),this.initialized=!0}onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"clearicon":this._clearIconTemplate=e.template;break;case"incrementbuttonicon":this._incrementButtonIconTemplate=e.template;break;case"decrementbuttonicon":this._decrementButtonIconTemplate=e.template;break}})}getOptions(){let e=(o,a,h)=>{if(!(o==null||isNaN(o)||!isFinite(o)))return Math.max(a,Math.min(h,Math.floor(o)))},n=e(this.minFractionDigits,0,20),t=e(this.maxFractionDigits,0,100),r=n!=null&&t!=null&&n>t?t:n;return{localeMatcher:this.localeMatcher,style:this.mode,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:this.useGrouping,minimumFractionDigits:r,maximumFractionDigits:t}}constructParser(){let e=this.getOptions(),n=Object.fromEntries(Object.entries(e).filter(([o,a])=>a!==void 0));this.numberFormat=new Intl.NumberFormat(this.locale,n);let t=[...new Intl.NumberFormat(this.locale,{useGrouping:!1}).format(9876543210)].reverse(),r=new Map(t.map((o,a)=>[o,a]));this._numeral=new RegExp(`[${t.join("")}]`,"g"),this._group=this.getGroupingExpression(),this._minusSign=this.getMinusSignExpression(),this._currency=this.getCurrencyExpression(),this._decimal=this.getDecimalExpression(),this._decimalChar=this.getDecimalChar(),this._suffix=this.getSuffixExpression(),this._prefix=this.getPrefixExpression(),this._index=o=>r.get(o)}updateConstructParser(){this.initialized&&this.constructParser()}escapeRegExp(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}getDecimalExpression(){let e=this.getDecimalChar();return new RegExp(`[${e}]`,"g")}getDecimalChar(){return new Intl.NumberFormat(this.locale,J(Y({},this.getOptions()),{useGrouping:!1})).format(1.1).replace(this._currency,"").trim().replace(this._numeral,"")}getGroupingExpression(){let e=new Intl.NumberFormat(this.locale,{useGrouping:!0});return this.groupChar=e.format(1e6).trim().replace(this._numeral,"").charAt(0),new RegExp(`[${this.groupChar}]`,"g")}getMinusSignExpression(){let e=new Intl.NumberFormat(this.locale,{useGrouping:!1});return new RegExp(`[${e.format(-1).trim().replace(this._numeral,"")}]`,"g")}getCurrencyExpression(){if(this.currency){let e=new Intl.NumberFormat(this.locale,{style:"currency",currency:this.currency,currencyDisplay:this.currencyDisplay,minimumFractionDigits:0,maximumFractionDigits:0});return new RegExp(`[${e.format(1).replace(/\s/g,"").replace(this._numeral,"").replace(this._group,"")}]`,"g")}return new RegExp("[]","g")}getPrefixExpression(){if(this.prefix)this.prefixChar=this.prefix;else{let e=new Intl.NumberFormat(this.locale,{style:this.mode,currency:this.currency,currencyDisplay:this.currencyDisplay});this.prefixChar=e.format(1).split("1")[0]}return new RegExp(`${this.escapeRegExp(this.prefixChar||"")}`,"g")}getSuffixExpression(){if(this.suffix)this.suffixChar=this.suffix;else{let e=new Intl.NumberFormat(this.locale,{style:this.mode,currency:this.currency,currencyDisplay:this.currencyDisplay,minimumFractionDigits:0,maximumFractionDigits:0});this.suffixChar=e.format(1).split("1")[1]}return new RegExp(`${this.escapeRegExp(this.suffixChar||"")}`,"g")}formatValue(e){if(e!=null){if(e==="-")return e;if(this.format){let t=new Intl.NumberFormat(this.locale,this.getOptions()).format(e);return this.prefix&&e!=this.prefix&&(t=this.prefix+t),this.suffix&&e!=this.suffix&&(t=t+this.suffix),t}return e.toString()}return""}parseValue(e){let n=this._suffix?new RegExp(this._suffix,""):/(?:)/,t=this._prefix?new RegExp(this._prefix,""):/(?:)/,r=this._currency?new RegExp(this._currency,""):/(?:)/,o=e.replace(n,"").replace(t,"").trim().replace(/\s/g,"").replace(r,"").replace(this._group,"").replace(this._minusSign,"-").replace(this._decimal,".").replace(this._numeral,this._index);if(o){if(o==="-")return o;let a=+o;return isNaN(a)?null:a}return null}repeat(e,n,t){if(this.readonly)return;let r=n||500;this.clearTimer(),this.timer=setTimeout(()=>{this.repeat(e,40,t)},r),this.spin(e,t)}spin(e,n){let t=(this.step()??1)*n,r=this.parseValue(this.input?.nativeElement.value)||0,o=this.validateValue(r+t),a=this.maxlength();a&&a<this.formatValue(o).length||(this.updateInput(o,null,"spin",null),this.updateModel(e,o),this.handleOnInput(e,r,o))}clear(){this.value=null,this.onModelChange(this.value),this.onClear.emit()}onUpButtonMouseDown(e){if(e.button===2){this.clearTimer();return}this.$disabled()||(this.input?.nativeElement.focus(),this.repeat(e,null,1),e.preventDefault())}onUpButtonMouseUp(){this.$disabled()||this.clearTimer()}onUpButtonMouseLeave(){this.$disabled()||this.clearTimer()}onUpButtonKeyDown(e){(e.keyCode===32||e.keyCode===13)&&this.repeat(e,null,1)}onUpButtonKeyUp(){this.$disabled()||this.clearTimer()}onDownButtonMouseDown(e){if(e.button===2){this.clearTimer();return}this.$disabled()||(this.input?.nativeElement.focus(),this.repeat(e,null,-1),e.preventDefault())}onDownButtonMouseUp(){this.$disabled()||this.clearTimer()}onDownButtonMouseLeave(){this.$disabled()||this.clearTimer()}onDownButtonKeyUp(){this.$disabled()||this.clearTimer()}onDownButtonKeyDown(e){(e.keyCode===32||e.keyCode===13)&&this.repeat(e,null,-1)}onUserInput(e){this.readonly||(this.isSpecialChar&&(e.target.value=this.lastValue),this.isSpecialChar=!1)}onInputKeyDown(e){if(this.readonly)return;if(this.lastValue=e.target.value,e.shiftKey||e.altKey){this.isSpecialChar=!0;return}let n=e.target.selectionStart,t=e.target.selectionEnd,r=e.target.value,o=null;switch(e.altKey&&e.preventDefault(),e.key){case"ArrowUp":this.spin(e,1),e.preventDefault();break;case"ArrowDown":this.spin(e,-1),e.preventDefault();break;case"ArrowLeft":for(let a=n;a<=r.length;a++){let h=a===0?0:a-1;if(this.isNumeralChar(r.charAt(h))){this.input.nativeElement.setSelectionRange(a,a);break}}break;case"ArrowRight":for(let a=t;a>=0;a--)if(this.isNumeralChar(r.charAt(a))){this.input.nativeElement.setSelectionRange(a,a);break}break;case"Tab":case"Enter":o=this.validateValue(this.parseValue(this.input.nativeElement.value)),this.input.nativeElement.value=this.formatValue(o),this.input.nativeElement.setAttribute("aria-valuenow",o),this.updateModel(e,o);break;case"Backspace":{if(e.preventDefault(),n===t){if(n==1&&this.prefix||n==r.length&&this.suffix)break;let a=r.charAt(n-1),{decimalCharIndex:h,decimalCharIndexWithoutPrefix:_}=this.getDecimalCharIndexes(r);if(this.isNumeralChar(a)){let f=this.getDecimalLength(r);if(this._group.test(a))this._group.lastIndex=0,o=r.slice(0,n-2)+r.slice(n-1);else if(this._decimal.test(a))this._decimal.lastIndex=0,f?this.input?.nativeElement.setSelectionRange(n-1,n-1):o=r.slice(0,n-1)+r.slice(n);else if(h>0&&n>h){let I=this.isDecimalMode()&&(this.minFractionDigits||0)<f?"":"0";o=r.slice(0,n-1)+I+r.slice(n)}else _===1?(o=r.slice(0,n-1)+"0"+r.slice(n),o=this.parseValue(o)>0?o:""):o=r.slice(0,n-1)+r.slice(n)}else this.mode==="currency"&&this._currency&&a.search(this._currency)!=-1&&(o=r.slice(1));this.updateValue(e,o,null,"delete-single")}else o=this.deleteRange(r,n,t),this.updateValue(e,o,null,"delete-range");break}case"Delete":if(e.preventDefault(),n===t){if(n==0&&this.prefix||n==r.length-1&&this.suffix)break;let a=r.charAt(n),{decimalCharIndex:h,decimalCharIndexWithoutPrefix:_}=this.getDecimalCharIndexes(r);if(this.isNumeralChar(a)){let f=this.getDecimalLength(r);if(this._group.test(a))this._group.lastIndex=0,o=r.slice(0,n)+r.slice(n+2);else if(this._decimal.test(a))this._decimal.lastIndex=0,f?this.input?.nativeElement.setSelectionRange(n+1,n+1):o=r.slice(0,n)+r.slice(n+1);else if(h>0&&n>h){let I=this.isDecimalMode()&&(this.minFractionDigits||0)<f?"":"0";o=r.slice(0,n)+I+r.slice(n+1)}else _===1?(o=r.slice(0,n)+"0"+r.slice(n+1),o=this.parseValue(o)>0?o:""):o=r.slice(0,n)+r.slice(n+1)}this.updateValue(e,o,null,"delete-back-single")}else o=this.deleteRange(r,n,t),this.updateValue(e,o,null,"delete-range");break;case"Home":this.min()&&(this.updateModel(e,this.min()),e.preventDefault());break;case"End":this.max()&&(this.updateModel(e,this.max()),e.preventDefault());break;default:break}this.onKeyDown.emit(e)}onInputKeyPress(e){if(this.readonly)return;let n=e.which||e.keyCode,t=String.fromCharCode(n),r=this.isDecimalSign(t),o=this.isMinusSign(t);n!=13&&e.preventDefault(),!r&&e.code==="NumpadDecimal"&&(r=!0,t=this._decimalChar,n=t.charCodeAt(0));let{value:a,selectionStart:h,selectionEnd:_}=this.input.nativeElement,f=this.parseValue(a+t),I=f!=null?f.toString():"",O=a.substring(h,_),x=this.parseValue(O),k=x!=null?x.toString():"";if(h!==_&&k.length>0){this.insert(e,t,{isDecimalSign:r,isMinusSign:o});return}let S=this.maxlength();S&&I.length>S||(48<=n&&n<=57||o||r)&&this.insert(e,t,{isDecimalSign:r,isMinusSign:o})}onPaste(e){if(!this.$disabled()&&!this.readonly){e.preventDefault();let n=(e.clipboardData||this.document.defaultView.clipboardData).getData("Text");if(this.inputId==="integeronly"&&/[^\d-]/.test(n))return;if(n){this.maxlength()&&(n=n.toString().substring(0,this.maxlength()));let t=this.parseValue(n);t!=null&&this.insert(e,t.toString())}}}allowMinusSign(){let e=this.min();return e==null||e<0}isMinusSign(e){return this._minusSign.test(e)||e==="-"?(this._minusSign.lastIndex=0,!0):!1}isDecimalSign(e){return this._decimal.test(e)?(this._decimal.lastIndex=0,!0):!1}isDecimalMode(){return this.mode==="decimal"}getDecimalCharIndexes(e){let n=e.search(this._decimal);this._decimal.lastIndex=0;let r=e.replace(this._prefix,"").trim().replace(/\s/g,"").replace(this._currency,"").search(this._decimal);return this._decimal.lastIndex=0,{decimalCharIndex:n,decimalCharIndexWithoutPrefix:r}}getCharIndexes(e){let n=e.search(this._decimal);this._decimal.lastIndex=0;let t=e.search(this._minusSign);this._minusSign.lastIndex=0;let r=e.search(this._suffix);this._suffix.lastIndex=0;let o=e.search(this._currency);return this._currency.lastIndex=0,{decimalCharIndex:n,minusCharIndex:t,suffixCharIndex:r,currencyCharIndex:o}}insert(e,n,t={isDecimalSign:!1,isMinusSign:!1}){let r=n.search(this._minusSign);if(this._minusSign.lastIndex=0,!this.allowMinusSign()&&r!==-1)return;let o=this.input?.nativeElement.selectionStart,a=this.input?.nativeElement.selectionEnd,h=this.input?.nativeElement.value.trim(),{decimalCharIndex:_,minusCharIndex:f,suffixCharIndex:I,currencyCharIndex:O}=this.getCharIndexes(h),x;if(t.isMinusSign)o===0&&(x=h,(f===-1||a!==0)&&(x=this.insertText(h,n,0,a)),this.updateValue(e,x,n,"insert"));else if(t.isDecimalSign)_>0&&o===_?this.updateValue(e,h,n,"insert"):_>o&&_<a?(x=this.insertText(h,n,o,a),this.updateValue(e,x,n,"insert")):_===-1&&this.maxFractionDigits&&(x=this.insertText(h,n,o,a),this.updateValue(e,x,n,"insert"));else{let k=this.numberFormat.resolvedOptions().maximumFractionDigits,S=o!==a?"range-insert":"insert";if(_>0&&o>_){if(o+n.length-(_+1)<=k){let F=O>=o?O-1:I>=o?I:h.length;x=h.slice(0,o)+n+h.slice(o+n.length,F)+h.slice(F),this.updateValue(e,x,n,S)}}else x=this.insertText(h,n,o,a),this.updateValue(e,x,n,S)}}insertText(e,n,t,r){if((n==="."?n:n.split(".")).length===2){let a=e.slice(t,r).search(this._decimal);return this._decimal.lastIndex=0,a>0?e.slice(0,t)+this.formatValue(n)+e.slice(r):e||this.formatValue(n)}else return r-t===e.length?this.formatValue(n):t===0?n+e.slice(r):r===e.length?e.slice(0,t)+n:e.slice(0,t)+n+e.slice(r)}deleteRange(e,n,t){let r;return t-n===e.length?r="":n===0?r=e.slice(t):t===e.length?r=e.slice(0,n):r=e.slice(0,n)+e.slice(t),r}initCursor(){let e=this.input?.nativeElement.selectionStart,n=this.input?.nativeElement.selectionEnd,t=this.input?.nativeElement.value,r=t.length,o=null,a=(this.prefixChar||"").length;t=t.replace(this._prefix,""),(e===n||e!==0||n<a)&&(e-=a);let h=t.charAt(e);if(this.isNumeralChar(h))return e+a;let _=e-1;for(;_>=0;)if(h=t.charAt(_),this.isNumeralChar(h)){o=_+a;break}else _--;if(o!==null)this.input?.nativeElement.setSelectionRange(o+1,o+1);else{for(_=e;_<r;)if(h=t.charAt(_),this.isNumeralChar(h)){o=_+a;break}else _++;o!==null&&this.input?.nativeElement.setSelectionRange(o,o)}return o||0}onInputClick(){let e=this.input?.nativeElement.value;!this.readonly&&e!==Le()&&this.initCursor()}isNumeralChar(e){return e.length===1&&(this._numeral.test(e)||this._decimal.test(e)||this._group.test(e)||this._minusSign.test(e))?(this.resetRegex(),!0):!1}resetRegex(){this._numeral.lastIndex=0,this._decimal.lastIndex=0,this._group.lastIndex=0,this._minusSign.lastIndex=0}updateValue(e,n,t,r){let o=this.input?.nativeElement.value,a=null;n!=null&&(a=this.parseValue(n),a=!a&&!this.allowEmpty?0:a,this.updateInput(a,t,r,n),this.handleOnInput(e,o,a))}handleOnInput(e,n,t){this.isValueChanged(n,t)&&(this.input.nativeElement.value=this.formatValue(t),this.input?.nativeElement.setAttribute("aria-valuenow",t),this.updateModel(e,t),this.onInput.emit({originalEvent:e,value:t,formattedValue:n}))}isValueChanged(e,n){if(n===null&&e!==null)return!0;if(n!=null){let t=typeof e=="string"?this.parseValue(e):e;return n!==t}return!1}validateValue(e){if(e==="-"||e==null)return null;let n=this.min(),t=this.max();return n!=null&&e<n?this.min():t!=null&&e>t?t:e}updateInput(e,n,t,r){n=n||"";let o=this.input?.nativeElement.value,a=this.formatValue(e),h=o.length;if(a!==r&&(a=this.concatValues(a,r)),h===0){this.input.nativeElement.value=a,this.input.nativeElement.setSelectionRange(0,0);let f=this.initCursor()+n.length;this.input.nativeElement.setSelectionRange(f,f)}else{let _=this.input.nativeElement.selectionStart,f=this.input.nativeElement.selectionEnd,I=this.maxlength();if(I&&a.length>I&&(a=a.slice(0,I),_=Math.min(_,I),f=Math.min(f,I)),I&&I<a.length)return;this.input.nativeElement.value=a;let O=a.length;if(t==="range-insert"){let x=this.parseValue((o||"").slice(0,_)),S=(x!==null?x.toString():"").split("").join(`(${this.groupChar})?`),F=new RegExp(S,"g");F.test(a);let ft=n.split("").join(`(${this.groupChar})?`),Ce=new RegExp(ft,"g");Ce.test(a.slice(F.lastIndex)),f=F.lastIndex+Ce.lastIndex,this.input.nativeElement.setSelectionRange(f,f)}else if(O===h)t==="insert"||t==="delete-back-single"?this.input.nativeElement.setSelectionRange(f+1,f+1):t==="delete-single"?this.input.nativeElement.setSelectionRange(f-1,f-1):(t==="delete-range"||t==="spin")&&this.input.nativeElement.setSelectionRange(f,f);else if(t==="delete-back-single"){let x=o.charAt(f-1),k=o.charAt(f),S=h-O,F=this._group.test(k);F&&S===1?f+=1:!F&&this.isNumeralChar(x)&&(f+=-1*S+1),this._group.lastIndex=0,this.input.nativeElement.setSelectionRange(f,f)}else if(o==="-"&&t==="insert"){this.input.nativeElement.setSelectionRange(0,0);let k=this.initCursor()+n.length+1;this.input.nativeElement.setSelectionRange(k,k)}else f=f+(O-h),this.input.nativeElement.setSelectionRange(f,f)}this.input.nativeElement.setAttribute("aria-valuenow",e)}concatValues(e,n){if(e&&n){let t=n.search(this._decimal);return this._decimal.lastIndex=0,this.suffixChar?t!==-1?e.replace(this.suffixChar,"").split(this._decimal)[0]+n.replace(this.suffixChar,"").slice(t)+this.suffixChar:e:t!==-1?e.split(this._decimal)[0]+n.slice(t):e}return e}getDecimalLength(e){if(e){let n=e.split(this._decimal);if(n.length===2)return n[1].replace(this._suffix,"").trim().replace(/\s/g,"").replace(this._currency,"").length}return 0}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1;let n=this.validateValue(this.parseValue(this.input.nativeElement.value)),t=n?.toString();this.input.nativeElement.value=this.formatValue(t),this.input.nativeElement.setAttribute("aria-valuenow",t),this.updateModel(e,n),this.onModelTouched(),this.onBlur.emit(e)}formattedValue(){let e=!this.value&&!this.allowEmpty?0:this.value;return this.formatValue(e)}updateModel(e,n){let t=this.ngControl?.control?.updateOn==="blur";this.value!==n?(this.value=n,t&&this.focused||this.onModelChange(n)):t&&this.onModelChange(n)}writeControlValue(e,n){this.value=e&&Number(e),n(e),this.cd.markForCheck()}clearTimer(){this.timer&&clearInterval(this.timer)}get dataP(){return this.cn({invalid:this.invalid(),disabled:this.$disabled(),focus:this.focused,fluid:this.hasFluid,filled:this.$variant()==="filled",empty:!this.$filled(),[this.size()]:this.size(),[this.buttonLayout]:this.showButtons&&this.buttonLayout})}static \u0275fac=function(n){return new(n||i)(W(Ie))};static \u0275cmp=A({type:i,selectors:[["p-inputNumber"],["p-inputnumber"],["p-input-number"]],contentQueries:function(n,t,r){if(n&1&&De(r,It,4)(r,wt,4)(r,Mt,4)(r,Ue,4),n&2){let o;j(o=q())&&(t.clearIconTemplate=o.first),j(o=q())&&(t.incrementButtonIconTemplate=o.first),j(o=q())&&(t.decrementButtonIconTemplate=o.first),j(o=q())&&(t.templates=o)}},viewQuery:function(n,t){if(n&1&&Ee(Tt,5),n&2){let r;j(r=q())&&(t.input=r.first)}},hostVars:3,hostBindings:function(n,t){n&2&&(P("data-p",t.dataP),E(t.cn(t.cx("root"),t.styleClass)))},inputs:{showButtons:[2,"showButtons","showButtons",y],format:[2,"format","format",y],buttonLayout:"buttonLayout",inputId:"inputId",styleClass:"styleClass",placeholder:"placeholder",tabindex:[2,"tabindex","tabindex",pe],title:"title",ariaLabelledBy:"ariaLabelledBy",ariaDescribedBy:"ariaDescribedBy",ariaLabel:"ariaLabel",ariaRequired:[2,"ariaRequired","ariaRequired",y],autocomplete:"autocomplete",incrementButtonClass:"incrementButtonClass",decrementButtonClass:"decrementButtonClass",incrementButtonIcon:"incrementButtonIcon",decrementButtonIcon:"decrementButtonIcon",readonly:[2,"readonly","readonly",y],allowEmpty:[2,"allowEmpty","allowEmpty",y],locale:"locale",localeMatcher:"localeMatcher",mode:"mode",currency:"currency",currencyDisplay:"currencyDisplay",useGrouping:[2,"useGrouping","useGrouping",y],minFractionDigits:[2,"minFractionDigits","minFractionDigits",e=>pe(e,void 0)],maxFractionDigits:[2,"maxFractionDigits","maxFractionDigits",e=>pe(e,void 0)],prefix:"prefix",suffix:"suffix",inputStyle:"inputStyle",inputStyleClass:"inputStyleClass",showClear:[2,"showClear","showClear",y],autofocus:[2,"autofocus","autofocus",y]},outputs:{onInput:"onInput",onFocus:"onFocus",onBlur:"onBlur",onKeyDown:"onKeyDown",onClear:"onClear"},features:[le([rn,ct,{provide:dt,useExisting:i},{provide:me,useExisting:i}]),oe([R]),B],decls:6,vars:38,consts:[["input",""],["pInputText","","role","spinbutton","inputmode","decimal",3,"input","keydown","keypress","paste","click","focus","blur","value","ngStyle","variant","invalid","pSize","pt","unstyled","pAutoFocus","fluid"],[4,"ngIf"],[3,"pBind","class",4,"ngIf"],["type","button","tabindex","-1",3,"pBind","class","mousedown","mouseup","mouseleave","keydown","keyup",4,"ngIf"],["data-p-icon","times",3,"pBind","class","click",4,"ngIf"],[3,"pBind","class","click",4,"ngIf"],["data-p-icon","times",3,"click","pBind"],[3,"click","pBind"],[4,"ngTemplateOutlet"],[3,"pBind"],["type","button","tabindex","-1",3,"mousedown","mouseup","mouseleave","keydown","keyup","pBind"],[3,"pBind","ngClass",4,"ngIf"],[3,"pBind","ngClass"],["data-p-icon","angle-up",3,"pBind",4,"ngIf"],["data-p-icon","angle-up",3,"pBind"],["data-p-icon","angle-down",3,"pBind",4,"ngIf"],["data-p-icon","angle-down",3,"pBind"]],template:function(n,t){if(n&1){let r=N();m(0,"input",1,0),C("input",function(a){return c(r),d(t.onUserInput(a))})("keydown",function(a){return c(r),d(t.onInputKeyDown(a))})("keypress",function(a){return c(r),d(t.onInputKeyPress(a))})("paste",function(a){return c(r),d(t.onPaste(a))})("click",function(){return c(r),d(t.onInputClick())})("focus",function(a){return c(r),d(t.onInputFocus(a))})("blur",function(a){return c(r),d(t.onInputBlur(a))}),g(),v(2,Vt,3,2,"ng-container",2)(3,$t,7,20,"span",3)(4,Ht,3,8,"button",4)(5,en,3,8,"button",4)}n&2&&(E(t.cn(t.cx("pcInputText"),t.inputStyleClass)),u("value",t.formattedValue())("ngStyle",t.inputStyle)("variant",t.$variant())("invalid",t.invalid())("pSize",t.size())("pt",t.ptm("pcInputText"))("unstyled",t.unstyled())("pAutoFocus",t.autofocus)("fluid",t.hasFluid),P("id",t.inputId)("aria-valuemin",t.min())("aria-valuemax",t.max())("aria-valuenow",t.value)("placeholder",t.placeholder)("aria-label",t.ariaLabel)("aria-labelledby",t.ariaLabelledBy)("aria-describedby",t.ariaDescribedBy)("title",t.title)("size",t.inputSize())("name",t.name())("autocomplete",t.autocomplete)("maxlength",t.maxlength())("minlength",t.minlength())("tabindex",t.tabindex)("aria-required",t.ariaRequired)("min",t.min())("max",t.max())("step",t.step()??1)("required",t.required()?"":void 0)("readonly",t.readonly?"":void 0)("disabled",t.$disabled()?"":void 0)("data-p",t.dataP),p(2),u("ngIf",t.buttonLayout!="vertical"&&t.showClear&&t.value),p(),u("ngIf",t.showButtons&&t.buttonLayout==="stacked"),p(),u("ngIf",t.showButtons&&t.buttonLayout!=="stacked"),p(),u("ngIf",t.showButtons&&t.buttonLayout!=="stacked"))},dependencies:[ze,ke,Fe,Oe,Re,be,$e,qe,lt,ut,ce,je,R],encapsulation:2,changeDetection:0})}return i})(),mt=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=re({type:i});static \u0275inj=te({imports:[xe,ce,ce]})}return i})();var an=()=>({width:"100%"});function sn(i,s){if(i&1){let e=N();m(0,"article",28)(1,"div",29),D(2,"img",30),m(3,"div",31)(4,"p-button",32),C("onClick",function(){let t=c(e).$index,r=l(2);return d(r.removeImage(t))}),g()()(),m(5,"div",33)(6,"p-button",34),C("onClick",function(){let t=c(e).$index,r=l(2);return d(r.moveImageBy(t,-1))}),g(),m(7,"span"),w(8),g(),m(9,"p-button",35),C("onClick",function(){let t=c(e).$index,r=l(2);return d(r.moveImageBy(t,1))}),g()(),m(10,"textarea",36),C("input",function(t){let r=c(e).$index,o=l(2);return d(o.updateImageDescription(t,r))}),g()()}if(i&2){let e=s.$implicit,n=s.$index,t=l(2);p(2),u("src",e.url,we)("alt","Product image "+(n+1)),p(2),u("text",!0)("rounded",!0)("ariaLabel","Remove image "+(n+1)),p(2),u("text",!0)("rounded",!0)("disabled",n===0)("ariaLabel","Move image "+(n+1)+" left"),p(2),Pe("Image ",n+1),p(),u("text",!0)("rounded",!0)("disabled",n===t.temp_images().length-1)("ariaLabel","Move image "+(n+1)+" right"),p(),u("value",e.description)("autoResize",!0),P("aria-label","Description for image "+(n+1))}}function un(i,s){if(i&1&&(m(0,"div",22),Te(1,sn,11,17,"article",28,Me),g()),i&2){let e=l();p(),Be(e.temp_images())}}function ln(i,s){i&1&&(m(0,"div",23),D(1,"i",37),m(2,"p"),w(3,"No images added yet"),g(),m(4,"span"),w(5,"Add at least one photo to show off your product."),g()())}function pn(i,s){if(i&1&&(m(0,"p",24),w(1),g()),i&2){let e=l();p(),Ve(e.createError)}}function cn(i,s){i&1&&(m(0,"p",26),w(1," Complete the required fields and add at least one image to create this product. "),g())}var gt=10,ht=class i{constructor(s,e){this.productService=s;this.router=e}createError="";saving=!1;get missingRequirements(){let s=[];return this.temp_product.title.trim()||s.push("Title"),this.temp_product.slug.trim()||s.push("Web Slug"),this.temp_product.description.trim()||s.push("Description"),this.temp_images().length===0&&s.push("at least one image"),s}temp_product={id:"",title:"",slug:"",description:"",price:0,sold:!1,created_at:"",updated_at:""};temp_images=ie([]);imageTouched=!1;addImage(s){let e=s.target,n=Array.from(e.files??[]),t=gt-this.temp_images().length,r=n.slice(0,t);if(r.length){let o=r.map(a=>({url:URL.createObjectURL(a),file:a,description:""}));this.temp_images.update(a=>[...a,...o])}n.length>t?this.createError=`A product can have up to ${gt} images. Added ${r.length} of the selected images.`:r.length&&(this.createError=""),e.value=""}updateImageDescription(s,e){let n=s.target.value;this.temp_images.update(t=>t.map((r,o)=>o===e?J(Y({},r),{description:n}):r))}moveImageBy(s,e){let n=s+e,t=[...this.temp_images()];n<0||n>=t.length||([t[s],t[n]]=[t[n],t[s]],this.temp_images.set(t))}removeImage(s){let e=[...this.temp_images()],[n]=e.splice(s,1);n&&(URL.revokeObjectURL(n.url),this.temp_images.set(e))}async createProduct(){if(this.createError="",!(this.missingRequirements.length||this.saving)){this.saving=!0;try{await this.productService.createProduct({title:this.temp_product.title.trim(),slug:this.temp_product.slug.trim(),description:this.temp_product.description.trim(),price:this.temp_product.price},this.temp_images().map(({file:s,description:e})=>({file:s,description:e}))),await this.router.navigate(["/product",this.temp_product.slug.trim()])}catch(s){console.error("Product creation failed:",s),this.createError=s instanceof Error?s.message:"Product creation failed. Please try again."}finally{this.saving=!1}}}ngOnDestroy(){this.temp_images().forEach(s=>URL.revokeObjectURL(s.url))}static \u0275fac=function(e){return new(e||i)(W(We),W(Ae))};static \u0275cmp=A({type:i,selectors:[["create-product-page"]],decls:48,vars:21,consts:[["titleModel","ngModel"],["slugModel","ngModel"],["descriptionModel","ngModel"],["imageInput",""],[1,"create-page"],[1,"page-heading"],["aria-label","Product details",1,"form-card"],[1,"field-grid"],[1,"field"],["for","product-title"],["pInputText","","id","product-title","required","","placeholder","e.g. Walnut Serving Board",3,"ngModelChange","ngModel","invalid"],["for","product-slug"],["pInputText","","id","product-slug","required","","placeholder","walnut-serving-board",3,"ngModelChange","ngModel","invalid"],[1,"field","field-wide"],["for","product-description"],["pTextarea","","id","product-description","required","","placeholder","Describe the materials, details, and craftsmanship.","rows","4",3,"ngModelChange","ngModel","invalid","autoResize"],["for","product-price"],["inputId","product-price","mode","currency","currency","USD","locale","en-US",3,"ngModelChange","ngModel","min","inputStyle"],["aria-label","Product images",1,"form-card","image-section"],[1,"section-heading"],["id","image-upload","type","file","accept","image/*","multiple","","hidden","",3,"change"],["icon","pi pi-plus",3,"onFocus","onClick","label","outlined","disabled"],[1,"image-grid"],[1,"empty-images"],["role","alert",1,"create-error"],[1,"form-actions"],["aria-live","polite",1,"form-hint"],["label","Create product","icon","pi pi-check",3,"onClick","loading","disabled"],[1,"image-item"],[1,"image-preview"],[3,"src","alt"],[1,"image-remove-button"],["icon","pi pi-trash","severity","danger",3,"onClick","text","rounded","ariaLabel"],[1,"image-actions"],["icon","pi pi-arrow-left",3,"onClick","text","rounded","disabled","ariaLabel"],["icon","pi pi-arrow-right",3,"onClick","text","rounded","disabled","ariaLabel"],["pTextarea","","placeholder","Add a description (optional)","rows","1",1,"image-description-editor",3,"input","value","autoResize"],["aria-hidden","true",1,"pi","pi-images"]],template:function(e,n){if(e&1){let t=N();m(0,"main",4)(1,"header",5)(2,"div")(3,"p"),w(4,"PRODUCTS"),g(),m(5,"h1"),w(6,"Create a product"),g(),m(7,"span"),w(8,"Add the product details and images for your shop."),g()()(),m(9,"section",6)(10,"h2"),w(11,"Product details"),g(),m(12,"div",7)(13,"div",8)(14,"label",9),w(15,"Title"),g(),m(16,"input",10,0),Z("ngModelChange",function(o){return c(t),X(n.temp_product.title,o)||(n.temp_product.title=o),d(o)}),g()(),m(18,"div",8)(19,"label",11),w(20,"Web slug"),g(),m(21,"input",12,1),Z("ngModelChange",function(o){return c(t),X(n.temp_product.slug,o)||(n.temp_product.slug=o),d(o)}),g()(),m(23,"div",13)(24,"label",14),w(25,"Description"),g(),m(26,"textarea",15,2),Z("ngModelChange",function(o){return c(t),X(n.temp_product.description,o)||(n.temp_product.description=o),d(o)}),g()(),m(28,"div",8)(29,"label",16),w(30,"Price"),g(),m(31,"p-inputnumber",17),Z("ngModelChange",function(o){return c(t),X(n.temp_product.price,o)||(n.temp_product.price=o),d(o)}),g()()()(),m(32,"section",18)(33,"div",19)(34,"div")(35,"h2"),w(36,"Product images"),g(),m(37,"p"),w(38,"Upload and arrange the photos shown for this product."),g()(),m(39,"input",20,3),C("change",function(o){return c(t),d(n.addImage(o))}),g(),m(41,"p-button",21),C("onFocus",function(){return c(t),d(n.imageTouched=!0)})("onClick",function(){c(t);let o=H(40);return d(o.click())}),g()(),ae(42,un,3,0,"div",22)(43,ln,6,0,"div",23),g(),ae(44,pn,2,1,"p",24),m(45,"div",25),ae(46,cn,2,0,"p",26),m(47,"p-button",27),C("onClick",function(){return c(t),d(n.createProduct())}),g()()()}if(e&2){let t=H(17),r=H(22),o=H(27);p(16),Q("ngModel",n.temp_product.title),u("invalid",!n.temp_product.title.trim()&&(t.dirty||t.touched)),p(5),Q("ngModel",n.temp_product.slug),u("invalid",!n.temp_product.slug.trim()&&(r.dirty||r.touched)),p(5),Q("ngModel",n.temp_product.description),u("invalid",!n.temp_product.description.trim()&&(o.dirty||o.touched))("autoResize",!0),p(5),Q("ngModel",n.temp_product.price),u("min",0)("inputStyle",Ne(20,an)),p(),Se("image-required",n.imageTouched&&n.temp_images().length===0),p(9),u("label",n.temp_images().length>=10?"Image limit reached":"Add images")("outlined",!0)("disabled",n.temp_images().length>=10||n.saving),p(),se(n.temp_images().length?42:43),p(2),se(n.createError?44:-1),p(2),se(n.missingRequirements.length?46:-1),p(),u("loading",n.saving)("disabled",n.missingRequirements.length>0||n.saving)}},dependencies:[Je,Qe,Xe,Ye,Ze,et,be,ot,rt,mt,xe,Ke,Ge],styles:[".create-page[_ngcontent-%COMP%]{display:grid;gap:1.25rem;max-width:860px;margin:2rem auto;padding:0 1rem;font-family:system-ui,sans-serif}.page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--wood-accent);font-size:.75rem;font-weight:700;letter-spacing:.08em}.page-heading[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:1rem}.page-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .form-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:.35rem 0}.page-heading[_ngcontent-%COMP%] > span[_ngcontent-%COMP%], .section-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .image-actions[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .empty-images[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--p-text-muted-color)}.form-card[_ngcontent-%COMP%]{display:grid;gap:1.25rem;padding:1.5rem;border:1px solid var(--p-content-border-color);border-radius:.75rem;background:var(--p-content-background)}.image-section.image-required[_ngcontent-%COMP%]{border-color:var(--p-red-500)}.field-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem}.field[_ngcontent-%COMP%]{display:grid;align-content:start;gap:.5rem}.field-wide[_ngcontent-%COMP%]{grid-column:1/-1}.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   p-inputnumber[_ngcontent-%COMP%], .image-description-editor[_ngcontent-%COMP%]{width:100%}.section-heading[_ngcontent-%COMP%], .image-actions[_ngcontent-%COMP%], .form-actions[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:.5rem}.section-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .empty-images[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.image-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:1rem}.image-item[_ngcontent-%COMP%]{min-width:0;padding:.75rem;border:1px solid var(--p-content-border-color);border-radius:.75rem}.image-preview[_ngcontent-%COMP%]{position:relative}.image-preview[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{display:block;width:100%;aspect-ratio:4/3;border-radius:.5rem;object-fit:cover}.image-remove-button[_ngcontent-%COMP%]{position:absolute;top:.35rem;right:.35rem;border-radius:50%;background:var(--p-content-background);box-shadow:0 1px 4px #0003}.image-description-editor[_ngcontent-%COMP%]{font-size:.85rem}.empty-images[_ngcontent-%COMP%]{display:grid;justify-items:center;gap:.35rem;padding:2rem 1rem;border:1px dashed var(--p-content-border-color);border-radius:.75rem;text-align:center}.image-required[_ngcontent-%COMP%]   .empty-images[_ngcontent-%COMP%]{border-color:var(--p-red-500)}.empty-images[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--p-primary-color);font-size:1.5rem}.empty-images[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:600}.form-actions[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:.5rem}.form-hint[_ngcontent-%COMP%]{margin:0;color:var(--p-text-muted-color);font-size:.875rem}.create-error[_ngcontent-%COMP%]{margin:0;color:var(--p-red-600)}@media(max-width:600px){.field-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.field-wide[_ngcontent-%COMP%]{grid-column:auto}.form-card[_ngcontent-%COMP%]{padding:1rem}.form-actions[_ngcontent-%COMP%]{align-items:flex-end;flex-direction:column-reverse}.form-hint[_ngcontent-%COMP%]{text-align:right}.page-heading[_ngcontent-%COMP%]{align-items:flex-start}}"]})};export{ht as CreateProductPage};
