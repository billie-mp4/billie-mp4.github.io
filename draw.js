function draw(gl,programInfo,buffers){
    gl.clearColor(0,0,0,0)
    gl.clearDepth(1)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    const fov=(45*Math.PI)/180
    const aspect=gl.canvas.clientWidth/gl.canvas.clientHeight
    const zNear=.1
    const zFar=100
    const projectionMatrix=mat4.create()
    mat4.perspective(projectionMatrix,fov,aspect,zNear,zFar)
    const modelViewMatrix=mat4.create()
    mat4.translate(modelViewMatrix,modelViewMatrix,[-0,-0,-6])
    setPositionAttribute(gl,buffers,programInfo)
    gl.useProgram(programInfo.program)
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix,false,projectionMatrix)
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix,false,modelViewMatrix)
    {
        const offset=0
        const vertexCount=4
        gl.drawArrays(gl.TRIANGLE_STRIP,offset,vertexCount)
    }
}
function setPositionAttribute(gl,buffers,programInfo){
    const numComponents=2
    const type=gl.FLOAT
    const normalize=false
    const stride=0
    const offset=0
    gl.bindBuffer(gl.ARRAY_BUFFER,buffers.position)
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    )
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
}
export {draw}