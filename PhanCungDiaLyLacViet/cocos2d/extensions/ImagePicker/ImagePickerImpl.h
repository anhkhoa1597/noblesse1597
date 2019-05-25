#ifndef __ImagePicker__ImagePickerImpl__
#define __ImagePicker__ImagePickerImpl__

#include "platform/CCPlatformMacros.h"
#include "cocos2d.h"
using namespace cocos2d;

NS_CC_BEGIN
    
class ImagePickerImpl{
public:
    static void openImage();
    static void save( __String path );
};
    
NS_CC_END

#endif
