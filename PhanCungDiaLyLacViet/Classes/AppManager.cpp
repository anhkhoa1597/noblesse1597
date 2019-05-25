#include "AppManager.h"
#include "ui/CocosGUI.h"
USING_NS_CC;

cocos2d::Vec2 AppManager::compute2DPolygonCentroid(const std::vector<cocos2d::Vec2> vertices)
{
	if (vertices.empty())
	{
		return Vec2::ZERO;
	}

	Vec2 centroid = { 0, 0 };
	double signedArea = 0.0;
	double x0 = 0.0; // Current vertex X
	double y0 = 0.0; // Current vertex Y
	double x1 = 0.0; // Next vertex X
	double y1 = 0.0; // Next vertex Y
	double a = 0.0;  // Partial signed area

	// For all vertices except last
	int i = 0;
	for (i = 0; i < vertices.size()-1; ++i)
	{
		x0 = vertices[i].x;
		y0 = vertices[i].y;
		x1 = vertices[i + 1].x;
		y1 = vertices[i + 1].y;
		a = x0 * y1 - x1 * y0;
		signedArea += a;
		centroid.x += (x0 + x1)*a;
		centroid.y += (y0 + y1)*a;
	}

	// Do last vertex separately to avoid performing an expensive
	// modulus operation in each iteration.
	x0 = vertices[i].x;
	y0 = vertices[i].y;
	x1 = vertices[0].x;
	y1 = vertices[0].y;
	a = x0 * y1 - x1 * y0;
	signedArea += a;
	centroid.x += (x0 + x1)*a;
	centroid.y += (y0 + y1)*a;

	signedArea *= 0.5;
	centroid.x /= (6.0*signedArea);
	centroid.y /= (6.0*signedArea);

	return centroid;
}

void AppManager::createRedNotification(std::string i_content, cocos2d::Node * i_parent, const int i_zorder)
{
	auto m_visibleSize = Director::getInstance()->getVisibleSize();
	auto m_origin = Director::getInstance()->getVisibleOrigin();

	auto label = Label::createWithTTF(i_content, "fonts/tahoma.ttf", 16.0f);
	label->setTextColor(Color4B::RED);
	label->setPosition(m_origin + Vec2(m_visibleSize.width / 2, m_visibleSize.height*0.8f));// -0.5f*1.4f*label->getContentSize().height));
	label->runAction(Sequence::createWithTwoActions(Spawn::createWithTwoActions(FadeOut::create(2.0f), MoveBy::create(2.0f, Vec2(0, 2.0f*label->getContentSize().height))), RemoveSelf::create(true)));
	//label->runAction(Sequence::createWithTwoActions(FadeOut::create(1.0f), RemoveSelf::create(true)));
	i_parent->addChild(label, i_zorder);

	//auto backgroundLabel = LayerColor::create(Color4B(255, 255, 255, 255)); //cocos2d::ui::Scale9Sprite::createWithSpriteFrameName("sprite9path.png");
	//backgroundLabel->ignoreAnchorPointForPosition(false);
	//backgroundLabel->setAnchorPoint(Vec2(0.5f, 0.5f));
	//backgroundLabel->setContentSize(Size(m_visibleSize.width,label->getContentSize().height*1.4f));
	//backgroundLabel->setPosition(label->getContentSize() / 2);
	//backgroundLabel->runAction(Sequence::createWithTwoActions(FadeOut::create(2.0f), RemoveSelf::create(true)));
	//label->addChild(backgroundLabel, -1);
}

void AppManager::init()
{

}
