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
        'nav.subtitle': '技术博客与开发分享',
        
        // Hero区域
        'hero.title.line1': '张洪健的',
        'hero.title.line2': '技术世界',
        'hero.subtitle': '探索创新技术，分享开发心得',
        'hero.btn.primary': '浏览文章',
        'hero.btn.secondary': '关于我',
        'hero.stats.years': '年经验',
        'hero.stats.projects': '项目经验',
        'hero.stats.tech': '技术栈',
        
        // 特性区域
        'features.title': '我的专长',
        'features.subtitle': '专业的软件开发和创新技术解决方案',
        'features.mobile.title': '移动开发',
        'features.mobile.desc': '为iOS和Android平台创建美观高性能的移动应用。',
        'features.mobile.meta': 'React Native • Flutter • Swift • Kotlin',
        'features.fullstack.title': '全栈开发',
        'features.fullstack.desc': '从前端用户界面到后端服务的完整Web应用开发。',
        'features.fullstack.meta': 'React • Node.js • Python • Docker',
        'features.cloud.title': '云计算DevOps',
        'features.cloud.desc': '可扩展的云基础设施和现代应用的自动化部署流水线。',
        'features.cloud.meta': 'AWS • Azure • Kubernetes • CI/CD',
        'features.ai.title': 'AI数据科学',
        'features.ai.desc': '利用人工智能和机器学习解决复杂问题。',
        'features.ai.meta': 'Python • TensorFlow • PyTorch • 数据分析',
        
        // 博客区域
        'blog.title': '最新文章',
        'blog.viewall': '查看所有文章',
        'blog.readmore': '继续阅读',
        'blog.category': '分类',
        
        // CTA区域
        'cta.title': '保持联系',
        'cta.subtitle': '订阅获取新文章、项目和开发心得的最新消息。',
        'cta.input.placeholder': '输入您的邮箱地址',
        'cta.btn': '订阅',
        'cta.privacy': '不发送垃圾邮件，随时可取消订阅。',
        
        // 页脚
        'footer.categories': '分类',
        'footer.contact.title': '联系我',
        'footer.contact.desc': '有技术问题想要探讨吗？欢迎与我联系交流。',
        'footer.contact.btn': '发送邮件',
        'footer.copyright': '用代码和创意精心制作。',
        'footer.powered': '由技术热情和持续学习驱动',
        
        // 分类
        'categories.mobile': '移动开发',
        'categories.fullstack': '全栈开发', 
        'categories.cloud': '云计算DevOps',
        'categories.ai': 'AI数据科学',
        
        // 通用
        'common.loading': '加载中...',
        'common.error': '错误',
        'common.success': '成功',
        'theme.light': '日光模式',
        'theme.dark': '夜间模式',
        'lang.switch': '切换语言',
        
        // 关于页面
        'about.title': '关于张洪健',
        'about.subtitle': '软件开发工程师 & 技术爱好者',
        'about.intro': '你好，我是张洪健',
        'about.description': '我是一名充满热情的软件开发工程师，相信技术的力量能够改变世界，让生活变得更美好。',
        'about.mission.title': '我的理念',
        'about.mission.desc': '通过技术创新解决实际问题，编写高质量的代码，并与开发者社区分享经验。',
        'about.skills.title': '技术专长',
        'about.contact.title': '联系我',
        'about.contact.desc': '期待与您交流技术心得'
      },
      
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.archives': 'Archives',
        'nav.about': 'About',
        'nav.subtitle': 'Tech Blog & Development Insights',
        
        // Hero Section
        'hero.title.line1': 'Zhang Hongjian\'s',
        'hero.title.line2': 'Tech Universe',
        'hero.subtitle': 'Exploring innovative technologies and sharing development insights with the world',
        'hero.btn.primary': 'Explore Articles',
        'hero.btn.secondary': 'About Me',
        'hero.stats.years': 'Years Experience',
        'hero.stats.projects': 'Projects',
        'hero.stats.tech': 'Tech Stacks',
        
        // Features Section
        'features.title': 'What I Do',
        'features.subtitle': 'Professional software development and innovative technology solutions',
        'features.mobile.title': 'Mobile Development',
        'features.mobile.desc': 'Creating beautiful and performant mobile applications for iOS and Android platforms.',
        'features.mobile.meta': 'React Native • Flutter • Swift • Kotlin',
        'features.fullstack.title': 'Full Stack Development',
        'features.fullstack.desc': 'Building complete web applications from frontend user interfaces to backend services.',
        'features.fullstack.meta': 'React • Node.js • Python • Docker',
        'features.cloud.title': 'Cloud & DevOps',
        'features.cloud.desc': 'Scalable cloud infrastructure and automated deployment pipelines for modern applications.',
        'features.cloud.meta': 'AWS • Azure • Kubernetes • CI/CD',
        'features.ai.title': 'AI & Data Science',
        'features.ai.desc': 'Leveraging artificial intelligence and machine learning to solve complex problems.',
        'features.ai.meta': 'Python • TensorFlow • PyTorch • Data Analytics',
        
        // Blog Section
        'blog.title': 'Latest Articles',
        'blog.viewall': 'View All Posts',
        'blog.readmore': 'Continue Reading',
        'blog.category': 'Category',
        
        // CTA Section
        'cta.title': 'Stay Connected',
        'cta.subtitle': 'Subscribe to get updates about new articles, projects, and insights from my development journey.',
        'cta.input.placeholder': 'Enter your email address',
        'cta.btn': 'Subscribe',
        'cta.privacy': 'No spam, unsubscribe anytime. Privacy respected.',
        
        // Footer
        'footer.categories': 'Categories',
        'footer.contact.title': 'Get in Touch',
        'footer.contact.desc': 'Have technical questions to discuss? Feel free to reach out and connect.',
        'footer.contact.btn': 'Send Email',
        'footer.copyright': 'Crafted with code and creativity.',
        'footer.powered': 'Powered by technical passion and continuous learning',
        
        // Categories
        'categories.mobile': 'Mobile Development',
        'categories.fullstack': 'Full Stack Development',
        'categories.cloud': 'Cloud & DevOps', 
        'categories.ai': 'AI & Data Science',
        
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'theme.light': 'Light Mode',
        'theme.dark': 'Dark Mode',
        'lang.switch': 'Switch Language',
        
        // About Page
        'about.title': 'About Zhang Hongjian',
        'about.subtitle': 'Software Developer & Technology Enthusiast',
        'about.intro': 'Hello, I\'m Zhang Hongjian',
        'about.description': 'I\'m a passionate software developer who believes in the power of technology to change the world and make life better.',
        'about.mission.title': 'My Philosophy',
        'about.mission.desc': 'To solve real problems through technological innovation, write high-quality code, and share experiences with the developer community.',
        'about.skills.title': 'Technical Expertise',
        'about.contact.title': 'Contact Me',
        'about.contact.desc': 'Looking forward to exchanging technical insights with you'
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