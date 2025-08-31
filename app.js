import {init} from 'init.js'
import {draw} from 'draw.js'
main()
function main(){
    const canvas=document.querySelector('canvas')
    const gl=canvas.getContext('webgl')
    const vsSrc = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
    `
    const fsSrc = `
        void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `

    if(gl===null){
        alert('webgl init failure')
        return
    }
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    function init(gl,vsSrc,fsSrc){
        const vs=loadShader(gl,gl.VERTEX_SHADER,vsSrc)
        const fs=loadShader(gl,gl.FRAGMENT_SHADER,fsSrc)
        const shaderProgram=gl.createProgram()
        gl.attachShader(shaderProgram,vs)
        gl.attachShader(shaderProgram,fs)
        gl.linkProgram(shaderProgram)
        if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)){
            alert(`fail: ${gl.getProgramInfoLog(shaderProgram)}`)
            return null
        }
        return shaderProgram
    }
    function loadShader(gl,type,src){
        const shader=gl.createShader(type)
        gl.shaderSource(shader,src)
        gl.compileShader(shader)
        if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
            alert(`fail: ${gl.getShaderInfoLog(shader)}`)
            gl.deleteShader(shader)
            return null
        }
        return shader
    }
    const shaderProgram=init(gl,vsSrc,fsSrc)
    const programInfo={
        program:shaderProgram,
        attribLocations:{
            vertexPosition:gl.getAttribLocation(shaderProgram,'aVertexPosition')
        },
        uniformLocations:{
            projectionMatrix:gl.getUniformLocation(shaderProgram,'uProjectionMatrix'),
            modelViewMatrix:gl.getUniformLocation(shaderProgram,'uModelViewMatrix')
        }
    }
    const buffers=init(gl)
    draw(gl,programInfo,buffers)
}
