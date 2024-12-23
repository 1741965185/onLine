export function aHrefToDownload(result, fileName) {
	const blob = new Blob([result], { type: "application/vnd.ms-excel;charset=utf-8" });
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	link.click();
	URL.revokeObjectURL(url);
}