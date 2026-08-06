(function(){"use strict";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var gi,_i,vi,xi,Vn;const Rt="srgb",ki="srgb-linear",Wi="linear",Ye="srgb",Wa="300 es";function Xi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xo(){const i=Xi("canvas");return i.style.display="block",i}const Xa={};function qa(...i){const e="THREE."+i.shift();console.log(e,...i)}function ja(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Te(...i){const e="THREE."+(i=ja(i)).shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function ke(...i){const e="THREE."+(i=ja(i)).shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Xn(...i){const e=i.join(" ");e in Xa||(Xa[e]=!0,Te(...i))}function qo(i,e,t){return new Promise(function(n,r){setTimeout(function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}},t)})}const jo={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};let Ln=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}};const St=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lr=Math.PI/180,Ur=180/Math.PI;function bi(){const i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(St[255&i]+St[i>>8&255]+St[i>>16&255]+St[i>>24&255]+"-"+St[255&e]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[63&t|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[255&n]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]).toLowerCase()}function ze(i,e,t){return Math.max(e,Math.min(t,i))}function Yo(i,e){return(i%e+e)%e}function Ir(i,e,t){return(1-t)*i+t*e}function wi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("THREE.MathUtils: Invalid component type.")}}let Ne=(gi=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*n-s*r+e.x,this.y=a*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},gi.prototype.isVector2=!0,gi),qn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,s,c){let l=n[r+0],o=n[r+1],u=n[r+2],p=n[r+3],h=a[s+0],d=a[s+1],_=a[s+2],f=a[s+3];if(p!==f||l!==h||o!==d||u!==_){let y=l*h+o*d+u*_+p*f;y<0&&(h=-h,d=-d,_=-_,f=-f,y=-y);let m=1-c;if(y<.9995){const g=Math.acos(y),E=Math.sin(g);m=Math.sin(m*g)/E,l=l*m+h*(c=Math.sin(c*g)/E),o=o*m+d*c,u=u*m+_*c,p=p*m+f*c}else{l=l*m+h*c,o=o*m+d*c,u=u*m+_*c,p=p*m+f*c;const g=1/Math.sqrt(l*l+o*o+u*u+p*p);l*=g,o*=g,u*=g,p*=g}}e[t]=l,e[t+1]=o,e[t+2]=u,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,a,s){const c=n[r],l=n[r+1],o=n[r+2],u=n[r+3],p=a[s],h=a[s+1],d=a[s+2],_=a[s+3];return e[t]=c*_+u*p+l*d-o*h,e[t+1]=l*_+u*h+o*p-c*d,e[t+2]=o*_+u*d+c*h-l*p,e[t+3]=u*_-c*p-l*h-o*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,s=e._order,c=Math.cos,l=Math.sin,o=c(n/2),u=c(r/2),p=c(a/2),h=l(n/2),d=l(r/2),_=l(a/2);switch(s){case"XYZ":this._x=h*u*p+o*d*_,this._y=o*d*p-h*u*_,this._z=o*u*_+h*d*p,this._w=o*u*p-h*d*_;break;case"YXZ":this._x=h*u*p+o*d*_,this._y=o*d*p-h*u*_,this._z=o*u*_-h*d*p,this._w=o*u*p+h*d*_;break;case"ZXY":this._x=h*u*p-o*d*_,this._y=o*d*p+h*u*_,this._z=o*u*_+h*d*p,this._w=o*u*p-h*d*_;break;case"ZYX":this._x=h*u*p-o*d*_,this._y=o*d*p+h*u*_,this._z=o*u*_-h*d*p,this._w=o*u*p+h*d*_;break;case"YZX":this._x=h*u*p+o*d*_,this._y=o*d*p+h*u*_,this._z=o*u*_-h*d*p,this._w=o*u*p-h*d*_;break;case"XZY":this._x=h*u*p-o*d*_,this._y=o*d*p-h*u*_,this._z=o*u*_+h*d*p,this._w=o*u*p+h*d*_;break;default:Te("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],s=t[1],c=t[5],l=t[9],o=t[2],u=t[6],p=t[10],h=n+c+p;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(a-o)*d,this._z=(s-r)*d}else if(n>c&&n>p){const d=2*Math.sqrt(1+n-c-p);this._w=(u-l)/d,this._x=.25*d,this._y=(r+s)/d,this._z=(a+o)/d}else if(c>p){const d=2*Math.sqrt(1+c-n-p);this._w=(a-o)/d,this._x=(r+s)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+p-n-c);this._w=(s-r)/d,this._x=(a+o)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,s=e._w,c=t._x,l=t._y,o=t._z,u=t._w;return this._x=n*u+s*c+r*o-a*l,this._y=r*u+s*l+a*c-n*o,this._z=a*u+s*o+n*l-r*c,this._w=s*u-n*c-r*l-a*o,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,a=e._z,s=e._w,c=this.dot(e);c<0&&(n=-n,r=-r,a=-a,s=-s,c=-c);let l=1-t;if(c<.9995){const o=Math.acos(c),u=Math.sin(o);l=Math.sin(l*o)/u,t=Math.sin(t*o)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+a*t,this._w=this._w*l+s*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+a*t,this._w=this._w*l+s*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=(_i=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ya.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ya.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,s=e.y,c=e.z,l=e.w,o=2*(s*r-c*n),u=2*(c*t-a*r),p=2*(a*n-s*t);return this.x=t+l*o+s*p-c*u,this.y=n+l*u+c*o-a*p,this.z=r+l*p+a*u-s*o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,s=t.x,c=t.y,l=t.z;return this.x=r*l-a*c,this.y=a*s-n*l,this.z=n*c-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Dr.copy(this).projectOnVector(e),this.sub(Dr)}reflect(e){return this.sub(Dr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_i.prototype.isVector3=!0,_i);const Dr=new U,Ya=new qn;let Ue=(vi=class{constructor(e,t,n,r,a,s,c,l,o){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,c,l,o)}set(e,t,n,r,a,s,c,l,o){const u=this.elements;return u[0]=e,u[1]=r,u[2]=c,u[3]=t,u[4]=a,u[5]=l,u[6]=n,u[7]=s,u[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],c=n[3],l=n[6],o=n[1],u=n[4],p=n[7],h=n[2],d=n[5],_=n[8],f=r[0],y=r[3],m=r[6],g=r[1],E=r[4],A=r[7],w=r[2],S=r[5],R=r[8];return a[0]=s*f+c*g+l*w,a[3]=s*y+c*E+l*S,a[6]=s*m+c*A+l*R,a[1]=o*f+u*g+p*w,a[4]=o*y+u*E+p*S,a[7]=o*m+u*A+p*R,a[2]=h*f+d*g+_*w,a[5]=h*y+d*E+_*S,a[8]=h*m+d*A+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],c=e[5],l=e[6],o=e[7],u=e[8];return t*s*u-t*c*o-n*a*u+n*c*l+r*a*o-r*s*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],c=e[5],l=e[6],o=e[7],u=e[8],p=u*s-c*o,h=c*l-u*a,d=o*a-s*l,_=t*p+n*h+r*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const f=1/_;return e[0]=p*f,e[1]=(r*o-u*n)*f,e[2]=(c*n-r*s)*f,e[3]=h*f,e[4]=(u*t-r*l)*f,e[5]=(r*a-c*t)*f,e[6]=d*f,e[7]=(n*l-o*t)*f,e[8]=(s*t-n*a)*f,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,s,c){const l=Math.cos(a),o=Math.sin(a);return this.set(n*l,n*o,-n*(l*s+o*c)+s+e,-r*o,r*l,-r*(-o*s+l*c)+c+t,0,0,1),this}scale(e,t){return Xn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Nr.makeScale(e,t)),this}rotate(e){return Xn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Nr.makeRotation(-e)),this}translate(e,t){return Xn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Nr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},vi.prototype.isMatrix3=!0,vi);const Nr=new Ue,$a=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ka=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $o(){const i={enabled:!0,workingColorSpace:ki,spaces:{},convert:function(r,a,s){return this.enabled!==!1&&a!==s&&a&&s&&(this.spaces[a].transfer===Ye&&(r.r=sn(r.r),r.g=sn(r.g),r.b=sn(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Ye&&(r.r=jn(r.r),r.g=jn(r.g),r.b=jn(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?Wi:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return Xn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return Xn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ki]:{primaries:e,whitePoint:n,transfer:Wi,toXYZ:$a,fromXYZ:Ka,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:e,whitePoint:n,transfer:Ye,toXYZ:$a,fromXYZ:Ka,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}}),i}const Ve=$o();function sn(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function jn(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}let Yn,Ko=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Yn===void 0&&(Yn=Xi("canvas")),Yn.width=e.width,Yn.height=e.height;const r=Yn.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Yn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=255*sn(a[s]/255);return n.putImageData(r,0,0),t}if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*sn(t[n]/255)):t[n]=sn(t[n]);return{data:t,width:e.width,height:e.height}}return Te("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Zo=0,Or=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zo++}),this.uuid=bi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,c=r.length;s<c;s++)r[s].isDataTexture?a.push(Fr(r[s].image)):a.push(Fr(r[s]))}else a=Fr(r);n.url=a}return t||(e.images[this.uuid]=n),n}};function Fr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ko.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Te("Texture: Unable to serialize Texture."),{})}let Jo=0;const Br=new U;let Bt=class Cr extends Ln{constructor(e=Cr.DEFAULT_IMAGE,t=Cr.DEFAULT_MAPPING,n=1001,r=1001,a=1006,s=1008,c=1023,l=1009,o=Cr.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jo++}),this.uuid=bi(),this.name="",this.source=new Or(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=o,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Br).x}get height(){return this.source.getSize(Br).y}get depth(){return this.source.getSize(Br).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Te(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:Te(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Bt.DEFAULT_IMAGE=null,Bt.DEFAULT_MAPPING=300,Bt.DEFAULT_ANISOTROPY=1;let at=(xi=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const l=e.elements,o=l[0],u=l[4],p=l[8],h=l[1],d=l[5],_=l[9],f=l[2],y=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(p-f)<.01&&Math.abs(_-y)<.01){if(Math.abs(u+h)<.1&&Math.abs(p+f)<.1&&Math.abs(_+y)<.1&&Math.abs(o+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(o+1)/2,A=(d+1)/2,w=(m+1)/2,S=(u+h)/4,R=(p+f)/4,F=(_+y)/4;return E>A&&E>w?E<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(E),r=S/n,a=R/n):A>w?A<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(A),n=S/r,a=F/r):w<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(w),n=R/a,r=F/a),this.set(n,r,a,t),this}let g=Math.sqrt((y-_)*(y-_)+(p-f)*(p-f)+(h-u)*(h-u));return Math.abs(g)<.001&&(g=1),this.x=(y-_)/g,this.y=(p-f)/g,this.z=(h-u)/g,this.w=Math.acos((o+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this.w=ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this.w=ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},xi.prototype.isVector4=!0,xi),Qo=class extends Ln{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},a=new Bt(r),s=n.count;for(let c=0;c<s;c++)this.textures[c]=a.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Or(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yt=class extends Qo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Za=class extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},el=class extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Fe=(Vn=class{constructor(e,t,n,r,a,s,c,l,o,u,p,h,d,_,f,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,c,l,o,u,p,h,d,_,f,y)}set(e,t,n,r,a,s,c,l,o,u,p,h,d,_,f,y){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=a,m[5]=s,m[9]=c,m[13]=l,m[2]=o,m[6]=u,m[10]=p,m[14]=h,m[3]=d,m[7]=_,m[11]=f,m[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vn().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/$n.setFromMatrixColumn(e,0).length(),a=1/$n.setFromMatrixColumn(e,1).length(),s=1/$n.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,s=Math.cos(n),c=Math.sin(n),l=Math.cos(r),o=Math.sin(r),u=Math.cos(a),p=Math.sin(a);if(e.order==="XYZ"){const h=s*u,d=s*p,_=c*u,f=c*p;t[0]=l*u,t[4]=-l*p,t[8]=o,t[1]=d+_*o,t[5]=h-f*o,t[9]=-c*l,t[2]=f-h*o,t[6]=_+d*o,t[10]=s*l}else if(e.order==="YXZ"){const h=l*u,d=l*p,_=o*u,f=o*p;t[0]=h+f*c,t[4]=_*c-d,t[8]=s*o,t[1]=s*p,t[5]=s*u,t[9]=-c,t[2]=d*c-_,t[6]=f+h*c,t[10]=s*l}else if(e.order==="ZXY"){const h=l*u,d=l*p,_=o*u,f=o*p;t[0]=h-f*c,t[4]=-s*p,t[8]=_+d*c,t[1]=d+_*c,t[5]=s*u,t[9]=f-h*c,t[2]=-s*o,t[6]=c,t[10]=s*l}else if(e.order==="ZYX"){const h=s*u,d=s*p,_=c*u,f=c*p;t[0]=l*u,t[4]=_*o-d,t[8]=h*o+f,t[1]=l*p,t[5]=f*o+h,t[9]=d*o-_,t[2]=-o,t[6]=c*l,t[10]=s*l}else if(e.order==="YZX"){const h=s*l,d=s*o,_=c*l,f=c*o;t[0]=l*u,t[4]=f-h*p,t[8]=_*p+d,t[1]=p,t[5]=s*u,t[9]=-c*u,t[2]=-o*u,t[6]=d*p+_,t[10]=h-f*p}else if(e.order==="XZY"){const h=s*l,d=s*o,_=c*l,f=c*o;t[0]=l*u,t[4]=-p,t[8]=o*u,t[1]=h*p+f,t[5]=s*u,t[9]=d*p-_,t[2]=_*p-d,t[6]=c*u,t[10]=f*p+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tl,e,nl)}lookAt(e,t,n){const r=this.elements;return Ct.subVectors(e,t),Ct.lengthSq()===0&&(Ct.z=1),Ct.normalize(),xn.crossVectors(n,Ct),xn.lengthSq()===0&&(Math.abs(n.z)===1?Ct.x+=1e-4:Ct.z+=1e-4,Ct.normalize(),xn.crossVectors(n,Ct)),xn.normalize(),qi.crossVectors(Ct,xn),r[0]=xn.x,r[4]=qi.x,r[8]=Ct.x,r[1]=xn.y,r[5]=qi.y,r[9]=Ct.y,r[2]=xn.z,r[6]=qi.z,r[10]=Ct.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],c=n[4],l=n[8],o=n[12],u=n[1],p=n[5],h=n[9],d=n[13],_=n[2],f=n[6],y=n[10],m=n[14],g=n[3],E=n[7],A=n[11],w=n[15],S=r[0],R=r[4],F=r[8],P=r[12],L=r[1],k=r[5],D=r[9],Y=r[13],W=r[2],z=r[6],$=r[10],H=r[14],ne=r[3],de=r[7],Le=r[11],Me=r[15];return a[0]=s*S+c*L+l*W+o*ne,a[4]=s*R+c*k+l*z+o*de,a[8]=s*F+c*D+l*$+o*Le,a[12]=s*P+c*Y+l*H+o*Me,a[1]=u*S+p*L+h*W+d*ne,a[5]=u*R+p*k+h*z+d*de,a[9]=u*F+p*D+h*$+d*Le,a[13]=u*P+p*Y+h*H+d*Me,a[2]=_*S+f*L+y*W+m*ne,a[6]=_*R+f*k+y*z+m*de,a[10]=_*F+f*D+y*$+m*Le,a[14]=_*P+f*Y+y*H+m*Me,a[3]=g*S+E*L+A*W+w*ne,a[7]=g*R+E*k+A*z+w*de,a[11]=g*F+E*D+A*$+w*Le,a[15]=g*P+E*Y+A*H+w*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],s=e[1],c=e[5],l=e[9],o=e[13],u=e[2],p=e[6],h=e[10],d=e[14],_=e[3],f=e[7],y=e[11],m=e[15],g=l*d-o*h,E=c*d-o*p,A=c*h-l*p,w=s*d-o*u,S=s*h-l*u,R=s*p-c*u;return t*(f*g-y*E+m*A)-n*(_*g-y*w+m*S)+r*(_*E-f*w+m*R)-a*(_*A-f*S+y*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[1],s=e[5],c=e[9],l=e[2],o=e[6],u=e[10];return t*(s*u-c*o)-n*(a*u-c*l)+r*(a*o-s*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],c=e[5],l=e[6],o=e[7],u=e[8],p=e[9],h=e[10],d=e[11],_=e[12],f=e[13],y=e[14],m=e[15],g=t*c-n*s,E=t*l-r*s,A=t*o-a*s,w=n*l-r*c,S=n*o-a*c,R=r*o-a*l,F=u*f-p*_,P=u*y-h*_,L=u*m-d*_,k=p*y-h*f,D=p*m-d*f,Y=h*m-d*y,W=g*Y-E*D+A*k+w*L-S*P+R*F;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/W;return e[0]=(c*Y-l*D+o*k)*z,e[1]=(r*D-n*Y-a*k)*z,e[2]=(f*R-y*S+m*w)*z,e[3]=(h*S-p*R-d*w)*z,e[4]=(l*L-s*Y-o*P)*z,e[5]=(t*Y-r*L+a*P)*z,e[6]=(y*A-_*R-m*E)*z,e[7]=(u*R-h*A+d*E)*z,e[8]=(s*D-c*L+o*F)*z,e[9]=(n*L-t*D-a*F)*z,e[10]=(_*S-f*A+m*g)*z,e[11]=(p*A-u*S-d*g)*z,e[12]=(c*P-s*k-l*F)*z,e[13]=(t*k-n*P+r*F)*z,e[14]=(f*E-_*w-y*g)*z,e[15]=(u*w-p*E+h*g)*z,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,s=e.x,c=e.y,l=e.z,o=a*s,u=a*c;return this.set(o*s+n,o*c-r*l,o*l+r*c,0,o*c+r*l,u*c+n,u*l-r*s,0,o*l-r*c,u*l+r*s,a*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,s){return this.set(1,n,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,s=t._y,c=t._z,l=t._w,o=a+a,u=s+s,p=c+c,h=a*o,d=a*u,_=a*p,f=s*u,y=s*p,m=c*p,g=l*o,E=l*u,A=l*p,w=n.x,S=n.y,R=n.z;return r[0]=(1-(f+m))*w,r[1]=(d+A)*w,r[2]=(_-E)*w,r[3]=0,r[4]=(d-A)*S,r[5]=(1-(h+m))*S,r[6]=(y+g)*S,r[7]=0,r[8]=(_+E)*R,r[9]=(y-g)*R,r[10]=(1-(h+f))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return n.set(1,1,1),t.identity(),this;let s=$n.set(r[0],r[1],r[2]).length();const c=$n.set(r[4],r[5],r[6]).length(),l=$n.set(r[8],r[9],r[10]).length();a<0&&(s=-s),zt.copy(this);const o=1/s,u=1/c,p=1/l;return zt.elements[0]*=o,zt.elements[1]*=o,zt.elements[2]*=o,zt.elements[4]*=u,zt.elements[5]*=u,zt.elements[6]*=u,zt.elements[8]*=p,zt.elements[9]*=p,zt.elements[10]*=p,t.setFromRotationMatrix(zt),n.x=s,n.y=c,n.z=l,this}makePerspective(e,t,n,r,a,s,c=2e3,l=!1){const o=this.elements,u=2*a/(t-e),p=2*a/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r);let _,f;if(l)_=a/(s-a),f=s*a/(s-a);else if(c===2e3)_=-(s+a)/(s-a),f=-2*s*a/(s-a);else{if(c!==2001)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);_=-s/(s-a),f=-s*a/(s-a)}return o[0]=u,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=p,o[9]=d,o[13]=0,o[2]=0,o[6]=0,o[10]=_,o[14]=f,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,r,a,s,c=2e3,l=!1){const o=this.elements,u=2/(t-e),p=2/(n-r),h=-(t+e)/(t-e),d=-(n+r)/(n-r);let _,f;if(l)_=1/(s-a),f=s/(s-a);else if(c===2e3)_=-2/(s-a),f=-(s+a)/(s-a);else{if(c!==2001)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);_=-1/(s-a),f=-a/(s-a)}return o[0]=u,o[4]=0,o[8]=0,o[12]=h,o[1]=0,o[5]=p,o[9]=0,o[13]=d,o[2]=0,o[6]=0,o[10]=_,o[14]=f,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Vn.prototype.isMatrix4=!0,Vn);const $n=new U,zt=new Fe,tl=new U(0,0,0),nl=new U(1,1,1),xn=new U,qi=new U,Ct=new U,Ja=new Fe,Qa=new qn;let Kn=class Go{constructor(e=0,t=0,n=0,r=Go.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],s=r[4],c=r[8],l=r[1],o=r[5],u=r[9],p=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(h,o),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(l,o)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-s,o)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-ze(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-s,o));break;case"YZX":this._z=Math.asin(ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,o),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-ze(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,o),this._y=Math.atan2(c,a)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Te("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ja.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ja,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qa.setFromEuler(this),this.setFromQuaternion(Qa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Kn.DEFAULT_ORDER="XYZ";let zr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},il=0;const es=new U,Zn=new qn,on=new Fe,ji=new U,Ai=new U,rl=new U,al=new qn,ts=new U(1,0,0),ns=new U(0,1,0),is=new U(0,0,1),rs={type:"added"},sl={type:"removed"},Jn={type:"childadded",child:null},Hr={type:"childremoved",child:null};let Pt=class Pr extends Ln{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:il++}),this.uuid=bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pr.DEFAULT_UP.clone();const e=new U,t=new Kn,n=new qn,r=new U(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Fe},normalMatrix:{value:new Ue}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=Pr.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zn.setFromAxisAngle(e,t),this.quaternion.multiply(Zn),this}rotateOnWorldAxis(e,t){return Zn.setFromAxisAngle(e,t),this.quaternion.premultiply(Zn),this}rotateX(e){return this.rotateOnAxis(ts,e)}rotateY(e){return this.rotateOnAxis(ns,e)}rotateZ(e){return this.rotateOnAxis(is,e)}translateOnAxis(e,t){return es.copy(e).applyQuaternion(this.quaternion),this.position.add(es.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ts,e)}translateY(e){return this.translateOnAxis(ns,e)}translateZ(e){return this.translateOnAxis(is,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(on.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ji.copy(e):ji.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ai.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?on.lookAt(Ai,ji,this.up):on.lookAt(ji,Ai,this.up),this.quaternion.setFromRotationMatrix(on),r&&(on.extractRotation(r.matrixWorld),Zn.setFromRotationMatrix(on),this.quaternion.premultiply(Zn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rs),Jn.child=e,this.dispatchEvent(Jn),Jn.child=null):ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sl),Hr.child=e,this.dispatchEvent(Hr),Hr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),on.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),on.multiply(e.parent.matrixWorld)),e.applyMatrix4(on),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rs),Jn.child=e,this.dispatchEvent(Jn),Jn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,e,rl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,al,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*n-a[8]*r,a[13]+=n-a[1]*t-a[5]*n-a[9]*r,a[14]+=r-a[2]*t-a[6]*n-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const a=this.children;for(let s=0,c=a.length;s<c;s++)a[s].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};function a(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(c=>({...c})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let o=0,u=l.length;o<u;o++){const p=l[o];a(e.shapes,p)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,o=this.material.length;l<o;l++)c.push(a(e.materials,this.material[l]));r.material=c}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];r.animations.push(a(e.animations,l))}}if(t){const c=s(e.geometries),l=s(e.materials),o=s(e.textures),u=s(e.images),p=s(e.shapes),h=s(e.skeletons),d=s(e.animations),_=s(e.nodes);c.length>0&&(n.geometries=c),l.length>0&&(n.materials=l),o.length>0&&(n.textures=o),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=r,n;function s(c){const l=[];for(const o in c){const u=c[o];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}};Pt.DEFAULT_UP=new U(0,1,0),Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;let _t=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const ol={type:"move"};let Vr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,s=null;const c=this._targetRay,l=this._grip,o=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(o&&e.hand){s=!0;for(const f of e.hand.values()){const y=t.getJointPose(f,n),m=this._getHandJoint(o,f);y!==null&&(m.matrix.fromArray(y.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=y.radius),m.visible=y!==null}const u=o.joints["index-finger-tip"],p=o.joints["thumb-tip"],h=u.position.distanceTo(p.position),d=.02,_=.005;o.inputState.pinching&&h>d+_?(o.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!o.inputState.pinching&&h<=d-_&&(o.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(ol)))}return c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),o!==null&&(o.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};const as={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},Yi={h:0,s:0,l:0};function Gr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}let be=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Ve.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ve.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ve.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ve.workingColorSpace){if(e=Yo(e,1),t=ze(t,0,1),n=ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,s=2*n-a;this.r=Gr(s,a,e+1/3),this.g=Gr(s,a,e),this.b=Gr(s,a,e-1/3)}return Ve.colorSpaceToWorking(this,r),this}setStyle(e,t=Rt){function n(a){a!==void 0&&parseFloat(a)<1&&Te("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],c=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Te("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);Te("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const n=as[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Te("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=sn(e.r),this.g=sn(e.g),this.b=sn(e.b),this}copyLinearToSRGB(e){return this.r=jn(e.r),this.g=jn(e.g),this.b=jn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return Ve.workingToColorSpace(yt.copy(this),e),65536*Math.round(ze(255*yt.r,0,255))+256*Math.round(ze(255*yt.g,0,255))+Math.round(ze(255*yt.b,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ve.workingColorSpace){Ve.workingToColorSpace(yt.copy(this),t);const n=yt.r,r=yt.g,a=yt.b,s=Math.max(n,r,a),c=Math.min(n,r,a);let l,o;const u=(c+s)/2;if(c===s)l=0,o=0;else{const p=s-c;switch(o=u<=.5?p/(s+c):p/(2-s-c),s){case n:l=(r-a)/p+(r<a?6:0);break;case r:l=(a-n)/p+2;break;case a:l=(n-r)/p+4}l/=6}return e.h=l,e.s=o,e.l=u,e}getRGB(e,t=Ve.workingColorSpace){return Ve.workingToColorSpace(yt.copy(this),t),e.r=yt.r,e.g=yt.g,e.b=yt.b,e}getStyle(e=Rt){Ve.workingToColorSpace(yt.copy(this),e);const t=yt.r,n=yt.g,r=yt.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(Mn),this.setHSL(Mn.h+e,Mn.s+t,Mn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mn),e.getHSL(Yi);const n=Ir(Mn.h,Yi.h,t),r=Ir(Mn.s,Yi.s,t),a=Ir(Mn.l,Yi.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const yt=new be;be.NAMES=as;let ll=class ko{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new be(e),this.density=t}clone(){return new ko(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},cl=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};const Ht=new U,ln=new U,kr=new U,cn=new U,Qn=new U,ei=new U,ss=new U,Wr=new U,Xr=new U,qr=new U,jr=new at,Yr=new at,$r=new at;let Ri=class Ti{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ht.subVectors(e,t),r.cross(Ht);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){Ht.subVectors(r,t),ln.subVectors(n,t),kr.subVectors(e,t);const s=Ht.dot(Ht),c=Ht.dot(ln),l=Ht.dot(kr),o=ln.dot(ln),u=ln.dot(kr),p=s*o-c*c;if(p===0)return a.set(0,0,0),null;const h=1/p,d=(o*l-c*u)*h,_=(s*u-c*l)*h;return a.set(1-d-_,_,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,cn)!==null&&cn.x>=0&&cn.y>=0&&cn.x+cn.y<=1}static getInterpolation(e,t,n,r,a,s,c,l){return this.getBarycoord(e,t,n,r,cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,cn.x),l.addScaledVector(s,cn.y),l.addScaledVector(c,cn.z),l)}static getInterpolatedAttribute(e,t,n,r,a,s){return jr.setScalar(0),Yr.setScalar(0),$r.setScalar(0),jr.fromBufferAttribute(e,t),Yr.fromBufferAttribute(e,n),$r.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(jr,a.x),s.addScaledVector(Yr,a.y),s.addScaledVector($r,a.z),s}static isFrontFacing(e,t,n,r){return Ht.subVectors(n,t),ln.subVectors(e,t),Ht.cross(ln).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ht.subVectors(this.c,this.b),ln.subVectors(this.a,this.b),.5*Ht.cross(ln).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ti.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ti.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return Ti.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return Ti.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ti.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let s,c;Qn.subVectors(r,n),ei.subVectors(a,n),Wr.subVectors(e,n);const l=Qn.dot(Wr),o=ei.dot(Wr);if(l<=0&&o<=0)return t.copy(n);Xr.subVectors(e,r);const u=Qn.dot(Xr),p=ei.dot(Xr);if(u>=0&&p<=u)return t.copy(r);const h=l*p-u*o;if(h<=0&&l>=0&&u<=0)return s=l/(l-u),t.copy(n).addScaledVector(Qn,s);qr.subVectors(e,a);const d=Qn.dot(qr),_=ei.dot(qr);if(_>=0&&d<=_)return t.copy(a);const f=d*o-l*_;if(f<=0&&o>=0&&_<=0)return c=o/(o-_),t.copy(n).addScaledVector(ei,c);const y=u*_-d*p;if(y<=0&&p-u>=0&&d-_>=0)return ss.subVectors(a,r),c=(p-u)/(p-u+(d-_)),t.copy(r).addScaledVector(ss,c);const m=1/(y+f+h);return s=f*m,c=h*m,t.copy(n).addScaledVector(Qn,s).addScaledVector(ei,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ci=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Vt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,c=a.count;s<c;s++)e.isMesh===!0?e.getVertexPosition(s,Vt):Vt.fromBufferAttribute(a,s),Vt.applyMatrix4(e.matrixWorld),this.expandByPoint(Vt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$i.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$i.copy(n.boundingBox)),$i.applyMatrix4(e.matrixWorld),this.union($i)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vt),Vt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pi),Ki.subVectors(this.max,Pi),ti.subVectors(e.a,Pi),ni.subVectors(e.b,Pi),ii.subVectors(e.c,Pi),Sn.subVectors(ni,ti),yn.subVectors(ii,ni),Un.subVectors(ti,ii);let t=[0,-Sn.z,Sn.y,0,-yn.z,yn.y,0,-Un.z,Un.y,Sn.z,0,-Sn.x,yn.z,0,-yn.x,Un.z,0,-Un.x,-Sn.y,Sn.x,0,-yn.y,yn.x,0,-Un.y,Un.x,0];return!!Kr(t,ti,ni,ii,Ki)&&(t=[1,0,0,0,1,0,0,0,1],!!Kr(t,ti,ni,ii,Ki)&&(Zi.crossVectors(Sn,yn),t=[Zi.x,Zi.y,Zi.z],Kr(t,ti,ni,ii,Ki)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Vt).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(un)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}};const un=[new U,new U,new U,new U,new U,new U,new U,new U],Vt=new U,$i=new Ci,ti=new U,ni=new U,ii=new U,Sn=new U,yn=new U,Un=new U,Pi=new U,Ki=new U,Zi=new U,In=new U;function Kr(i,e,t,n,r){for(let a=0,s=i.length-3;a<=s;a+=3){In.fromArray(i,a);const c=r.x*Math.abs(In.x)+r.y*Math.abs(In.y)+r.z*Math.abs(In.z),l=e.dot(In),o=t.dot(In),u=n.dot(In);if(Math.max(-Math.max(l,o,u),Math.min(l,o,u))>c)return!1}return!0}ul();function ul(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){const o=l-127;o<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):o<-14?(n[l]=1024>>-o-14,n[256|l]=1024>>-o-14|32768,r[l]=-o-1,r[256|l]=-o-1):o<=15?(n[l]=o+15<<10,n[256|l]=o+15<<10|32768,r[l]=13,r[256|l]=13):o<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}const a=new Uint32Array(2048),s=new Uint32Array(64),c=new Uint32Array(64);for(let l=1;l<1024;++l){let o=l<<13,u=0;for(;!(8388608&o);)o<<=1,u-=8388608;o&=-8388609,u+=947912704,a[l]=o|u}for(let l=1024;l<2048;++l)a[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)s[l]=l<<23;s[31]=1199570944,s[32]=2147483648;for(let l=33;l<63;++l)s[l]=2147483648+(l-32<<23);s[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(c[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:a,exponentTable:s,offsetTable:c}}const lt=new U,Ji=new Ne;let hl=0;class $t extends Ln{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hl++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ji.fromBufferAttribute(this,t),Ji.applyMatrix3(e),this.setXY(t,Ji.x,Ji.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix3(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix4(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyNormalMatrix(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.transformDirection(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),r=wt(r,this.array),a=wt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}let os=class extends $t{constructor(e,t,n){super(new Uint16Array(e),t,n)}};class ls extends $t{constructor(e,t,n){super(new Uint32Array(e),t,n)}}let Ke=class extends $t{constructor(e,t,n){super(new Float32Array(e),t,n)}};const dl=new Ci,Li=new U,Zr=new U;class Jr{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):dl.setFromPoints(e).getCenter(n);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Li.subVectors(e,this.center);const t=Li.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(Li,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Li.copy(e.center).add(Zr)),this.expandByPoint(Li.copy(e.center).sub(Zr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let pl=0;const Dt=new Fe,Qr=new Pt,ri=new U,Lt=new Ci,Ui=new Ci,gt=new U;let Ut=class Wo extends Ln{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pl++}),this.uuid=bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new((function(t){for(let n=t.length-1;n>=0;--n)if(t[n]>=65535)return!0;return!1})(e)?ls:os)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ue().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Dt.makeRotationFromQuaternion(e),this.applyMatrix4(Dt),this}rotateX(e){return Dt.makeRotationX(e),this.applyMatrix4(Dt),this}rotateY(e){return Dt.makeRotationY(e),this.applyMatrix4(Dt),this}rotateZ(e){return Dt.makeRotationZ(e),this.applyMatrix4(Dt),this}translate(e,t,n){return Dt.makeTranslation(e,t,n),this.applyMatrix4(Dt),this}scale(e,t,n){return Dt.makeScale(e,t,n),this.applyMatrix4(Dt),this}lookAt(e){return Qr.lookAt(e),Qr.updateMatrix(),this.applyMatrix4(Qr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ri).negate(),this.translate(ri.x,ri.y,ri.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ke(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Te("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];Lt.setFromBufferAttribute(a),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Lt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Lt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Lt.min),this.boundingBox.expandByPoint(Lt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new U,1/0);if(e){const n=this.boundingSphere.center;if(Lt.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const c=t[a];Ui.setFromBufferAttribute(c),this.morphTargetsRelative?(gt.addVectors(Lt.min,Ui.min),Lt.expandByPoint(gt),gt.addVectors(Lt.max,Ui.max),Lt.expandByPoint(gt)):(Lt.expandByPoint(Ui.min),Lt.expandByPoint(Ui.max))}Lt.getCenter(n);let r=0;for(let a=0,s=e.count;a<s;a++)gt.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(gt));if(t)for(let a=0,s=t.length;a<s;a++){const c=t[a],l=this.morphTargetsRelative;for(let o=0,u=c.count;o<u;o++)gt.fromBufferAttribute(c,o),l&&(ri.fromBufferAttribute(e,o),gt.add(ri)),r=Math.max(r,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");const n=t.position,r=t.normal,a=t.uv;let s=this.getAttribute("tangent");s!==void 0&&s.count===n.count||(s=new $t(new Float32Array(4*n.count),4),this.setAttribute("tangent",s));const c=[],l=[];for(let F=0;F<n.count;F++)c[F]=new U,l[F]=new U;const o=new U,u=new U,p=new U,h=new Ne,d=new Ne,_=new Ne,f=new U,y=new U;function m(F,P,L){o.fromBufferAttribute(n,F),u.fromBufferAttribute(n,P),p.fromBufferAttribute(n,L),h.fromBufferAttribute(a,F),d.fromBufferAttribute(a,P),_.fromBufferAttribute(a,L),u.sub(o),p.sub(o),d.sub(h),_.sub(h);const k=1/(d.x*_.y-_.x*d.y);isFinite(k)&&(f.copy(u).multiplyScalar(_.y).addScaledVector(p,-d.y).multiplyScalar(k),y.copy(p).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(k),c[F].add(f),c[P].add(f),c[L].add(f),l[F].add(y),l[P].add(y),l[L].add(y))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let F=0,P=g.length;F<P;++F){const L=g[F],k=L.start;for(let D=k,Y=k+L.count;D<Y;D+=3)m(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const E=new U,A=new U,w=new U,S=new U;function R(F){w.fromBufferAttribute(r,F),S.copy(w);const P=c[F];E.copy(P),E.sub(w.multiplyScalar(w.dot(P))).normalize(),A.crossVectors(S,P);const L=A.dot(l[F])<0?-1:1;s.setXYZW(F,E.x,E.y,E.z,L)}for(let F=0,P=g.length;F<P;++F){const L=g[F],k=L.start;for(let D=k,Y=k+L.count;D<Y;D+=3)R(e.getX(D+0)),R(e.getX(D+1)),R(e.getX(D+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new $t(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const r=new U,a=new U,s=new U,c=new U,l=new U,o=new U,u=new U,p=new U;if(e)for(let h=0,d=e.count;h<d;h+=3){const _=e.getX(h+0),f=e.getX(h+1),y=e.getX(h+2);r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,f),s.fromBufferAttribute(t,y),u.subVectors(s,a),p.subVectors(r,a),u.cross(p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,f),o.fromBufferAttribute(n,y),c.add(u),l.add(u),o.add(u),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z),n.setXYZ(y,o.x,o.y,o.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,a),p.subVectors(r,a),u.cross(p),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(c,l){const o=c.array,u=c.itemSize,p=c.normalized,h=new o.constructor(l.length*u);let d=0,_=0;for(let f=0,y=l.length;f<y;f++){d=c.isInterleavedBufferAttribute?l[f]*c.data.stride+c.offset:l[f]*u;for(let m=0;m<u;m++)h[_++]=o[d++]}return new $t(h,u,p)}if(this.index===null)return Te("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Wo,n=this.index.array,r=this.attributes;for(const c in r){const l=e(r[c],n);t.setAttribute(c,l)}const a=this.morphAttributes;for(const c in a){const l=[],o=a[c];for(let u=0,p=o.length;u<p;u++){const h=e(o[u],n);l.push(h)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let c=0,l=s.length;c<l;c++){const o=s[c];t.addGroup(o.start,o.count,o.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const o in l)l[o]!==void 0&&(e[o]=l[o]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const o=n[l];e.data.attributes[l]=o.toJSON(e.data)}const r={};let a=!1;for(const l in this.morphAttributes){const o=this.morphAttributes[l],u=[];for(let p=0,h=o.length;p<h;p++){const d=o[p];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const o in r){const u=r[o];this.setAttribute(o,u.clone(t))}const a=e.morphAttributes;for(const o in a){const u=[],p=a[o];for(let h=0,d=p.length;h<d;h++)u.push(p[h].clone(t));this.morphAttributes[o]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let o=0,u=s.length;o<u;o++){const p=s[o];this.addGroup(p.start,p.count,p.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},fl=0,Ii=class extends Ln{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fl++}),this.uuid=bi(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Te(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:Te(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(a){const s=[];for(const c in a){const l=a[c];delete l.metadata,s.push(l)}return s}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){const a=r(e.textures),s=r(e.images);a.length>0&&(n.textures=a),s.length>0&&(n.images=s)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ne().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ne().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};new Fe;const hn=new U,ea=new U,Qi=new U,En=new U,ta=new U,er=new U,na=new U;class cs{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hn.copy(this.origin).addScaledVector(this.direction,t),hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ea.copy(e).add(t).multiplyScalar(.5),Qi.copy(t).sub(e).normalize(),En.copy(this.origin).sub(ea);const a=.5*e.distanceTo(t),s=-this.direction.dot(Qi),c=En.dot(this.direction),l=-En.dot(Qi),o=En.lengthSq(),u=Math.abs(1-s*s);let p,h,d,_;if(u>0)if(p=s*l-c,h=s*c-l,_=a*u,p>=0)if(h>=-_)if(h<=_){const f=1/u;p*=f,h*=f,d=p*(p+s*h+2*c)+h*(s*p+h+2*l)+o}else h=a,p=Math.max(0,-(s*h+c)),d=-p*p+h*(h+2*l)+o;else h=-a,p=Math.max(0,-(s*h+c)),d=-p*p+h*(h+2*l)+o;else h<=-_?(p=Math.max(0,-(-s*a+c)),h=p>0?-a:Math.min(Math.max(-a,-l),a),d=-p*p+h*(h+2*l)+o):h<=_?(p=0,h=Math.min(Math.max(-a,-l),a),d=h*(h+2*l)+o):(p=Math.max(0,-(s*a+c)),h=p>0?a:Math.min(Math.max(-a,-l),a),d=-p*p+h*(h+2*l)+o);else h=s>0?-a:a,p=Math.max(0,-(s*h+c)),d=-p*p+h*(h+2*l)+o;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(ea).addScaledVector(Qi,h),d}intersectSphere(e,t){hn.subVectors(e.center,this.origin);const n=hn.dot(this.direction),r=hn.dot(hn)-n*n,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),c=n-s,l=n+s;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,s,c,l;const o=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,h=this.origin;return o>=0?(n=(e.min.x-h.x)*o,r=(e.max.x-h.x)*o):(n=(e.max.x-h.x)*o,r=(e.min.x-h.x)*o),u>=0?(a=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),n>s||a>r?null:((a>n||isNaN(n))&&(n=a),(s<r||isNaN(r))&&(r=s),p>=0?(c=(e.min.z-h.z)*p,l=(e.max.z-h.z)*p):(c=(e.max.z-h.z)*p,l=(e.min.z-h.z)*p),n>l||c>r?null:((c>n||n!=n)&&(n=c),(l<r||r!=r)&&(r=l),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,hn)!==null}intersectTriangle(e,t,n,r,a){ta.subVectors(t,e),er.subVectors(n,e),na.crossVectors(ta,er);let s,c=this.direction.dot(na);if(c>0){if(r)return null;s=1}else{if(!(c<0))return null;s=-1,c=-c}En.subVectors(this.origin,e);const l=s*this.direction.dot(er.crossVectors(En,er));if(l<0)return null;const o=s*this.direction.dot(ta.cross(En));if(o<0||l+o>c)return null;const u=-s*En.dot(na);return u<0?null:this.at(u/c,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}let Kt=class extends Ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};const us=new Fe,Dn=new cs,tr=new Jr,hs=new U,nr=new U,ir=new U,rr=new U,ia=new U,ar=new U,ds=new U,sr=new U;let Nt=class extends Pt{constructor(e=new Ut,t=new Kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const s=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=r}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const c=this.morphTargetInfluences;if(a&&c){ar.set(0,0,0);for(let l=0,o=a.length;l<o;l++){const u=c[l],p=a[l];u!==0&&(ia.fromBufferAttribute(p,e),s?ar.addScaledVector(ia,u):ar.addScaledVector(ia.sub(t),u))}t.add(ar)}return t}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(a),Dn.copy(e.ray).recast(e.near),tr.containsPoint(Dn.origin)===!1&&(Dn.intersectSphere(tr,hs)===null||Dn.origin.distanceToSquared(hs)>(e.far-e.near)**2))return;us.copy(a).invert(),Dn.copy(e.ray).applyMatrix4(us),n.boundingBox!==null&&Dn.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Dn)}}_computeIntersections(e,t,n){let r;const a=this.geometry,s=this.material,c=a.index,l=a.attributes.position,o=a.attributes.uv,u=a.attributes.uv1,p=a.attributes.normal,h=a.groups,d=a.drawRange;if(c!==null)if(Array.isArray(s))for(let _=0,f=h.length;_<f;_++){const y=h[_],m=s[y.materialIndex];for(let g=Math.max(y.start,d.start),E=Math.min(c.count,Math.min(y.start+y.count,d.start+d.count));g<E;g+=3)r=or(this,m,e,n,o,u,p,c.getX(g),c.getX(g+1),c.getX(g+2)),r&&(r.faceIndex=Math.floor(g/3),r.face.materialIndex=y.materialIndex,t.push(r))}else for(let _=Math.max(0,d.start),f=Math.min(c.count,d.start+d.count);_<f;_+=3)r=or(this,s,e,n,o,u,p,c.getX(_),c.getX(_+1),c.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),t.push(r));else if(l!==void 0)if(Array.isArray(s))for(let _=0,f=h.length;_<f;_++){const y=h[_],m=s[y.materialIndex];for(let g=Math.max(y.start,d.start),E=Math.min(l.count,Math.min(y.start+y.count,d.start+d.count));g<E;g+=3)r=or(this,m,e,n,o,u,p,g,g+1,g+2),r&&(r.faceIndex=Math.floor(g/3),r.face.materialIndex=y.materialIndex,t.push(r))}else for(let _=Math.max(0,d.start),f=Math.min(l.count,d.start+d.count);_<f;_+=3)r=or(this,s,e,n,o,u,p,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}};function or(i,e,t,n,r,a,s,c,l,o){i.getVertexPosition(c,nr),i.getVertexPosition(l,ir),i.getVertexPosition(o,rr);const u=(function(p,h,d,_,f,y,m,g){let E;if(E=h.side===1?_.intersectTriangle(m,y,f,!0,g):_.intersectTriangle(f,y,m,h.side===0,g),E===null)return null;sr.copy(g),sr.applyMatrix4(p.matrixWorld);const A=d.ray.origin.distanceTo(sr);return A<d.near||A>d.far?null:{distance:A,point:sr.clone(),object:p}})(i,e,t,n,nr,ir,rr,ds);if(u){const p=new U;Ri.getBarycoord(ds,nr,ir,rr,p),r&&(u.uv=Ri.getInterpolatedAttribute(r,c,l,o,p,new Ne)),a&&(u.uv1=Ri.getInterpolatedAttribute(a,c,l,o,p,new Ne)),s&&(u.normal=Ri.getInterpolatedAttribute(s,c,l,o,p,new U),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:c,b:l,c:o,normal:new U,materialIndex:0};Ri.getNormal(nr,ir,rr,h.normal),u.face=h,u.barycoord=p}return u}new Fe,new Fe;class ml extends Bt{constructor(e=null,t=1,n=1,r,a,s,c,l,o=1003,u=1003,p,h){super(null,s,c,l,o,u,r,a,p,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}new Fe,new Fe,new Fe,new Fe,new Fe,new Nt;const ra=new U,gl=new U,_l=new Ue;class Tn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ra.subVectors(n,t).cross(gl.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(ra),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return n===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||_l.getNormalMatrix(e),r=this.coplanarPoint(ra).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nn=new Jr,vl=new Ne(.5,.5),lr=new U;class aa{constructor(e=new Tn,t=new Tn,n=new Tn,r=new Tn,a=new Tn,s=new Tn){this.planes=[e,t,n,r,a,s]}set(e,t,n,r,a,s){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(r),c[4].copy(a),c[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){const r=this.planes,a=e.elements,s=a[0],c=a[1],l=a[2],o=a[3],u=a[4],p=a[5],h=a[6],d=a[7],_=a[8],f=a[9],y=a[10],m=a[11],g=a[12],E=a[13],A=a[14],w=a[15];if(r[0].setComponents(o-s,d-u,m-_,w-g).normalize(),r[1].setComponents(o+s,d+u,m+_,w+g).normalize(),r[2].setComponents(o+c,d+p,m+f,w+E).normalize(),r[3].setComponents(o-c,d-p,m-f,w-E).normalize(),n)r[4].setComponents(l,h,y,A).normalize(),r[5].setComponents(o-l,d-h,m-y,w-A).normalize();else if(r[4].setComponents(o-l,d-h,m-y,w-A).normalize(),t===2e3)r[5].setComponents(o+l,d+h,m+y,w+A).normalize();else{if(t!==2001)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(l,h,y,A).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Nn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nn)}intersectsSprite(e){Nn.center.set(0,0,0);const t=vl.distanceTo(e.center);return Nn.radius=.7071067811865476+t,Nn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(lr.x=r.normal.x>0?e.max.x:e.min.x,lr.y=r.normal.y>0?e.max.y:e.min.y,lr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(lr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}new Fe,new Fe,new be(1,1,1),new Nt,new Fe,new Fe;class ps extends Bt{constructor(e=[],t=301,n,r,a,s,c,l,o,u){super(e,t,n,r,a,s,c,l,o,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ai extends Bt{constructor(e,t,n=1014,r,a,s,c=1003,l=1003,o,u=1026,p=1){if(u!==1026&&u!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:p},r,a,s,c,l,u,n,o),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Or(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xl extends ai{constructor(e,t=1014,n=301,r,a,s=1003,c=1003,l,o=1026){const u={width:e,height:e,depth:1},p=[u,u,u,u,u,u];super(e,e,t,n,r,a,s,c,l,o),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class fs extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Gt extends Ut{constructor(e=1,t=1,n=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:s};const c=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const l=[],o=[],u=[],p=[];let h=0,d=0;function _(f,y,m,g,E,A,w,S,R,F,P){const L=A/R,k=w/F,D=A/2,Y=w/2,W=S/2,z=R+1,$=F+1;let H=0,ne=0;const de=new U;for(let Le=0;Le<$;Le++){const Me=Le*k-Y;for(let ve=0;ve<z;ve++){const te=ve*L-D;de[f]=te*g,de[y]=Me*E,de[m]=W,o.push(de.x,de.y,de.z),de[f]=0,de[y]=0,de[m]=S>0?1:-1,u.push(de.x,de.y,de.z),p.push(ve/R),p.push(1-Le/F),H+=1}}for(let Le=0;Le<F;Le++)for(let Me=0;Me<R;Me++){const ve=h+Me+z*Le,te=h+Me+z*(Le+1),ce=h+(Me+1)+z*(Le+1),se=h+(Me+1)+z*Le;l.push(ve,te,se),l.push(te,ce,se),ne+=6}c.addGroup(d,ne,P),d+=ne,h+=H}_("z","y","x",-1,-1,n,t,e,s,a,0),_("z","y","x",1,-1,n,t,-e,s,a,1),_("x","z","y",1,1,e,n,t,r,s,2),_("x","z","y",1,-1,e,n,-t,r,s,3),_("x","y","z",1,-1,e,t,n,r,a,4),_("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(l),this.setAttribute("position",new Ke(o,3)),this.setAttribute("normal",new Ke(u,3)),this.setAttribute("uv",new Ke(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class si extends Ut{constructor(e=1,t=1,n=4,r=8,a=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:a},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),a=Math.max(1,Math.floor(a));const s=[],c=[],l=[],o=[],u=t/2,p=Math.PI/2*e,h=t,d=2*p+h,_=2*n+a,f=r+1,y=new U,m=new U;for(let g=0;g<=_;g++){let E=0,A=0,w=0,S=0;if(g<=n){const P=g/n,L=P*Math.PI/2;A=-u-e*Math.cos(L),w=e*Math.sin(L),S=-e*Math.cos(L),E=P*p}else if(g<=n+a){const P=(g-n)/a;A=P*t-u,w=e,S=0,E=p+P*h}else{const P=(g-n-a)/n,L=P*Math.PI/2;A=u+e*Math.sin(L),w=e*Math.cos(L),S=e*Math.sin(L),E=p+h+P*p}const R=Math.max(0,Math.min(1,E/d));let F=0;g===0?F=.5/r:g===_&&(F=-.5/r);for(let P=0;P<=r;P++){const L=P/r,k=L*Math.PI*2,D=Math.sin(k),Y=Math.cos(k);m.x=-w*Y,m.y=A,m.z=w*D,c.push(m.x,m.y,m.z),y.set(-w*Y,S,w*D),y.normalize(),l.push(y.x,y.y,y.z),o.push(L+F,R)}if(g>0){const P=(g-1)*f;for(let L=0;L<r;L++){const k=P+L,D=P+L+1,Y=g*f+L,W=g*f+L+1;s.push(k,D,Y),s.push(D,W,Y)}}}this.setIndex(s),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(l,3)),this.setAttribute("uv",new Ke(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new si(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class sa extends Ut{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const a=[],s=[],c=[],l=[],o=new U,u=new Ne;s.push(0,0,0),c.push(0,0,1),l.push(.5,.5);for(let p=0,h=3;p<=t;p++,h+=3){const d=n+p/t*r;o.x=e*Math.cos(d),o.y=e*Math.sin(d),s.push(o.x,o.y,o.z),c.push(0,0,1),u.x=(s[h]/e+1)/2,u.y=(s[h+1]/e+1)/2,l.push(u.x,u.y)}for(let p=1;p<=t;p++)a.push(p,p+1,0);this.setIndex(a),this.setAttribute("position",new Ke(s,3)),this.setAttribute("normal",new Ke(c,3)),this.setAttribute("uv",new Ke(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sa(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class dn extends Ut{constructor(e=1,t=1,n=1,r=32,a=1,s=!1,c=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:a,openEnded:s,thetaStart:c,thetaLength:l};const o=this;r=Math.floor(r),a=Math.floor(a);const u=[],p=[],h=[],d=[];let _=0;const f=[],y=n/2;let m=0;function g(E){const A=_,w=new Ne,S=new U;let R=0;const F=E===!0?e:t,P=E===!0?1:-1;for(let k=1;k<=r;k++)p.push(0,y*P,0),h.push(0,P,0),d.push(.5,.5),_++;const L=_;for(let k=0;k<=r;k++){const D=k/r*l+c,Y=Math.cos(D),W=Math.sin(D);S.x=F*W,S.y=y*P,S.z=F*Y,p.push(S.x,S.y,S.z),h.push(0,P,0),w.x=.5*Y+.5,w.y=.5*W*P+.5,d.push(w.x,w.y),_++}for(let k=0;k<r;k++){const D=A+k,Y=L+k;E===!0?u.push(Y,Y+1,D):u.push(Y+1,Y,D),R+=3}o.addGroup(m,R,E===!0?1:2),m+=R}(function(){const E=new U,A=new U;let w=0;const S=(t-e)/n;for(let R=0;R<=a;R++){const F=[],P=R/a,L=P*(t-e)+e;for(let k=0;k<=r;k++){const D=k/r,Y=D*l+c,W=Math.sin(Y),z=Math.cos(Y);A.x=L*W,A.y=-P*n+y,A.z=L*z,p.push(A.x,A.y,A.z),E.set(W,S,z).normalize(),h.push(E.x,E.y,E.z),d.push(D,1-P),F.push(_++)}f.push(F)}for(let R=0;R<r;R++)for(let F=0;F<a;F++){const P=f[F][R],L=f[F+1][R],k=f[F+1][R+1],D=f[F][R+1];(e>0||F!==0)&&(u.push(P,L,D),w+=3),(t>0||F!==a-1)&&(u.push(L,k,D),w+=3)}o.addGroup(m,w,0),m+=w})(),s===!1&&(e>0&&g(!0),t>0&&g(!1)),this.setIndex(u),this.setAttribute("position",new Ke(p,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Di extends dn{constructor(e=1,t=1,n=32,r=1,a=!1,s=0,c=2*Math.PI){super(0,e,t,n,r,a,s,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:s,thetaLength:c}}static fromJSON(e){return new Di(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class cr extends Ut{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const a=[],s=[];function c(d,_,f,y){const m=y+1,g=[];for(let E=0;E<=m;E++){g[E]=[];const A=d.clone().lerp(f,E/m),w=_.clone().lerp(f,E/m),S=m-E;for(let R=0;R<=S;R++)g[E][R]=R===0&&E===m?A:A.clone().lerp(w,R/S)}for(let E=0;E<m;E++)for(let A=0;A<2*(m-E)-1;A++){const w=Math.floor(A/2);A%2==0?(l(g[E][w+1]),l(g[E+1][w]),l(g[E][w])):(l(g[E][w+1]),l(g[E+1][w+1]),l(g[E+1][w]))}}function l(d){a.push(d.x,d.y,d.z)}function o(d,_){const f=3*d;_.x=e[f+0],_.y=e[f+1],_.z=e[f+2]}function u(d,_,f,y){y<0&&d.x===1&&(s[_]=d.x-1),f.x===0&&f.z===0&&(s[_]=y/2/Math.PI+.5)}function p(d){return Math.atan2(d.z,-d.x)}function h(d){return Math.atan2(-d.y,Math.sqrt(d.x*d.x+d.z*d.z))}(function(d){const _=new U,f=new U,y=new U;for(let m=0;m<t.length;m+=3)o(t[m+0],_),o(t[m+1],f),o(t[m+2],y),c(_,f,y,d)})(r),(function(d){const _=new U;for(let f=0;f<a.length;f+=3)_.x=a[f+0],_.y=a[f+1],_.z=a[f+2],_.normalize().multiplyScalar(d),a[f+0]=_.x,a[f+1]=_.y,a[f+2]=_.z})(n),(function(){const d=new U;for(let _=0;_<a.length;_+=3){d.x=a[_+0],d.y=a[_+1],d.z=a[_+2];const f=p(d)/2/Math.PI+.5,y=h(d)/Math.PI+.5;s.push(f,1-y)}(function(){const _=new U,f=new U,y=new U,m=new U,g=new Ne,E=new Ne,A=new Ne;for(let w=0,S=0;w<a.length;w+=9,S+=6){_.set(a[w+0],a[w+1],a[w+2]),f.set(a[w+3],a[w+4],a[w+5]),y.set(a[w+6],a[w+7],a[w+8]),g.set(s[S+0],s[S+1]),E.set(s[S+2],s[S+3]),A.set(s[S+4],s[S+5]),m.copy(_).add(f).add(y).divideScalar(3);const R=p(m);u(g,S+0,_,R),u(E,S+2,f,R),u(A,S+4,y,R)}})(),(function(){for(let _=0;_<s.length;_+=6){const f=s[_+0],y=s[_+2],m=s[_+4],g=Math.max(f,y,m),E=Math.min(f,y,m);g>.9&&E<.1&&(f<.2&&(s[_+0]+=1),y<.2&&(s[_+2]+=1),m<.2&&(s[_+4]+=1))}})()})(),this.setAttribute("position",new Ke(a,3)),this.setAttribute("normal",new Ke(a.slice(),3)),this.setAttribute("uv",new Ke(s,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cr(e.vertices,e.indices,e.radius,e.detail)}}class bn extends cr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new bn(e.radius,e.detail)}}class oa extends cr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new oa(e.radius,e.detail)}}class On extends Ut{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,s=t/2,c=Math.floor(n),l=Math.floor(r),o=c+1,u=l+1,p=e/c,h=t/l,d=[],_=[],f=[],y=[];for(let m=0;m<u;m++){const g=m*h-s;for(let E=0;E<o;E++){const A=E*p-a;_.push(A,-g,0),f.push(0,0,1),y.push(E/c),y.push(1-m/l)}}for(let m=0;m<l;m++)for(let g=0;g<c;g++){const E=g+o*m,A=g+o*(m+1),w=g+1+o*(m+1),S=g+1+o*m;d.push(E,A,S),d.push(A,w,S)}this.setIndex(d),this.setAttribute("position",new Ke(_,3)),this.setAttribute("normal",new Ke(f,3)),this.setAttribute("uv",new Ke(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new On(e.width,e.height,e.widthSegments,e.heightSegments)}}class wn extends Ut{constructor(e=.5,t=1,n=32,r=1,a=0,s=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:a,thetaLength:s},n=Math.max(3,n);const c=[],l=[],o=[],u=[];let p=e;const h=(t-e)/(r=Math.max(1,r)),d=new U,_=new Ne;for(let f=0;f<=r;f++){for(let y=0;y<=n;y++){const m=a+y/n*s;d.x=p*Math.cos(m),d.y=p*Math.sin(m),l.push(d.x,d.y,d.z),o.push(0,0,1),_.x=(d.x/t+1)/2,_.y=(d.y/t+1)/2,u.push(_.x,_.y)}p+=h}for(let f=0;f<r;f++){const y=f*(n+1);for(let m=0;m<n;m++){const g=m+y,E=g,A=g+n+1,w=g+n+2,S=g+1;c.push(E,A,S),c.push(A,w,S)}}this.setIndex(c),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(o,3)),this.setAttribute("uv",new Ke(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Fn extends Ut{constructor(e=1,t=32,n=16,r=0,a=2*Math.PI,s=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:a,thetaStart:s,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(s+c,Math.PI);let o=0;const u=[],p=new U,h=new U,d=[],_=[],f=[],y=[];for(let m=0;m<=n;m++){const g=[],E=m/n,A=s+E*c,w=e*Math.cos(A),S=Math.sqrt(e*e-w*w);let R=0;m===0&&s===0?R=.5/t:m===n&&l===Math.PI&&(R=-.5/t);for(let F=0;F<=t;F++){const P=F/t,L=r+P*a;p.x=-S*Math.cos(L),p.y=w,p.z=S*Math.sin(L),_.push(p.x,p.y,p.z),h.copy(p).normalize(),f.push(h.x,h.y,h.z),y.push(P+R,1-E),g.push(o++)}u.push(g)}for(let m=0;m<n;m++)for(let g=0;g<t;g++){const E=u[m][g+1],A=u[m][g],w=u[m+1][g],S=u[m+1][g+1];(m!==0||s>0)&&d.push(E,A,S),(m!==n-1||l<Math.PI)&&d.push(A,w,S)}this.setIndex(d),this.setAttribute("position",new Ke(_,3)),this.setAttribute("normal",new Ke(f,3)),this.setAttribute("uv",new Ke(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function oi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(ms(r))r.isRenderTargetTexture?(Te("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(ms(r[0])){const a=[];for(let s=0,c=r.length;s<c;s++)a[s]=r[s].clone();e[t][n]=a}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Tt(i){const e={};for(let t=0;t<i.length;t++){const n=oi(i[t]);for(const r in n)e[r]=n[r]}return e}function ms(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function gs(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ve.workingColorSpace}const Ml={clone:oi,merge:Tt};class kt extends Ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=oi(e.uniforms),this.uniformsGroups=(function(t){const n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new be().setHex(r.value);break;case"v2":this.uniforms[n].value=new Ne().fromArray(r.value);break;case"v3":this.uniforms[n].value=new U().fromArray(r.value);break;case"v4":this.uniforms[n].value=new at().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ue().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Fe().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Sl extends kt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class st extends Ii{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yl extends st{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class El extends Ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tl extends Ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class la extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class bl extends la{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ca=new Fe,_s=new U,vs=new U;class xs{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new aa,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;_s.setFromMatrixPosition(e.matrixWorld),t.position.copy(_s),vs.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vs),t.updateMatrixWorld(),ca.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ca,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ca)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ur=new U,hr=new qn,Zt=new U;class ua extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ur,hr,Zt),Zt.x===1&&Zt.y===1&&Zt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ur,hr,Zt.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ur,hr,Zt),Zt.x===1&&Zt.y===1&&Zt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ur,hr,Zt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const An=new U,Ms=new Ne,Ss=new Ne;class It extends ua{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=2*Ur*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(.5*Lr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Ur*Math.atan(Math.tan(.5*Lr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){An.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(An.x,An.y).multiplyScalar(-e/An.z),An.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(An.x,An.y).multiplyScalar(-e/An.z)}getViewSize(e,t){return this.getViewBounds(e,Ms,Ss),t.subVectors(Ss,Ms)}setViewOffset(e,t,n,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(.5*Lr*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,o=s.fullHeight;a+=s.offsetX*r/l,t-=s.offsetY*n/o,r*=s.width/l,n*=s.height/o}const c=this.filmOffset;c!==0&&(a+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class wl extends xs{constructor(){super(new It(90,1,.5,500)),this.isPointLightShadow=!0}}class Al extends la{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new wl}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ha extends ua{constructor(e=-1,t=1,n=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,s=n+e,c=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const o=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=o*this.view.offsetX,s=a+o*this.view.width,c-=u*this.view.offsetY,l=c-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Rl extends xs{constructor(){super(new ha(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cl extends la{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Rl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}new Fe,new Fe,new Fe;const li=-90;class Pl extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new It(li,1,e,t);r.layers=this.layers,this.add(r);const a=new It(li,1,e,t);a.layers=this.layers,this.add(a);const s=new It(li,1,e,t);s.layers=this.layers,this.add(s);const c=new It(li,1,e,t);c.layers=this.layers,this.add(c);const l=new It(li,1,e,t);l.layers=this.layers,this.add(l);const o=new It(li,1,e,t);o.layers=this.layers,this.add(o)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,s,c,l]=t;for(const o of t)this.remove(o);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==2001)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(const o of t)this.add(o),o.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,c,l,o,u]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let y=!1;y=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,1,r),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,2,r),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,r),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,r),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(p,h,d),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ll extends It{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ys="\\[\\]\\.:\\/",da="[^"+ys+"]",Ul="[^"+ys.replace("\\.","")+"]";new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",da)+/(WCOD+)?/.source.replace("WCOD",Ul)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",da)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",da)+"$");const Es=new Fe;class Il{constructor(e,t,n=0,r=1/0){this.ray=new cs(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new zr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ke("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Es.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Es),this}intersectObject(e,t=!0,n=[]){return pa(e,this,n,t),n.sort(Ts),n}intersectObjects(e,t=!0,n=[]){for(let r=0,a=e.length;r<a;r++)pa(e[r],this,n,t);return n.sort(Ts),n}}function Ts(i,e){return i.distance-e.distance}function pa(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const a=i.children;for(let s=0,c=a.length;s<c;s++)pa(a[s],e,t,!0)}}const Na=class Na{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=n,a[3]=r,this}};Na.prototype.isMatrix2=!0;let bs=Na;new Fe,new Fe,new be,new be,new ua;function ws(i,e,t,n){const r=(function(a){switch(a){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${a}.`)})(n);switch(t){case 1021:return i*e;case 1028:case 1029:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case 1023:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37490:case 37491:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}})),typeof window<"u"&&(window.__THREE__?Te("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function As(){let i=null,e=!1,t=null,n=null;function r(a,s){t(a,s),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function Dl(i){const e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);const n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){const a=e.get(t);return void((!a||a.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}const r=e.get(t);if(r===void 0)e.set(t,(function(a,s){const c=a.array,l=a.usage,o=c.byteLength,u=i.createBuffer();let p;if(i.bindBuffer(s,u),i.bufferData(s,c,l),a.onUploadCallback(),c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)p=a.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(c instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);p=i.UNSIGNED_BYTE}return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:o}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(a,s,c){const l=s.array,o=s.updateRanges;if(i.bindBuffer(c,a),o.length===0)i.bufferSubData(c,0,l);else{o.sort((p,h)=>p.start-h.start);let u=0;for(let p=1;p<o.length;p++){const h=o[u],d=o[p];d.start<=h.start+h.count+1?h.count=Math.max(h.count,d.start+d.count-h.start):(++u,o[u]=d)}o.length=u+1;for(let p=0,h=o.length;p<h;p++){const d=o[p];i.bufferSubData(c,d.start*l.BYTES_PER_ELEMENT,l,d.start,d.count)}s.clearUpdateRanges()}s.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}const De={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );

		irradiance *= sheenEnergyComp;

	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER

		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {

	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif

				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN

		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;

	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},oe={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},Jt={basic:{uniforms:Tt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:Tt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new be(0)},envMapIntensity:{value:1}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:Tt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:Tt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:Tt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new be(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:Tt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:Tt([oe.points,oe.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:Tt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:Tt([oe.common,oe.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:Tt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:Tt([oe.sprite,oe.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distance:{uniforms:Tt([oe.common,oe.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distance_vert,fragmentShader:De.distance_frag},shadow:{uniforms:Tt([oe.lights,oe.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};Jt.physical={uniforms:Tt([Jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const dr={r:0,b:0,g:0},Nl=new Fe,Rs=new Ue;function Ol(i,e,t,n,r,a){const s=new be(0);let c,l,o=r===!0?0:1,u=null,p=0,h=null;function d(f){let y=f.isScene===!0?f.background:null;if(y&&y.isTexture){const m=f.backgroundBlurriness>0;y=e.get(y,m)}return y}function _(f,y){f.getRGB(dr,gs(i)),t.buffers.color.setClear(dr.r,dr.g,dr.b,y,a)}return{getClearColor:function(){return s},setClearColor:function(f,y=1){s.set(f),o=y,_(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(f){o=f,_(s,o)},render:function(f){let y=!1;const m=d(f);m===null?_(s,o):m&&m.isColor&&(_(m,1),y=!0);const g=i.xr.getEnvironmentBlendMode();g==="additive"?t.buffers.color.setClear(0,0,0,1,a):g==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,y){const m=d(y);m&&(m.isCubeTexture||m.mapping===306)?(l===void 0&&(l=new Nt(new Gt(1,1,1),new kt({name:"BackgroundCubeMaterial",uniforms:oi(Jt.backgroundCube.uniforms),vertexShader:Jt.backgroundCube.vertexShader,fragmentShader:Jt.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(g,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=m,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Nl.makeRotationFromEuler(y.backgroundRotation)).transpose(),m.isCubeTexture&&m.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Rs),l.material.toneMapped=Ve.getTransfer(m.colorSpace)!==Ye,u===m&&p===m.version&&h===i.toneMapping||(l.material.needsUpdate=!0,u=m,p=m.version,h=i.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):m&&m.isTexture&&(c===void 0&&(c=new Nt(new On(2,2),new kt({name:"BackgroundMaterial",uniforms:oi(Jt.background.uniforms),vertexShader:Jt.background.vertexShader,fragmentShader:Jt.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=m,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Ve.getTransfer(m.colorSpace)!==Ye,m.matrixAutoUpdate===!0&&m.updateMatrix(),c.material.uniforms.uvTransform.value.copy(m.matrix),u===m&&p===m.version&&h===i.toneMapping||(c.material.needsUpdate=!0,u=m,p=m.version,h=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Fl(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=o(null);let a=r,s=!1;function c(m){return i.bindVertexArray(m)}function l(m){return i.deleteVertexArray(m)}function o(m){const g=[],E=[],A=[];for(let w=0;w<t;w++)g[w]=0,E[w]=0,A[w]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:g,enabledAttributes:E,attributeDivisors:A,object:m,attributes:{},index:null}}function u(){const m=a.newAttributes;for(let g=0,E=m.length;g<E;g++)m[g]=0}function p(m){h(m,0)}function h(m,g){const E=a.newAttributes,A=a.enabledAttributes,w=a.attributeDivisors;E[m]=1,A[m]===0&&(i.enableVertexAttribArray(m),A[m]=1),w[m]!==g&&(i.vertexAttribDivisor(m,g),w[m]=g)}function d(){const m=a.newAttributes,g=a.enabledAttributes;for(let E=0,A=g.length;E<A;E++)g[E]!==m[E]&&(i.disableVertexAttribArray(E),g[E]=0)}function _(m,g,E,A,w,S,R){R===!0?i.vertexAttribIPointer(m,g,E,w,S):i.vertexAttribPointer(m,g,E,A,w,S)}function f(){y(),s=!0,a!==r&&(a=r,c(a.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(m,g,E,A,w){let S=!1;const R=(function(F,P,L,k){const D=k.wireframe===!0;let Y=n[P.id];Y===void 0&&(Y={},n[P.id]=Y);const W=F.isInstancedMesh===!0?F.id:0;let z=Y[W];z===void 0&&(z={},Y[W]=z);let $=z[L.id];$===void 0&&($={},z[L.id]=$);let H=$[D];return H===void 0&&(H=o(i.createVertexArray()),$[D]=H),H})(m,A,E,g);a!==R&&(a=R,c(a.object)),S=(function(F,P,L,k){const D=a.attributes,Y=P.attributes;let W=0;const z=L.getAttributes();for(const $ in z)if(z[$].location>=0){const H=D[$];let ne=Y[$];if(ne===void 0&&($==="instanceMatrix"&&F.instanceMatrix&&(ne=F.instanceMatrix),$==="instanceColor"&&F.instanceColor&&(ne=F.instanceColor)),H===void 0||H.attribute!==ne||ne&&H.data!==ne.data)return!0;W++}return a.attributesNum!==W||a.index!==k})(m,A,E,w),S&&(function(F,P,L,k){const D={},Y=P.attributes;let W=0;const z=L.getAttributes();for(const $ in z)if(z[$].location>=0){let H=Y[$];H===void 0&&($==="instanceMatrix"&&F.instanceMatrix&&(H=F.instanceMatrix),$==="instanceColor"&&F.instanceColor&&(H=F.instanceColor));const ne={};ne.attribute=H,H&&H.data&&(ne.data=H.data),D[$]=ne,W++}a.attributes=D,a.attributesNum=W,a.index=k})(m,A,E,w),w!==null&&e.update(w,i.ELEMENT_ARRAY_BUFFER),(S||s)&&(s=!1,(function(F,P,L,k){u();const D=k.attributes,Y=L.getAttributes(),W=P.defaultAttributeValues;for(const z in Y){const $=Y[z];if($.location>=0){let H=D[z];if(H===void 0&&(z==="instanceMatrix"&&F.instanceMatrix&&(H=F.instanceMatrix),z==="instanceColor"&&F.instanceColor&&(H=F.instanceColor)),H!==void 0){const ne=H.normalized,de=H.itemSize,Le=e.get(H);if(Le===void 0)continue;const Me=Le.buffer,ve=Le.type,te=Le.bytesPerElement,ce=ve===i.INT||ve===i.UNSIGNED_INT||H.gpuType===1013;if(H.isInterleavedBufferAttribute){const se=H.data,xe=se.stride,Be=H.offset;if(se.isInstancedInterleavedBuffer){for(let J=0;J<$.locationSize;J++)h($.location+J,se.meshPerAttribute);F.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let J=0;J<$.locationSize;J++)p($.location+J);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let J=0;J<$.locationSize;J++)_($.location+J,de/$.locationSize,ve,ne,xe*te,(Be+de/$.locationSize*J)*te,ce)}else{if(H.isInstancedBufferAttribute){for(let se=0;se<$.locationSize;se++)h($.location+se,H.meshPerAttribute);F.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let se=0;se<$.locationSize;se++)p($.location+se);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let se=0;se<$.locationSize;se++)_($.location+se,de/$.locationSize,ve,ne,de*te,de/$.locationSize*se*te,ce)}}else if(W!==void 0){const ne=W[z];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv($.location,ne);break;case 3:i.vertexAttrib3fv($.location,ne);break;case 4:i.vertexAttrib4fv($.location,ne);break;default:i.vertexAttrib1fv($.location,ne)}}}}d()})(m,g,E,A),w!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(w).buffer))},reset:f,resetDefaultState:y,dispose:function(){f();for(const m in n){const g=n[m];for(const E in g){const A=g[E];for(const w in A){const S=A[w];for(const R in S)l(S[R].object),delete S[R];delete A[w]}}delete n[m]}},releaseStatesOfGeometry:function(m){if(n[m.id]===void 0)return;const g=n[m.id];for(const E in g){const A=g[E];for(const w in A){const S=A[w];for(const R in S)l(S[R].object),delete S[R];delete A[w]}}delete n[m.id]},releaseStatesOfObject:function(m){for(const g in n){const E=n[g],A=m.isInstancedMesh===!0?m.id:0,w=E[A];if(w!==void 0){for(const S in w){const R=w[S];for(const F in R)l(R[F].object),delete R[F];delete w[S]}delete E[A],Object.keys(E).length===0&&delete n[g]}}},releaseStatesOfProgram:function(m){for(const g in n){const E=n[g];for(const A in E){const w=E[A];if(w[m.id]===void 0)continue;const S=w[m.id];for(const R in S)l(S[R].object),delete S[R];delete w[m.id]}}},initAttributes:u,enableAttribute:p,disableUnusedAttributes:d}}function Bl(i,e,t){let n;this.setMode=function(r){n=r},this.render=function(r,a){i.drawArrays(n,r,a),t.update(a,n,1)},this.renderInstances=function(r,a,s){s!==0&&(i.drawArraysInstanced(n,r,a,s),t.update(a,n,s))},this.renderMultiDraw=function(r,a,s){if(s===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,a,0,s);let c=0;for(let l=0;l<s;l++)c+=a[l];t.update(c,n,1)}}function zl(i,e,t,n){let r;function a(u){if(u==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";u="mediump"}return u==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let s=t.precision!==void 0?t.precision:"highp";const c=a(s);c!==s&&(Te("WebGLRenderer:",s,"not supported, using",c,"instead."),s=c);const l=t.logarithmicDepthBuffer===!0,o=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&o===!1&&Te("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const u=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(u.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:a,textureFormatReadable:function(u){return u===1023||n.convert(u)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(u){const p=u===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(u!==1009&&n.convert(u)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&u!==1015&&!p)},precision:s,logarithmicDepthBuffer:l,reversedDepthBuffer:o,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function Hl(i){const e=this;let t=null,n=0,r=!1,a=!1;const s=new Tn,c=new Ue,l={value:null,needsUpdate:!1};function o(u,p,h,d){const _=u!==null?u.length:0;let f=null;if(_!==0){if(f=l.value,d!==!0||f===null){const y=h+4*_,m=p.matrixWorldInverse;c.getNormalMatrix(m),(f===null||f.length<y)&&(f=new Float32Array(y));for(let g=0,E=h;g!==_;++g,E+=4)s.copy(u[g]).applyMatrix4(m,c),s.normal.toArray(f,E),f[E+3]=s.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,f}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const h=u.length!==0||p||n!==0||r;return r=p,n=u.length,h},this.beginShadows=function(){a=!0,o(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,p){t=o(u,p,0)},this.setState=function(u,p,h){const d=u.clippingPlanes,_=u.clipIntersection,f=u.clipShadows,y=i.get(u);if(!r||d===null||d.length===0||a&&!f)a?o(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{const m=a?0:n,g=4*m;let E=y.clippingState||null;l.value=E,E=o(d,p,g,h);for(let A=0;A!==g;++A)E[A]=t[A];y.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=m}}}Rs.set(-1,0,0,0,1,0,0,0,1);const Cs=[.125,.215,.35,.446,.526,.582],Ni=20,Oi=new ha,Ps=new be;let fa=null,ma=0,ga=0,_a=!1;const Vl=new U;class Ls{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,a={}){const{size:s=256,position:c=Vl}=a;fa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),_a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ds(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Is(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(fa,ma,ga),this._renderer.xr.enabled=_a,e.scissorTest=!1,ci(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),_a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:ki,depthBuffer:!1},r=Us(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Us(e,t,n);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=(function(s){const c=[],l=[],o=[];let u=s;const p=s-4+1+Cs.length;for(let h=0;h<p;h++){const d=Math.pow(2,u);c.push(d);let _=1/d;h>s-4?_=Cs[h-s+4-1]:h===0&&(_=0),l.push(_);const f=1/(d-2),y=-f,m=1+f,g=[y,y,m,y,m,m,y,y,m,m,y,m],E=6,A=6,w=3,S=2,R=1,F=new Float32Array(w*A*E),P=new Float32Array(S*A*E),L=new Float32Array(R*A*E);for(let D=0;D<E;D++){const Y=D%3*2/3-1,W=D>2?0:-1,z=[Y,W,0,Y+2/3,W,0,Y+2/3,W+1,0,Y,W,0,Y+2/3,W+1,0,Y,W+1,0];F.set(z,w*A*D),P.set(g,S*A*D);const $=[D,D,D,D,D,D];L.set($,R*A*D)}const k=new Ut;k.setAttribute("position",new $t(F,w)),k.setAttribute("uv",new $t(P,S)),k.setAttribute("faceIndex",new $t(L,R)),o.push(new Nt(k,null)),u>4&&u--}return{lodMeshes:o,sizeLods:c,sigmas:l}})(a)),this._blurMaterial=(function(s,c,l){const o=new Float32Array(Ni),u=new U(0,1,0);return new kt({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/c,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:o},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:u}},vertexShader:pr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})})(a,e,t),this._ggxMaterial=(function(s,c,l){return new kt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/c,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})})(a,e,t)}return r}_compileMaterial(e){const t=new Nt(new Ut,e);this._renderer.compile(t,Oi)}_sceneToCubeUV(e,t,n,r,a){const s=new It(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],o=this._renderer,u=o.autoClear,p=o.toneMapping;o.getClearColor(Ps),o.toneMapping=0,o.autoClear=!1,o.state.buffers.depth.getReversed()&&(o.setRenderTarget(r),o.clearDepth(),o.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Nt(new Gt,new Kt({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1})));const h=this._backgroundBox,d=h.material;let _=!1;const f=e.background;f?f.isColor&&(d.color.copy(f),e.background=null,_=!0):(d.color.copy(Ps),_=!0);for(let y=0;y<6;y++){const m=y%3;m===0?(s.up.set(0,c[y],0),s.position.set(a.x,a.y,a.z),s.lookAt(a.x+l[y],a.y,a.z)):m===1?(s.up.set(0,0,c[y]),s.position.set(a.x,a.y,a.z),s.lookAt(a.x,a.y+l[y],a.z)):(s.up.set(0,c[y],0),s.position.set(a.x,a.y,a.z),s.lookAt(a.x,a.y,a.z+l[y]));const g=this._cubeSize;ci(r,m*g,y>2?g:0,g,g),o.setRenderTarget(r),_&&o.render(h,s),o.render(e,s)}o.toneMapping=p,o.autoClear=u,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ds()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Is());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a,a.uniforms.envMap.value=e;const c=this._cubeSize;ci(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(s,Oi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,c=this._lodMeshes[n];c.material=s;const l=s.uniforms,o=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),p=Math.sqrt(o*o-u*u)*(0+1.25*o),{_lodMax:h}=this,d=this._sizeLods[n],_=3*d*(n>h-4?n-h+4:0),f=4*(this._cubeSize-d);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=h-t,ci(a,_,f,3*d,2*d),r.setRenderTarget(a),r.render(c,Oi),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=h-n,ci(e,_,f,3*d,2*d),r.setRenderTarget(e),r.render(c,Oi)}_blur(e,t,n,r,a){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,r,"latitudinal",a),this._halfBlur(s,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,s,c){const l=this._renderer,o=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&ke("blur direction must be either latitudinal or longitudinal!");const u=this._lodMeshes[r];u.material=o;const p=o.uniforms,h=this._sizeLods[n]-1,d=isFinite(a)?Math.PI/(2*h):2*Math.PI/39,_=a/d,f=isFinite(a)?1+Math.floor(3*_):Ni;f>Ni&&Te(`sigmaRadians, ${a}, is too large and will clip, as it requested ${f} samples when the maximum is set to 20`);const y=[];let m=0;for(let A=0;A<Ni;++A){const w=A/_,S=Math.exp(-w*w/2);y.push(S),A===0?m+=S:A<f&&(m+=2*S)}for(let A=0;A<y.length;A++)y[A]=y[A]/m;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=y,p.latitudinal.value=s==="latitudinal",c&&(p.poleAxis.value=c);const{_lodMax:g}=this;p.dTheta.value=d,p.mipInt.value=g-n;const E=this._sizeLods[r];ci(t,3*E*(r>g-4?r-g+4:0),4*(this._cubeSize-E),3*E,2*E),l.setRenderTarget(t),l.render(u,Oi)}}function Us(i,e,t){const n=new Yt(i,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ci(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Is(){return new kt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ds(){return new kt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function pr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ns extends Yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ps(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Gt(5,5,5),a=new kt({name:"CubemapFromEquirect",uniforms:oi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=t;const s=new Nt(r,a),c=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Pl(1,10,this).update(e,s),t.minFilter=c,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(a)}}function Gl(i){let e=new WeakMap,t=new WeakMap,n=null;function r(c,l){return l===303?c.mapping=301:l===304&&(c.mapping=302),c}function a(c){const l=c.target;l.removeEventListener("dispose",a);const o=e.get(l);o!==void 0&&(e.delete(l),o.dispose())}function s(c){const l=c.target;l.removeEventListener("dispose",s);const o=t.get(l);o!==void 0&&(t.delete(l),o.dispose())}return{get:function(c,l=!1){return c==null?null:l?(function(o){if(o&&o.isTexture){const u=o.mapping,p=u===303||u===304,h=u===301||u===302;if(p||h){let d=t.get(o);const _=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==_)return n===null&&(n=new Ls(i)),d=p?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return p&&f&&f.height>0||h&&f&&(function(y){let m=0;const g=6;for(let E=0;E<g;E++)y[E]!==void 0&&m++;return m===g})(f)?(n===null&&(n=new Ls(i)),d=p?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o})(c):(function(o){if(o&&o.isTexture){const u=o.mapping;if(u===303||u===304){if(e.has(o))return r(e.get(o).texture,o.mapping);{const p=o.image;if(p&&p.height>0){const h=new Ns(p.height);return h.fromEquirectangularTexture(i,o),e.set(o,h),o.addEventListener("dispose",a),r(h.texture,o.mapping)}return null}}}return o})(c)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function kl(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Xn("WebGLRenderer: "+n+" extension not supported."),r}}}function Wl(i,e,t,n){const r={},a=new WeakMap;function s(l){const o=l.target;o.index!==null&&e.remove(o.index);for(const p in o.attributes)e.remove(o.attributes[p]);o.removeEventListener("dispose",s),delete r[o.id];const u=a.get(o);u&&(e.remove(u),a.delete(o)),n.releaseStatesOfGeometry(o),o.isInstancedBufferGeometry===!0&&delete o._maxInstanceCount,t.memory.geometries--}function c(l){const o=[],u=l.index,p=l.attributes.position;let h=0;if(p===void 0)return;if(u!==null){const f=u.array;h=u.version;for(let y=0,m=f.length;y<m;y+=3){const g=f[y+0],E=f[y+1],A=f[y+2];o.push(g,E,E,A,A,g)}}else{const f=p.array;h=p.version;for(let y=0,m=f.length/3-1;y<m;y+=3){const g=y+0,E=y+1,A=y+2;o.push(g,E,E,A,A,g)}}const d=new(p.count>=65535?ls:os)(o,1);d.version=h;const _=a.get(l);_&&e.remove(_),a.set(l,d)}return{get:function(l,o){return r[o.id]===!0||(o.addEventListener("dispose",s),r[o.id]=!0,t.memory.geometries++),o},update:function(l){const o=l.attributes;for(const u in o)e.update(o[u],i.ARRAY_BUFFER)},getWireframeAttribute:function(l){const o=a.get(l);if(o){const u=l.index;u!==null&&o.version<u.version&&c(l)}else c(l);return a.get(l)}}}function Xl(i,e,t){let n,r,a;this.setMode=function(s){n=s},this.setIndex=function(s){r=s.type,a=s.bytesPerElement},this.render=function(s,c){i.drawElements(n,c,r,s*a),t.update(c,n,1)},this.renderInstances=function(s,c,l){l!==0&&(i.drawElementsInstanced(n,c,r,s*a,l),t.update(c,n,l))},this.renderMultiDraw=function(s,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,r,s,0,l);let o=0;for(let u=0;u<l;u++)o+=c[u];t.update(o,n,1)}}function ql(i){const e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:ke("WebGLInfo: Unknown draw mode:",n)}}}}function jl(i,e,t){const n=new WeakMap,r=new at;return{update:function(a,s,c){const l=a.morphTargetInfluences,o=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,u=o!==void 0?o.length:0;let p=n.get(s);if(p===void 0||p.count!==u){let F=function(){S.dispose(),n.delete(s),s.removeEventListener("dispose",F)};p!==void 0&&p.texture.dispose();const h=s.morphAttributes.position!==void 0,d=s.morphAttributes.normal!==void 0,_=s.morphAttributes.color!==void 0,f=s.morphAttributes.position||[],y=s.morphAttributes.normal||[],m=s.morphAttributes.color||[];let g=0;h===!0&&(g=1),d===!0&&(g=2),_===!0&&(g=3);let E=s.attributes.position.count*g,A=1;E>e.maxTextureSize&&(A=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const w=new Float32Array(E*A*4*u),S=new Za(w,E,A,u);S.type=1015,S.needsUpdate=!0;const R=4*g;for(let P=0;P<u;P++){const L=f[P],k=y[P],D=m[P],Y=E*A*4*P;for(let W=0;W<L.count;W++){const z=W*R;h===!0&&(r.fromBufferAttribute(L,W),w[Y+z+0]=r.x,w[Y+z+1]=r.y,w[Y+z+2]=r.z,w[Y+z+3]=0),d===!0&&(r.fromBufferAttribute(k,W),w[Y+z+4]=r.x,w[Y+z+5]=r.y,w[Y+z+6]=r.z,w[Y+z+7]=0),_===!0&&(r.fromBufferAttribute(D,W),w[Y+z+8]=r.x,w[Y+z+9]=r.y,w[Y+z+10]=r.z,w[Y+z+11]=D.itemSize===4?r.w:1)}}p={count:u,texture:S,size:new Ne(E,A)},n.set(s,p),s.addEventListener("dispose",F)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let h=0;for(let _=0;_<l.length;_++)h+=l[_];const d=s.morphTargetsRelative?1:1-h;c.getUniforms().setValue(i,"morphTargetBaseInfluence",d),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function Yl(i,e,t,n,r){let a=new WeakMap;function s(c){const l=c.target;l.removeEventListener("dispose",s),n.releaseStatesOfObject(l),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:function(c){const l=r.render.frame,o=c.geometry,u=e.get(c,o);if(a.get(u)!==l&&(e.update(u),a.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",s)===!1&&c.addEventListener("dispose",s),a.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),a.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;a.get(p)!==l&&(p.update(),a.set(p,l))}return u},dispose:function(){a=new WeakMap}}}const $l={1:"LINEAR_TONE_MAPPING",2:"REINHARD_TONE_MAPPING",3:"CINEON_TONE_MAPPING",4:"ACES_FILMIC_TONE_MAPPING",6:"AGX_TONE_MAPPING",7:"NEUTRAL_TONE_MAPPING",5:"CUSTOM_TONE_MAPPING"};function Kl(i,e,t,n,r,a){const s=new Yt(e,t,{type:i,depthBuffer:r,stencilBuffer:a,samples:n?4:0,depthTexture:r?new ai(e,t):void 0}),c=new Yt(e,t,{type:1016,depthBuffer:!1,stencilBuffer:!1}),l=new Ut;l.setAttribute("position",new Ke([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ke([0,2,0,0,2,0],2));const o=new Sl({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Nt(l,o),p=new ha(-1,1,1,-1,0,1);let h,d=null,_=null,f=!1,y=null,m=[],g=!1;this.setSize=function(E,A){s.setSize(E,A),c.setSize(E,A);for(let w=0;w<m.length;w++){const S=m[w];S.setSize&&S.setSize(E,A)}},this.setEffects=function(E){m=E,g=m.length>0&&m[0].isRenderPass===!0;const A=s.width,w=s.height;for(let S=0;S<m.length;S++){const R=m[S];R.setSize&&R.setSize(A,w)}},this.begin=function(E,A){if(f||E.toneMapping===0&&m.length===0)return!1;if(y=A,A!==null){const w=A.width,S=A.height;s.width===w&&s.height===S||this.setSize(w,S)}return g===!1&&E.setRenderTarget(s),h=E.toneMapping,E.toneMapping=0,!0},this.hasRenderPass=function(){return g},this.end=function(E,A){E.toneMapping=h,f=!0;let w=s,S=c;for(let R=0;R<m.length;R++){const F=m[R];if(F.enabled!==!1&&(F.render(E,S,w,A),F.needsSwap!==!1)){const P=w;w=S,S=P}}if(d!==E.outputColorSpace||_!==E.toneMapping){d=E.outputColorSpace,_=E.toneMapping,o.defines={},Ve.getTransfer(d)===Ye&&(o.defines.SRGB_TRANSFER="");const R=$l[_];R&&(o.defines[R]=""),o.needsUpdate=!0}o.uniforms.tDiffuse.value=w.texture,E.setRenderTarget(y),E.render(u,p),y=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),c.dispose(),l.dispose(),o.dispose()}}const Os=new Bt,va=new ai(1,1),Fs=new Za,Bs=new el,zs=new ps,Hs=[],Vs=[],Gs=new Float32Array(16),ks=new Float32Array(9),Ws=new Float32Array(4);function ui(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=Hs[r];if(a===void 0&&(a=new Float32Array(r),Hs[r]=a),e!==0){n.toArray(a,0);for(let s=1,c=0;s!==e;++s)c+=t,i[s].toArray(a,c)}return a}function dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fr(i,e){let t=Vs[e];t===void 0&&(t=new Int32Array(e),Vs[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Zl(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Jl(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2fv(this.addr,e),pt(t,e)}}function Ql(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dt(t,e))return;i.uniform3fv(this.addr,e),pt(t,e)}}function ec(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4fv(this.addr,e),pt(t,e)}}function tc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(dt(t,n))return;Ws.set(n),i.uniformMatrix2fv(this.addr,!1,Ws),pt(t,n)}}function nc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(dt(t,n))return;ks.set(n),i.uniformMatrix3fv(this.addr,!1,ks),pt(t,n)}}function ic(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(dt(t,n))return;Gs.set(n),i.uniformMatrix4fv(this.addr,!1,Gs),pt(t,n)}}function rc(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ac(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2iv(this.addr,e),pt(t,e)}}function sc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3iv(this.addr,e),pt(t,e)}}function oc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4iv(this.addr,e),pt(t,e)}}function lc(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function cc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2uiv(this.addr,e),pt(t,e)}}function uc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3uiv(this.addr,e),pt(t,e)}}function hc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4uiv(this.addr,e),pt(t,e)}}function dc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();let a;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(va.compareFunction=t.isReversedDepthBuffer()?518:515,a=va):a=Os,t.setTexture2D(e||a,r)}function pc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Bs,r)}function fc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||zs,r)}function mc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Fs,r)}function gc(i,e){i.uniform1fv(this.addr,e)}function _c(i,e){const t=ui(e,this.size,2);i.uniform2fv(this.addr,t)}function vc(i,e){const t=ui(e,this.size,3);i.uniform3fv(this.addr,t)}function xc(i,e){const t=ui(e,this.size,4);i.uniform4fv(this.addr,t)}function Mc(i,e){const t=ui(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Sc(i,e){const t=ui(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function yc(i,e){const t=ui(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ec(i,e){i.uniform1iv(this.addr,e)}function Tc(i,e){i.uniform2iv(this.addr,e)}function bc(i,e){i.uniform3iv(this.addr,e)}function wc(i,e){i.uniform4iv(this.addr,e)}function Ac(i,e){i.uniform1uiv(this.addr,e)}function Rc(i,e){i.uniform2uiv(this.addr,e)}function Cc(i,e){i.uniform3uiv(this.addr,e)}function Pc(i,e){i.uniform4uiv(this.addr,e)}function Lc(i,e,t){const n=this.cache,r=e.length,a=fr(t,r);let s;dt(n,a)||(i.uniform1iv(this.addr,a),pt(n,a)),s=this.type===i.SAMPLER_2D_SHADOW?va:Os;for(let c=0;c!==r;++c)t.setTexture2D(e[c]||s,a[c])}function Uc(i,e,t){const n=this.cache,r=e.length,a=fr(t,r);dt(n,a)||(i.uniform1iv(this.addr,a),pt(n,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Bs,a[s])}function Ic(i,e,t){const n=this.cache,r=e.length,a=fr(t,r);dt(n,a)||(i.uniform1iv(this.addr,a),pt(n,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||zs,a[s])}function Dc(i,e,t){const n=this.cache,r=e.length,a=fr(t,r);dt(n,a)||(i.uniform1iv(this.addr,a),pt(n,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||Fs,a[s])}class Nc{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(r){switch(r){case 5126:return Zl;case 35664:return Jl;case 35665:return Ql;case 35666:return ec;case 35674:return tc;case 35675:return nc;case 35676:return ic;case 5124:case 35670:return rc;case 35667:case 35671:return ac;case 35668:case 35672:return sc;case 35669:case 35673:return oc;case 5125:return lc;case 36294:return cc;case 36295:return uc;case 36296:return hc;case 35678:case 36198:case 36298:case 36306:case 35682:return dc;case 35679:case 36299:case 36307:return pc;case 35680:case 36300:case 36308:case 36293:return fc;case 36289:case 36303:case 36311:case 36292:return mc}})(t.type)}}class Oc{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(r){switch(r){case 5126:return gc;case 35664:return _c;case 35665:return vc;case 35666:return xc;case 35674:return Mc;case 35675:return Sc;case 35676:return yc;case 5124:case 35670:return Ec;case 35667:case 35671:return Tc;case 35668:case 35672:return bc;case 35669:case 35673:return wc;case 5125:return Ac;case 36294:return Rc;case 36295:return Cc;case 36296:return Pc;case 35678:case 36198:case 36298:case 36306:case 35682:return Lc;case 35679:case 36299:case 36307:return Uc;case 35680:case 36300:case 36308:case 36293:return Ic;case 36289:case 36303:case 36311:case 36292:return Dc}})(t.type)}}class Fc{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const c=r[a];c.setValue(e,t[c.id],n)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function Xs(i,e){i.seq.push(e),i.map[e.id]=e}function Bc(i,e,t){const n=i.name,r=n.length;for(xa.lastIndex=0;;){const a=xa.exec(n),s=xa.lastIndex;let c=a[1];const l=a[2]==="]",o=a[3];if(l&&(c|=0),o===void 0||o==="["&&s+2===r){Xs(t,o===void 0?new Nc(c,i,e):new Oc(c,i,e));break}{let u=t.map[c];u===void 0&&(u=new Fc(c),Xs(t,u)),t=u}}}class mr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const c=e.getActiveUniform(t,s);Bc(c,e.getUniformLocation(t,c.name),this)}const r=[],a=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,s=t.length;a!==s;++a){const c=t[a],l=n[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&n.push(s)}return n}}function qs(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}let zc=0;const js=new Ue;function Ys(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const s=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+(function(c,l){const o=c.split(`
`),u=[],p=Math.max(l-6,0),h=Math.min(l+6,o.length);for(let d=p;d<h;d++){const _=d+1;u.push(`${_===l?">":" "} ${_}: ${o[d]}`)}return u.join(`
`)})(i.getShaderSource(e),s)}return r}function Hc(i,e){const t=(function(n){Ve._getMatrix(js,Ve.workingColorSpace,n);const r=`mat3( ${js.elements.map(a=>a.toFixed(4))} )`;switch(Ve.getTransfer(n)){case Wi:return[r,"LinearTransferOETF"];case Ye:return[r,"sRGBTransferOETF"];default:return Te("WebGLProgram: Unsupported color space: ",n),[r,"LinearTransferOETF"]}})(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Vc={1:"Linear",2:"Reinhard",3:"Cineon",4:"ACESFilmic",6:"AgX",7:"Neutral",5:"Custom"};function Gc(i,e){const t=Vc[e];return t===void 0?(Te("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const gr=new U;function kc(){return Ve.getLuminanceCoefficients(gr),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${gr.x.toFixed(4)}, ${gr.y.toFixed(4)}, ${gr.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fi(i){return i!==""}function $s(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ks(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Wc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ma(i){return i.replace(Wc,qc)}const Xc=new Map;function qc(i,e){let t=De[e];if(t===void 0){const n=Xc.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=De[n],Te('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Ma(t)}const jc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zs(i){return i.replace(jc,Yc)}function Yc(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Js(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const $c={1:"SHADOWMAP_TYPE_PCF",3:"SHADOWMAP_TYPE_VSM"},Kc={301:"ENVMAP_TYPE_CUBE",302:"ENVMAP_TYPE_CUBE",306:"ENVMAP_TYPE_CUBE_UV"},Zc={302:"ENVMAP_MODE_REFRACTION"},Jc={0:"ENVMAP_BLENDING_MULTIPLY",1:"ENVMAP_BLENDING_MIX",2:"ENVMAP_BLENDING_ADD"};function Qc(i,e,t,n){const r=i.getContext(),a=t.defines;let s=t.vertexShader,c=t.fragmentShader;const l=(function(k){return $c[k.shadowMapType]||"SHADOWMAP_TYPE_BASIC"})(t),o=(function(k){return k.envMap===!1?"ENVMAP_TYPE_CUBE":Kc[k.envMapMode]||"ENVMAP_TYPE_CUBE"})(t),u=(function(k){return k.envMap===!1?"ENVMAP_MODE_REFLECTION":Zc[k.envMapMode]||"ENVMAP_MODE_REFLECTION"})(t),p=(function(k){return k.envMap===!1?"ENVMAP_BLENDING_NONE":Jc[k.combine]||"ENVMAP_BLENDING_NONE"})(t),h=(function(k){const D=k.envMapCubeUVHeight;if(D===null)return null;const Y=Math.log2(D)-2,W=1/D;return{texelWidth:1/(3*Math.max(Math.pow(2,Y),112)),texelHeight:W,maxMip:Y}})(t),d=(function(k){return[k.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",k.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fi).join(`
`)})(t),_=(function(k){const D=[];for(const Y in k){const W=k[Y];W!==!1&&D.push("#define "+Y+" "+W)}return D.join(`
`)})(a),f=r.createProgram();let y,m,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Fi).join(`
`),y.length>0&&(y+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Fi).join(`
`),m.length>0&&(m+=`
`)):(y=[Js(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fi).join(`
`),m=[Js(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+o:"",t.envMap?"#define "+u:"",t.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?De.tonemapping_pars_fragment:"",t.toneMapping!==0?Gc("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,Hc("linearToOutputTexel",t.outputColorSpace),kc(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fi).join(`
`)),s=Ma(s),s=$s(s,t),s=Ks(s,t),c=Ma(c),c=$s(c,t),c=Ks(c,t),s=Zs(s),c=Zs(c),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,y=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",t.glslVersion===Wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=g+y+s,A=g+m+c,w=qs(r,r.VERTEX_SHADER,E),S=qs(r,r.FRAGMENT_SHADER,A);function R(k){if(i.debug.checkShaderErrors){const D=r.getProgramInfoLog(f)||"",Y=r.getShaderInfoLog(w)||"",W=r.getShaderInfoLog(S)||"",z=D.trim(),$=Y.trim(),H=W.trim();let ne=!0,de=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,f,w,S);else{const Le=Ys(r,w,"vertex"),Me=Ys(r,S,"fragment");ke("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+z+`
`+Le+`
`+Me)}else z!==""?Te("WebGLProgram: Program Info Log:",z):$!==""&&H!==""||(de=!1);de&&(k.diagnostics={runnable:ne,programLog:z,vertexShader:{log:$,prefix:y},fragmentShader:{log:H,prefix:m}})}r.deleteShader(w),r.deleteShader(S),F=new mr(r,f),P=(function(D,Y){const W={},z=D.getProgramParameter(Y,D.ACTIVE_ATTRIBUTES);for(let $=0;$<z;$++){const H=D.getActiveAttrib(Y,$),ne=H.name;let de=1;H.type===D.FLOAT_MAT2&&(de=2),H.type===D.FLOAT_MAT3&&(de=3),H.type===D.FLOAT_MAT4&&(de=4),W[ne]={type:H.type,location:D.getAttribLocation(Y,ne),locationSize:de}}return W})(r,f)}let F,P;r.attachShader(f,w),r.attachShader(f,S),t.index0AttributeName!==void 0?r.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f),this.getUniforms=function(){return F===void 0&&R(this),F},this.getAttributes=function(){return P===void 0&&R(this),P};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(f,37297)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zc++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=w,this.fragmentShader=S,this}let eu=0;class tu{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new nu(e),t.set(e,n)),n}}class nu{constructor(e){this.id=eu++,this.code=e,this.usedTimes=0}}function iu(i,e,t,n,r,a){const s=new zr,c=new tu,l=new Set,o=[],u=new Map,p=n.logarithmicDepthBuffer;let h=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,y,m,g,E,A){const w=g.fog,S=E.geometry,R=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?g.environment:null,F=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,P=e.get(f.envMap||R,F),L=P&&P.mapping===306?P.image.height:null,k=d[f.type];f.precision!==null&&(h=n.getMaxPrecision(f.precision),h!==f.precision&&Te("WebGLProgram.getParameters:",f.precision,"not supported, using",h,"instead."));const D=S.morphAttributes.position||S.morphAttributes.normal||S.morphAttributes.color,Y=D!==void 0?D.length:0;let W,z,$,H,ne=0;if(S.morphAttributes.position!==void 0&&(ne=1),S.morphAttributes.normal!==void 0&&(ne=2),S.morphAttributes.color!==void 0&&(ne=3),k){const Wt=Jt[k];W=Wt.vertexShader,z=Wt.fragmentShader}else{W=f.vertexShader,z=f.fragmentShader;const Wt=c.getVertexShaderStage(f),Gn=c.getFragmentShaderStage(f);c.update(f,Wt,Gn),$=Wt.id,H=Gn.id}const de=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),Me=E.isInstancedMesh===!0,ve=E.isBatchedMesh===!0,te=!!f.map,ce=!!f.matcap,se=!!P,xe=!!f.aoMap,Be=!!f.lightMap,J=!!f.bumpMap&&f.wireframe===!1,T=!!f.normalMap,x=!!f.displacementMap,C=!!f.emissiveMap,V=!!f.metalnessMap,M=!!f.roughnessMap,B=f.anisotropy>0,N=f.clearcoat>0,b=f.dispersion>0,j=f.iridescence>0,Z=f.sheen>0,Q=f.transmission>0,ue=B&&!!f.anisotropyMap,Se=N&&!!f.clearcoatMap,ge=N&&!!f.clearcoatNormalMap,fe=N&&!!f.clearcoatRoughnessMap,Ce=j&&!!f.iridescenceMap,ee=j&&!!f.iridescenceThicknessMap,ae=Z&&!!f.sheenColorMap,ie=Z&&!!f.sheenRoughnessMap,he=!!f.specularMap,Ze=!!f.specularColorMap,je=!!f.specularIntensityMap,ot=Q&&!!f.transmissionMap,bt=Q&&!!f.thicknessMap,_e=!!f.gradientMap,$e=!!f.alphaMap,Oe=f.alphaTest>0,xt=!!f.alphaHash,Je=!!f.extensions;let ft=0;f.toneMapped&&(de!==null&&de.isXRRenderTarget!==!0||(ft=i.toneMapping));const rt={shaderID:k,shaderType:f.type,shaderName:f.name,vertexShader:W,fragmentShader:z,defines:f.defines,customVertexShaderID:$,customFragmentShaderID:H,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:h,batching:ve,batchingColor:ve&&E._colorsTexture!==null,instancing:Me,instancingColor:Me&&E.instanceColor!==null,instancingMorph:Me&&E.morphTexture!==null,outputColorSpace:de===null?i.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Ve.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:te,matcap:ce,envMap:se,envMapMode:se&&P.mapping,envMapCubeUVHeight:L,aoMap:xe,lightMap:Be,bumpMap:J,normalMap:T,displacementMap:x,emissiveMap:C,normalMapObjectSpace:T&&f.normalMapType===1,normalMapTangentSpace:T&&f.normalMapType===0,packedNormalMap:T&&f.normalMapType===0&&(Ot=f.normalMap.format,Ot===1030||Ot===37490||Ot===36285),metalnessMap:V,roughnessMap:M,anisotropy:B,anisotropyMap:ue,clearcoat:N,clearcoatMap:Se,clearcoatNormalMap:ge,clearcoatRoughnessMap:fe,dispersion:b,iridescence:j,iridescenceMap:Ce,iridescenceThicknessMap:ee,sheen:Z,sheenColorMap:ae,sheenRoughnessMap:ie,specularMap:he,specularColorMap:Ze,specularIntensityMap:je,transmission:Q,transmissionMap:ot,thicknessMap:bt,gradientMap:_e,opaque:f.transparent===!1&&f.blending===1&&f.alphaToCoverage===!1,alphaMap:$e,alphaTest:Oe,alphaHash:xt,combine:f.combine,mapUv:te&&_(f.map.channel),aoMapUv:xe&&_(f.aoMap.channel),lightMapUv:Be&&_(f.lightMap.channel),bumpMapUv:J&&_(f.bumpMap.channel),normalMapUv:T&&_(f.normalMap.channel),displacementMapUv:x&&_(f.displacementMap.channel),emissiveMapUv:C&&_(f.emissiveMap.channel),metalnessMapUv:V&&_(f.metalnessMap.channel),roughnessMapUv:M&&_(f.roughnessMap.channel),anisotropyMapUv:ue&&_(f.anisotropyMap.channel),clearcoatMapUv:Se&&_(f.clearcoatMap.channel),clearcoatNormalMapUv:ge&&_(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&_(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&_(f.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&_(f.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&_(f.sheenColorMap.channel),sheenRoughnessMapUv:ie&&_(f.sheenRoughnessMap.channel),specularMapUv:he&&_(f.specularMap.channel),specularColorMapUv:Ze&&_(f.specularColorMap.channel),specularIntensityMapUv:je&&_(f.specularIntensityMap.channel),transmissionMapUv:ot&&_(f.transmissionMap.channel),thicknessMapUv:bt&&_(f.thicknessMap.channel),alphaMapUv:$e&&_(f.alphaMap.channel),vertexTangents:!!S.attributes.tangent&&(T||B),vertexNormals:!!S.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!S.attributes.color&&S.attributes.color.itemSize===4,pointsUvs:E.isPoints===!0&&!!S.attributes.uv&&(te||$e),fog:!!w,useFog:f.fog===!0,fogExp2:!!w&&w.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||S.attributes.normal===void 0&&T===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Le,skinning:E.isSkinnedMesh===!0,hasPositionAttribute:S.attributes.position!==void 0,morphTargets:S.morphAttributes.position!==void 0,morphNormals:S.morphAttributes.normal!==void 0,morphColors:S.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:ne,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:A.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&m.length>0,shadowMapType:i.shadowMap.type,toneMapping:ft,decodeVideoTexture:te&&f.map.isVideoTexture===!0&&Ve.getTransfer(f.map.colorSpace)===Ye,decodeVideoTextureEmissive:C&&f.emissiveMap.isVideoTexture===!0&&Ve.getTransfer(f.emissiveMap.colorSpace)===Ye,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===2,flipSided:f.side===1,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Je&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&f.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};var Ot;return rt.vertexUv1s=l.has(1),rt.vertexUv2s=l.has(2),rt.vertexUv3s=l.has(3),l.clear(),rt},getProgramCacheKey:function(f){const y=[];if(f.shaderID?y.push(f.shaderID):(y.push(f.customVertexShaderID),y.push(f.customFragmentShaderID)),f.defines!==void 0)for(const m in f.defines)y.push(m),y.push(f.defines[m]);return f.isRawShaderMaterial===!1&&((function(m,g){m.push(g.precision),m.push(g.outputColorSpace),m.push(g.envMapMode),m.push(g.envMapCubeUVHeight),m.push(g.mapUv),m.push(g.alphaMapUv),m.push(g.lightMapUv),m.push(g.aoMapUv),m.push(g.bumpMapUv),m.push(g.normalMapUv),m.push(g.displacementMapUv),m.push(g.emissiveMapUv),m.push(g.metalnessMapUv),m.push(g.roughnessMapUv),m.push(g.anisotropyMapUv),m.push(g.clearcoatMapUv),m.push(g.clearcoatNormalMapUv),m.push(g.clearcoatRoughnessMapUv),m.push(g.iridescenceMapUv),m.push(g.iridescenceThicknessMapUv),m.push(g.sheenColorMapUv),m.push(g.sheenRoughnessMapUv),m.push(g.specularMapUv),m.push(g.specularColorMapUv),m.push(g.specularIntensityMapUv),m.push(g.transmissionMapUv),m.push(g.thicknessMapUv),m.push(g.combine),m.push(g.fogExp2),m.push(g.sizeAttenuation),m.push(g.morphTargetsCount),m.push(g.morphAttributeCount),m.push(g.numDirLights),m.push(g.numPointLights),m.push(g.numSpotLights),m.push(g.numSpotLightMaps),m.push(g.numHemiLights),m.push(g.numRectAreaLights),m.push(g.numDirLightShadows),m.push(g.numPointLightShadows),m.push(g.numSpotLightShadows),m.push(g.numSpotLightShadowsWithMaps),m.push(g.numLightProbes),m.push(g.shadowMapType),m.push(g.toneMapping),m.push(g.numClippingPlanes),m.push(g.numClipIntersection),m.push(g.depthPacking)})(y,f),(function(m,g){s.disableAll(),g.instancing&&s.enable(0),g.instancingColor&&s.enable(1),g.instancingMorph&&s.enable(2),g.matcap&&s.enable(3),g.envMap&&s.enable(4),g.normalMapObjectSpace&&s.enable(5),g.normalMapTangentSpace&&s.enable(6),g.clearcoat&&s.enable(7),g.iridescence&&s.enable(8),g.alphaTest&&s.enable(9),g.vertexColors&&s.enable(10),g.vertexAlphas&&s.enable(11),g.vertexUv1s&&s.enable(12),g.vertexUv2s&&s.enable(13),g.vertexUv3s&&s.enable(14),g.vertexTangents&&s.enable(15),g.anisotropy&&s.enable(16),g.alphaHash&&s.enable(17),g.batching&&s.enable(18),g.dispersion&&s.enable(19),g.batchingColor&&s.enable(20),g.gradientMap&&s.enable(21),g.packedNormalMap&&s.enable(22),g.vertexNormals&&s.enable(23),m.push(s.mask),s.disableAll(),g.fog&&s.enable(0),g.useFog&&s.enable(1),g.flatShading&&s.enable(2),g.logarithmicDepthBuffer&&s.enable(3),g.reversedDepthBuffer&&s.enable(4),g.skinning&&s.enable(5),g.morphTargets&&s.enable(6),g.morphNormals&&s.enable(7),g.morphColors&&s.enable(8),g.premultipliedAlpha&&s.enable(9),g.shadowMapEnabled&&s.enable(10),g.doubleSided&&s.enable(11),g.flipSided&&s.enable(12),g.useDepthPacking&&s.enable(13),g.dithering&&s.enable(14),g.transmission&&s.enable(15),g.sheen&&s.enable(16),g.opaque&&s.enable(17),g.pointsUvs&&s.enable(18),g.decodeVideoTexture&&s.enable(19),g.decodeVideoTextureEmissive&&s.enable(20),g.alphaToCoverage&&s.enable(21),g.numLightProbeGrids>0&&s.enable(22),g.hasPositionAttribute&&s.enable(23),m.push(s.mask)})(y,f),y.push(i.outputColorSpace)),y.push(f.customProgramCacheKey),y.join()},getUniforms:function(f){const y=d[f.type];let m;if(y){const g=Jt[y];m=Ml.clone(g.uniforms)}else m=f.uniforms;return m},acquireProgram:function(f,y){let m=u.get(y);return m!==void 0?++m.usedTimes:(m=new Qc(i,y,f,r),o.push(m),u.set(y,m)),m},releaseProgram:function(f){if(--f.usedTimes===0){const y=o.indexOf(f);o[y]=o[o.length-1],o.pop(),u.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:o,dispose:function(){c.dispose()}}}function ru(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function au(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Qs(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function eo(){const i=[];let e=0;const t=[],n=[],r=[];function a(c){let l=0;return c.isInstancedMesh&&(l+=2),c.isSkinnedMesh&&(l+=1),l}function s(c,l,o,u,p,h){let d=i[e];return d===void 0?(d={id:c.id,object:c,geometry:l,material:o,materialVariant:a(c),groupOrder:u,renderOrder:c.renderOrder,z:p,group:h},i[e]=d):(d.id=c.id,d.object=c,d.geometry=l,d.material=o,d.materialVariant=a(c),d.groupOrder=u,d.renderOrder=c.renderOrder,d.z=p,d.group=h),e++,d}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(c,l,o,u,p,h){const d=s(c,l,o,u,p,h);o.transmission>0?n.push(d):o.transparent===!0?r.push(d):t.push(d)},unshift:function(c,l,o,u,p,h){const d=s(c,l,o,u,p,h);o.transmission>0?n.unshift(d):o.transparent===!0?r.unshift(d):t.unshift(d)},finish:function(){for(let c=e,l=i.length;c<l;c++){const o=i[c];if(o.id===null)break;o.id=null,o.object=null,o.geometry=null,o.material=null,o.group=null}},sort:function(c,l,o){t.length>1&&t.sort(c||au),n.length>1&&n.sort(l||Qs),r.length>1&&r.sort(l||Qs),o&&(t.reverse(),n.reverse(),r.reverse())}}}function su(){let i=new WeakMap;return{get:function(e,t){const n=i.get(e);let r;return n===void 0?(r=new eo,i.set(e,[r])):t>=n.length?(r=new eo,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function ou(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new be};break;case"SpotLight":t={position:new U,direction:new U,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new U,halfWidth:new U,halfHeight:new U}}return i[e.id]=t,t}}}let lu=0;function cu(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function uu(i){const e=new ou,t=(function(){const c={};return{get:function(l){if(c[l.id]!==void 0)return c[l.id];let o;switch(l.type){case"DirectionalLight":case"SpotLight":o={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":o={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3}}return c[l.id]=o,o}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const r=new U,a=new Fe,s=new Fe;return{setup:function(c){let l=0,o=0,u=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let p=0,h=0,d=0,_=0,f=0,y=0,m=0,g=0,E=0,A=0,w=0;c.sort(cu);for(let R=0,F=c.length;R<F;R++){const P=c[R],L=P.color,k=P.intensity,D=P.distance;let Y=null;if(P.shadow&&P.shadow.map&&(Y=P.shadow.map.texture.format===1030?P.shadow.map.texture:P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)l+=L.r*k,o+=L.g*k,u+=L.b*k;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],k);w++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const z=P.shadow,$=t.get(P);$.shadowIntensity=z.intensity,$.shadowBias=z.bias,$.shadowNormalBias=z.normalBias,$.shadowRadius=z.radius,$.shadowMapSize=z.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=P.shadow.matrix,y++}n.directional[p]=W,p++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(L).multiplyScalar(k),W.distance=D,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[d]=W;const z=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,z.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[d]=z.matrix,P.castShadow){const $=t.get(P);$.shadowIntensity=z.intensity,$.shadowBias=z.bias,$.shadowNormalBias=z.normalBias,$.shadowRadius=z.radius,$.shadowMapSize=z.mapSize,n.spotShadow[d]=$,n.spotShadowMap[d]=Y,g++}d++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(L).multiplyScalar(k),W.halfWidth.set(.5*P.width,0,0),W.halfHeight.set(0,.5*P.height,0),n.rectArea[_]=W,_++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const z=P.shadow,$=t.get(P);$.shadowIntensity=z.intensity,$.shadowBias=z.bias,$.shadowNormalBias=z.normalBias,$.shadowRadius=z.radius,$.shadowMapSize=z.mapSize,$.shadowCameraNear=z.camera.near,$.shadowCameraFar=z.camera.far,n.pointShadow[h]=$,n.pointShadowMap[h]=Y,n.pointShadowMatrix[h]=P.shadow.matrix,m++}n.point[h]=W,h++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(k),W.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[f]=W,f++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=oe.LTC_FLOAT_1,n.rectAreaLTC2=oe.LTC_FLOAT_2):(n.rectAreaLTC1=oe.LTC_HALF_1,n.rectAreaLTC2=oe.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=o,n.ambient[2]=u;const S=n.hash;S.directionalLength===p&&S.pointLength===h&&S.spotLength===d&&S.rectAreaLength===_&&S.hemiLength===f&&S.numDirectionalShadows===y&&S.numPointShadows===m&&S.numSpotShadows===g&&S.numSpotMaps===E&&S.numLightProbes===w||(n.directional.length=p,n.spot.length=d,n.rectArea.length=_,n.point.length=h,n.hemi.length=f,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=m,n.pointShadowMap.length=m,n.spotShadow.length=g,n.spotShadowMap.length=g,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=m,n.spotLightMatrix.length=g+E-A,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=w,S.directionalLength=p,S.pointLength=h,S.spotLength=d,S.rectAreaLength=_,S.hemiLength=f,S.numDirectionalShadows=y,S.numPointShadows=m,S.numSpotShadows=g,S.numSpotMaps=E,S.numLightProbes=w,n.version=lu++)},setupView:function(c,l){let o=0,u=0,p=0,h=0,d=0;const _=l.matrixWorldInverse;for(let f=0,y=c.length;f<y;f++){const m=c[f];if(m.isDirectionalLight){const g=n.directional[o];g.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),g.direction.sub(r),g.direction.transformDirection(_),o++}else if(m.isSpotLight){const g=n.spot[p];g.position.setFromMatrixPosition(m.matrixWorld),g.position.applyMatrix4(_),g.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),g.direction.sub(r),g.direction.transformDirection(_),p++}else if(m.isRectAreaLight){const g=n.rectArea[h];g.position.setFromMatrixPosition(m.matrixWorld),g.position.applyMatrix4(_),s.identity(),a.copy(m.matrixWorld),a.premultiply(_),s.extractRotation(a),g.halfWidth.set(.5*m.width,0,0),g.halfHeight.set(0,.5*m.height,0),g.halfWidth.applyMatrix4(s),g.halfHeight.applyMatrix4(s),h++}else if(m.isPointLight){const g=n.point[u];g.position.setFromMatrixPosition(m.matrixWorld),g.position.applyMatrix4(_),u++}else if(m.isHemisphereLight){const g=n.hemi[d];g.direction.setFromMatrixPosition(m.matrixWorld),g.direction.transformDirection(_),d++}}},state:n}}function to(i){const e=new uu(i),t=[],n=[],r=[],a={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(s){a.camera=s,t.length=0,n.length=0,r.length=0},state:a,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)},pushLightProbeGrid:function(s){r.push(s)}}}function hu(i){let e=new WeakMap;return{get:function(t,n=0){const r=e.get(t);let a;return r===void 0?(a=new to(i),e.set(t,[a])):n>=r.length?(a=new to(i),r.push(a)):a=r[n],a},dispose:function(){e=new WeakMap}}}const du=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],pu=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],no=new Fe,Bi=new U,Sa=new U;function fu(i,e,t){let n=new aa;const r=new Ne,a=new Ne,s=new at,c=new El,l=new Tl,o={},u=t.maxTextureSize,p={0:1,1:0,2:2},h=new kt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const _=new Ut;_.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const f=new Nt(_,h),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let m=this.type;function g(S,R){const F=e.update(f);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Yt(r.x,r.y,{format:1030,type:1016})),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(R,null,F,h,f,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(R,null,F,d,f,null)}function E(S,R,F,P){let L=null;const k=F.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(k!==void 0)L=k;else if(L=F.isPointLight===!0?l:c,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const D=L.uuid,Y=R.uuid;let W=o[D];W===void 0&&(W={},o[D]=W);let z=W[Y];z===void 0&&(z=L.clone(),W[Y]=z,R.addEventListener("dispose",w)),L=z}return L.visible=R.visible,L.wireframe=R.wireframe,L.side=P===3?R.shadowSide!==null?R.shadowSide:R.side:R.shadowSide!==null?R.shadowSide:p[R.side],L.alphaMap=R.alphaMap,L.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,L.map=R.map,L.clipShadows=R.clipShadows,L.clippingPlanes=R.clippingPlanes,L.clipIntersection=R.clipIntersection,L.displacementMap=R.displacementMap,L.displacementScale=R.displacementScale,L.displacementBias=R.displacementBias,L.wireframeLinewidth=R.wireframeLinewidth,L.linewidth=R.linewidth,F.isPointLight===!0&&L.isMeshDistanceMaterial===!0&&(i.properties.get(L).light=F),L}function A(S,R,F,P,L){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&L===3)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,S.matrixWorld);const D=e.update(S),Y=S.material;if(Array.isArray(Y)){const W=D.groups;for(let z=0,$=W.length;z<$;z++){const H=W[z],ne=Y[H.materialIndex];if(ne&&ne.visible){const de=E(S,ne,P,L);S.onBeforeShadow(i,S,R,F,D,de,H),i.renderBufferDirect(F,null,D,de,S,H),S.onAfterShadow(i,S,R,F,D,de,H)}}}else if(Y.visible){const W=E(S,Y,P,L);S.onBeforeShadow(i,S,R,F,D,W,null),i.renderBufferDirect(F,null,D,W,S,null),S.onAfterShadow(i,S,R,F,D,W,null)}}const k=S.children;for(let D=0,Y=k.length;D<Y;D++)A(k[D],R,F,P,L)}function w(S){S.target.removeEventListener("dispose",w);for(const R in o){const F=o[R],P=S.target.uuid;P in F&&(F[P].dispose(),delete F[P])}}this.render=function(S,R,F){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||S.length===0)return;this.type===2&&(Te("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=1);const P=i.getRenderTarget(),L=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),D=i.state;D.setBlending(0),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const Y=m!==this.type;Y&&R.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(z=>z.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,z=S.length;W<z;W++){const $=S[W],H=$.shadow;if(H===void 0){Te("WebGLShadowMap:",$,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ne=H.getFrameExtents();r.multiply(ne),a.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/ne.x),r.x=a.x*ne.x,H.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/ne.y),r.y=a.y*ne.y,H.mapSize.y=a.y));const de=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=de,H.map===null||Y===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===3){if($.isPointLight){Te("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Yt(r.x,r.y,{format:1030,type:1016,minFilter:1006,magFilter:1006,generateMipmaps:!1}),H.map.texture.name=$.name+".shadowMap",H.map.depthTexture=new ai(r.x,r.y,1015),H.map.depthTexture.name=$.name+".shadowMapDepth",H.map.depthTexture.format=1026,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=1003,H.map.depthTexture.magFilter=1003}else $.isPointLight?(H.map=new Ns(r.x),H.map.depthTexture=new xl(r.x,1014)):(H.map=new Yt(r.x,r.y),H.map.depthTexture=new ai(r.x,r.y,1014)),H.map.depthTexture.name=$.name+".shadowMap",H.map.depthTexture.format=1026,this.type===1?(H.map.depthTexture.compareFunction=de?518:515,H.map.depthTexture.minFilter=1006,H.map.depthTexture.magFilter=1006):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=1003,H.map.depthTexture.magFilter=1003);H.camera.updateProjectionMatrix()}const Le=H.map.isWebGLCubeRenderTarget?6:1;for(let Me=0;Me<Le;Me++){if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,Me),i.clear();else{Me===0&&(i.setRenderTarget(H.map),i.clear());const ve=H.getViewport(Me);s.set(a.x*ve.x,a.y*ve.y,a.x*ve.z,a.y*ve.w),D.viewport(s)}if($.isPointLight){const ve=H.camera,te=H.matrix,ce=$.distance||ve.far;ce!==ve.far&&(ve.far=ce,ve.updateProjectionMatrix()),Bi.setFromMatrixPosition($.matrixWorld),ve.position.copy(Bi),Sa.copy(ve.position),Sa.add(du[Me]),ve.up.copy(pu[Me]),ve.lookAt(Sa),ve.updateMatrixWorld(),te.makeTranslation(-Bi.x,-Bi.y,-Bi.z),no.multiplyMatrices(ve.projectionMatrix,ve.matrixWorldInverse),H._frustum.setFromProjectionMatrix(no,ve.coordinateSystem,ve.reversedDepth)}else H.updateMatrices($);n=H.getFrustum(),A(R,F,H.camera,$,this.type)}H.isPointLightShadow!==!0&&this.type===3&&g(H,F),H.needsUpdate=!1}m=this.type,y.needsUpdate=!1,i.setRenderTarget(P,L,k)}}function mu(i,e){const t=new function(){let M=!1;const B=new at;let N=null;const b=new at(0,0,0,0);return{setMask:function(j){N===j||M||(i.colorMask(j,j,j,j),N=j)},setLocked:function(j){M=j},setClear:function(j,Z,Q,ue,Se){Se===!0&&(j*=ue,Z*=ue,Q*=ue),B.set(j,Z,Q,ue),b.equals(B)===!1&&(i.clearColor(j,Z,Q,ue),b.copy(B))},reset:function(){M=!1,N=null,b.set(-1,0,0,0)}}},n=new function(){let M=!1,B=!1,N=null,b=null,j=null;return{setReversed:function(Z){if(B!==Z){const Q=e.get("EXT_clip_control");Z?Q.clipControlEXT(Q.LOWER_LEFT_EXT,Q.ZERO_TO_ONE_EXT):Q.clipControlEXT(Q.LOWER_LEFT_EXT,Q.NEGATIVE_ONE_TO_ONE_EXT),B=Z;const ue=j;j=null,this.setClear(ue)}},getReversed:function(){return B},setTest:function(Z){Z?se(i.DEPTH_TEST):xe(i.DEPTH_TEST)},setMask:function(Z){N===Z||M||(i.depthMask(Z),N=Z)},setFunc:function(Z){if(B&&(Z=jo[Z]),b!==Z){switch(Z){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}b=Z}},setLocked:function(Z){M=Z},setClear:function(Z){j!==Z&&(j=Z,B&&(Z=1-Z),i.clearDepth(Z))},reset:function(){M=!1,N=null,b=null,j=null,B=!1}}},r=new function(){let M=!1,B=null,N=null,b=null,j=null,Z=null,Q=null,ue=null,Se=null;return{setTest:function(ge){M||(ge?se(i.STENCIL_TEST):xe(i.STENCIL_TEST))},setMask:function(ge){B===ge||M||(i.stencilMask(ge),B=ge)},setFunc:function(ge,fe,Ce){N===ge&&b===fe&&j===Ce||(i.stencilFunc(ge,fe,Ce),N=ge,b=fe,j=Ce)},setOp:function(ge,fe,Ce){Z===ge&&Q===fe&&ue===Ce||(i.stencilOp(ge,fe,Ce),Z=ge,Q=fe,ue=Ce)},setLocked:function(ge){M=ge},setClear:function(ge){Se!==ge&&(i.clearStencil(ge),Se=ge)},reset:function(){M=!1,B=null,N=null,b=null,j=null,Z=null,Q=null,ue=null,Se=null}}},a=new WeakMap,s=new WeakMap;let c={},l={},o={},u=new WeakMap,p=[],h=null,d=!1,_=null,f=null,y=null,m=null,g=null,E=null,A=null,w=new be(0,0,0),S=0,R=!1,F=null,P=null,L=null,k=null,D=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,z=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec($)[1]),W=z>=1):$.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),W=z>=2);let H=null,ne={};const de=i.getParameter(i.SCISSOR_BOX),Le=i.getParameter(i.VIEWPORT),Me=new at().fromArray(de),ve=new at().fromArray(Le);function te(M,B,N,b){const j=new Uint8Array(4),Z=i.createTexture();i.bindTexture(M,Z),i.texParameteri(M,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(M,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Q=0;Q<N;Q++)M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY?i.texImage3D(B,0,i.RGBA,1,1,b,0,i.RGBA,i.UNSIGNED_BYTE,j):i.texImage2D(B+Q,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,j);return Z}const ce={};function se(M){c[M]!==!0&&(i.enable(M),c[M]=!0)}function xe(M){c[M]!==!1&&(i.disable(M),c[M]=!1)}ce[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),ce[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ce[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),se(i.DEPTH_TEST),n.setFunc(3),x(!1),C(1),se(i.CULL_FACE),T(0);const Be={100:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};Be[103]=i.MIN,Be[104]=i.MAX;const J={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,204:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,205:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function T(M,B,N,b,j,Z,Q,ue,Se,ge){if(M!==0){if(d===!1&&(se(i.BLEND),d=!0),M===5)j=j||B,Z=Z||N,Q=Q||b,B===f&&j===g||(i.blendEquationSeparate(Be[B],Be[j]),f=B,g=j),N===y&&b===m&&Z===E&&Q===A||(i.blendFuncSeparate(J[N],J[b],J[Z],J[Q]),y=N,m=b,E=Z,A=Q),ue.equals(w)!==!1&&Se===S||(i.blendColor(ue.r,ue.g,ue.b,Se),w.copy(ue),S=Se),_=M,R=!1;else if(M!==_||ge!==R){if(f===100&&g===100||(i.blendEquation(i.FUNC_ADD),f=100,g=100),ge)switch(M){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ke("WebGLState: Invalid blending: ",M)}else switch(M){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case 3:ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case 4:ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ke("WebGLState: Invalid blending: ",M)}y=null,m=null,E=null,A=null,w.set(0,0,0),S=0,_=M,R=ge}}else d===!0&&(xe(i.BLEND),d=!1)}function x(M){F!==M&&(M?i.frontFace(i.CW):i.frontFace(i.CCW),F=M)}function C(M){M!==0?(se(i.CULL_FACE),M!==P&&(M===1?i.cullFace(i.BACK):M===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xe(i.CULL_FACE),P=M}function V(M,B,N){M?(se(i.POLYGON_OFFSET_FILL),k===B&&D===N||(k=B,D=N,n.getReversed()&&(B=-B),i.polygonOffset(B,N))):xe(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:se,disable:xe,bindFramebuffer:function(M,B){return o[M]!==B&&(i.bindFramebuffer(M,B),o[M]=B,M===i.DRAW_FRAMEBUFFER&&(o[i.FRAMEBUFFER]=B),M===i.FRAMEBUFFER&&(o[i.DRAW_FRAMEBUFFER]=B),!0)},drawBuffers:function(M,B){let N=p,b=!1;if(M){N=u.get(B),N===void 0&&(N=[],u.set(B,N));const j=M.textures;if(N.length!==j.length||N[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,Q=j.length;Z<Q;Z++)N[Z]=i.COLOR_ATTACHMENT0+Z;N.length=j.length,b=!0}}else N[0]!==i.BACK&&(N[0]=i.BACK,b=!0);b&&i.drawBuffers(N)},useProgram:function(M){return h!==M&&(i.useProgram(M),h=M,!0)},setBlending:T,setMaterial:function(M,B){M.side===2?xe(i.CULL_FACE):se(i.CULL_FACE);let N=M.side===1;B&&(N=!N),x(N),M.blending===1&&M.transparent===!1?T(0):T(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),n.setFunc(M.depthFunc),n.setTest(M.depthTest),n.setMask(M.depthWrite),t.setMask(M.colorWrite);const b=M.stencilWrite;r.setTest(b),b&&(r.setMask(M.stencilWriteMask),r.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),r.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),V(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):xe(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:x,setCullFace:C,setLineWidth:function(M){M!==L&&(W&&i.lineWidth(M),L=M)},setPolygonOffset:V,setScissorTest:function(M){M?se(i.SCISSOR_TEST):xe(i.SCISSOR_TEST)},activeTexture:function(M){M===void 0&&(M=i.TEXTURE0+Y-1),H!==M&&(i.activeTexture(M),H=M)},bindTexture:function(M,B,N){N===void 0&&(N=H===null?i.TEXTURE0+Y-1:H);let b=ne[N];b===void 0&&(b={type:void 0,texture:void 0},ne[N]=b),b.type===M&&b.texture===B||(H!==N&&(i.activeTexture(N),H=N),i.bindTexture(M,B||ce[M]),b.type=M,b.texture=B)},unbindTexture:function(){const M=ne[H];M!==void 0&&M.type!==void 0&&(i.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(M){ke("WebGLState:",M)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(M){ke("WebGLState:",M)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(M){ke("WebGLState:",M)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(M){ke("WebGLState:",M)}},pixelStorei:function(M,B){l[M]!==B&&(i.pixelStorei(M,B),l[M]=B)},getParameter:function(M){return l[M]!==void 0?l[M]:i.getParameter(M)},updateUBOMapping:function(M,B){let N=s.get(B);N===void 0&&(N=new WeakMap,s.set(B,N));let b=N.get(M);b===void 0&&(b=i.getUniformBlockIndex(B,M.name),N.set(M,b))},uniformBlockBinding:function(M,B){const N=s.get(B).get(M);a.get(B)!==N&&(i.uniformBlockBinding(B,N,M.__bindingPointIndex),a.set(B,N))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(M){ke("WebGLState:",M)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(M){ke("WebGLState:",M)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(M){ke("WebGLState:",M)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(M){ke("WebGLState:",M)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(M){ke("WebGLState:",M)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(M){ke("WebGLState:",M)}},scissor:function(M){Me.equals(M)===!1&&(i.scissor(M.x,M.y,M.z,M.w),Me.copy(M))},viewport:function(M){ve.equals(M)===!1&&(i.viewport(M.x,M.y,M.z,M.w),ve.copy(M))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),c={},l={},H=null,ne={},o={},u=new WeakMap,p=[],h=null,d=!1,_=null,f=null,y=null,m=null,g=null,E=null,A=null,w=new be(0,0,0),S=0,R=!1,F=null,P=null,L=null,k=null,D=null,Me.set(0,0,i.canvas.width,i.canvas.height),ve.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function gu(i,e,t,n,r,a,s){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),o=new Ne,u=new WeakMap,p=new Set;let h;const d=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(T,x){return _?new OffscreenCanvas(T,x):Xi("canvas")}function y(T,x,C){let V=1;const M=J(T);if((M.width>C||M.height>C)&&(V=C/Math.max(M.width,M.height)),V<1){if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const B=Math.floor(V*M.width),N=Math.floor(V*M.height);h===void 0&&(h=f(B,N));const b=x?f(B,N):h;return b.width=B,b.height=N,b.getContext("2d").drawImage(T,0,0,B,N),Te("WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+B+"x"+N+")."),b}return"data"in T&&Te("WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),T}return T}function m(T){return T.generateMipmaps}function g(T){i.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(T,x,C,V,M,B=!1){if(T!==null){if(i[T]!==void 0)return i[T];Te("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let N;V&&(N=e.get("EXT_texture_norm16"),N||Te("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let b=x;if(x===i.RED&&(C===i.FLOAT&&(b=i.R32F),C===i.HALF_FLOAT&&(b=i.R16F),C===i.UNSIGNED_BYTE&&(b=i.R8),C===i.UNSIGNED_SHORT&&N&&(b=N.R16_EXT),C===i.SHORT&&N&&(b=N.R16_SNORM_EXT)),x===i.RED_INTEGER&&(C===i.UNSIGNED_BYTE&&(b=i.R8UI),C===i.UNSIGNED_SHORT&&(b=i.R16UI),C===i.UNSIGNED_INT&&(b=i.R32UI),C===i.BYTE&&(b=i.R8I),C===i.SHORT&&(b=i.R16I),C===i.INT&&(b=i.R32I)),x===i.RG&&(C===i.FLOAT&&(b=i.RG32F),C===i.HALF_FLOAT&&(b=i.RG16F),C===i.UNSIGNED_BYTE&&(b=i.RG8),C===i.UNSIGNED_SHORT&&N&&(b=N.RG16_EXT),C===i.SHORT&&N&&(b=N.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(C===i.UNSIGNED_BYTE&&(b=i.RG8UI),C===i.UNSIGNED_SHORT&&(b=i.RG16UI),C===i.UNSIGNED_INT&&(b=i.RG32UI),C===i.BYTE&&(b=i.RG8I),C===i.SHORT&&(b=i.RG16I),C===i.INT&&(b=i.RG32I)),x===i.RGB_INTEGER&&(C===i.UNSIGNED_BYTE&&(b=i.RGB8UI),C===i.UNSIGNED_SHORT&&(b=i.RGB16UI),C===i.UNSIGNED_INT&&(b=i.RGB32UI),C===i.BYTE&&(b=i.RGB8I),C===i.SHORT&&(b=i.RGB16I),C===i.INT&&(b=i.RGB32I)),x===i.RGBA_INTEGER&&(C===i.UNSIGNED_BYTE&&(b=i.RGBA8UI),C===i.UNSIGNED_SHORT&&(b=i.RGBA16UI),C===i.UNSIGNED_INT&&(b=i.RGBA32UI),C===i.BYTE&&(b=i.RGBA8I),C===i.SHORT&&(b=i.RGBA16I),C===i.INT&&(b=i.RGBA32I)),x===i.RGB&&(C===i.UNSIGNED_SHORT&&N&&(b=N.RGB16_EXT),C===i.SHORT&&N&&(b=N.RGB16_SNORM_EXT),C===i.UNSIGNED_INT_5_9_9_9_REV&&(b=i.RGB9_E5),C===i.UNSIGNED_INT_10F_11F_11F_REV&&(b=i.R11F_G11F_B10F)),x===i.RGBA){const j=B?Wi:Ve.getTransfer(M);C===i.FLOAT&&(b=i.RGBA32F),C===i.HALF_FLOAT&&(b=i.RGBA16F),C===i.UNSIGNED_BYTE&&(b=j===Ye?i.SRGB8_ALPHA8:i.RGBA8),C===i.UNSIGNED_SHORT&&N&&(b=N.RGBA16_EXT),C===i.SHORT&&N&&(b=N.RGBA16_SNORM_EXT),C===i.UNSIGNED_SHORT_4_4_4_4&&(b=i.RGBA4),C===i.UNSIGNED_SHORT_5_5_5_1&&(b=i.RGB5_A1)}return b!==i.R16F&&b!==i.R32F&&b!==i.RG16F&&b!==i.RG32F&&b!==i.RGBA16F&&b!==i.RGBA32F||e.get("EXT_color_buffer_float"),b}function w(T,x){let C;return T?x===null||x===1014||x===1020?C=i.DEPTH24_STENCIL8:x===1015?C=i.DEPTH32F_STENCIL8:x===1012&&(C=i.DEPTH24_STENCIL8,Te("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===1014||x===1020?C=i.DEPTH_COMPONENT24:x===1015?C=i.DEPTH_COMPONENT32F:x===1012&&(C=i.DEPTH_COMPONENT16),C}function S(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==1003&&T.minFilter!==1006?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function R(T){const x=T.target;x.removeEventListener("dispose",R),(function(C){const V=n.get(C);if(V.__webglInit===void 0)return;const M=C.source,B=d.get(M);if(B){const N=B[V.__cacheKey];N.usedTimes--,N.usedTimes===0&&P(C),Object.keys(B).length===0&&d.delete(M)}n.remove(C)})(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&p.delete(x)}function F(T){const x=T.target;x.removeEventListener("dispose",F),(function(C){const V=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(V.__webglFramebuffer[B]))for(let N=0;N<V.__webglFramebuffer[B].length;N++)i.deleteFramebuffer(V.__webglFramebuffer[B][N]);else i.deleteFramebuffer(V.__webglFramebuffer[B]);V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer[B])}else{if(Array.isArray(V.__webglFramebuffer))for(let B=0;B<V.__webglFramebuffer.length;B++)i.deleteFramebuffer(V.__webglFramebuffer[B]);else i.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&i.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let B=0;B<V.__webglColorRenderbuffer.length;B++)V.__webglColorRenderbuffer[B]&&i.deleteRenderbuffer(V.__webglColorRenderbuffer[B]);V.__webglDepthRenderbuffer&&i.deleteRenderbuffer(V.__webglDepthRenderbuffer)}const M=C.textures;for(let B=0,N=M.length;B<N;B++){const b=n.get(M[B]);b.__webglTexture&&(i.deleteTexture(b.__webglTexture),s.memory.textures--),n.remove(M[B])}n.remove(C)})(x)}function P(T){const x=n.get(T);i.deleteTexture(x.__webglTexture);const C=T.source;delete d.get(C)[x.__cacheKey],s.memory.textures--}let L=0;function k(T,x){const C=n.get(T);if(T.isVideoTexture&&(function(V){const M=s.render.frame;u.get(V)!==M&&(u.set(V,M),V.update())})(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&C.__version!==T.version){const V=T.image;if(V===null)Te("WebGLRenderer: Texture marked for update but no image data found.");else{if(V.complete!==!1)return void ne(C,T,x);Te("WebGLRenderer: Texture marked for update but image is incomplete")}}else T.isExternalTexture&&(C.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,C.__webglTexture,i.TEXTURE0+x)}const D={1e3:i.REPEAT,1001:i.CLAMP_TO_EDGE,1002:i.MIRRORED_REPEAT},Y={1003:i.NEAREST,1004:i.NEAREST_MIPMAP_NEAREST,1005:i.NEAREST_MIPMAP_LINEAR,1006:i.LINEAR,1007:i.LINEAR_MIPMAP_NEAREST,1008:i.LINEAR_MIPMAP_LINEAR},W={512:i.NEVER,519:i.ALWAYS,513:i.LESS,515:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function z(T,x){if(x.type!==1015||e.has("OES_texture_float_linear")!==!1||x.magFilter!==1006&&x.magFilter!==1007&&x.magFilter!==1005&&x.magFilter!==1008&&x.minFilter!==1006&&x.minFilter!==1007&&x.minFilter!==1005&&x.minFilter!==1008||Te("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,D[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,D[x.wrapT]),T!==i.TEXTURE_3D&&T!==i.TEXTURE_2D_ARRAY||i.texParameteri(T,i.TEXTURE_WRAP_R,D[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Y[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Y[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,W[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===1003||x.minFilter!==1005&&x.minFilter!==1008||x.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const C=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function $(T,x){let C=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",R));const V=x.source;let M=d.get(V);M===void 0&&(M={},d.set(V,M));const B=(function(N){const b=[];return b.push(N.wrapS),b.push(N.wrapT),b.push(N.wrapR||0),b.push(N.magFilter),b.push(N.minFilter),b.push(N.anisotropy),b.push(N.internalFormat),b.push(N.format),b.push(N.type),b.push(N.generateMipmaps),b.push(N.premultiplyAlpha),b.push(N.flipY),b.push(N.unpackAlignment),b.push(N.colorSpace),b.join()})(x);if(B!==T.__cacheKey){M[B]===void 0&&(M[B]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,C=!0),M[B].usedTimes++;const N=M[T.__cacheKey];N!==void 0&&(M[T.__cacheKey].usedTimes--,N.usedTimes===0&&P(x)),T.__cacheKey=B,T.__webglTexture=M[B].texture}return C}function H(T,x,C){return Math.floor(Math.floor(T/C)/x)}function ne(T,x,C){let V=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=i.TEXTURE_3D);const M=$(T,x),B=x.source;t.bindTexture(V,T.__webglTexture,i.TEXTURE0+C);const N=n.get(B);if(B.version!==N.__version||M===!0){if(t.activeTexture(i.TEXTURE0+C),!(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)){const ae=Ve.getPrimaries(Ve.workingColorSpace),ie=x.colorSpace===""?null:Ve.getPrimaries(x.colorSpace),he=x.colorSpace===""||ae===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let b=y(x.image,!1,r.maxTextureSize);b=Be(x,b);const j=a.convert(x.format,x.colorSpace),Z=a.convert(x.type);let Q,ue=A(x.internalFormat,j,Z,x.normalized,x.colorSpace,x.isVideoTexture);z(V,x);const Se=x.mipmaps,ge=x.isVideoTexture!==!0,fe=N.__version===void 0||M===!0,Ce=B.dataReady,ee=S(x,b);if(x.isDepthTexture)ue=w(x.format===1027,x.type),fe&&(ge?t.texStorage2D(i.TEXTURE_2D,1,ue,b.width,b.height):t.texImage2D(i.TEXTURE_2D,0,ue,b.width,b.height,0,j,Z,null));else if(x.isDataTexture)if(Se.length>0){ge&&fe&&t.texStorage2D(i.TEXTURE_2D,ee,ue,Se[0].width,Se[0].height);for(let ae=0,ie=Se.length;ae<ie;ae++)Q=Se[ae],ge?Ce&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Q.width,Q.height,j,Z,Q.data):t.texImage2D(i.TEXTURE_2D,ae,ue,Q.width,Q.height,0,j,Z,Q.data);x.generateMipmaps=!1}else ge?(fe&&t.texStorage2D(i.TEXTURE_2D,ee,ue,b.width,b.height),Ce&&(function(ae,ie,he,Ze){const je=ae.updateRanges;if(je.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,he,Ze,ie.data);else{je.sort((Oe,xt)=>Oe.start-xt.start);let ot=0;for(let Oe=1;Oe<je.length;Oe++){const xt=je[ot],Je=je[Oe],ft=xt.start+xt.count,rt=H(Je.start,ie.width,4),Ot=H(xt.start,ie.width,4);Je.start<=ft+1&&rt===Ot&&H(Je.start+Je.count-1,ie.width,4)===rt?xt.count=Math.max(xt.count,Je.start+Je.count-xt.start):(++ot,je[ot]=Je)}je.length=ot+1;const bt=t.getParameter(i.UNPACK_ROW_LENGTH),_e=t.getParameter(i.UNPACK_SKIP_PIXELS),$e=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,ie.width);for(let Oe=0,xt=je.length;Oe<xt;Oe++){const Je=je[Oe],ft=Math.floor(Je.start/4),rt=Math.ceil(Je.count/4),Ot=ft%ie.width,Wt=Math.floor(ft/ie.width),Gn=rt;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ot),t.pixelStorei(i.UNPACK_SKIP_ROWS,Wt),t.texSubImage2D(i.TEXTURE_2D,0,Ot,Wt,Gn,1,he,Ze,ie.data)}ae.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,bt),t.pixelStorei(i.UNPACK_SKIP_PIXELS,_e),t.pixelStorei(i.UNPACK_SKIP_ROWS,$e)}})(x,b,j,Z)):t.texImage2D(i.TEXTURE_2D,0,ue,b.width,b.height,0,j,Z,b.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ge&&fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ee,ue,Se[0].width,Se[0].height,b.depth);for(let ae=0,ie=Se.length;ae<ie;ae++)if(Q=Se[ae],x.format!==1023)if(j!==null)if(ge){if(Ce)if(x.layerUpdates.size>0){const he=ws(Q.width,Q.height,x.format,x.type);for(const Ze of x.layerUpdates){const je=Q.data.subarray(Ze*he/Q.data.BYTES_PER_ELEMENT,(Ze+1)*he/Q.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,Ze,Q.width,Q.height,1,j,je)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Q.width,Q.height,b.depth,j,Q.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,ue,Q.width,Q.height,b.depth,0,Q.data,0,0);else Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ge?Ce&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Q.width,Q.height,b.depth,j,Z,Q.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,ue,Q.width,Q.height,b.depth,0,j,Z,Q.data)}else{ge&&fe&&t.texStorage2D(i.TEXTURE_2D,ee,ue,Se[0].width,Se[0].height);for(let ae=0,ie=Se.length;ae<ie;ae++)Q=Se[ae],x.format!==1023?j!==null?ge?Ce&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,Q.width,Q.height,j,Q.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,ue,Q.width,Q.height,0,Q.data):Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ge?Ce&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Q.width,Q.height,j,Z,Q.data):t.texImage2D(i.TEXTURE_2D,ae,ue,Q.width,Q.height,0,j,Z,Q.data)}else if(x.isDataArrayTexture)if(ge){if(fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ee,ue,b.width,b.height,b.depth),Ce)if(x.layerUpdates.size>0){const ae=ws(b.width,b.height,x.format,x.type);for(const ie of x.layerUpdates){const he=b.data.subarray(ie*ae/b.data.BYTES_PER_ELEMENT,(ie+1)*ae/b.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ie,b.width,b.height,1,j,Z,he)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,b.width,b.height,b.depth,j,Z,b.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ue,b.width,b.height,b.depth,0,j,Z,b.data);else if(x.isData3DTexture)ge?(fe&&t.texStorage3D(i.TEXTURE_3D,ee,ue,b.width,b.height,b.depth),Ce&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,b.width,b.height,b.depth,j,Z,b.data)):t.texImage3D(i.TEXTURE_3D,0,ue,b.width,b.height,b.depth,0,j,Z,b.data);else if(x.isFramebufferTexture){if(fe)if(ge)t.texStorage2D(i.TEXTURE_2D,ee,ue,b.width,b.height);else{let ae=b.width,ie=b.height;for(let he=0;he<ee;he++)t.texImage2D(i.TEXTURE_2D,he,ue,ae,ie,0,j,Z,null),ae>>=1,ie>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const ae=i.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),b.parentNode!==ae)return ae.appendChild(b),p.add(x),ae.onpaint=ie=>{const he=ie.changedElements;for(const Ze of p)he.includes(Ze.image)&&(Ze.needsUpdate=!0)},void ae.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,b);else{const he=i.RGBA,Ze=i.RGBA,je=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,he,Ze,je,b)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Se.length>0){if(ge&&fe){const ae=J(Se[0]);t.texStorage2D(i.TEXTURE_2D,ee,ue,ae.width,ae.height)}for(let ae=0,ie=Se.length;ae<ie;ae++)Q=Se[ae],ge?Ce&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,j,Z,Q):t.texImage2D(i.TEXTURE_2D,ae,ue,j,Z,Q);x.generateMipmaps=!1}else if(ge){if(fe){const ae=J(b);t.texStorage2D(i.TEXTURE_2D,ee,ue,ae.width,ae.height)}Ce&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,j,Z,b)}else t.texImage2D(i.TEXTURE_2D,0,ue,j,Z,b);m(x)&&g(V),N.__version=B.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function de(T,x,C,V,M,B){const N=a.convert(C.format,C.colorSpace),b=a.convert(C.type),j=A(C.internalFormat,N,b,C.normalized,C.colorSpace),Z=n.get(x),Q=n.get(C);if(Q.__renderTarget=x,!Z.__hasExternalTextures){const ue=Math.max(1,x.width>>B),Se=Math.max(1,x.height>>B);M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY?t.texImage3D(M,B,j,ue,Se,x.depth,0,N,b,null):t.texImage2D(M,B,j,ue,Se,0,N,b,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),xe(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,M,Q.__webglTexture,0,se(x)):(M===i.TEXTURE_2D||M>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&M<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,M,Q.__webglTexture,B),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(T,x,C){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){const V=x.depthTexture,M=V&&V.isDepthTexture?V.type:null,B=w(x.stencilBuffer,M),N=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;xe(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se(x),B,x.width,x.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,se(x),B,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,B,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,N,i.RENDERBUFFER,T)}else{const V=x.textures;for(let M=0;M<V.length;M++){const B=V[M],N=a.convert(B.format,B.colorSpace),b=a.convert(B.type),j=A(B.internalFormat,N,b,B.normalized,B.colorSpace);xe(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se(x),j,x.width,x.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,se(x),j,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,j,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(T,x,C){const V=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!x.depthTexture||!x.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const M=n.get(x.depthTexture);if(M.__renderTarget=x,M.__webglTexture&&x.depthTexture.image.width===x.width&&x.depthTexture.image.height===x.height||(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V){if(M.__webglInit===void 0&&(M.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),M.__webglTexture===void 0){M.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture),z(i.TEXTURE_CUBE_MAP,x.depthTexture);const Z=a.convert(x.depthTexture.format),Q=a.convert(x.depthTexture.type);let ue;x.depthTexture.format===1026?ue=i.DEPTH_COMPONENT24:x.depthTexture.format===1027&&(ue=i.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ue,x.width,x.height,0,Z,Q,null)}}else k(x.depthTexture,0);const B=M.__webglTexture,N=se(x),b=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+C:i.TEXTURE_2D,j=x.depthTexture.format===1027?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===1026)xe(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,b,B,0,N):i.framebufferTexture2D(i.FRAMEBUFFER,j,b,B,0);else{if(x.depthTexture.format!==1027)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");xe(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,b,B,0,N):i.framebufferTexture2D(i.FRAMEBUFFER,j,b,B,0)}}function ve(T){const x=n.get(T),C=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const V=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){const M=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",M)};V.addEventListener("dispose",M),x.__depthDisposeCallback=M}x.__boundDepthTexture=V}if(T.depthTexture&&!x.__autoAllocateDepthBuffer)if(C)for(let V=0;V<6;V++)Me(x.__webglFramebuffer[V],T,V);else{const V=T.texture.mipmaps;V&&V.length>0?Me(x.__webglFramebuffer[0],T,0):Me(x.__webglFramebuffer,T,0)}else if(C){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=i.createRenderbuffer(),Le(x.__webglDepthbuffer[V],T,!1);else{const M=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=x.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,M,i.RENDERBUFFER,B)}}else{const V=T.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Le(x.__webglDepthbuffer,T,!1);else{const M=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,M,i.RENDERBUFFER,B)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}const te=[],ce=[];function se(T){return Math.min(r.maxSamples,T.samples)}function xe(T){const x=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Be(T,x){const C=T.colorSpace,V=T.format,M=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||C!==ki&&C!==""&&(Ve.getTransfer(C)===Ye?V===1023&&M===1009||Te("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ke("WebGLTextures: Unsupported texture color space:",C)),x}function J(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(o.width=T.naturalWidth||T.width,o.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(o.width=T.displayWidth,o.height=T.displayHeight):(o.width=T.width,o.height=T.height),o}this.allocateTextureUnit=function(){const T=L;return T>=r.maxTextures&&Te("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),L+=1,T},this.resetTextureUnits=function(){L=0},this.getTextureUnits=function(){return L},this.setTextureUnits=function(T){L=T},this.setTexture2D=k,this.setTexture2DArray=function(T,x){const C=n.get(T);T.isRenderTargetTexture===!1&&T.version>0&&C.__version!==T.version?ne(C,T,x):(T.isExternalTexture&&(C.__webglTexture=T.sourceTexture?T.sourceTexture:null),t.bindTexture(i.TEXTURE_2D_ARRAY,C.__webglTexture,i.TEXTURE0+x))},this.setTexture3D=function(T,x){const C=n.get(T);T.isRenderTargetTexture===!1&&T.version>0&&C.__version!==T.version?ne(C,T,x):t.bindTexture(i.TEXTURE_3D,C.__webglTexture,i.TEXTURE0+x)},this.setTextureCube=function(T,x){const C=n.get(T);T.isCubeDepthTexture!==!0&&T.version>0&&C.__version!==T.version?(function(V,M,B){if(M.image.length!==6)return;const N=$(V,M),b=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+B);const j=n.get(b);if(b.version!==j.__version||N===!0){t.activeTexture(i.TEXTURE0+B);const Z=Ve.getPrimaries(Ve.workingColorSpace),Q=M.colorSpace===""?null:Ve.getPrimaries(M.colorSpace),ue=M.colorSpace===""||Z===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Se=M.isCompressedTexture||M.image[0].isCompressedTexture,ge=M.image[0]&&M.image[0].isDataTexture,fe=[];for(let _e=0;_e<6;_e++)fe[_e]=Se||ge?ge?M.image[_e].image:M.image[_e]:y(M.image[_e],!0,r.maxCubemapSize),fe[_e]=Be(M,fe[_e]);const Ce=fe[0],ee=a.convert(M.format,M.colorSpace),ae=a.convert(M.type),ie=A(M.internalFormat,ee,ae,M.normalized,M.colorSpace),he=M.isVideoTexture!==!0,Ze=j.__version===void 0||N===!0,je=b.dataReady;let ot,bt=S(M,Ce);if(z(i.TEXTURE_CUBE_MAP,M),Se){he&&Ze&&t.texStorage2D(i.TEXTURE_CUBE_MAP,bt,ie,Ce.width,Ce.height);for(let _e=0;_e<6;_e++){ot=fe[_e].mipmaps;for(let $e=0;$e<ot.length;$e++){const Oe=ot[$e];M.format!==1023?ee!==null?he?je&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e,0,0,Oe.width,Oe.height,ee,Oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e,ie,Oe.width,Oe.height,0,Oe.data):Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):he?je&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e,0,0,Oe.width,Oe.height,ee,ae,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e,ie,Oe.width,Oe.height,0,ee,ae,Oe.data)}}}else{if(ot=M.mipmaps,he&&Ze){ot.length>0&&bt++;const _e=J(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,bt,ie,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(ge){he?je&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,fe[_e].width,fe[_e].height,ee,ae,fe[_e].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ie,fe[_e].width,fe[_e].height,0,ee,ae,fe[_e].data);for(let $e=0;$e<ot.length;$e++){const Oe=ot[$e].image[_e].image;he?je&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e+1,0,0,Oe.width,Oe.height,ee,ae,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e+1,ie,Oe.width,Oe.height,0,ee,ae,Oe.data)}}else{he?je&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,ee,ae,fe[_e]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ie,ee,ae,fe[_e]);for(let $e=0;$e<ot.length;$e++){const Oe=ot[$e];he?je&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e+1,0,0,ee,ae,Oe.image[_e]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e+1,ie,ee,ae,Oe.image[_e])}}}m(M)&&g(i.TEXTURE_CUBE_MAP),j.__version=b.version,M.onUpdate&&M.onUpdate(M)}V.__version=M.version})(C,T,x):t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+x)},this.rebindTextures=function(T,x,C){const V=n.get(T);x!==void 0&&de(V.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),C!==void 0&&ve(T)},this.setupRenderTarget=function(T){const x=T.texture,C=n.get(T),V=n.get(x);T.addEventListener("dispose",F);const M=T.textures,B=T.isWebGLCubeRenderTarget===!0,N=M.length>1;if(N||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=x.version,s.memory.textures++),B){C.__webglFramebuffer=[];for(let b=0;b<6;b++)if(x.mipmaps&&x.mipmaps.length>0){C.__webglFramebuffer[b]=[];for(let j=0;j<x.mipmaps.length;j++)C.__webglFramebuffer[b][j]=i.createFramebuffer()}else C.__webglFramebuffer[b]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){C.__webglFramebuffer=[];for(let b=0;b<x.mipmaps.length;b++)C.__webglFramebuffer[b]=i.createFramebuffer()}else C.__webglFramebuffer=i.createFramebuffer();if(N)for(let b=0,j=M.length;b<j;b++){const Z=n.get(M[b]);Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture(),s.memory.textures++)}if(T.samples>0&&xe(T)===!1){C.__webglMultisampledFramebuffer=i.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let b=0;b<M.length;b++){const j=M[b];C.__webglColorRenderbuffer[b]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,C.__webglColorRenderbuffer[b]);const Z=a.convert(j.format,j.colorSpace),Q=a.convert(j.type),ue=A(j.internalFormat,Z,Q,j.normalized,j.colorSpace,T.isXRRenderTarget===!0),Se=se(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,ue,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+b,i.RENDERBUFFER,C.__webglColorRenderbuffer[b])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(C.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(C.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(B){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),z(i.TEXTURE_CUBE_MAP,x);for(let b=0;b<6;b++)if(x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)de(C.__webglFramebuffer[b][j],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+b,j);else de(C.__webglFramebuffer[b],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+b,0);m(x)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(N){for(let b=0,j=M.length;b<j;b++){const Z=M[b],Q=n.get(Z);let ue=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ue=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,Q.__webglTexture),z(ue,Z),de(C.__webglFramebuffer,T,Z,i.COLOR_ATTACHMENT0+b,ue,0),m(Z)&&g(ue)}t.unbindTexture()}else{let b=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(b=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(b,V.__webglTexture),z(b,x),x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)de(C.__webglFramebuffer[j],T,x,i.COLOR_ATTACHMENT0,b,j);else de(C.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,b,0);m(x)&&g(b),t.unbindTexture()}T.depthBuffer&&ve(T)},this.updateRenderTargetMipmap=function(T){const x=T.textures;for(let C=0,V=x.length;C<V;C++){const M=x[C];if(m(M)){const B=E(T),N=n.get(M).__webglTexture;t.bindTexture(B,N),g(B),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(T){if(T.samples>0){if(xe(T)===!1){const x=T.textures,C=T.width,V=T.height;let M=i.COLOR_BUFFER_BIT;const B=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,N=n.get(T),b=x.length>1;if(b)for(let Z=0;Z<x.length;Z++)t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,N.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,N.__webglMultisampledFramebuffer);const j=T.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,N.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,N.__webglFramebuffer);for(let Z=0;Z<x.length;Z++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(M|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(M|=i.STENCIL_BUFFER_BIT)),b){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,N.__webglColorRenderbuffer[Z]);const Q=n.get(x[Z]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,C,V,0,0,C,V,M,i.NEAREST),l===!0&&(te.length=0,ce.length=0,te.push(i.COLOR_ATTACHMENT0+Z),T.depthBuffer&&T.resolveDepthBuffer===!1&&(te.push(B),ce.push(B),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ce)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),b)for(let Z=0;Z<x.length;Z++){t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,N.__webglColorRenderbuffer[Z]);const Q=n.get(x[Z]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,N.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.TEXTURE_2D,Q,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,N.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}},this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=de,this.useMultisampledRTT=xe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function _u(i,e){return{convert:function(t,n=""){let r;const a=Ve.getTransfer(n);if(t===1009)return i.UNSIGNED_BYTE;if(t===1017)return i.UNSIGNED_SHORT_4_4_4_4;if(t===1018)return i.UNSIGNED_SHORT_5_5_5_1;if(t===35902)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===35899)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===1010)return i.BYTE;if(t===1011)return i.SHORT;if(t===1012)return i.UNSIGNED_SHORT;if(t===1013)return i.INT;if(t===1014)return i.UNSIGNED_INT;if(t===1015)return i.FLOAT;if(t===1016)return i.HALF_FLOAT;if(t===1021)return i.ALPHA;if(t===1022)return i.RGB;if(t===1023)return i.RGBA;if(t===1026)return i.DEPTH_COMPONENT;if(t===1027)return i.DEPTH_STENCIL;if(t===1028)return i.RED;if(t===1029)return i.RED_INTEGER;if(t===1030)return i.RG;if(t===1031)return i.RG_INTEGER;if(t===1033)return i.RGBA_INTEGER;if(t===33776||t===33777||t===33778||t===33779)if(a===Ye){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===35840||t===35841||t===35842||t===35843){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===36196||t===37492||t===37496||t===37488||t===37489||t===37490||t===37491){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===36196||t===37492)return a===Ye?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===37496)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(t===37488)return r.COMPRESSED_R11_EAC;if(t===37489)return r.COMPRESSED_SIGNED_R11_EAC;if(t===37490)return r.COMPRESSED_RG11_EAC;if(t===37491)return r.COMPRESSED_SIGNED_RG11_EAC}if(t===37808||t===37809||t===37810||t===37811||t===37812||t===37813||t===37814||t===37815||t===37816||t===37817||t===37818||t===37819||t===37820||t===37821){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===37808)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===37809)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===37810)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===37811)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===37812)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===37813)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===37814)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===37815)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===37816)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===37817)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===37818)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===37819)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===37820)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===37821)return a===Ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===36492||t===36494||t===36495){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===36492)return a===Ye?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===36283||t===36284||t===36285||t===36286){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===36283)return r.COMPRESSED_RED_RGTC1_EXT;if(t===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===1020?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}class vu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new fs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new kt({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Nt(new On(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xu extends Ln{constructor(e,t){super();const n=this;let r=null,a=1,s=null,c="local-floor",l=1,o=null,u=null,p=null,h=null,d=null,_=null;const f=typeof XRWebGLBinding<"u",y=new vu,m={},g=t.getContextAttributes();let E=null,A=null;const w=[],S=[],R=new Ne;let F=null;const P=new It;P.viewport=new at;const L=new It;L.viewport=new at;const k=[P,L],D=new Ll;let Y=null,W=null;function z(te){const ce=S.indexOf(te.inputSource);if(ce===-1)return;const se=w[ce];se!==void 0&&(se.update(te.inputSource,te.frame,o||s),se.dispatchEvent({type:te.type,data:te.inputSource}))}function $(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",H);for(let te=0;te<w.length;te++){const ce=S[te];ce!==null&&(S[te]=null,w[te].disconnect(ce))}Y=null,W=null,y.reset();for(const te in m)delete m[te];e.setRenderTarget(E),d=null,h=null,p=null,r=null,A=null,ve.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}function H(te){for(let ce=0;ce<te.removed.length;ce++){const se=te.removed[ce],xe=S.indexOf(se);xe>=0&&(S[xe]=null,w[xe].disconnect(se))}for(let ce=0;ce<te.added.length;ce++){const se=te.added[ce];let xe=S.indexOf(se);if(xe===-1){for(let J=0;J<w.length;J++){if(J>=S.length){S.push(se),xe=J;break}if(S[J]===null){S[J]=se,xe=J;break}}if(xe===-1)break}const Be=w[xe];Be&&Be.connect(se)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let ce=w[te];return ce===void 0&&(ce=new Vr,w[te]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(te){let ce=w[te];return ce===void 0&&(ce=new Vr,w[te]=ce),ce.getGripSpace()},this.getHand=function(te){let ce=w[te];return ce===void 0&&(ce=new Vr,w[te]=ce),ce.getHandSpace()},this.setFramebufferScaleFactor=function(te){a=te,n.isPresenting===!0&&Te("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){c=te,n.isPresenting===!0&&Te("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||s},this.setReferenceSpace=function(te){o=te},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return p===null&&f&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",$),r.addEventListener("inputsourceschange",H),g.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(R),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,se=null,xe=null;g.depth&&(xe=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=g.stencil?1027:1026,se=g.stencil?1020:1014);const Be={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:a};p=this.getBinding(),h=p.createProjectionLayer(Be),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),A=new Yt(h.textureWidth,h.textureHeight,{format:1023,type:1009,depthTexture:new ai(h.textureWidth,h.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ce={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};d=new XRWebGLLayer(r,t,ce),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),A=new Yt(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),o=null,s=await r.requestReferenceSpace(c),ve.setContext(r),ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};const ne=new U,de=new U;function Le(te,ce){ce===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(ce.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;let ce=te.near,se=te.far;y.texture!==null&&(y.depthNear>0&&(ce=y.depthNear),y.depthFar>0&&(se=y.depthFar)),D.near=L.near=P.near=ce,D.far=L.far=P.far=se,Y===D.near&&W===D.far||(r.updateRenderState({depthNear:D.near,depthFar:D.far}),Y=D.near,W=D.far),D.layers.mask=6|te.layers.mask,P.layers.mask=-5&D.layers.mask,L.layers.mask=-3&D.layers.mask;const xe=te.parent,Be=D.cameras;Le(D,xe);for(let J=0;J<Be.length;J++)Le(Be[J],xe);Be.length===2?(function(J,T,x){ne.setFromMatrixPosition(T.matrixWorld),de.setFromMatrixPosition(x.matrixWorld);const C=ne.distanceTo(de),V=T.projectionMatrix.elements,M=x.projectionMatrix.elements,B=V[14]/(V[10]-1),N=V[14]/(V[10]+1),b=(V[9]+1)/V[5],j=(V[9]-1)/V[5],Z=(V[8]-1)/V[0],Q=(M[8]+1)/M[0],ue=B*Z,Se=B*Q,ge=C/(-Z+Q),fe=ge*-Z;if(T.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(fe),J.translateZ(ge),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),V[10]===-1)J.projectionMatrix.copy(T.projectionMatrix),J.projectionMatrixInverse.copy(T.projectionMatrixInverse);else{const Ce=B+ge,ee=N+ge,ae=ue-fe,ie=Se+(C-fe),he=b*N/ee*Ce,Ze=j*N/ee*Ce;J.projectionMatrix.makePerspective(ae,ie,he,Ze,Ce,ee),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}})(D,P,L):D.projectionMatrix.copy(P.projectionMatrix),(function(J,T,x){x===null?J.matrix.copy(T.matrixWorld):(J.matrix.copy(x.matrixWorld),J.matrix.invert(),J.matrix.multiply(T.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(T.projectionMatrix),J.projectionMatrixInverse.copy(T.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=2*Ur*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)})(te,D,xe)},this.getCamera=function(){return D},this.getFoveation=function(){if(h!==null||d!==null)return l},this.setFoveation=function(te){l=te,h!==null&&(h.fixedFoveation=te),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=te)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(D)},this.getCameraTexture=function(te){return m[te]};let Me=null;const ve=new As;ve.setAnimationLoop(function(te,ce){if(u=ce.getViewerPose(o||s),_=ce,u!==null){const se=u.views;d!==null&&(e.setRenderTargetFramebuffer(A,d.framebuffer),e.setRenderTarget(A));let xe=!1;se.length!==D.cameras.length&&(D.cameras.length=0,xe=!0);for(let J=0;J<se.length;J++){const T=se[J];let x=null;if(d!==null)x=d.getViewport(T);else{const V=p.getViewSubImage(h,T);x=V.viewport,J===0&&(e.setRenderTargetTextures(A,V.colorTexture,V.depthStencilTexture),e.setRenderTarget(A))}let C=k[J];C===void 0&&(C=new It,C.layers.enable(J),C.viewport=new at,k[J]=C),C.matrix.fromArray(T.transform.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale),C.projectionMatrix.fromArray(T.projectionMatrix),C.projectionMatrixInverse.copy(C.projectionMatrix).invert(),C.viewport.set(x.x,x.y,x.width,x.height),J===0&&(D.matrix.copy(C.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),xe===!0&&D.cameras.push(C)}const Be=r.enabledFeatures;if(Be&&Be.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){p=n.getBinding();const J=p.getDepthInformation(se[0]);J&&J.isValid&&J.texture&&y.init(J,r.renderState)}if(Be&&Be.includes("camera-access")&&f){e.state.unbindTexture(),p=n.getBinding();for(let J=0;J<se.length;J++){const T=se[J].camera;if(T){let x=m[T];x||(x=new fs,m[T]=x);const C=p.getCameraImage(T);x.sourceTexture=C}}}}for(let se=0;se<w.length;se++){const xe=S[se],Be=w[se];xe!==null&&Be!==void 0&&Be.update(xe,ce,o||s)}Me&&Me(te,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),_=null}),this.setAnimationLoop=function(te){Me=te},this.dispose=function(){}}}const Mu=new Fe,io=new Ue;function Su(i,e){function t(r,a){r.matrixAutoUpdate===!0&&r.updateMatrix(),a.value.copy(r.matrix)}function n(r,a){r.opacity.value=a.opacity,a.color&&r.diffuse.value.copy(a.color),a.emissive&&r.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(r.map.value=a.map,t(a.map,r.mapTransform)),a.alphaMap&&(r.alphaMap.value=a.alphaMap,t(a.alphaMap,r.alphaMapTransform)),a.bumpMap&&(r.bumpMap.value=a.bumpMap,t(a.bumpMap,r.bumpMapTransform),r.bumpScale.value=a.bumpScale,a.side===1&&(r.bumpScale.value*=-1)),a.normalMap&&(r.normalMap.value=a.normalMap,t(a.normalMap,r.normalMapTransform),r.normalScale.value.copy(a.normalScale),a.side===1&&r.normalScale.value.negate()),a.displacementMap&&(r.displacementMap.value=a.displacementMap,t(a.displacementMap,r.displacementMapTransform),r.displacementScale.value=a.displacementScale,r.displacementBias.value=a.displacementBias),a.emissiveMap&&(r.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,r.emissiveMapTransform)),a.specularMap&&(r.specularMap.value=a.specularMap,t(a.specularMap,r.specularMapTransform)),a.alphaTest>0&&(r.alphaTest.value=a.alphaTest);const s=e.get(a),c=s.envMap,l=s.envMapRotation;c&&(r.envMap.value=c,r.envMapRotation.value.setFromMatrix4(Mu.makeRotationFromEuler(l)).transpose(),c.isCubeTexture&&c.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(io),r.reflectivity.value=a.reflectivity,r.ior.value=a.ior,r.refractionRatio.value=a.refractionRatio),a.lightMap&&(r.lightMap.value=a.lightMap,r.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,r.lightMapTransform)),a.aoMap&&(r.aoMap.value=a.aoMap,r.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,a){a.color.getRGB(r.fogColor.value,gs(i)),a.isFog?(r.fogNear.value=a.near,r.fogFar.value=a.far):a.isFogExp2&&(r.fogDensity.value=a.density)},refreshMaterialUniforms:function(r,a,s,c,l){a.isNodeMaterial?a.uniformsNeedUpdate=!1:a.isMeshBasicMaterial?n(r,a):a.isMeshLambertMaterial?(n(r,a),a.envMap&&(r.envMapIntensity.value=a.envMapIntensity)):a.isMeshToonMaterial?(n(r,a),(function(o,u){u.gradientMap&&(o.gradientMap.value=u.gradientMap)})(r,a)):a.isMeshPhongMaterial?(n(r,a),(function(o,u){o.specular.value.copy(u.specular),o.shininess.value=Math.max(u.shininess,1e-4)})(r,a),a.envMap&&(r.envMapIntensity.value=a.envMapIntensity)):a.isMeshStandardMaterial?(n(r,a),(function(o,u){o.metalness.value=u.metalness,u.metalnessMap&&(o.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,o.metalnessMapTransform)),o.roughness.value=u.roughness,u.roughnessMap&&(o.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,o.roughnessMapTransform)),u.envMap&&(o.envMapIntensity.value=u.envMapIntensity)})(r,a),a.isMeshPhysicalMaterial&&(function(o,u,p){o.ior.value=u.ior,u.sheen>0&&(o.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),o.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(o.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,o.sheenColorMapTransform)),u.sheenRoughnessMap&&(o.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,o.sheenRoughnessMapTransform))),u.clearcoat>0&&(o.clearcoat.value=u.clearcoat,o.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(o.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,o.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(o.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,o.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(o.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,o.clearcoatNormalMapTransform),o.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===1&&o.clearcoatNormalScale.value.negate())),u.dispersion>0&&(o.dispersion.value=u.dispersion),u.iridescence>0&&(o.iridescence.value=u.iridescence,o.iridescenceIOR.value=u.iridescenceIOR,o.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],o.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(o.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,o.iridescenceMapTransform)),u.iridescenceThicknessMap&&(o.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,o.iridescenceThicknessMapTransform))),u.transmission>0&&(o.transmission.value=u.transmission,o.transmissionSamplerMap.value=p.texture,o.transmissionSamplerSize.value.set(p.width,p.height),u.transmissionMap&&(o.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,o.transmissionMapTransform)),o.thickness.value=u.thickness,u.thicknessMap&&(o.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,o.thicknessMapTransform)),o.attenuationDistance.value=u.attenuationDistance,o.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(o.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(o.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,o.anisotropyMapTransform))),o.specularIntensity.value=u.specularIntensity,o.specularColor.value.copy(u.specularColor),u.specularColorMap&&(o.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,o.specularColorMapTransform)),u.specularIntensityMap&&(o.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,o.specularIntensityMapTransform))})(r,a,l)):a.isMeshMatcapMaterial?(n(r,a),(function(o,u){u.matcap&&(o.matcap.value=u.matcap)})(r,a)):a.isMeshDepthMaterial?n(r,a):a.isMeshDistanceMaterial?(n(r,a),(function(o,u){const p=e.get(u).light;o.referencePosition.value.setFromMatrixPosition(p.matrixWorld),o.nearDistance.value=p.shadow.camera.near,o.farDistance.value=p.shadow.camera.far})(r,a)):a.isMeshNormalMaterial?n(r,a):a.isLineBasicMaterial?((function(o,u){o.diffuse.value.copy(u.color),o.opacity.value=u.opacity,u.map&&(o.map.value=u.map,t(u.map,o.mapTransform))})(r,a),a.isLineDashedMaterial&&(function(o,u){o.dashSize.value=u.dashSize,o.totalSize.value=u.dashSize+u.gapSize,o.scale.value=u.scale})(r,a)):a.isPointsMaterial?(function(o,u,p,h){o.diffuse.value.copy(u.color),o.opacity.value=u.opacity,o.size.value=u.size*p,o.scale.value=.5*h,u.map&&(o.map.value=u.map,t(u.map,o.uvTransform)),u.alphaMap&&(o.alphaMap.value=u.alphaMap,t(u.alphaMap,o.alphaMapTransform)),u.alphaTest>0&&(o.alphaTest.value=u.alphaTest)})(r,a,s,c):a.isSpriteMaterial?(function(o,u){o.diffuse.value.copy(u.color),o.opacity.value=u.opacity,o.rotation.value=u.rotation,u.map&&(o.map.value=u.map,t(u.map,o.mapTransform)),u.alphaMap&&(o.alphaMap.value=u.alphaMap,t(u.alphaMap,o.alphaMapTransform)),u.alphaTest>0&&(o.alphaTest.value=u.alphaTest)})(r,a):a.isShadowMaterial?(r.color.value.copy(a.color),r.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}}}function yu(i,e,t,n){let r={},a={},s=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(h,d,_,f){if((function(y,m,g,E){const A=y.value,w=m+"_"+g;if(E[w]===void 0)return typeof A=="number"||typeof A=="boolean"?E[w]=A:ArrayBuffer.isView(A)?E[w]=A.slice():E[w]=A.clone(),!0;{const S=E[w];if(typeof A=="number"||typeof A=="boolean"){if(S!==A)return E[w]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(S.equals(A)===!1)return S.copy(A),!0}}return!1})(h,d,_,f)===!0){const y=h.__offset,m=h.value;if(Array.isArray(m)){let g=0;for(let E=0;E<m.length;E++){const A=m[E],w=u(A);o(A,h.__data,g),typeof A=="number"||typeof A=="boolean"||A.isMatrix3||ArrayBuffer.isView(A)||(g+=w.storage/Float32Array.BYTES_PER_ELEMENT)}}else o(m,h.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,h.__data)}}function o(h,d,_){typeof h=="number"||typeof h=="boolean"?d[0]=h:h.isMatrix3?(d[0]=h.elements[0],d[1]=h.elements[1],d[2]=h.elements[2],d[3]=0,d[4]=h.elements[3],d[5]=h.elements[4],d[6]=h.elements[5],d[7]=0,d[8]=h.elements[6],d[9]=h.elements[7],d[10]=h.elements[8],d[11]=0):ArrayBuffer.isView(h)?d.set(new h.constructor(h.buffer,h.byteOffset,d.length)):h.toArray(d,_)}function u(h){const d={boundary:0,storage:0};return typeof h=="number"||typeof h=="boolean"?(d.boundary=4,d.storage=4):h.isVector2?(d.boundary=8,d.storage=8):h.isVector3||h.isColor?(d.boundary=16,d.storage=12):h.isVector4?(d.boundary=16,d.storage=16):h.isMatrix3?(d.boundary=48,d.storage=48):h.isMatrix4?(d.boundary=64,d.storage=64):h.isTexture?Te("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(h)?(d.boundary=16,d.storage=h.byteLength):Te("WebGLRenderer: Unsupported uniform value type.",h),d}function p(h){const d=h.target;d.removeEventListener("dispose",p);const _=s.indexOf(d.__bindingPointIndex);s.splice(_,1),i.deleteBuffer(r[d.id]),delete r[d.id],delete a[d.id]}return{bind:function(h,d){const _=d.program;n.uniformBlockBinding(h,_)},update:function(h,d){let _=r[h.id];_===void 0&&((function(m){const g=m.uniforms;let E=0;const A=16;for(let S=0,R=g.length;S<R;S++){const F=Array.isArray(g[S])?g[S]:[g[S]];for(let P=0,L=F.length;P<L;P++){const k=F[P],D=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,W=D.length;Y<W;Y++){const z=u(D[Y]),$=E%A,H=$%z.boundary,ne=$+H;E+=H,ne!==0&&A-ne<z.storage&&(E+=A-ne),k.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=E,E+=z.storage}}}const w=E%A;w>0&&(E+=A-w),m.__size=E,m.__cache={}})(h),_=(function(m){const g=(function(){for(let S=0;S<c;S++)if(s.indexOf(S)===-1)return s.push(S),S;return ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();m.__bindingPointIndex=g;const E=i.createBuffer(),A=m.__size,w=m.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,g,E),E})(h),r[h.id]=_,h.addEventListener("dispose",p));const f=d.program;n.updateUBOMapping(h,f);const y=e.render.frame;a[h.id]!==y&&((function(m){const g=r[m.id],E=m.uniforms,A=m.__cache;i.bindBuffer(i.UNIFORM_BUFFER,g);for(let w=0,S=E.length;w<S;w++){const R=E[w];if(Array.isArray(R))for(let F=0,P=R.length;F<P;F++)l(R[F],w,F,A);else l(R,w,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(h),a[h.id]=y)},dispose:function(){for(const h in r)i.deleteBuffer(r[h]);s=[],r={},a={}}}}io.set(-1,0,0,0,1,0,0,0,1);const Eu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Qt=null;class Tu{constructor(e={}){const{canvas:t=Xo(),context:n=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:o=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:d=1009}=e;let _;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=s;const f=d,y=new Set([1033,1031,1029]),m=new Set([1009,1014,1012,1020,1017,1018]),g=new Uint32Array(4),E=new Int32Array(4),A=new U;let w=null,S=null;const R=[],F=[];let P=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let k=!1,D=null,Y=null,W=null,z=null;this._outputColorSpace=Rt;let $=0,H=0,ne=null,de=-1,Le=null;const Me=new at,ve=new at;let te=null;const ce=new be(0);let se=0,xe=t.width,Be=t.height,J=1,T=null,x=null;const C=new at(0,0,xe,Be),V=new at(0,0,xe,Be);let M=!1;const B=new aa;let N=!1,b=!1;const j=new Fe,Z=new U,Q=new at,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Se=!1;function ge(){return ne===null?J:1}let fe,Ce,ee,ae,ie,he,Ze,je,ot,bt,_e,$e,Oe,xt,Je,ft,rt,Ot,Wt,Gn,tn,Cn,br,I=n;function bo(v,O){return t.getContext(v,O)}try{const v={alpha:!0,depth:r,stencil:a,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:o,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r185"),t.addEventListener("webglcontextlost",Ao,!1),t.addEventListener("webglcontextrestored",Ro,!1),t.addEventListener("webglcontextcreationerror",Co,!1),I===null){const O="webgl2";if(I=bo(O,v),I===null)throw bo(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(v){throw ke("WebGLRenderer: "+v.message),v}function wo(){fe=new kl(I),fe.init(),tn=new _u(I,fe),Ce=new zl(I,fe,e,tn),ee=new mu(I,fe),Ce.reversedDepthBuffer&&h&&ee.buffers.depth.setReversed(!0),Y=I.createFramebuffer(),W=I.createFramebuffer(),z=I.createFramebuffer(),ae=new ql(I),ie=new ru,he=new gu(I,fe,ee,ie,Ce,tn,ae),Ze=new Gl(L),je=new Dl(I),Cn=new Fl(I,je),ot=new Wl(I,je,ae,Cn),bt=new Yl(I,ot,je,Cn,ae),Ot=new jl(I,Ce,he),Je=new Hl(ie),_e=new iu(L,Ze,fe,Ce,Cn,Je),$e=new Su(L,ie),Oe=new su,xt=new hu(fe),rt=new Ol(L,Ze,ee,bt,_,l),ft=new fu(L,bt,Ce),br=new yu(I,ae,Ce,ee),Wt=new Bl(I,fe,ae),Gn=new Xl(I,fe,ae),ae.programs=_e.programs,L.capabilities=Ce,L.extensions=fe,L.properties=ie,L.renderLists=Oe,L.shadowMap=ft,L.state=ee,L.info=ae}wo(),f!==1009&&(P=new Kl(f,t.width,t.height,c,r,a));const ct=new xu(L,I);function Ao(v){v.preventDefault(),qa("WebGLRenderer: Context Lost."),k=!0}function Ro(){qa("WebGLRenderer: Context Restored."),k=!1;const v=ae.autoReset,O=ft.enabled,G=ft.autoUpdate,K=ft.needsUpdate,q=ft.type;wo(),ae.autoReset=v,ft.enabled=O,ft.autoUpdate=G,ft.needsUpdate=K,ft.type=q}function Co(v){ke("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Po(v){const O=v.target;O.removeEventListener("dispose",Po),(function(G){(function(K){const q=ie.get(K).programs;q!==void 0&&(q.forEach(function(re){_e.releaseProgram(re)}),K.isShaderMaterial&&_e.releaseShaderCache(K))})(G),ie.remove(G)})(O)}function Lo(v,O,G){v.transparent===!0&&v.side===2&&v.forceSinglePass===!1?(v.side=1,v.needsUpdate=!0,Ar(v,O,G),v.side=0,v.needsUpdate=!0,Ar(v,O,G),v.side=2):Ar(v,O,G)}this.xr=ct,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const v=fe.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=fe.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(v){v!==void 0&&(J=v,this.setSize(xe,Be,!1))},this.getSize=function(v){return v.set(xe,Be)},this.setSize=function(v,O,G=!0){ct.isPresenting?Te("WebGLRenderer: Can't change size while VR device is presenting."):(xe=v,Be=O,t.width=Math.floor(v*J),t.height=Math.floor(O*J),G===!0&&(t.style.width=v+"px",t.style.height=O+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,v,O))},this.getDrawingBufferSize=function(v){return v.set(xe*J,Be*J).floor()},this.setDrawingBufferSize=function(v,O,G){xe=v,Be=O,J=G,t.width=Math.floor(v*G),t.height=Math.floor(O*G),this.setViewport(0,0,v,O)},this.setEffects=function(v){if(f!==1009){if(v){for(let O=0;O<v.length;O++)if(v[O].isOutputPass===!0){Te("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(v||[])}else ke("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(v){return v.copy(Me)},this.getViewport=function(v){return v.copy(C)},this.setViewport=function(v,O,G,K){v.isVector4?C.set(v.x,v.y,v.z,v.w):C.set(v,O,G,K),ee.viewport(Me.copy(C).multiplyScalar(J).round())},this.getScissor=function(v){return v.copy(V)},this.setScissor=function(v,O,G,K){v.isVector4?V.set(v.x,v.y,v.z,v.w):V.set(v,O,G,K),ee.scissor(ve.copy(V).multiplyScalar(J).round())},this.getScissorTest=function(){return M},this.setScissorTest=function(v){ee.setScissorTest(M=v)},this.setOpaqueSort=function(v){T=v},this.setTransparentSort=function(v){x=v},this.getClearColor=function(v){return v.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor(...arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha(...arguments)},this.clear=function(v=!0,O=!0,G=!0){let K=0;if(v){let q=!1;if(ne!==null){const re=ne.texture.format;q=y.has(re)}if(q){const re=ne.texture.type,le=m.has(re),pe=rt.getClearColor(),me=rt.getClearAlpha(),we=pe.r,Ge=pe.g,Xe=pe.b;le?(g[0]=we,g[1]=Ge,g[2]=Xe,g[3]=me,I.clearBufferuiv(I.COLOR,0,g)):(E[0]=we,E[1]=Ge,E[2]=Xe,E[3]=me,I.clearBufferiv(I.COLOR,0,E))}else K|=I.COLOR_BUFFER_BIT}O&&(K|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(K|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&I.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),D=v},this.dispose=function(){t.removeEventListener("webglcontextlost",Ao,!1),t.removeEventListener("webglcontextrestored",Ro,!1),t.removeEventListener("webglcontextcreationerror",Co,!1),rt.dispose(),Oe.dispose(),xt.dispose(),ie.dispose(),Ze.dispose(),bt.dispose(),Cn.dispose(),br.dispose(),_e.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Uo),ct.removeEventListener("sessionend",Io),kn.stop()},this.renderBufferDirect=function(v,O,G,K,q,re){O===null&&(O=ue);const le=q.isMesh&&q.matrixWorld.determinantAffine()<0,pe=(function(He,tt,Mt,Ae,Pe){tt.isScene!==!0&&(tt=ue),he.resetTextureUnits();const Xt=tt.fog,Ba=Ae.isMeshStandardMaterial||Ae.isMeshLambertMaterial||Ae.isMeshPhongMaterial?tt.environment:null,Rr=ne===null?L.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ve.workingColorSpace,Gi=Ae.isMeshStandardMaterial||Ae.isMeshLambertMaterial&&!Ae.envMap||Ae.isMeshPhongMaterial&&!Ae.envMap,nn=Ze.get(Ae.envMap||Ba,Gi),Mi=Ae.vertexColors===!0&&!!Mt.attributes.color&&Mt.attributes.color.itemSize===4,vn=!!Mt.attributes.tangent&&(!!Ae.normalMap||Ae.anisotropy>0),za=!!Mt.morphAttributes.position,Si=!!Mt.morphAttributes.normal,qu=!!Mt.morphAttributes.color;let zo=0;Ae.toneMapped&&(ne!==null&&ne.isXRRenderTarget!==!0||(zo=L.toneMapping));const Ho=Mt.morphAttributes.position||Mt.morphAttributes.normal||Mt.morphAttributes.color,ju=Ho!==void 0?Ho.length:0,Re=ie.get(Ae),Wn=S.state.lights;if(N===!0&&(b===!0||He!==Le)){const ht=He===Le&&Ae.id===de;Je.setState(Ae,He,ht)}let qt=!1;Ae.version===Re.__version?Re.needsLights&&Re.lightsStateVersion!==Wn.state.version||Re.outputColorSpace!==Rr||Pe.isBatchedMesh&&Re.batching===!1?qt=!0:Pe.isBatchedMesh||Re.batching!==!0?Pe.isBatchedMesh&&Re.batchingColor===!0&&Pe.colorTexture===null||Pe.isBatchedMesh&&Re.batchingColor===!1&&Pe.colorTexture!==null||Pe.isInstancedMesh&&Re.instancing===!1?qt=!0:Pe.isInstancedMesh||Re.instancing!==!0?Pe.isSkinnedMesh&&Re.skinning===!1?qt=!0:Pe.isSkinnedMesh||Re.skinning!==!0?Pe.isInstancedMesh&&Re.instancingColor===!0&&Pe.instanceColor===null||Pe.isInstancedMesh&&Re.instancingColor===!1&&Pe.instanceColor!==null||Pe.isInstancedMesh&&Re.instancingMorph===!0&&Pe.morphTexture===null||Pe.isInstancedMesh&&Re.instancingMorph===!1&&Pe.morphTexture!==null||Re.envMap!==nn||Ae.fog===!0&&Re.fog!==Xt?qt=!0:Re.numClippingPlanes===void 0||Re.numClippingPlanes===Je.numPlanes&&Re.numIntersection===Je.numIntersection?(Re.vertexAlphas!==Mi||Re.vertexTangents!==vn||Re.morphTargets!==za||Re.morphNormals!==Si||Re.morphColors!==qu||Re.toneMapping!==zo||Re.morphTargetsCount!==ju||!!Re.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(qt=!0):qt=!0:qt=!0:qt=!0:qt=!0:(qt=!0,Re.__version=Ae.version);let Pn=Re.currentProgram;qt===!0&&(Pn=Ar(Ae,tt,Pe),D&&Ae.isNodeMaterial&&D.onUpdateProgram(Ae,Pn,Re));let Vo=!1,yi=!1,Ha=!1;const nt=Pn.getUniforms(),Ft=Re.uniforms;if(ee.useProgram(Pn.program)&&(Vo=!0,yi=!0,Ha=!0),Ae.id!==de&&(de=Ae.id,yi=!0),Re.needsLights){const ht=(function(an,Ga){if(an.length===0)return null;if(an.length===1)return an[0].texture!==null?an[0]:null;A.setFromMatrixPosition(Ga.matrixWorld);for(let Ei=0,Yu=an.length;Ei<Yu;Ei++){const ka=an[Ei];if(ka.texture!==null&&ka.boundingBox.containsPoint(A))return ka}return null})(S.state.lightProbeGridArray,Pe);Re.lightProbeGrid!==ht&&(Re.lightProbeGrid=ht,yi=!0)}if(Vo||Le!==He){ee.buffers.depth.getReversed()&&He.reversedDepth!==!0&&(He._reversedDepth=!0,He.updateProjectionMatrix()),nt.setValue(I,"projectionMatrix",He.projectionMatrix),nt.setValue(I,"viewMatrix",He.matrixWorldInverse);const ht=nt.map.cameraPosition;ht!==void 0&&ht.setValue(I,Z.setFromMatrixPosition(He.matrixWorld)),Ce.logarithmicDepthBuffer&&nt.setValue(I,"logDepthBufFC",2/(Math.log(He.far+1)/Math.LN2)),(Ae.isMeshPhongMaterial||Ae.isMeshToonMaterial||Ae.isMeshLambertMaterial||Ae.isMeshBasicMaterial||Ae.isMeshStandardMaterial||Ae.isShaderMaterial)&&nt.setValue(I,"isOrthographic",He.isOrthographicCamera===!0),Le!==He&&(Le=He,yi=!0,Ha=!0)}if(Re.needsLights&&(Wn.state.directionalShadowMap.length>0&&nt.setValue(I,"directionalShadowMap",Wn.state.directionalShadowMap,he),Wn.state.spotShadowMap.length>0&&nt.setValue(I,"spotShadowMap",Wn.state.spotShadowMap,he),Wn.state.pointShadowMap.length>0&&nt.setValue(I,"pointShadowMap",Wn.state.pointShadowMap,he)),Pe.isSkinnedMesh){nt.setOptional(I,Pe,"bindMatrix"),nt.setOptional(I,Pe,"bindMatrixInverse");const ht=Pe.skeleton;ht&&(ht.boneTexture===null&&ht.computeBoneTexture(),nt.setValue(I,"boneTexture",ht.boneTexture,he))}Pe.isBatchedMesh&&(nt.setOptional(I,Pe,"batchingTexture"),nt.setValue(I,"batchingTexture",Pe._matricesTexture,he),nt.setOptional(I,Pe,"batchingIdTexture"),nt.setValue(I,"batchingIdTexture",Pe._indirectTexture,he),nt.setOptional(I,Pe,"batchingColorTexture"),Pe._colorsTexture!==null&&nt.setValue(I,"batchingColorTexture",Pe._colorsTexture,he));const Va=Mt.morphAttributes;if(Va.position===void 0&&Va.normal===void 0&&Va.color===void 0||Ot.update(Pe,Mt,Pn),(yi||Re.receiveShadow!==Pe.receiveShadow)&&(Re.receiveShadow=Pe.receiveShadow,nt.setValue(I,"receiveShadow",Pe.receiveShadow)),(Ae.isMeshStandardMaterial||Ae.isMeshLambertMaterial||Ae.isMeshPhongMaterial)&&Ae.envMap===null&&tt.environment!==null&&(Ft.envMapIntensity.value=tt.environmentIntensity),Ft.dfgLUT!==void 0&&(Ft.dfgLUT.value=(Qt===null&&(Qt=new ml(Eu,16,16,1030,1016),Qt.name="DFG_LUT",Qt.minFilter=1006,Qt.magFilter=1006,Qt.wrapS=1001,Qt.wrapT=1001,Qt.generateMipmaps=!1,Qt.needsUpdate=!0),Qt)),yi){if(nt.setValue(I,"toneMappingExposure",L.toneMappingExposure),Re.needsLights&&(jt=Ha,(rn=Ft).ambientLightColor.needsUpdate=jt,rn.lightProbe.needsUpdate=jt,rn.directionalLights.needsUpdate=jt,rn.directionalLightShadows.needsUpdate=jt,rn.pointLights.needsUpdate=jt,rn.pointLightShadows.needsUpdate=jt,rn.spotLights.needsUpdate=jt,rn.spotLightShadows.needsUpdate=jt,rn.rectAreaLights.needsUpdate=jt,rn.hemisphereLights.needsUpdate=jt),Xt&&Ae.fog===!0&&$e.refreshFogUniforms(Ft,Xt),$e.refreshMaterialUniforms(Ft,Ae,J,Be,S.state.transmissionRenderTarget[He.id]),Re.needsLights&&Re.lightProbeGrid){const ht=Re.lightProbeGrid;Ft.probesSH.value=ht.texture,Ft.probesMin.value.copy(ht.boundingBox.min),Ft.probesMax.value.copy(ht.boundingBox.max),Ft.probesResolution.value.copy(ht.resolution)}mr.upload(I,Fo(Re),Ft,he)}var rn,jt;if(Ae.isShaderMaterial&&Ae.uniformsNeedUpdate===!0&&(mr.upload(I,Fo(Re),Ft,he),Ae.uniformsNeedUpdate=!1),Ae.isSpriteMaterial&&nt.setValue(I,"center",Pe.center),nt.setValue(I,"modelViewMatrix",Pe.modelViewMatrix),nt.setValue(I,"normalMatrix",Pe.normalMatrix),nt.setValue(I,"modelMatrix",Pe.matrixWorld),Ae.uniformsGroups!==void 0){const ht=Ae.uniformsGroups;for(let an=0,Ga=ht.length;an<Ga;an++){const Ei=ht[an];br.update(Ei,Pn),br.bind(Ei,Pn)}}return Pn})(v,O,G,K,q);ee.setMaterial(K,le);let me=G.index,we=1;if(K.wireframe===!0){if(me=ot.getWireframeAttribute(G),me===void 0)return;we=2}const Ge=G.drawRange,Xe=G.attributes.position;let Ee=Ge.start*we,qe=(Ge.start+Ge.count)*we;re!==null&&(Ee=Math.max(Ee,re.start*we),qe=Math.min(qe,(re.start+re.count)*we)),me!==null?(Ee=Math.max(Ee,0),qe=Math.min(qe,me.count)):Xe!=null&&(Ee=Math.max(Ee,0),qe=Math.min(qe,Xe.count));const mt=qe-Ee;if(mt<0||mt===1/0)return;let ut;Cn.setup(q,K,pe,G,me);let et=Wt;if(me!==null&&(ut=je.get(me),et=Gn,et.setIndex(ut)),q.isMesh)K.wireframe===!0?(ee.setLineWidth(K.wireframeLinewidth*ge()),et.setMode(I.LINES)):et.setMode(I.TRIANGLES);else if(q.isLine){let He=K.linewidth;He===void 0&&(He=1),ee.setLineWidth(He*ge()),q.isLineSegments?et.setMode(I.LINES):q.isLineLoop?et.setMode(I.LINE_LOOP):et.setMode(I.LINE_STRIP)}else q.isPoints?et.setMode(I.POINTS):q.isSprite&&et.setMode(I.TRIANGLES);if(q.isBatchedMesh)if(fe.get("WEBGL_multi_draw"))et.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const He=q._multiDrawStarts,tt=q._multiDrawCounts,Mt=q._multiDrawCount,Ae=me?je.get(me).bytesPerElement:1,Pe=ie.get(K).currentProgram.getUniforms();for(let Xt=0;Xt<Mt;Xt++)Pe.setValue(I,"_gl_DrawID",Xt),et.render(He[Xt]/Ae,tt[Xt])}else if(q.isInstancedMesh)et.renderInstances(Ee,mt,q.count);else if(G.isInstancedBufferGeometry){const He=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,tt=Math.min(G.instanceCount,He);et.renderInstances(Ee,mt,tt)}else et.render(Ee,mt)},this.compile=function(v,O,G=null){G===null&&(G=v),S=xt.get(G),S.init(O),F.push(S),G.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(S.pushLight(q),q.castShadow&&S.pushShadow(q))}),v!==G&&v.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(S.pushLight(q),q.castShadow&&S.pushShadow(q))}),S.setupLights();const K=new Set;return v.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const re=q.material;if(re)if(Array.isArray(re))for(let le=0;le<re.length;le++){const pe=re[le];Lo(pe,G,q),K.add(pe)}else Lo(re,G,q),K.add(re)}),S=F.pop(),K},this.compileAsync=function(v,O,G=null){const K=this.compile(v,O,G);return new Promise(q=>{function re(){K.forEach(function(le){ie.get(le).currentProgram.isReady()&&K.delete(le)}),K.size!==0?setTimeout(re,10):q(v)}fe.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let Oa=null;function Uo(){kn.stop()}function Io(){kn.start()}const kn=new As;function Fa(v,O,G,K){if(v.visible===!1)return;if(v.layers.test(O.layers)){if(v.isGroup)G=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(O);else if(v.isLightProbeGrid)S.pushLightProbeGrid(v);else if(v.isLight)S.pushLight(v),v.castShadow&&S.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||B.intersectsSprite(v)){K&&Q.setFromMatrixPosition(v.matrixWorld).applyMatrix4(j);const re=bt.update(v),le=v.material;le.visible&&w.push(v,re,le,G,Q.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||B.intersectsObject(v))){const re=bt.update(v),le=v.material;if(K&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Q.copy(v.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),Q.copy(re.boundingSphere.center)),Q.applyMatrix4(v.matrixWorld).applyMatrix4(j)),Array.isArray(le)){const pe=re.groups;for(let me=0,we=pe.length;me<we;me++){const Ge=pe[me],Xe=le[Ge.materialIndex];Xe&&Xe.visible&&w.push(v,re,Xe,G,Q.z,Ge)}}else le.visible&&w.push(v,re,le,G,Q.z,null)}}const q=v.children;for(let re=0,le=q.length;re<le;re++)Fa(q[re],O,G,K)}function Do(v,O,G,K){const{opaque:q,transmissive:re,transparent:le}=v;S.setupLightsView(G),N===!0&&Je.setGlobalState(L.clippingPlanes,G),K&&ee.viewport(Me.copy(K)),q.length>0&&wr(q,O,G),re.length>0&&wr(re,O,G),le.length>0&&wr(le,O,G),ee.buffers.depth.setTest(!0),ee.buffers.depth.setMask(!0),ee.buffers.color.setMask(!0),ee.setPolygonOffset(!1)}function No(v,O,G,K){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[K.id]===void 0){const Xe=fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[K.id]=new Yt(1,1,{generateMipmaps:!0,type:Xe?1016:1009,minFilter:1008,samples:Math.max(4,Ce.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ve.workingColorSpace})}const q=S.state.transmissionRenderTarget[K.id],re=K.viewport||Me;q.setSize(re.z*L.transmissionResolutionScale,re.w*L.transmissionResolutionScale);const le=L.getRenderTarget(),pe=L.getActiveCubeFace(),me=L.getActiveMipmapLevel();L.setRenderTarget(q),L.getClearColor(ce),se=L.getClearAlpha(),se<1&&L.setClearColor(16777215,.5),L.clear(),Se&&rt.render(G);const we=L.toneMapping;L.toneMapping=0;const Ge=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),S.setupLightsView(K),N===!0&&Je.setGlobalState(L.clippingPlanes,K),wr(v,G,K),he.updateMultisampleRenderTarget(q),he.updateRenderTargetMipmap(q),fe.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Ee=0,qe=O.length;Ee<qe;Ee++){const mt=O[Ee],{object:ut,geometry:et,material:He,group:tt}=mt;if(He.side===2&&ut.layers.test(K.layers)){const Mt=He.side;He.side=1,He.needsUpdate=!0,Oo(ut,G,K,et,He,tt),He.side=Mt,He.needsUpdate=!0,Xe=!0}}Xe===!0&&(he.updateMultisampleRenderTarget(q),he.updateRenderTargetMipmap(q))}L.setRenderTarget(le,pe,me),L.setClearColor(ce,se),Ge!==void 0&&(K.viewport=Ge),L.toneMapping=we}function wr(v,O,G){const K=O.isScene===!0?O.overrideMaterial:null;for(let q=0,re=v.length;q<re;q++){const le=v[q],{object:pe,geometry:me,group:we}=le;let Ge=le.material;Ge.allowOverride===!0&&K!==null&&(Ge=K),pe.layers.test(G.layers)&&Oo(pe,O,G,me,Ge,we)}}function Oo(v,O,G,K,q,re){v.onBeforeRender(L,O,G,K,q,re),v.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),q.onBeforeRender(L,O,G,K,v,re),q.transparent===!0&&q.side===2&&q.forceSinglePass===!1?(q.side=1,q.needsUpdate=!0,L.renderBufferDirect(G,O,K,q,v,re),q.side=0,q.needsUpdate=!0,L.renderBufferDirect(G,O,K,q,v,re),q.side=2):L.renderBufferDirect(G,O,K,q,v,re),v.onAfterRender(L,O,G,K,q,re)}function Ar(v,O,G){O.isScene!==!0&&(O=ue);const K=ie.get(v),q=S.state.lights,re=S.state.shadowsArray,le=q.state.version,pe=_e.getParameters(v,q.state,re,O,G,S.state.lightProbeGridArray),me=_e.getProgramCacheKey(pe);let we=K.programs;K.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?O.environment:null,K.fog=O.fog;const Ge=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;K.envMap=Ze.get(v.envMap||K.environment,Ge),K.envMapRotation=K.environment!==null&&v.envMap===null?O.environmentRotation:v.envMapRotation,we===void 0&&(v.addEventListener("dispose",Po),we=new Map,K.programs=we);let Xe=we.get(me);if(Xe!==void 0){if(K.currentProgram===Xe&&K.lightsStateVersion===le)return Bo(v,pe),Xe}else pe.uniforms=_e.getUniforms(v),D!==null&&v.isNodeMaterial&&D.build(v,G,pe),v.onBeforeCompile(pe,L),Xe=_e.acquireProgram(pe,me),we.set(me,Xe),K.uniforms=pe.uniforms;const Ee=K.uniforms;return(v.isShaderMaterial||v.isRawShaderMaterial)&&v.clipping!==!0||(Ee.clippingPlanes=Je.uniform),Bo(v,pe),K.needsLights=(function(qe){return qe.isMeshLambertMaterial||qe.isMeshToonMaterial||qe.isMeshPhongMaterial||qe.isMeshStandardMaterial||qe.isShadowMaterial||qe.isShaderMaterial&&qe.lights===!0})(v),K.lightsStateVersion=le,K.needsLights&&(Ee.ambientLightColor.value=q.state.ambient,Ee.lightProbe.value=q.state.probe,Ee.directionalLights.value=q.state.directional,Ee.directionalLightShadows.value=q.state.directionalShadow,Ee.spotLights.value=q.state.spot,Ee.spotLightShadows.value=q.state.spotShadow,Ee.rectAreaLights.value=q.state.rectArea,Ee.ltc_1.value=q.state.rectAreaLTC1,Ee.ltc_2.value=q.state.rectAreaLTC2,Ee.pointLights.value=q.state.point,Ee.pointLightShadows.value=q.state.pointShadow,Ee.hemisphereLights.value=q.state.hemi,Ee.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ee.spotLightMatrix.value=q.state.spotLightMatrix,Ee.spotLightMap.value=q.state.spotLightMap,Ee.pointShadowMatrix.value=q.state.pointShadowMatrix),K.lightProbeGrid=S.state.lightProbeGridArray.length>0,K.currentProgram=Xe,K.uniformsList=null,Xe}function Fo(v){if(v.uniformsList===null){const O=v.currentProgram.getUniforms();v.uniformsList=mr.seqWithValue(O.seq,v.uniforms)}return v.uniformsList}function Bo(v,O){const G=ie.get(v);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}kn.setAnimationLoop(function(v){Oa&&Oa(v)}),typeof self<"u"&&kn.setContext(self),this.setAnimationLoop=function(v){Oa=v,ct.setAnimationLoop(v),v===null?kn.stop():kn.start()},ct.addEventListener("sessionstart",Uo),ct.addEventListener("sessionend",Io),this.render=function(v,O){if(O!==void 0&&O.isCamera!==!0)return void ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(k===!0)return;D!==null&&D.renderStart(v,O);const G=ct.enabled===!0&&ct.isPresenting===!0,K=P!==null&&(ne===null||G)&&P.begin(L,ne);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ct.enabled!==!0||ct.isPresenting!==!0||P!==null&&P.isCompositing()!==!1||(ct.cameraAutoUpdate===!0&&ct.updateCamera(O),O=ct.getCamera()),v.isScene===!0&&v.onBeforeRender(L,v,O,ne),S=xt.get(v,F.length),S.init(O),S.state.textureUnits=he.getTextureUnits(),F.push(S),j.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),B.setFromProjectionMatrix(j,2e3,O.reversedDepth),b=this.localClippingEnabled,N=Je.init(this.clippingPlanes,b),w=Oe.get(v,R.length),w.init(),R.push(w),ct.enabled===!0&&ct.isPresenting===!0){const re=L.xr.getDepthSensingMesh();re!==null&&Fa(re,O,-1/0,L.sortObjects)}Fa(v,O,0,L.sortObjects),w.finish(),L.sortObjects===!0&&w.sort(T,x,O.reversedDepth),Se=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Se&&rt.addToRenderList(w,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),N===!0&&Je.beginShadows();const q=S.state.shadowsArray;if(ft.render(q,v,O),N===!0&&Je.endShadows(),(K&&P.hasRenderPass())===!1){const re=w.opaque,le=w.transmissive;if(S.setupLights(),O.isArrayCamera){const pe=O.cameras;if(le.length>0)for(let me=0,we=pe.length;me<we;me++)No(re,le,v,pe[me]);Se&&rt.render(v);for(let me=0,we=pe.length;me<we;me++){const Ge=pe[me];Do(w,v,Ge,Ge.viewport)}}else le.length>0&&No(re,le,v,O),Se&&rt.render(v),Do(w,v,O)}ne!==null&&H===0&&(he.updateMultisampleRenderTarget(ne),he.updateRenderTargetMipmap(ne)),K&&P.end(L),v.isScene===!0&&v.onAfterRender(L,v,O),Cn.resetDefaultState(),de=-1,Le=null,F.pop(),F.length>0?(S=F[F.length-1],he.setTextureUnits(S.state.textureUnits),N===!0&&Je.setGlobalState(L.clippingPlanes,S.state.camera)):S=null,R.pop(),w=R.length>0?R[R.length-1]:null,D!==null&&D.renderEnd()},this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(v,O,G){const K=ie.get(v);K.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),ie.get(v.texture).__webglTexture=O,ie.get(v.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:G,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,O){const G=ie.get(v);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(v,O=0,G=0){ne=v,$=O,H=G;let K=null,q=!1,re=!1;if(v){const le=ie.get(v);if(le.__useDefaultFramebuffer!==void 0)return ee.bindFramebuffer(I.FRAMEBUFFER,le.__webglFramebuffer),Me.copy(v.viewport),ve.copy(v.scissor),te=v.scissorTest,ee.viewport(Me),ee.scissor(ve),ee.setScissorTest(te),void(de=-1);if(le.__webglFramebuffer===void 0)he.setupRenderTarget(v);else if(le.__hasExternalTextures)he.rebindTextures(v,ie.get(v.texture).__webglTexture,ie.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const we=v.depthTexture;if(le.__boundDepthTexture!==we){if(we!==null&&ie.has(we)&&(v.width!==we.image.width||v.height!==we.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");he.setupDepthRenderbuffer(v)}}const pe=v.texture;(pe.isData3DTexture||pe.isDataArrayTexture||pe.isCompressedArrayTexture)&&(re=!0);const me=ie.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(K=Array.isArray(me[O])?me[O][G]:me[O],q=!0):K=v.samples>0&&he.useMultisampledRTT(v)===!1?ie.get(v).__webglMultisampledFramebuffer:Array.isArray(me)?me[G]:me,Me.copy(v.viewport),ve.copy(v.scissor),te=v.scissorTest}else Me.copy(C).multiplyScalar(J).floor(),ve.copy(V).multiplyScalar(J).floor(),te=M;if(G!==0&&(K=Y),ee.bindFramebuffer(I.FRAMEBUFFER,K)&&ee.drawBuffers(v,K),ee.viewport(Me),ee.scissor(ve),ee.setScissorTest(te),q){const le=ie.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,le.__webglTexture,G)}else if(re){const le=O;for(let pe=0;pe<v.textures.length;pe++){const me=ie.get(v.textures[pe]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+pe,me.__webglTexture,G,le)}}else if(v!==null&&G!==0){const le=ie.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,le.__webglTexture,G)}de=-1},this.readRenderTargetPixels=function(v,O,G,K,q,re,le,pe=0){if(!v||!v.isWebGLRenderTarget)return void ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=ie.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&le!==void 0&&(me=me[le]),me){ee.bindFramebuffer(I.FRAMEBUFFER,me);try{const we=v.textures[pe],Ge=we.format,Xe=we.type;if(v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+pe),!Ce.textureFormatReadable(Ge))return void ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(Xe))return void ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");O>=0&&O<=v.width-K&&G>=0&&G<=v.height-q&&I.readPixels(O,G,K,q,tn.convert(Ge),tn.convert(Xe),re)}finally{const we=ne!==null?ie.get(ne).__webglFramebuffer:null;ee.bindFramebuffer(I.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(v,O,G,K,q,re,le,pe=0){if(!v||!v.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=ie.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&le!==void 0&&(me=me[le]),me){if(O>=0&&O<=v.width-K&&G>=0&&G<=v.height-q){ee.bindFramebuffer(I.FRAMEBUFFER,me);const we=v.textures[pe],Ge=we.format,Xe=we.type;if(v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+pe),!Ce.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ee),I.bufferData(I.PIXEL_PACK_BUFFER,re.byteLength,I.STREAM_READ),I.readPixels(O,G,K,q,tn.convert(Ge),tn.convert(Xe),0);const qe=ne!==null?ie.get(ne).__webglFramebuffer:null;ee.bindFramebuffer(I.FRAMEBUFFER,qe);const mt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await qo(I,mt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ee),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,re),I.deleteBuffer(Ee),I.deleteSync(mt),re}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,O=null,G=0){const K=Math.pow(2,-G),q=Math.floor(v.image.width*K),re=Math.floor(v.image.height*K),le=O!==null?O.x:0,pe=O!==null?O.y:0;he.setTexture2D(v,0),I.copyTexSubImage2D(I.TEXTURE_2D,G,0,0,le,pe,q,re),ee.unbindTexture()},this.copyTextureToTexture=function(v,O,G=null,K=null,q=0,re=0){let le,pe,me,we,Ge,Xe,Ee,qe,mt;const ut=v.isCompressedTexture?v.mipmaps[re]:v.image;if(G!==null)le=G.max.x-G.min.x,pe=G.max.y-G.min.y,me=G.isBox3?G.max.z-G.min.z:1,we=G.min.x,Ge=G.min.y,Xe=G.isBox3?G.min.z:0;else{const nn=Math.pow(2,-q);le=Math.floor(ut.width*nn),pe=Math.floor(ut.height*nn),me=v.isDataArrayTexture?ut.depth:v.isData3DTexture?Math.floor(ut.depth*nn):1,we=0,Ge=0,Xe=0}K!==null?(Ee=K.x,qe=K.y,mt=K.z):(Ee=0,qe=0,mt=0);const et=tn.convert(O.format),He=tn.convert(O.type);let tt;O.isData3DTexture?(he.setTexture3D(O,0),tt=I.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(he.setTexture2DArray(O,0),tt=I.TEXTURE_2D_ARRAY):(he.setTexture2D(O,0),tt=I.TEXTURE_2D),ee.activeTexture(I.TEXTURE0),ee.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),ee.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),ee.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const Mt=ee.getParameter(I.UNPACK_ROW_LENGTH),Ae=ee.getParameter(I.UNPACK_IMAGE_HEIGHT),Pe=ee.getParameter(I.UNPACK_SKIP_PIXELS),Xt=ee.getParameter(I.UNPACK_SKIP_ROWS),Ba=ee.getParameter(I.UNPACK_SKIP_IMAGES);ee.pixelStorei(I.UNPACK_ROW_LENGTH,ut.width),ee.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ut.height),ee.pixelStorei(I.UNPACK_SKIP_PIXELS,we),ee.pixelStorei(I.UNPACK_SKIP_ROWS,Ge),ee.pixelStorei(I.UNPACK_SKIP_IMAGES,Xe);const Rr=v.isDataArrayTexture||v.isData3DTexture,Gi=O.isDataArrayTexture||O.isData3DTexture;if(v.isDepthTexture){const nn=ie.get(v),Mi=ie.get(O),vn=ie.get(nn.__renderTarget),za=ie.get(Mi.__renderTarget);ee.bindFramebuffer(I.READ_FRAMEBUFFER,vn.__webglFramebuffer),ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,za.__webglFramebuffer);for(let Si=0;Si<me;Si++)Rr&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ie.get(v).__webglTexture,q,Xe+Si),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ie.get(O).__webglTexture,re,mt+Si)),I.blitFramebuffer(we,Ge,le,pe,Ee,qe,le,pe,I.DEPTH_BUFFER_BIT,I.NEAREST);ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(q!==0||v.isRenderTargetTexture||ie.has(v)){const nn=ie.get(v),Mi=ie.get(O);ee.bindFramebuffer(I.READ_FRAMEBUFFER,W),ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,z);for(let vn=0;vn<me;vn++)Rr?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,nn.__webglTexture,q,Xe+vn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,nn.__webglTexture,q),Gi?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Mi.__webglTexture,re,mt+vn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Mi.__webglTexture,re),q!==0?I.blitFramebuffer(we,Ge,le,pe,Ee,qe,le,pe,I.COLOR_BUFFER_BIT,I.NEAREST):Gi?I.copyTexSubImage3D(tt,re,Ee,qe,mt+vn,we,Ge,le,pe):I.copyTexSubImage2D(tt,re,Ee,qe,we,Ge,le,pe);ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Gi?v.isDataTexture||v.isData3DTexture?I.texSubImage3D(tt,re,Ee,qe,mt,le,pe,me,et,He,ut.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(tt,re,Ee,qe,mt,le,pe,me,et,ut.data):I.texSubImage3D(tt,re,Ee,qe,mt,le,pe,me,et,He,ut):v.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,re,Ee,qe,le,pe,et,He,ut.data):v.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,re,Ee,qe,ut.width,ut.height,et,ut.data):I.texSubImage2D(I.TEXTURE_2D,re,Ee,qe,le,pe,et,He,ut);ee.pixelStorei(I.UNPACK_ROW_LENGTH,Mt),ee.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ae),ee.pixelStorei(I.UNPACK_SKIP_PIXELS,Pe),ee.pixelStorei(I.UNPACK_SKIP_ROWS,Xt),ee.pixelStorei(I.UNPACK_SKIP_IMAGES,Ba),re===0&&O.generateMipmaps&&I.generateMipmap(tt),ee.unbindTexture()},this.initRenderTarget=function(v){ie.get(v).__webglFramebuffer===void 0&&he.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?he.setTextureCube(v,0):v.isData3DTexture?he.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?he.setTexture2DArray(v,0):he.setTexture2D(v,0),ee.unbindTexture()},this.resetState=function(){$=0,H=0,ne=null,ee.reset(),Cn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ve._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ve._getUnpackColorSpace()}}document.documentElement.dataset.runtimeState="booting";const it=window.IslandSystemsCore,Qe=window.IslandSystemsLevel,zi=document.querySelector("#island-systems-scene"),ya="research08:island-systems:v2",Ea=new URLSearchParams(window.location.search),ro=Ea.get("fixture")||"start",Rn=new Set(["start","craft-ready","combat","build-ready","complete","low-health"]).has(ro)?ro:"start",hi=Ea.get("motion")==="reduced"||window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(document.documentElement.dataset.reducedMotion=String(hi),Ea.get("fallback")==="1")throw new Error("WebGL fallback review fixture");const ye={startOverlay:document.querySelector("#start-overlay"),resultOverlay:document.querySelector("#result-overlay"),newGame:document.querySelector("#new-game-button"),continueGame:document.querySelector("#continue-button"),playAgain:document.querySelector("#play-again-button"),pause:document.querySelector("#pause-button"),restart:document.querySelector("#restart-button"),help:document.querySelector("#help-button"),helpPanel:document.querySelector("#help-panel"),paused:document.querySelector("#paused-label"),objectiveTitle:document.querySelector("#objective-title"),objectiveCopy:document.querySelector("#objective-copy"),hpCount:document.querySelector("#hp-count"),hpMeter:document.querySelector("#hp-meter"),tideTime:document.querySelector("#tide-time"),tideMeter:document.querySelector("#tide-meter"),enemyStatus:document.querySelector("#enemy-status"),enemyMeter:document.querySelector("#enemy-meter"),woodCount:document.querySelector("#wood-count"),stoneCount:document.querySelector("#stone-count"),resinCount:document.querySelector("#resin-count"),toolSlot:document.querySelector("#tool-slot"),toolName:document.querySelector("#tool-name"),contextPrompt:document.querySelector("#context-prompt"),message:document.querySelector("#world-message"),steps:[document.querySelector("#step-gather"),document.querySelector("#step-craft"),document.querySelector("#step-fight"),document.querySelector("#step-loot"),document.querySelector("#step-build")],resultKicker:document.querySelector("#result-kicker"),resultTitle:document.querySelector("#result-title"),resultCopy:document.querySelector("#result-copy"),resultTime:document.querySelector("#result-time"),resultTool:document.querySelector("#result-tool"),resultWorld:document.querySelector("#result-world")},Et=new Tu({canvas:zi,antialias:!0,powerPreference:"high-performance"});Et.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),Et.setSize(window.innerWidth,window.innerHeight,!1),Et.outputColorSpace=Rt,Et.shadowMap.enabled=!0,Et.shadowMap.type=1,Et.toneMapping=4,Et.toneMappingExposure=1.05;const en=new cl;en.background=new be(7116966),en.fog=new ll(7444385,.018);const Bn=new It(39,window.innerWidth/window.innerHeight,.1,120),ao=new U,_r=new U,di=new U(10.5,12.5,14.5),so=new bl(12969709,5919038,2.1);en.add(so);const pn=new Cl(16773068,2.7);pn.position.set(-8,18,7),pn.castShadow=!0,pn.shadow.mapSize.set(1024,1024),pn.shadow.camera.left=-17,pn.shadow.camera.right=17,pn.shadow.camera.top=15,pn.shadow.camera.bottom=-15,en.add(pn);const vt=new _t;en.add(vt);const We={sand:new st({color:11901542,roughness:.92,metalness:0}),wetSand:new st({color:7176565,roughness:.72}),rock:new st({color:3557712,roughness:.95}),rockLight:new st({color:5464681,roughness:.9}),wood:new st({color:7754808,roughness:.9}),woodLight:new st({color:10581835,roughness:.86}),leaf:new st({color:4614993,roughness:.88,side:2}),cloth:new st({color:12956046,roughness:.9}),trousers:new st({color:4148040,roughness:.95}),skin:new st({color:12157538,roughness:.82}),cyan:new st({color:7068376,emissive:1800059,emissiveIntensity:.85,roughness:.45}),fire:new st({color:16753735,emissive:16734745,emissiveIntensity:3,roughness:.35}),stonePickup:new st({color:10137520,roughness:.92}),resin:new st({color:6807725,emissive:2199401,emissiveIntensity:1.5,roughness:.38}),enemyBody:new st({color:3692872,roughness:.92}),enemyBark:new st({color:6769203,roughness:.96}),enemyWarning:new st({color:15228238,emissive:10429469,emissiveIntensity:1.4,roughness:.62})};function Ie(i,e,t,n={}){const r=new Nt(i,e);return r.position.set(t.x||0,t.y||0,t.z||0),r.rotation.set(n.rx||0,n.ry||0,n.rz||0),r.scale.set(n.sx||1,n.sy||1,n.sz||1),r.castShadow=n.cast!==!1,r.receiveShadow=n.receive!==!1,r}const vr={uTime:{value:0},uTide:{value:0},uNight:{value:0}},bu=new kt({uniforms:vr,vertexShader:`
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 p = position;
      float wave = sin(p.x * .52 + uTime * 1.25) * .10 + cos(p.y * .42 - uTime * .92) * .08;
      p.z += wave;
      vWave = wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,fragmentShader:`
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uNight;
    void main() {
      float bands = sin((vUv.x + vUv.y) * 90.0 + uTime * 1.4) * .5 + .5;
      vec3 dayDeep = vec3(.035, .27, .35);
      vec3 dayShallow = vec3(.09, .49, .53);
      vec3 nightDeep = vec3(.012, .055, .11);
      vec3 nightShallow = vec3(.025, .18, .25);
      vec3 deep = mix(dayDeep, nightDeep, uNight);
      vec3 shallow = mix(dayShallow, nightShallow, uNight);
      vec3 color = mix(deep, shallow, clamp(vUv.y * .58 + .2 + vWave, 0.0, 1.0));
      color += bands * .025 * (1.0 - uNight * .6);
      gl_FragColor = vec4(color, 1.0);
    }
  `,side:2}),wu=Ie(new On(80,80,80,80),bu,{x:0,y:-.5,z:0},{rx:-Math.PI/2,receive:!0,cast:!1});vt.add(wu);const Au=Ie(new sa(10.4,72),We.sand,{x:0,y:-.03,z:0},{rx:-Math.PI/2,sz:.63,receive:!0,cast:!1});vt.add(Au);const Ru=Ie(new wn(8.6,10.22,72),We.wetSand,{x:0,y:-.01,z:0},{rx:-Math.PI/2,sz:.63,receive:!0,cast:!1});vt.add(Ru);const oo=Ie(new On(7.3,2.1),new st({color:9280384,roughness:.72,transparent:!0,opacity:.95}),{x:-.25,y:.015,z:-2.1},{rx:-Math.PI/2,cast:!1});vt.add(oo);const lo=new yl({color:4891306,transparent:!0,opacity:.08,roughness:.22,metalness:0,transmission:.2,depthWrite:!1}),co=Ie(new On(7.5,2.22),lo,{x:-.25,y:.08,z:-2.1},{rx:-Math.PI/2,cast:!1});vt.add(co);const uo=[];[-3.1,-1.2,.8,2.65].forEach((i,e)=>{const t=Ie(new wn(.22,.3,24),new Kt({color:7725279,transparent:!0,opacity:0,side:2}),{x:i,y:.1,z:-2.1+Math.sin(e)*.12},{rx:-Math.PI/2,cast:!1,receive:!1});uo.push(t),vt.add(t)});function ho(i,e,t,n=We.rock){const r=Ie(new bn(.75,0),n,{x:i,y:t*.34-.02,z:e},{sx:t,sy:t*.68,sz:t*.86,ry:(i+e)*.27});return vt.add(r),r}Qe.obstacles.forEach((i,e)=>{i.id!=="fire-collar"&&ho(i.x,i.z,i.radius*1.1,e%2?We.rockLight:We.rock)}),[[-8.6,2.6,1.4],[-6.8,4.4,1.8],[-4.5,5.25,1.55],[-1.8,5.9,1.75],[1.2,5.75,1.45],[4.1,5.15,1.75],[7,4.15,1.6],[8.8,2.5,1.3],[-9.4,-.9,.8],[9.35,-.35,.9],[-7.7,-4.15,.7],[6.9,-4.2,.75]].forEach(([i,e,t],n)=>ho(i,e,t,n%3?We.rock:We.rockLight));function Cu(i,e,t=1){const n=new _t;n.position.set(i,0,e);const r=Ie(new dn(.055,.09,.75,7),We.wood,{x:0,y:.36,z:0},{rz:.1});n.add(r);for(let a=0;a<5;a+=1){const s=Ie(new Di(.16,.82,5),We.leaf,{x:0,y:.78,z:0},{rz:Math.PI/2,ry:a*Math.PI*2/5});s.position.x=Math.cos(a*Math.PI*2/5)*.28,s.position.z=Math.sin(a*Math.PI*2/5)*.28,n.add(s)}n.scale.setScalar(t),vt.add(n)}[[-7.9,1.85,.8],[-5.3,4.3,1],[-2.9,4.85,.75],[2.9,4.8,.9],[5.3,3.95,.75],[7.85,2.9,.9],[8,-1.7,.7],[-6.4,-4.35,.55]].forEach(i=>Cu(...i));const xr=new _t;xr.position.set(-7.65,.08,-3.65),xr.add(Ie(new Gt(2.1,.18,.35),We.wood,{x:0,y:.08,z:0},{ry:-.22})),xr.add(Ie(new Gt(1.5,.14,.28),We.woodLight,{x:.25,y:.13,z:.65},{ry:.45})),vt.add(xr);const Hi=new _t;Hi.position.set(Qe.tideMarker.x,0,Qe.tideMarker.z);const Pu=Ie(new dn(.09,.12,1.45,8),We.rockLight,{x:0,y:.72,z:0});Hi.add(Pu);for(let i=0;i<4;i+=1)Hi.add(Ie(new Gt(.42,.035,.05),We.cyan,{x:.17,y:.35+i*.25,z:0}));const Ta=Ie(new wn(.62,.72,40),new Kt({color:7791840,transparent:!0,opacity:.7,side:2}),{x:0,y:.05,z:0},{rx:-Math.PI/2,cast:!1,receive:!1});Hi.add(Ta),vt.add(Hi);const pi=new _t;pi.position.set(Qe.campfire.x,0,Qe.campfire.z);for(let i=0;i<12;i+=1){const e=i*Math.PI*2/12;pi.add(Ie(new bn(.22,0),We.rockLight,{x:Math.cos(e)*.68,y:.17,z:Math.sin(e)*.68},{sx:1.15,sy:.72,sz:1}))}for(let i=0;i<3;i+=1)pi.add(Ie(new dn(.1,.12,1.05,7),We.wood,{x:0,y:.25,z:0},{rz:Math.PI/2,ry:i*Math.PI/3}));const Mr=new _t;for(let i=0;i<7;i+=1){const e=Ie(new Fn(.18+i%2*.06,10,8),We.fire,{x:(i%3-1)*.18,y:.38+i*.12,z:(i*2%3-1)*.12},{sy:1.7,cast:!1,receive:!1});e.userData.phase=i*.9,Mr.add(e)}pi.add(Mr);const Sr=new Al(16747320,0,9,1.8);Sr.position.set(0,1.2,0),Sr.castShadow=!1,pi.add(Sr),vt.add(pi);const po=new Map;Qe.pickups.forEach((i,e)=>{const t=new _t;if(t.position.set(i.x,.14,i.z),t.rotation.y=e*.71,i.item==="wood")for(let a=0;a<3;a+=1){const s=Ie(new dn(.08,.1,.92,7),a===1?We.woodLight:We.wood,{x:(a-1)*.13,y:.08+a*.045,z:0},{rz:Math.PI/2,ry:.12*a});t.add(s)}else t.add(Ie(new bn(.3,0),We.stonePickup,{x:-.12,y:.12,z:0},{sx:1.05,sy:.7,sz:.9})),t.add(Ie(new bn(.22,0),We.rockLight,{x:.22,y:.08,z:.08},{sx:.9,sy:.65,sz:1.1}));const n=i.item==="wood"?15252857:11062224,r=Ie(new wn(.38,.45,28),new Kt({color:n,transparent:!0,opacity:.58,side:2}),{x:0,y:-.08,z:0},{rx:-Math.PI/2,cast:!1,receive:!1});t.add(r),po.set(i.id,t),vt.add(t)});const fn=new _t;fn.add(Ie(new oa(.32,0),We.resin,{x:0,y:.42,z:0},{sy:1.25})),fn.add(Ie(new wn(.43,.52,32),new Kt({color:7858365,transparent:!0,opacity:.72,side:2}),{x:0,y:.05,z:0},{rx:-Math.PI/2,cast:!1,receive:!1})),fn.visible=!1,vt.add(fn);function Lu(){const i=new _t,e=Ie(new si(.25,.62,4,8),We.cloth,{x:0,y:1.05,z:0},{sy:1.05}),t=Ie(new Fn(.25,16,12),We.skin,{x:0,y:1.75,z:0}),n=Ie(new Fn(.265,16,8,0,Math.PI*2,0,Math.PI*.58),new st({color:2827296,roughness:1}),{x:0,y:1.83,z:-.02}),r=Ie(new si(.085,.5,3,7),We.trousers,{x:-.13,y:.42,z:0}),a=r.clone();a.position.x=.13;const s=Ie(new si(.065,.45,3,7),We.skin,{x:-.34,y:1.12,z:0},{rz:-.15}),c=s.clone();c.position.x=.34,c.rotation.z=.15;const l=new _t;return l.position.set(.47,1.03,.02),l.rotation.z=-.28,l.add(Ie(new dn(.035,.045,.72,7),We.wood,{x:0,y:0,z:0},{rz:.06})),l.add(Ie(new Gt(.34,.2,.08),We.stonePickup,{x:-.12,y:.31,z:0},{rz:-.15})),l.visible=!1,i.add(e,t,n,r,a,s,c,l),i.userData.parts={leftLeg:r,rightLeg:a,leftArm:s,rightArm:c,axe:l},i}const yr=Lu();vt.add(yr);function Uu(){const i=new _t,e=Ie(new bn(.68,1),We.enemyBody,{x:0,y:.88,z:0},{sx:1.12,sy:.82,sz:.92}),t=Ie(new bn(.42,1),We.enemyBark,{x:0,y:1.3,z:-.5},{sx:1.1,sy:.86,sz:.95}),n=[];[[-.42,.35,-.28],[.42,.35,-.28],[-.4,.35,.3],[.4,.35,.3]].forEach(([o,u,p],h)=>{const d=Ie(new si(.1,.42,3,6),We.enemyBark,{x:o,y:u,z:p},{rz:h%2?-.18:.18});n.push(d),i.add(d)});const r=Ie(new dn(.035,.055,.55,6),We.woodLight,{x:-.26,y:1.72,z:-.48},{rz:-.52}),a=r.clone();a.position.x=.26,a.rotation.z=.52;const s=new Kt({color:9433285}),c=Ie(new Fn(.045,8,6),s,{x:-.16,y:1.37,z:-.84},{cast:!1,receive:!1}),l=c.clone();return l.position.x=.16,i.add(e,t,r,a,c,l),i.userData.parts={body:e,head:t,legs:n},i}const zn=Uu();vt.add(zn);const Vi=Ie(new wn(.85,1.38,44),new Kt({color:15688274,transparent:!0,opacity:.72,side:2}),{x:Qe.enemy.x,y:.08,z:Qe.enemy.z},{rx:-Math.PI/2,cast:!1,receive:!1});Vi.visible=!1,vt.add(Vi);const fo=[];for(let i=0;i<4;i+=1){const e=new _t,t=new Kt({color:14214623,side:2});e.add(Ie(new Di(.12,.7,3),t,{x:-.28,y:0,z:0},{rz:-Math.PI/2,ry:-.3,cast:!1,receive:!1})),e.add(Ie(new Di(.12,.7,3),t,{x:.28,y:0,z:0},{rz:Math.PI/2,ry:.3,cast:!1,receive:!1})),e.userData.phase=i*1.7,fo.push(e),en.add(e)}const Hn=new _t;Hn.position.set(8.2,.1,-11.5),Hn.add(Ie(new Gt(1.2,.18,.34),new st({color:1517099,roughness:.85}),{x:0,y:.14,z:0},{cast:!1})),Hn.add(Ie(new Gt(.035,.9,.035),We.rockLight,{x:0,y:.62,z:0},{cast:!1}));const Iu=new Kt({color:16765836}),mo=Ie(new Fn(.12,12,10),Iu,{x:0,y:.75,z:0},{cast:!1,receive:!1});Hn.add(mo),Hn.visible=!1,en.add(Hn);let X=it.createState(Qe,Rn),mn=!1,gn=!1,ba=!1,wa=!1,go=performance.now(),Aa=0,_n=null,fi=0,_o="",Ra=X.player.hp,Ca=X.eventId;const At=new Set,vo=new Il,Pa=new Ne,Du=new Tn(new U(0,1,0),0),La=new U,Nu=new be(7445930),Ou=new be(464420),Fu=new be(7444385),Bu=new be(530212);function xo(i){const e=Math.max(0,Math.ceil(i));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function zu(){const i=it.getObjective(X,Qe);return[i.title,i.copy,i.step]}function Hu(i){i!==_o&&(_o=i,ye.message.textContent=i,ye.message.classList.remove("flash"),ye.message.offsetWidth,ye.message.classList.add("flash"))}function mi(){const[i,e,t]=zu();ye.objectiveTitle.textContent=i,ye.objectiveCopy.textContent=e,ye.woodCount.textContent=String(X.inventory.wood),ye.stoneCount.textContent=String(X.inventory.stone),ye.resinCount.textContent=String(X.inventory.resin),ye.toolName.textContent=X.equipment.tool==="stoneAxe"?"石斧":"空",ye.toolSlot.classList.toggle("empty",X.equipment.tool!=="stoneAxe"),ye.hpCount.textContent=`${Math.round(X.player.hp)}%`,ye.hpMeter.style.width=`${X.player.hp}%`;const n=it.tideLevelAt(X.time);ye.tideTime.textContent=n>=1?"高潮":xo(it.secondsUntilHighTide(X.time)),ye.tideMeter.style.width=`${n*100}%`;const r=it.distance(X.player,X.enemy)<=Qe.enemy.aggroRadius+1||X.enemy.hp<Qe.enemy.maxHp;ye.enemyStatus.textContent=X.enemy.defeated?"已击退":r?`${X.enemy.hp}%`:"未发现",ye.enemyMeter.style.width=`${X.enemy.defeated?0:X.enemy.hp}%`,ye.steps.forEach((s,c)=>{s.className=c<t?"done":c===t?"active":""}),X.campfire.built&&ye.steps.forEach(s=>{s.className="done"});const a=it.getContextPrompt(X,Qe);ye.contextPrompt.hidden=!a,ye.contextPrompt.textContent=a,Hu(X.message)}function Er(){if(!(Rn!=="start"||!mn))try{localStorage.setItem(ya,it.serializeState(X)),ye.continueGame.hidden=!1}catch{}}function Mo(){try{const i=localStorage.getItem(ya);return i?it.restoreState(i,Qe):null}catch{return null}}function Vu(){try{localStorage.removeItem(ya)}catch{}}function Ua(i,e=!1){e&&Vu(),X=i,mn=!0,gn=!1,ba=!1,wa=!1,_n=null,Ra=X.player.hp,Ca=X.eventId,ye.startOverlay.hidden=!0,ye.resultOverlay.hidden=!0,ye.paused.hidden=!0,ye.pause.textContent="暂停",mi(),Da(0),Er()}function Ia(){Ua(it.createState(Qe),!0)}function So(i){Rn==="start"&&(ye.resultOverlay.hidden=!1,i?(ye.resultKicker.textContent="SURVIVAL CHAIN COMPLETE",ye.resultTitle.textContent="第一束火照亮了高地",ye.resultCopy.textContent="采集、装备、战斗、掉落和建造不再是五段演示；它们已经共同改变同一份角色与世界状态。"):(ye.resultKicker.textContent="SURVIVAL CHAIN INTERRUPTED",ye.resultTitle.textContent="潮木兽阻断了生存链",ye.resultCopy.textContent="敌人的红色预警会先于伤害出现。重试时保持距离，在它收招后再挥动石斧。"),ye.resultTime.textContent=xo(X.time),ye.resultTool.textContent=X.equipment.tool==="stoneAxe"?"石斧已装备":"未装备",ye.resultWorld.textContent=X.campfire.built?"篝火已点燃":"篝火未完成")}function yo(){!mn||gn||X.status!=="playing"||(it.interact(X,Qe),Er(),mi())}function Eo(){!mn||gn||X.status!=="playing"||(it.beginPlayerAttack(X)&&(_n=null),mi())}function Gu(i){let e=0,t=0;(At.has("KeyA")||At.has("ArrowLeft"))&&(e-=1),(At.has("KeyD")||At.has("ArrowRight"))&&(e+=1),(At.has("KeyW")||At.has("ArrowUp"))&&(t-=1),(At.has("KeyS")||At.has("ArrowDown"))&&(t+=1),(e||t)&&(_n=null),!e&&!t&&_n&&(it.distance(X.player,_n)<.18?_n=null:(e=_n.x-X.player.x,t=_n.z-X.player.z));const n=Math.hypot(e,t);if(!n)return!1;e/=n,t/=n;const r=At.has("ShiftLeft")||At.has("ShiftRight"),a=X.player.action!=="idle",s=(r?4.45:2.85)*(a?.18:1),c={x:X.player.x+e*s*i,z:X.player.z+t*s*i},l=it.resolveMove(X.player,c,Qe),o=it.distance(X.player,l)>1e-4;return X.player=l,o&&(it.setPlayerFacing(X,e,t),yr.rotation.y=Math.atan2(e,t)),o}function Da(i,e=!1){const t=it.tideLevelAt(X.time),n=X.campfire.built?1:it.clamp((X.time-118)/62,0,.84);vr.uTime.value+=i*(hi?.12:1),vr.uTide.value=t,vr.uNight.value=n,lo.opacity=.08+t*.72,co.position.y=.055+t*.13,oo.material.opacity=1-t*.72,uo.forEach((u,p)=>{u.material.opacity=Math.max(.08,.52-t*.44)*(.82+Math.sin(X.time*3+p)*.18)}),Ta.material.opacity=X.crafted.stoneAxe?.18:.58+Math.sin(X.time*3)*.18,Ta.rotation.z+=i*.35;const r=Nu.clone().lerp(Ou,n),a=Fu.clone().lerp(Bu,n);en.background.copy(r),en.fog.color.copy(a),so.intensity=2.1-n*1.3,pn.intensity=2.7-n*2.15,Et.toneMappingExposure=1.05-n*.2,Mr.visible=X.campfire.built,Sr.intensity=X.campfire.built?6.5+Math.sin(X.time*8)*.65:0,Mr.children.forEach((u,p)=>{const h=hi?1:1+Math.sin(X.time*8+u.userData.phase)*.18;u.scale.set(h,hi?1:1+Math.sin(X.time*6+p)*.25,h),hi||(u.position.x+=Math.sin(X.time*4+p)*i*.035)}),Hn.visible=X.campfire.built,mo.scale.setScalar(1+Math.sin(X.time*5)*.3),po.forEach((u,p)=>{const h=X.collectedPickupIds.includes(p);u.visible=!h,h||(u.position.y=.14+Math.sin(X.time*2.3+u.position.x)*.025,u.children[u.children.length-1].rotation.z+=i*.4)}),yr.position.set(X.player.x,0,X.player.z);const s=yr.userData.parts,c=e?Math.sin(X.time*10)*.55:0;s.leftLeg.rotation.x=c,s.rightLeg.rotation.x=-c,s.leftArm.rotation.x=-c*.7;const l=X.player.action==="startup"?.55:X.player.action==="active"?-1.15:X.player.action==="recovery"?-.35:0;if(s.rightArm.rotation.x=X.player.action==="idle"?c*.7:l,s.rightArm.rotation.z=X.player.action==="idle"?.15:-.38,s.axe.visible=X.equipment.tool==="stoneAxe",s.axe.rotation.x=X.player.action==="idle"?0:l*.72,zn.visible=!X.enemy.defeated,zn.position.set(X.enemy.x,0,X.enemy.z),!X.enemy.defeated){zn.rotation.y=Math.atan2(X.player.x-X.enemy.x,X.player.z-X.enemy.z);const u=X.enemy.state==="telegraph"||X.enemy.state==="active",p=zn.userData.parts.body;p.material=u?We.enemyWarning:We.enemyBody;const h=X.enemy.state==="approach"?Math.sin(X.time*8)*.08:0;zn.position.y=h;const d=X.enemy.state==="active"?1.16:X.enemy.state==="telegraph"?.9:1;zn.scale.set(1,1,d)}Vi.visible=X.enemy.state==="telegraph"||X.enemy.state==="active",Vi.position.set(X.enemy.x,.08,X.enemy.z),Vi.scale.setScalar(X.enemy.state==="active"?1.06:.86+Math.sin(X.time*10)*.06);const o=X.enemy.dropSpawned&&!X.collectedPickupIds.includes(Qe.enemy.drop.id);fn.visible=o,fn.position.set(Qe.enemy.drop.x,0,Qe.enemy.drop.z),o&&(fn.rotation.y+=i*1.2,fn.children[0].position.y=.42+Math.sin(X.time*3.2)*.08,fn.children[1].rotation.z+=i*.65),fo.forEach((u,p)=>{const h=X.time*(.11+p*.012)+u.userData.phase;u.position.set(Math.cos(h)*(12+p),7+Math.sin(h*2)*.5,Math.sin(h)*(8+p*.6)),u.rotation.y=-h,u.children.forEach((d,_)=>{d.rotation.y=(_?.3:-.3)+Math.sin(X.time*5+p)*.18})})}function ku(i){_r.set(X.player.x+di.x,di.y,X.player.z+di.z),fi>0&&!hi&&(fi=Math.max(0,fi-i),_r.x+=(Math.random()-.5)*fi*.7,_r.y+=(Math.random()-.5)*fi*.4);const e=1-Math.pow(.001,Math.min(i,.05));Bn.position.lerp(_r,e),ao.set(X.player.x+.65,.35,X.player.z-.35),Bn.lookAt(ao)}function To(i){const e=Math.min(.04,(i-go)/1e3||0);go=i;let t=!1;mn&&!gn&&X.status==="playing"&&(t=Gu(e),it.advance(X,Qe,e),X.player.hp<Ra&&(fi=.65),Ra=X.player.hp,X.eventId!==Ca&&(Ca=X.eventId,Er()),Aa+=e,Aa>=2&&(Aa=0,Er()),mi()),X.status==="complete"&&!ba&&(ba=!0,mn=Rn!=="start",window.setTimeout(()=>So(!0),900)),X.status==="failed"&&!wa&&(wa=!0,mn=!1,window.setTimeout(()=>So(!1),500)),Da(e,t),ku(e),Et.render(en,Bn),zi.dataset.drawCalls=String(Et.info.render.calls),zi.dataset.triangles=String(Et.info.render.triangles),requestAnimationFrame(To)}function Tr(i,e){const t=i.code||i.currentTarget.dataset.key;if(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","KeyE","Space","Escape"].includes(t)&&i.preventDefault(),t==="Escape"&&e&&!i.repeat){ye.pause.click();return}if(t==="KeyE"||t==="Space"){e&&!i.repeat&&(t==="Space"?Eo():yo());return}e?At.add(t):At.delete(t)}function Wu(i){if(!mn||gn||i.target!==zi||(Pa.x=i.clientX/window.innerWidth*2-1,Pa.y=-(i.clientY/window.innerHeight)*2+1,vo.setFromCamera(Pa,Bn),!vo.ray.intersectPlane(Du,La)))return;const e={x:La.x,z:La.z};it.isWalkable(e,Qe)?(_n=e,X.message="沿海岸移动"):X.message="那一处无法安全抵达",mi()}window.addEventListener("keydown",i=>Tr(i,!0)),window.addEventListener("keyup",i=>Tr(i,!1)),window.addEventListener("blur",()=>At.clear()),window.addEventListener("resize",()=>{Et.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),Et.setSize(window.innerWidth,window.innerHeight,!1),Bn.aspect=window.innerWidth/window.innerHeight,Bn.updateProjectionMatrix()}),zi.addEventListener("pointerdown",Wu),document.querySelectorAll("[data-key]").forEach(i=>{i.addEventListener("pointerdown",e=>{var t;(t=i.setPointerCapture)==null||t.call(i,e.pointerId),Tr({code:i.dataset.key,currentTarget:i,preventDefault(){},repeat:!1},!0)}),["pointerup","pointercancel","lostpointercapture"].forEach(e=>i.addEventListener(e,()=>{Tr({code:i.dataset.key,currentTarget:i,preventDefault(){},repeat:!1},!1)}))}),document.querySelector("#action-touch").addEventListener("click",yo),document.querySelector("#attack-touch").addEventListener("click",Eo),ye.newGame.addEventListener("click",Ia),ye.continueGame.addEventListener("click",()=>{const i=Mo();Ua(i||it.createState(Qe))}),ye.playAgain.addEventListener("click",Ia),ye.restart.addEventListener("click",Ia),ye.pause.addEventListener("click",()=>{!mn||X.status!=="playing"||(gn=!gn,ye.paused.hidden=!gn,ye.pause.textContent=gn?"继续":"暂停",At.clear())}),ye.help.addEventListener("click",()=>{const i=ye.help.getAttribute("aria-expanded")==="true";ye.help.setAttribute("aria-expanded",String(!i)),ye.helpPanel.hidden=i});const Xu=Mo();ye.continueGame.hidden=!Xu,Bn.position.set(X.player.x+di.x,di.y,X.player.z+di.z),mi(),Da(0),Rn!=="start"&&Ua(it.createState(Qe,Rn)),window.__ISLAND_SLICE__={level:Qe,fixture:Rn,renderer:Et,get state(){return X},getSnapshot(){return{fixture:Rn,status:X.status,inventory:{...X.inventory},equipment:{...X.equipment},playerHp:X.player.hp,enemyHp:X.enemy.hp,enemyState:X.enemy.state,campfireBuilt:X.campfire.built,tide:it.tideLevelAt(X.time),player:{...X.player},drawCalls:Et.info.render.calls,triangles:Et.info.render.triangles}}},document.documentElement.dataset.runtimeState="ready",requestAnimationFrame(To)})();
