declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;  // <- Исправлено
  }

declare module '*.jpg'
declare module '*.png'
// declare module '*.svg' {
// 	import React from 'react'
// 	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
// 	export default SVG
// }

declare const __PLATFORM__: 'desktop' | 'mobile'
