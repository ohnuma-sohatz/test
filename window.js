  window.addEventListener('load', function(){
    const config = window.difyChatbotConfig || {};
    const checkInterval = setInterval(function(){
      if (!config.autoRestoreOnNavigation) return; // ← オフなら即終了
      const button = document.getElementById('dify-chatbot-bubble-button');
      const widget = document.getElementById('dify-chatbot-bubble-window');
      const chatWidgetState = localStorage.getItem("chatWidgetOpen");

      if (button) {
        clearInterval(checkInterval);
        if(chatWidgetState === "block" && (!widget || widget.style.display !== 'block')){
          button.click();
        }
      }
    }, 10);
  });
