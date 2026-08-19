# Frontend Mentor - Browser extension manager UI solution

This is a solution to the [Browser extension manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-W2_A-ZkS2-). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

---

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Toggle extension status (Active / Inactive) dynamically
- Filter extension cards based on their category or state
- Remove or manage individual browser extensions seamlessly

### Screenshot



![](preview.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/zaheralokk3-gif/A-Responsive-Browser-extension-manager-UI/tree/main)
- Live Site URL: [GitHub Pages Live Demo](https://zaheralokk3-gif.github.io/A-Responsive-Browser-extension-manager-UI/)

---

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties & Flexbox / CSS Grid
- Mobile-first workflow
- Vanilla JavaScript (DOM Manipulation & Event Handling)

### What I learned

Building this project helped reinforce my understanding of dynamic UI management and clean component structuring. 

Here is a snippet showing how I handled state toggling for the extension cards:

`js
const extensionToggles = document.querySelectorAll('.extension-toggle');

extensionToggles.forEach(toggle => {
  toggle.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const card = e.target.closest('.extension-card');
    
    card.setAttribute('data-active', isChecked);
  });
});
