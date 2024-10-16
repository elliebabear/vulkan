#ifndef SIMPLE_MODEL_HPP_CEC8C14F_3678_43C9_8121_BDB60B23D840
#define SIMPLE_MODEL_HPP_CEC8C14F_3678_43C9_8121_BDB60B23D840
#pragma once
#include <string>
#include <vector>
#include <limits>

#include <cstring> // for std::memcpy()

#include <cstdint>

#include <glm/vec2.hpp>
#include <glm/vec3.hpp>

#include "../labutils/vulkan_context.hpp"

#include "../labutils/vkbuffer.hpp"
#include "../labutils/allocator.hpp" 
#include "../labutils/error.hpp"
#include "../labutils/vkutil.hpp"
#include "../labutils/to_string.hpp"
#include "../labutils/vulkan_window.hpp"
#include "../labutils/vkimage.hpp"



// A simple material with a diffuse color and an (optional) diffuse texture.
//
// If the material does not define a diffuse texture, the `diffuseTexturePath`
// string is empty (std::string::empty()).
//
// If the material defines a diffuse texture, you will have to load it with
// e.g., the stbi_load() function from <stb_image.h>.
namespace lut = labutils;

struct SimpleMaterialInfo
{
	std::string materialName;  // This is purely informational and for debugging

	glm::vec3 diffuseColor;
	std::string diffuseTexturePath;
};

// A simple mesh
//
// A mesh links a set of vertices with a specific material. 
//
// The material of the mesh is identified by the `materialIndex` member. It is
// an index into the `SimpleModel::materials` vector.
//
// The vertices belonging to the mesh are identified by the `vertexStartIndex`
// and `vertexCount` members. The mesh contains `vertexCount` members, starting
// at index `vertexStartIndex`. For textured meshes (`textured` set to `true`),
// the vertices are found in the `SimpleModel::dataTextured::positions` and
// `SimpleModel::dataTextured::texcoords` arrays. For untextured meshes
// (`textured` set to `false`), the vertices are instead found in the
// `SimpleModel::dataUntextured::positions` array (and do not have any texture
// coordinates).
struct SimpleMeshInfo
{
	std::string meshName;  // This is purely informational and for debugging

	std::size_t materialIndex;

	bool textured : 1;

	std::size_t vertexStartIndex;
	std::size_t vertexCount;
};

// Simple model.
//
// Note: you probably want to use this for loading only. Once you have copied
// the mesh data into Vulkan buffers, you are unlikely to need it any longer.
struct SimpleModel
{
	std::string modelSourcePath;

	std::vector<SimpleMaterialInfo> materials;
	std::vector<SimpleMeshInfo> meshes;

	struct Data_
	{
		std::vector<glm::vec3> positions;
		std::vector<glm::vec2> texcoords;
	} dataTextured;

	struct Data2_
	{
		std::vector<glm::vec3> positions;
	} dataUntextured;
};







#endif // SIMPLE_MODEL_HPP_CEC8C14F_3678_43C9_8121_BDB60B23D840

