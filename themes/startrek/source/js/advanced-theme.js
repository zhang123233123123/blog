/* ==========================================================================
   Advanced Theme System - Interstellar Design
   ========================================================================== */

class InterstellarTheme {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.themes = {
      light: {
        name: 'Day Cycle',
        icon: 'sun',
        colors: {
          '--bg-primary': '#F8F9FA',
          '--bg-secondary': '#E9ECEF',
          '--bg-tertiary': '#DEE2E6',
          '--surface-glass': 'rgba(248, 249, 250, 0.8)',
          '--surface-card': 'rgba(255, 255, 255, 0.95)',
          '--text-primary': '#212529',
          '--text-secondary': '#6C757D',
          '--text-tertiary': '#ADB5BD',
          '--border-primary': 'rgba(233, 69, 96, 0.3)',
          '--border-secondary': 'rgba(108, 117, 125, 0.2)',
          '--space-gradient': 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 50%, #DEE2E6 100%)',
          '--star-white': '#212529'
        }
      },
      dark: {
        name: 'Deep Space',
        icon: 'moon',
        colors: {
          '--bg-primary': '#0A0A0A',
          '--bg-secondary': '#1A1A2E',
          '--bg-tertiary': '#16213E',
          '--surface-glass': 'rgba(26, 26, 46, 0.8)',
          '--surface-card': 'rgba(22, 33, 62, 0.9)',
          '--text-primary': '#F8F9FA',
          '--text-secondary': '#ADB5BD',
          '--text-tertiary': '#6C757D',
          '--border-primary': 'rgba(233, 69, 96, 0.2)',
          '--border-secondary': 'rgba(108, 117, 125, 0.1)',
          '--space-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)',
          '--star-white': '#F8F9FA'
        }
      },
      cosmic: {
        name: 'Cosmic Void',
        icon: 'stars',
        colors: {
          '--bg-primary': '#000000',
          '--bg-secondary': '#0D1B2A',
          '--bg-tertiary': '#1B263B',
          '--surface-glass': 'rgba(13, 27, 42, 0.8)',
          '--surface-card': 'rgba(27, 38, 59, 0.9)',
          '--text-primary': '#FFFFFF',
          '--text-secondary': '#E0E1DD',
          '--text-tertiary': '#778DA9',
          '--border-primary': 'rgba(233, 69, 96, 0.3)',
          '--border-secondary': 'rgba(119, 141, 169, 0.2)',
          '--space-gradient': 'linear-gradient(135deg, #000000 0%, #0D1B2A 50%, #1B263B 100%)',
          '--star-white': '#FFFFFF'
        }
      }
    };
    this.init();
  }

  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  getStoredTheme() {
    return localStorage.getItem('interstellar-theme');
  }

  setTheme(theme) {
    if (!this.themes[theme]) return;
    
    this.currentTheme = theme;
    localStorage.setItem('interstellar-theme', theme);
    
    // 应用主题颜色
    this.applyThemeColors(theme);
    
    // 更新HTML数据属性
    document.documentElement.setAttribute('data-theme', theme);
    
    // 更新图标
    this.updateThemeIcon();
    
    // 触发自定义事件
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme, colors: this.themes[theme].colors }
    }));
    
    // 添加切换动画
    this.addThemeTransition();
  }

  applyThemeColors(theme) {
    const colors = this.themes[theme].colors;
    const root = document.documentElement;
    
    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }

  updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const lightIcon = themeToggle.querySelector('.theme-icon-light');
    const darkIcon = themeToggle.querySelector('.theme-icon-dark');
    
    if (lightIcon && darkIcon) {
      // 重置所有图标
      lightIcon.style.display = 'none';
      darkIcon.style.display = 'none';
      
      // 显示对应图标
      if (this.currentTheme === 'light') {
        darkIcon.style.display = 'block';
      } else {
        lightIcon.style.display = 'block';
      }
    }
    
    // 更新按钮标题
    const themeName = this.themes[this.currentTheme].name;
    themeToggle.setAttribute('title', `Switch to ${themeName}`);
  }

  addThemeTransition() {
    document.body.style.transition = 'all 0.3s ease-in-out';
    
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  cycleTheme() {
    const themes = Object.keys(this.themes);
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    this.setTheme(nextTheme);
  }

  // 添加时间自适应主题
  enableAutoTheme() {
    const now = new Date();
    const hour = now.getHours();
    
    let autoTheme;
    if (hour >= 6 && hour < 18) {
      autoTheme = 'light'; // 白天
    } else if (hour >= 18 && hour < 22) {
      autoTheme = 'dark'; // 傍晚
    } else {
      autoTheme = 'cosmic'; // 深夜
    }
    
    this.setTheme(autoTheme);
  }

  // 添加基于滚动位置的主题
  enableScrollTheme() {
    let ticking = false;
    
    const updateThemeByScroll = () => {
      const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
      
      if (scrollProgress < 0.33) {
        this.setTheme('light');
      } else if (scrollProgress < 0.66) {
        this.setTheme('dark');
      } else {
        this.setTheme('cosmic');
      }
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateThemeByScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // 添加主题预览功能
  previewTheme(theme, duration = 2000) {
    const originalTheme = this.currentTheme;
    this.setTheme(theme);
    
    setTimeout(() => {
      this.setTheme(originalTheme);
    }, duration);
  }

  // 获取当前主题信息
  getCurrentTheme() {
    return {
      name: this.currentTheme,
      config: this.themes[this.currentTheme]
    };
  }

  // 添加自定义主题
  addCustomTheme(name, config) {
    this.themes[name] = config;
  }

  // 创建主题选择器
  createThemeSelector() {
    const selector = document.createElement('div');
    selector.className = 'theme-selector';
    selector.innerHTML = `
      <div class="theme-selector-content">
        <h3>Choose Theme</h3>
        <div class="theme-options">
          ${Object.entries(this.themes).map(([key, theme]) => `
            <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
                    data-theme="${key}">
              <div class="theme-preview" style="background: ${theme.colors['--bg-primary']};">
                <div class="theme-preview-accent" style="background: ${theme.colors['--text-primary']};"></div>
              </div>
              <span>${theme.name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    // 添加事件监听
    selector.addEventListener('click', (e) => {
      const option = e.target.closest('.theme-option');
      if (option) {
        const theme = option.dataset.theme;
        this.setTheme(theme);
        
        // 更新激活状态
        selector.querySelectorAll('.theme-option').forEach(opt => {
          opt.classList.remove('active');
        });
        option.classList.add('active');
      }
    });
    
    return selector;
  }

  init() {
    // 应用初始主题
    this.setTheme(this.currentTheme);
    
    // 监听主题切换按钮
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.cycleTheme();
      });
      
      // 长按显示主题选择器
      let longPressTimer;
      themeToggle.addEventListener('mousedown', () => {
        longPressTimer = setTimeout(() => {
          const selector = this.createThemeSelector();
          document.body.appendChild(selector);
          
          // 点击外部关闭
          setTimeout(() => {
            const closeSelector = (e) => {
              if (!selector.contains(e.target)) {
                selector.remove();
                document.removeEventListener('click', closeSelector);
              }
            };
            document.addEventListener('click', closeSelector);
          }, 100);
        }, 1000);
      });
      
      themeToggle.addEventListener('mouseup', () => {
        clearTimeout(longPressTimer);
      });
    }
    
    // 监听系统主题变化
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('interstellar-theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
    
    // 添加CSS样式
    this.addThemeStyles();
  }

  addThemeStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .theme-selector {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        background: var(--surface-glass);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-primary);
        border-radius: var(--radius-planet);
        padding: var(--space-organism);
        min-width: 300px;
        animation: themeSelector-in 0.3s var(--ease-time-dilation);
      }
      
      @keyframes themeSelector-in {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
      
      .theme-selector-content h3 {
        margin: 0 0 var(--space-organism) 0;
        font-family: var(--font-display);
        color: var(--text-primary);
        text-align: center;
      }
      
      .theme-options {
        display: grid;
        gap: var(--space-molecule);
      }
      
      .theme-option {
        display: flex;
        align-items: center;
        gap: var(--space-molecule);
        padding: var(--space-molecule);
        background: var(--surface-card);
        border: 1px solid var(--border-secondary);
        border-radius: var(--radius-organism);
        cursor: pointer;
        transition: all var(--time-moment) var(--ease-time-dilation);
        font-family: var(--font-primary);
        color: var(--text-primary);
      }
      
      .theme-option:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-light);
        border-color: var(--border-primary);
      }
      
      .theme-option.active {
        border-color: var(--cooper-orange);
        box-shadow: var(--shadow-gravity);
      }
      
      .theme-preview {
        width: 32px;
        height: 32px;
        border-radius: var(--radius-organism);
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .theme-preview-accent {
        position: absolute;
        top: 4px;
        right: 4px;
        bottom: 4px;
        left: 4px;
        border-radius: inherit;
        opacity: 0.3;
      }
      
      .theme-toggle-enhanced {
        position: relative;
        overflow: hidden;
      }
      
      .theme-toggle-enhanced::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, var(--golden-hour), transparent);
        transition: all var(--time-second) var(--ease-wormhole);
        border-radius: 50%;
        pointer-events: none;
      }
      
      .theme-toggle-enhanced:active::after {
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        opacity: 0.2;
      }
    `;
    document.head.appendChild(style);
  }
}

// 全局实例
window.interstellarTheme = new InterstellarTheme();

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InterstellarTheme;
}