#include "BaseLayer.h"

#include "SimpleAudioEngine.h"

USING_NS_CC;

using namespace ui;

bool BaseLayer::initWithColor(cocos2d::Color4B color)
{
	if (!LayerColor::initWithColor(color))
	{
		return false;
	}
	
	m_visibleSize = Director::getInstance()->getVisibleSize();

	m_origin = Director::getInstance()->getVisibleOrigin();

	//lock button.

	m_lockButton = Button::create();
	
	m_lockButton->setAnchorPoint(Point::ZERO);
	
	m_lockButton->setScale9Enabled(true);
	
	m_lockButton->setContentSize(m_visibleSize);

	m_lockButton->setPosition(m_origin);

	this->addChild(m_lockButton,-1);
	
	return true;
}

void BaseLayer::setEnableLockTouch(bool isVisible)
{
	m_lockButton->setVisible(isVisible);
}

void BaseLayer::setLockTouchArea(cocos2d::Rect area)
{
	m_lockButton->setPosition(area.origin);
	m_lockButton->setContentSize(area.size);
}

void BaseLayer::resetLockTouchArea()
{
	m_lockButton->setPosition(m_origin);
	m_lockButton->setContentSize(m_visibleSize);
}

void BaseLayer::onExitButtonPressed(cocos2d::Ref * pSender)
{

}

