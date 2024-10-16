#version 450

layout( location = 0 ) in vec2 v2fUV;
layout( set = 0, binding = 0 ) uniform sampler2D bhTex;
layout (location = 0) out vec4 oColor;

const int size = 22;
const float PI = 3.1415926;

float Gaussian(float x, float sigma) {
    return (1.0 / (sqrt(2.0 * PI) * sigma)) * exp(-(x * x) / (2.0 * sigma * sigma));
}

void CalculateWeights(out float weights[size]) {
    float sum = 0.0;
    for (int i = 0; i < size; ++i) {
        weights[i] = Gaussian(float(i), 9.0);
        sum += weights[i];
    }
    for (int i = 0; i < size; ++i) {
        weights[i] /= sum;
    }
}

void main()
{
    float weights[size]; 
    CalculateWeights(weights);

    float LinearWeights[11];
    for(int i = 0; i < 11; ++i)
    {
        LinearWeights[i] = weights[2*i] + weights[2*i+1];
    }

    vec2 texOffset = 1.0 / textureSize(bhTex, 0);

    //22 - texOffset*0 texOffset*1 texOffset*2 ...texOffset*21
    float offset[11];
    for(int i = 0; i < 11; ++i)
    {
        offset[i] = ( texOffset.y*(2*i)*weights[2*i]+texOffset.y*(2*i+1)*weights[2*i+1] )/ LinearWeights[i];
    }

    vec3 result = texture(bhTex, v2fUV).rgb * LinearWeights[0];

    for(int i = 1; i < 11; ++i)
    {
        result += texture(bhTex, v2fUV + vec2(0.0, offset[i])).rgb * LinearWeights[i];
        result += texture(bhTex, v2fUV - vec2(0.0, offset[i])).rgb * LinearWeights[i];
    }

    oColor = vec4(result, 1.0);
}