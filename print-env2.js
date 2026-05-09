console.log(Object.keys(process.env).filter(k => k.startsWith('VITE_')).map(k => `${k}=${process.env[k]}`).join('\n'));
