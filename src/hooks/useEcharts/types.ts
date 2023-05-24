// types.ts
export enum RenderType {
  SVGRenderer = 'SVGRenderer',
  CanvasRenderer = 'CanvasRenderer',
}
export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
  Default = 'default',
}

export interface BarValueImp {
  labels: string[]
  values: number[] | string[]
}
export interface PieValueImp {
  name: string
  value: number
}
