#include "TILButton.h"

TILButton::TILButton()
{
	//auto call ui::Button() constructor
}

TILButton::~TILButton()
{
	//NA 
}

TILButton* TILButton::create(const std::string &normalImage,
	const std::string& selectedImage,
	const std::string& disableImage,
	TextureResType texType)
{
	TILButton *btn = new (std::nothrow) TILButton;
	if (btn && btn->init(normalImage, selectedImage, disableImage, texType))
	{
		btn->autorelease();
		return btn;
	}
	CC_SAFE_DELETE(btn);
	return nullptr;
}

void TILButton::setColorPressed(Color3B color)
{
	if (_buttonClickedRenderer != nullptr)
	{
		_buttonClickedRenderer->setColor(color);
	}

	/*if(_buttonDisabledRenderer != nullptr)
	{
		_buttonDisabledRenderer->setColor(Color3B::GRAY);
	}*/
}

