import "./style.css";

const phrases: string[] = [
  "Full-Stack Developer",
  "Automation & Bot Development",
  "Twitch & Discord Moderation",
  "Linux & Proxy Tech",
];

let phraseIndex: number = 0;
let charIndex: number = 0;
let isDeleting: boolean = false;

const TYPE_SPEED: number = 70;
const DELETE_SPEED: number = 40;
const PAUSE_TIME: number = 2000;

function type(typingElement: HTMLElement): void {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let nextSpeed = isDeleting ? DELETE_SPEED : TYPE_SPEED;

  if (!isDeleting && charIndex === currentPhrase.length) {
    nextSpeed = PAUSE_TIME;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    nextSpeed = 500;
  }

  setTimeout(() => type(typingElement), nextSpeed);
}

export function initTypewriter(elementId: string): void {
  const typingElement = document.getElementById(elementId);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!typingElement) {
    return;
  }

  if (prefersReducedMotion) {
    typingElement.textContent = phrases[0];
    return;
  }

  type(typingElement);
}

function setCurrentYear(elementId: string): void {
  const yearElement = document.getElementById(elementId);
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTypewriter("typing-text");
  setCurrentYear("year");
});
