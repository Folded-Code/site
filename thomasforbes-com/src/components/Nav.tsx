import { A, useLocation } from '@solidjs/router';
import { createMemo, For } from 'solid-js';
import { cn } from '~/utils/funcs';

export default function Nav() {
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  return (
    <nav class="left-20 top-16 flex self-start xl:fixed xl:flex-col">
      <For
        each={[
          { href: '/', label: '/index' },
          { href: '/about', label: '/about' },
          { href: '/blog', label: '/blog' },
        ]}
      >
        {(route) => (
          <A
            href={route.href}
            class={cn(
              'p-1 font-mono duration-300 hover:tracking-widest',
              pathname() === route.href && 'font-bold'
            )}
          >
            {route.label}
          </A>
        )}
      </For>
    </nav>
  );
}
