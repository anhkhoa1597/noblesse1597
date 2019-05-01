#pragma once

#include "cocos2d.h"
#include "ui/CocosGUI.h"

USING_NS_CC;

using namespace ui;

class TILButton: public  ui::Button
{

public:
   /**
	* Default constructor.
	*/

	TILButton();

	/**
	* Default destructor.
	*/
	~TILButton();

	/**
	* Create a button with custom textures.
	* @param normalImage normal state texture name.
	* @param selectedImage  selected state texture name.
	* @param disableImage disabled state texture name.
	* @param texType    @see `TextureResType`
	* @return a Button instance.
	*/
	static TILButton* create(const std::string& normalImage,
		const std::string& selectedImage = "",
		const std::string& disableImage = "",
		TextureResType texType = TextureResType::LOCAL);


	virtual void setColorPressed(Color3B color);

};
