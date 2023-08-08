varying vec3 vectorNormal;

void main() {
    float intensity = pow(1.5 - dot(vectorNormal, vec3(0.1, 0.3, 0.6)), 1.0);

    gl_FragColor = vec4(0.1, 0.3, 0.8, 0.15) * intensity;
}