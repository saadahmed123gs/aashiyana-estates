// ============================================
// AASHIYANA ESTATES — shared script
// ============================================

// ---- Scroll reveal: fade/slide elements in as they enter the viewport ----
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const observer = new IntersectionObserver(function (entries) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add("visible");
      }
    }
  }, { threshold: 0.15 });

  for (let i = 0; i < revealElements.length; i++) {
    // small stagger so cards don't all pop in at once
    revealElements[i].style.transitionDelay = (i % 3) * 0.08 + "s";
    observer.observe(revealElements[i]);
  }
}

// ---- Property page: clicking a gallery thumbnail swaps the main photo ----
const mainGalleryImg = document.getElementById("mainGalleryImg");
const thumbSwaps = document.querySelectorAll(".thumb-swap");

if (mainGalleryImg && thumbSwaps.length > 0) {
  for (let i = 0; i < thumbSwaps.length; i++) {
    thumbSwaps[i].addEventListener("click", function () {
      mainGalleryImg.src = this.dataset.full;
    });
  }
}

// ---- Homepage: search bar sends you to listings.html with filters ----
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
  searchBtn.addEventListener("click", function () {
    const loc = document.getElementById("loc").value;
    const type = document.getElementById("type").value;
    // Homepage budget labels differ slightly from listings page labels,
    // so we just carry the area + type across; budget stays optional.
    let url = "listings.html";
    const params = [];
    if (loc) params.push("location=" + encodeURIComponent(loc));
    if (type) params.push("type=" + encodeURIComponent(type));
    if (params.length > 0) url += "?" + params.join("&");
    window.location.href = url;
  });
}

// ---- Listings page: filter the cards in the browser (no reload) ----
const cardGrid = document.getElementById("cardGrid");

if (cardGrid) {
  const cards = cardGrid.querySelectorAll(".property-card");
  const fLocation = document.getElementById("fLocation");
  const fType = document.getElementById("fType");
  const fBudget = document.getElementById("fBudget");
  const emptyState = document.getElementById("emptyState");
  const resetBtn = document.getElementById("resetFilters");

  function applyFilters() {
    const wantLocation = fLocation.value;
    const wantType = fType.value;
    const wantBudget = fBudget.value;
    let visibleCount = 0;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const matchesLocation = !wantLocation || card.dataset.location === wantLocation;
      const matchesType = !wantType || card.dataset.type === wantType;
      const matchesBudget = !wantBudget || card.dataset.budget === wantBudget;

      if (matchesLocation && matchesType && matchesBudget) {
        card.style.display = "flex";
        visibleCount = visibleCount + 1;
      } else {
        card.style.display = "none";
      }
    }

    emptyState.style.display = visibleCount === 0 ? "block" : "none";
  }

  // Pre-fill filters if arriving from the homepage search with ?location=...&type=...
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("location")) fLocation.value = urlParams.get("location");
  if (urlParams.get("type")) fType.value = urlParams.get("type");

  fLocation.addEventListener("change", applyFilters);
  fType.addEventListener("change", applyFilters);
  fBudget.addEventListener("change", applyFilters);

  resetBtn.addEventListener("click", function () {
    fLocation.value = "";
    fType.value = "";
    fBudget.value = "";
    applyFilters();
  });

  applyFilters();
}

// ---- Contact page: fake-submit the enquiry form ----
const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading
    const status = document.getElementById("formStatus");
    status.style.display = "block";
    enquiryForm.reset();
  });
}