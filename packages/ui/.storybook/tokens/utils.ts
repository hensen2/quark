// @ts-nocheck
export const hslToHex = (h: number, s: number, l: number) => {
  const left = l / 100;
  const a = (s * Math.min(left, 1 - left)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = left - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};
export const hexToHSL = (hex: string) => {
  if (hex === '#fff' || hex === '#ffffff') {
    return 'hsl(0, 0%, 100%)';
  }
  if (hex === '#000' || hex === '#000000') {
    return 'hsl(0, 0%, 0%)';
  }
  const r = Number.parseInt(hex.substring(1, 3), 16) / 255;
  const g = Number.parseInt(hex.substring(3, 5), 16) / 255;
  const b = Number.parseInt(hex.substring(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = (max + min) / 2;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }

    h /= 6;
  }

  s *= 100;
  s = Math.round(s);
  l *= 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return `hsl(${h}, ${s}%, ${l}%)`;
};

const multiplyMatrices = (A: number[], B: number[]) => {
  return [
    A[0] * B[0] + A[1] * B[1] + A[2] * B[2],
    A[3] * B[0] + A[4] * B[1] + A[5] * B[2],
    A[6] * B[0] + A[7] * B[1] + A[8] * B[2],
  ];
};

export const oklch2oklab = (lch: number[]) => {
  let [l, c, h] = lch;
  let a = 0;
  let b = 0;

  if (h) {
    c = c < 0 ? 0 : c; // Clamp negative Chroma
    a = c * Math.cos((h * Math.PI) / 180);
    b = c * Math.sin((h * Math.PI) / 180);
  }

  if (a < 0) {
    a = 0;
  }

  return [l, a, b];
};
const oklab2oklch = ([l, a, b]: number[]) => [
  l,
  Math.sqrt(a ** 2 + b ** 2),
  Math.abs(a) < 0.0002 && Math.abs(b) < 0.0002
    ? Number.NaN
    : ((((Math.atan2(b, a) * 180) / Math.PI) % 360) + 360) % 360,
];

const rgb2srgbLinear = (rgb: number[]) =>
  rgb.map((c) =>
    Math.abs(c) <= 0.04045 ? c / 12.92 : (c < 0 ? -1 : 1) * ((Math.abs(c) + 0.055) / 1.055) ** 2.4,
  );
const srgbLinear2rgb = (rgb: number[]) =>
  rgb.map((c) =>
    Math.abs(c) > 0.0031308
      ? (c < 0 ? -1 : 1) * (1.055 * Math.abs(c) ** (1 / 2.4) - 0.055)
      : 12.92 * c,
  );

const oklab2xyz = (lab: number[]) => {
  const LMSg = multiplyMatrices(
    [
      1, 0.3963377773761749, 0.2158037573099136, 1, -0.1055613458156586, -0.0638541728258133, 1,
      -0.0894841775298119, -1.2914855480194092,
    ],
    lab,
  );
  const LMS = LMSg.map((val) => val ** 3);
  return multiplyMatrices(
    [
      1.2268798758459243, -0.5578149944602171, 0.2813910456659647, -0.0405757452148008,
      1.112286803280317, -0.0717110580655164, -0.0763729366746601, -0.4214933324022432,
      1.5869240198367816,
    ],
    LMS,
  );
};
const xyz2oklab = (xyz: number[]) => {
  const LMS = multiplyMatrices(
    [
      0.819022437996703, 0.3619062600528904, -0.1288737815209879, 0.0329836539323885,
      0.9292868615863434, 0.0361446663506424, 0.0481771893596242, 0.2642395317527308,
      0.6335478284694309,
    ],
    xyz,
  );
  const LMSg = LMS.map((val) => Math.cbrt(val));
  return multiplyMatrices(
    [
      0.210454268309314, 0.7936177747023054, -0.0040720430116193, 1.9779985324311684,
      -2.4285922420485799, 0.450593709617411, 0.0259040424655478, 0.7827717124575296,
      -0.8086757549230774,
    ],
    LMSg,
  );
};
const xyz2rgbLinear = (xyz: number[]) => {
  return multiplyMatrices(
    [
      3.2409699419045226, -1.537383177570094, -0.4986107602930034, -0.9692436362808796,
      1.8759675015077202, 0.04155505740717559, 0.05563007969699366, -0.20397695888897652,
      1.0569715142428786,
    ],
    xyz,
  );
};
const rgbLinear2xyz = (rgb: number[]) => {
  return multiplyMatrices(
    [
      0.41239079926595934, 0.357584339383878, 0.1804807884018343, 0.21263900587151027,
      0.715168678767756, 0.07219231536073371, 0.01933081871559182, 0.11919477979462598,
      0.9505321522496607,
    ],
    rgb,
  );
};

export const oklch2rgb = (lch: number[]) =>
  srgbLinear2rgb(xyz2rgbLinear(oklab2xyz(oklch2oklab(lch))));
export const rgb2oklch = (rgb: number[]) =>
  oklab2oklch(xyz2oklab(rgbLinear2xyz(rgb2srgbLinear(rgb))));
