// Simulacija velike third-party skripte

console.log("Heavy script loaded");

// neka fake analytics logika
function trackEvent(eventName, data) {
  console.log("Tracking:", eventName, data);
}

// neka fake util funkcija
function generateRandomData(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.random().toString(36).substring(2));
  }
  return arr;
}

// simulacija CPU rada
function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 500000; i++) {
    result += Math.sqrt(i) * Math.random();
  }
  return result;
}

// simulacija DOM manipulacije
function createFakeElements() {
  const container = document.createElement("div");
  container.id = "fake-container";

  for (let i = 0; i < 200; i++) {
    const el = document.createElement("div");
    el.textContent = "Fake element " + i;
    container.appendChild(el);
  }

  document.body.appendChild(container);
}

// simulacija network request-a
async function fakeFetch() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log("Fetched data:", data.length);
  } catch (e) {
    console.error("Fetch error", e);
  }
}
/*
// init
function initHeavyScript() {
  console.log("Initializing heavy script...");

  const data = generateRandomData(10000);
  console.log("Generated data:", data.length);

  const result = heavyComputation();
  console.log("Computation result:", result);

  createFakeElements();
  fakeFetch();

  trackEvent("page_view", {
    time: Date.now(),
  });
}

// pokreni
initHeavyScript();
*/
