#version 450
layout(location = 0) in vec3 iPosition;

layout(set = 0, binding = 0) uniform LightMatrix
{
mat4 lightMatrix;
}uLight;

void main()
{
  vec4 lightSpacePos = uLight.lightMatrix * vec4(iPosition, 1.0);
  gl_Position = vec4(lightSpacePos.x, lightSpacePos.y, lightSpacePos.z + 0.005f, lightSpacePos.w);
}
