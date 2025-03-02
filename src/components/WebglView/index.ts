export class WebglViewer {
  private vertex: string
  private fragment: string
  protected gl: WebGLRenderingContext
  protected program: WebGLProgram

  constructor(public canvas: HTMLCanvasElement) {}

  static create(canvas: HTMLCanvasElement) {
    const instance = new WebglViewer(canvas)
    instance.init()
    return instance
  }

  initVertex(): string {
    throw new Error('initVertex must be implemented')
  }

  initFragment(): string {
    throw new Error('initFragment must be implemented')
  }

  init() {
    const gl = this.canvas.getContext('webgl')
    this.gl = gl
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    this.vertex = this.initVertex()
    this.fragment = this.initFragment()
    gl.shaderSource(vertexShader, this.vertex) // 指定顶点着色器的源码
    gl.shaderSource(fragmentShader, this.fragment) // 指定片元着色器的源码

    // 编译着色器
    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)

    // 创建一个程序对象
    const program = gl.createProgram()

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)
    this.program = program
  }
}
