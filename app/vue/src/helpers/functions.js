export function isEmptyObject(obj) {
    if (obj === null || obj === undefined) {
        return true;
    }

    return Object.keys(obj).length === 0;
}

export function isEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export function getAdminDir() {
    return '/' + (process.env.VUE_APP_ADMIN_DIR ?? 'admin');
}

export function setGetParam(key,value) {
    if (history.pushState) {
        let params = new URLSearchParams(window.location.search);

        if (value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        
        let newUrl = window.location.origin
            + window.location.pathname
            + '?' + params.toString();
        window.history.pushState({path:newUrl},'',newUrl);
    }
}

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export function ckeditorConfig() {
    return {
        toolbarGroups : [
            { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
            { name: 'forms', groups: [ 'forms' ] },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
            { name: 'links', groups: [ 'links' ] },
            { name: 'insert', groups: [ 'insert' ] },
            { name: 'styles', groups: [ 'styles' ] },
            { name: 'colors', groups: [ 'colors' ] },
            { name: 'tools', groups: [ 'tools' ] },
            { name: 'others', groups: [ 'others' ] },
            { name: 'about', groups: [ 'about' ] }
        ],
        removeButtons: 'NewPage,Print,Save,Templates,Replace,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Anchor,Flash,Smiley,PageBreak,ShowBlocks,About,Language,Iframe,Image',
    };
}