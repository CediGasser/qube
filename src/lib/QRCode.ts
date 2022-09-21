import qrcode from 'qrcode'
import { browser } from '$app/environment';

export class QRCode {
    private text: string;

    constructor(text: string){
        this.text = text
    }

    async getCanvas(){
        if (!browser) {
            return null
        }
        const canvas = document.createElement('canvas')
        await qrcode.toCanvas(canvas, this.text)
        return canvas
    }
}