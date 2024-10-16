#version 450 core

layout( location = 0 ) in vec2 v2gTexCoord[];
layout( location = 1 ) in vec3 v2gColor[];
layout( location = 2 ) in vec3 v2gPosition[];

layout(triangles) in;
layout(triangle_strip, max_vertices = 3) out;

layout( location = 0) out vec2 g2fTexCoord;
layout( location = 1) out vec3 g2fColor;
layout( location = 2) out float meshDensity;

void main() {
    vec3 e0 = v2gPosition[1] - v2gPosition[0];
    vec3 e1 = v2gPosition[2] - v2gPosition[0];
    float meshArea = length(cross(e0, e1)) * 0.5;

    gl_Position = gl_in[0].gl_Position;
    g2fTexCoord = v2gTexCoord[0];
    g2fColor = v2gColor[0];
    meshDensity = meshArea;
    EmitVertex();

    gl_Position = gl_in[1].gl_Position;
    g2fTexCoord = v2gTexCoord[1];
    g2fColor = v2gColor[1];
    meshDensity = meshArea;
    EmitVertex();

    gl_Position = gl_in[2].gl_Position;
    g2fTexCoord = v2gTexCoord[2];
    g2fColor = v2gColor[2];
    meshDensity = meshArea;
    EmitVertex();

    EndPrimitive();
}
