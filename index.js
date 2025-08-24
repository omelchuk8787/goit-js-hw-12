import{S as f,a as c,i as u}from"./assets/vendor-CRV-VdLN.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const i=document.querySelector(".loader"),d=document.querySelector(".gallery");console.log(i);i&&(i.hidden=!0);const g=new f(".gallery-item a",{captionsData:"alt",captionDelay:250});function y(t){const s=q(t);d.insertAdjacentHTML("afterbegin",s),g.refresh()}function h(){d.innerHTML=""}function b(){i.hidden=!1}function L(){i.hidden=!0}function w(t){const{webformatURL:s,largeImageURL:a,tags:o,likes:e,views:r,comments:n,downloads:p}=t;return`<li class="gallery-item">
  <a class="gallery-link" href="${a}">
    <img
      class="gallery-image"
      src="${s}"
      alt="${o}"
    />
  </a><div class="stats">
  <p class="img-rates">Likes<span>${e}</span></p>
  <p class="img-rates">Views<span>${r}</span></p>
  <p class="img-rates">Comments<span>${n}</span></p>
  <p class="img-rates">Downloads<span>${p}</span></p></div>
</li>
`}function q(t){return console.log("imgs = ",t),t.map(w).join(`
`)}function v(t){c.defaults.baseURL="https://pixabay.com";const s={key:"49676421-fbb984ce693a0b40b5728e81f",q:`${t}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:21,page:1};return c.get("/api/",{params:s}).then(a=>{const o=a.data.hits;return console.log(o),o&&Array.isArray(o)&&o.length>0?o:u.show({title:"❌",message:"Sorry, there are no images matching <br> your search query. Please try again!",color:"red",position:"topRight",messageColor:"white",titleColor:"white"})}).catch(a=>{u.show({title:"Error",message:a.message})}).finally(()=>{L()})}const l=document.querySelector(".form"),m=l.querySelector("button");l.addEventListener("input",t=>{t.currentTarget.elements["search-text"].value.trim()?m.disabled=!1:m.disabled=!0});l.addEventListener("submit",t=>{t.preventDefault();const s=t.currentTarget.elements["search-text"].value.trim();t.currentTarget.nodeName!="BUTTON"&&(h(),b(),v(s).then(a=>y(a)).catch(a=>console.error(a)))});
//# sourceMappingURL=index.js.map
