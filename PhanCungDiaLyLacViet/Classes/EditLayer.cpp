#include "EditLayer.h"
#include "TILButton.h"
#include "AppManager.h"
#include "MainScene.h"

#include "audio/include/AudioEngine.h"
using namespace cocos2d::experimental;

USING_NS_CC;

//////////////////////////////////////////////////////////////////////////////////////////

EditLayer * EditLayer::createLayer(cocos2d::Sprite* i_sprite, MainScene* i_mainScene)
{
	EditLayer *ret = new (std::nothrow) EditLayer();

	if (ret && ret->init(i_sprite,i_mainScene))
	{
		ret->autorelease();
		return ret;
	}
	else
	{
		CC_SAFE_DELETE(ret);

		return nullptr;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////

bool EditLayer::init(cocos2d::Sprite* i_sprite, MainScene* i_mainScene)
{
	if (!BaseLayer::initWithColor(Color4B::WHITE) || i_sprite == nullptr)
	{
		return false;
	}

	///////////////////////////////////////////////////////////

	this->setEnableLockTouch(true);

	///////////////////////////////////////////////////////////

	m_mainScene = i_mainScene;

	m_sprite = Sprite::createWithTexture(i_sprite->getTexture());
	
	const float k_scaleFactor = (m_sprite->getContentSize().width >= m_visibleSize.width ? (m_visibleSize.width / m_sprite->getContentSize().width) : (m_sprite->getContentSize().width / m_visibleSize.width)) - 0.1f;
 
	m_sprite->setScale(k_scaleFactor);
	m_sprite->setPosition(m_origin + m_visibleSize / 2);
	m_sprite->runAction(Repeat::create(Sequence::createWithTwoActions(ScaleTo::create(0.08f, ((k_scaleFactor - 0.1f<0.0f) ? 0.0f : (k_scaleFactor - 0.1f))), ScaleTo::create(0.08f, k_scaleFactor)), 2));
	this->addChild(m_sprite);

	auto okButton = TILButton::create("ok_button.png", "pressed_ok_button.png", "ok_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	//okButton->setColorPressed(Color3B::GREEN);
	okButton->setPressedActionEnabled(true);
	okButton->getRendererClicked()->setVisible(false);
	okButton->setPosition(m_origin + Vec2(m_visibleSize.width/2 + okButton->getContentSize().width*1.1f, okButton->getContentSize().height*0.85f));
	okButton->addClickEventListener([=](cocos2d::Ref*){
	
		AudioEngine::play2d("click.mp3");

		if (m_touchSprites.empty())
		{
			this->removeFromParentAndCleanup(true);
			return;
		}

		std::vector<Vec2> list;
		
		for (size_t i = 0; i < m_touchSprites.size(); i++)
		{
			list.push_back(m_touchSprites[i]->getPosition());
		}

		auto newPos = AppManager::GetInstance()->compute2DPolygonCentroid(list);

		auto spr = Sprite::createWithSpriteFrameName("touch_point.png");
		spr->setColor(Color3B::GREEN);
		spr->setPosition(newPos);
		m_sprite->addChild(spr);
		m_sprite->setPosition(m_origin + m_visibleSize / 2);
		m_sprite->setScale(k_scaleFactor);
		m_mainScene->setCurrentSprite(m_sprite, newPos);

		spr->runAction(Sequence::create(Repeat::create(Sequence::createWithTwoActions(ScaleTo::create(0.08f, 2.5f), ScaleTo::create(0.08f, 1.0f)), 2),DelayTime::create(0.5f),CallFunc::create([=](){
		
			this->removeFromParentAndCleanup(true);
		
		}),nullptr));

	});

	this->addChild(okButton);

	auto clearButton1 = TILButton::create("clear1_button.png", "pressed_clear1_button.png", "clear1_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	//clearButton1->setColorPressed(Color3B::RED);
	clearButton1->getRendererClicked()->setVisible(false);
	clearButton1->setPressedActionEnabled(true);
	clearButton1->setPosition(m_origin + Vec2(m_visibleSize.width / 2 , clearButton1->getContentSize().height*0.85f));
	clearButton1->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");

		if (m_touchSprites.size() > 0)
		{
			m_touchSprites[m_touchSprites.size() - 1]->removeFromParentAndCleanup(true);
			m_touchSprites.pop_back();
		}

		if (m_touchDrawNodes.size() > 0)
		{
			m_touchDrawNodes[m_touchDrawNodes.size() - 1]->removeFromParentAndCleanup(true);
			m_touchDrawNodes.pop_back();
		}

	});

	this->addChild(clearButton1);

	auto clearButton = TILButton::create("clear_button.png", "pressed_clear_button.png", "clear_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	//clearButton->setColorPressed(Color3B::RED);
	clearButton->getRendererClicked()->setVisible(false);
	clearButton->setPosition(clearButton1->getPosition()+Vec2(-clearButton->getContentSize().width *1.1f,0));
	clearButton->setPressedActionEnabled(true);
	clearButton->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");

		for (size_t i = 0; i < m_touchSprites.size(); i++)
		{
			m_touchSprites[i]->removeFromParentAndCleanup(true);
		}

		m_touchSprites.clear();

		for (size_t i = 0; i < m_touchDrawNodes.size(); i++)
		{
			m_touchDrawNodes[i]->removeFromParentAndCleanup(true);
		}

		m_touchDrawNodes.clear();

	});

	this->addChild(clearButton);

	Slider* slider = Slider::create();
	slider->loadBarTexture("trans_bar_bg.png", cocos2d::ui::Widget::TextureResType::PLIST);
	slider->loadSlidBallTextures("trans_bar_circle.png", "trans_bar_circle.png", "", cocos2d::ui::Widget::TextureResType::PLIST);
	slider->setName("slider");
	slider->loadProgressBarTexture("trans_bar_color.png", cocos2d::ui::Widget::TextureResType::PLIST);
	slider->setMaxPercent(200);
	slider->setPercent(100* k_scaleFactor);
	slider->setPosition(Vec2(m_origin.x+m_visibleSize.width/2,m_origin.y+m_visibleSize.height - slider->getContentSize().height*9.0f));
	slider->addEventListener([=](Ref *pSender, Slider::EventType type) {
		if (type == Slider::EventType::ON_PERCENTAGE_CHANGED)
		{
			Slider* slider = dynamic_cast<Slider*>(pSender);
			int percent = slider->getPercent();

			m_sprite->setScale(percent*0.01f);
		}
	});
	this->addChild(slider);

	{
		auto zoomTitleLabel = Label::createWithTTF("\x54\x68\x75 \x4e\x68\xe1\xbb\x8f \x28\x2d\x29\n\x5b\x30\x25\x5d", "fonts/tahoma.ttf", 12.0f);
		zoomTitleLabel->setTextColor(Color4B::BLACK);
		zoomTitleLabel->setName("zoomTitleLabel");
		zoomTitleLabel->setPosition(slider->getPosition() + Vec2(-slider->getContentSize().width*0.58f - zoomTitleLabel->getContentSize().width*0.5f, 0));
		this->addChild(zoomTitleLabel);
	}

	{//phong to
		auto zoomTitleLabel = Label::createWithTTF("\x50\x68\xc3\xb3\x6e\x67 \x54\x6f \x28\x2b\x29\n\x5b\x32\x30\x30\x25\x5d", "fonts/tahoma.ttf", 12.0f);
		zoomTitleLabel->setTextColor(Color4B::BLACK);
		zoomTitleLabel->setName("zoomTitleLabel");
		zoomTitleLabel->setPosition(slider->getPosition() + Vec2(slider->getContentSize().width*0.58f + zoomTitleLabel->getContentSize().width*0.5f, 0));
		this->addChild(zoomTitleLabel);
	}


	auto backButton = TILButton::create("back_button.png", "back_button.png", "back_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	backButton->setColorPressed(Color3B::GRAY);
	backButton->setPressedActionEnabled(true);
	backButton->setPosition(m_origin + Vec2(backButton->getContentSize().width*0.65f, m_visibleSize.height - backButton->getContentSize().height*0.65f));
	backButton->addClickEventListener([=](cocos2d::Ref*) {
			
			AudioEngine::play2d("click.mp3");

			this->removeFromParentAndCleanup(true);
	});

	this->addChild(backButton);

	EventListenerTouchOneByOne *listener = EventListenerTouchOneByOne::create();
	listener->onTouchBegan = CC_CALLBACK_2(EditLayer::onTouchBegan, this);
	listener->onTouchMoved = CC_CALLBACK_2(EditLayer::onTouchMoved, this);
	listener->onTouchEnded = CC_CALLBACK_2(EditLayer::onTouchEnded, this);

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, this);

	return true;
}

//////////////////////////////////////////////////////////////////////////////////////////

bool EditLayer::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	return (m_sprite!=nullptr);
}

//////////////////////////////////////////////////////////////////////////////////////////

void EditLayer::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	if (m_sprite->getBoundingBox().containsPoint(touch->getLocation()))
	{
		m_sprite->setPosition(m_sprite->getPosition() + touch->getDelta());
		m_isTouchMoveActive = true;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////

void EditLayer::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{
	if (m_sprite == nullptr)
	{
		return;
	}
	
	if (!m_isTouchMoveActive && m_sprite->getBoundingBox().containsPoint(touch->getLocation()))
	{
		auto newPos = m_sprite->convertToNodeSpace(touch->getLocation());

		auto spr = Sprite::createWithSpriteFrameName("touch_point.png");
		spr->setPosition(newPos);
		m_sprite->addChild(spr);

		if (m_touchSprites.size() >= 1)
		{
			//draw two line
			Vec2 start = m_touchSprites[m_touchSprites.size() - 1]->getPosition();
			Vec2 end = newPos;

			Vec2 pt = (end - start).getNormalized() * (start.distance(end)) + start;

			DrawNode *drawNode = DrawNode::create();
			drawNode->drawSegment(start, pt, 2.0f, Color4F(Color4B(255,180,0,255)));
			m_sprite->addChild(drawNode, 1);

			m_touchDrawNodes.push_back(drawNode);
		}

		m_touchSprites.push_back(spr);
	}
	
	m_isTouchMoveActive = false;
}
