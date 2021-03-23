# jQuery Table To Csv - Plugin

![](/media/preview.png)

Basic jQuery plugin to convert HTML Tables to a CSV file.

## Dependencies

* jQuery

## Usage and Parameters

### Basic Initialization
```
$('TABLE').tableToCsv({
    filename: 'mydata.csv'
});
```

### Parameters
| Parameter | Type | Default | Required | Description|
|    ---    | ---  |  ---    |  ---     |     ---    |
| filename | *string* | ``` null ``` | ✔️/✖️ | Name of the CSV file, required if autoDownload is enabled.|
| separator | *string* | ``` ',' ``` | ✖️ | CSV field separator token |
| colspanMode | *string* | ``` 'empty' ``` | ✖️ | Colspan mode, can be: empty or replicate |
| autoDownload | *boolean* | ``` true ``` | ✖️ | If true, auto starts a download after conversion, otherwise, returns the csv content |
| fn_onInit | *function* | ``` null ``` | ✖️ | Called before proccess start |
| fn_onComplete | *function* | ``` null ``` | ✖️ | Called before download/return csv content |
| fn_onError | *function* | ``` null ``` | ✖️ | Called when a error occurs on the proccess |