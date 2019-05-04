#pragma once

#include "cocos2d.h"
#include "extensions/ImagePicker/ImagePicker.h"

class MainScene : public cocos2d::LayerColor, public cocos2d::ImagePickerDelegate
{
public:
	enum COMPASS_TYPE
	{
		CAN,
		KHAM,
		CAAN,
		CHAN,
		TON,
		LY,
		KHON,
		DOAI
	};
	enum class ROTATION_TYPE
	{
		COMPASS,
		SPRITE
	};

private:

	cocos2d::Size		m_visibleSize;

	cocos2d::Vec2		m_origin;

	cocos2d::Sprite*	m_sprite = nullptr;

	cocos2d::Sprite*	m_compass = nullptr;

	cocos2d::LayerColor* m_topBar = nullptr;
	cocos2d::LayerColor* m_bottomBar = nullptr;

	ROTATION_TYPE		m_rotationType = ROTATION_TYPE::SPRITE;

	std::string			m_cung = "";

	virtual void saveToFileCallback(cocos2d::RenderTexture* texture, const std::string& string);

public:

    static cocos2d::Scene* createScene();

    virtual bool init();
    
	void onOpenFilesClick(cocos2d::Ref* i_sender);

    void didFinishPickingWithResult(cocos2d::Texture2D* result);
    
	void setCurrentSprite(cocos2d::Sprite *i_newSprite,cocos2d::Vec2 i_pos);

	void calculateCompassTypeBasedOnAge();
	
	void testCalculateCompassTypeBasedOnAge(int i_year,bool i_isMale);

	void updateInforLabel();

	std::string m_path = "";

    // implement the "static create()" method manually
    CREATE_FUNC(MainScene);
};

