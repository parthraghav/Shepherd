export const getDisplayableTime = (prevTime : number) => {
    const currTime = new Date().getTime();
    const delta = currTime - prevTime;
    const seconds = delta/1000;
    const minutes = seconds/60;
    const hours = minutes/60;
    const days = hours/24;
    const months = days/31;
    const years = days/365;

    let descriptor;

    if ( years >= 2 ) {
        descriptor = "a few years";
    } else if ( years >= 1 ) {
        descriptor = "a year";
    } else if ( months >= 2 ) {
        descriptor = "a few months";
    } else if ( months >= 1 ) {
        descriptor = "a month"
    } else if ( days >= 14 ) {
        descriptor = "a few weeks"
    } else if ( days >= 7 ) {
        descriptor = "a week"
    } else if ( days >= 2 ) {
        descriptor = "a few days"
    } else if ( days >= 1 ) {
        descriptor = "a day"
    } else if ( hours >= 2 ) {
        descriptor = "a few hours"
    } else if ( hours >= 1 ) {
        descriptor = "an hour"
    } else if ( minutes >= 2 ) {
        descriptor = "a few minutes"
    } else if ( minutes >= 1 ) {
        descriptor = "a minute"
    } else if ( seconds > 10 ) {
        descriptor = "a few seconds"
    } else {
        return "now";
    }
    
    if (delta > 0) {
        return descriptor + " ago"
    } else {
        return "in " + descriptor
    }

}