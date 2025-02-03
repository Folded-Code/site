import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { onMount, Suspense } from 'solid-js';

import '@fontsource-variable/fira-code';
import '@fontsource/averia-sans-libre';
import './app.css';

export default function App() {
  onMount(() => {
    const elems = document.querySelectorAll(
      '.rainbow-decoration'
    )! as NodeListOf<HTMLElement>;

    for (let i = 0; i < elems.length; i++) {
      elems[i].style.animationDelay = '-' + Math.floor(Math.random() * 8) + 's';
    }
  });
  return (
    <Router root={(props) => <Suspense>{props.children}</Suspense>}>
      <FileRoutes />
    </Router>
  );
}
