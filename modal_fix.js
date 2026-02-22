<script>
// 简化的模态框修复脚本
(function() {
    'use strict';
    
    // 等待页面完全加载
    function waitForElements() {
        const requiredElements = [
            'login-btn', 'register-btn', 'mobile-login-btn', 'mobile-register-btn',
            'login-modal', 'register-modal'
        ];
        
        const allExist = requiredElements.every(id => document.getElementById(id));
        
        if (allExist) {
            console.log('✅ 所有必需元素已就绪，开始绑定事件');
            bindModalEvents();
        } else {
            console.log('⏳ 等待元素加载...');
            setTimeout(waitForElements, 100);
        }
    }
    
    // 绑定模态框事件
    function bindModalEvents() {
        // 显示模态框函数
        window.showModal = function(modalId) {
            console.log('🎯 尝试显示模态框:', modalId);
            const modal = document.getElementById(modalId);
            const modalContent = modal?.querySelector('div');
            
            if (!modal) {
                console.error('❌ 找不到模态框:', modalId);
                return;
            }
            
            console.log('✅ 找到模态框，开始显示');
            modal.classList.remove('hidden');
            
            // 触发动画
            setTimeout(() => {
                if (modalContent) {
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                }
            }, 10);
        };
        
        // 隐藏模态框函数
        window.hideModal = function(modalId) {
            const modal = document.getElementById(modalId);
            const modalContent = modal?.querySelector('div');
            
            if (modalContent) {
                modalContent.style.transform = 'scale(0.95)';
                modalContent.style.opacity = '0';
            }
            
            setTimeout(() => {
                modal?.classList.add('hidden');
            }, 300);
        };
        
        // 绑定按钮事件
        const eventBindings = [
            { button: 'login-btn', modal: 'login-modal' },
            { button: 'mobile-login-btn', modal: 'login-modal' },
            { button: 'register-btn', modal: 'register-modal' },
            { button: 'mobile-register-btn', modal: 'register-modal' },
            { button: 'close-login-modal', action: () => hideModal('login-modal') },
            { button: 'close-register-modal', action: () => hideModal('register-modal') }
        ];
        
        eventBindings.forEach(binding => {
            const element = document.getElementById(binding.button);
            if (element) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('🖱️ 点击了按钮:', binding.button);
                    
                    if (binding.modal) {
                        showModal(binding.modal);
                    } else if (binding.action) {
                        binding.action();
                    }
                });
                console.log('✅ 已绑定事件:', binding.button);
            } else {
                console.warn('⚠️ 未找到元素:', binding.button);
            }
        });
        
        // 点击背景关闭模态框
        ['login-modal', 'register-modal'].forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        console.log('🖱️ 点击背景关闭:', modalId);
                        hideModal(modalId);
                    }
                });
            }
        });
        
        console.log('🎉 模态框事件绑定完成！');
    }
    
    // 启动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForElements);
    } else {
        waitForElements();
    }
})();
</script>