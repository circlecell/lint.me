export const linterName = process.env.NODE_ENV === 'production' ?
    document.domain.replace(/(\w+)\.eslint\.io/, '$1') : 'html';

export default new Promise((resolve, reject) => {
    switch (linterName) {
    case 'style':
    case 'css': {
        require.ensure([], require => resolve(require('./css').default), 'css-linter');
        break;
    }
    case 'html': {
        require.ensure([], require => resolve(require('./html').default), 'html-linter');
        break;
    }
    default: {
        reject(new Error(`Linter with name "${linterName}" isn't found`));
    }
    }
});
