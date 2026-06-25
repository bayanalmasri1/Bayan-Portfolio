const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links li");
const navAnchors = document.querySelectorAll(".nav-link");
const header = document.querySelector(".site-header");
const sections = document.querySelectorAll("main section[id]");

if (burger && navLinks) {
    burger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("nav-active");
        burger.classList.toggle("toggle", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));

        navLinkItems.forEach((item, index) => {
            item.style.animation = isOpen ? `navLinkFade 0.35s ease forwards ${index * 0.08 + 0.08}s` : "";
        });
    });
}

navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.remove("nav-active");
        }
        if (burger) {
            burger.classList.remove("toggle");
            burger.setAttribute("aria-expanded", "false");
        }
        navLinkItems.forEach((item) => {
            item.style.animation = "";
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const targetSelector = anchor.getAttribute("href");
        if (!targetSelector || targetSelector === "#") {
            return;
        }

        const target = document.querySelector(targetSelector);
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const updateActiveSection = () => {
    if (!sections.length || !navAnchors.length) {
        return;
    }

    let currentSection = null;

    sections.forEach((section) => {
        const top = section.offsetTop - 140;
        if (window.scrollY >= top) {
            currentSection = section;
        }
    });

    navAnchors.forEach((anchor) => {
        anchor.classList.toggle("active", currentSection && anchor.getAttribute("href") === `#${currentSection.id}`);
    });
};

window.addEventListener("scroll", () => {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 18);
    }
    updateActiveSection();
});

updateActiveSection();

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        window.alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
    });
}

const makePlaceholder = (img) => {
    const figure = img.closest(".gallery-item");
    if (!figure) {
        return;
    }

    figure.classList.add("is-placeholder");
    img.remove();

    const placeholder = document.createElement("div");
    placeholder.className = "image-placeholder";
    placeholder.textContent = "Screenshot placeholder. Replace this with the final app screen image later.";
    figure.prepend(placeholder);
};

document.querySelectorAll(".gallery-item img").forEach((img) => {
    if (!img.complete) {
        img.addEventListener("error", () => makePlaceholder(img), { once: true });
        return;
    }

    if (img.naturalWidth === 0) {
        makePlaceholder(img);
    }
});
