#version 450
layout( location = 0 ) in vec2 v2fUV;

layout(set = 0, binding = 0) uniform sampler2D baseTex;
layout(set = 1, binding = 0) uniform sampler2D brightTex;

layout (location = 0) out vec4 oColor;

void main()
{
	vec3 base = texture(baseTex,v2fUV).rgb;
	vec3 bright = texture(brightTex,v2fUV).rgb;

	vec3 result = base + bright;
	result = result/ (1 + result);

	oColor = vec4(result, 1.0);
}