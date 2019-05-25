#include "SplashScene.h"
#include "MainScene.h"

#include "audio/include/AudioEngine.h"
using namespace cocos2d::experimental;

USING_NS_CC;

Scene* SplashScene::createScene()
{
	auto scene = Scene::create();
	auto layer = SplashScene::create();
	scene->addChild(layer);
	return scene;
}

bool SplashScene::init()
{
    if (!BaseLayer::initWithColor(Color4B::WHITE))
    {
        return false;
    }

	UserDefault::getInstance()->setIntegerForKey("yearOfBirth", -1);
	UserDefault::getInstance()->setBoolForKey("isMale", false);

	auto studioLogo = Sprite::createWithSpriteFrameName("studio_logo.png");
	studioLogo->setName("studioLogo");
	studioLogo->setPosition(m_origin + m_visibleSize / 2);
	this->addChild(studioLogo);

	auto effectStudioLogo = Sprite::createWithSpriteFrameName("eff_studio_logo.png");
	effectStudioLogo->setPosition(m_origin + m_visibleSize / 2);
	this->addChild(effectStudioLogo);


	effectStudioLogo->runAction(Sequence::create(DelayTime::create(1.0f), CallFunc::create([]() {

		AudioEngine::play2d("splash.mp3");

	}), FadeOut::create(0.8f),  DelayTime::create(1.2f), CallFunc::create([]() {
	
		Director::getInstance()->replaceScene(TransitionFade::create(0.5f, MainScene::createScene()));
	
	}), nullptr));


    return true;
}

