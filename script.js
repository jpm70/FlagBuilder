// Función principal para manejar los cifrados
function cipher(type) {
    const inputText = document.getElementById('inputText').value;
    let outputText = '';

    switch (type) {
        case 'rot13':
            outputText = rot13(inputText);
            break;
        case 'base64':
            outputText = btoa(inputText); // Codifica a Base64
            break;
        case 'base32':
            outputText = base32.encode(inputText); // Requiere una librería externa
            break;
        case 'hex':
            outputText = toHex(inputText);
            break;
        case 'binary':
            outputText = toBinary(inputText);
            break;
        case 'url':
            outputText = encodeURIComponent(inputText);
            break;
        case 'reverse':
            outputText = inputText.split('').reverse().join('');
            break;
        case 'xor':
            const xorKey = document.getElementById('xorKey').value;
            if (xorKey) {
                outputText = xor(inputText, xorKey);
            } else {
                alert('Por favor, introduce una clave para XOR.');
                return;
            }
            break;
    }

    document.getElementById('outputText').value = outputText;
}

// Implementaciones de los cifrados
function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
}

function xor(str, key) {
    let output = '';
    for (let i = 0; i < str.length; i++) {
        output += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return output;
}

function toHex(str) {
    return Array.from(str).map(c => 
        c.charCodeAt(0).toString(16).padStart(2, '0')
    ).join('');
}

function toBinary(str) {
    return Array.from(str).map(c => 
        c.charCodeAt(0).toString(2).padStart(8, '0')
    ).join(' ');
}

// Esteganografía básica (lectura de imagen como datos binarios)
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const arrayBuffer = event.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        const binaryString = Array.from(uint8Array).map(b => 
            b.toString(2).padStart(8, '0')
        ).join(' ');
        document.getElementById('imageBinaryOutput').value = binaryString;
    };
    reader.readAsArrayBuffer(file);
});

// Función para copiar el resultado al portapapeles
function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    alert('Texto copiado al portapapeles!');
}