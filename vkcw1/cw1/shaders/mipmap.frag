#version 450

layout(location = 0) in vec2 v2fTexCoord;
layout(location = 1) in vec3 v2fColor;

layout( set = 1, binding = 0 ) uniform sampler2D uTexColor;

layout( location = 0 ) out vec4 oColor;


void main()
{
	vec4 tmpColor = texture(uTexColor,v2fTexCoord).rgba;
	if(v2fTexCoord.x == 0)
	{
		oColor = vec4(v2fColor.x, v2fColor.y, v2fColor.z,1.0f);
	}
	else
	{
		float mipmap = textureQueryLod(uTexColor, v2fTexCoord).x;
		vec4 a = vec4(0.8, 0.0, 0.1, 1.0); 
		vec4 b = vec4(0.4, 0.7, 0.6, 1.0); 
		vec4 c = vec4(0.8, 0.4, 0.1, 1.0); 
		vec4 d = vec4(0.7, 1.0, 0.3, 1.0);
		vec4 e = vec4(0.7, 0.4, 1.0, 1.0);
		vec4 f = vec4(0.7, 0.5, 1.0, 1.0);
		vec4 color = mix(a, b, smoothstep(0.0, 1.0, mipmap));
		color = mix(color, c, smoothstep(1.0, 2.0, mipmap));
		color = mix(color, d, smoothstep(2.0, 3.0, mipmap));
		color = mix(color, e, smoothstep(3.0, 4.0, mipmap));
		color = mix(color, f, smoothstep(4.0, 5.0, mipmap));
		oColor =color;
	}
}

