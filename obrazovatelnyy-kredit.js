const menu = document.querySelector('.menu-button');
const burgerMenu = document.querySelector('.burger-menu');

function openMenu(){
  if(!menu || !burgerMenu) return;
  menu.classList.add('is-open');
  burgerMenu.classList.add('is-open');
  menu.setAttribute('aria-expanded','true');
  burgerMenu.setAttribute('aria-hidden','false');
  document.body.classList.add('menu-open');
}
function closeMenu(){
  if(!menu || !burgerMenu) return;
  menu.classList.remove('is-open');
  burgerMenu.classList.remove('is-open');
  menu.setAttribute('aria-expanded','false');
  burgerMenu.setAttribute('aria-hidden','true');
  document.body.classList.remove('menu-open');
}
menu?.addEventListener('click',()=>burgerMenu?.classList.contains('is-open') ? closeMenu() : openMenu());
document.querySelectorAll('.burger-menu a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i*45,240)}ms`;observer.observe(el)});

const emblem=document.querySelector('.credit-hero__emblem');
window.addEventListener('scroll',()=>{
  if(!emblem || window.innerWidth<700)return;
  emblem.style.transform=`translateY(${Math.min(window.scrollY*.06,25)}px)`;
},{passive:true});
