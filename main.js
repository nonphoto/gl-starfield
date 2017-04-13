function loadShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation failed." + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);

    return null;
  }

  return shader;
}

require(['dom-ready', 'gl-matrix', 'text!vertex.glsl', 'text!fragment.glsl'], (domReady, matrix, vertexSource, fragmentSource) => {
  const canvas = document.getElementById('canvas')
  canvas.width = 800
  canvas.height = 600

  let gl = null
  gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
  if (!gl) {
    alert("Unable to initialize WebGL. Maybe your browser doesn't support it.")
    return
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

  const vertexShader = loadShader(gl, vertexSource, gl.VERTEX_SHADER)
  const fragmentShader = loadShader(gl, fragmentSource, gl.FRAGMENT_SHADER)

  program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program))
    return
  }

  gl.useProgram(program)
  gl.clearColor(0.1, 0.1, 0.1, 1)

  gl.clear(gl.COLOR_BUFFER_BIT)
})