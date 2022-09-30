import { rcon } from '$lib/Rcon'
import type { Block } from '$lib/BlockRepresentation'

export class Builder {
    private commands: string[] = []
    private blocks: Block[] | undefined

    withBlocks(blocks: Block[]): this {
        this.blocks = blocks
        return this
    }

    useFill(blockId: string): this {
        return this
    }

    useAutoFill() {
        return this
    }

    useSegmentedAutoFill(segmentSize: number) {
        return this
    }

    excludeBlock(block: Block | Block[]) {
        return this
    }

    build() {
        rcon.send(this.getCommands());
    }

    private getCommands() {
        return this.commands;
    }
}