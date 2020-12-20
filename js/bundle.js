(()=>{var e={343:e=>{e.exports=function(){"use strict";var e=(2,12,Math.pow(2,1/12)),t=7902.13,n={};function a(e){return"string"==typeof e&&/^[A-G][b#]?[0-8]$/.test(e)}function i(e){return n.hasOwnProperty(e)}function r(e){return"string"==typeof e&&/^[A-Za-z\-\_ ]+$/.test(e)}function s(e){return Array.isArray(e)&&e.every(o)}function o(e){return"number"==typeof e&&e%1==0&&e>0}function c(n,a){var i=n*Math.pow(e,a);return i=(i=i>t?t:i)<16.35?16.35:i,Math.round(100*i)/100}function h(e){return 100*e}function l(e,t){return{C:-9,D:-7,E:-5,F:-4,G:-2,A:0,B:2}[e]+12*(t-4)}function d(e){return"#"!==e&&"b"!==e?0:{"#":1,b:-1}[e]}function u(e){if(!a(e))throw new Error('Invalid argument noteString: getNote(noteString) noteString should be a valid note name, eg. "Ab0", "C7"');var t=e.match(/^[A-G]/g),n=e.match(/[b#]/g),i=e.match(/[0-8]/g),r=t?t[0]:null,s=n?n[0]:null;return c(440,l(r,i?parseInt(i[0],10):null)+d(s))}return n.chromatic=[1],n.wholeTone=[2],n.major=[2,2,1,2,2,2,1],n.majorPentatonic=[2,2,3,2,3],n.minorPentatonic=[3,2,2,3,2],n.kuomiPentatonic=[1,4,2,1,4],n.chinesePentatonic=[4,2,1,4,1],n.naturalMinor=[2,1,2,2,1,2,2],n.harmonicMinor=[2,1,2,2,1,3,1],n.melodicMinor=[2,1,2,2,2,2,1],{makeScale:function(e,t,s){if(arguments.length<3)throw new Error("Missing argument(s): makeScale() expects three arguments");if(!r(e))throw new Error("Invalid argument scaleType: makeScale(scaleType, startNote, noteCount) expects scaleType to be a string consisting of lower or upper case letters (A-Z, a-z), spaces, hyphens(-) or underscores(_) only");if(!i(e))throw new Error("Scale type is undefined: makeScale(scaleType, startNote, noteCount) scale with name provided for scaleType is not defined – make sure you choose from available scale types");if(!o(s))throw new Error("Invalid argument noteCount: makeScale(scaleType, startNote, noteCount) expects noteCount to be a positive integer greater than 0");if(!a(t))throw new Error('Invalid argument startNote: makeScale(scaleType, startNote, noteCount) startNote should be a valid note name, eg. "Ab0", "C7"');var l,d=n[e],m=[],g=[],p=[],w=0,v=0,f=u(t);for(m.push(f),g.push(0),p.push(0),l=0;l<s-1;l+=1)w+=d[v],m.push(c(f,w)),g.push(h(w)),p.push(w),v=v===d.length-1?0:v+1;return{startNote:f,inHertz:m,inCents:g,inSemiTones:p}},getNote:u,addScale:function(e,t){if(arguments.length<2)throw new Error("Missing argument(s): addScale() expects two arguments");if(!r(e))throw new Error("Invalid argument name: addScale(name, scaleDef) expects name to be a string consisting of lower or upper case letters (A-Z, a-z), spaces, hyphens(-) or underscores(_) only");if(i(e))throw new Error("Scale type already defined: addScale(name, scaleDef) scale with value of name argument is already defined – make sure you choose a scale name not already in use");if(!s(t))throw new Error("Invalid argument scaleDef: addScale(name, scaleDef) expects scaleDef to be an array of only positive integers greater than 0");n[e]=t},getScaleNames:function(){var e,t=[];for(e in n)n.hasOwnProperty(e)&&t.push(e);return t},test:{getIntervalFromA4:l,getIntervalAdjustment:d,getCentsByInterval:h,getNoteByInterval:c,isValidNoteName:a,isValidScaleName:r,isValidScaleDefinition:s,isPositiveIntegerGreaterThanZero:o,isScaleTypeDefined:i}}}()}},t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={exports:{}};return e[a](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e,t,a=n(343),i=n.n(a);class r{constructor(){this.frequencies=i().makeScale("melodicMinor","C3",100).inHertz;var e=window.AudioContext||window.webkitAudioContext||!1;this.ctx=new e,this.compressor=this.ctx.createDynamicsCompressor(),this.compressor.connect(this.ctx.destination),this.prevTime=0,this.oscillators=this.frequencies.map(((e,t)=>{var n=this.ctx.createOscillator();n.type="sine";var a=this.ctx.createGain();return a.connect(this.compressor),a.gain.value=0,n.connect(a),n.frequency.value=this.frequencies[this.frequencies.length-1-t],n.start(this.ctx.currentTime),{osc:n,gain:a,val:0}}))}resumeAudioContext(){this.ctx.resume(),this.prevTime=this.ctx.currentTime}getPrevTime(){return this.prevTime}getCurrTime(){return this.ctx.currentTime}updateGains(e){for(var t=0;t<e.length;t++)this.oscillators[t%100].gain.gain.cancelScheduledValues(this.ctx.currentTime);for(t=0;t<e.length;t++)this.oscillators[t%100].val=e[t],this.oscillators[t%100].gain.gain.linearRampToValueAtTime(e[t],this.ctx.currentTime+1e-7*t);this.prevTime=this.ctx.currentTime}}class s{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.canvas.style.position="fixed",this.canvas.style.top="0px",this.canvas.style.left="0px",this.ctx=this.canvas.getContext("2d"),this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),document.body.appendChild(this.canvas),this.loadImage("./images/nightsky.jpg"),window.addEventListener("resize",(()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.ctx.drawImage(this.img,0,0,this.canvas.width,this.canvas.height),this.setImageData()}))}loadImage(e){var t=new Image;t.src=e,t.onload=function(){this.ctx.drawImage(t,0,0,this.canvas.width,this.canvas.height),this.setImageData()}.bind(this),this.img=t}setImageData(){this.data=this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height),this.imageData=this.data.data}}class o{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.canvas.style.position="fixed",this.canvas.style.top="0px",this.canvas.style.left="0px",this.ctx=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),window.addEventListener("resize",(()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}))}addEventHandler(e,t){this.canvas.addEventListener(e,t,!1)}paintDisplayBar(e){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="rgba(255, 0, 0, 1)",this.ctx.fillRect(e-5,0,10,this.canvas.height)}paintVisualIndicationOfSonificationOnDisplayBar(e,t,n){this.ctx.fillStyle="rgba(0, 0, 255, 1)",this.ctx.fillRect(e-5,t,10,5*n)}}var c,h=0,l=0,d={play:!0,speed:.7,scale:{numSteps:100}},u=0;function m(e,t){var n=(new Date).getTime(),a=Math.max(0,16-(n-u)),i=window.setTimeout((function(){e(n+a)}),a);return u=n+a,i}function g(){const n=function(){var t=Math.floor((e.getCurrTime()-e.getPrevTime())*(400*d.speed-200)),n=h+t;if(n>=window.innerWidth)for(;n>=window.innerWidth;)n-=window.innerWidth;return n<0&&(n+=window.innerWidth),n}();c.paintDisplayBar(n),function(n){var a=function(e){for(var n=[],a=0,i=0;a<window.innerHeight;){const s=4*(a*window.innerWidth+e),o=t.imageData[s],h=t.imageData[s+1],d=t.imageData[s+2],u=(t.imageData[s]+t.imageData[s+1]+t.imageData[s+2])/765;if(c.paintVisualIndicationOfSonificationOnDisplayBar(e,a,u),0!=u)n[i]?(n[i].endRow=a,n[i].red+=o,n[i].green+=h,n[i].blue+=d):n[i]={startRow:a,endRow:a,red:o,green:h,blue:d,fingerLocation:l};else if(n[i]){var r=n[i].endRow-n[i].startRow+1;n[i].red=n[i].red/r,n[i].green=n[i].green/r,n[i].blue=n[i].blue/r,i+=1}a+=1}return console.log(n),[]}(n);e.updateGains(a)}(n)}function p(t){e.resumeAudioContext(),h=t.pageX,l=t.pageY,m(g)}function w(t){e.resumeAudioContext(),t.changedTouches,null!=t.touches&&(h=t.touches[0].pageX,l=t.touches[0].pageY,m(g))}window.onload=function(){t=new s,c=new o,e=new r,c.addEventHandler("touchstart",w,!1),c.addEventHandler("touchmove",w,!1),c.addEventHandler("mousedown",p,!1),c.addEventHandler("mousemove",p,!1),e.resumeAudioContext(),d.play=!0}})()})();