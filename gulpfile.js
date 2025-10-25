const path = require('path');
const gulp = require('gulp');
const fs = require('fs-extra');
const yargs = require('yargs');
const { execSync, exec } = require('child_process');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const eslint = require('eslint');

const args = yargs.argv;

const distFolder = 'dist';

gulp.task('clean', gulp.series(() => {
    return fs.remove(distFolder)
        .then(() => {
            return fs.readdir('.');
        })
        .then((files) => {
            const vsixFiles = files.filter(file => file.endsWith('.vsix'));
            if (vsixFiles.length > 0) {
                return Promise.all(vsixFiles.map(file => fs.remove(path.join('.', file))));
            }
        })
        .catch((err) => {
            console.error('Error during cleanup: ', err);
        });
}));

gulp.task('eslint', gulp.series((done) => {
    try {
        execSync('npx eslint "scripts/**/*.{ts,tsx}" --fix', {
            stdio: [null, process.stdout, process.stderr]
        });
        done();
    } catch (err) {
        console.error('ESLint failed: ', err);
        process.exit(1);
    }
}));

gulp.task('styles', gulp.parallel(async () => {
    execSync("node ./node_modules/sass/sass.js ./styles/attachmentGroup.scss ./dist/attachmentGroup.css", {
        stdio: [null, process.stdout, process.stderr]
    });
}, async () => {
    execSync("node ./node_modules/sass/sass.js ./styles/imageGallery.scss ./dist/imageGallery.css", {
        stdio: [null, process.stdout, process.stderr]
    });
}));

gulp.task('copy', gulp.series(() => {
    return gulp.src('node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js')
        .pipe(gulp.dest(distFolder));
}));

gulp.task('build', gulp.series(gulp.parallel('styles', 'eslint', 'copy'), () => {
    const option = args.release ? "-p" : "-d eval-source-map";
    execSync(`node ./node_modules/webpack-cli/bin/cli.js ${option}`, {
        stdio: [null, process.stdout, process.stderr]
    });
    return gulp.src("*.html")
        .pipe(gulp.dest(distFolder));
}));

gulp.task('package', gulp.series('clean', 'build', async () => {
    const overrides = {};
    if (args.release) {
        overrides.public = true;
    } else {
        const manifest = require('./vss-extension.json');
        overrides.name = manifest.name + ": Development Edition";
        overrides.id = manifest.id + "-dev";
    }
    const overridesArg = `--override "${JSON.stringify(overrides).replace(/"/g, '\\"')}"`;
    const manifestsArg = `--manifests vss-extension.json`;

    exec(`tfx extension create ${overridesArg} ${manifestsArg} --rev-version`,
        (err, stdout, stderr) => {
            if (err) {
                console.log('Error: ', err);
            }
            console.log('Output: ', stdout);
            console.log('Error Output: ', stderr);
        });
}));

gulp.task('default', gulp.series('package'));
