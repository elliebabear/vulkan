#version 450

layout(location = 0) in vec2 g2fTexCoord;
layout(location = 1) in vec3 g2fColor;
layout(location = 2) in float meshDensity;

layout( set = 1, binding = 0 ) uniform sampler2D uTexColor;

layout( location = 0 ) out vec4 oColor;


void main()
{

    //1.6----------------------------------------------------------------------------------------------------------------
    float d = meshDensity * 10.0;
    vec4 a = vec4(0.8, 0.0, 0.1, 1.0);
    vec4 b = vec4(1.0, 0.8, 0.6, 1.0);
    vec4 color = mix(a, b, smoothstep(0.0, 0.3, d));
    color = mix(color, b, smoothstep(0.3, 1.0, d));
    oColor =color;
}

