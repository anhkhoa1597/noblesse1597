# Duplicated file, will be removed in a future version.
# Please use the Podspec file at project root.
# @see https://github.com/react-native-community/react-native-localize/pull/37

require 'json'
package = JSON.parse(File.read('../package.json'))

Pod::Spec.new do |s|
  s.name                   = "RNLocalize"
  s.dependency               "React"

  s.version                = package["version"]
  s.license                = package["license"]
  s.description            = package["description"]
  s.summary                = package["description"]
  s.authors                = package["author"]
  s.homepage               = package["homepage"]

  s.platform               = :ios, "9.0"
  s.ios.deployment_target  = "9.0"

  s.source                 = { :git => "#{s.homepage}.git", :tag => s.version }
  s.source_files           = "*.{h,m}"
end
