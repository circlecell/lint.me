module.exports = webpack => [
    require('postcss-import')({
        //path: './css/*.css',
        addDependencyTo: webpack
    }),
    require('postcss-nesting')(),
    require('postcss-cssnext')(),
    require('postcss-calc')()
];
