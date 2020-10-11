
const ps = require('ps-node');
const http = require('http');
const os = require('os');
const osUtil = require('os-utils');

const hostname = os.hostname();
const cpus = os.cpus().length;
const totalmemNum = os.totalmem();

const nodev = process.version;
const godid = process.pid;
const {
    timeString,
    totalUptimeString,
    memoryString
} = require('./helpers');
const totalmem = memoryString(os.totalmem());
function getCpuUsage() {
    return new Promise(resolve => {
        osUtil.cpuUsage(val => {
            resolve(Math.round(val * 100));
        });
    });
}

const pm2 = require('pm2');
class pm2API{
    #emptyParam = 'Не указано имя приложения';
    connectPM2(){
        return new Promise((resolve, reject)=>{
            pm2.connect(function(err){
                if(err){
                    return reject(err);
                }
                return resolve(pm2);
            });
        })
    }
    async listPm2(){
        const connect = await this.connectPM2();
        return new Promise(resolve => {
            connect.list((err, data) => {
                if (err) {
                    return resolve([]);
                }
                resolve(data);
            });
        });
    }
    async restartPm2(appName = ''){
        const connect = await this.connectPM2();
        return new Promise(resolve => {
            connect.restart(appName,(err, data) => {
                if (err) {
                    return resolve([]);
                }
                resolve(data);
            });
        });
    }
    async stopPm2(appName = ''){
        const connect = await this.connectPM2();
        return new Promise(resolve => {
            connect.stop(appName,(err, data) => {
                if (err) {
                    return resolve([]);
                }
                resolve(data);
            });
        });
    }

    async list(){
        const info = await this.listPm2(),
              le = info.length;  
        if(le == 0){
            return [];
        }
        const result = [];
        for(let i = 0; i < le; i++){
            const t = info[i];
            const memory = t.monit ? Number(t.monit.memory) : 0;
            const cpu = t.monit ? Math.min(parseInt(t.monit.cpu), 100) : 0;
            let mode = t.pm2_env.exec_mode;
            if (mode.indexOf('_mode') > 0) {
                mode = mode.substring(0, mode.indexOf('_mode'));
            }
            let processUptime = '-';
            if (t.pm2_env.status === 'online') {
                processUptime = timeString(t.pm2_env.pm_uptime);
            }
            result.push({
                name: t.name,
                mode,
                pmid: t.pm_id,
                pid: t.pid,
                memory: memoryString(memory),
                cpu: `${cpu}%`,
                uptime: processUptime,
                restart: t.pm2_env.restart_time,
                status: t.pm2_env.status,
                user: t.pm2_env.username
            });
        }
        return result;
        
    }
    async restart(appName = ''){
        if(appName === ''){
            return Promise.reject(this.#emptyParam);
        }
        return this.restartPm2(appName);
    }
    async stop(appName = ''){
        if(appName === ''){
            return Promise.reject(this.#emptyParam);
        }
        return this.stopPm2(appName);
    }
}


module.exports.pm2API = pm2API;
// const result = new pm2API();

// result.list().then(function(data){
//     console.log(data);
// });

// result.restart('index').then(function(data){
//     console.log(data);
// });

// result.stop('index').then(function(data){
//     console.log(data);
// });