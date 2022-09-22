export class BlockRepresentation {
    private imageData: ImageData;

    constructor(input: HTMLCanvasElement | HTMLImageElement | URL){
        if (input instanceof HTMLCanvasElement) {
            this.imageData = this.dataFromCanvas(input)
        } else if (input instanceof HTMLImageElement) {
            this.imageData = this.dataFromImage(input)
        } else {
            this.imageData = this.dataFromImageUrl(input)
        }
    }

    getBlockMatrix(): Block[][] {
        const matrix: Block[][] = [];
        for (let y = 0; y < this.imageData.height; y++) {
            const row: Block[] = [];
            for (let x = 0; x < this.imageData.width; x++) {
                row.push(this.getBlockFromPixel(x, y));
            }
            matrix.push(row);
        }
        return matrix;
    }

    dataFromCanvas(canvas: HTMLCanvasElement): ImageData {
        let ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get Context of canvas')
        }
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return imageData;
    }

    getBlockFromPixel(x: number, y: number): Block {
        const index = (y * this.imageData.width + x) * 4;
        const r = this.imageData.data[index];
        const g = this.imageData.data[index + 1];
        const b = this.imageData.data[index + 2];
        const a = this.imageData.data[index + 3];

        let blockId = this.getBlockIdFromRGBA(r, g, b, a);
        return {x, y, z: 0, id: blockId};
    }

    getBlockIdFromRGBA(r: number, g: number, b: number, a: number): string {
        const avg = (r + g + b) / 3;
        if (avg < 64) {
            return 'minecraft:black_concrete';
        } else if (avg < 128) {
            return 'minecraft:gray_concrete';
        } else if (avg < 192) {
            return 'minecraft:light_gray_concrete';
        } else {
            return 'minecraft:white_concrete';
        }
    }

    dataFromImage(image: HTMLImageElement): ImageData {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get Context of canvas')
        }
        ctx.drawImage(image, 0, 0);
        return this.dataFromCanvas(canvas);
    }

    dataFromImageUrl(url: URL | string): ImageData {
        if (url instanceof URL) {
            url = url.toString()
        }
        const image = new Image();
        image.src = url;
        return this.dataFromImage(image);
    }

    async fromImageFile(file: File): Promise<ImageData> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(this.dataFromImageUrl(reader.result as string))
            };
        })
    }
}

type Block = {
    id: string;
    x: number;
    y: number;
    z: number;
}