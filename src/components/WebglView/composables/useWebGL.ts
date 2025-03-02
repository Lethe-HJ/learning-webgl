import type { WebglViewer } from '../index'

export function useWebGL<T extends typeof WebglViewer>(
  ViewerClass: T,
): (canvas: HTMLCanvasElement) => InstanceType<T> {
  return (canvas: HTMLCanvasElement) => {
    const instance = new ViewerClass(canvas)
    instance.init()
    return instance as InstanceType<T>
  }
}
