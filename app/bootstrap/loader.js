import fs from 'fs';

const autoload = (dir, app) => {
    fs.readdirSync(dir).forEach((file) => {
        if (file.indexOf('.js') === -1) {
            return;
        }

        const path = `${dir}/${file}`;
        const stats = fs.lstatSync(path);

        if (stats.isDirectory()) {
            autoload(path, app);
        } else {
            const a = require(path);
            a(app);
        }
    });
};

export default {
    autoload,
};
