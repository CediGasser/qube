import qrcode from 'qrcode'

export class QRCode {
    private text: string;

    constructor(text: string){
        this.text = text
    }

    getCanvas(){
        const canvas = document.getElementById('canvas')
        return qrcode.toCanvas(canvas, this.text)
    }
}