# Vendor libraries

- GSAP 3.15.0 and ScrollTrigger 3.15.0, from jsDelivr's GSAP distribution.
- Lenis 1.3.27, from jsDelivr's Lenis distribution.
- GSAP copyright headers are preserved in the minified scripts. Lenis is MIT licensed; see `LENIS-LICENSE`.

The static page loads each script locally. `script.js` registers ScrollTrigger before creating animations and synchronizes Lenis with GSAP's ticker.

For an npm/Vite setup instead of these vendored browser builds, install the same libraries with `npm install gsap lenis`.
