module.exports = {
    webpackDevMiddleware: config => {
        /**
         * poll the files every 300ms in order to fix next not rendering updates
         * when used inside a container. If still not updating the changes,
         * manually kill the client pod and the deployment will provide a new one
         */
        config.watchOptions.poll = 300

        return config
    }
}