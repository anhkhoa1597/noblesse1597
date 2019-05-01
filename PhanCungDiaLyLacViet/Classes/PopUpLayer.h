#pragma once

#include "BaseLayer.h"
#include "cocos2d.h"

class MainScene;

class AgeGatheringPopUpLayer : public BaseLayer
{
private:

	void onNameEditTextFieldClick(cocos2d::Ref * pSender, cocos2d::ui::TextField::EventType type);

	bool isNumberFunction(std::string i_num);

public:

	static AgeGatheringPopUpLayer* createPopUpLayer(MainScene* i_mainScene);

	virtual bool init(MainScene* i_mainScene);

	virtual void onExitButtonPressed(cocos2d::Ref *pSender) override;

};


