// HTML 요소 가져오기
const redRange = document.getElementById('redRange');
const greenRange = document.getElementById('greenRange');
const blueRange = document.getElementById('blueRange');
const hexInput = document.getElementById('hexInput');
const hueRange = document.getElementById('hueRange');
const saturationRange = document.getElementById('saturationRange');
const lightnessRange = document.getElementById('lightnessRange');
const colorPreview = document.getElementById('colorPreview');
const outputColor = document.getElementById('outputColor');

// 초기 컬러 설정
updateColorFromRGB();

// RGB 슬라이더 값 변경 시 이벤트 처리
redRange.addEventListener('input', updateColorFromRGB);
greenRange.addEventListener('input', updateColorFromRGB);
blueRange.addEventListener('input', updateColorFromRGB);

// HEX 입력 값 변경 시 이벤트 처리
hexInput.addEventListener('input', updateColorFromHex);

// HSL 슬라이더 값 변경 시 이벤트 처리
hueRange.addEventListener('input', updateColorFromHSL);
saturationRange.addEventListener('input', updateColorFromHSL);
lightnessRange.addEventListener('input', updateColorFromHSL);

// 컬러 선택 결과 출력
function updateColorFromRGB() {
  const redValue = redRange.value;
  const greenValue = greenRange.value;
  const blueValue = blueRange.value;

  const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

  colorPreview.style.backgroundColor = color;
  hexInput.value = rgbToHex(redValue, greenValue, blueValue);
  updateOutputColor();
}

function updateColorFromHex() {
  const hexValue = hexInput.value;
  const rgb = hexToRgb(hexValue);

  if (rgb) {
    redRange.value = rgb.r;
    greenRange.value = rgb.g;
    blueRange.value = rgb.b;
    colorPreview.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    updateOutputColor();
  }
}

function updateColorFromHSL() {
  const hueValue = hueRange.value;
  const saturationValue = saturationRange.value;
  const lightnessValue = lightnessRange.value;

  const color = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;

  colorPreview.style.backgroundColor = color;
  const rgb = hslToRgb(hueValue / 360, saturationValue / 100, lightnessValue / 100);
  if (rgb) {
    redRange.value = rgb.r;
    greenRange.value = rgb.g;
    blueRange.value = rgb.b;
    hexInput.value = rgbToHex(rgb.r, rgb.g, rgb.b);
    updateOutputColor();
  }
}

function updateOutputColor() {
  const redValue = redRange.value;
  const greenValue = greenRange.value;
  const blueValue = blueRange.value;

  const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

  // 선택한 컬러를 출력 요소에 적용
  outputColor.style.backgroundColor = color;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase();
}

function hexToRgb(hex) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) {
    return null;
  }

  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
