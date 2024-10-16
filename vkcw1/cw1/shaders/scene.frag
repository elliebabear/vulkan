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
		oColor = tmpColor;
	}
}

