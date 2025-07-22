/* ==========================================================================
   Interstellar i18n - 多语言支持系统
   ========================================================================== */

class InterstellarI18n {
  constructor() {
    this.currentLang = this.getStoredLanguage() || this.detectBrowserLanguage();
    this.translations = {};
    this.loadTranslations();
    this.init();
  }

  // 语言检测
  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('zh') ? 'zh' : 'en';
  }

  // 获取存储的语言
  getStoredLanguage() {
    return localStorage.getItem('interstellar-lang');
  }

  // 设置语言
  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('interstellar-lang', lang);
    this.updateUI();
    this.updateLanguageToggle();
    
    // 发送自定义事件
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: lang }
    }));
  }

  // 加载翻译
  loadTranslations() {
    this.translations = {
      zh: {
        // 导航
        'nav.home': '主页',
        'nav.archives': '归档',
        'nav.about': '关于',
        
        // Hero区域
        'hero.title.line1': '穿越数字宇宙',
        'hero.title.line2': '探索星际奥秘',
        'hero.subtitle': '超越想象的事件视界，探索技术的无限可能性',
        'hero.btn.primary': '开始传输',
        'hero.btn.secondary': '任务简报',
        'hero.stats.dimensions': '维度',
        'hero.stats.lightyears': '光年',
        'hero.stats.odyssey': '奥德赛',
        
        // 特性区域
        'features.title': '任务目标',
        'features.subtitle': '用于星际探索的先进技术解决方案',
        'features.spacecraft.title': '飞船控制',
        'features.spacecraft.desc': '用于星际导航和通信系统的先进移动界面。',
        'features.spacecraft.meta': 'iOS • Android • 量子操作系统 • 12个模块',
        'features.mission.title': '任务控制',
        'features.mission.desc': '用于深空探索和数据分析的复杂指挥中心。',
        'features.mission.meta': 'Endurance操作系统 • TARS • CASE • 18个系统',
        'features.quantum.title': '量子网络',
        'features.quantum.desc': '超越时空边界的跨维度网络应用。',
        'features.quantum.meta': '超立方体 • 虫洞 • 引导程序 • 24个门户',
        'features.archive.title': '数据档案',
        'features.archive.desc': '宇宙知识和星际通信协议的综合图书馆。',
        'features.archive.meta': '星图 • 时间代码 • 坐标 • 36个收藏',
        
        // 博客区域
        'blog.title': '传输日志',
        'blog.viewall': '所有传输',
        'blog.readmore': '继续阅读',
        'blog.category': '类别',
        
        // CTA区域
        'cta.title': '加入任务',
        'cta.subtitle': '接收来自银河系的新发现和任务更新的优先传输。',
        'cta.input.placeholder': '输入通信频率',
        'cta.btn': '建立连接',
        'cta.privacy': '安全量子加密。光速断开连接。',
        
        // 页脚
        'footer.categories': '分类',
        'footer.contact.title': '建立联系',
        'footer.contact.desc': '需要向宇宙发送消息吗？我们正在所有频率上监听。',
        'footer.contact.btn': '发送传输',
        'footer.copyright': '用星尘和量子技术制造。',
        'footer.powered': '由物理定律和人类好奇心驱动',
        
        // 分类
        'categories.spacecraft': '飞船控制',
        'categories.mission': '任务控制', 
        'categories.quantum': '量子网络',
        'categories.archive': '数据档案',
        
        // 通用
        'common.loading': '加载中...',
        'common.error': '错误',
        'common.success': '成功',
        'theme.light': '日光模式',
        'theme.dark': '夜间模式',
        'lang.switch': '切换语言',
        
        // 关于页面
        'about.title': '关于张洪健',
        'about.subtitle': '星际探索者 & 技术开拓者',
        'about.intro': '欢迎来到我的数字宇宙',
        'about.description': '我是张洪健，一个对技术充满热情的探索者。就像《星际穿越》中的库珀一样，我相信人类的好奇心和创新精神能够带我们超越任何边界。',
        'about.mission.title': '我的使命',
        'about.mission.desc': '通过技术连接世界，探索数字世界的无限可能性，并分享这段旅程中的发现。',
        'about.skills.title': '技术专长',
        'about.contact.title': '建立联系',
        'about.contact.desc': '让我们一起探索技术的边界'
      },
      
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.archives': 'Archives',
        'nav.about': 'About',
        
        // Hero Section
        'hero.title.line1': 'Journey Through',
        'hero.title.line2': 'The Digital Cosmos',
        'hero.subtitle': 'Exploring the infinite possibilities of technology, beyond the event horizon of imagination',
        'hero.btn.primary': 'Begin Transmission',
        'hero.btn.secondary': 'Mission Brief',
        'hero.stats.dimensions': 'Dimensions',
        'hero.stats.lightyears': 'Light Years',
        'hero.stats.odyssey': 'Odyssey',
        
        // Features Section
        'features.title': 'Mission Objectives',
        'features.subtitle': 'Advanced technological solutions for interstellar exploration',
        'features.spacecraft.title': 'Spacecraft Control',
        'features.spacecraft.desc': 'Advanced mobile interfaces for interstellar navigation and communication systems.',
        'features.spacecraft.meta': 'iOS • Android • Quantum OS • 12 Modules',
        'features.mission.title': 'Mission Control',
        'features.mission.desc': 'Sophisticated command centers for deep space exploration and data analysis.',
        'features.mission.meta': 'Endurance OS • TARS • CASE • 18 Systems',
        'features.quantum.title': 'Quantum Networks',
        'features.quantum.desc': 'Interdimensional web applications that transcend space-time boundaries.',
        'features.quantum.meta': 'Tesseract • Wormhole • Bootstrap • 24 Portals',
        'features.archive.title': 'Data Archives',
        'features.archive.desc': 'Comprehensive libraries of cosmic knowledge and interstellar communication protocols.',
        'features.archive.meta': 'Stellar Maps • Time Codes • Coordinates • 36 Collections',
        
        // Blog Section
        'blog.title': 'Transmission Log',
        'blog.viewall': 'All Transmissions',
        'blog.readmore': 'Continue Reading',
        'blog.category': 'Category',
        
        // CTA Section
        'cta.title': 'Join the Mission',
        'cta.subtitle': 'Receive priority transmissions about new discoveries and mission updates from across the galaxy.',
        'cta.input.placeholder': 'Enter communication frequency',
        'cta.btn': 'Establish Link',
        'cta.privacy': 'Secure quantum encryption. Disconnect at light speed.',
        
        // Footer
        'footer.categories': 'Categories',
        'footer.contact.title': 'Establish Contact',
        'footer.contact.desc': 'Need to transmit a message across the cosmos? We\'re listening on all frequencies.',
        'footer.contact.btn': 'Send Transmission',
        'footer.copyright': 'Engineered with stardust using quantum technology.',
        'footer.powered': 'Powered by the laws of physics and human curiosity',
        
        // Categories
        'categories.spacecraft': 'Spacecraft Control',
        'categories.mission': 'Mission Control',
        'categories.quantum': 'Quantum Networks', 
        'categories.archive': 'Data Archives',
        
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'theme.light': 'Light Mode',
        'theme.dark': 'Dark Mode',
        'lang.switch': 'Switch Language',
        
        // About Page
        'about.title': 'About Zhang Hongjian',
        'about.subtitle': 'Interstellar Explorer & Technology Pioneer',
        'about.intro': 'Welcome to My Digital Universe',
        'about.description': 'I\'m Zhang Hongjian, an explorer passionate about technology. Like Cooper in Interstellar, I believe that human curiosity and innovation can take us beyond any boundary.',
        'about.mission.title': 'My Mission',
        'about.mission.desc': 'To connect the world through technology, explore infinite possibilities in the digital realm, and share the discoveries along this journey.',
        'about.skills.title': 'Technical Expertise',
        'about.contact.title': 'Establish Contact',
        'about.contact.desc': 'Let\'s explore the boundaries of technology together'
      }
    };
  }

  // 获取翻译文本
  t(key, params = {}) {
    let text = this.translations[this.currentLang]?.[key] || 
               this.translations['en']?.[key] || 
               key;
    
    // 处理参数替换
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
  }

  // 更新UI中的所有文本
  updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = this.t(key);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = text;
      } else {
        element.textContent = text;
      }
    });

    // 更新HTML lang属性
    document.documentElement.lang = this.currentLang;
  }

  // 更新语言切换按钮
  updateLanguageToggle() {
    const langToggle = document.getElementById('language-toggle');
    const langText = langToggle?.querySelector('.language-text');
    
    if (langText) {
      langText.textContent = this.currentLang.toUpperCase();
    }
  }

  // 初始化
  init() {
    this.updateUI();
    this.updateLanguageToggle();
    
    // 监听语言切换
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
      langToggle.addEventListener('click', () => {
        const newLang = this.currentLang === 'zh' ? 'en' : 'zh';
        this.setLanguage(newLang);
      });
    }

    // 添加语言切换动画
    this.addLanguageSwitchAnimation();
  }

  // 语言切换动画
  addLanguageSwitchAnimation() {
    const style = document.createElement('style');
    style.textContent = `
      .lang-switch-enter {
        animation: langFadeIn 0.3s ease-in-out;
      }
      
      .lang-switch-exit {
        animation: langFadeOut 0.3s ease-in-out;
      }
      
      @keyframes langFadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes langFadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 获取当前语言
  getCurrentLanguage() {
    return this.currentLang;
  }

  // 添加翻译
  addTranslation(lang, key, value) {
    if (!this.translations[lang]) {
      this.translations[lang] = {};
    }
    this.translations[lang][key] = value;
  }
}

// 全局实例
window.i18n = new InterstellarI18n();

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InterstellarI18n;
}