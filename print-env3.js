console.log(Object.keys(process.env).map(k => `${k}=${process.env[k]}`).join('\n'));
