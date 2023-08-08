varying vec2 vUV;

varying vec3 vectorNormal;

void main() {
    vUV = uv;
    vectorNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}