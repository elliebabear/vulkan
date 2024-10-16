#version 450

layout( location = 0 ) in vec3 v2fPosition;
layout( location = 1 ) in vec2 v2fTexCoords;
layout( location = 2 ) in vec3 v2fNormal;
layout( location = 3 ) in vec4 v2fTangent;
layout( location = 4 ) in vec3 v2flightPosition;
layout( location = 5 ) in vec3 v2flightColor;
layout( location = 6 ) in vec3 v2fcamPosition;

layout(set = 1, binding = 0) uniform sampler2D base;
layout(set = 1, binding = 1) uniform sampler2D roughness;
layout(set = 1, binding = 2) uniform sampler2D metalness;
layout(set = 1, binding = 3) uniform sampler2D normalmap;
layout(set = 1, binding = 4) uniform sampler2D emissivemap;


layout( location = 0 ) out vec4 fragColor;
layout( location = 1 ) out vec4 brightColor;



const float PI = 3.1415926;
float computeD(float nh, float a) //normal distribution term
{
    float nh2 = pow(max(0,nh),2);
    float e = ((nh2-1.0) / (a*a*nh2));
    float up = exp(e);
    float down = PI * a*a * pow(max(0,nh),4);
    float D = up/down;
    return D;
}
float computeG(vec3 n, vec3 h, vec3 v, vec3 l) //cook torrance masking term
{
    float first = 2 * ( max(dot(n,h),0.0) * max(dot(n,v),0.0) ) / dot(v,h);
    float second = 2 * ( max(dot(n,h),0.0) * max(dot(n,l),0.0) ) / dot(v,h);
    return min(1.0, min(first, second));
}

void main() {

    vec3 Cmat = texture(base, v2fTexCoords).rgb;
    float M = texture(metalness, v2fTexCoords).r;

    vec3 viewDir = normalize(v2fcamPosition - v2fPosition);
    vec3 lightDir = normalize(v2flightPosition - v2fPosition);
	vec3 halfVec = normalize(viewDir + lightDir);

	vec3 F0 = (1.0-M) * vec3(0.04) + M*Cmat;
	vec3 F = F0 + (1.0-F0) * pow(1.0-dot(halfVec,viewDir),5.0);//the Fresnel term
	vec3 Ldiffuse = (Cmat/PI) * (vec3(1.0)-F) * (1.0-M);

	vec3 normal = normalize(v2fNormal);
	float alpha = texture(roughness,v2fTexCoords).r;
	float D = computeD(dot(normal,halfVec), alpha);

	float G = computeG(normal,halfVec,viewDir,lightDir);

	vec3 Lambient = vec3(0.02) * Cmat;

	vec3 up = D*F*G;
    float down = 4.0 * max(dot(normal,viewDir),0.0) * max(dot(normal,lightDir),0.0)+0.0001;
	vec3 BRDF = Ldiffuse + (up/down);

	vec3 Lemissive = texture(emissivemap, v2fTexCoords).rgb * 75.0;

	vec3 PBR = Lemissive + Lambient + BRDF*v2flightColor* max(dot(normal,lightDir),0.0);

	//fragColor = vec4(vec3(D),1.0);
	//fragColor = vec4(vec3(G),1.0);
	//fragColor = vec4(F, 1.0);
	//fragColor = vec4((up/down), 1.0);
	//fragColor = vec4(normal, 1.0);
	fragColor = vec4(PBR,1.0);

	if(PBR.r > 1 || PBR.g > 1 || PBR.b > 1)
	{
		brightColor = vec4(PBR,1.f);
	}else{
		brightColor = vec4(vec3(0), 1.f);
	}


}