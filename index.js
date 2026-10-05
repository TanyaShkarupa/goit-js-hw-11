import{a as w,S,i}from"./assets/vendor-C1DvvBV_.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const q="57885931-70be65b5a26a36e09f32ff59f",P="https://pixabay.com/api/",f=async(s,o=1)=>(await w.get(P,{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data,y=document.querySelector(".gallery"),m=document.querySelector(".loader"),p=document.querySelector(".load-more");let R=new S(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){const o=s.map(e=>`
        <li class="gallery-item">
          <a href="${e.largeImageURL}">
            <img
              src="${e.webformatURL}"
              alt="${e.tags}"
              loading="lazy"
            />
            <div class="info">
              <div class="info-item">
                <b>Likes</b>
                <span>${e.likes}</span>
              </div>
              <div class="info-item">
                <b>Views</b>
                <span>${e.views}</span>
              </div>
              <div class="info-item">
                <b>Comments</b>
                <span>${e.comments}</span>
              </div>
              <div class="info-item">
                <b>Downloads</b>
                <span>${e.downloads}</span>
              </div>
            </div>
          </a>
        </li>
      `).join("");y.insertAdjacentHTML("beforeend",o),R.refresh()}function $(){y.innerHTML=""}function g(){m.classList.remove("is-hidden")}function b(){m.classList.add("is-hidden")}function v(){p.classList.remove("is-hidden")}function a(){p.classList.add("is-hidden")}const d=document.querySelector(".form"),E=document.querySelector(".load-more");let u="",n=1;const L=15;a();d.addEventListener("submit",async s=>{s.preventDefault();const o=d.elements["search-text"].value.trim();if(!o){i.warning({message:"Please enter a search query!",position:"topRight"});return}u=o,n=1,a(),$(),g();try{const e=await f(u,n);if(e.hits.length===0){i.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(e.hits),n*L>=e.totalHits?(a(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):v()}catch{i.error({message:"Something went wrong. Please try again later!",position:"topRight"})}finally{b()}d.reset()});E.addEventListener("click",async()=>{n+=1,a(),g();try{const s=await f(u,n);h(s.hits),n*L>=s.totalHits?(a(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):v();const e=document.querySelector(".gallery").querySelector(".gallery-item");if(e){const{height:l}=e.getBoundingClientRect();window.scrollBy({top:l*2,behavior:"smooth"})}}catch{i.error({message:"Something went wrong. Please try again later!",position:"topRight"})}finally{b()}});
//# sourceMappingURL=index.js.map
