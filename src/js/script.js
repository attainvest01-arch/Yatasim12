// script.js
document.addEventListener("DOMContentLoaded", () => {
    
    // 0. Smooth Scroll for Nav Links + Active State Update
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 1. Sticky Header Transparent to Solid Effect
    const header = document.querySelector('.header-glass');
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.1) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Hero Component Auto-Slider Vanilla Logic
    const slidesData = [
        {
            img: "/WhatsApp%20Image%202026-04-05%20at%2021.05.30.jpeg",
            headline: "Mencetak Generasi Rabbani yang Mandiri & Beradab.",
            subheadline: "Kami percaya pendidikan bukan sekadar transfer ilmu, melainkan proses menanamkan adab dan kemandirian sebagai fondasi masa depan.",
            cta: { label: "Mulai Menjelajah", href: "#tentang", icon: "explore" }
        },
        {
            img: "/WhatsApp%20Image%202026-04-05%20at%2021.05.37.jpeg",
            headline: "Lingkungan Belajar yang Hangat & Kondusif.",
            subheadline: "Ruang tumbuh kembang yang dirancang khusus agar setiap anak merasa aman untuk bereksplorasi dan menemukan potensi terbaik mereka.",
            cta: { label: "Lihat Kegiatan Kami", href: "#galeri", icon: "play_circle" }
        }
    ];

    const sliderContainer = document.getElementById('hero-slider');
    const heroCTAWrapper = document.querySelector('.hero-cta-wrapper');

    function updateHeroCTA(slide) {
        if (!heroCTAWrapper) return;
        heroCTAWrapper.innerHTML = `
            <a href="${slide.cta.href}" class="btn btn-primary fade-stagger-1" style="padding:1.25rem 2.5rem;font-size:1.125rem;">
                <span class="material-symbols-outlined" style="font-size:20px;">${slide.cta.icon}</span>
                ${slide.cta.label}
            </a>
            <a href="#donasi" class="btn btn-hero-outline fade-stagger-2" style="padding:1.25rem 2.5rem;font-size:1.125rem;">
                Salurkan Kebaikan
            </a>`;
    }

    if (sliderContainer) {
        slidesData.forEach((slide, idx) => {
            const slideHtml = `
            <div class="slide-item ${idx === 0 ? 'active' : ''}">
                <img src="${slide.img}" alt="Hero Image ${idx + 1}" />
                <div class="hero-slide-text">
                    <span class="text-label-md" style="color: var(--surface-container-lowest); letter-spacing: 0.2em; display:block; margin-bottom:1.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">Rumah Belajar Insan Mandiri</span>
                    <h1 class="text-gradient">${slide.headline}</h1>
                    <p style="text-shadow: 0 2px 4px rgba(0,0,0,0.8);">${slide.subheadline}</p>
                </div>
            </div>`;
            sliderContainer.insertAdjacentHTML('beforeend', slideHtml);
        });

        // Set initial CTA
        updateHeroCTA(slidesData[0]);

        const slideElements = sliderContainer.querySelectorAll('.slide-item');
        let currentHeroIndex = 0;

        setInterval(() => {
            slideElements[currentHeroIndex].classList.remove('active');
            currentHeroIndex = (currentHeroIndex + 1) % slideElements.length;
            slideElements[currentHeroIndex].classList.add('active');
            updateHeroCTA(slidesData[currentHeroIndex]);
        }, 5000);
    }

    // 3. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Count-up Animation for Impact Stats
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                const index = counter.dataset.index || 0;
                setTimeout(updateCounter, index * 200);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach((counter, idx) => {
        counter.dataset.index = idx;
        counterObserver.observe(counter);
    });

    // 5. Interactive FAQ Accordion — uses 'is-open' to avoid conflict with reveal's 'active'
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isCurrentlyOpen = item.classList.contains('is-open');
            // Close all
            faqItems.forEach(otherItem => otherItem.classList.remove('is-open'));
            // Toggle current
            if (!isCurrentlyOpen) {
                item.classList.add('is-open');
            }
        });
    });

    // 6. Program Tabs Logic — Smooth Fade Transition
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = `tab-${btn.getAttribute('data-tab')}`;
            const targetContent = document.getElementById(targetId);
            if (!targetContent || targetContent.classList.contains('active')) return;

            // Fade out current active tab
            tabContents.forEach(tc => {
                tc.classList.remove('active');
                tc.style.display = 'none';
                tc.style.opacity = '0';
            });

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Fade in new tab
            targetContent.style.display = 'block';
            targetContent.style.opacity = '0';
            
            // force reflow
            void targetContent.offsetWidth;
            
            targetContent.classList.add('active');
            targetContent.style.transition = 'opacity 0.4s ease';
            targetContent.style.opacity = '1';
        });
    });

    // 7. Donation CTA Switch — Smooth Animated Expand
    const btnMulaiDonasi = document.getElementById('btn-mulai-donasi');
    const donationOptions = document.getElementById('donation-options');
    if (btnMulaiDonasi && donationOptions) {
        btnMulaiDonasi.addEventListener('click', () => {
            // Fade out the main button
            btnMulaiDonasi.style.opacity = '0';
            btnMulaiDonasi.style.transform = 'translateY(-10px) scale(0.95)';
            btnMulaiDonasi.style.transition = 'all 0.35s cubic-bezier(0.16,1,0.3,1)';
            setTimeout(() => {
                btnMulaiDonasi.style.display = 'none';
                // Fade in option buttons
                donationOptions.style.display = 'flex';
                donationOptions.style.opacity = '0';
                donationOptions.style.transform = 'translateY(12px)';
                donationOptions.style.transition = 'all 0.45s cubic-bezier(0.16,1,0.3,1)';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        donationOptions.style.opacity = '1';
                        donationOptions.style.transform = 'translateY(0)';
                    });
                });
            }, 370);
        });
    }

    // 8. Testimonial Auto-Rotating Slider
    (function initTestimonialSlider() {
        const slider = document.getElementById('testimonial-slider');
        const dotsContainer = document.getElementById('testimonial-dots');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');

        if (!slider || !dotsContainer) return;

        const slides = slider.querySelectorAll('.testimonial-slide');
        if (slides.length === 0) return;

        let current = 0;
        let autoTimer = null;

        // Build dots dynamically
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('tdot');
            dot.setAttribute('aria-label', `Testimonial ${idx + 1}`);
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                stopAuto();
                goTo(idx);
                startAuto();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.tdot');

        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = ((index % slides.length) + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        function startAuto() {
            autoTimer = setInterval(() => goTo(current + 1), 4000);
        }

        function stopAuto() {
            if (autoTimer) {
                clearInterval(autoTimer);
                autoTimer = null;
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAuto();
                goTo(current - 1);
                startAuto();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAuto();
                goTo(current + 1);
                startAuto();
            });
        }

        // Pause on hover
        const wrapper = slider.closest('.testimonial-slider-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', stopAuto);
            wrapper.addEventListener('mouseleave', startAuto);
        }

        startAuto();
    })();

    // 9. Mobile Nav Drawer
    (function initMobileNav() {
        const hamburger = document.getElementById('nav-hamburger');
        const drawer    = document.getElementById('mobile-nav-drawer');
        const overlay   = document.getElementById('mobile-nav-overlay');
        const closeBtn  = document.getElementById('mobile-nav-close');

        if (!hamburger || !drawer || !overlay) return;

        function openDrawer() {
            drawer.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeDrawer() {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', openDrawer);
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        overlay.addEventListener('click', closeDrawer);

        // Close drawer when a link is clicked
        drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    })();

    // 10. Video Carousel — drag-to-scroll + nav arrows + dots
    (function initVideoCarousel() {
        const carousel  = document.getElementById('video-carousel');
        const prevBtn   = document.getElementById('carousel-prev');
        const nextBtn   = document.getElementById('carousel-next');
        const dotsContainer = document.getElementById('carousel-dots');

        if (!carousel) return;

        const cards = carousel.querySelectorAll('.video-card');
        const total = cards.length;

        // Build dots
        if (dotsContainer) {
            cards.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('cdot');
                dot.setAttribute('aria-label', `Video ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => scrollToCard(i));
                dotsContainer.appendChild(dot);
            });
        }

        function getActiveDots() {
            return dotsContainer ? dotsContainer.querySelectorAll('.cdot') : [];
        }

        function updateDots(idx) {
            getActiveDots().forEach((d, i) => d.classList.toggle('active', i === idx));
        }

        function scrollToCard(idx) {
            const card = cards[idx];
            if (!card) return;
            carousel.scrollTo({ left: card.offsetLeft - carousel.offsetLeft, behavior: 'smooth' });
        }

        function getActiveIndex() {
            // Fix for getting stuck on last cards when max scroll is reached early
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScroll - 5 && maxScroll > 0) return total - 1;

            let closest = 0;
            let minDist = Infinity;
            cards.forEach((card, i) => {
                const dist = Math.abs(card.offsetLeft - carousel.scrollLeft);
                if (dist < minDist) { minDist = dist; closest = i; }
            });
            return closest;
        }

        carousel.addEventListener('scroll', () => updateDots(getActiveIndex()), { passive: true });

        // Drag to scroll
        let isDragging = false, startX = 0, startScrollLeft = 0;
        carousel.addEventListener('mousedown', e => {
            isDragging = true;
            startX = e.pageX - carousel.offsetLeft;
            startScrollLeft = carousel.scrollLeft;
            carousel.style.userSelect = 'none';
            stopAuto();
        });
        window.addEventListener('mousemove', e => {
            if (!isDragging) return;
            const x = e.pageX - carousel.offsetLeft;
            carousel.scrollLeft = startScrollLeft - (x - startX);
        });
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                carousel.style.userSelect = '';
                startAuto();
            }
        });

        // Auto-slide every 3 seconds
        let autoTimer = null;

        function startAuto() {
            stopAuto();
            autoTimer = setInterval(() => {
                const idx = getActiveIndex();
                const next = (idx + 1) % total;
                scrollToCard(next);
            }, 3000);
        }

        function stopAuto() {
            if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
        }

        // Pause on hover
        const wrapper = carousel.closest('.video-carousel-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', stopAuto);
            wrapper.addEventListener('mouseleave', startAuto);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); const idx = Math.max(0, getActiveIndex() - 1); scrollToCard(idx); startAuto(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); const idx = (getActiveIndex() + 1) % total; scrollToCard(idx); startAuto(); });

        startAuto();
    })();

    // 11. Video Modal — opens with lazy YouTube iframe, stops video on close
    (function initVideoModal() {
        const backdrop = document.getElementById('video-modal-backdrop');
        const iframe   = document.getElementById('video-modal-iframe');
        const closeBtn = document.getElementById('video-modal-close');

        if (!backdrop || !iframe) return;

        function openModal(videoId) {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            backdrop.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeModal() {
            iframe.src = '';
            backdrop.classList.remove('open');
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.video-card[data-video-id]').forEach(card => {
            card.addEventListener('click', () => openModal(card.dataset.videoId));
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', e => {
            if (e.target === backdrop) closeModal();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
        });
    })();

    // 12. Program Cards — Smooth Inline Expand ("Baca Selengkapnya")
    (function initProgramExpand() {
        document.querySelectorAll('.btn-baca-selengkapnya').forEach(btn => {
            const card = btn.closest('.program-card');
            if (!card) return;

            const descEl = card.querySelector('.program-desc-truncated');
            const fullEl = card.querySelector('.program-desc-full');
            if (!descEl) return;

            let expanded = false;

            btn.addEventListener('click', () => {
                expanded = !expanded;

                if (expanded) {
                    // Collapse truncated, expand full
                    descEl.style.maxHeight = '0';
                    descEl.style.opacity = '0';
                    descEl.style.marginBottom = '0';

                    if (fullEl) {
                        // Measure height then animate
                        fullEl.style.display = 'block';
                        const h = fullEl.scrollHeight;
                        fullEl.style.maxHeight = '0';
                        fullEl.style.opacity = '0';
                        // Force reflow
                        void fullEl.offsetHeight;
                        fullEl.style.maxHeight = h + 'px';
                        fullEl.style.opacity = '1';
                    }

                    btn.innerHTML = 'Tutup <span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle;">expand_less</span>';
                } else {
                    // Restore truncated, collapse full
                    descEl.style.maxHeight = '';
                    descEl.style.opacity = '1';
                    descEl.style.marginBottom = '';

                    if (fullEl) {
                        fullEl.style.maxHeight = '0';
                        fullEl.style.opacity = '0';
                        setTimeout(() => { fullEl.style.display = 'none'; }, 450);
                    }

                    btn.innerHTML = 'Baca Selengkapnya <span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle;">chevron_right</span>';
                }
            });
        });
    })();

<<<<<<< HEAD
    // 13. QRIS Donation Flow
    (function initQrisFlow() {
        const btnDonasiQris = document.getElementById('btn-donasi-qris');
        const qrisBackdrop = document.getElementById('qris-modal-backdrop');
        const qrisClose = document.getElementById('qris-modal-close');
        
        const step1 = document.getElementById('qris-step-1');
        const step2 = document.getElementById('qris-step-2');
        const step3 = document.getElementById('qris-step-3');
        
        const btnLanjut = document.getElementById('btn-qris-lanjut');
        const btnSudah = document.getElementById('btn-qris-sudah');
        const btnSelesai = document.getElementById('btn-qris-selesai');
        
        const inputNama = document.getElementById('qris-nama');
        const inputNominal = document.getElementById('qris-nominal');
        const inputWa = document.getElementById('qris-wa');
        const inputDoa = document.getElementById('qris-doa');

        if (!btnDonasiQris || !qrisBackdrop) return;

        function openQrisModal() {
            // Reset to step 1
            step1.classList.add('active');
            step2.classList.remove('active');
            step3.classList.remove('active');
            inputNama.value = '';
            inputNominal.value = '';
            if (inputWa) inputWa.value = '';
            if (inputDoa) inputDoa.value = '';
            
            qrisBackdrop.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeQrisModal() {
            qrisBackdrop.classList.remove('open');
            document.body.style.overflow = '';
        }

        btnDonasiQris.addEventListener('click', openQrisModal);
        if (qrisClose) qrisClose.addEventListener('click', closeQrisModal);
        
        qrisBackdrop.addEventListener('click', e => {
            if (e.target === qrisBackdrop) closeQrisModal();
        });
        
        btnLanjut.addEventListener('click', () => {
            if (inputNama.value.trim() === '' || inputNominal.value.trim() === '') {
                alert('Mohon isi nama dan nominal donasi terlebih dahulu.');
                return;
            }
            step1.classList.remove('active');
            step2.classList.add('active');
        });

        btnSudah.addEventListener('click', () => {
            // Send data to WhatsApp
            const nama = inputNama.value.trim();
            const nominal = inputNominal.value.trim();
            const wa = inputWa ? inputWa.value.trim() : '';
            const doa = inputDoa ? inputDoa.value.trim() : '';

            // Format WhatsApp message
            let waText = `Assalamu'alaikum Admin RBIM, saya baru saja melakukan donasi via QRIS.\n\n`;
            waText += `*Nama*: ${nama}\n`;
            waText += `*Nominal*: Rp${parseInt(nominal).toLocaleString('id-ID')}\n`;
            if (wa) waText += `*No. WA*: ${wa}\n`;
            if (doa) waText += `*Doa/Pesan*: ${doa}\n`;
            waText += `\nMohon bantuannya untuk verifikasi. Terima kasih.`;

            const adminPhone = '6282128632928';
            const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waText)}`;
            
            // Open WA in a new tab
            window.open(waUrl, '_blank');

            // Move to Step 3 (Thank You page)
            step2.classList.remove('active');
            step3.classList.add('active');
        });

        btnSelesai.addEventListener('click', closeQrisModal);
    })();

=======
>>>>>>> 3fe69579d6c5f4aa181befd0baeae53b6f7cbb01
});
