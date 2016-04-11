const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64encoder: number[] = [];
const base64decoder: number[] = [];
for (let i = 0; i < base64chars.length; i++) {
    base64decoder[base64chars.charCodeAt(i)] = i;
    base64encoder[i] = base64chars.charCodeAt(i);
}

export function encode(buffer: number[]): string {
    const parts: string[] = [];
    for (let i = 0; i < buffer.length; i++) {
        const data = buffer[i];
        let unsigned = data < 0 ? (-data << 1) + 1 : data << 1;
        do {
            let part = unsigned & 31;
            unsigned >>>= 5;
            if (unsigned > 0) {
                part |= 32;
            }
            parts.push(base64chars.charAt(part));
        } while (unsigned > 0);
    }
    return parts.join("");
}

export function decode(text: string): number[] {
    const buffer: number[] = [];
    let value = 0;
    let shift = 0;
    for (let i = 0; i < text.length; i++) {
        const part = base64chars.indexOf(text.charAt(i));
        value += (part & 31) << shift;
        shift += 5;
        if ((part & 32) === 0) {
            if (value & 1) {
                buffer.push(-(value >>> 1));
            } else {
                buffer.push(value >>> 1);
            }
            shift = 0;
            value = 0;
        }
    }
    return buffer;
}

export function decodeChars(text: string, start: number, end: number): number[] {
    if (start < 0) start = 0;
    if (end > text.length) end = text.length;
    const buffer: number[] = [];
    let value = 0;
    let shift = 0;
    for (let i = start; i < end; i++) {
        const part = base64decoder[text.charCodeAt(i)];
        value += (part & 31) << shift;
        shift += 5;
        if ((part & 32) === 0) {
            if (value & 1) {
                buffer.push(-(value >>> 1));
            } else {
                buffer.push(value >>> 1);
            }
            shift = 0;
            value = 0;
        }
    }
    return buffer;
}