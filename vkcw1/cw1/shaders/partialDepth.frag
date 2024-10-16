#version 450

layout(location = 0) in vec2 v2fTexCoord;
layout(location = 1) in vec3 v2fColor;

layout( set = 1, binding = 0 ) uniform sampler2D uTexColor;

layout( location = 0 ) out vec4 oColor;


void main()
{
    float depth = gl_FragCoord.z;
    float depthColor = depth*100;
    float dx = dFdx(depthColor);
    float dy = dFdy(depthColor);
    float l = length(vec2(dx, dy))*100.0f;
    vec4 a = vec4(0.8, 0.0, 0.1, 1.0); 
    vec4 b = vec4(0.4, 0.7, 0.6, 1.0); 
    vec4 color = mix(a, b, smoothstep(0.0, 0.5, l));
    color = mix(color, b, smoothstep(0.5, 1.0, l));
    oColor =color;
}