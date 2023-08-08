uniform sampler2D earthMap;

varying vec2 vUV;

varying vec3 vectorNormal;

void main() {
    float intensity = 1.05 - dot(vectorNormal, vec3(0.0, 0.0, 1.0));

    vec3 atmosphere = vec3(0.1, 0.3, 0.8) * pow(intensity, 1.3);

    gl_FragColor = vec4(atmosphere + texture2D(earthMap, vUV).xyz, 1.0);
}