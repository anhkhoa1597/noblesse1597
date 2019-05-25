#pragma once
#include "cocos2d.h"
#include "BaseLayer.h"

class SplashScene :  public BaseLayer
{
private : 
	
	float m_deltaTime;
public:

    static cocos2d::Scene* createScene();

    virtual bool init();

    CREATE_FUNC(SplashScene);
};

