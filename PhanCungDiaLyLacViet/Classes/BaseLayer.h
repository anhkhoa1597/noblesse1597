#pragma once

#include "cocos2d.h"

#include "ui/CocosGUI.h"

class BaseLayer : public cocos2d::LayerColor
{
public:

	virtual bool initWithColor(cocos2d::Color4B color);

	virtual void setEnableLockTouch(bool value);
	
	virtual void setLockTouchArea(cocos2d::Rect area);
	
	virtual void resetLockTouchArea();

protected:

	virtual void onExitButtonPressed(cocos2d::Ref *pSender);

protected:

	cocos2d::Size		m_visibleSize;

	cocos2d::Vec2		m_origin;

	cocos2d::ui::Button *m_lockButton;

};

