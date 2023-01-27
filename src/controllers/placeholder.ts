import { Context } from "worktop";

import { reply } from 'worktop/response';

const generateSvg = (width: number, height: number) => `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${width}" height="${height}">
  <rect x="0" y="0" width="${width}" height="${height}" fill="#ccc" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${width}x${height}</text>    
  </svg>
`

export const index = async (
  _req: Request,
  ctx: Context,
): Promise<Response> => {
  const { width, height } = ctx.params;
  if (isNaN(+width) || isNaN(+height)) return reply(422, 'Not valid height and or width');
  const svg = generateSvg(+width, +height)
  // const encodedSvg = encodeSVG(svg)
  // const encodedUrl = `data:image/svg+xml,${encodedSvg}`
  return new Response(svg, { status: 200, headers: { 'Content-Type': 'image/svg+xml', 'Content-Encoding': 'gzip' } })
}

const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

// const encodeSVG = (data: string) => {
//   data = data.replace(/"/g, `'`);
//   data = data.replace(/>\s{1,}</g, `><`);
//   data = data.replace(/\s{2,}/g, ` `);

//   return data.replace(symbols, encodeURIComponent);
// }