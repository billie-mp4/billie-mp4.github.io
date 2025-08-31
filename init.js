function init(gl){
    const posBuffer=initPos(gl)
    return {position:posBuffer}
}
function initPos(gl){
    const posBuffer=gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER,posBuffer)
    const pos=[1,1,-1,1,1,-1,-1,-1]
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pos),gl.STATIC_DRAW)
    return posBuffer
}
export {init}