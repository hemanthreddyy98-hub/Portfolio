// Modern Portfolio JavaScript with ES2022+ Features
'use strict';

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('🎯 LCP:', entry.startTime);
    }
    if (entry.entryType === 'first-input') {
      console.log('⚡ FID:', entry.processingStart - entry.startTime);
    }
  }
});

performanceObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

// Modern Web Components
class LoadingSpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #1e40af;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="spinner" role="status" aria-label="Loading"></div>
    `;
  }
}

class NotificationToast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['type', 'message'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          background: ${this.getTypeColor(type)};
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          max-width: 400px;
        }
        @keyframes slideIn {
          from { transform: translateX(100%) scale(0.8); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
        .toast-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .toast-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: all 0.2s ease;
          opacity: 0.8;
          margin-left: 1rem;
        }
        .toast-close:hover {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
          transform: scale(1.1);
        }
      </style>
      <div class="toast-content">
        <i class="fas fa-${this.getTypeIcon(type)}" aria-hidden="true"></i>
        <span>${message}</span>
        <button class="toast-close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    // Add event listeners
    const closeBtn = this.shadowRoot.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.remove());
  }

  getTypeColor(type) {
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    return colors[type] || colors.info;
  }

  getTypeIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };
    return icons[type] || icons.info;
  }
}

// Register Web Components
customElements.define('loading-spinner', LoadingSpinner);
customElements.define('notification-toast', NotificationToast);

// Modern Service Worker Registration with PWA Support
class PWAManager {
  constructor() {
    this.swRegistration = null;
    this.init();
  }

  async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker registered:', this.swRegistration);
        
        // Handle updates
        this.swRegistration.addEventListener('updatefound', () => {
          const newWorker = this.swRegistration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    }
  }

  showUpdateNotification() {
    const toast = document.createElement('notification-toast');
    toast.setAttribute('type', 'info');
    toast.setAttribute('message', 'New version available! Refresh to update.');
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 5000);
  }

  async requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('✅ Notification permission granted');
      }
    }
  }
}

// Modern Intersection Observer for Performance
class IntersectionManager {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    // Observe sections for navigation highlighting
    this.observeSections();
    
    // Observe elements for animations
    this.observeAnimations();
    
    // Observe images for lazy loading
    this.observeImages();
  }

  observeSections() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.getAttribute('id');
          
          navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
              link.classList.add('active');
              link.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' });
    
    sections.forEach(section => observer.observe(section));
  }

  observeAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });
    
    animatedElements.forEach(element => observer.observe(element));
  }

  observeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => observer.observe(img));
  }
}

// Modern Web Workers for Heavy Computations
class WorkerManager {
  constructor() {
    this.workers = new Map();
    this.init();
  }

  init() {
    // Particle system worker
    this.createParticleWorker();
    
    // Analytics worker
    this.createAnalyticsWorker();
  }

  createParticleWorker() {
    const particleWorker = new Worker('/js/particle-worker.js');
    this.workers.set('particle', particleWorker);
    
    particleWorker.onmessage = (event) => {
      if (event.data.type === 'particleUpdate') {
        this.updateParticleCanvas(event.data.particles);
      }
    };
  }

  createAnalyticsWorker() {
    const analyticsWorker = new Worker('/js/analytics-worker.js');
    this.workers.set('analytics', analyticsWorker);
    
    // Send analytics data
    analyticsWorker.postMessage({
      type: 'track',
      data: {
        page: window.location.pathname,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      }
    });
  }

  updateParticleCanvas(particles) {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
  }
}

// Modern State Management
class PortfolioState {
  constructor() {
    this.state = {
      currentSection: 'home',
      theme: 'light',
      animations: true,
      notifications: true
    };
    this.subscribers = new Set();
    this.init();
  }

  init() {
    // Load state from localStorage
    const savedState = localStorage.getItem('portfolioState');
    if (savedState) {
      this.state = { ...this.state, ...JSON.parse(savedState) };
    }
    
    // Apply initial state
    this.applyTheme();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
    this.saveState();
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  saveState() {
    localStorage.setItem('portfolioState', JSON.stringify(this.state));
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  toggleTheme() {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({ theme: newTheme });
  }
}

// Modern Form Handling with Validation
class FormManager {
  constructor() {
    this.forms = new Map();
    this.init();
  }

  init() {
    this.setupContactForm();
  }

  setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Modern form validation
    const validators = {
      name: (value) => value.length >= 2 ? null : 'Name must be at least 2 characters',
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Please enter a valid email',
      subject: (value) => value.length >= 5 ? null : 'Subject must be at least 5 characters',
      message: (value) => value.length >= 10 ? null : 'Message must be at least 10 characters'
    };

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const formData = new FormData(contactForm);
      const errors = [];
      
      // Validate all fields
      for (const [field, validator] of Object.entries(validators)) {
        const value = formData.get(field);
        const error = validator(value);
        if (error) errors.push({ field, message: error });
      }
      
      if (errors.length > 0) {
        this.showErrors(errors);
        return;
      }
      
      await this.submitForm(formData);
    });
  }

  showErrors(errors) {
    errors.forEach(error => {
      const toast = document.createElement('notification-toast');
      toast.setAttribute('type', 'error');
      toast.setAttribute('message', error.message);
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    });
  }

  async submitForm(formData) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
      submitBtn.innerHTML = '<loading-spinner></loading-spinner> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const toast = document.createElement('notification-toast');
      toast.setAttribute('type', 'success');
      toast.setAttribute('message', 'Message sent successfully! I\'ll get back to you soon.');
      document.body.appendChild(toast);
      
      document.getElementById('contactForm').reset();
      
      setTimeout(() => toast.remove(), 5000);
      
    } catch (error) {
      const toast = document.createElement('notification-toast');
      toast.setAttribute('type', 'error');
      toast.setAttribute('message', 'Failed to send message. Please try again.');
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 5000);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }
}

// Modern Performance Optimizations
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupScrollOptimization();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  setupImageOptimization() {
    // Use modern image formats
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.src.includes('.jpg') || img.src.includes('.png')) {
        // Convert to WebP if supported
        if (this.supportsWebP()) {
          img.src = img.src.replace(/\.(jpg|png)$/, '.webp');
        }
      }
    });
  }

  setupScrollOptimization() {
    let ticking = false;
    
    const updateOnScroll = () => {
      // Update scroll-based animations
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
}

// Modern Accessibility Manager
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      // Skip to main content
      if (event.key === 'Tab' && event.shiftKey && event.altKey) {
        event.preventDefault();
        document.querySelector('main')?.focus();
      }
      
      // Close modals with Escape
      if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('[data-modal="open"]');
        openModals.forEach(modal => {
          modal.setAttribute('data-modal', 'closed');
          modal.querySelector('[data-close]')?.focus();
        });
      }
    });
  }

  setupFocusManagement() {
    // Trap focus in modals
    const modals = document.querySelectorAll('[data-modal]');
    modals.forEach(modal => {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      modal.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      });
    });
  }

  setupScreenReaderSupport() {
    // Announce dynamic content changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const addedNode = mutation.addedNodes[0];
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            const ariaLive = addedNode.getAttribute('aria-live');
            if (ariaLive) {
              // Content will be announced automatically
            }
          }
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Initialize all managers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS with modern configuration
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    disable: 'mobile' // Disable on mobile for better performance
  });

  // Initialize all managers
  const pwaManager = new PWAManager();
  const intersectionManager = new IntersectionManager();
  const workerManager = new WorkerManager();
  const portfolioState = new PortfolioState();
  const formManager = new FormManager();
  const performanceManager = new PerformanceManager();
  const accessibilityManager = new AccessibilityManager();

  // Mobile navigation with modern accessibility
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth scrolling with modern API
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Modern navbar background change
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navbar.classList.remove('scrolled');
        } else {
          navbar.classList.add('scrolled');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(document.querySelector('.hero'));
  }

  // Request notification permission
  pwaManager.requestNotificationPermission();

  console.log('🚀 Modern Portfolio loaded successfully with latest technologies!');
  console.log('✨ Features: PWA, Web Components, Service Worker, Modern APIs, Performance Optimizations');
});

// Modern error handling
window.addEventListener('error', (event) => {
  console.error('❌ Global error:', event.error);
  
  const toast = document.createElement('notification-toast');
  toast.setAttribute('type', 'error');
  toast.setAttribute('message', 'Something went wrong. Please refresh the page.');
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 5000);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason);
  
  const toast = document.createElement('notification-toast');
  toast.setAttribute('type', 'error');
  toast.setAttribute('message', 'Network error. Please check your connection.');
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 5000);
});
