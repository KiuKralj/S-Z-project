// Funkcija za proveru vidljivosti za Expertise
function checkExpertiseVisibility(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');  // Dodajemo klasu visible kada postane vidljiv
            observer.unobserve(entry.target);  // Uklanjamo posmatranje nakon što se pojavi
        }
    });
}

// Funkcija za proveru vidljivosti za Logo
function checkLogoVisibility(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');  // Dodajemo klasu visible kada postane vidljiv
            observer.unobserve(entry.target);  // Uklanjamo posmatranje nakon što se pojavi
        }
    });
}

// Kreiramo IntersectionObserver za ekspertizu
const expertiseObserver = new IntersectionObserver(checkExpertiseVisibility, {
    threshold: 0.5 // Aktivira se kada je sekcija 50% vidljiva
});

// Kreiramo IntersectionObserver za logo
const logoObserver = new IntersectionObserver(checkLogoVisibility, {
    threshold: 1.0 // Aktivira se kada je logo 50% vidljiv
});

// Pratimo sekciju expertise
const expertiseSection = document.querySelector('.expertise-text-positioning');
expertiseObserver.observe(expertiseSection);

// Pratimo logo
const logo = document.querySelector('.logo-2');
logoObserver.observe(logo);

// Glatko skrolovanje sa usporavanjem
function smoothScroll(target) {
    const targetPosition = document.querySelector(target).offsetTop; // pozicija cilja
    let currentPosition = window.pageYOffset; // trenutna pozicija skrola

    // Funkcija za izračunavanje "ease-out" efekta
    const easeOut = (t) => {
        return 1 - Math.pow(1 - t, 3); // Koristi cubic easing za usporavanje na kraju
    };

    const scroll = (startTime) => {
        const timeElapsed = (performance.now() - startTime) / 1000; // Izračunaj vreme koje je prošlo
        const duration = 1; // Trajanje animacije u sekundama
        const progress = Math.min(timeElapsed / duration, 1); // Progress vrednost između 0 i 1

        const easeProgress = easeOut(progress); // Koristi "ease-out" efekt za usporavanje

        // Izračunaj pomak (step) koristeći ease-out
        const step = (targetPosition - currentPosition) * easeProgress;
        currentPosition += step;
        
        window.scrollTo(0, currentPosition); // Pomeri stranicu

        if (progress < 1) {
            requestAnimationFrame(() => scroll(startTime)); // Pozovi sledeći frame
        }
    };

    requestAnimationFrame((timestamp) => scroll(timestamp)); // Pokreni animaciju skrolovanja
}

// Dodajte event listener na navigacione linkove
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Sprečavamo podrazumevani ponašanje (skočiće odmah)
        const target = this.getAttribute('href');
        smoothScroll(target); // Umesto scrollIntoView, pozivamo smoothScroll
    });
});

// Funkcija za skrolovanje do sekcije
function scrollToSection() {
    // Pronađi sekciju sa id-jem 'expertise'
    const section = document.getElementById('expertise');
    
    // Skroluj do te sekcije sa glatkim pomeranjem
    smoothScroll('#expertise'); // Koristimo smoothScroll umesto scrollIntoView
}

// Dodaj event listener na dugme za skrolovanje
document.querySelector('.expertise button').addEventListener('click', scrollToSection);


let isScrollingToTop = false; // Flag koji označava da li se trenutno skroluje na vrh

function scrollToTop() {
    if (isScrollingToTop) return; // Ako već skrolujemo na vrh, ignorišemo nove pokušaje
    
    const targetPosition = 0;  // Pozicija vrha stranice
    let currentPosition = window.pageYOffset;  // Trenutna pozicija stranice
    
    const scrollSpeed = 250;  // Brža brzina za brže skrolovanje
    
    const scroll = () => {
        // Ako smo već stigli na vrh, zaustavi animaciju
        if (currentPosition <= targetPosition) {
            window.scrollTo(0, targetPosition);  // Pomeri direktno na vrh
            isScrollingToTop = false;  // Ponovo omogućavamo skrolovanje
            return;
        }

        // Pomeraj za konstantnu brzinu
        currentPosition -= Math.min(scrollSpeed, currentPosition - targetPosition); // Usmeravanje na konstantnu brzinu dok se ne dođe do vrha
        window.scrollTo(0, currentPosition);  // Pomeraćemo stranicu

        // Nastavljamo sa sledećim frejmovima
        requestAnimationFrame(scroll);  
    };

    isScrollingToTop = true;  // Označavamo da se trenutno skroluje na vrh
    scroll();  // Pokrećemo animaciju skrolovanja
}

// Dodajte event listener na dugme za skrolovanje na početak
document.getElementById('scrollToTop').addEventListener('click', scrollToTop);

// Početno sakrij dugme za skrolovanje na početak
document.getElementById('scrollToTop').classList.add('hidden');

// Detekcija skrolovanja i prikazivanje dugmeta
window.addEventListener('scroll', function() {
    const button = document.getElementById('scrollToTop');
    
    // Ako je korisnik skrolovao 100px ili više, dugme se prikazuje
    if (window.pageYOffset > 100) {
        button.classList.add('visible');
        button.classList.remove('hidden');
    } else {
        button.classList.add('hidden');
        button.classList.remove('visible');
    }
});










