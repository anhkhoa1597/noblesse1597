#pragma once

#include "cocos2d.h"
#include "BaseLayer.h"
class MainScene;

class EditLayer : public BaseLayer
{
private:

	cocos2d::Sprite*				m_sprite;

	std::vector<cocos2d::Sprite*>	m_touchSprites;
	std::vector<cocos2d::DrawNode*>	m_touchDrawNodes;

	MainScene*						m_mainScene = nullptr;

	bool							m_isTouchMoveActive = false;

public:

	static EditLayer* createLayer(cocos2d::Sprite* i_sprite, MainScene* i_mainScene);

    virtual bool init(cocos2d::Sprite* i_sprite, MainScene* i_mainScene);

	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event *event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event);

    
};

