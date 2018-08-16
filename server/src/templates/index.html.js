module.exports = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>${process.env.NODE_ENV === 'production' ? 'API Portal' : 'My Portal'}</title>
    </head>

    <body>
        <div id="app"></div>

        <script type="text/javascript" src="${process.env.STATIC_SERVER}common.js"></script>
        <script type="text/javascript" src="${process.env.APP_ROOT}/apiPortal.js"></script>
    </body>
</html>`
