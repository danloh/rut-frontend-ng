// store some constants

// regex
export const regUrl = /^(https?):\/\/([^/:]+)(:[0-9]+)?(\/.*)?$/;
export const regPsw = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@!~%^$&*-])[a-zA-Z\d#@!~%^$&*-]{8,18}$/;
export const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const regName = /^[\w-]{3,16}$/;
export const regTag = /[\n|\r|\s]#(\w+)/g; // /(?<=[\n|\r|\s])#(\w+)/g N/A SAFARI, FIREFOX
export const regUiid = /[-_ ]/g;
