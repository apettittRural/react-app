(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,function(e,t,n){e.exports=n(17)},,,,,,function(e,t,n){},,,,function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(4),u=n.n(c),o=(n(11),n(1)),l=n(2),s=n.n(l),i=(n(15),n(16),function(e){return r.a.createElement(r.a.Fragment,null,b.range(1,e.count).map(function(e){return r.a.createElement("div",{key:e,className:"star"})}))}),m=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"number",style:{backgroundColor:v[e.status]},onClick:function(){return e.onClick(e.number,e.status)}},e.number),r.a.createElement(s.a,{handleKeys:[e.number+""],onKeyEvent:function(t,n){return e.onClick(e.number,e.status)}}))},d=function(e){return r.a.createElement("div",{className:"game-done"},r.a.createElement("div",{className:"message",style:{color:"lost"==e.gameStatus?"red":"green"}},"lost"==e.gameStatus?"Game Over":"Nice"),r.a.createElement("button",{onClick:e.onClick},"Play Again"))},f=function(e){var t=function(){var e=Object(a.useState)(b.random(1,9)),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(b.range(1,9)),u=Object(o.a)(c,2),l=u[0],s=u[1],i=Object(a.useState)([]),m=Object(o.a)(i,2),d=m[0],f=m[1],g=Object(a.useState)(10.05),v=Object(o.a)(g,2),E=v[0],h=v[1];Object(a.useEffect)(function(){if(E>0&&l.length>0){var e=setTimeout(function(){var e=E-.01;h(Math.round(100*e)/100)},10);return function(){return clearTimeout(e)}}});return{stars:n,availableNums:l,candidateNums:d,secondsLeft:E,setGameState:function(e){if(b.sum(e)!==n)f(e);else{var t=l.filter(function(t){return!e.includes(t)});r(b.randomSumIn(t,9)),s(t),f([])}}}}(),n=t.stars,c=t.availableNums,u=t.candidateNums,l=t.secondsLeft,f=t.setGameState,g=b.sum(u)>n,v=0==c.length?"won":0===l?"lost":"active",E=function(e){return c.includes(e)?u.includes(e)?g?"wrong":"candidate":"available":"used"},h=function(e,t){if("active"===v&&"used"!=t){var n="available"===t?u.concat(e):u.filter(function(t){return t!==e});f(n)}};return 0===e.toggle?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"Press Enter To Start"),r.a.createElement(s.a,{handleKeys:["enter"],onKeyEvent:function(t,n){return e.startNewGame()}})):r.a.createElement("div",{className:"game"},r.a.createElement("div",{className:"help"},"Pick 1 or more numbers that sum to the number of stars"),r.a.createElement("div",{className:"body"},r.a.createElement("div",{className:"left"},"active"!==v?r.a.createElement(d,{onClick:e.startNewGame,gameStatus:v}):r.a.createElement(i,{count:n})),r.a.createElement("div",{className:"right"},b.range(1,9).map(function(e){return r.a.createElement(m,{key:e,status:E(e),number:e,onClick:h})}))),r.a.createElement("div",{className:"timer"},"Time Remaining: ",l),r.a.createElement(s.a,{handleKeys:["enter"],onKeyEvent:function(t,n){return e.startNewGame()}}))},g=function(){var e=Object(a.useState)(1),t=Object(o.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(0),l=Object(o.a)(u,2),s=l[0],i=l[1];return r.a.createElement(f,{key:n,startNewGame:function(){0===s&&i(s+1),c(n+1)},toggle:s})},v={available:"lightgray",used:"lightgreen",wrong:"lightcoral",candidate:"deepskyblue"},b={sum:function(e){return e.reduce(function(e,t){return e+t},0)},range:function(e,t){return Array.from({length:t-e+1},function(t,n){return e+n})},random:function(e,t){return e+Math.floor(t*Math.random())},randomSumIn:function(e,t){for(var n=[[]],a=[],r=0;r<e.length;r++)for(var c=0,u=n.length;c<u;c++){var o=n[c].concat(e[r]),l=b.sum(o);l<=t&&(n.push(o),a.push(l))}return a[b.random(0,a.length)]}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(function(){return r.a.createElement(g,null)},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[5,1,2]]]);
//# sourceMappingURL=main.9b8ad414.chunk.js.map