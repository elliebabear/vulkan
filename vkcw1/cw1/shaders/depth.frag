#version 450

layout(location = 0) in vec2 v2fTexCoord;
layout(location = 1) in vec3 v2fColor;

layout( set = 1, binding = 0 ) uniform sampler2D uTexColor;

layout( location = 0 ) out vec4 oColor;


void main()
{
    float depth = gl_FragCoord.z;
    float depthColor = pow(depth, 188);
    oColor = vec4(vec3(depthColor), 1.0);
}