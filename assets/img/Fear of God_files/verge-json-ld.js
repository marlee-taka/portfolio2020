!function(){var e=new XMLHttpRequest;e.open("GET","/tools/verge-json-ld?url="+window.location,!0),e.onload=function(){if(e.status>=200&&e.status<400){var o=document.getElementsByTagName("head")[0],t=document.createElement("script");t.innerHTML=e.responseText,t.type="application/ld+json",o.appendChild(t)}else console.log("Verge Free JSON-LD Error: Could not reach proxy, please make sure it is set to /tools/verge-json-ld")},e.send()}();