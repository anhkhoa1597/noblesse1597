#include "BaseSingleton.h"
#include "cocos2d.h"

class AppManager : public BaseSingleton<AppManager>
{
public: 

	CC_SYNTHESIZE(float, m_scaleFactor, ScaleFactor);

	cocos2d::Vec2 compute2DPolygonCentroid(const std::vector<cocos2d::Vec2> vertices);

	void createRedNotification(std::string i_content, cocos2d::Node* i_parent, const int i_zorder = 0);

	void init();
};