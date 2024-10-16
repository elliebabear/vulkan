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

layout( location = 0 ) out vec4 fragColor;

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

//----------------------------------------task2.1---------------------------------------------------------

//    //Normal
//    fragColor = vec4(v2fNormal, 1.0);
//    //View direction
//    fragColor = vec4(normalize(v2fcamPosition - v2fPosition),1.0);
//    //Light direction 
//    fragColor = vec4(normalize(v2flightColor - v2fPosition),1.0);


//----------------------------------------task2.2---------------------------------------------------------

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
    float down = 4.0 * max(dot(normal,viewDir),0.0) * max(dot(normal,lightDir),0.0);
	vec3 BRDF = Ldiffuse + (up/down);

	vec3 PBR = Lambient + BRDF*v2flightColor* max(dot(normal,lightDir),0.0);

	//fragColor = vec4(vec3(D),1.0);
	//fragColor = vec4(vec3(G),1.0);
	//fragColor = vec4(F, 1.0);
	//fragColor = vec4((up/down), 1.0);
	//fragColor = vec4(normal, 1.0);
	fragColor = vec4(PBR,1.0);

//----------------------------------------task2.3---------------------------------------------------------

//    float alphaMask = texture(base, v2fTexCoords).a;
//    if(alphaMask < 0.4f) discard;
//	
//    vec3 Cmat = texture(base, v2fTexCoords).rgb;
//    float M = texture(metalness, v2fTexCoords).r;
//
//    vec3 viewDir = normalize(v2fcamPosition - v2fPosition);
//    vec3 lightDir = normalize(v2flightPosition - v2fPosition);
//	vec3 halfVec = normalize(viewDir + lightDir);
//
//	vec3 F0 = (1.0-M) * vec3(0.04) + M*Cmat;
//	vec3 F = F0 + (1.0-F0) * pow(1.0-dot(halfVec,viewDir),5.0);//the Fresnel term
//	vec3 Ldiffuse = (Cmat/PI) * (vec3(1.0)-F) * (1.0-M);
//
//	vec3 normal = normalize(v2fNormal);
//	float alpha = texture(roughness,v2fTexCoords).r;
//	float D = computeD(dot(normal,halfVec), alpha);
//
//	float G = computeG(normal,halfVec,viewDir,lightDir);
//
//	vec3 Lambient = vec3(0.02) * Cmat;
//
//	vec3 up = D*F*G;
//    float down = 4.0 * max(dot(normal,viewDir),0.0) * max(dot(normal,lightDir),0.0);
//	vec3 BRDF = Ldiffuse + (up/down);
//
//	vec3 PBR = Lambient + BRDF*v2flightColor* max(dot(normal,lightDir),0.0);
//
//	fragColor = vec4(PBR,alphaMask);


//----------------------------------------task2.4---------------------------------------------------------

//    float alphaMask = texture(base, v2fTexCoords).a;
//    if(alphaMask < 0.4f) discard;
//	
//    vec3 Cmat = texture(base, v2fTexCoords).rgb;
//    float M = texture(metalness, v2fTexCoords).r;
//
//    vec3 viewDir = normalize(v2fcamPosition - v2fPosition);
//    vec3 lightDir = normalize(v2flightPosition - v2fPosition);
//	vec3 halfVec = normalize(viewDir + lightDir);
//
//	vec3 F0 = (1.0-M) * vec3(0.04) + M*Cmat;
//	vec3 F = F0 + (1.0-F0) * pow(1.0-dot(halfVec,viewDir),5.0);//the Fresnel term
//	vec3 Ldiffuse = (Cmat/PI) * (vec3(1.0)-F) * (1.0-M);
//
//	vec3 normal = normalize(v2fNormal);
//	vec3 T = normalize(v2fTangent.xyz);
//    vec3 B = cross(normal, T) * v2fTangent.w;
//    mat3 TBN = mat3(T, B, normal);
//	vec3 norMap = texture(normalmap, v2fTexCoords).rgb * 2.0 - 1.0;
//    vec3 nnormal = normalize(TBN * norMap);
//
//	float alpha = texture(roughness,v2fTexCoords).r;
//	float D = computeD(dot(nnormal,halfVec), alpha);
//
//	float G = computeG(nnormal,halfVec,viewDir,lightDir);
//
//	vec3 Lambient = vec3(0.02) * Cmat;
//
//	vec3 up = D*F*G;
//    float down = 4.0 * max(dot(nnormal,viewDir),0.0) * max(dot(nnormal,lightDir),0.0);
//	vec3 BRDF = Ldiffuse + (up/down);
//
//	vec3 PBR = Lambient + BRDF*v2flightColor* max(dot(nnormal,lightDir),0.0);
//
//	//fragColor = vec4(vec3(D),1.0);
//	//fragColor = vec4(vec3(G),1.0);
//	//fragColor = vec4(F, 1.0);
//	//fragColor = vec4(nnormal,1.0);
//	fragColor = vec4(PBR,alphaMask);

}