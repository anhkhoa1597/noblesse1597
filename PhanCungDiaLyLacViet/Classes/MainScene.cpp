#include "MainScene.h"
#include "EditLayer.h"
#include "AppManager.h"
#include "TILButton.h"
#include "PopUpLayer.h"

#include "audio/include/AudioEngine.h"
using namespace cocos2d::experimental;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni.h>
#include "platform/android/jni/JniHelper.h"
#endif

USING_NS_CC;

#define IMAGE_ZORDER 0
#define COMPASS_ZORDER 5
#define ARROW_ZORDER 10
#define BUTTON_ZORDER 15
#define BAR_ZORDER 15
#define POPUP_ZORDER 50
#define NOTIFICATION_ZORDER 100

Scene* MainScene::createScene()
{
    auto scene = Scene::create();
    
    auto layer = MainScene::create();

    scene->addChild(layer);

    return scene;
}

bool MainScene::init()
{
    if ( !LayerColor::initWithColor(Color4B::WHITE))//Color4B(230, 230, 230, 255)))
    {
        return false;
    }
    
	m_visibleSize = Director::getInstance()->getVisibleSize();
	m_origin = Director::getInstance()->getVisibleOrigin();

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	m_topBar = LayerColor::create(Color4B::WHITE);//Color4B(243, 243, 243,255)
	m_topBar->ignoreAnchorPointForPosition(false);
	m_topBar->setAnchorPoint(Vec2(0.5f, 0.5f));
	m_topBar->setContentSize(Size(m_visibleSize.width, 96.0f));
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    m_topBar->setPosition(m_origin + Vec2(m_visibleSize.width/2, m_visibleSize.height - m_topBar->getContentSize().height/2 - 50));
#else
	m_topBar->setPosition(m_origin + Vec2(m_visibleSize.width/2, m_visibleSize.height - m_topBar->getContentSize().height/2));
#endif
	this->addChild(m_topBar, BAR_ZORDER);
	
	{
		auto line = LayerColor::create(Color4B(243, 243, 243, 255));
		line->ignoreAnchorPointForPosition(false);
		line->setAnchorPoint(Vec2(0.5f, 0.5f));
		line->setContentSize(Size(m_visibleSize.width, 2.0f));
		line->setPosition(m_topBar->getContentSize().width / 2, 1.0f);
		m_topBar->addChild(line);
	}
	

	m_bottomBar = LayerColor::create(Color4B::WHITE);
	m_bottomBar->ignoreAnchorPointForPosition(false);
	m_bottomBar->setAnchorPoint(Vec2(0.5f, 0.5f));
	m_bottomBar->setContentSize(Size(m_visibleSize.width, 96.0f));
	m_bottomBar->setPosition(m_origin + Vec2(m_visibleSize.width / 2, m_bottomBar->getContentSize().height / 2));
	this->addChild(m_bottomBar, BAR_ZORDER);

	{
		auto line = LayerColor::create(Color4B(243, 243, 243, 255));
		line->ignoreAnchorPointForPosition(false);
		line->setAnchorPoint(Vec2(0.5f, 0.5f));
		line->setContentSize(Size(m_visibleSize.width, 2.0f));
		line->setPosition(m_bottomBar->getContentSize().width / 2, 96.0f);
		m_bottomBar->addChild(line);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const float k_spaceBetweenButtons = 20.0f;

	auto openFilesButton = TILButton::create("open_files_button.png", "pressed_open_files_button.png", "open_files_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	openFilesButton->setPosition(Vec2(openFilesButton->getContentSize().width, m_topBar->getContentSize().height / 2));
	openFilesButton->addClickEventListener(CC_CALLBACK_1(MainScene::onOpenFilesClick, this));
	m_topBar->addChild(openFilesButton, BUTTON_ZORDER);


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	auto editButton = TILButton::create("edit_button.png", "pressed_edit_button.png", "edit_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	editButton->setPosition(openFilesButton->getPosition()+Vec2(openFilesButton->getContentSize().width/2+ k_spaceBetweenButtons+ editButton->getContentSize().width/2,0));
	editButton->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");

		if (m_sprite != nullptr)
		{
			auto editLayer = EditLayer::createLayer(m_sprite, this);
			this->addChild(editLayer, POPUP_ZORDER);
		}
		else 
		{
			AppManager::GetInstance()->createRedNotification("\x56\x75\x69 \x6c\xc3\xb2\x6e\x67 \x63\x68\xe1\xbb\x8d\x6e \x68\xc3\xac\x6e\x68 \xe1\xba\xa3\x6e\x68 "
				"\x28\x6e\x68\xc3\xa0\x2c\x62\xe1\xba\xa3\x6e \xc4\x91\xe1\xbb\x93\x2e\x2e\x29\n\x74\x72\xc6\xb0\xe1\xbb\x9b\x63 \x6b\x68\x69 "
				"\x73\xe1\xbb\xad \x64\xe1\xbb\xa5\x6e\x67 \x74\xc3\xad\x6e\x68 \x6e\xc4\x83\x6e\x67 \xc4\x91\xe1\xbb\x8b\x6e\x68 \x74\xc3\xa2\x6d \x6e\xc3\xa0\x79 \x21", this, NOTIFICATION_ZORDER);
		}

	});
	m_topBar->addChild(editButton, BUTTON_ZORDER);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	auto informationButton = TILButton::create("information_button.png", "pressed_information_button.png", "information_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	informationButton->setPosition(editButton->getPosition() + Vec2(editButton->getContentSize().width / 2 + k_spaceBetweenButtons + informationButton->getContentSize().width / 2, 3));
	informationButton->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");

		auto popup = AgeGatheringPopUpLayer::createPopUpLayer(this);
		this->addChild(popup, POPUP_ZORDER);

	});
	m_topBar->addChild(informationButton, BUTTON_ZORDER);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

	auto exportButton = TILButton::create("export_button.png", "pressed_export_button.png", "export_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	exportButton->setPosition(informationButton->getPosition() + Vec2(informationButton->getContentSize().width / 2 + k_spaceBetweenButtons + exportButton->getContentSize().width / 2, 0));
	exportButton->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");

		if (m_sprite == nullptr)
		{
			return;
		}
	
		Size pixelSize = Director::getInstance()->getWinSizeInPixels();

		auto node = this->getChildByName("renderTexture");

		if (node)
		{
			node->removeFromParentAndCleanup(true);
		}

		RenderTexture* renderTexture  = RenderTexture::create(768.0f*AppManager::GetInstance()->getScaleFactor(), 1136.0f*AppManager::GetInstance()->getScaleFactor(), Texture2D::PixelFormat::RGBA8888, GL_DEPTH24_STENCIL8);
		renderTexture->setPosition(Vec2(768.0f,1136.0f)*AppManager::GetInstance()->getScaleFactor()*0.5f);
		renderTexture->setVisible(false);
		renderTexture->setName("renderTexture");
		this->addChild(renderTexture);

		renderTexture->beginWithClear(255, 255, 255, 255);
		m_sprite->visit();
		m_compass->visit();
        m_oxyArrow->visit();
        m_compassArrow->visit();
		renderTexture->end();
		
		std::string fileName = "phongthuy.png";
		
		renderTexture->saveToFile(fileName, Image::Format::PNG, true, CC_CALLBACK_2(MainScene::saveToFileCallback, this));

		//Add this function to avoid crash if we switch to a new scene.
		Director::getInstance()->getRenderer()->render();
	});
	m_topBar->addChild(exportButton, BUTTON_ZORDER);

	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	auto aboutButton = TILButton::create("normal_about_button.png", "pressed_about_button.png", "normal_about_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	aboutButton->setPosition(exportButton->getPosition() + Vec2(exportButton->getContentSize().width / 2 + k_spaceBetweenButtons + aboutButton->getContentSize().width / 2, 0));
	aboutButton->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");

		auto popup = AboutPopUpLayer::createPopUpLayer(this);
		this->addChild(popup, POPUP_ZORDER);

	});
	m_topBar->addChild(aboutButton, BUTTON_ZORDER);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	auto defaultButton = TILButton::create("default_button.png", "pressed_default_button.png", "default_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	//defaultButton->setColorPressed(Color3B::ORANGE);
	defaultButton->setPosition(Vec2(m_bottomBar->getContentSize().width/2, m_bottomBar->getContentSize().height/2));
	defaultButton->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");

		if (m_rotationType == ROTATION_TYPE::SPRITE && m_sprite != nullptr)
		{
			const float k_scaleFactor = (m_sprite->getContentSize().width >= m_visibleSize.width ? (m_visibleSize.width / m_sprite->getContentSize().width) : (m_sprite->getContentSize().width / m_visibleSize.width)) - 0.1f;
			//m_sprite->setAnchorPoint(Vec2(0.5f, 0.5f));
			m_sprite->setPosition(m_origin + m_visibleSize / 2);
			m_sprite->setRotation(0);
			m_sprite->setScale(k_scaleFactor);
			m_sprite->setOpacity(255);
		}
		else if (m_rotationType == ROTATION_TYPE::COMPASS && m_compass != nullptr)
		{
			const float k_scaleFactor = (m_compass->getContentSize().width >= m_visibleSize.width ? (m_visibleSize.width / m_compass->getContentSize().width) : (m_compass->getContentSize().width / m_visibleSize.width)) - 0.1f;
			m_compass->setScale(k_scaleFactor);
			m_compass->setRotation(0);
			m_compass->setOpacity(255);
			m_compass->getChildByName("compassBorder")->setOpacity(255);
			m_compass->getChildByName("yingAndYang")->setOpacity(255);
            m_oxyArrow->setRotation(0);
            m_compass->setRotation(0);
            m_smallOxyArrow->setRotation(0);
            m_smallCompassArrow->setRotation(0);
            m_compassArrow->setRotation(0);
		}

		((Slider*)this->getChildByName("slider"))->setPercent(100);

		MainScene::updateInforLabel();

	});
	m_bottomBar->addChild(defaultButton, BUTTON_ZORDER);

	auto rotationFunction = [=](float i_value) {

		if (m_rotationType == ROTATION_TYPE::SPRITE && m_sprite != nullptr)
		{
			m_sprite->setRotation(m_sprite->getRotation() + i_value);

		}

		if (m_rotationType == ROTATION_TYPE::COMPASS && m_compass != nullptr)
		{
            //int a = m_compass->getRotation();
			//
            m_compassArrow->setRotation(m_compassArrow->getRotation() + i_value);
            //m_smallOxyArrow->setRotation(m_smallOxyArrow->getRotation() + i_value);
            m_smallCompassArrow->setRotation(m_smallCompassArrow->getRotation() + i_value);
            if(m_lockCompass)
            {
                m_oxyArrow->setRotation(m_oxyArrow->getRotation() + i_value);
                m_compass->setRotation(m_compass->getRotation() + i_value);
            }
		}

		MainScene::updateInforLabel();
	};

	auto leftRotationButton = TILButton::create("left_rotation_button.png", "pressed_left_rotation_button.png", "left_rotation_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	leftRotationButton->setPosition(defaultButton->getPosition()+Vec2(-defaultButton->getContentSize().width/2-k_spaceBetweenButtons- leftRotationButton->getContentSize().width/2,0));
	leftRotationButton->addTouchEventListener([=](Ref*, Widget::TouchEventType i_type) {
		

		switch (i_type)
		{
		case cocos2d::ui::Widget::TouchEventType::BEGAN:
			break;
		case cocos2d::ui::Widget::TouchEventType::MOVED:
			rotationFunction(-0.28f);
			break;
		case cocos2d::ui::Widget::TouchEventType::ENDED:
			rotationFunction(-0.28f);
			AudioEngine::play2d("click.mp3");
			break;
		case cocos2d::ui::Widget::TouchEventType::CANCELED:
			break;
		default:
			break;
		}
	});
	
	m_bottomBar->addChild(leftRotationButton, BUTTON_ZORDER);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	auto rightRotationButton = TILButton::create("right_rotation_button.png", "pressed_right_rotation_button.png", "right_rotation_button.png", cocos2d::ui::Widget::TextureResType::PLIST);
	rightRotationButton->setPosition(defaultButton->getPosition() + Vec2(defaultButton->getContentSize().width / 2 + k_spaceBetweenButtons + leftRotationButton->getContentSize().width / 2, 0));
	rightRotationButton->addTouchEventListener([=](Ref*, Widget::TouchEventType i_type) {

		switch (i_type)
		{
		case cocos2d::ui::Widget::TouchEventType::BEGAN:
			break;
		case cocos2d::ui::Widget::TouchEventType::MOVED:
			rotationFunction(+0.28f);
			break;
		case cocos2d::ui::Widget::TouchEventType::ENDED:
			rotationFunction(+0.28f);
			AudioEngine::play2d("click.mp3");
			break;
		case cocos2d::ui::Widget::TouchEventType::CANCELED:
			break;
		default:
			break;
		}

	});
	m_bottomBar->addChild(rightRotationButton, BUTTON_ZORDER);


	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	auto zoomOutButton = TILButton::create("decrease_opacity.png", "pressed_decrease_opacity.png", "decrease_opacity.png", cocos2d::ui::Widget::TextureResType::PLIST);
	zoomOutButton->setPosition(rightRotationButton->getPosition() + Vec2(rightRotationButton->getContentSize().width / 2 + k_spaceBetweenButtons + zoomOutButton->getContentSize().width / 2, 0));
	zoomOutButton->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");


		if (m_rotationType == ROTATION_TYPE::SPRITE && m_sprite != nullptr)
		{
			const float k_opacityFactor = ((m_sprite->getOpacity() - 12.75f) <= 0.0f ? 0.0f: m_sprite->getOpacity() - 12.75f);
			m_sprite->setOpacity(k_opacityFactor);
		}
		else if (m_rotationType == ROTATION_TYPE::COMPASS && m_compass != nullptr)
		{
			const float k_opacityFactor = ((m_compass->getOpacity() - 12.75f) <= 0.0f ? 0.0f : m_compass->getOpacity() - 12.75f);
			m_compass->setOpacity(k_opacityFactor);

			m_compass->getChildByName("compassBorder")->setOpacity(k_opacityFactor);
			m_compass->getChildByName("yingAndYang")->setOpacity(k_opacityFactor);
		}
	});
	m_bottomBar->addChild(zoomOutButton, BUTTON_ZORDER);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	auto zoomInButton = TILButton::create("increase_opacity.png", "pressed_increase_opacity.png", "increase_opacity.png", cocos2d::ui::Widget::TextureResType::PLIST);
	zoomInButton->setPosition(leftRotationButton->getPosition() - Vec2(leftRotationButton->getContentSize().width / 2 + k_spaceBetweenButtons + zoomInButton->getContentSize().width / 2, 0));
	zoomInButton->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");

		if (m_rotationType == ROTATION_TYPE::SPRITE && m_sprite != nullptr)
		{
			const float k_opacityFactor = ((m_sprite->getOpacity() + 12.75f) >= 255.0f ? 255.0f : m_sprite->getOpacity() + 12.75f);
			m_sprite->setOpacity(k_opacityFactor);
		}
		else if (m_rotationType == ROTATION_TYPE::COMPASS && m_compass != nullptr)
		{
			const float k_opacityFactor = ((m_compass->getOpacity() + 12.75f) >= 255.0f ? 255.0f : m_compass->getOpacity() + 12.75f);
			m_compass->setOpacity(k_opacityFactor);

			m_compass->getChildByName("compassBorder")->setOpacity(k_opacityFactor);
			m_compass->getChildByName("yingAndYang")->setOpacity(k_opacityFactor);
		}
	});
	m_bottomBar->addChild(zoomInButton, BUTTON_ZORDER);


	m_compass = Sprite::createWithSpriteFrameName("compass_can.png");
	m_compass->setPosition(m_origin + m_visibleSize / 2);

	const float k_scaleFactor = (m_compass->getContentSize().width >= m_visibleSize.width ? (m_visibleSize.width / m_compass->getContentSize().width) : (m_compass->getContentSize().width / m_visibleSize.width)) - 0.1f;

	m_compass->setScale(k_scaleFactor);
    m_compass->setRotation(0);

	this->addChild(m_compass, COMPASS_ZORDER);


	auto switchRotationType = cocos2d::ui::CheckBox::create("normal_checkbox.png", "normal_checkbox.png", "checked_checkbox.png", "normal_checkbox.png", "normal_checkbox.png", cocos2d::ui::Widget::TextureResType::PLIST);
	switchRotationType->setPosition(m_origin + Vec2(k_spaceBetweenButtons + switchRotationType->getContentSize().width*0.5f, +m_bottomBar->getContentSize().height + switchRotationType->getContentSize().height*0.85f  ));
	switchRotationType->addEventListener([=](Ref*, CheckBox::EventType i_type) {
	
		AudioEngine::play2d("click.mp3");

		switch (i_type)
		{
		case cocos2d::ui::CheckBox::EventType::SELECTED:
			switchRotationType->getRendererBackground()->setVisible(false);
			break;
		case cocos2d::ui::CheckBox::EventType::UNSELECTED:
			switchRotationType->getRendererBackground()->setVisible(true);
			break;
		default:
			break;
		}

		m_rotationType = (m_rotationType == ROTATION_TYPE::SPRITE ? ROTATION_TYPE::COMPASS : ROTATION_TYPE::SPRITE);

		((Label*)this->getChildByName("rotationTypeLabel"))->stopAllActions();
		((Label*)this->getChildByName("rotationTypeLabel"))->setTextColor(m_rotationType == ROTATION_TYPE::SPRITE ? Color4B::BLACK : Color4B(83, 215, 106, 255));
		((Label*)this->getChildByName("rotationTypeLabel"))->runAction(Repeat::create(Sequence::createWithTwoActions(ScaleTo::create(0.2f, 0.8f), ScaleTo::create(0.2f, 1.0f)),2));
	});

	this->addChild(switchRotationType, BUTTON_ZORDER);


    auto lockCompass = cocos2d::ui::CheckBox::create("normal_checkbox.png", "normal_checkbox.png", "checked_checkbox.png", "normal_checkbox.png", "normal_checkbox.png", cocos2d::ui::Widget::TextureResType::PLIST);
    lockCompass->setPosition(m_origin + Vec2(k_spaceBetweenButtons + lockCompass->getContentSize().width*0.5f + 150, +m_bottomBar->getContentSize().height + lockCompass->getContentSize().height*0.85f  ));
    lockCompass->addEventListener([=](Ref*, CheckBox::EventType i_type) {

        AudioEngine::play2d("click.mp3");

        switch (i_type)
        {
            case cocos2d::ui::CheckBox::EventType::SELECTED:
                lockCompass->getRendererBackground()->setVisible(false);
                break;
            case cocos2d::ui::CheckBox::EventType::UNSELECTED:
                lockCompass->getRendererBackground()->setVisible(true);
                break;
            default:
                break;
        }
        m_lockCompass = !m_lockCompass;
        //m_rotationType = (m_rotationType == ROTATION_TYPE::SPRITE ? ROTATION_TYPE::COMPASS : ROTATION_TYPE::SPRITE);

        ((Label*)this->getChildByName("lockLabel"))->stopAllActions();
        ((Label*)this->getChildByName("lockLabel"))->setTextColor(!m_lockCompass ? Color4B::BLACK : Color4B(83, 215, 106, 255));
        ((Label*)this->getChildByName("lockLabel"))->runAction(Repeat::create(Sequence::createWithTwoActions(ScaleTo::create(0.2f, 0.8f), ScaleTo::create(0.2f, 1.0f)),2));
    });

    this->addChild(lockCompass, BUTTON_ZORDER);

	auto rotationTypeLabel = Label::createWithTTF("\x43\x68\xe1\xbb\x8d\x6e \x4c\x61 \x42\xc3\xa0\x6e", "fonts/tahoma.ttf", 14.0f);
	rotationTypeLabel->setTextColor(Color4B::BLACK);
	rotationTypeLabel->setName("rotationTypeLabel");
	//rotationTypeLabel->setPosition(switchRotationType->getPosition() + Vec2(switchRotationType->getContentSize().width*0.5f + rotationTypeLabel->getContentSize().width*0.55f, 0));
	rotationTypeLabel->setPosition(Vec2(m_origin.x + k_spaceBetweenButtons + rotationTypeLabel->getContentSize().width/2, switchRotationType->getPositionY() + switchRotationType->getContentSize().height*0.5f + rotationTypeLabel->getContentSize().height*0.5f + k_spaceBetweenButtons*0.5f));
	this->addChild(rotationTypeLabel, BUTTON_ZORDER);

    auto lockLabel = Label::createWithTTF("\x4b\x68\x6f\xc3\xa1 \x4c\x61 \x42\xc3\xa0\x6e", "fonts/tahoma.ttf", 14.0f);
    lockLabel->setTextColor(Color4B::BLACK);
    lockLabel->setName("lockLabel");
    //rotationTypeLabel->setPosition(switchRotationType->getPosition() + Vec2(switchRotationType->getContentSize().width*0.5f + rotationTypeLabel->getContentSize().width*0.55f, 0));
    lockLabel->setPosition(Vec2(m_origin.x + k_spaceBetweenButtons + lockLabel->getContentSize().width/2 + 150, lockCompass->getPositionY() + lockCompass->getContentSize().height*0.5f + lockLabel->getContentSize().height*0.5f + k_spaceBetweenButtons*0.5f));
    this->addChild(lockLabel, BUTTON_ZORDER);

	auto inforLabel = Label::createWithTTF(
		"\x48\xc6\xb0\xe1\xbb\x9b\x6e\x67 \x6e\x68\xc3\xa0 \x3a \x30 \xc4\x91\xe1\xbb\x99\n"
		"\x4e\xc4\x83\x6d \x73\x69\x6e\x68 \x3a \x5b\x54\x72\xe1\xbb\x91\x6e\x67\x5d\n"
		"\x47\x69\xe1\xbb\x9b\x69 \x74\xc3\xad\x6e\x68 \x3a \x5b\x54\x72\xe1\xbb\x91\x6e\x67\x5d\n"
		"\x43\x75\x6e\x67 \x3a \x5b\x54\x72\xe1\xbb\x91\x6e\x67\x5d ", "fonts/tahoma.ttf", 14.0f);
	inforLabel->setTextColor(Color4B::BLACK);//Color4B(160, 160, 160, 255));
	inforLabel->setAnchorPoint(Vec2(0.0f, 1.0f));
	inforLabel->setAlignment(TextHAlignment::LEFT);
	inforLabel->setName("inforLabel");
	inforLabel->setPosition(m_origin.x + 0.2f*inforLabel->getContentSize().width,m_topBar->getPosition().y - m_topBar->getContentSize().height/2 - k_spaceBetweenButtons);
	//inforLabel->setPosition(m_origin+Vec2(0.2f*inforLabel->getContentSize().width,m_visibleSize.height- 1.2f*openFilesButton->getContentSize().height));
	this->addChild(inforLabel, BUTTON_ZORDER);


	Slider* slider = Slider::create();
	slider->loadBarTexture("trans_bar_bg.png", cocos2d::ui::Widget::TextureResType::PLIST);
	slider->loadSlidBallTextures("trans_bar_circle.png", "trans_bar_circle.png", "", cocos2d::ui::Widget::TextureResType::PLIST);
	slider->setName("slider");
	slider->loadProgressBarTexture("trans_bar_color.png", cocos2d::ui::Widget::TextureResType::PLIST);
	slider->setMaxPercent(100);
	slider->setPercent(100);
	slider->setPosition(Vec2(m_origin.x + m_visibleSize.width - slider->getContentSize().width*0.5f - k_spaceBetweenButtons, switchRotationType->getPositionY()));
	slider->addEventListener([=](Ref *pSender, Slider::EventType type) {
		if (type == Slider::EventType::ON_PERCENTAGE_CHANGED)
		{
			Slider* slider = dynamic_cast<Slider*>(pSender);
			int percent = slider->getPercent();
			int maxPercent = slider->getMaxPercent();

			if (m_rotationType == ROTATION_TYPE::SPRITE && m_sprite != nullptr)
			{
				m_sprite->setScale(percent*0.01f);
			}
			else if (m_rotationType == ROTATION_TYPE::COMPASS && m_compass != nullptr)
			{
				m_compass->setScale(percent*0.01f);
			}
		}
	});
	this->addChild(slider,BUTTON_ZORDER);

	auto zoomTitleLabel = Label::createWithTTF("\x54\x68\x75 \x50\x68\xc3\xb3\x6e\x67", "fonts/tahoma.ttf", 14.0f);
	zoomTitleLabel->setTextColor(Color4B::BLACK);
	zoomTitleLabel->setName("zoomTitleLabel");
	zoomTitleLabel->setPosition(m_origin.x +m_visibleSize.width- zoomTitleLabel->getContentSize().width*0.5f - k_spaceBetweenButtons, rotationTypeLabel->getPositionY());
	this->addChild(zoomTitleLabel, BUTTON_ZORDER);

	{

		auto redItem = Sprite::createWithSpriteFrameName("red_item.png");
		redItem->setName("redItem");
		redItem->setAnchorPoint(Vec2(0.5f, 0.0f));
		redItem->setOpacity(0.5f*255.0f);
		redItem->setPosition(508.5f, 508.5f);
		redItem->setBlendFunc({ GL_DST_COLOR,GL_ONE_MINUS_SRC_ALPHA });
		m_compass->addChild(redItem,-1);

		auto compassBorder = Sprite::createWithSpriteFrameName("compass_border.png");
		compassBorder->setName("compassBorder");
		compassBorder->setAnchorPoint(Vec2(0.5f, 0.5f));
		compassBorder->setPosition(508.5f, 508.5f);
		m_compass->addChild(compassBorder);


		auto lucSat = Sprite::createWithSpriteFrameName("luc_sat.png");
		auto thienY = Sprite::createWithSpriteFrameName("thien_y.png");
		auto nguQui = Sprite::createWithSpriteFrameName("ngu_qui.png");
		auto hoaHai = Sprite::createWithSpriteFrameName("hoa_hai.png");
		auto tuyetMenh = Sprite::createWithSpriteFrameName("tuyet_mang.png");
		auto phuocDuc = Sprite::createWithSpriteFrameName("phuoc_duc.png");
		auto sanhKhi = Sprite::createWithSpriteFrameName("sanh_khi.png");
		auto phucVi = Sprite::createWithSpriteFrameName("phuc_vi.png");

		lucSat->setName("lucSat");
		thienY->setName("thienY");
		nguQui->setName("nguQui");
		hoaHai->setName("hoaHai");
		tuyetMenh->setName("tuyetMenh");
		phuocDuc->setName("phuocDuc");
		sanhKhi->setName("sanhKhi");
		phucVi->setName("phucVi");

		lucSat->setAnchorPoint(Vec2(0.5f, 0.0f));
		thienY->setAnchorPoint(Vec2(0.5f, 0.0f));
		nguQui->setAnchorPoint(Vec2(0.5f, 0.0f));
		hoaHai->setAnchorPoint(Vec2(0.5f, 0.0f));
		tuyetMenh->setAnchorPoint(Vec2(0.5f, 0.0f));
		phuocDuc->setAnchorPoint(Vec2(0.5f, 0.0f));
		sanhKhi->setAnchorPoint(Vec2(0.5f, 0.0f));
		phucVi->setAnchorPoint(Vec2(0.5f, 0.0f));

		lucSat->setPosition(508.5f, 508.5f);
		thienY->setPosition(508.5f, 508.5f);
		nguQui->setPosition(508.5f, 508.5f);
		hoaHai->setPosition(508.5f, 508.5f);
		tuyetMenh->setPosition(508.5f, 508.5f);
		phuocDuc->setPosition(508.5f, 508.5f);
		sanhKhi->setPosition(508.5f, 508.5f);
		phucVi->setPosition(508.5f, 508.5f);

		m_compass->addChild(lucSat);
		m_compass->addChild(thienY);
		m_compass->addChild(nguQui);
		m_compass->addChild(hoaHai);
		m_compass->addChild(tuyetMenh);
		m_compass->addChild(phuocDuc);
		m_compass->addChild(sanhKhi);
		m_compass->addChild(phucVi);

		for (size_t i = 0; i < 4; i++)
		{
			auto yellowItem = Sprite::createWithSpriteFrameName("yellow_item.png");
			yellowItem->setAnchorPoint(Vec2(0.5f, 0.0f));
			yellowItem->setPosition(508.5f, 508.5f);
			yellowItem->setName(StringUtils::format("yellowItem%02d", i + 1));
			yellowItem->setBlendFunc({ GL_DST_COLOR,GL_ONE_MINUS_SRC_ALPHA });

			//if (i == 0)
			//	yellowItem->runAction(RepeatForever::create(Sequence::createWithTwoActions(CallFuncN::create([=](Node* psender) {
			//	static int i = 0;
			//	static int j = 0;
			//	cocos2d::log("i=%d,j=%d", i, j);
			//	std::vector<int> xx = { GL_ZERO, GL_ONE, GL_SRC_COLOR, GL_DST_COLOR, GL_ONE_MINUS_SRC_COLOR, GL_ONE_MINUS_DST_COLOR, GL_SRC_ALPHA, GL_DST_ALPHA, GL_ONE_MINUS_SRC_ALPHA, GL_ONE_MINUS_DST_ALPHA };
			//	BlendFunc bl = { xx.at(i), xx.at(j) };
			//	j++;
			//	if (j == 10) //51 57
			//	{
			//		j = 0;//24 28 37 38 41 44 47 58
			//		i++;
			//	}
			//	yellowItem->setBlendFunc(bl);
			//}), DelayTime::create(2))));
			m_compass->addChild(yellowItem, -1);
		}

		lucSat->setRotation(0);
		thienY->setRotation(45); 
		nguQui->setRotation(90);
		hoaHai->setRotation(225);
		tuyetMenh->setRotation(180);
		phuocDuc->setRotation(135);
		sanhKhi->setRotation(270);
		phucVi->setRotation(315);
		redItem->setRotation(315);
		compassBorder->setRotation(0);


		m_compass->getChildByName("yellowItem01")->setRotation(thienY->getRotation());
		m_compass->getChildByName("yellowItem02")->setRotation(phuocDuc->getRotation());
		m_compass->getChildByName("yellowItem03")->setRotation(sanhKhi->getRotation());
		m_compass->getChildByName("yellowItem04")->setRotation(phucVi->getRotation());
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	m_oxyArrow = Sprite::createWithSpriteFrameName("center_point.png");
	m_oxyArrow->setOpacity(0);
	m_oxyArrow->setPosition(m_origin + m_visibleSize / 2);
	this->addChild(m_oxyArrow, ARROW_ZORDER);

	{
		auto line = LayerColor::create(Color4B::BLACK);//Color4B(243, 243, 243,255)
		line->ignoreAnchorPointForPosition(false);
		line->setAnchorPoint(Vec2(0.5f, 0.5f));
		line->setContentSize(Size(m_compass->getContentSize().width*m_compass->getScale(), 2.0f));
		line->setPosition(m_oxyArrow->getContentSize() / 2);
		line->setRotation(-90.0f);
		m_oxyArrow->addChild(line);

		auto arrowHead = Sprite::createWithSpriteFrameName("black_arrow_head.png");
		arrowHead->setPosition(line->getContentSize().width - arrowHead->getContentSize().width / 2, line->getContentSize().height / 2);
		line->addChild(arrowHead);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	m_compassArrow = Sprite::createWithSpriteFrameName("center_point.png");
	m_compassArrow->setOpacity(0);
	m_compassArrow->setPosition(m_origin + m_visibleSize / 2);
	m_compassArrow->setRotation(0);
	this->addChild(m_compassArrow, ARROW_ZORDER);

	{
		auto line = LayerColor::create(Color4B::RED);//Color4B(243, 243, 243,255)
		line->ignoreAnchorPointForPosition(false);
		line->setAnchorPoint(Vec2(0.5f, 0.5f));
		line->setContentSize(Size(m_compass->getContentSize().width*m_compass->getScale(), 2.0f));
		line->setPosition(m_compassArrow->getContentSize() / 2);
		line->setRotation(-90.0f);
		m_compassArrow->addChild(line);

		auto arrowHead = Sprite::createWithSpriteFrameName("red_arrow_head.png");
		arrowHead->setPosition(line->getContentSize().width - arrowHead->getContentSize().width / 2, line->getContentSize().height / 2);
		line->addChild(arrowHead);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const float k_smallArrowSize = 50.0f;

	m_smallOxyArrow = Sprite::createWithSpriteFrameName("center_point.png");
	m_smallOxyArrow->setOpacity(0);
	m_smallOxyArrow->setPosition(m_origin.x + m_visibleSize.width - k_smallArrowSize, m_topBar->getPosition().y - m_topBar->getContentSize().height / 2 - m_smallOxyArrow->getContentSize().height/2 - k_spaceBetweenButtons);
	this->addChild(m_smallOxyArrow, ARROW_ZORDER);

	{
		auto line = LayerColor::create(Color4B::BLACK);//Color4B(243, 243, 243,255)
		line->ignoreAnchorPointForPosition(false);
		line->setAnchorPoint(Vec2(0.5f, 0.5f));
		line->setContentSize(Size(k_smallArrowSize, 2.0f));
		line->setPosition(m_smallOxyArrow->getContentSize() / 2);
		line->setRotation(-90.0f);
		m_smallOxyArrow->addChild(line);

		auto arrowHead = Sprite::createWithSpriteFrameName("black_arrow_head.png");
		arrowHead->setScale(0.5f);
		arrowHead->setPosition(line->getContentSize().width - arrowHead->getContentSize().width / 2, line->getContentSize().height / 2);
		line->addChild(arrowHead);
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	m_smallCompassArrow = Sprite::createWithSpriteFrameName("center_point.png");
	m_smallCompassArrow->setOpacity(0);
	m_smallCompassArrow->setName("smallCompassArrow");
	m_smallCompassArrow->setRotation(0.0f);
	m_smallCompassArrow->setPosition(m_origin.x + m_visibleSize.width - k_smallArrowSize, m_topBar->getPosition().y - m_topBar->getContentSize().height / 2 - m_smallCompassArrow->getContentSize().height / 2 - k_spaceBetweenButtons);
	this->addChild(m_smallCompassArrow, ARROW_ZORDER);

	{
		auto line = LayerColor::create(Color4B::RED);
		line->ignoreAnchorPointForPosition(false);
		line->setAnchorPoint(Vec2(0.5f, 0.5f));
		line->setContentSize(Size(k_smallArrowSize, 2.0f));
		line->setPosition(m_smallCompassArrow->getContentSize() / 2);
		line->setRotation(-90.0f);
		m_smallCompassArrow->addChild(line);

		auto arrowHead = Sprite::createWithSpriteFrameName("red_arrow_head.png");
		arrowHead->setScale(0.5f);
		arrowHead->setPosition(line->getContentSize().width - arrowHead->getContentSize().width / 2, line->getContentSize().height / 2);
		line->addChild(arrowHead);
	}


	auto yingAndYang = Sprite::createWithSpriteFrameName("ying_and_yang.png");
	yingAndYang->setName("yingAndYang");
	yingAndYang->setPosition(m_compass->getContentSize()/2);
	m_compass->addChild(yingAndYang,500);


	/*for (size_t i = 1864; i <= 2043; i++)
	{
		MainScene::testCalculateCompassTypeBasedOnAge(i, true);
		MainScene::testCalculateCompassTypeBasedOnAge(i, false);
		cocos2d::log("\n");
	}*/

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//auto arrow = Sprite::createWithSpriteFrameName("arrow.png");
	//arrow->setAnchorPoint(Vec2(0.5f, 0));
	//arrow->setPosition(centerPoint->getContentSize() / 2);
	//centerPoint->addChild(arrow,-1);

	//calculateCompassTypeBasedOnAge();

    return true;
}

void MainScene::onOpenFilesClick(cocos2d::Ref * i_sender)
{
	AudioEngine::play2d("click.mp3");

#if ((CC_TARGET_PLATFORM ==CC_PLATFORM_ANDROID)||(CC_TARGET_PLATFORM ==CC_PLATFORM_IOS))
	ImagePicker::getInstance()->pickImage(this);
#else
	if (m_sprite != nullptr)
	{
		m_sprite->removeAllChildrenWithCleanup(true);
		m_sprite->setSpriteFrame(Sprite::create("hd_sample1.png")->getSpriteFrame());
		const float k_scaleFactor = (m_sprite->getContentSize().width >= m_visibleSize.width ? (m_visibleSize.width / m_sprite->getContentSize().width) : (m_sprite->getContentSize().width / m_visibleSize.width)) - 0.1f;
		m_sprite->setAnchorPoint(Vec2(0.5f, 0.5f));
		m_sprite->setPosition(m_origin + m_visibleSize / 2);
		m_sprite->setRotation(0);
		m_sprite->setScale(k_scaleFactor);
		return;
	}

	m_sprite = Sprite::create("hd_sample1.png");

	const float k_scaleFactor = (m_sprite->getContentSize().width >= m_visibleSize.width ? (m_visibleSize.width / m_sprite->getContentSize().width) : (m_sprite->getContentSize().width / m_visibleSize.width)) - 0.1f;

	m_sprite->setScale(k_scaleFactor);
	m_sprite->setPosition(m_origin + m_visibleSize / 2);
	this->addChild(m_sprite,IMAGE_ZORDER);
#endif
}

void MainScene::didFinishPickingWithResult(cocos2d::Texture2D* result)
{
	if (m_sprite != nullptr)
	{
		m_sprite->removeAllChildrenWithCleanup(true);
		m_sprite->setSpriteFrame(Sprite::createWithTexture(result)->getSpriteFrame());
		const float k_scaleFactor = (m_sprite->getContentSize().width >= m_visibleSize.width ? (m_visibleSize.width / m_sprite->getContentSize().width) : (m_sprite->getContentSize().width / m_visibleSize.width)) - 0.1f;
		m_sprite->setAnchorPoint(Vec2(0.5f, 0.5f));
		m_sprite->setPosition(m_origin + m_visibleSize / 2);
		m_sprite->setRotation(0);
		m_sprite->setScale(k_scaleFactor);
		return;
	}

	m_sprite = Sprite::createWithTexture(result);

	const float k_scaleFactor = (m_sprite->getContentSize().width >= m_visibleSize.width ? (m_visibleSize.width / m_sprite->getContentSize().width) : (m_sprite->getContentSize().width / m_visibleSize.width)) - 0.1f;

	m_sprite->setScale(k_scaleFactor);
	m_sprite->setPosition(m_origin + m_visibleSize / 2);
	this->addChild(m_sprite);
}

void MainScene::setCurrentSprite(cocos2d::Sprite * i_newSprite, cocos2d::Vec2 i_pos)
{
	if (i_newSprite == nullptr)
	{
		return;
	}

	this->m_sprite->setScale(i_newSprite->getScale());
	this->m_sprite->removeAllChildrenWithCleanup(true);

	auto spr = Sprite::createWithSpriteFrameName("touch_point.png");
	spr->setPosition(i_pos);
	m_sprite->addChild(spr);

	float deltaX = this->m_sprite->getContentSize().width / 2 - i_pos.x;
	float deltaY = this->m_sprite->getContentSize().height / 2 - i_pos.y;

	float x = m_origin.x + m_visibleSize.width / 2 + deltaX*m_sprite->getScale();
	float y = m_origin.y + m_visibleSize.height / 2 + deltaY * m_sprite->getScale();

	this->m_sprite->setAnchorPoint(Vec2(i_pos.x / this->m_sprite->getContentSize().width, i_pos.y / this->m_sprite->getContentSize().height));
	this->m_sprite->setPosition(m_origin +m_visibleSize/2);

	const float k_scaleFactor = (m_sprite->getContentSize().width >= m_visibleSize.width ? (m_visibleSize.width / m_sprite->getContentSize().width) : (m_sprite->getContentSize().width / m_visibleSize.width)) - 0.1f;
	m_sprite->setScale(k_scaleFactor);
}

void MainScene::calculateCompassTypeBasedOnAge()
{
	COMPASS_TYPE		compassType = COMPASS_TYPE::CAN;

	int		k_yearOfBirth = UserDefault::getInstance()->getIntegerForKey("yearOfBirth", -1);
	bool	k_isMale = UserDefault::getInstance()->getBoolForKey("isMale", false);

	if (k_yearOfBirth < 1000 || k_yearOfBirth > 5000)
	{
		auto label = Label::createWithTTF("\x4e\xc4\x83\x6d \x73\x69\x6e\x68 \x6b\x68\xc3\xb4\x6e\x67 \x68\xe1\xbb\xa3\x70 \x6c\xe1\xbb\x87 \x21", "fonts/tahomabd.ttf", 14.0f);
		label->setTextColor(Color4B::WHITE);
		label->setPosition(m_origin + Vec2(m_visibleSize.width / 2, m_visibleSize.height - 5.0f*label->getContentSize().height));
		label->runAction(Sequence::createWithTwoActions(Spawn::createWithTwoActions(FadeOut::create(0.5f), MoveBy::create(0.5f, Vec2(0, 2.0f*label->getContentSize().height))), RemoveSelf::create(true)));
		this->addChild(label, NOTIFICATION_ZORDER);
		return;
	}

	std::string  yearStr = std::to_string(k_yearOfBirth);

	int sum = 0;

	for (int i = 0; i < yearStr.size(); i++)
	{
		sum += (yearStr[i] - '0');
	}

	while (sum >= 10)
	{
		std::string sumStr = std::to_string(sum);

		int newSum = 0;
		for (int i = 0; i < sumStr.size(); i++)
		{
			newSum += (sumStr[i] - '0');
		}

		sum = newSum;
	}

	int result = -1;

	if (k_isMale)
	{
		result = 11 - sum;
	}
	else
	{
		result = sum + 4;
	}

	while (result >= 10)
	{
		std::string sumStr = std::to_string(result);

		int newSum = 0;
		for (int i = 0; i < sumStr.size(); i++)
		{
			newSum += (sumStr[i] - '0');
		}
		result = newSum;
	}

	//////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////
	auto redItem = m_compass->getChildByName("redItem");

	if (result == 9)
	{
		compassType = COMPASS_TYPE::DOAI;
		m_cung = "\xc4\x90\x6f\xc3\xa0\x69";
	}
	else if (result == 8)
	{
		compassType = COMPASS_TYPE::CAAN;
		m_cung = "\x43\xe1\xba\xa5\x6e";
	}
	else if (result == 7)
	{
		compassType = COMPASS_TYPE::LY;
		m_cung = "Ly";

	}
	else if (result == 6)
	{
		compassType = COMPASS_TYPE::CAN;
		m_cung = "\x43\xc3\xa0\x6e";
	}
	else if (result == 5)
	{
		compassType = k_isMale ? COMPASS_TYPE::KHON : COMPASS_TYPE::CAAN;
		m_cung = k_isMale ? "\x4b\x68\xc3\xb4\x6e" : "\x43\xe1\xba\xa5\x6e";
		
	}
	else if (result == 4)
	{
		compassType = COMPASS_TYPE::TON; 
		m_cung = "\x54\xe1\xbb\x91\x6e";
	}
	else if (result == 3)
	{
		compassType = COMPASS_TYPE::CHAN;
		m_cung = "\x43\x68\xe1\xba\xa5\x6e";
	}
	else if (result == 2)
	{
		compassType = COMPASS_TYPE::KHON;
		m_cung = "\x4b\x68\xc3\xb4\x6e";
	}
	else
	{
		compassType = COMPASS_TYPE::KHAM;
		m_cung = "\x4b\x68\xe1\xba\xa3\x6d";
	}

	auto lucSat		= m_compass->getChildByName("lucSat");
	auto thienY		= m_compass->getChildByName("thienY");
	auto nguQui		= m_compass->getChildByName("nguQui");
	auto hoaHai		= m_compass->getChildByName("hoaHai");
	auto tuyetMenh	= m_compass->getChildByName("tuyetMenh");
	auto phuocDuc	= m_compass->getChildByName("phuocDuc");
	auto sanhKhi	= m_compass->getChildByName("sanhKhi");
	auto phucVi		= m_compass->getChildByName("phucVi");

	auto compassBorder = m_compass->getChildByName("compassBorder");

	switch (compassType)
	{
	case MainScene::CAN:
		lucSat->setRotation(0);
		thienY->setRotation(45); 
		nguQui->setRotation(90);
		hoaHai->setRotation(225);//
		tuyetMenh->setRotation(180);
		phuocDuc->setRotation(135);//
		sanhKhi->setRotation(270);// 
		phucVi->setRotation(315);//
		redItem->setRotation(315);
		compassBorder->setRotation(0);
		break;
	case MainScene::KHAM:
		lucSat->setRotation(315);//7
		thienY->setRotation(90);//2 
		nguQui->setRotation(45);//1
		hoaHai->setRotation(270);//6
		tuyetMenh->setRotation(135);//5 ->225
		phuocDuc->setRotation(180);//4
		sanhKhi->setRotation(225);//3 ->135
		phucVi->setRotation(0);//0 
		redItem->setRotation(0);
		compassBorder->setRotation(180);
		break;
	case MainScene::CAAN:
		lucSat->setRotation(90);//2
		thienY->setRotation(315);//7
		nguQui->setRotation(0);//0
		hoaHai->setRotation(180);//4
		tuyetMenh->setRotation(225);//3->135
		phuocDuc->setRotation(270);//6
		sanhKhi->setRotation(135);//5->225
		phucVi->setRotation(45);//1 
		redItem->setRotation(45);
		compassBorder->setRotation(-90);
		break;
	case MainScene::CHAN:
		lucSat->setRotation(45);//1
		thienY->setRotation(0);//0
		nguQui->setRotation(315);//7
		hoaHai->setRotation(135);//5 ->225
		tuyetMenh->setRotation(270);//6
		phuocDuc->setRotation(225);//3 ->135
		sanhKhi->setRotation(180);//4
		phucVi->setRotation(90);//2
		redItem->setRotation(90);
		compassBorder->setRotation(90);
		break;
	case MainScene::TON:
		lucSat->setRotation(270);
		thienY->setRotation(180);
		nguQui->setRotation(135);
		hoaHai->setRotation(315);
		tuyetMenh->setRotation(45);
		phuocDuc->setRotation(90);
		sanhKhi->setRotation(0);
		phucVi->setRotation(225);
		redItem->setRotation(135);
		compassBorder->setRotation(-90);
		break;
	case MainScene::LY:
		lucSat->setRotation(135);
		thienY->setRotation(225);
		nguQui->setRotation(270);
		hoaHai->setRotation(45);
		tuyetMenh->setRotation(315);
		phuocDuc->setRotation(0);
		sanhKhi->setRotation(90);
		phucVi->setRotation(180);
		redItem->setRotation(180);
		compassBorder->setRotation(180);
		break;
	case MainScene::KHON:
		lucSat->setRotation(180);
		thienY->setRotation(270);
		nguQui->setRotation(225);
		hoaHai->setRotation(90);
		tuyetMenh->setRotation(0);
		phuocDuc->setRotation(315);
		sanhKhi->setRotation(45);
		phucVi->setRotation(135);
		redItem->setRotation(225);
		compassBorder->setRotation(-90);
		break;
	case MainScene::DOAI:
		lucSat->setRotation(225);
		thienY->setRotation(135);
		nguQui->setRotation(180);
		hoaHai->setRotation(0);
		tuyetMenh->setRotation(90);
		phuocDuc->setRotation(45);
		sanhKhi->setRotation(315);
		phucVi->setRotation(270);
		redItem->setRotation(270);
		compassBorder->setRotation(180);
		break;
	default:
		break;
	}
	
	redItem->runAction(Repeat::create(Sequence::createWithTwoActions(FadeTo::create(0.08f, 0.2f*255.0f), FadeTo::create(0.08f, 0.5f*255.0f)), 3));
	
	thienY->runAction(Repeat::create(Sequence::createWithTwoActions(FadeTo::create(0.08f, 0.2f*255.0f), FadeTo::create(0.08f, 1.0f*255.0f)), 3));
	phuocDuc->runAction(Repeat::create(Sequence::createWithTwoActions(FadeTo::create(0.08f, 0.2f*255.0f), FadeTo::create(0.08f, 1.0f*255.0f)), 3));
	sanhKhi->runAction(Repeat::create(Sequence::createWithTwoActions(FadeTo::create(0.08f, 0.2f*255.0f), FadeTo::create(0.08f, 1.0f*255.0f)), 3));
	phucVi->runAction(Repeat::create(Sequence::createWithTwoActions(FadeTo::create(0.08f, 0.2f*255.0f), FadeTo::create(0.08f, 1.0f*255.0f)), 3));

	m_compass->getChildByName("yellowItem01")->setRotation(thienY->getRotation());
	m_compass->getChildByName("yellowItem02")->setRotation(phuocDuc->getRotation());
	m_compass->getChildByName("yellowItem03")->setRotation(sanhKhi->getRotation());
	m_compass->getChildByName("yellowItem04")->setRotation(phucVi->getRotation());

	MainScene::updateInforLabel();
}

void MainScene::testCalculateCompassTypeBasedOnAge(int i_year, bool i_isMale)
{
	COMPASS_TYPE		compassType = COMPASS_TYPE::CAN;

	int		k_yearOfBirth = i_year;
	bool	k_isMale = i_isMale;

	if (k_yearOfBirth < 1000 || k_yearOfBirth > 5000)
	{
		auto label = Label::createWithTTF("\x4e\xc4\x83\x6d \x73\x69\x6e\x68 \x6b\x68\xc3\xb4\x6e\x67 \x68\xe1\xbb\xa3\x70 \x6c\xe1\xbb\x87 \x21", "fonts/tahomabd.ttf", 14.0f);
		label->setTextColor(Color4B::WHITE);
		label->setPosition(m_origin + Vec2(m_visibleSize.width / 2, m_visibleSize.height - 5.0f*label->getContentSize().height));
		label->runAction(Sequence::createWithTwoActions(Spawn::createWithTwoActions(FadeOut::create(0.5f), MoveBy::create(0.5f, Vec2(0, 2.0f*label->getContentSize().height))), RemoveSelf::create(true)));
		this->addChild(label, NOTIFICATION_ZORDER);
		return;
	}

	int result = -1;

	///////////////////////////////////////////////////////////////////////////////
	//cach tinh doi voi nam sinh <= 1999
	///////////////////////////////////////////////////////////////////////////////

	if (k_yearOfBirth <= 1999)
	{
		std::string strYearOfBirth = std::to_string(k_yearOfBirth);

		int number1 = strYearOfBirth[strYearOfBirth.size() - 1] - '0';
		int number2 = strYearOfBirth[strYearOfBirth.size() - 2] - '0';

		if (number1 + number2 >= 10)
		{
			std::string newStr = std::to_string(number1 + number2);
			number1 = newStr[newStr.size() - 1] - '0';
			number2 = newStr[newStr.size() - 2] - '0';

		}

		if (!k_isMale) //female
		{
			if ((15 - (10 - (number1 + number2))) >= 10)
			{
				std::string newStr = std::to_string(15 - (10 - (number1 + number2)));
				number1 = newStr[newStr.size() - 1] - '0';
				number2 = newStr[newStr.size() - 2] - '0';

				result = number1 + number2;
			}
			else
			{
				result = (15 - (10 - (number1 + number2)));
			}
		}
		else //male
		{
			result = (10 - (number1 + number2));
		}
	}
	else
	{
		result = k_isMale ? (9 - ((k_yearOfBirth - 2000) % 9)) : ((k_yearOfBirth - 1995 + 1) % 9);
	}

	/////////////////////////////////////////////////////////////
	auto redItem = m_compass->getChildByName("redItem");

	if (result == 9)
	{
		compassType = COMPASS_TYPE::DOAI;
		m_cung = "\xc4\x90\x6f\xc3\xa0\x69";
	}
	else if (result == 8)
	{
		compassType = COMPASS_TYPE::CAAN;
		m_cung = "\x43\xe1\xba\xa5\x6e";
	}
	else if (result == 7)
	{
		compassType = COMPASS_TYPE::LY;
		m_cung = "Ly";

	}
	else if (result == 6)
	{
		compassType = COMPASS_TYPE::CAN;
		m_cung = "\x43\xc3\xa0\x6e";
	}
	else if (result == 5)
	{
		compassType = COMPASS_TYPE::KHON;
		m_cung = "\x4b\x68\xc3\xb4\x6e";
	}
	else if (result == 4)
	{
		compassType = COMPASS_TYPE::TON;
		m_cung = "\x54\xe1\xbb\x91\x6e";
	}
	else if (result == 3)
	{
		compassType = COMPASS_TYPE::CHAN;
		m_cung = "\x43\x68\xe1\xba\xa5\x6e";
	}
	else if (result == 2)
	{
		compassType = k_isMale ? COMPASS_TYPE::KHON : COMPASS_TYPE::CAAN;
		m_cung = k_isMale ? "\x4b\x68\xc3\xb4\x6e" : "\x43\xe1\xba\xa5\x6e";
	}
	else
	{
		compassType = COMPASS_TYPE::KHAM;
		m_cung = "\x4b\x68\xe1\xba\xa3\x6d";
	}

	cocos2d::log("%d|%s => %s \n", k_yearOfBirth, k_isMale ? "Nam" : "Nu",m_cung.c_str());
}

void MainScene::updateInforLabel()
{
    int oxyAngle = m_oxyArrow !=nullptr? m_oxyArrow->getRotation():0;
	int sprAngle = m_sprite!=nullptr? m_sprite->getRotation():0;
    sprAngle = sprAngle - oxyAngle;
    if(sprAngle > int(sprAngle)+ 0.4)
        sprAngle = (int)sprAngle + 1;
	//sprAngle = 360 - sprAngle;
	sprAngle =((int)sprAngle % 360) + (sprAngle < 0 ? 360 : 0);

	int  compassAngle = m_compass != nullptr ? m_compassArrow->getRotation() : 0;
    compassAngle = compassAngle - oxyAngle;
	//compassAngle = 360 - compassAngle;
    if(compassAngle > int(compassAngle)+ 0.4)
        compassAngle = (int)compassAngle + 1;
	compassAngle =((int)compassAngle % 360) + (compassAngle < 0 ? 360 : 0);

	int		k_yearOfBirth	= UserDefault::getInstance()->getIntegerForKey("yearOfBirth", -1);
	bool	k_isMale		= UserDefault::getInstance()->getBoolForKey("isMale", false);

	std::string str = StringUtils::format(
    "\x48\xc6\xb0\xe1\xbb\x9b\x6e\x67 \x6e\x68\xc3\xa0 %d \xc4\x91\xe1\xbb\x99"
		"\n\x4e\xc4\x83\x6d \x73\x69\x6e\x68\x3a %d \n\x47\x69\xe1\xbb\x9b\x69 \x74\xc3\xad\x6e\x68\x3a %s \nCung : %s ", compassAngle, k_yearOfBirth,k_isMale?"Nam":"\x4e\xe1\xbb\xaf",m_cung.c_str());

	Label* inforLabel = (Label*)this->getChildByName("inforLabel");
	inforLabel->setString(str);
}

void MainScene::setRotaionHuongNha(float i_rot) {
   // if(m_lockCompass)
    //{
        m_compass->setRotation(0);
        m_oxyArrow->setRotation(0);
    //}
    m_compassArrow->setRotation(i_rot);
    m_smallCompassArrow->setRotation(i_rot);
    MainScene::updateInforLabel();
}

void MainScene::saveToFileCallback(cocos2d::RenderTexture * texture, const std::string & string)
{
	if (texture != nullptr)
	{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
		cocos2d::JniMethodInfo methodInfo;

		if (!JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/cpp/AppActivity", "screenShot", "()V")) 
		{
			return;
		}

		methodInfo.env->CallStaticVoidMethod(methodInfo.classID, methodInfo.methodID);
		methodInfo.env->DeleteLocalRef(methodInfo.classID);
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
		
		// now , we have the captured image with name "phongthuy.png" in WriablePath folder of app ! It's hidden folder ! 
		// but user want to see the image in gallery ios !
        //FileUtils::getInstance()->getWritablePath()
		// so we must to save this image with path = [ FileUtils::getInstance()->getWritablePath()+"/phongthuy.png" ] to gallery IOS ? How to do that ?
		// It's easy !
		// please follow this tutorial as an example : https://stackoverflow.com/questions/24078695/cocos2dx-save-image-in-to-gallery-android
		// wirte your code here !
		//
        std::string path = FileUtils::getInstance()->getWritablePath()+"/phongthuy.png";
		//BridgeClass::shared()->saveTOAlbum();
        ImagePicker::getInstance()->saveImage(path.c_str());
#endif
	}

}
