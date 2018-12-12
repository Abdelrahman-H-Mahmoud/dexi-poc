function formatResults(res) {
    let headers = res.headers;
    let rows = res.rows;
    let data = rows.map((item) => {
        let obj = {}
        item.forEach((col, index) => {
            let key = headers[index];
            key = key.replace(/( +?|-)/g, '_').toLowerCase();
            obj[key] = col;
        });
        return obj;
    });
    return { rows: data, totalRows: res.totalRows };
}

module.exports = {
    formatResults
}