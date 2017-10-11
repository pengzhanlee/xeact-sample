
/**
 * 子系统名匹配
 */
export let systemFlagRegex = /^\/([\w-\d]+)/;

export function getSystemFlag (url) {
    try{
        return url.match(systemFlagRegex)[1];
    }catch(e){
        return '';
    }
}

