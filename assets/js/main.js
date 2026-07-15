/* ==========================================================
   QuantumHost Main JavaScript
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
        MOBILE MENU
    =========================== */

    const menuBtn = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const navButtons = document.querySelector(".nav-buttons");

    if(menuBtn){

        menuBtn.addEventListener("click", () =>{

            navLinks.classList.toggle("active");
            navButtons.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if(icon.classList.contains("fa-bars")){

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            }else{

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }

    /* ===========================
        STICKY NAVBAR
    =========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", ()=>{

        if(window.scrollY > 50){

            header.classList.add("sticky");

        }else{

            header.classList.remove("sticky");

        }

    });

    /* ===========================
        SMOOTH SCROLL
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

    /* ===========================
        COUNTER ANIMATION
    =========================== */

    const counters=document.querySelectorAll(".stat-card h2");

    const speed=80;

    const animateCounter=(counter)=>{

        const targetText=counter.innerText;

        const target=parseInt(targetText.replace(/\D/g,""));

        if(isNaN(target)) return;

        let count=0;

        const update=()=>{

            const increment=Math.ceil(target/speed);

            count+=increment;

            if(count<target){

                counter.innerText=targetText.replace(target,count);

                requestAnimationFrame(update);

            }else{

                counter.innerText=targetText;

            }

        }

        update();

    }

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    });

    counters.forEach(counter=>{

        observer.observe(counter);

    });

    /* ===========================
        FADE ANIMATION
    =========================== */

    const hiddenElements=document.querySelectorAll(

        ".feature-card,.stat-card,.hero-text,.hero-image,.cta"

    );

    hiddenElements.forEach(el=>{

        el.classList.add("hidden");

    });

    const fadeObserver=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    hiddenElements.forEach(el=>{

        fadeObserver.observe(el);

    });

});

/* ===========================
    SCROLL TO TOP BUTTON
=========================== */

const topButton=document.createElement("button");

topButton.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

topButton.className="scrollTop";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topButton.classList.add("show");

    }else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
