"use strict";

const file = (()=>{

    // aタグを使ったダウンロード
    const handler_download_json_file = (e)=>{

        const o = { a:100, b:200, };

        let blob = new Blob( [JSON.stringify(o)], { "type": "text/plain" } );

        document.querySelector("#test01").download = "test.json";
        document.querySelector("#test01").href = window.URL.createObjectURL( blob );

        e.stopPropagation();
    }

    const init =()=>{
        document.querySelector("#test01").addEventListener("click",handler_download_json_file);
    }

    return {
        init:init,
    }
})();
window.addEventListener("load", ()=>{file.init();});
