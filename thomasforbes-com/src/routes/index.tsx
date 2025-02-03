import { children, type JSX } from 'solid-js';
import Nav from '~/components/Nav';

function Layout(props: { children: JSX.Element }) {
  const c = children(() => props.children);
  return (
    <div class="flex min-h-screen w-full flex-col items-center p-10">
      <div class="flex w-full max-w-[80ch] flex-col gap-5">
        <Nav />
        <hr class="w-full border-zinc-800 xl:hidden" />
        {c()}
      </div>
    </div>
  );
}

const calcYearsOld = () =>
  (new Date().getTime() - new Date(2005, 8, 12).getTime()) /
  1000 /
  60 /
  60 /
  24 /
  365.2425;

// export default function Index() {
//   const keyAttributes = [
//     'Dual US-Irish Citizen',
//     `${calcYearsOld().toFixed(2)} years old`,
//   ];
//   const rightNow = ['Studying at Georgetown'];
//   const previously = ['Worked at Bestever'];
//   return (
//     <Layout>
//       <h1 class="rainbow-text text-6xl font-bold">Thomas Forbes</h1>
//       <div class="flex flex-col gap-2">
//         <h4>Key attributes:</h4>
//         <ul>
//           <For each={keyAttributes}>{(attr) => <li>{attr}</li>}</For>
//         </ul>
//         <h4>Right now:</h4>
//         <ul>
//           <For each={['Working at SolidJS', 'Living in Dublin']}>
//             {(item) => <li>{item}</li>}
//           </For>
//         </ul>
//       </div>
//     </Layout>
//   );
// }

import { Component, onMount } from 'solid-js';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const StarryLandscape: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  const stars: Star[] = [];

  const initStars = () => {
    const canvas = canvasRef;
    if (!canvas) return;

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height - 200),
        size: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.02,
      });
    }
  };

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    // Fill with base color
    ctx.fillStyle = '#020617'; // slate-950
    ctx.fillRect(0, 0, canvas.width, canvas.height - 500);

    // Draw gradient only at bottom 500px
    const gradient = ctx.createLinearGradient(
      0,
      canvas.height - 500,
      0,
      canvas.height
    );
    gradient.addColorStop(0, '#020617'); // slate-950
    gradient.addColorStop(1, '#1e293b'); // slate-800

    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height - 500, canvas.width, 500);
  };

  const animate = () => {
    const canvas = canvasRef;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(ctx, canvas);

    stars.forEach((star) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      star.opacity = Math.sin(Date.now() * star.speed) * 0.5 + 0.5;
    });

    requestAnimationFrame(animate);
  };

  const handleResize = () => {
    if (!canvasRef) return;
    canvasRef.width = window.innerWidth;
    canvasRef.height = window.innerHeight * 2.5; // Match parent height
    stars.length = 0;
    initStars();
  };

  onMount(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div class="relative h-[250vh] w-full">
      <div class="absolute inset-0">
        <canvas ref={canvasRef} class="h-full w-full" />
      </div>
      <div class="relative z-10 h-full w-full p-8 text-white">
        <h1 class="mb-4 text-4xl font-bold">Welcome to My Site</h1>
        <p class="text-xl">Scroll down to explore</p>
      </div>
    </div>
  );
};

export default function Index() {
  return (
    // <Layout>
    <StarryLandscape />
    // </Layout>
  );
}
