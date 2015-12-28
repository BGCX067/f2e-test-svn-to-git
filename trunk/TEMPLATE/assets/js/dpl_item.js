(function() {
    window.onload = function() {
        var toggleHtml = document.getElementById("toggle-html"),
                toggleCss = document.getElementById("toggle-css"),
                toggleJs = document.getElementById("toggle-js"),
                codeHtml = document.getElementById("code-html"),
                codeCss = document.getElementById("code-css"),
                codeJs = document.getElementById("code-js");

        if (toggleHtml && codeHtml) {
            toggleHtml.onclick = (function() {
                var flag = true;
                return function() {
                    if (flag) {
                        codeHtml.innerHTML = document.getElementById("effect").innerHTML.replace(/&/mg, "&amp;").replace(/</mg, "&lt;");
                        flag = false;
                    }
                    codeHtml.style.display = (codeHtml.style.display == "block") ? "none" : "block";
                };
            })();
            codeHtml.style.display = "none";
        }

        if (toggleCss && codeCss) {
            toggleCss.onclick = (function() {
                var flag = true;
                return function() {
                    if (flag) {
                        codeCss.innerHTML = document.getElementById("style").innerHTML.replace(/&/mg, "&amp;").replace(/</mg, "&lt;");
                        flag = false;
                    }
                    codeCss.style.display = (codeCss.style.display == "block") ? "none" : "block";
                };
            })();
            codeCss.style.display = "none";
        }

        if (toggleJs && codeJs) {
            toggleJs.onclick = (function() {
                var flag = true;
                return function() {
                    if (flag) {
                        codeJs.innerHTML = document.getElementById("script").innerHTML.replace(/&/mg, "&amp;").replace(/</mg, "&lt;");
                        flag = false;
                    }
                    codeJs.style.display = (codeJs.style.display == "block") ? "none" : "block";
                };
            })();
            codeJs.style.display = "none";
        }

    };
})();