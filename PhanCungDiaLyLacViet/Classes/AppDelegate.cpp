#include "AppDelegate.h"
#include "SplashScene.h"
#include "AppManager.h"
#define USE_AUDIO_ENGINE 1
// #define USE_SIMPLE_AUDIO_ENGINE 1
#include "base/ZipUtils.h"

#if USE_AUDIO_ENGINE && USE_SIMPLE_AUDIO_ENGINE
#error "Don't use AudioEngine and SimpleAudioEngine at the same time. Please just select one in your game!"
#endif

#if USE_AUDIO_ENGINE
#include "audio/include/AudioEngine.h"
using namespace cocos2d::experimental;
#elif USE_SIMPLE_AUDIO_ENGINE
#include "audio/include/SimpleAudioEngine.h"
using namespace CocosDenshion;
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) || (CC_TARGET_PLATFORM == CC_PLATFORM_IOS) 
#define ResolutionHD  1.0f
#define ResolutionSD  1.0f
#else
#define ResolutionHD  1.0f
#define ResolutionSD  (0.792253521f)
#endif


USING_NS_CC;

static cocos2d::Size designResolutionSize = cocos2d::Size(768.0f, 1136.0f);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

AppDelegate::AppDelegate()
{
	AppManager::CreateInstance();
}

AppDelegate::~AppDelegate() 
{
#if USE_AUDIO_ENGINE
//    AudioEngine::end();
#elif USE_SIMPLE_AUDIO_ENGINE
    SimpleAudioEngine::end();
#endif
}

void AppDelegate::initGLContextAttrs()
{
    GLContextAttrs glContextAttrs = {8, 8, 8, 8, 24, 8, 0};
    GLView::setGLContextAttrs(glContextAttrs);
}

static int register_all_packages()
{
    return 0; 
}

bool AppDelegate::applicationDidFinishLaunching() {

	AppManager::GetInstance()->setScaleFactor(ResolutionSD);

	Size actualSize = Size(designResolutionSize.width*AppManager::GetInstance()->getScaleFactor(),designResolutionSize.height*AppManager::GetInstance()->getScaleFactor());

    auto director = Director::getInstance();
    auto glview = director->getOpenGLView();
    if(!glview) {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32) || (CC_TARGET_PLATFORM == CC_PLATFORM_MAC) || (CC_TARGET_PLATFORM == CC_PLATFORM_LINUX)
        glview = GLViewImpl::createWithRect("PhanCungDiaLyLacViet", cocos2d::Rect(0, 0, actualSize.width, actualSize.height));
#else
        glview = GLViewImpl::create("PhanCungDiaLyLacViet");
#endif
        director->setOpenGLView(glview);
    }

    director->setDisplayStats(false);

    director->setAnimationInterval(1.0f / 60);

    glview->setDesignResolutionSize(actualSize.width, actualSize.height, ResolutionPolicy::NO_BORDER);
  
    register_all_packages();
	//c777c238 0cd5e0d0 0b193048 5d9744e2
	//0xc777c238 0x0cd5e0d0 0x0b193048 0x5d9744e2
	//ZipUtils::setPvrEncryptionKey(0xc777c238, 0x0cd5e0d0, 0x0b193048, 0x5d9744e2);

	AudioEngine::preload("splash.mp3");

	SpriteFrameCache::getInstance()->addSpriteFramesWithFile("data.plist");// "data.png");

    auto scene = SplashScene::createScene();
    director->runWithScene(scene);

    return true;
}

void AppDelegate::applicationDidEnterBackground() {
    Director::getInstance()->stopAnimation();

#if USE_AUDIO_ENGINE
    AudioEngine::pauseAll();
#elif USE_SIMPLE_AUDIO_ENGINE
    SimpleAudioEngine::getInstance()->pauseBackgroundMusic();
    SimpleAudioEngine::getInstance()->pauseAllEffects();
#endif
}

void AppDelegate::applicationWillEnterForeground() {
    Director::getInstance()->startAnimation();

#if USE_AUDIO_ENGINE
    AudioEngine::resumeAll();
#elif USE_SIMPLE_AUDIO_ENGINE
    SimpleAudioEngine::getInstance()->resumeBackgroundMusic();
    SimpleAudioEngine::getInstance()->resumeAllEffects();
#endif
}
