#version 450

layout( location = 0 ) in vec3 vPosition;
layout( location = 1 ) in vec2 vTexCoord;
layout( location = 2 ) in vec3 vNormal;
layout( location = 3 ) in vec4 vTangent;

layout(set = 0, binding = 0) uniform UScene
{
	mat4 camera;
	mat4 projection;
	mat4 projCam;
	vec3 lightPosition;// cw2 - glm::vec3(-0.2972, 7.3100, -11.9532);
	vec3 lightColor; // cw2 - glm::vec3(1.0, 1.0, 1.0);
	vec3 camPosition;
}uScene;

layout( location = 0 ) out vec3 v2fPosition;
layout( location = 1 ) out vec2 v2fTexCoords;
layout( location = 2 ) out vec3 v2fNormal;
layout( location = 3 ) out vec4 v2fTangent;
layout( location = 4 ) out vec3 v2flightPosition;
layout( location = 5 ) out vec3 v2flightColor;
layout( location = 6 ) out vec3 v2fcamPosition;

void main()
{
	v2fPosition = vPosition;
	v2fTexCoords = vTexCoord;
	v2fNormal = vNormal;
	v2fTangent = vTangent;

	v2flightPosition = vec3(-0.2972, 7.3100, -11.9532);
	v2flightColor = vec3(1.0,1.0,1.0);
	mat4 a = inverse(uScene.camera);
	v2fcamPosition = vec3(a[3]);

	gl_Position = uScene.projCam * vec4(vPosition, 1.0f);
}
