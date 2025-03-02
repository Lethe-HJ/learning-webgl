import { WebglViewer } from '@/components/WebglView'
import { glsl } from '@/utils/glsl'
import leavesUrl from '@/assets/leaves.jpg'

export class TextureWebglViewer extends WebglViewer {
  constructor(public canvas: HTMLCanvasElement) {
    super(canvas)
  }

  initVertex() {
    return glsl`
        attribute vec4 aPosition;
        attribute vec4 aTex;
        varying vec2 vTex;
        void main() {
        gl_Position = aPosition; // vec4(0.0,0.0,0.0,1.0)
        vTex = vec2(aTex.x, aTex.y);
        }
    `
  }

  initFragment() {
    return glsl`
        precision lowp float;
        uniform sampler2D uSampler;
        varying vec2 vTex;
        void main() {
            gl_FragColor = texture2D(uSampler, vTex);
        }
    `
  }

  init() {
    super.init()
    const gl = this.gl
    const program = this.program
    gl.useProgram(program)
    const aPosition = gl.getAttribLocation(program, 'aPosition')
    const aTex = gl.getAttribLocation(program, 'aTex')
    const uSampler = gl.getUniformLocation(program, 'uSampler')

    const points = new Float32Array([
      -0.5, 0.5, 0.0, 1.0, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 1.0, 1.0, 0.5, -0.5, 1.0, 0.0,
    ])

    const buffer = gl.createBuffer()
    const BYTES = points.BYTES_PER_ELEMENT
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 4, 0)
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, BYTES * 4, BYTES * 2)
    gl.enableVertexAttribArray(aTex)
    const img = new Image()
    img.src = leavesUrl
    img.onload = function () {
      const texture = gl.createTexture() // 创建纹理对象
      // gl.deletTexture(textrue); // 删除纹理对象的方式
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1) // 翻转 图片 Y轴
      gl.activeTexture(gl.TEXTURE0) // 激活0号纹理单元 Webgl 是通过纹理单元来管理纹理对象,每个纹理单元管理⼀张纹理图像

      /**
       * 绑定纹理对象
       * @param { gl.TEXTURE_2D | gl.TEXTURE_CUBE_MAP } type
       * @param { Texture } texture
       **/
      gl.bindTexture(gl.TEXTURE_2D, texture)

      /**
       * 处理放大缩小的逻辑
       * @param { gl.TEXTURE_2D | gl.TEXTURE_CUBE_MAP } type
       * @param {
       *   gl.TEXTURE_MAG_FILTER 放⼤
       *  |gl.TEXTURE_MIN_FILTER 缩⼩
       *  |gl.TEXTURE_WRAP_S 横向（⽔平填充）
       *  |gl.TEXTURE_WRAP_T 纵向（垂直填充）
       * } pname
       * @param {
       *  gl.NEAREST 使用像素颜色值
       * |gl.LINEAR 使用四周的加权平均值
       * |gl.REPEAT 平铺重复
       * |gl.MIRRORED_REPEAT 镜像对称
       * |gl.CLAMP_TO_EDGE 边缘延伸
       * }
       **/
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

      // 横向 纵向 平铺的方式
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

      /**
       * 配置纹理图像
       * @param { gl.TEXTURE_2D | gl.TEXTURE_CUBE_MAP } type
       * @param { 0 } level
       * @param {
       *  gl.RGB
       * |gl.RGBA
       * |gl.ALPHA
       * |gl.LUMINANCE 使用物体表面的 红绿蓝 分量的加权平均值来计算
       * |gl.LUMINANCE_ALPHA
       * } internalformat
       * @param { 同internalformat } format
       * @param {
       *  gl.UNSIGNED_BYTE
       * |gl.UNSIGNED_SHORT_5_6_5
       * |gl.UNSIGNED_SHORT_4_4_4_4
       * |gl.UNSIGNED_SHORT_5_5_5_1
       * } dataType
       * @param { Image } 图片对象
       */
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
      gl.uniform1i(uSampler, 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
  }
}
