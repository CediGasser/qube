import qrcode from 'qrcode'
import { browser } from '$app/environment';

export class QRCode {
    async getCanvas(text: string): Promise<HTMLCanvasElement | null> {
        if (!browser) {
            return null
        }

        const canvas = await qrcode.toCanvas(text, { scale: 1 })
        return canvas
    }

    static async getDataUrl(text: string): Promise<string | null>{
        if (!browser) {
            return null
        }

        const dataUrl = await qrcode.toDataURL(text, { scale: 1 })
        return dataUrl
    }
}