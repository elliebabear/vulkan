#version 450

layout(location = 0) in vec3 Position;
layout(location = 1) in vec2 Texcoord;
layout(location = 2) in vec3 Color;

layout( set = 0, binding = 0 ) uniform UScene
{
	mat4 camera;
	mat4 projection;
	mat4 projCam;
} uScene;

layout(location = 0) out vec2 v2gTexCoord;
layout(location = 1) out vec3 v2gColor;
layout(location = 2) out vec3 v2gPosition;


void main()
{
	v2gTexCoord = Texcoord;
	v2gColor = Color;
	v2gPosition = Position;
	gl_Position = uScene.projCam * vec4( Position, 1.f );
}