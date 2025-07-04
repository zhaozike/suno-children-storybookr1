import { useState, useEffect } from 'react'
import { BookOpen, Mic, Image, Globe, Sparkles, Heart, Star, Play, Pause, Volume2, Wand2, PenTool, Users, Award } from 'lucide-react'
import './App.css'

// 多语言配置
const translations = {
  zh: {
    title: 'Suno AI儿童绘本创作平台',
    subtitle: '让想象力变成美丽的故事',
    description: '基于Suno AI技术，为孩子们创造独特的有声绘本体验',
    createStorybook: '创作故事绘本',
    createStorybookWithAudio: '创作有声绘本',
    storyTheme: '故事主题',
    storyThemePlaceholder: '请输入故事主题或关键词...',
    generateStory: '生成故事',
    language: '语言',
    illustrationStyle: '插画风格',
    voiceType: '语音类型',
    features: '平台特色',
    howItWorks: '使用流程',
    examples: '精彩案例',
    about: '关于我们',
    contact: '联系我们',
    getStarted: '开始创作',
    learnMore: '了解更多',
    featureAI: 'AI智能创作',
    featureAIDesc: '基于Suno先进AI技术，智能生成富有想象力的儿童故事',
    featureVoice: '专业配音',
    featureVoiceDesc: '多种儿童友好的语音选择，让故事更加生动有趣',
    featureIllustration: '精美插画',
    featureIllustrationDesc: '多种艺术风格的插画，为每个故事量身定制',
    featureMultiLang: '多语言支持',
    featureMultiLangDesc: '支持中文、英文、西班牙文等多种语言创作',
    step1: '输入主题',
    step1Desc: '告诉我们您想要的故事主题和关键词',
    step2: '选择风格',
    step2Desc: '选择喜欢的插画风格和语音类型',
    step3: '生成故事',
    step3Desc: 'AI为您创作独特的儿童绘本故事',
    step4: '享受阅读',
    step4Desc: '和孩子一起享受美妙的有声绘本时光',
    exampleTitle1: '小兔子的冒险',
    exampleDesc1: '一只勇敢的小兔子在森林中寻找彩虹的故事',
    exampleTitle2: '星星的秘密',
    exampleDesc2: '小女孩发现星星会说话的神奇故事',
    exampleTitle3: '友谊的力量',
    exampleDesc3: '不同动物之间建立深厚友谊的温暖故事',
    aboutTitle: '关于Suno AI儿童绘本平台',
    aboutDesc: '我们致力于为全世界的孩子们创造最优质的AI生成绘本内容。通过先进的人工智能技术，我们让每个孩子都能拥有属于自己的独特故事。',
    contactTitle: '联系我们',
    contactDesc: '如果您有任何问题或建议，欢迎随时与我们联系。',
    email: '邮箱',
    phone: '电话',
    address: '地址',
    copyright: '© 2024 Suno AI儿童绘本平台. 保留所有权利.',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
    home: '首页' // Added for navigation
  },
  en: {
    title: 'Suno AI Children\'s Storybook Platform',
    subtitle: 'Turn imagination into beautiful stories',
    description: 'Create unique audio storybook experiences for children with Suno AI technology',
    createStorybook: 'Create Storybook',
    createStorybookWithAudio: 'Create Audio Storybook',
    storyTheme: 'Story Theme',
    storyThemePlaceholder: 'Enter story theme or keywords...',
    generateStory: 'Generate Story',
    language: 'Language',
    illustrationStyle: 'Illustration Style',
    voiceType: 'Voice Type',
    features: 'Features',
    howItWorks: 'How It Works',
    examples: 'Examples',
    about: 'About Us',
    contact: 'Contact',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    featureAI: 'AI Smart Creation',
    featureAIDesc: 'Generate imaginative children\'s stories with advanced Suno AI technology',
    featureVoice: 'Professional Narration',
    featureVoiceDesc: 'Multiple child-friendly voice options to make stories more vivid',
    featureIllustration: 'Beautiful Illustrations',
    featureIllustrationDesc: 'Custom illustrations in various artistic styles for each story',
    featureMultiLang: 'Multi-language Support',
    featureMultiLangDesc: 'Support for Chinese, English, Spanish and more languages',
    step1: 'Enter Theme',
    step1Desc: 'Tell us your desired story theme and keywords',
    step2: 'Choose Style',
    step2Desc: 'Select your preferred illustration style and voice type',
    step3: 'Generate Story',
    step3Desc: 'AI creates a unique children\'s storybook for you',
    step4: 'Enjoy Reading',
    step4Desc: 'Enjoy wonderful audio storybook time with your child',
    exampleTitle1: 'Little Rabbit\'s Adventure',
    exampleDesc1: 'A brave little rabbit\'s journey to find the rainbow in the forest',
    exampleTitle2: 'Secret of the Stars',
    exampleDesc2: 'A magical story of a little girl discovering talking stars',
    exampleTitle3: 'Power of Friendship',
    exampleDesc3: 'A heartwarming story of deep friendship between different animals',
    aboutTitle: 'About Suno AI Children\'s Storybook Platform',
    aboutDesc: 'We are dedicated to creating the highest quality AI-generated storybook content for children worldwide. Through advanced artificial intelligence technology, we enable every child to have their own unique stories.',
    contactTitle: 'Contact Us',
    contactDesc: 'If you have any questions or suggestions, please feel free to contact us anytime.',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    copyright: '© 2024 Suno AI Children\'s Storybook Platform. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    home: 'Home' // Added for navigation
  }
}

function App() {
  const [currentLang, setCurrentLang] = useState('zh')
  const [storyTheme, setStoryTheme] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('zh')
  const [illustrationStyle, setIllustrationStyle] = useState('cartoon')
  const [voiceType, setVoiceType] = useState('female')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentSection, setCurrentSection] = useState('home')

  const t = translations[currentLang]

  const handleGenerateStory = async () => {
    if (!storyTheme.trim()) return
    
    setIsGenerating(true)
    // 模拟API调用
    setTimeout(() => {
      setIsGenerating(false)
      alert('故事生成完成！')
    }, 3000)
  }

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-purple-800">Suno绘本</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {t.home}
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {t.features}
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {t.howItWorks}
              </button>
              <button 
                onClick={() => scrollToSection('examples')}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {t.examples}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {t.about}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="zh">中文</option>
                <option value="en">EN</option>
              </select>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
                {t.getStarted}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主页部分 */}
      <section id="home" className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <BookOpen className="relative h-20 w-20 text-purple-600 float-animation" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.title}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              {t.description}
            </p>

            {/* 创作表单 */}
            <div className="max-w-2xl mx-auto mb-12 bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800 flex items-center justify-center gap-2 mb-2">
                  <Wand2 className="h-6 w-6" />
                  {t.createStorybookWithAudio}
                </h2>
                <p className="text-gray-600">
                  输入您的创意，让AI为您创造独特的儿童绘本
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.storyTheme}
                  </label>
                  <textarea
                    placeholder={t.storyThemePlaceholder}
                    value={storyTheme}
                    onChange={(e) => setStoryTheme(e.target.value)}
                    className="w-full min-h-[100px] px-4 py-3 border border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.language}
                    </label>
                    <select 
                      value={selectedLanguage} 
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="zh">中文</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.illustrationStyle}
                    </label>
                    <select 
                      value={illustrationStyle} 
                      onChange={(e) => setIllustrationStyle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="cartoon">卡通风格</option>
                      <option value="watercolor">水彩风格</option>
                      <option value="digital">数字艺术</option>
                      <option value="sketch">手绘素描</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.voiceType}
                    </label>
                    <select 
                      value={voiceType} 
                      onChange={(e) => setVoiceType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="female">温柔女声</option>
                      <option value="male">亲切男声</option>
                      <option value="child">儿童声音</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleGenerateStory}
                  disabled={!storyTheme.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      正在创作中...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      {t.generateStory}
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
                <div className="text-gray-600">创作故事</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">50,000+</div>
                <div className="text-gray-600">快乐儿童</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
                <div className="text-gray-600">支持语言</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
                <div className="text-gray-600">满意度</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特色功能部分 */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.features}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于Suno先进AI技术，为您提供最优质的儿童绘本创作体验
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wand2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.featureAI}</h3>
              <p className="text-gray-600">{t.featureAIDesc}</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.featureVoice}</h3>
              <p className="text-gray-600">{t.featureVoiceDesc}</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.featureIllustration}</h3>
              <p className="text-gray-600">{t.featureIllustrationDesc}</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.featureMultiLang}</h3>
              <p className="text-gray-600">{t.featureMultiLangDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 使用流程部分 */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.howItWorks}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              简单四步，创造属于您孩子的独特绘本故事
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-90