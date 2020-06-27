
//do some weird sorcery shit to convert the buffer to image url
const bufferToImage = (buffer) => {
    const arrayBufferView = new Uint8Array(buffer);
    const blob = new Blob([arrayBufferView], { type: "image/png" });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);

    return imageUrl;
}

export default bufferToImage;