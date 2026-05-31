emailjs.init("Pis_vJvaOkIIhj3kG");
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
});
function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();
document.querySelectorAll('a, button, .skill-card, .project-card, .contact-method').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    cursorRing.style.width = '60px'; cursorRing.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    cursorRing.style.width = '40px'; cursorRing.style.height = '40px';
  });
});

const loaderBar = document.getElementById('loaderBar');
const loaderPercent = document.getElementById('loaderPercent');
const loaderText = document.getElementById('loaderText');
const loader = document.getElementById('loader');
gsap.to(loaderText, { opacity: 1, duration: 0.5 });
let pct = 0;
const msgs = ['Initializing Portfolio', 'Loading Assets', 'Rendering Interface', 'Ready'];
const interval = setInterval(() => {
  pct += Math.random() * 18;
  if (pct > 100) pct = 100;
  loaderBar.style.width = pct + '%';
  loaderPercent.textContent = Math.floor(pct) + '%';
  if (pct > 30) loaderText.textContent = msgs[1];
  if (pct > 65) loaderText.textContent = msgs[2];
  if (pct >= 100) {
    loaderText.textContent = msgs[3];
    clearInterval(interval);
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 1, duration: 0.6, ease: 'power2.inOut',
        onComplete: () => { loader.style.display = 'none'; initHeroAnimations(); }
      });
    }, 300);
  }
}, 80);

function initHeroAnimations() {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('#heroTag', { opacity: 1, y: 0, duration: 0.6 }, 0)
    .to('#heroName', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
    .to('#heroRole', { opacity: 1, duration: 0.6 }, 0.5)
    .to('#heroDesc', { opacity: 1, y: 0, duration: 0.7 }, 0.6)
    .to('#heroBtns', { opacity: 1, y: 0, duration: 0.6 }, 0.8)
    .to('#heroStats', { opacity: 1, duration: 0.6 }, 1.0)
    .to('#scrollHint', { opacity: 1, duration: 0.6 }, 1.1);

  const roles = ['Full Stack Developer','Angular Specialist','.NET Core Engineer','UI/UX Enthusiast','API Architect','DevExtreme Expert'];
  let roleIdx = 0, charIdx = 0, deleting = false;
  const typedEl = document.getElementById('typed');
  function typeLoop() {
    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    } else {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 50 : 80);
  }
  setTimeout(typeLoop, 1200);

  function countUp(id, target, duration) {
    const el = document.getElementById(id);
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start);
    }, 16);
  }
  setTimeout(() => {
    countUp('expCount', 4, 1200);
    countUp('projCount', 15, 1500);
    countUp('techCount', 20, 1800);
  }, 1200);

  gsap.utils.toArray('.timeline-item').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.7, delay: i * 0.15,
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    gsap.to('.hero-glow', { x, y, duration: 1.5, ease: 'power1.out' });
    gsap.to('.hero-glow2', { x: -x * 0.5, y: -y * 0.5, duration: 2, ease: 'power1.out' });
  });

  gsap.utils.toArray('.skill-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 1, y: 40, duration: 0.6, delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  gsap.utils.toArray('.project-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 1, y: 50, duration: 0.7, delay: i * 0.12,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

function sendEmail() {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const message = document.getElementById('fmsg').value.trim();

    const msgEl = document.getElementById('formMsg');
    const btn = document.getElementById('formSubmit');

    msgEl.style.display = 'none';
    msgEl.className = 'form-msg';

    // Validation
    if (!name || !email || !message) {
        msgEl.textContent = '⚠ Please fill in all required fields.';
        msgEl.className = 'form-msg error';
        msgEl.style.display = 'block';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        msgEl.textContent = '⚠ Please enter a valid email address.';
        msgEl.className = 'form-msg error';
        msgEl.style.display = 'block';
        return;
    }

    btn.disabled = true;
    btn.innerHTML = 'Sending...';

    const templateParams = {
        name: name,
        email: email,
        subject: subject || 'Portfolio Contact',
        message: message,
        time: new Date().toLocaleString()
    };

    emailjs.send(
        'service_ocj3thb',
        'template_0ozmrzg',
        templateParams
    )
    .then(function () {

        msgEl.textContent = '✅ Message sent successfully!';
        msgEl.className = 'form-msg success';
        msgEl.style.display = 'block';

        document.getElementById('fname').value = '';
        document.getElementById('femail').value = '';
        document.getElementById('fsubject').value = '';
        document.getElementById('fmsg').value = '';

    })
    .catch(function (error) {

        msgEl.textContent = '❌ Failed to send message. Please try again.';
        msgEl.className = 'form-msg error';
        msgEl.style.display = 'block';

        console.error('EmailJS Error:', error);
    })
    .finally(function () {
        btn.disabled = false;
        btn.innerHTML = 'Send Message →';
    });
}