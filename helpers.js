




function memoryString(byteLen) {

    let mem = byteLen / 1024 / 1024;
    if (mem.toFixed() >= 1000) {

        mem = (mem / 1024)
            .toFixed(2);
        return `${mem}GB`;
    }
    mem = mem.toFixed(2);
    return `${mem}MB`;
}

function timeString(time, style = 1) {
    const date = new Date(time);
    const month = (date.getMonth() + 1)
        .toString()
        .length > 1 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`;
    const day = date.getDate()
        .toString()
        .length > 1 ? date.getDate() : `0${date.getDate()}`;
    const hour = date.getHours()
        .toString()
        .length > 1 ? date.getHours() : `0${date.getHours()}`;
    const minute = date.getMinutes()
        .toString()
        .length > 1 ? date.getMinutes() : `0${date.getMinutes()}`;
    const second = date.getSeconds()
        .toString()
        .length > 1 ? date.getSeconds() : `0${date.getSeconds()}`;
    let milliseconds = date.getMilliseconds().toString();
    if (milliseconds.length === 2) {
        milliseconds = `0${milliseconds}`;
    } else if (milliseconds.length === 1) {
        milliseconds = `00${milliseconds}`;
    }

    if (style === 1) {
        return `${month}/${day} ${hour}:${minute}:${second}`;
    }

    if (style === 2) {
        return `${month}-${day} ${hour}:${minute}:${second}.${milliseconds}`;
    }
}

function totalUptimeString(time) {
    const diff = Date.now() - time;
    const seconds = Math.round(diff / 1000);
    if (seconds < 60) {
        return `${seconds}s`;
    }
    const minutes = Math.round(diff / 1000 / 60);
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.round(diff / 1000 / 60 / 60);
    if (hours < 24) {
        return `${hours}h`;
    }
    const days = Math.round(diff / 1000 / 60 / 60 / 24);
    return `${days}d`;
}



module.exports.timeString = timeString;
module.exports.totalUptimeString = totalUptimeString;
module.exports.memoryString = memoryString;

