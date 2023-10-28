export default defineNitroPlugin((nitroApp) => {
    console.log('nitro plugin')
    // @ts-ignore
    nitroApp.hooks.hook('content:file:beforeParse', (file) => {
        console.log('Processing content')
        if (file._id.endsWith('.md')) {
            file.body = file.body.replaceAll('$', '#');
        }
    })
})