export const initClarity = (projectId) => {
    if (!projectId) {
        console.warn("Clarity Project ID is missing");
        return;
    }
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", projectId);

    // Set custom variable as requested
    if (window.clarity) {
        window.clarity("set", "mail", "kdharsh24@gmail.com");
    }
};

export const getClarityInfo = () => {
    const getCookie = (name) => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };
    
    return {
        clarityUserId: getCookie('_clck'),
        claritySessionId: getCookie('_clsk'),
        mail: "kdharsh24@gmail.com"
    };
};

export const waitForClarityInfo = (callback) => {
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds max
    
    const check = () => {
        attempts++;
        const info = getClarityInfo();
        
        if ((info.clarityUserId && info.claritySessionId) || attempts >= maxAttempts) {
            callback(info);
        } else {
            setTimeout(check, 500);
        }
    };
    
    check();
};
