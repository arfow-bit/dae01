"use strict";

const project = (()=>{
    const local_file_name = "Github_local_storage_test";

    return {
        local_save_data_name:()=>{return local_file_name;},
    }
})();

const file = (()=>{

    const handler_local_load = (e)=>{
        let oProject = JSON.parse(window.localStorage.getItem(project.local_save_data_name()));

        if(oProject==null){
            console.log("handler_local_load(e)-> no storage data: "+project.local_save_data_name());
            return;
        }

        document.querySelector("#local_load").innerHTML = oProject.a;

        e.stopPropagation();
    }

    const handler_local_save=()=>{
        const o = { a:100, b:200, };
        let local_storage_data = JSON.stringify(o);

        window.localStorage.setItem( project.local_save_data_name(), local_storage_data );
    }

    const onload_file_reader = (e)=>{
        let oProject = JSON.parse( e.target.result );

        console.log( oProject );
    }

    const _reader = new FileReader();
    _reader.addEventListener( "load", onload_file_reader );

    const handler_upload_json_file_change = (e)=>{

        if( e.target.files.length != 0 ){
            _reader.readAsText( e.target.files[0] );

            document.querySelector("#upload_json_file_label").innerHTML = e.target.files[0].name.replace(".json","");
        }
        
        e.stopPropagation();
    }
    const handler_upload_json_file_cancel = (e)=>{

        if( e.target.files.length != 0 ){
            _reader.readAsText( e.target.files[0] );
   
            document.querySelector("#upload_json_file_label").innerHTML = e.target.files[0].name.replace(".json","");
        }

        e.stopPropagation();
    }

    // aタグを使ったダウンロード
    const handler_download_json_file = (e)=>{

        const o = { a:100, b:200, };

        let blob = new Blob( [JSON.stringify(o)], { "type": "text/plain" } );

        document.querySelector("#test01").download = "test.json";
        document.querySelector("#test01").href = window.URL.createObjectURL( blob );

        e.stopPropagation();
    }

    const init =()=>{
        document.querySelector("#local_load").addEventListener("click",handler_local_load);
        document.querySelector("#local_save").addEventListener("click",handler_local_save);
        document.querySelector("#test01").addEventListener("click",handler_download_json_file);
        document.querySelector("#upload_json_file").addEventListener("change",handler_upload_json_file_change);
        document.querySelector("#upload_json_file").addEventListener("cancel",handler_upload_json_file_cancel);
    }

    return {
        init:init,
    }
})();
window.addEventListener("load", ()=>{file.init();});
