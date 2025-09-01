import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

//DOM REGISTER
const intro = document.querySelector(".intro");
const mainContainer = document.querySelector(".main-container");
const mainContainerWrapper = document.querySelector(".main-content-wrapper");
const mainContentText = document.querySelectorAll(".main-content-text");
const mainImgContainer = document.querySelector(".main-img");
const about = document.querySelector(".about-container");
const experience = document.querySelector(".experience-container");
const projectContainer = document.querySelector(".project-container");
const outro = document.querySelector(".outro");
const outroTitle = document.querySelector(".outro-title");
const mail = document.querySelector(".mail-text");

//LENIS SETUP
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

//ANIMATE
document.fonts.ready.then(() => {
  const mm = gsap.matchMedia();

  SplitText.create(mainContentText, {
    type: "lines",
    charsClass: "lines++",
    autoSplit: true,
    mask: true,

    onSplit: (self) => {
      gsap.from(self.lines, {
        yPercent: 150,
        stagger: {
          amount: 0.5,
        },
        ease: "back.out",

        scrollTrigger: {
          trigger: mainContainer,
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          pin: true,
          pinSpacing: true,
          toggleActions: "restart none none restart",

          onUpdate: (self) => {
            const progress = self.progress;
            const leavingText = progress / 0.2;
            const movingSteps = window.innerWidth * 0.6;

            // console.log(progress);

            gsap.set(mainImgContainer, {
              scale: leavingText,
            });

            gsap.set(mainContentText[0], {
              x: -leavingText * movingSteps,
            });
            gsap.set(mainContentText[1], {
              x: leavingText * movingSteps,
            });

            gsap.set(about, {
              opacity: 0,
            });

            gsap.set(experience, {
              opacity: 0,
            });

            if (progress >= 0.2) {
              gsap.set(".main-img", {
                scale: 1,
              });

              gsap.set(about, {
                x: `${progress * 4 * (window.innerWidth * 0.69)}`,
                opacity: 1,
                visibility: "visible",
              });

              gsap.set(experience, {
                x: `-${progress * 6.87 * (window.innerWidth * 0.6)}`,
                opacity: 1,
                visibility: "visible",
              });

              gsap.set(projectContainer, {
                y: `-${progress * 2 * (window.innerWidth * 0.25)}`,
                visibility: "visible",
              });

              mm.add("(min-width: 320px) and (max-width: 374px) ", () => {
                gsap.set(about, {
                  x: `${progress * 7 * (window.innerWidth * 0.8)}`,
                });

                gsap.set(experience, {
                  x: `-${progress * 6 * (window.innerWidth * 0.65)}`,
                });

                gsap.set(projectContainer, {
                  y: `-${progress * 13.5 * (window.innerWidth * 0.15)}`,
                });
              });

              mm.add("(min-width: 375px) and (max-width: 424px)", () => {
                gsap.set(about, {
                  x: `${progress * 7 * (window.innerWidth * 0.8)}`,
                });

                gsap.set(experience, {
                  x: `-${progress * 6 * (window.innerWidth * 0.65)}`,
                });

                gsap.set(projectContainer, {
                  y: `-${progress * 13.5 * (window.innerWidth * 0.17)}`,
                });
              });

              mm.add("(min-width: 425px) and (max-width: 768px)", () => {
                gsap.set(about, {
                  x: `${progress * 10 * (window.innerWidth * 0.8)}`,
                });

                gsap.set(experience, {
                  x: `-${progress * 8 * (window.innerWidth * 0.65)}`,
                });

                gsap.set(projectContainer, {
                  y: `-${progress * 10.5 * (window.innerWidth * 0.15)}`,
                });
              });

              mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
                gsap.set(projectContainer, {
                  y: `-${progress * 6 * (window.innerWidth * 0.15)}`,
                });
              });

              mm.add("(min-width: 1024px) and (max-width: 1439px)", () => {
                gsap.set(about, {
                  x: `${progress * 10 * (window.innerWidth * 0.6)}`,
                });

                gsap.set(experience, {
                  x: `-${progress * 8 * (window.innerWidth * 0.5)}`,
                });

                gsap.set(projectContainer, {
                  y: `-${progress * 5 * (window.innerWidth * 0.15)}`,
                });
              });
            }

            if (progress >= 0.9) {
              gsap.set(about, {
                visibility: "hidden",
              });

              gsap.set(experience, {
                visibility: "hidden",
              });

              mm.add("(min-width:320px)", (context) => {
                gsap.set(experience, {
                  visibility: "visible",
                });
              });
            }
          },
        },
      });
    },
  });

  SplitText.create(outroTitle, {
    type: "lines",
    onSplit: (self) => {
      gsap.from(self.lines, {
        opacity: 0,
        mask: true,
        duration: 2,
        scrollTrigger: {
          trigger: outro,
          start: "10% center",
        },
      });
    },
  });

  gsap.from(mail, {
    x: window.innerWidth,
    duration: 1,
    scrollTrigger: {
      trigger: outro,
      start: "10% center",
    },
  });
});
