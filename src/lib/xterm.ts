import type { Terminal } from 'xterm'
import { browser } from '$app/env'

export default function xterm(node: HTMLElement, terminal: Terminal) {
  if (!browser) { return; }
  
  terminal.open(node);
  terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

  return {
    destroy() {
      terminal.dispose()
    }
  }
}