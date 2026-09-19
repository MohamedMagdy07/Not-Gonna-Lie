
export function msToSeconds(ms){
    return ms/1000;
}

export function msToMinutes(ms){
    return msToSeconds(ms)*60;
}

export function secToMs(sec){
    return sec*1000;
}
export function minutesToMs(minutes){
    return secToMs(minutes)*60;
}