const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    // .setManifestKeyPrefix('build/')

    .addEntry('app', './assets/app.js')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
    .enableVueLoader(() => {}, { runtimeCompilerBuild: false })
    .enablePostCssLoader()

    .enableEslintLoader(() => {
        const options = {};

        if (Encore.isProduction()) {
            options.failOnError = true;
        }

        return options;
    }, {
        lintVue: true,
    });

// enables Sass/SCSS support
// .enableSassLoader()

// uncomment if you use TypeScript
// .enableTypeScriptLoader()

// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
// .enableIntegrityHashes(Encore.isProduction())

// the line below is added to allow configuring the api endpoint to use either comiteo or mockapi via the script args
Encore.configureDefinePlugin((options) => {
    const globalConf = JSON.stringify({ apiEndpoint: process.argv[3].slice(2) || 'mockapi' });
    options.GLOBAL_CONFIG = globalConf;
});
module.exports = Encore.getWebpackConfig();
