export function interpolateColor(index, color1, color2, fraction) {
  if (fraction >= 0.48 && fraction <= 0.52 || index === 0) return `hsl(0, 0%, 100%)`;

  const hsl1 = colorToHSL(color1);
  const hsl2 = colorToHSL(color2);

  let hue, saturation, lightness;

  if (fraction <= 0.5) {
    hue = hsl1.h;
    saturation = hsl1.s;
    lightness = (0.22 + 0.78 * (fraction) * 2) * hsl1.l;
  } else {
    hue = hsl2.h;
    saturation = hsl2.s;
    lightness = 2 * (0.18 + 0.82 * (1 - fraction)) * hsl2.l;
  }

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
function colorToHSL(color) {
  const rgbMatch = color.match(/^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/i);
  if (!rgbMatch) return null;

  const [_, r, g, b] = rgbMatch;
  const parsedR = parseInt(r, 16);
  const parsedG = parseInt(g, 16);
  const parsedB = parseInt(b, 16);

  const hsl = rgbToHSL(parsedR, parsedG, parsedB);
  return hsl;
}

function rgbToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s, l;

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / (max - min)) % 6;
  } else if (max === g) {
    h = (b - r) / (max - min) + 2;
  } else {
    h = (r - g) / (max - min) + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (max + min) / 2;
  s = max === min ? 0 : max === 0.5 ? 1 : (max - l) / Math.min(l, 1 - l);

  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}