var left=document.getElementById("left"),right=document.getElementById("right"),container=document.querySelector(".partners-widget-content"),logos=document.querySelectorAll(".reference-image");left.addEventListener("click",function(){var e=container.getAttribute("data-position"),t=container.offsetWidth;e=Number(e)-t/5,[].forEach.call(logos,function(n){if(Number(logos.length)*(t/5)-t+Number(e)>=0){var o=e+"px";n.style.left=o,container.setAttribute("data-position",e)}})}),right.addEventListener("click",function(){var e=container.getAttribute("data-position"),t=container.offsetWidth;e=Number(e)+t/5,[].forEach.call(logos,function(t){if(e<=0){var n=e+"px";t.style.left=n,container.setAttribute("data-position",e)}})});var changeLabelStyle=function(e){e.classList.remove("hidden"),e.style.fontSize="1em",e.style.top="0px"},formName=document.querySelector(".contact-form");[].forEach.call(formName.querySelectorAll(".input-field"),function(e){e.addEventListener("focus",function(){e.setAttribute("placeholder","");var t="label[for="+e.getAttribute("name")+"]",n=formName.querySelector(t);changeLabelStyle(n)})});var removeActiveStatus=function(e){[].forEach.call(document.querySelectorAll(e),function(e){e.classList.remove("active")})},selectActiveElement=function(e,t){e.classList.add("active"),[].forEach.call(document.querySelectorAll(t),function(e){e.classList.add("off")});var n=e.getAttribute("data-name");document.getElementById(n).classList.remove("off")};[].forEach.call(document.querySelectorAll(".desktop-package-item"),function(e){e.addEventListener("click",function(){removeActiveStatus(".desktop-package-item"),selectActiveElement(e,".package-details")})}),[].forEach.call(document.querySelectorAll(".mobile-package-item"),function(e){e.addEventListener("click",function(){removeActiveStatus(".mobile-package-item"),selectActiveElement(e,".mobile-package-details")})});var removeActiveMenu=function(){[].forEach.call(document.querySelectorAll(".list-element"),function(e){e.classList.remove("active-menu")})};[].forEach.call(document.querySelectorAll(".menu-element"),function(e){e.addEventListener("click",function(){removeActiveMenu(),e.querySelector(".list-element").classList.add("active-menu")})});var menu=document.getElementById("menuKebab"),rotate=function(e,t){[].forEach.call(document.querySelectorAll(e),function(e){e.style.transform="rotate("+t+")"})},hideMiddleLine=function(e){[].forEach.call(document.querySelectorAll(e),function(e){e.classList.toggle("off")})},hamburger=document.querySelector(".hamburger-menu"),mobileMenu=document.querySelector(".mobile-menu"),mobileElements=document.querySelectorAll(".mobile-element");menu.addEventListener("click",function(){menu.classList.contains("rotated")?(rotate(".x-1","0deg"),rotate(".x-2","0deg"),menu.querySelector(".sanyi").style.marginBottom="7px",mobileMenu.style.top="100%"):(rotate(".x-1","45deg"),rotate(".x-2","-45deg"),menu.querySelector(".sanyi").style.marginBottom="13px",mobileMenu.style.top="0"),hideMiddleLine(".x-m"),menu.classList.toggle("rotated")}),[].forEach.call(mobileElements,function(e){e.addEventListener("click",function(){rotate(".x-1","0deg"),rotate(".x-2","0deg"),menu.querySelector(".sanyi").style.marginBottom="7px",mobileMenu.style.top="100%",hideMiddleLine(".x-m"),menu.classList.toggle("rotated")})});