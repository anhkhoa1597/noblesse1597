#include "PopUpLayer.h"
#include "SimpleAudioEngine.h"
#include "ui/CocosGUI.h"
#include "TILButton.h"
#include "MainScene.h"

#include "audio/include/AudioEngine.h"
using namespace cocos2d::experimental;

USING_NS_CC;

AgeGatheringPopUpLayer * AgeGatheringPopUpLayer::createPopUpLayer(MainScene* i_mainScene)
{
	AgeGatheringPopUpLayer *ret = new (std::nothrow) AgeGatheringPopUpLayer();

	if (ret && ret->init(i_mainScene))
	{
		ret->autorelease();
		return ret;
	}
	CC_SAFE_DELETE(ret);

	return nullptr;
}

bool AgeGatheringPopUpLayer::init(MainScene* i_mainScene)
{
	if (!BaseLayer::initWithColor(Color4B::BLACK))
	{
		return false;
	}

	this->setOpacity(255.0f*0.1f);

	auto background = Sprite::createWithSpriteFrameName("popup_bg.png");
	background->setPosition(m_origin + m_visibleSize / 2);
	background->runAction(Repeat::create(Sequence::createWithTwoActions(ScaleTo::create(0.08f, 0.9f), ScaleTo::create(0.08f, 1.0f)), 2));
	this->addChild(background);

	auto exitButton = TILButton::create("exit_btn.png", "exit_btn.png", "exit_btn.png", cocos2d::ui::Widget::TextureResType::PLIST);
	exitButton->setPosition(Vec2(395.5f, background->getContentSize().height - 0.0f));
	exitButton->setPressedActionEnabled(true);
	exitButton->addClickEventListener([=](cocos2d::Ref*) {
	
		AudioEngine::play2d("click.mp3");

		this->removeFromParentAndCleanup(true);
	
	});
	background->addChild(exitButton);

	auto okButton = TILButton::create("popup_ok_btn.png", "popup_ok_btn.png", "popup_ok_btn.png", cocos2d::ui::Widget::TextureResType::PLIST);
	okButton->setPosition(Vec2(327.0f, background->getContentSize().height - 156.5f));
	okButton->setPressedActionEnabled(true);

	background->addChild(okButton);
	
	auto textFieldBg = Sprite::createWithSpriteFrameName("edit_box.png");
	textFieldBg->setPosition(Vec2(235.0f, 232.0f - 50.0f));
	background->addChild(textFieldBg);

	//Nhap tuoi vao day !
	TextField* nameEditTextField = TextField::create("\x4e\x68\xe1\xba\xad\x70 \x6e\xc4\x83\x6d \x73\x69\x6e\x68 \x76\xc3\xa0\x6f \xc4\x91\xc3\xa2\x79 \x21", "fonts/SVN-Nexa Bold.ttf", 18.0f);
	nameEditTextField->setTextColor(Color4B::BLACK);
	nameEditTextField->setPosition(Vec2(235.0f, 232.0f - 50.0f));
	nameEditTextField->setName("nameEditTextField");
	nameEditTextField->setMaxLengthEnabled(true);
	nameEditTextField->setMaxLength(5);
	nameEditTextField->addEventListener(CC_CALLBACK_2(AgeGatheringPopUpLayer::onNameEditTextFieldClick, this));
	background->addChild(nameEditTextField);

	auto textFieldBg1 = Sprite::createWithSpriteFrameName("edit_box.png");
	textFieldBg1->setPosition(Vec2(235.0f, 232.0f - 100.5f));
	background->addChild(textFieldBg1);
	//Nhap tuoi vao day !
	TextField* huongEditTextField = TextField::create("\x4e\x68\xe1\xba\xad\x70 \x48\xc6\xb0\xe1\xbb\x9b\x6e\x67 \x4e\x68\xc3\xa0", "fonts/SVN-Nexa Bold.ttf", 18.0f);
	huongEditTextField->setTextColor(Color4B::BLACK);
	huongEditTextField->setPosition(Vec2(235.0f, 232.0f - 100.5f));
	huongEditTextField->setName("huongEditTextField");
	huongEditTextField->setMaxLengthEnabled(true);
	huongEditTextField->setMaxLength(5);
	huongEditTextField->addEventListener(CC_CALLBACK_2(AgeGatheringPopUpLayer::onHuongEditTextFieldClick, this));
	background->addChild(huongEditTextField);

	auto maleCheckBox = cocos2d::ui::CheckBox::create("normal_checkbox2.png", "normal_checkbox2.png", "checked_checkbox2.png", "normal_checkbox2.png", "normal_checkbox2.png", cocos2d::ui::Widget::TextureResType::PLIST);
	maleCheckBox->setPosition(Vec2(117.0f, okButton->getPositionY()));
	maleCheckBox->setName("maleCheckBox");
	maleCheckBox->setSelected(true);
	maleCheckBox->addEventListener([=](Ref*, CheckBox::EventType i_type) {

		AudioEngine::play2d("click.mp3");

		switch (i_type)
		{
		case cocos2d::ui::CheckBox::EventType::SELECTED:
			((cocos2d::ui::CheckBox*)background->getChildByName("femaleCheckBox"))->setSelected(false);
			break;
		case cocos2d::ui::CheckBox::EventType::UNSELECTED:
			break;
		default:
			break;
		}

	});
	background->addChild(maleCheckBox);

	auto femaleCheckBox = cocos2d::ui::CheckBox::create("normal_checkbox2.png", "normal_checkbox2.png", "checked_checkbox2.png", "normal_checkbox2.png", "normal_checkbox2.png", cocos2d::ui::Widget::TextureResType::PLIST);
	femaleCheckBox->setPosition(Vec2(215.0f, okButton->getPositionY()));
	femaleCheckBox->setName("femaleCheckBox");
	femaleCheckBox->addEventListener([=](Ref*, CheckBox::EventType i_type) {

		AudioEngine::play2d("click.mp3");

		switch (i_type)
		{
		case cocos2d::ui::CheckBox::EventType::SELECTED:
			((cocos2d::ui::CheckBox*)background->getChildByName("maleCheckBox"))->setSelected(false);
			break;
		case cocos2d::ui::CheckBox::EventType::UNSELECTED:
			break;
		default:
			break;
		}
	});
	background->addChild(femaleCheckBox);

	auto maleLabel = Label::createWithTTF("Name", "fonts/tahomabd.ttf", 14.0f);
	maleLabel->setTextColor(Color4B(255, 180, 0, 255));
	maleLabel->setName("maleLabel");
	maleLabel->setPosition(maleCheckBox->getPosition() + Vec2(maleCheckBox->getContentSize().width*0.5f + maleLabel->getContentSize().width*0.52f, 0));
	background->addChild(maleLabel);

	auto femaleLabel = Label::createWithTTF("\x4e\xe1\xbb\xaf", "fonts/tahomabd.ttf", 14.0f);
	femaleLabel->setTextColor(Color4B(255, 180, 0, 255));
	femaleLabel->setName("femaleLabel");
	femaleLabel->setPosition(femaleCheckBox->getPosition() + Vec2(femaleCheckBox->getContentSize().width*0.5f + femaleLabel->getContentSize().width*0.52f, 0));
	background->addChild(femaleLabel);

	okButton->addClickEventListener([=](cocos2d::Ref*) {
		
		AudioEngine::play2d("click.mp3");

		std::string k_ageNumStr = nameEditTextField->getString();

		if (isNumberFunction(k_ageNumStr) && k_ageNumStr.size()>=4)
		{
			UserDefault::getInstance()->setIntegerForKey("yearOfBirth", std::stoi(k_ageNumStr));
			UserDefault::getInstance()->setBoolForKey("isMale", maleCheckBox->isSelected());
			i_mainScene->calculateCompassTypeBasedOnAge();
            int rotation = std::stoi(huongEditTextField->getString());
            i_mainScene->setRotaionHuongNha(float(rotation));
			this->removeFromParentAndCleanup(true);
		}
		else
		{
			
			//Nam sinh ko hop le vui long nhap lai
			auto label = Label::createWithTTF("\x4e\xc4\x83\x6d \x73\x69\x6e\x68 \x6b\x68\xc3\xb4\x6e\x67 \x68\xe1\xbb\xa3\x70 \x6c\xe1\xbb\x87 \x76\x75\x69 \x6c\xc3\xb2\x6e\x67 \x6e\x68\xe1\xba\xad\x70 \x6c\xe1\xba\xa1\x69 \x21", "fonts/tahoma.ttf", 16.0f);
			label->setTextColor(Color4B::RED);
			label->setPosition(m_origin + Vec2(m_visibleSize.width / 2, m_visibleSize.height - 5.0f*label->getContentSize().height));
			label->runAction(Sequence::createWithTwoActions(Spawn::createWithTwoActions(FadeOut::create(0.5f), MoveBy::create(0.5f, Vec2(0, 2.0f*label->getContentSize().height))), RemoveSelf::create(true)));
			this->addChild(label);

			auto backgroundLabel = Scale9Sprite::createWithSpriteFrameName("sprite9path.png");
			backgroundLabel->ignoreAnchorPointForPosition(false);
			backgroundLabel->setAnchorPoint(Vec2(0.5f, 0.5f));
			backgroundLabel->setContentSize(label->getContentSize()*1.2f);
			backgroundLabel->setPosition(label->getContentSize() / 2);
			backgroundLabel->runAction(Sequence::createWithTwoActions(FadeOut::create(0.5f), RemoveSelf::create(true)));
			label->addChild(backgroundLabel,-1);


		}
	
	});

	setEnableLockTouch(true);

	return true;
}


void AgeGatheringPopUpLayer::onExitButtonPressed(cocos2d::Ref * pSender)
{
	this->removeFromParentAndCleanup(true);
}

void AgeGatheringPopUpLayer::onNameEditTextFieldClick(cocos2d::Ref * pSender, cocos2d::ui::TextField::EventType i_type)
{
	TextField* textField = dynamic_cast<TextField*>(pSender);

	switch (i_type)
	{
	case cocos2d::ui::TextField::EventType::ATTACH_WITH_IME:
		textField->setPlaceHolder("");
		textField->setString("");
		break;
	case cocos2d::ui::TextField::EventType::DETACH_WITH_IME:
		break;
	case cocos2d::ui::TextField::EventType::INSERT_TEXT:
	{
		auto str = textField->getString();
		if (!isNumberFunction(str))
		{
			str.pop_back();
			textField->setString(str);
		}

		break;
	}	
	case cocos2d::ui::TextField::EventType::DELETE_BACKWARD:
		break;
	default:
		break;
	}
}

void AgeGatheringPopUpLayer::onHuongEditTextFieldClick(cocos2d::Ref * pSender, cocos2d::ui::TextField::EventType i_type)
{
    TextField* textField = dynamic_cast<TextField*>(pSender);

    switch (i_type)
    {
        case cocos2d::ui::TextField::EventType::ATTACH_WITH_IME:
            textField->setPlaceHolder("");
            textField->setString("");
            break;
        case cocos2d::ui::TextField::EventType::DETACH_WITH_IME:
            break;
        case cocos2d::ui::TextField::EventType::INSERT_TEXT:
        {
            auto str = textField->getString();
            if (!isNumberFunction(str))
            {
                str.pop_back();
                textField->setString(str);
            }

            break;
        }
        case cocos2d::ui::TextField::EventType::DELETE_BACKWARD:
            break;
        default:
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bool AgeGatheringPopUpLayer::isNumberFunction(std::string s)
{
	return (!s.empty() && std::find_if(s.begin(), s.end(), [](char c) { return !isdigit(c); }) == s.end());
}

AboutPopUpLayer * AboutPopUpLayer::createPopUpLayer(MainScene * i_mainScene)
{
    AboutPopUpLayer *ret = new (std::nothrow) AboutPopUpLayer();

    if (ret && ret->init(i_mainScene))
    {
        ret->autorelease();
        return ret;
    }
    CC_SAFE_DELETE(ret);

    return nullptr;
}

bool AboutPopUpLayer::init(MainScene * i_mainScene)
{

	if (!BaseLayer::initWithColor(Color4B::BLACK))
	{
		return false;
	}

	this->setOpacity(255.0f*0.1f);

	auto background = Sprite::createWithSpriteFrameName("about_popup_bg.png");
	background->setPosition(m_origin + m_visibleSize / 2);
	background->runAction(Repeat::create(Sequence::createWithTwoActions(ScaleTo::create(0.08f, 0.9f), ScaleTo::create(0.08f, 1.0f)), 2));
	this->addChild(background);

	auto exitButton = TILButton::create("exit_btn.png", "exit_btn.png", "exit_btn.png", cocos2d::ui::Widget::TextureResType::PLIST);
	exitButton->setPosition(Vec2(395.5f, background->getContentSize().height - 0.0f));
	exitButton->setPressedActionEnabled(true);
	exitButton->addClickEventListener([=](cocos2d::Ref*) {

		AudioEngine::play2d("click.mp3");

		this->removeFromParentAndCleanup(true);

	});
	background->addChild(exitButton);
    return true;
}

void AboutPopUpLayer::onExitButtonPressed(cocos2d::Ref * pSender)
{
}
