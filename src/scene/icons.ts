const rr = (x: CanvasRenderingContext2D, a: number, b: number, w: number, h: number, r: number) => {
  x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath();
};
/** Standard investment icons drawn on a canvas: 0 banknote, 1 $ badge, 2 ₹ badge, 3 trend arrow, 4 bar chart. */
export function makeIconCanvas(kind: number): HTMLCanvasElement {
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d')!;
  x.lineWidth = 5; x.lineJoin = x.lineCap = 'round'; x.strokeStyle = '#6dffb8'; x.fillStyle = 'rgba(16,150,95,.35)';
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = 'rgba(60,255,170,.8)'; x.shadowBlur = 10;
  const txt = (t: string, y: number, size: number) => { x.fillStyle = '#e8fff3'; x.font = `600 ${size}px Inter,sans-serif`; x.fillText(t, 64, y); };
  if (kind === 0) {
    rr(x, 12, 32, 104, 64, 10); x.fill(); x.stroke(); x.beginPath(); x.arc(64, 64, 18, 0, 7); x.stroke(); txt('$', 66, 26);
    x.fillStyle = '#6dffb8'; [26, 102].forEach(a => { x.beginPath(); x.arc(a, 64, 3.5, 0, 7); x.fill(); });
  } else if (kind === 1 || kind === 2) {
    x.beginPath(); x.arc(64, 64, 48, 0, 7); x.fill(); x.stroke(); txt(kind === 1 ? '$' : '\u20B9', 68, 58);
  } else if (kind === 3) {
    x.beginPath(); x.moveTo(16, 98); x.lineTo(46, 64); x.lineTo(68, 80); x.lineTo(108, 30); x.stroke();
    x.beginPath(); x.moveTo(84, 30); x.lineTo(108, 30); x.lineTo(108, 54); x.stroke();
  } else {
    [[24, 30], [54, 52], [84, 76]].forEach(b => { rr(x, b[0], 100 - b[1], 20, b[1], 4); x.fill(); x.stroke(); });
  }
  return c;
}
