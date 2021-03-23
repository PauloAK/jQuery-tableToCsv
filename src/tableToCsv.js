(function($) {
    $.tableToCsv = {
        name: 'tableToCsv',
        version: '1.0',
        release: '2021-03-22',
        author: 'Paulo Kramer',
        site: 'https://www.paulokramer.com',
        documentation: 'https://github.com/PauloAK/jQuery-tableToCsv'
    };

    $.fn.tableToCsv = function(options) {
        var settings = $.extend({
            filename: null, // Set the filename to download, eg: filename.csv
            separator: ',', // Set the CSV separator token
            colspanMode: 'empty', // Set the colspan mode, can be empty or replicate
            autoDownload: true, // If it's true, the plugin auto downloads the csv, otherwise, returns the csv content
            fn_onInit: null, // Custom function called before start processing
            fn_onComplete: null, // Custom function called after processing, right before start download/return
            fn_onError: null // Custom function called on error
        }, options);

        let enabledColspanModes = [ 'empty', 'replicate' ];

        try {
            if (!this.is('table'))
                throw `Selected element isn't a table`;

            if (settings.autoDownload && !settings.filename.length)
                throw 'You need to specify a filename';

            if (enabledColspanModes.indexOf(settings.colspanMode) === -1)
                throw `You need to specify a valid colspan mode, available: ${enabledColspanModes.join(', ')}`;
            
            if (typeof settings.fn_onInit == "function") settings.fn_onInit();
            let $table = this;
            let csvString = _t2csv_parseTable($table, settings.separator);
            if (typeof settings.fn_onComplete == "function") settings.fn_onComplete();
            return settings.autoDownload ? _t2csv_download(csvString) : csvString;
        } catch (error) {
            console.error(`[${$.tableToCsv.name}::Error] ${error}`);
            if (typeof settings.fn_onError == "function") settings.fn_onError();
            return;
        }

        function _t2csv_parseTable(table)
        {
            const rows = table.find('tr');
            return [].slice.call(rows)
                .map(function(row) {
                    const cells = row.querySelectorAll('th,td');
                    return [].slice.call(cells)
                        .map(function(cell) {
                            return _t2csv_escapeContent(cell.textContent) + _t2csv_generateColSpan(cell);
                        })
                        .join(settings.separator);
                })
                .join('\n');
        }

        function _t2csv_generateColSpan(cell)
        {
            if (!cell.hasAttribute('colspan') )
                return '';
            colspanContent = ( settings.colspanMode === 'replicate' ? _t2csv_escapeContent(cell.textContent) : _t2csv_escapeContent(''));
            let colspanString = `${settings.separator}${colspanContent}`;
            return colspanString.repeat( (parseInt(cell.getAttribute('colspan')) - 1) );
        }

        function _t2csv_escapeContent(content)
        {
            content = content.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ').replace(/"/g, '""');
            return `"${content}"`;
        }

        function _t2csv_download(content) {
            let link = document.createElement('a');
            link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(content)}`);
            link.setAttribute('download', settings.filename);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
}(jQuery));